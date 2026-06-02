// AI explanation endpoint - requires a valid Supabase JWT from a paid user.
// Rate limited to 60 requests per minute per IP as a secondary guard.
import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { rateLimit, getIp } from "@/lib/rate-limit"

const client = new Anthropic()

// Max lengths to prevent prompt injection / runaway costs
const MAX_QUESTION_LEN = 800
const MAX_OPTION_LEN = 300

export async function POST(request: NextRequest) {
  // ── 1. Rate limit (60 req/min per IP) ──────────────────────────────────────
  const ip = getIp(request)
  const { allowed, remaining } = rateLimit(ip, { limit: 60, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
    )
  }

  // ── 2. Auth - require a valid Supabase JWT for a paid user ─────────────────
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token)
  if (authErr || !user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Verify the user is a paid customer (DB first, PAID_EMAILS env fallback)
  const { data: paidRow } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", user.email.toLowerCase())
    .maybeSingle()

  const paidEmails = (process.env.PAID_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (!paidRow && !paidEmails.includes(user.email.toLowerCase())) {
    console.warn("[explain] unpaid user attempted access:", user.email)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // ── 3. Parse and validate input ────────────────────────────────────────────
  let question: string, options: Record<string, string>, answer: string
  try {
    const body = await request.json()
    question = typeof body.question === "string" ? body.question : ""
    options  = typeof body.options  === "object" && body.options !== null ? body.options : {}
    answer   = typeof body.answer   === "string" ? body.answer   : ""
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!question || !options || !answer) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  if (question.length > MAX_QUESTION_LEN) {
    return NextResponse.json({ error: "Question too long" }, { status: 400 })
  }
  for (const v of Object.values(options)) {
    if (typeof v === "string" && v.length > MAX_OPTION_LEN) {
      return NextResponse.json({ error: "Option text too long" }, { status: 400 })
    }
  }

  // ── 4. Call Anthropic ───────────────────────────────────────────────────────
  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `You are a CompTIA Security+ (SY0-701) study assistant. Given this exam question and its correct answer, write a 1-2 sentence explanation of WHY that answer is correct. Focus on the underlying concept, not just restating the answer. Be concise and use plain English.

Question: ${question}

Options:
A. ${options.A}
B. ${options.B}
C. ${options.C}
D. ${options.D}

Correct answer: ${answer}. ${options[answer]}

Reply with only the explanation text, no prefix or label.`,
        },
      ],
    })

    const explanation =
      message.content[0].type === "text" ? message.content[0].text.trim() : ""

    return NextResponse.json(
      { explanation },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[explain] Anthropic API error:", msg)
    return NextResponse.json({ error: "AI service unavailable" }, { status: 502 })
  }
}
