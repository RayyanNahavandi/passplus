// Live "studying right now" counter. The quiz page sends an anonymous
// heartbeat while a session is active; the landing page reads the count.
// A visitor counts as active if their last heartbeat was within 5 minutes.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { rateLimit, getIp } from "@/lib/rate-limit"

const ACTIVE_WINDOW_MS = 5 * 60 * 1000

async function activeCount(): Promise<number> {
  const since = new Date(Date.now() - ACTIVE_WINDOW_MS).toISOString()
  const { count, error } = await supabaseAdmin
    .from("presence")
    .select("id", { count: "exact", head: true })
    .gte("last_seen", since)
  if (error) throw error
  return count ?? 0
}

export async function GET() {
  try {
    return NextResponse.json({ count: await activeCount() })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)
  const { allowed } = rateLimit(`presence:${ip}`, { limit: 10, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ count: 0 }, { status: 429 })
  }

  let id = ""
  try {
    const body = (await request.json()) as { id?: unknown }
    id = typeof body.id === "string" ? body.id : ""
  } catch {
    // fall through to validation
  }
  if (!/^[a-zA-Z0-9-]{8,40}$/.test(id)) {
    return NextResponse.json({ count: 0 }, { status: 400 })
  }

  try {
    await supabaseAdmin
      .from("presence")
      .upsert({ id, last_seen: new Date().toISOString() })

    // Opportunistic cleanup of stale rows so the table stays tiny.
    if (Math.random() < 0.02) {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      await supabaseAdmin.from("presence").delete().lt("last_seen", dayAgo)
    }

    return NextResponse.json({ count: await activeCount() })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
