// Stripe webhook - receives checkout.session.completed events and
// records the customer's email in paid_users.
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

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const sig = request.headers.get("stripe-signature")

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripeKey = process.env.STRIPE_SECRET_KEY

    // Log env var presence (never log values) to make Vercel log diagnosis easy.
    if (!stripeKey) {
      console.error("[webhook] FATAL: STRIPE_SECRET_KEY is not set in environment")
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
    }
    if (!webhookSecret) {
      console.error("[webhook] FATAL: STRIPE_WEBHOOK_SECRET is not set in environment")
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
    }
    if (!sig) {
      console.error("[webhook] FATAL: stripe-signature header missing from request")
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    const stripe = new Stripe(stripeKey)
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error("[webhook] Signature verification failed:", msg)
      console.error("[webhook] Hint: STRIPE_WEBHOOK_SECRET in Vercel must match the signing secret shown in Stripe Dashboard → Webhooks → your endpoint → Signing secret")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("[webhook] Verified event:", event.type, event.id)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const email =
        session.customer_details?.email ??
        (typeof session.customer_email === "string" ? session.customer_email : null)

      console.log("[webhook] checkout.session.completed — payment_status:", session.payment_status, "email:", email ?? "none")

      if (email && session.payment_status === "paid") {
        const normalizedEmail = email.toLowerCase()

        // 1. Record in paid_users — this is the primary access grant
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
          console.error("[webhook] Supabase upsert failed:", dbError.message, dbError.code)
          console.error("[webhook] Hint: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Vercel")
          return NextResponse.json({ error: "DB error" }, { status: 500 })
        }

        console.log("[webhook] Successfully recorded paid user:", normalizedEmail)

        // 2. Send welcome email (non-blocking — failure does not fail the webhook)
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
              console.log("[webhook] Welcome email skipped (not configured or failed):", normalizedEmail)
            }
          })
          .catch((err) => {
            console.error("[webhook] Welcome email fetch error:", err)
          })
      } else {
        console.log("[webhook] Skipped — email missing or payment not completed")
      }
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    // Catch-all for unexpected throws (e.g. Supabase client init failure due to missing env vars).
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[webhook] Unhandled exception:", msg)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
