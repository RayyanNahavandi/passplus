// Validates unlock/support tokens against server-side env vars so the
// token values never ship in the client bundle.
//
// UNLOCK_TOKENS: comma-separated list of manual unlock tokens
// SUPPORT_TOKEN: single token gating the /support restore-access page
import { NextRequest, NextResponse } from "next/server"
import { rateLimit, getIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  // 5 attempts per minute per IP - tight because this is a paid-access gate
  const { allowed } = rateLimit(getIp(request), { limit: 5, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ valid: false, error: "Too many requests" }, { status: 429 })
  }

  let token: string
  let type: string
  try {
    const body = await request.json()
    token = typeof body.token === "string" ? body.token.trim() : ""
    type = typeof body.type === "string" ? body.type : ""
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  if (!token || (type !== "unlock" && type !== "support")) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  if (type === "unlock") {
    const unlockTokens = (process.env.UNLOCK_TOKENS ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    return NextResponse.json({ valid: unlockTokens.includes(token) })
  }

  const supportToken = process.env.SUPPORT_TOKEN ?? ""
  return NextResponse.json({ valid: supportToken !== "" && token === supportToken })
}
