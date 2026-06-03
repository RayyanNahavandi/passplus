/**
 * Step 4 - Upload the rendered video to TikTok
 *
 * Uses the TikTok Content Posting API v2 (file upload flow).
 * Initializes the upload, streams the video in a single chunk,
 * then polls until the post is published.
 *
 * Required env vars:
 *   TIKTOK_ACCESS_TOKEN - OAuth 2.0 access token with video.upload scope
 *
 * The video is posted as private (SELF_ONLY) by default.
 * Change PRIVACY_LEVEL below to "PUBLIC_TO_EVERYONE" for live posts.
 */

import * as fs from "fs"
import * as path from "path"

// Change to "PUBLIC_TO_EVERYONE" when ready to go live
const PRIVACY_LEVEL = "SELF_ONLY"

const TIKTOK_INIT_URL =
  "https://open.tiktokapis.com/v2/post/publish/video/init/"
const TIKTOK_STATUS_URL =
  "https://open.tiktokapis.com/v2/post/publish/status/fetch/"

interface QuestionData {
  domain: string
}

function buildCaption(domain: string): string {
  // Extract the domain number, e.g. "Domain 4: Security Operations" -> "4"
  const domainMatch = domain.match(/Domain\s+(\d+)/i)
  const domainNum = domainMatch ? domainMatch[1] : "?"

  return [
    "Stop scrolling and lock in.",
    "",
    `Daily Security+ Question - Domain ${domainNum}`,
    "",
    "Drop your answer below. Answer reveal in 24 hours.",
    "",
    "#CompTIA #SecurityPlus #CyberSecurity #StudyWithMe #SY0701 #ITCerts #studytok #comptiaprep #learnontiktok",
  ].join("\n")
}

interface InitResponse {
  data: {
    publish_id: string
    upload_url: string
  }
  error?: {
    code: string
    message: string
  }
}

interface StatusResponse {
  data: {
    status: string
    publicaly_available_post_id?: string[]
    uploaded_bytes?: number
    fail_reason?: string
  }
  error?: {
    code: string
    message: string
  }
}

async function initializeUpload(
  accessToken: string,
  videoSizeBytes: number,
  caption: string
): Promise<{ uploadUrl: string; publishId: string }> {
  const response = await fetch(TIKTOK_INIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title: caption,
        privacy_level: PRIVACY_LEVEL,
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source: "FILE_UPLOAD",
        video_size: videoSizeBytes,
        chunk_size: videoSizeBytes,
        total_chunk_count: 1,
      },
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(
      `TikTok init upload failed ${response.status}: ${errText}`
    )
  }

  const data: InitResponse = await response.json()
  if (data.error && data.error.code !== "ok") {
    throw new Error(
      `TikTok API error: ${data.error.code} - ${data.error.message}`
    )
  }

  return {
    uploadUrl: data.data.upload_url,
    publishId: data.data.publish_id,
  }
}

async function uploadChunk(
  uploadUrl: string,
  videoBuffer: Buffer,
  videoSizeBytes: number
): Promise<void> {
  // Convert to Uint8Array - a valid BodyInit (ArrayBufferView)
  const uint8 = new Uint8Array(videoBuffer)

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Range": `bytes 0-${videoSizeBytes - 1}/${videoSizeBytes}`,
      "Content-Length": String(videoSizeBytes),
    },
    body: uint8,
  })

  if (response.status !== 201 && response.status !== 200) {
    const errText = await response.text()
    throw new Error(
      `TikTok chunk upload failed ${response.status}: ${errText}`
    )
  }
}

async function pollPublishStatus(
  accessToken: string,
  publishId: string,
  maxAttempts = 20
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await fetch(TIKTOK_STATUS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ publish_id: publishId }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(
        `TikTok status check failed ${response.status}: ${errText}`
      )
    }

    const data: StatusResponse = await response.json()
    const status = data.data.status

    console.log(
      `[tiktok] Status check ${attempt}/${maxAttempts}: ${status}`
    )

    if (status === "PUBLISH_COMPLETE") {
      const postIds = data.data.publicaly_available_post_id ?? []
      return postIds[0] ?? publishId
    }

    if (
      status === "FAILED" ||
      status === "PUBLISH_FAILED"
    ) {
      throw new Error(
        `TikTok publish failed: ${data.data.fail_reason ?? "unknown reason"}`
      )
    }
  }

  throw new Error(
    `TikTok publish timed out after ${maxAttempts} status checks`
  )
}

async function uploadToTikTok(): Promise<void> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error(
      "TIKTOK_ACCESS_TOKEN is not set. Add it to .env.local and run: source .env.local"
    )
  }

  const cwd = process.cwd()
  const videoPath = path.join(cwd, "out", "daily-question.mp4")

  if (!fs.existsSync(videoPath)) {
    throw new Error(
      `Video not found at ${videoPath}.\nRun render-video.ts first.`
    )
  }

  // Load domain info for the caption
  const dataPath = path.join(cwd, "out", "daily-question-data.json")
  const questionData: QuestionData = fs.existsSync(dataPath)
    ? JSON.parse(fs.readFileSync(dataPath, "utf-8"))
    : { domain: "Security+" }

  const caption = buildCaption(questionData.domain)
  const videoBuffer = fs.readFileSync(videoPath)
  const videoSizeBytes = videoBuffer.length

  const mb = (videoSizeBytes / (1024 * 1024)).toFixed(1)
  console.log(`[tiktok] Uploading video (${mb} MB)...`)
  console.log(`[tiktok] Privacy level: ${PRIVACY_LEVEL}`)

  // Step 1 - Initialize upload
  const { uploadUrl, publishId } = await initializeUpload(
    accessToken,
    videoSizeBytes,
    caption
  )
  console.log(`[tiktok] Upload initialized - publish ID: ${publishId}`)

  // Step 2 - Upload video chunk
  console.log("[tiktok] Uploading video chunk...")
  await uploadChunk(uploadUrl, videoBuffer, videoSizeBytes)
  console.log("[tiktok] Chunk uploaded successfully")

  // Step 3 - Poll for publish completion
  console.log("[tiktok] Waiting for TikTok to process video...")
  const postId = await pollPublishStatus(accessToken, publishId)

  console.log(`[tiktok] Published successfully`)
  console.log(`[tiktok] Post ID: ${postId}`)
  console.log(`[tiktok] Caption:\n${caption}`)
}

uploadToTikTok().catch((err: unknown) => {
  console.error("[tiktok] FAILED:", err)
  process.exit(1)
})
