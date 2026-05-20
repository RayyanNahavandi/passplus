import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"

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
    return NextResponse.json({ valid })
  } catch {
    // Invalid or expired session ID
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
