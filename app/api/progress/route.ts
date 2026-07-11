// Cross-device progress sync for signed-in paid users.
// GET  -> returns the stored progress snapshot for the authenticated user
// POST -> upserts the snapshot (max ~32KB) for the authenticated user
//
// Auth mirrors /api/auth/check-paid: verify the Supabase JWT, then require
// the email to exist in paid_users. All DB access is service-role.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { rateLimit, getIp } from "@/lib/rate-limit"

const MAX_SNAPSHOT_BYTES = 32 * 1024

async function authenticatePaidUser(
  request: NextRequest
): Promise<{ email: string } | { error: NextResponse }> {
  const auth = request.headers.get("Authorization")
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user?.email) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  const email = user.email.toLowerCase()

  const { data } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", email)
    .maybeSingle()
  if (!data) {
    return { error: NextResponse.json({ error: "Not a paid user" }, { status: 403 }) }
  }

  return { email }
}

export async function GET(request: NextRequest) {
  const { allowed } = rateLimit(`progress:${getIp(request)}`, { limit: 30, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const auth = await authenticatePaidUser(request)
  if ("error" in auth) return auth.error

  try {
    const { data, error } = await supabaseAdmin
      .from("user_progress")
      .select("data, updated_at")
      .eq("email", auth.email)
      .maybeSingle()
    if (error) throw error
    return NextResponse.json({ progress: data?.data ?? null, updatedAt: data?.updated_at ?? null })
  } catch (err) {
    console.error("[progress] GET failed:", err)
    return NextResponse.json({ progress: null, updatedAt: null })
  }
}

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(`progress:${getIp(request)}`, { limit: 30, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const auth = await authenticatePaidUser(request)
  if ("error" in auth) return auth.error

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > MAX_SNAPSHOT_BYTES) {
      return NextResponse.json({ error: "Snapshot too large" }, { status: 413 })
    }
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const progress = (body as { progress?: unknown })?.progress
  if (typeof progress !== "object" || progress === null || Array.isArray(progress)) {
    return NextResponse.json({ error: "Invalid snapshot" }, { status: 400 })
  }

  try {
    const { error } = await supabaseAdmin
      .from("user_progress")
      .upsert({ email: auth.email, data: progress, updated_at: new Date().toISOString() })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[progress] POST failed:", err)
    return NextResponse.json({ error: "Save failed" }, { status: 500 })
  }
}
