/**
 * Step 2 - Generate voiceover audio via ElevenLabs TTS
 *
 * Reads out/daily-question-data.json, builds the narration script,
 * calls the ElevenLabs API, and saves the audio file.
 *
 * Usage:
 *   npx tsx scripts/tiktok-pipeline/generate-audio.ts          # standard style
 *   npx tsx scripts/tiktok-pipeline/generate-audio.ts --meme   # meme style
 *
 * Output files:
 *   Standard: out/daily-question-audio.mp3
 *   Meme:     out/meme-question-audio.mp3
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

const IS_MEME = process.argv.includes("--meme")

// ── Script builders ────────────────────────────────────────────────────────

// Spoken versions of the answer letters so TTS pronounces them cleanly.
const LETTER_SPOKEN: Record<QuestionData["correct"], string> = {
  A: "A",
  B: "Bee",
  C: "See",
  D: "Dee",
}

// The voiceover is generated in two segments so render-video.ts can measure
// each one and derive the scene boundaries: segment 1 plays from frame 0,
// then a 6s silent countdown, then segment 2 plays over the reveal.
function buildQuestionScript(data: QuestionData): string {
  return [
    'Can you pass Security Plus? Prove it. <break time="0.6s" />',
    `${data.question} <break time="0.4s" />`,
    `${data.answers.A}. ${data.answers.B}. ${data.answers.C}. Or ${data.answers.D}? <break time="0.4s" />`,
    "Six seconds. Lock it in.",
  ].join("\n")
}

function buildRevealScript(data: QuestionData): string {
  return [
    `It's ${LETTER_SPOKEN[data.correct]}. ${data.answers[data.correct]}. <break time="0.4s" />`,
    `${data.explanation} <break time="0.5s" />`,
    "New question every day, at study pass plus dot com.",
  ].join("\n")
}

function buildMemeScript(data: QuestionData): string {
  return [
    "Bro stop. Are you actually ready for your Security plus exam?",
    "Because this question right here. This one right here.",
    "",
    data.question,
    "",
    `A. ${data.answers.A}`,
    `B. ${data.answers.B}`,
    `C. ${data.answers.C}`,
    `D. ${data.answers.D}`,
    "",
    `The answer is ${data.correct}.`,
    "",
    "Do not go into that exam cooked.",
    "Free practice at studypassplus dot com.",
  ].join("\n")
}

// ── Main ──────────────────────────────────────────────────────────────────

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

  const style = IS_MEME ? "meme" : "standard"
  console.log(`[elevenlabs] Style     : ${style}`)
  console.log(`[elevenlabs] Voice ID  : ${voiceId}`)

  const outDir = path.join(process.cwd(), "out")
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  async function tts(script: string, outputFile: string): Promise<void> {
    console.log(`[elevenlabs] Generating ${outputFile} (${script.length} chars)`)
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey!,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: script,
          // multilingual v2 respects <break> tags; monolingual v1 does not
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.75,
            style: 0.3,
            // Adam reads slowly; slight speed-up keeps the video ~45s
            speed: 1.1,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const outputPath = path.join(outDir, outputFile)
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer))
    const kb = (audioBuffer.byteLength / 1024).toFixed(1)
    console.log(`[elevenlabs] Saved ${outputPath} (${kb} KB)`)
  }

  if (IS_MEME) {
    await tts(buildMemeScript(questionData), "meme-question-audio.mp3")
  } else {
    await tts(buildQuestionScript(questionData), "audio-question.mp3")
    await tts(buildRevealScript(questionData), "audio-reveal.mp3")
    // Remove the legacy single-file voiceover so render-video.ts doesn't
    // pick up a stale one alongside the two-segment audio.
    const legacy = path.join(outDir, "daily-question-audio.mp3")
    if (fs.existsSync(legacy)) fs.unlinkSync(legacy)
  }
}

generateAudio().catch((err: unknown) => {
  console.error("[elevenlabs] FAILED:", err)
  process.exit(1)
})
