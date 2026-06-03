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

  // Include audio if it was generated
  const audioPath = path.join(cwd, "out", "daily-question-audio.mp3")
  if (fs.existsSync(audioPath)) {
    props.audioSrc = audioPath
    console.log("[remotion] Audio found - voiceover will be included")
  } else {
    console.log("[remotion] No audio file - rendering without voiceover")
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
