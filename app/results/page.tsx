"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  BookOpen,
  Trophy,
  Target,
  RotateCcw,
} from "lucide-react"
import { Logo } from "@/components/Logo"
import { sendGAEvent } from "@next/third-parties/google"
import {
  loadSession,
  clearSession,
  createSession,
  saveSession,
  resetProgress,
  type QuizSession,
} from "@/lib/quiz-store"
import { questions, type Question } from "@/data/questions"

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export default function ResultsPage() {
  const router = useRouter()
  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const s = loadSession()
    setSession(s)
    setLoading(false)
    if (s && Object.keys(s.answers).length > 0) {
      sendGAEvent("event", "quiz_completed", {
        score: s.score,
        total: Object.keys(s.answers).length,
      })
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm"
        >
          Loading results…
        </motion.div>
      </div>
    )
  }

  if (!session || Object.keys(session.answers).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground text-sm">No results to show yet.</p>
        <Link href="/quiz" className="text-accent-green text-sm hover:underline">
          Start a quiz →
        </Link>
      </div>
    )
  }

  const total = Object.keys(session.answers).length
  const score = session.score
  const pct = Math.round((score / total) * 100)
  const missedQuestions = questions.filter((q) =>
    session.missedIds.includes(q.id)
  )

  function gradeLabel(p: number) {
    if (p >= 90) return { label: "Excellent!", color: "text-accent-green" }
    if (p >= 80) return { label: "Strong Pass", color: "text-accent-green" }
    if (p >= 70) return { label: "Near Pass", color: "text-yellow-400" }
    return { label: "Keep Studying", color: "text-red-400" }
  }

  const grade = gradeLabel(pct)

  const handleNewSession = () => {
    clearSession()
    const s = createSession("normal")
    saveSession(s)
    router.push("/quiz")
  }

  const handleResetProgress = () => {
    resetProgress()
    router.push("/")
  }

  const handlePracticeMissed = () => {
    if (session.missedIds.length === 0) return
    clearSession()
    const s = createSession("missed", session.missedIds)
    saveSession(s)
    router.push("/quiz")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-5 py-3 flex items-center gap-2">
        <Logo size={28} />
        <span className="font-semibold text-sm tracking-tight">PassPlus</span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <motion.div
          className="w-full max-w-2xl flex flex-col gap-6"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Score card */}
          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-5 shadow-sm"
          >
            <Trophy className="w-9 h-9 text-yellow-400" />

            <div>
              <ScoreCounter
                target={pct}
                shouldReduce={!!shouldReduce}
                className={`text-6xl font-bold block mb-1 ${grade.color}`}
                suffix="%"
              />
              <div className={`text-lg font-semibold ${grade.color}`}>
                {grade.label}
              </div>
            </div>

            <div className="flex gap-8 text-sm">
              <div className="flex flex-col items-center gap-1">
                <ScoreCounter
                  target={score}
                  shouldReduce={!!shouldReduce}
                  className="text-2xl font-bold text-accent-green block"
                />
                <span className="text-muted-foreground text-xs">Correct</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ScoreCounter
                  target={total - score}
                  shouldReduce={!!shouldReduce}
                  className="text-2xl font-bold text-red-400 block"
                />
                <span className="text-muted-foreground text-xs">Wrong</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold">{total}</span>
                <span className="text-muted-foreground text-xs">Total</span>
              </div>
            </div>

            <div className="bg-muted border border-border rounded-xl px-4 py-3 text-xs text-muted-foreground max-w-sm">
              CompTIA Security+ typically requires ~75% to pass.
            </div>
          </motion.div>

          {/* Discord community */}
          <motion.div variants={shouldReduce ? {} : itemVariants}>
            <a
              href="https://discord.gg/pDRSfvr7D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 bg-card border border-border hover:border-[#5865F2]/40 rounded-2xl px-5 py-4 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.036.056a19.906 19.906 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Join our Security+ study community</p>
                  <p className="text-xs text-muted-foreground">discord.gg/pDRSfvr7D</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                Join →
              </span>
            </a>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.01 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              onClick={handleNewSession}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors text-sm min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4" />
              New Session
            </motion.button>

            {missedQuestions.length > 0 && (
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.01 }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
                onClick={handlePracticeMissed}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-xl transition-colors text-sm min-h-[44px]"
              >
                <Target className="w-4 h-4" />
                Practice {missedQuestions.length} Missed
              </motion.button>
            )}

            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 border border-border hover:bg-muted text-foreground font-medium py-3 rounded-xl transition-colors text-sm min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              Back Home
            </Link>
          </motion.div>

          <motion.div variants={shouldReduce ? {} : itemVariants}>
            <button
              onClick={handleResetProgress}
              className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px]"
            >
              <RotateCcw className="w-3 h-3" />
              Reset progress
            </button>
          </motion.div>

          {/* Missed questions */}
          {missedQuestions.length > 0 && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="flex flex-col gap-4"
            >
              <h2 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                <XCircle className="w-4 h-4 text-red-400" />
                Missed ({missedQuestions.length})
              </h2>
              <div className="flex flex-col gap-2">
                {missedQuestions.map((q, i) => (
                  <motion.div
                    key={q.id}
                    variants={shouldReduce ? {} : itemVariants}
                    custom={i}
                  >
                    <MissedCard
                      question={q}
                      yourAnswer={session.answers[q.id]}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Correct */}
          {score > 0 && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="flex flex-col gap-4"
            >
              <h2 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                <CheckCircle className="w-4 h-4 text-accent-green" />
                Correct ({score})
              </h2>
              <div className="flex flex-col gap-2">
                {questions
                  .filter(
                    (q) =>
                      q.id in session.answers &&
                      session.answers[q.id] === q.answer
                  )
                  .map((q) => (
                    <div
                      key={q.id}
                      className="flex items-start gap-3 bg-accent-green/5 border border-accent-green/15 rounded-xl px-4 py-3 text-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Q{q.id}{" "}
                        </span>
                        <span className="text-sm line-clamp-2">{q.question}</span>
                        <div className="text-accent-green text-xs mt-1">
                          {q.answer}. {q.options[q.answer]}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

function ScoreCounter({
  target,
  shouldReduce,
  className,
  suffix = "",
}: {
  target: number
  shouldReduce: boolean
  className?: string
  suffix?: string
}) {
  const [display, setDisplay] = useState(shouldReduce ? target : 0)

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(target)
      return
    }
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      setDisplay(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [target, shouldReduce])

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  )
}

function MissedCard({
  question,
  yourAnswer,
}: {
  question: Question
  yourAnswer: "A" | "B" | "C" | "D"
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-card border border-red-500/15 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors min-h-[44px]"
      >
        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <span className="text-muted-foreground text-xs">Q{question.id} </span>
          <span className="text-sm line-clamp-2">{question.question}</span>
        </div>
        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 flex flex-col gap-1.5 border-t border-border pt-3">
              {(["A", "B", "C", "D"] as const).map((opt) => {
                const isCorrect = opt === question.answer
                const isYours = opt === yourAnswer
                return (
                  <div
                    key={opt}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                      isCorrect
                        ? "bg-accent-green/10 border border-accent-green/25 text-green-300"
                        : isYours
                        ? "bg-red-500/10 border border-red-500/25 text-red-300"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="font-bold shrink-0 w-4 text-xs">{opt}.</span>
                    <span className="text-xs leading-relaxed">
                      {question.options[opt]}
                    </span>
                    {isCorrect && (
                      <CheckCircle className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5 ml-auto" />
                    )}
                    {isYours && !isCorrect && (
                      <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5 ml-auto" />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
