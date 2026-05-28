import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY is not set")
    return NextResponse.json({ valid: false }, { status: 500 })
  }

  try {
    const stripe = new Stripe(stripeKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const valid = session.payment_status === "paid"

    if (valid) {
      // Record in paid_users so auth-based unlock works on future logins
      const email =
        session.customer_details?.email ??
        (typeof session.customer_email === "string" ? session.customer_email : null)
      if (email) {
        const { error } = await supabaseAdmin
          .from("paid_users")
          .upsert(
            { email: email.toLowerCase(), stripe_session_id: sessionId },
            { onConflict: "email" }
          )
        if (error) {
          // Non-fatal - localStorage unlock still proceeds on the client
          console.error("Failed to upsert paid_users:", error.message)
        }
      }
    }

    return NextResponse.json({ valid })
  } catch {
    // Invalid or expired session ID
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
