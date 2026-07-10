# PassPlus Master Plan

The single source of truth for where PassPlus is, what has shipped, and what comes next.
Update this doc whenever a milestone lands or the roadmap changes.

## What PassPlus Is

CompTIA exam prep at `https://www.studypassplus.com`. One-time $9.99 unlock (no subscription)
for lifetime access across three certs:

| Cert | Exam | Practice Qs | Exam Qs | Total | PBQs |
|---|---|---|---|---|---|
| Security+ | SY0-701 | 275 | 245 | 520 | 10 |
| Network+ | N10-009 | 265 | 245 | 510 | 10 |
| A+ | 220-1101 / 220-1102 | 265 | 245 | 510 | 10 |
| **Total** | | | | **1,540** | **30** |

**Positioning vs competitors** (SecuSpark, Pocket Prep at $21/mo, CertMaster at $149/cert,
Dion): one cheap lifetime unlock, hands-on PBQs, AI explanations, and a generous free tier
that lets people taste every premium feature before paying.

### Free tier (the conversion engine)
- 25 practice / 10 exam questions per cert, no signup
- 2 fixed free PBQs per cert (exam sessions and the PBQ Drill)
- First 5 AI explanations per session
- Daily question at `/daily`, streaks, readiness score

### Paid tier ($9.99 one-time via Stripe)
- All 1,540 questions, all 30 PBQs (shuffled full bank)
- Unlimited AI explanations (claude-haiku, cert-specific prompts)
- Practice Missed mode, domain filters, exam-mode simulation

## Architecture Snapshot

- **Stack**: Next.js App Router, React 19, Tailwind v4, motion/react, lucide-react, Supabase
  (auth + `paid_users` + `presence`), Stripe payment link, GA4 via `@next/third-parties`.
- **State**: quiz sessions, streaks, and the unlock flag live in localStorage (cookie backup
  for Safari ITP); signing in restores the unlock via `/api/auth/check-paid`.
- **API routes**: `/api/explain` (AI explanations, tiered rate limits), `/api/presence`
  (live studying-now counter), auth/verify/webhook routes.
- **Schema**: `supabase/schema.sql` - run new statements in the Supabase SQL Editor when
  the file changes (the `presence` table must exist for the live counter to appear).

## Shipped Milestones (July 2026 improvement pass)

- [x] Question bank grown to 1,540 (60 new questions, duplicate-audited)
- [x] PBQ bank tripled to 30 (matching, ordering, fill-in-the-blank), 2 free per cert
- [x] Free AI explanations (first 5 per session) with cert-specific prompts
- [x] Keyboard shortcuts (1-4/A-D answer, Enter next, F flag)
- [x] Question flagging + review section on results
- [x] Share-my-score button with GA tracking
- [x] Live "studying right now" counter (hidden below 3 active users)
- [x] `/help` troubleshooting page (cache, unlock recovery, contact via Discord/email)
- [x] Accessibility pass: WCAG AA contrast, focus rings, cursor feedback, 44px touch targets
- [x] Design cleanup: all arrow glyphs and arrow icons removed from buttons
- [x] SEO: 13 blog posts, sitemap, FAQ schema, consistent counts everywhere

## Video / Social Pipeline (Remotion)

Two pieces, both in this repo:

1. **`my-video/`** - Remotion project (TikTok-style captioned vertical video).
   `src/CaptionedVideo` renders the composition; whisper.cpp generates word-level captions
   via `sub.mjs`. Renders land in `my-video/out/` (gitignored).
2. **`scripts/tiktok-pipeline/`** - end-to-end automation, run with
   `npx tsx scripts/tiktok-pipeline/run.ts`:
   - Step 1 `generate-question.ts` - Claude writes a quiz question script
   - Step 2 `generate-audio.ts` - ElevenLabs voiceover (`--skip-audio` for silent)
   - Step 3 `render-video.ts` - Remotion render
   - Step 4 `upload-tiktok.ts` - post to TikTok (`--skip-upload` to render only)
   - Env: `ANTHROPIC_API_KEY`, `ELEVENLABS_API_KEY`, `TIKTOK_ACCESS_TOKEN` in `.env.local`

**Video roadmap**
- [ ] Batch mode: render a week of dailies in one run
- [ ] Per-cert templates (Security+/Network+/A+ color accents)
- [ ] YouTube Shorts / Instagram Reels upload targets
- [ ] End-card CTA pointing at studypassplus.com/daily

## Roadmap

### Now / next
- [ ] Run the `presence` table SQL in Supabase (blocks the live counter - nothing breaks
      without it, the badge just stays hidden)
- [ ] Rotate the legacy unlock/support tokens that shipped in old public bundles
      (`UNLOCK_TOKENS` / `SUPPORT_TOKEN` in Vercel env; never rotate silently)
- [ ] Watch conversion after the free-PBQ + free-explanation launch (GA events:
      `unlock_clicked`, `unlock_clicked_teaser`, `pbq_*`)

### Content
- [ ] Keep growing banks toward ~600 per cert; **every addition requires the count sweep**
      (see Operational Rules)
- [ ] More PBQ types: drag-to-diagram, simulated CLI
- [ ] Blog: one post per week targeting long-tail exam queries

### Product ideas (unscheduled, revisit by demand)
- [ ] Spaced-repetition review queue for missed questions
- [ ] Cross-device progress sync for paid accounts (progress currently per browser)
- [ ] Light mode (skipped deliberately: ~50 dark-tuned colors need an audit first)
- [ ] GA Realtime globe/demographics (skipped: needs Google Cloud service account +
      3D globe library; the Supabase counter covers the social-proof need)

## Operational Rules

1. **Count sweep**: when questions change, update ALL of: `lib/quiz-store.ts` BANK_SIZES,
   `app/quiz/page.tsx` (domain options, allCount, course schema, paywall bullets),
   `app/page.tsx` (hero, badge, stats, features, FAQ, CTA), `app/layout.tsx` metadata,
   `app/results/page.tsx` upsell, `app/daily/DailyClient.tsx`, and every blog post.
   Verify with: `grep -rn "1,540\|1540\|520\|510" app lib` and check the totals math.
2. **Duplicate audit**: grep new question topics against the existing bank before adding.
3. **Never commit** `.env.local` or any secrets; keys are env-vars only.
4. **Design language**: dark theme, accent green #22C55E, no emojis, no em dashes,
   no arrow glyphs/icons in buttons, lucide-react icons only.
5. **Schema changes** go in `supabase/schema.sql` AND get run manually in the Supabase
   SQL Editor (there is no migration runner).
6. **Deploys**: push to `main` -> Vercel. `UNLOCK_TOKENS`, `SUPPORT_TOKEN`, Supabase and
   Anthropic keys must exist in Vercel env settings.

## Key Links

- Site: https://www.studypassplus.com
- Discord: https://discord.gg/wYUMRNFWEM
- Support email: studypassplus@gmail.com
- Stripe checkout: one payment link used by every unlock CTA (search `buy.stripe.com`)
- GA4 property: G-QCCNLSKBDS
