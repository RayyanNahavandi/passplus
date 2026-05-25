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
import { DiscordBanner } from "@/components/DiscordBanner"
import { sendGAEvent } from "@next/third-parties/google"
import {
  loadSession,
  clearSession,
  createSession,
  saveSession,
  resetProgress,
  recordQuizScore,
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
  const [confirmRestart, setConfirmRestart] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const s = loadSession()
    setSession(s)
    setLoading(false)
    if (s && Object.keys(s.answers).length > 0) {
      const answeredTotal = Object.keys(s.answers).length
      sendGAEvent("event", "quiz_completed", { score: s.score, total: answeredTotal })
      recordQuizScore(s.score, answeredTotal)
      if (!s.isUnlocked) {
        localStorage.setItem("passplus_completed", "true")
      }
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

  const DOMAINS = [
    { id: 1 as const, name: "General Security Concepts" },
    { id: 2 as const, name: "Threats, Vulnerabilities & Mitigations" },
    { id: 3 as const, name: "Security Architecture" },
    { id: 4 as const, name: "Security Operations" },
    { id: 5 as const, name: "Security Program Management & Oversight" },
  ]

  const domainStats = DOMAINS.map(({ id, name }) => {
    const domainQs = questions.filter(
      (q) => q.domain === id && q.id in session.answers
    )
    const correct = domainQs.filter(
      (q) => session.answers[q.id] === q.answer
    ).length
    const domainTotal = domainQs.length
    const domainPct = domainTotal > 0 ? Math.round((correct / domainTotal) * 100) : 0
    return { id, name, correct, total: domainTotal, pct: domainPct }
  }).filter((d) => d.total > 0)
    .sort((a, b) => a.pct - b.pct)

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

  const handleRestartQuiz = () => {
    setConfirmRestart(false)
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

          {/* Domain breakdown */}
          {domainStats.length > 0 && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5"
            >
              <h2 className="text-base font-bold">Domains</h2>
              <div className="flex flex-col gap-5">
                {domainStats.map((d, i) => {
                  const incorrectPct = 100 - d.pct
                  return (
                    <div key={d.id} className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-foreground">
                        {d.id}.0 – {d.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          ({d.total} question{d.total !== 1 ? "s" : ""})
                        </span>
                      </span>
                      <div className="flex h-8 rounded-md overflow-hidden">
                        {/* Correct segment */}
                        {d.pct > 0 && (
                          <motion.div
                            className="flex items-center justify-center bg-accent-green/20 text-accent-green text-xs font-semibold"
                            initial={shouldReduce ? { width: `${d.pct}%` } : { width: "0%" }}
                            animate={{ width: `${d.pct}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
                          >
                            {d.pct >= 12 ? `${d.pct}%` : ""}
                          </motion.div>
                        )}
                        {/* Incorrect segment */}
                        {incorrectPct > 0 && (
                          <motion.div
                            className="flex items-center justify-center bg-red-500/15 text-red-400 text-xs font-semibold"
                            initial={shouldReduce ? { width: `${incorrectPct}%` } : { width: "0%" }}
                            animate={{ width: `${incorrectPct}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
                          >
                            {incorrectPct >= 12 ? `${incorrectPct}%` : ""}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-accent-green/20 border border-accent-green/40" />
                  <span className="text-xs text-muted-foreground">Correct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-red-500/15 border border-red-500/30" />
                  <span className="text-xs text-muted-foreground">Incorrect</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Discord community */}
          <motion.div variants={shouldReduce ? {} : itemVariants}>
            <DiscordBanner />
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={shouldReduce ? {} : itemVariants}
            className="flex flex-col gap-3"
          >
            <AnimatePresence mode="wait">
              {confirmRestart ? (
                <motion.div
                  key="confirm"
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col sm:flex-row items-center gap-3 bg-muted border border-border rounded-2xl px-5 py-4"
                >
                  <span className="text-sm text-foreground font-medium flex-1 text-center sm:text-left">
                    Restart quiz? Your current results will be cleared.
                  </span>
                  <div className="flex gap-2 shrink-0">
                    <motion.button
                      whileHover={shouldReduce ? {} : { scale: 1.01 }}
                      whileTap={shouldReduce ? {} : { scale: 0.98 }}
                      onClick={handleRestartQuiz}
                      className="flex items-center justify-center gap-1.5 bg-accent-green hover:bg-accent-hover text-black font-semibold py-2 px-4 rounded-xl transition-colors text-sm min-h-[40px]"
                    >
                      Yes, restart
                    </motion.button>
                    <motion.button
                      whileHover={shouldReduce ? {} : { scale: 1.01 }}
                      whileTap={shouldReduce ? {} : { scale: 0.98 }}
                      onClick={() => setConfirmRestart(false)}
                      className="flex items-center justify-center gap-1.5 border border-border hover:bg-background text-foreground font-medium py-2 px-4 rounded-xl transition-colors text-sm min-h-[40px]"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="actions"
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={shouldReduce ? {} : { scale: 1.01 }}
                    whileTap={shouldReduce ? {} : { scale: 0.98 }}
                    onClick={() => setConfirmRestart(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors text-sm min-h-[44px]"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Restart Quiz
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
              )}
            </AnimatePresence>
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
