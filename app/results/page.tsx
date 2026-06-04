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
  ChevronUp,
  ChevronDown,
  Lock,
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
  getReadinessScore,
  type QuizSession,
} from "@/lib/quiz-store"
import { ReadinessRing } from "@/components/ReadinessRing"
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
  const [readiness, setReadiness] = useState<ReturnType<typeof getReadinessScore>>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const s = loadSession()
    setSession(s)
    setLoading(false)
    if (s && Object.keys(s.answers).length > 0) {
      const answeredTotal = Object.keys(s.answers).length
      sendGAEvent("event", "quiz_completed", { score: s.score, total: answeredTotal })
      recordQuizScore(s.score, answeredTotal)
      setReadiness(getReadinessScore())
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

  const SECPLUS_DOMAINS = [
    { id: 1 as const, name: "General Security Concepts" },
    { id: 2 as const, name: "Threats, Vulnerabilities & Mitigations" },
    { id: 3 as const, name: "Security Architecture" },
    { id: 4 as const, name: "Security Operations" },
    { id: 5 as const, name: "Security Program Management & Oversight" },
  ]
  const NETPLUS_DOMAINS = [
    { id: 1 as const, name: "Networking Concepts" },
    { id: 2 as const, name: "Network Implementation" },
    { id: 3 as const, name: "Network Operations" },
    { id: 4 as const, name: "Network Security" },
    { id: 5 as const, name: "Network Troubleshooting" },
  ]
  const APLUS_DOMAINS = [
    { id: 1 as const, name: "Mobile Devices" },
    { id: 2 as const, name: "Networking" },
    { id: 3 as const, name: "Hardware" },
    { id: 4 as const, name: "Virtualization & Cloud Computing" },
    { id: 5 as const, name: "Hardware & Network Troubleshooting" },
  ]
  const DOMAINS =
    session.cert === "netplus" ? NETPLUS_DOMAINS :
    session.cert === "aplus"   ? APLUS_DOMAINS  :
    SECPLUS_DOMAINS

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

  const certPath = (cert: string | undefined) =>
    cert && cert !== "secplus" ? `/quiz?cert=${cert}` : "/quiz"

  const handleNewSession = () => {
    clearSession()
    // Navigate to the same cert - quiz page will create a fresh session with
    // examMode undefined, so the mode selector is always shown on arrival.
    router.push(certPath(session?.cert))
  }

  const handleRestartQuiz = () => {
    setConfirmRestart(false)
    clearSession()
    router.push(certPath(session?.cert))
  }

  const handleResetProgress = () => {
    resetProgress()
    router.push("/")
  }

  const handlePracticeMissed = () => {
    if (session.missedIds.length === 0) return
    clearSession()
    const cert = (session?.cert ?? "secplus") as "secplus" | "netplus" | "aplus"
    const s = createSession("missed", session.missedIds, { cert })
    saveSession(s)
    router.push(certPath(cert))
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
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-6 shadow-[0_0_40px_-12px_rgba(0,0,0,0.4)]"
          >
            {/* Trophy with glow for good scores */}
            <div className={`relative flex items-center justify-center ${pct >= 70 ? "" : ""}`}>
              <div className={`absolute inset-0 rounded-full blur-xl pointer-events-none ${pct >= 80 ? "bg-yellow-400/20" : pct >= 70 ? "bg-yellow-400/10" : "bg-muted/20"}`} aria-hidden />
              <Trophy className={`relative w-12 h-12 ${pct >= 80 ? "text-yellow-400" : pct >= 70 ? "text-yellow-500" : "text-muted-foreground"}`} />
            </div>

            <div>
              <ScoreCounter
                target={pct}
                shouldReduce={!!shouldReduce}
                className={`text-7xl font-bold block mb-2 tabular-nums ${grade.color}`}
                suffix="%"
              />
              <div className={`text-base font-semibold tracking-wide ${grade.color}`}>
                {grade.label}
              </div>
            </div>

            <div className="flex gap-6 sm:gap-10 text-sm">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5 bg-accent-green/10 rounded-xl px-4 py-2">
                  <ScoreCounter
                    target={score}
                    shouldReduce={!!shouldReduce}
                    className="text-2xl font-bold text-accent-green tabular-nums"
                  />
                </div>
                <span className="text-muted-foreground text-xs">Correct</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5 bg-red-500/10 rounded-xl px-4 py-2">
                  <ScoreCounter
                    target={total - score}
                    shouldReduce={!!shouldReduce}
                    className="text-2xl font-bold text-red-400 tabular-nums"
                  />
                </div>
                <span className="text-muted-foreground text-xs">Wrong</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5 bg-muted rounded-xl px-4 py-2">
                  <span className="text-2xl font-bold tabular-nums">{total}</span>
                </div>
                <span className="text-muted-foreground text-xs">Total</span>
              </div>
            </div>

            <div className="bg-muted border border-border rounded-xl px-5 py-3 text-xs text-muted-foreground max-w-sm leading-relaxed">
              {session.cert === "netplus"
                ? "CompTIA Network+ typically requires ~75% to pass."
                : session.cert === "aplus"
                ? "CompTIA A+ typically requires ~675/900 (~75%) to pass."
                : "CompTIA Security+ typically requires ~75% to pass."}
            </div>
          </motion.div>

          {/* Readiness ring */}
          {readiness && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-3 shadow-sm"
            >
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide w-full text-center">Exam Readiness</h2>
              <ReadinessRing pct={readiness.pct} size={140} />
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                Based on your last 3 quiz scores
              </p>
            </motion.div>
          )}

          {/* Domain breakdown */}
          {domainStats.length > 0 && (
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5"
            >
              <h2 className="text-base font-bold tracking-tight">Domain Breakdown</h2>

              {/* relative wrapper so the overlay can sit flush over bars + legend */}
              <div className="relative flex flex-col gap-5">
                {/* Real domain bars - always rendered with actual user data */}
                <div className="flex flex-col gap-5">
                  {domainStats.map((d, i) => {
                    const incorrectPct = 100 - d.pct
                    return (
                      <div key={d.id} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {d.id}.0 {d.name}
                          </span>
                          <span className={`text-xs font-semibold tabular-nums ${d.pct >= 75 ? "text-accent-green" : d.pct >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                            {d.pct}% ({d.total}q)
                          </span>
                        </div>
                        <div className="flex h-2.5 rounded-full overflow-hidden bg-muted">
                          {/* Correct segment */}
                          {d.pct > 0 && (
                            <motion.div
                              className="rounded-l-full"
                              style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.6) 0%, rgba(16,185,129,0.85) 100%)" }}
                              initial={shouldReduce ? { width: `${d.pct}%` } : { width: "0%" }}
                              animate={{ width: `${d.pct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
                            />
                          )}
                          {/* Incorrect segment */}
                          {incorrectPct > 0 && (
                            <motion.div
                              className={`${d.pct === 0 ? "rounded-l-full" : ""} rounded-r-full`}
                              style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.7) 100%)" }}
                              initial={shouldReduce ? { width: `${incorrectPct}%` } : { width: "0%" }}
                              animate={{ width: `${incorrectPct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
                            />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 pt-1 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-2.5 rounded-full" style={{ background: "rgba(16,185,129,0.7)" }} />
                    <span className="text-xs text-muted-foreground">Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                    <span className="text-xs text-muted-foreground">Incorrect</span>
                  </div>
                </div>

                {/* Free user frosted glass overlay - only shown when not unlocked */}
                {!session?.isUnlocked && (
                  <div
                    className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-4"
                    style={{
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      background: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.35)",
                      }}
                    >
                      <Lock className="w-5 h-5 text-accent-green" />
                    </div>
                    <div className="text-center px-4 space-y-1.5">
                      <p className="text-sm font-semibold text-foreground">
                        Unlock your full domain breakdown
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        See exactly which domains to focus on before your exam
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        window.open(
                          "https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00",
                          "_blank"
                        )
                      }
                      className="bg-accent-green hover:bg-accent-hover text-black font-bold py-2.5 px-6 rounded-xl transition-colors text-sm min-h-[44px] cursor-pointer"
                    >
                      Get Full Access - $9.99
                    </button>
                  </div>
                )}
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
        {expanded
          ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        }
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
