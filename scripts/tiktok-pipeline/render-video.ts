/**
 * Step 3 - Render the Remotion composition to MP4
 *
 * Reads out/daily-question-data.json for question props.
 * If out/daily-question-audio.mp3 exists, passes its absolute path
 * as the audioSrc prop so the voiceover is baked into the video.
 *
 * Props are written to out/render-props.json then passed to Remotion
 * via --props to safely handle special characters in question text.
 */

import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

interface QuestionData {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
}

interface RenderProps extends QuestionData {
  audioSrc?: string
  audioQuestionSrc?: string
  audioRevealSrc?: string
  s3?: number
  s4?: number
  durationInFrames?: number
}

const FPS = 30
const COUNTDOWN_SECONDS = 6
// CTA line ("New question every day...") is ~2.6s of the reveal segment;
// the outro card appears when it starts.
const CTA_SECONDS = 2.6

/** Audio duration in seconds via afinfo (ships with macOS). */
function audioDuration(file: string): number {
  const out = execSync(`afinfo "${file}"`, { encoding: "utf-8" })
  const match = out.match(/estimated duration: ([\d.]+)/)
  if (!match) throw new Error(`Could not read duration of ${file}`)
  return parseFloat(match[1])
}

async function renderVideo(): Promise<void> {
  const cwd = process.cwd()

  // Load question data
  const dataPath = path.join(cwd, "out", "daily-question-data.json")
  if (!fs.existsSync(dataPath)) {
    throw new Error(
      `Question data not found at ${dataPath}.\nRun generate-question.ts first.`
    )
  }

  const questionData: QuestionData = JSON.parse(
    fs.readFileSync(dataPath, "utf-8")
  )

  const props: RenderProps = { ...questionData }

  // Preferred: two-segment voiceover. Scene boundaries are derived from the
  // measured segment durations so the reveal always lands on the audio.
  const questionAudio = path.join(cwd, "out", "audio-question.mp3")
  const revealAudio = path.join(cwd, "out", "audio-reveal.mp3")
  const legacyAudio = path.join(cwd, "out", "daily-question-audio.mp3")

  // Remotion serves audio via staticFile() from public/, so segments are
  // copied there and referenced by filename (gitignored as tiktok-audio-*).
  const staticize = (file: string): string => {
    const name = `tiktok-${path.basename(file)}`
    fs.copyFileSync(file, path.join(cwd, "public", name))
    return name
  }

  if (fs.existsSync(questionAudio) && fs.existsSync(revealAudio)) {
    const d1 = audioDuration(questionAudio)
    const d2 = audioDuration(revealAudio)
    const s3 = Math.round((d1 + COUNTDOWN_SECONDS) * FPS)
    const s4 = s3 + Math.round(Math.max(3, d2 - CTA_SECONDS) * FPS)
    const durationInFrames = s3 + Math.round((d2 + 0.8) * FPS)
    Object.assign(props, {
      audioQuestionSrc: staticize(questionAudio),
      audioRevealSrc: staticize(revealAudio),
      s3,
      s4,
      durationInFrames,
    })
    console.log(
      `[remotion] Two-segment audio: question ${d1.toFixed(1)}s, reveal ${d2.toFixed(1)}s`
    )
    console.log(
      `[remotion] Timing: reveal @ frame ${s3}, outro @ ${s4}, total ${durationInFrames} frames (${(durationInFrames / FPS).toFixed(1)}s)`
    )
  } else if (fs.existsSync(legacyAudio)) {
    props.audioSrc = staticize(legacyAudio)
    console.log("[remotion] Legacy single audio found - using fixed 30s timing")
  } else {
    console.log("[remotion] No audio files - rendering silent with fixed timing")
  }

  // Write props to a file to avoid shell escaping issues with special chars
  const propsFilePath = path.join(cwd, "out", "render-props.json")
  fs.writeFileSync(propsFilePath, JSON.stringify(props, null, 2))

  const outputPath = path.join(cwd, "out", "daily-question.mp4")

  console.log("[remotion] Starting render...")
  console.log(`[remotion] Output: ${outputPath}`)

  const command = [
    "npx remotion render",
    "remotion/index.ts",
    "DailyQuestion",
    `"${outputPath}"`,
    `--props="${propsFilePath}"`,
  ].join(" ")

  execSync(command, { stdio: "inherit", cwd })

  const stats = fs.statSync(outputPath)
  const mb = (stats.size / (1024 * 1024)).toFixed(1)
  console.log(`[remotion] Render complete: ${outputPath} (${mb} MB)`)
}

renderVideo().catch((err: unknown) => {
  console.error("[remotion] FAILED:", err)
  process.exit(1)
})
