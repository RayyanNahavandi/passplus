// One-time endpoint to seed current paying customers into paid_users.
//
// Usage (run once after deploying):
//   curl "https://studypassplus.com/api/admin/seed-paid-users?secret=YOUR_ADMIN_SECRET"
//
// Required Vercel env var:
//   ADMIN_SECRET  - any strong random string you choose (e.g. openssl rand -hex 32)
//
// After seeding you can verify in Supabase → Table Editor → paid_users.
// This route is safe to call multiple times (upsert is idempotent).
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export const runtime = "nodejs"

// All current paying customers. Add new emails here as needed and re-run.
const SEED_EMAILS = [
  "damianchevy1203@gmail.com",
  "zglen18@gmail.com",
  "saarbro22@gmail.com",
  "surajkrishnamoorthy@gmail.com",
  "morgan.rongier@gmail.com",
  "davidluna1738@gmail.com",
  "lenathan93@yahoo.com",
  "torres.alexandra65@yahoo.com",
  "brett.taggart@gmail.com",
  "brett.s.taggart@gmail.com",
  "hunt6499@icloud.com",
]

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

  const rows = SEED_EMAILS.map((email) => ({
    email: email.toLowerCase(),
    confirmed: true,
  }))

  const { error, data } = await supabaseAdmin
    .from("paid_users")
    .upsert(rows, { onConflict: "email" })
    .select("email")

  if (error) {
    console.error("[seed-paid-users] Upsert failed:", error.message, error.code)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const seeded = data?.map((r: { email: string }) => r.email) ?? []
  console.log("[seed-paid-users] Seeded", seeded.length, "emails:", seeded.join(", "))
  return NextResponse.json({ seeded, count: seeded.length })
}
