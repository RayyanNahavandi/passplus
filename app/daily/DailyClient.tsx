"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  CheckCircle,
  XCircle,
  CalendarDays,
  Share2,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react"
import { Logo } from "@/components/Logo"
import { type Question } from "@/data/questions"
import { sendGAEvent } from "@next/third-parties/google"

const SITE_URL = "https://studypassplus.com"
const DAILY_URL = `${SITE_URL}/daily`

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.258 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function RedditIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.036.056a19.906 19.906 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  )
}

export function DailyClient({
  question,
  explanation,
  dateLabel,
}: {
  question: Question
  explanation: string
  dateLabel: string
}) {
  const [selected, setSelected] = useState<"A" | "B" | "C" | "D" | null>(null)
  const [copied, setCopied] = useState(false)
  const shouldReduce = useReducedMotion()

  const answered = selected !== null
  const answeredCorrectly = answered && selected === question.answer

  function handleAnswer(choice: "A" | "B" | "C" | "D") {
    if (answered) return
    setSelected(choice)
    sendGAEvent("event", "daily_question_answered", {
      correct: choice === question.answer,
      question_id: question.id,
    })
  }

  function handleCopy() {
    navigator.clipboard.writeText(DAILY_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareText = encodeURIComponent(
    "Can you answer today's Security+ Question of the Day? 🔐"
  )
  const shareUrl = encodeURIComponent(DAILY_URL)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
        <Link
          href="/quiz"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Full Quiz →
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <motion.div
          className="w-full max-w-2xl flex flex-col gap-5"
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
        >
          {/* Date badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
              <CalendarDays className="w-3 h-3" />
              {dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent-green/10 border border-accent-green/20 px-2.5 py-1 rounded-md text-accent-green">
              Question of the Day
            </span>
          </div>

          {/* Question meta */}
          <span className="text-xs text-muted-foreground">
            Exam {question.exam} · Q{question.id}
          </span>

          {/* Question card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <p className="text-base leading-7 font-medium">{question.question}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {(["A", "B", "C", "D"] as const).map((opt, i) => {
              const isCorrect = opt === question.answer
              const isChosen = selected === opt
              let variant: "default" | "correct" | "wrong" = "default"
              if (answered) {
                if (isCorrect) variant = "correct"
                else if (isChosen) variant = "wrong"
              }

              const bgColor =
                variant === "correct"
                  ? "rgba(34,197,94,0.1)"
                  : variant === "wrong"
                  ? "rgba(239,68,68,0.1)"
                  : "#111111"
              const borderColor =
                variant === "correct"
                  ? "#22C55E"
                  : variant === "wrong"
                  ? "#EF4444"
                  : "#222222"
              const textClass =
                variant === "correct"
                  ? "text-green-400"
                  : variant === "wrong"
                  ? "text-red-400"
                  : "text-foreground"
              const labelClass =
                variant === "correct"
                  ? "bg-accent-green/20 text-accent-green"
                  : variant === "wrong"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-muted text-muted-foreground"

              return (
                <motion.button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                  animate={
                    shouldReduce
                      ? {}
                      : {
                          opacity: 1,
                          y: 0,
                          backgroundColor: bgColor,
                          borderColor: borderColor,
                        }
                  }
                  transition={{
                    opacity: { duration: 0.2, delay: i * 0.04 },
                    y: { duration: 0.2, delay: i * 0.04 },
                    backgroundColor: { type: "spring", stiffness: 300, damping: 25 },
                    borderColor: { type: "spring", stiffness: 300, damping: 25 },
                  }}
                  whileHover={!answered && !shouldReduce ? { scale: 1.01 } : {}}
                  whileTap={!answered && !shouldReduce ? { scale: 0.98 } : {}}
                  className="flex items-start gap-3 w-full text-left px-4 py-3.5 rounded-xl border text-sm leading-relaxed disabled:cursor-default"
                  style={
                    shouldReduce
                      ? { backgroundColor: bgColor, borderColor: borderColor, minHeight: 44 }
                      : { minHeight: 44 }
                  }
                >
                  <span
                    className={`font-mono text-xs font-bold shrink-0 w-6 h-6 flex items-center justify-center rounded-md ${labelClass}`}
                  >
                    {opt}
                  </span>
                  <span className={`flex-1 pt-0.5 ${textClass}`}>
                    {question.options[opt]}
                  </span>
                  {variant === "correct" && (
                    <CheckCircle className="w-4 h-4 text-accent-green shrink-0 mt-0.5 ml-auto" />
                  )}
                  {variant === "wrong" && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 ml-auto" />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Feedback + explanation */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    answeredCorrectly ? "text-accent-green" : "text-red-400"
                  }`}
                >
                  {answeredCorrectly ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Correct!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Wrong — correct answer: {question.answer}.{" "}
                      {question.options[question.answer]}
                    </>
                  )}
                </div>

                {explanation && (
                  <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-accent-green font-medium">Why: </span>
                    {explanation}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share section — always visible */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" as const }}
            className="flex flex-col gap-3 pt-2"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share today&apos;s question</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=SecurityPlus,CompTIA,SY0701`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGAEvent("event", "daily_shared", { platform: "twitter" })}
                className="inline-flex items-center gap-2 bg-card border border-border hover:border-[#1DA1F2]/40 hover:text-[#1DA1F2] text-muted-foreground px-3 py-2 rounded-lg text-xs transition-colors"
              >
                <TwitterIcon />
                Post on X
              </a>

              {/* Reddit */}
              <a
                href={`https://reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent("Security+ Question of the Day — can you get it right?")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGAEvent("event", "daily_shared", { platform: "reddit" })}
                className="inline-flex items-center gap-2 bg-card border border-border hover:border-[#FF4500]/40 hover:text-[#FF4500] text-muted-foreground px-3 py-2 rounded-lg text-xs transition-colors"
              >
                <RedditIcon />
                Share on Reddit
              </a>

              {/* Discord (copy link — no intent URL for Discord) */}
              <a
                href="https://discord.gg/wYUMRNFWEM"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGAEvent("event", "daily_shared", { platform: "discord" })}
                className="inline-flex items-center gap-2 bg-card border border-border hover:border-[#5865F2]/40 hover:text-[#5865F2] text-muted-foreground px-3 py-2 rounded-lg text-xs transition-colors"
              >
                <DiscordIcon />
                Post in Discord
              </a>

              {/* Copy link */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-card border border-border hover:border-accent-green/40 hover:text-accent-green text-muted-foreground px-3 py-2 rounded-lg text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-green" />
                    <span className="text-accent-green">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy link
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-2 bg-card border border-border rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Want more questions?</p>
              <p className="text-xs text-muted-foreground">
                255 practice questions. No signup. Instant feedback.
              </p>
            </div>
            <Link
              href="/quiz"
              className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Start Free Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
