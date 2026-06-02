// Stripe webhook handler.
// Must run on Node.js - Stripe signature verification uses Node crypto.
// force-dynamic prevents Next.js from ever statically optimising this route.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  // Read raw body FIRST - outside the try/catch so the body stream is
  // consumed before anything else can touch it.
  const body = await request.text()

  try {
    const sig = request.headers.get("stripe-signature")
    console.log("[webhook] Received - body length:", body.length, "| sig present:", !!sig)

    const event = new Stripe(process.env.STRIPE_SECRET_KEY!).webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log("[webhook] Event type:", event.type, "| ID:", event.id)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const email =
        session.customer_details?.email ??
        (typeof session.customer_email === "string" ? session.customer_email : null)

      console.log("[webhook] payment_status:", session.payment_status, "| email:", email ?? "MISSING")

      if (email && session.payment_status === "paid") {
        const normalizedEmail = email.toLowerCase()

        const { error: dbError } = await supabaseAdmin
          .from("paid_users")
          .upsert(
            { email: normalizedEmail, stripe_session_id: session.id, confirmed: true },
            { onConflict: "email" }
          )

        if (dbError) {
          console.error("[webhook] Supabase upsert failed:", dbError.message, dbError.code)
        } else {
          console.log("[webhook] Recorded paid user:", normalizedEmail)

          // Send welcome email - fire-and-forget, never blocks the 200
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studypassplus.com"
          fetch(`${baseUrl}/api/send-welcome`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: normalizedEmail }),
          }).catch((err) => console.error("[webhook] Welcome email error:", err))
        }
      }
    }

    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("[webhook] Error:", err instanceof Error ? err.message : String(err))
    return new Response("ok", { status: 200 })
  }
}
