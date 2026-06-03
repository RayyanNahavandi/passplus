/**
 * PassPlus TikTok Pipeline - Master Runner
 *
 * Runs all 5 steps in sequence:
 *   Step 1: Generate question with Claude API
 *   Step 2: Generate audio with ElevenLabs
 *   Step 3: Render video with Remotion (audio included if generated)
 *   Step 4: Upload to TikTok
 *   Step 5: Log completion with timestamp
 *
 * Usage:
 *   npx tsx scripts/tiktok-pipeline/run.ts
 *
 * Optional flags:
 *   --skip-audio    Skip ElevenLabs step (render silent video)
 *   --skip-upload   Render only, do not post to TikTok
 *   --dry-run       Generate question + audio only, no render or upload
 *
 * Env vars required (see .env.local):
 *   ANTHROPIC_API_KEY
 *   ELEVENLABS_API_KEY
 *   TIKTOK_ACCESS_TOKEN
 *
 * Env vars optional:
 *   ELEVENLABS_VOICE_ID   (defaults to Rachel)
 */

import { execSync } from "child_process"

const args = process.argv.slice(2)
const SKIP_AUDIO = args.includes("--skip-audio")
const SKIP_UPLOAD = args.includes("--skip-upload")
const DRY_RUN = args.includes("--dry-run")

function run(label: string, script: string): void {
  console.log(`\n${"=".repeat(60)}`)
  console.log(`  ${label}`)
  console.log("=".repeat(60))

  const start = Date.now()
  execSync(`npx tsx ${script}`, { stdio: "inherit", cwd: process.cwd() })
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  console.log(`\n[pipeline] ${label} completed in ${elapsed}s`)
}

async function main(): Promise<void> {
  const pipelineStart = Date.now()

  console.log("\nPassPlus TikTok Pipeline")
  console.log(`Started at: ${new Date().toISOString()}`)

  if (SKIP_AUDIO) console.log("Flag: --skip-audio (no voiceover)")
  if (SKIP_UPLOAD) console.log("Flag: --skip-upload (no TikTok post)")
  if (DRY_RUN) console.log("Flag: --dry-run (question + audio only)")

  // Step 1 - Generate question
  run(
    "Step 1/5 - Generate Security+ question (Claude)",
    "scripts/tiktok-pipeline/generate-question.ts"
  )

  // Step 2 - Generate audio
  if (!SKIP_AUDIO && !DRY_RUN) {
    run(
      "Step 2/5 - Generate voiceover audio (ElevenLabs)",
      "scripts/tiktok-pipeline/generate-audio.ts"
    )
  } else if (SKIP_AUDIO) {
    console.log("\n[pipeline] Step 2/5 - Skipping audio (--skip-audio)")
  } else if (DRY_RUN) {
    // Still generate audio in dry run so it can be previewed
    run(
      "Step 2/5 - Generate voiceover audio (ElevenLabs)",
      "scripts/tiktok-pipeline/generate-audio.ts"
    )
    const elapsed = ((Date.now() - pipelineStart) / 1000).toFixed(1)
    console.log(`\n[pipeline] Dry run complete in ${elapsed}s`)
    console.log("[pipeline] Files saved to out/")
    console.log("           daily-question-data.json")
    console.log("           daily-question-audio.mp3")
    return
  }

  // Step 3 - Render video
  run(
    "Step 3/5 - Render video (Remotion)",
    "scripts/tiktok-pipeline/render-video.ts"
  )

  // Step 4 - Upload to TikTok
  if (!SKIP_UPLOAD) {
    run(
      "Step 4/5 - Upload to TikTok",
      "scripts/tiktok-pipeline/upload-tiktok.ts"
    )
  } else {
    console.log("\n[pipeline] Step 4/5 - Skipping upload (--skip-upload)")
  }

  // Step 5 - Log completion
  const totalElapsed = ((Date.now() - pipelineStart) / 1000).toFixed(1)
  const completedAt = new Date().toISOString()

  console.log(`\n${"=".repeat(60)}`)
  console.log("  Step 5/5 - Pipeline Complete")
  console.log("=".repeat(60))
  console.log(`\n[pipeline] All steps completed`)
  console.log(`[pipeline] Total time   : ${totalElapsed}s`)
  console.log(`[pipeline] Completed at : ${completedAt}`)
  console.log(`[pipeline] Output files :`)
  console.log("           out/daily-question-data.json")
  if (!SKIP_AUDIO) console.log("           out/daily-question-audio.mp3")
  if (!SKIP_UPLOAD && !DRY_RUN)
    console.log("           out/daily-question.mp4 (uploaded to TikTok)")
  else if (SKIP_UPLOAD)
    console.log("           out/daily-question.mp4 (local only)")
}

main().catch((err: unknown) => {
  console.error("\n[pipeline] PIPELINE FAILED:", err)
  process.exit(1)
})
