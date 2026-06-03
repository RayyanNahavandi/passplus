This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## TikTok Content Pipeline

Automatically generates and posts a daily Security+ quiz video to TikTok.

### How it works

1. **Generate question** - Claude API creates a scenario-based Security+ question
2. **Generate audio** - ElevenLabs converts the question script to MP3 voiceover
3. **Render video** - Remotion composites the 1080x1920 TikTok video with audio baked in
4. **Upload to TikTok** - TikTok Content Posting API publishes the video
5. **Log completion** - Timestamp and output paths are logged

### Setup

Copy `.env.local` and fill in your keys:

```bash
cp .env.local .env.local
```

#### Required API keys

**Anthropic (Claude)**
- Create an account at [console.anthropic.com](https://console.anthropic.com)
- Generate an API key under API Keys
- Add to `.env.local` as `ANTHROPIC_API_KEY`

**ElevenLabs (TTS)**
- Create an account at [elevenlabs.io](https://elevenlabs.io)
- Go to Profile Settings and copy your API key
- Add to `.env.local` as `ELEVENLABS_API_KEY`
- Free tier: 10,000 characters per month (~30 daily questions)
- Starter tier ($5/month): 30,000 characters (~90 daily questions)
- Creator tier ($22/month): 100,000 characters - enough for unlimited daily posts

**TikTok**
- Register a developer app at [developers.tiktok.com](https://developers.tiktok.com)
- Enable the `video.upload` scope
- Complete OAuth flow to get an access token
- Add to `.env.local` as `TIKTOK_ACCESS_TOKEN`

### Run the full pipeline

```bash
# Source env vars first
source .env.local

# Run all 5 steps
npx tsx scripts/tiktok-pipeline/run.ts
```

### Run individual steps

```bash
# Step 1 - Generate question only
npx tsx scripts/tiktok-pipeline/generate-question.ts

# Step 2 - Generate audio only (reads from out/daily-question-data.json)
npx tsx scripts/tiktok-pipeline/generate-audio.ts

# Step 3 - Render video (includes audio if out/daily-question-audio.mp3 exists)
npx tsx scripts/tiktok-pipeline/render-video.ts

# Step 4 - Upload to TikTok (reads out/daily-question.mp4)
npx tsx scripts/tiktok-pipeline/upload-tiktok.ts
```

### Pipeline flags

```bash
# Generate question + audio only, no render or upload
npx tsx scripts/tiktok-pipeline/run.ts --dry-run

# Render without voiceover
npx tsx scripts/tiktok-pipeline/run.ts --skip-audio

# Render locally without posting to TikTok
npx tsx scripts/tiktok-pipeline/run.ts --skip-upload
```

### Preview the video template

```bash
npm run remotion:studio
```

Open [http://localhost:3000](http://localhost:3000) to preview and scrub through all four scenes.

### Render manually

```bash
npm run remotion:render
```

### Output files

All generated files are saved to the `out/` directory:

| File | Description |
|---|---|
| `out/daily-question-data.json` | Question, answers, explanation, domain |
| `out/daily-question-audio.mp3` | ElevenLabs voiceover |
| `out/render-props.json` | Props passed to Remotion renderer |
| `out/daily-question.mp4` | Final rendered video (1080x1920, 30fps, 30s) |
