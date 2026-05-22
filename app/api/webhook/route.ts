// Stripe webhook — receives checkout.session.completed events and
// records the customer's email in paid_users.
//
// Set up in Stripe Dashboard → Developers → Webhooks:
//   Endpoint URL: https://studypassplus.com/api/webhook
//   Events:       checkout.session.completed
//   Secret:       copy to STRIPE_WEBHOOK_SECRET env var in Vercel
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase-admin"

// Next.js App Router reads the raw body automatically — no bodyParser config needed.
export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const sig = request.headers.get("stripe-signature")

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not set")
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey)
  let event: Stripe.Event

  if (webhookSecret && sig) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      console.error("Webhook signature verification failed:", msg)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
  } else {
    // No webhook secret configured — accept without verification (dev only)
    try {
      event = JSON.parse(rawBody) as Stripe.Event
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email =
      session.customer_details?.email ??
      (typeof session.customer_email === "string" ? session.customer_email : null)

    if (email && session.payment_status === "paid") {
      const { error } = await supabaseAdmin
        .from("paid_users")
        .upsert(
          { email: email.toLowerCase(), stripe_session_id: session.id },
          { onConflict: "email" }
        )

      if (error) {
        console.error("Failed to upsert paid_users:", error.message)
        return NextResponse.json({ error: "DB error" }, { status: 500 })
      }

      console.log("Recorded paid user:", email)
    }
  }

  return NextResponse.json({ received: true })
}
