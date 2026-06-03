/**
 * Step 2 - Generate voiceover audio via ElevenLabs TTS
 *
 * Reads out/daily-question-data.json, builds the narration script,
 * calls the ElevenLabs API, and saves out/daily-question-audio.mp3.
 *
 * Required env vars:
 *   ELEVENLABS_API_KEY  - from elevenlabs.io
 *   ELEVENLABS_VOICE_ID - optional, defaults to Rachel (21m00Tcm4TlvDq8ikWAM)
 */

import * as fs from "fs"
import * as path from "path"

interface QuestionData {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
}

// Default voice: Rachel - calm, clear, authoritative
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"

function buildScript(data: QuestionData): string {
  return [
    "Stop scrolling for a second and lock in.",
    "Here is your daily Security plus question.",
    "",
    data.question,
    "",
    `A. ${data.answers.A}`,
    `B. ${data.answers.B}`,
    `C. ${data.answers.C}`,
    `D. ${data.answers.D}`,
    "",
    "Drop your answer in the comments.",
    "Check back tomorrow for the answer and explanation.",
    "More practice questions at studypassplus dot com.",
  ].join("\n")
}

async function generateAudio(): Promise<void> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    throw new Error(
      "ELEVENLABS_API_KEY is not set. Add it to .env.local and run: source .env.local"
    )
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE_ID

  const dataPath = path.join(process.cwd(), "out", "daily-question-data.json")
  if (!fs.existsSync(dataPath)) {
    throw new Error(
      `Question data not found at ${dataPath}.\nRun generate-question.ts first.`
    )
  }

  const questionData: QuestionData = JSON.parse(
    fs.readFileSync(dataPath, "utf-8")
  )

  const script = buildScript(questionData)

  console.log("[elevenlabs] Generating audio...")
  console.log(`[elevenlabs] Voice ID : ${voiceId}`)
  console.log(`[elevenlabs] Characters: ${script.length}`)

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: script,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `ElevenLabs API error ${response.status}: ${errorText}`
    )
  }

  const audioBuffer = await response.arrayBuffer()

  const outDir = path.join(process.cwd(), "out")
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outputPath = path.join(outDir, "daily-question-audio.mp3")
  fs.writeFileSync(outputPath, Buffer.from(audioBuffer))

  const kb = (audioBuffer.byteLength / 1024).toFixed(1)
  console.log(`[elevenlabs] Saved to  : ${outputPath}`)
  console.log(`[elevenlabs] File size : ${kb} KB`)
}

generateAudio().catch((err: unknown) => {
  console.error("[elevenlabs] FAILED:", err)
  process.exit(1)
})
