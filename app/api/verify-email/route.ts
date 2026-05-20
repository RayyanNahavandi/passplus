import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let email: string
  try {
    const body = await request.json()
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const paidEmails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  const valid = paidEmails.includes(email)
  return NextResponse.json({ valid })
}
