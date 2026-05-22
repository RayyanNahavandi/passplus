import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

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

  // Check paid_users table first
  const { data } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", email)
    .maybeSingle()

  if (data) return NextResponse.json({ valid: true })

  // Fallback: PAID_EMAILS env var (legacy / manual overrides)
  const paidEmails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  return NextResponse.json({ valid: paidEmails.includes(email) })
}
