// Captures a lead email from the paywall ("Email me my results + a 7-day
// study plan"). Stores into the leads table; email delivery is wired
// separately.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { rateLimit, getIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getIp(request), { limit: 5, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 })
  }

  let email = ""
  let cert: string | null = null
  let score: number | null = null
  let total: number | null = null
  try {
    const body = await request.json()
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    cert = typeof body.cert === "string" ? body.cert.slice(0, 32) : null
    score = Number.isFinite(body.score) ? Math.floor(body.score) : null
    total = Number.isFinite(body.total) ? Math.floor(body.total) : null
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!email || !email.includes("@") || email.length > 254) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from("leads")
    .upsert(
      { email, cert, score, total, source: "paywall" },
      { onConflict: "email" }
    )

  if (error) {
    console.error("[capture-lead] upsert failed:", error.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
