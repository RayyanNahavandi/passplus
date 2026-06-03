/**
 * Step 1 - Generate a daily Security+ question via Claude API
 *
 * Picks a random SY0-701 domain, prompts Claude for a scenario-based
 * question, and saves the result to out/daily-question-data.json.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY - from console.anthropic.com
 */

import Anthropic from "@anthropic-ai/sdk"
import * as fs from "fs"
import * as path from "path"

interface QuestionData {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
}

const DOMAINS = [
  "Domain 1: General Security Concepts",
  "Domain 2: Threats, Vulnerabilities, and Mitigations",
  "Domain 3: Security Architecture",
  "Domain 4: Security Operations",
  "Domain 5: Security Program Management and Oversight",
]

async function generateQuestion(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local and run: source .env.local"
    )
  }

  const client = new Anthropic({ apiKey })
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)]

  console.log(`[claude] Generating question for: ${domain}`)

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate a challenging CompTIA Security+ SY0-701 practice question for ${domain}.

Return ONLY valid JSON with no markdown formatting, no code blocks, and no text outside the JSON object.

Required format:
{
  "question": "The full scenario-based question text",
  "answers": {
    "A": "First answer option",
    "B": "Second answer option",
    "C": "Third answer option",
    "D": "Fourth answer option"
  },
  "correct": "B",
  "explanation": "A clear concise explanation of why the correct answer is right and why the others are wrong. Under 55 words.",
  "domain": "${domain}"
}

Requirements:
- Scenario-based and realistic
- One clearly correct answer
- Three plausible distractors
- Question text under 50 words for readability on a phone screen
- Explanation under 55 words`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude API")
  }

  // Strip any accidental markdown code fences if present
  const raw = content.text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")

  const questionData: QuestionData = JSON.parse(raw)

  const outDir = path.join(process.cwd(), "out")
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outputPath = path.join(outDir, "daily-question-data.json")
  fs.writeFileSync(outputPath, JSON.stringify(questionData, null, 2))

  console.log(`[claude] Saved to  : ${outputPath}`)
  console.log(`[claude] Domain    : ${questionData.domain}`)
  console.log(
    `[claude] Question  : ${questionData.question.substring(0, 80)}...`
  )
}

generateQuestion().catch((err: unknown) => {
  console.error("[claude] FAILED:", err)
  process.exit(1)
})
