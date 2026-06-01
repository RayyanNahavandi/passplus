// Stripe webhook - receives checkout.session.completed events and
// records the customer's email in paid_users.
//
// CRITICAL: This route ALWAYS returns 200. Returning 4xx/5xx tells Stripe
// the delivery failed and triggers automatic retries. For permanent failures
// (bad signature, misconfigured env, etc.) we log and return 200 so Stripe
// marks the event as delivered and stops retrying.
//
// Set up in Stripe Dashboard → Developers → Webhooks:
//   Endpoint URL: https://studypassplus.com/api/webhook
//   Events:       checkout.session.completed
//   Secret:       copy to STRIPE_WEBHOOK_SECRET env var in Vercel
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

// Must run on Node.js runtime - Stripe signature verification uses Node crypto.
export const runtime = "nodejs"

const OK = () => NextResponse.json({ received: true }, { status: 200 })

export async function POST(request: NextRequest) {
  // ── Outermost catch-all — guarantees 200 even on unexpected throws ──────────
  try {
    console.log("[webhook] Request received at", new Date().toISOString())

    // ── 1. Read raw body FIRST — must happen before any other body consumption ─
    let rawBody: string
    try {
      rawBody = await request.text()
    } catch (err) {
      console.error("[webhook] Failed to read request body:", err instanceof Error ? err.message : String(err))
      return OK()
    }

    const sig = request.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripeKey = process.env.STRIPE_SECRET_KEY

    // ── 2. Env var checks — permanent failures, return 200 to stop retries ─────
    if (!stripeKey) {
      console.error("[webhook] FATAL: STRIPE_SECRET_KEY is not set — returning 200 to stop retries")
      return OK()
    }
    if (!webhookSecret) {
      console.error("[webhook] FATAL: STRIPE_WEBHOOK_SECRET is not set — returning 200 to stop retries")
      return OK()
    }
    if (!sig) {
      console.error("[webhook] Missing stripe-signature header — returning 200 to stop retries")
      return OK()
    }

    console.log("[webhook] Env vars present. Raw body length:", rawBody.length, "Sig prefix:", sig.slice(0, 20))

    // ── 3. Signature verification ──────────────────────────────────────────────
    const stripe = new Stripe(stripeKey)
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      // Bad signature = permanent failure. Log it and return 200 so Stripe stops
      // retrying. If this keeps happening, the STRIPE_WEBHOOK_SECRET env var is wrong.
      console.error("[webhook] Signature verification failed:", msg)
      console.error("[webhook] Fix: make sure STRIPE_WEBHOOK_SECRET in Vercel matches")
      console.error("[webhook]   Stripe Dashboard → Developers → Webhooks → your endpoint → Signing secret")
      return OK()
    }

    console.log("[webhook] Signature verified. Event type:", event.type, "| ID:", event.id)

    // ── 4. Process the event ───────────────────────────────────────────────────
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const email =
        session.customer_details?.email ??
        (typeof session.customer_email === "string" ? session.customer_email : null)

      console.log("[webhook] checkout.session.completed — payment_status:", session.payment_status, "| email:", email ?? "MISSING")

      if (!email) {
        console.warn("[webhook] No email found on session", session.id, "— skipping DB write")
        return OK()
      }
      if (session.payment_status !== "paid") {
        console.log("[webhook] Payment not completed (status:", session.payment_status, ") — skipping")
        return OK()
      }

      const normalizedEmail = email.toLowerCase()

      // ── 5. Write to paid_users ─────────────────────────────────────────────
      try {
        const { error: dbError } = await supabaseAdmin
          .from("paid_users")
          .upsert(
            {
              email: normalizedEmail,
              stripe_session_id: session.id,
              confirmed: true,
            },
            { onConflict: "email" }
          )

        if (dbError) {
          // Log the DB error but still return 200 — the webhook was received.
          // If the DB write keeps failing, check SUPABASE_SERVICE_ROLE_KEY in Vercel.
          console.error("[webhook] Supabase upsert failed:", dbError.message, "| code:", dbError.code)
          console.error("[webhook] Hint: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel env vars")
          return OK()
        }

        console.log("[webhook] Successfully recorded paid user:", normalizedEmail)
      } catch (dbErr) {
        console.error("[webhook] Supabase client threw unexpectedly:", dbErr instanceof Error ? dbErr.message : String(dbErr))
        return OK()
      }

      // ── 6. Send welcome email (fully non-blocking) ─────────────────────────
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studypassplus.com"
      fetch(`${baseUrl}/api/send-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      })
        .then(async (r) => {
          const data = await r.json().catch(() => ({}))
          if (data.sent) {
            console.log("[webhook] Welcome email dispatched to:", normalizedEmail)
          } else {
            console.log("[webhook] Welcome email skipped or failed for:", normalizedEmail)
          }
        })
        .catch((err) => {
          console.error("[webhook] Welcome email fetch error (non-fatal):", err instanceof Error ? err.message : String(err))
        })
    } else {
      console.log("[webhook] Unhandled event type:", event.type, "— ignoring (this is fine)")
    }

    return OK()

  } catch (err) {
    // Final safety net — this should never be reached but guarantees 200.
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[webhook] Unhandled exception in outer try/catch:", msg)
    return OK()
  }
}
