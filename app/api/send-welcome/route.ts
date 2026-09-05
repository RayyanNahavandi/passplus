// Sends a post-payment welcome email via Resend (https://resend.com).
//
// Required Vercel env vars:
//   RESEND_API_KEY  - from resend.com -> API Keys
//
// The sender is fixed to "PassPlus <noreply@studypassplus.com>" (a verified
// domain sender in Resend). If RESEND_API_KEY is missing the route returns
// { sent: false } without throwing, so the webhook still succeeds even if
// email is unconfigured.
//
// Called internally by the Stripe webhook after a successful payment.
// Not exposed publicly (no auth needed - only called server-to-server).
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const FROM = "PassPlus <noreply@studypassplus.com>"

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log("[send-welcome] RESEND_API_KEY not configured - skipping welcome email")
    return NextResponse.json({ sent: false })
  }

  let email: string
  try {
    const body = await request.json()
    email = typeof body.email === "string" ? body.email.trim() : ""
  } catch {
    return NextResponse.json({ sent: false }, { status: 400 })
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ sent: false }, { status: 400 })
  }

  const textBody = [
    "Your payment was successful.",
    "",
    "To access your questions:",
    '1. Go to www.studypassplus.com',
    '2. Click "Sign in" in the top right',
    "3. Create an account or log in with the email you used at checkout",
    "4. Your full access will be waiting for you",
    "",
    "If you have any issues email studypassplus@gmail.com",
    "",
    "The PassPlus Team",
  ].join("\n")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "You're in. Welcome to PassPlus.",
        text: textBody,
      }),
    })

    // Resend returns 200 with a JSON body containing the message id on success.
    if (!res.ok) {
      const err = await res.text()
      console.error("[send-welcome] Resend API error:", res.status, err)
      return NextResponse.json({ sent: false })
    }

    console.log("[send-welcome] Welcome email sent to:", email)
    return NextResponse.json({ sent: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[send-welcome] Unexpected error:", msg)
    return NextResponse.json({ sent: false })
  }
}
