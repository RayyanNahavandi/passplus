import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic()

export async function POST(request: NextRequest) {
  const { question, options, answer } = await request.json()

  if (!question || !options || !answer) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

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

  return NextResponse.json({ explanation })
}
