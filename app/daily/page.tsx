import { Metadata } from "next"
import Anthropic from "@anthropic-ai/sdk"
import { questions, type Question } from "@/data/questions"
import { DailyClient } from "./DailyClient"

// Revalidate every hour; the question changes at UTC midnight so worst-case
// lag is ~1 hour, which is acceptable for a daily feature.
export const revalidate = 3600

function getDailyQuestion(): Question {
  const now = new Date()
  // UTC date seed ensures everyone worldwide sees the same question each day
  const seed =
    now.getUTCFullYear() * 10000 +
    (now.getUTCMonth() + 1) * 100 +
    now.getUTCDate()
  return questions[seed % questions.length]
}

async function fetchExplanation(q: Question): Promise<string> {
  try {
    const client = new Anthropic()
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `You are a CompTIA Security+ (SY0-701) study assistant. Given this exam question and its correct answer, write a 1-2 sentence explanation of WHY that answer is correct. Focus on the underlying concept, not just restating the answer. Be concise and use plain English.

Question: ${q.question}

Options:
A. ${q.options.A}
B. ${q.options.B}
C. ${q.options.C}
D. ${q.options.D}

Correct answer: ${q.answer}. ${q.options[q.answer]}`,
        },
      ],
    })
    const block = res.content[0]
    return block.type === "text" ? block.text : ""
  } catch {
    return ""
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const q = getDailyQuestion()
  return {
    title: "Security+ Question of the Day | PassPlus",
    description: `Test your Security+ SY0-701 knowledge. Today's question: ${q.question.slice(0, 120)}…`,
    openGraph: {
      title: "Security+ Question of the Day | PassPlus",
      description: "A new Security+ SY0-701 practice question every day. Can you get it right?",
      type: "website",
    },
  }
}

export default async function DailyPage() {
  const question = getDailyQuestion()
  const explanation = await fetchExplanation(question)

  const now = new Date()
  const dateLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })

  return (
    <DailyClient
      question={question}
      explanation={explanation}
      dateLabel={dateLabel}
    />
  )
}
