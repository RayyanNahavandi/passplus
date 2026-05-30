// Verifies a Supabase JWT, looks up the user's email in paid_users,
// falls back to PAID_EMAILS env var, and returns { paid: boolean }.
// Called by AuthProvider on every page load and after sign-in.
//
// When an email is found via PAID_EMAILS (legacy list) it is automatically
// upserted into paid_users so subsequent checks are DB-only.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization")
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null

  if (!token) {
    return NextResponse.json({ paid: false }, { status: 401 })
  }

  // Verify the JWT and get the user
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user?.email) {
    return NextResponse.json({ paid: false }, { status: 401 })
  }

  const email = user.email.toLowerCase()

  // Primary: check paid_users table
  const { data } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", email)
    .maybeSingle()

  if (data) {
    console.log("[check-paid] confirmed from paid_users:", email)
    return NextResponse.json({ paid: true })
  }

  // Fallback: PAID_EMAILS env var (legacy / manual overrides)
  const paidEmails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (paidEmails.includes(email)) {
    console.log("[check-paid] found in PAID_EMAILS, migrating to paid_users:", email)
    // Auto-migrate into paid_users so future checks are DB-only
    const { error: upsertErr } = await supabaseAdmin
      .from("paid_users")
      .upsert(
        { email, confirmed: true },
        { onConflict: "email" }
      )
    if (upsertErr) {
      console.error("[check-paid] migration upsert failed:", upsertErr.message)
    }
    return NextResponse.json({ paid: true })
  }

  return NextResponse.json({ paid: false })
}
