// One-time endpoint to seed current paying customers into paid_users.
//
// Emails are read from the PAID_EMAILS env var (comma-separated) so that
// customer data stays out of version control. The same env var already
// exists in Vercel for the auth fallback logic.
//
// Usage (run once after deploying):
//   curl "https://studypassplus.com/api/admin/seed-paid-users?secret=YOUR_ADMIN_SECRET"
//
// Required Vercel env vars:
//   ADMIN_SECRET  - any strong random string (e.g. openssl rand -hex 32)
//   PAID_EMAILS   - comma-separated list of paying customer emails
//
// This route is idempotent — safe to call multiple times.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    console.error("[seed-paid-users] ADMIN_SECRET env var is not set")
    return NextResponse.json({ error: "Not configured" }, { status: 500 })
  }
  if (secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Read emails from env var — keeps customer data out of git
  const emails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.includes("@"))

  if (emails.length === 0) {
    return NextResponse.json({ error: "PAID_EMAILS env var is empty or not set" }, { status: 400 })
  }

  const rows = emails.map((email) => ({ email, confirmed: true }))

  const { error, data } = await supabaseAdmin
    .from("paid_users")
    .upsert(rows, { onConflict: "email" })
    .select("email")

  if (error) {
    console.error("[seed-paid-users] Upsert failed:", error.message, error.code)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const seeded = data?.map((r: { email: string }) => r.email) ?? []
  console.log("[seed-paid-users] Seeded", seeded.length, "emails")
  return NextResponse.json({ seeded, count: seeded.length })
}
