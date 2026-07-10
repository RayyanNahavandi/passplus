// AI explanation endpoint. Paid users (valid Supabase JWT) get unlimited
// explanations at 60 req/min per IP. Unauthenticated (free tier) requests are
// allowed but throttled hard: the client only asks for the first 5 answers per
// session, and the server caps free traffic at 6 req/min per IP as the guard.
import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { rateLimit, getIp } from "@/lib/rate-limit"

const client = new Anthropic()

// Max lengths to prevent prompt injection / runaway costs
const MAX_QUESTION_LEN = 800
const MAX_OPTION_LEN = 300

export async function POST(request: NextRequest) {
  // ── 1. Auth - a valid Supabase JWT for a paid user unlocks the higher limit ─
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null

  let paid = false
  if (token) {
    const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(token)
    if (!authErr && user?.email) {
      const { data: paidRow } = await supabaseAdmin
        .from("paid_users")
        .select("email")
        .eq("email", user.email.toLowerCase())
        .maybeSingle()

      const paidEmails = (process.env.PAID_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)

      paid = !!paidRow || paidEmails.includes(user.email.toLowerCase())
    }
  }

  // ── 2. Rate limit (paid: 60/min per IP, free sample tier: 6/min per IP) ────
  const ip = getIp(request)
  const { allowed, remaining } = rateLimit(`${paid ? "paid" : "free"}:${ip}`, {
    limit: paid ? 60 : 6,
    windowMs: 60_000,
  })
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
    )
  }

  // ── 3. Parse and validate input ────────────────────────────────────────────
  let question: string, options: Record<string, string>, answer: string, cert: string
  try {
    const body = await request.json()
    question = typeof body.question === "string" ? body.question : ""
    options  = typeof body.options  === "object" && body.options !== null ? body.options : {}
    answer   = typeof body.answer   === "string" ? body.answer   : ""
    cert     = typeof body.cert     === "string" ? body.cert     : "secplus"
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const certLabel =
    cert === "netplus" ? "CompTIA Network+ (N10-009)"
    : cert === "aplus" ? "CompTIA A+ (220-1101/220-1102)"
    : "CompTIA Security+ (SY0-701)"

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
          content: `You are a ${certLabel} study assistant. Given this exam question and its correct answer, write a 1-2 sentence explanation of WHY that answer is correct. Focus on the underlying concept, not just restating the answer. Be concise and use plain English.

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
