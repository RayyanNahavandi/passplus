// Verifies an email against paid_users and PAID_EMAILS without requiring a
// Supabase session. Used by the "Already paid? Restore access" flow.
//
// When found via PAID_EMAILS (legacy list) the email is auto-migrated into
// paid_users so subsequent checks are DB-only.
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

  // Primary: check paid_users table
  const { data } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", email)
    .maybeSingle()

  if (data) {
    console.log("[verify-email] confirmed from paid_users:", email)
    return NextResponse.json({ valid: true })
  }

  // Fallback: PAID_EMAILS env var
  const paidEmails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (paidEmails.includes(email)) {
    console.log("[verify-email] found in PAID_EMAILS, migrating to paid_users:", email)
    const { error: upsertErr } = await supabaseAdmin
      .from("paid_users")
      .upsert(
        { email, confirmed: true },
        { onConflict: "email" }
      )
    if (upsertErr) {
      console.error("[verify-email] migration upsert failed:", upsertErr.message)
    }
    return NextResponse.json({ valid: true })
  }

  return NextResponse.json({ valid: false })
}
