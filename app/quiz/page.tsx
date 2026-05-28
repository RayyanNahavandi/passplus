"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  animate as motionAnimate,
  useReducedMotion,
} from "motion/react"
import { Lock, ChevronRight, ChevronLeft, CheckCircle, XCircle, Clock, Zap, RotateCcw, Flame, Target } from "lucide-react"
import { Logo } from "@/components/Logo"
import { sendGAEvent } from "@next/third-parties/google"
import { useAuth } from "@/components/AuthProvider"
import {
  createSession,
  createExamSession,
  saveSession,
  loadSession,
  unlock,
  updateStreak,
  getStreak,
  type QuizSession,
} from "@/lib/quiz-store"
import { type Question } from "@/data/questions"

const EXAM_DURATION = 90 * 60 // 5400 seconds

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function QuizPage() {
  const router = useRouter()
  const { displayName } = useAuth()
  const [cert, setCert] = useState<"secplus" | "netplus">("secplus")
  const [session, setSession] = useState<QuizSession | null>(null)
  const [selected, setSelected] = useState<"A" | "B" | "C" | "D" | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [loading, setLoading] = useState(true)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [confirmAction, setConfirmAction] = useState<
    null | "restart" | "to-exam" | "to-practice"
  >(null)
  const [streakCount, setStreakCount] = useState(0)
  const [streakMilestone, setStreakMilestone] = useState<number | null>(null)
  // 1 = forward, -1 = backward - drives slide direction
  const directionRef = useRef<1 | -1>(1)
  const streakUpdatedRef = useRef(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const certParam = (params.get("cert") ?? "secplus") as "secplus" | "netplus"
    setCert(certParam)

    const completed = localStorage.getItem("passplus_completed") === "true"
    const unlocked = localStorage.getItem("passplus_unlocked") === "true"
    if (completed && !unlocked) {
      router.replace("/")
      return
    }
    const existing = loadSession()
    if (existing && existing.currentIndex < existing.questions.length) {
      setSession(existing)
      // Restore selected answer if resuming a session on an already-answered question
      const q = existing.questions[existing.currentIndex]
      if (q) setSelected(existing.answers[q.id] ?? null)
    } else {
      const s = createSession("normal", undefined, { cert: certParam })
      saveSession(s)
      setSession(s)
    }
    setStreakCount(getStreak().count)
    setLoading(false)
  }, [router])

  // Exam timer - recalculates from examStartedAt each tick for accuracy across tab sleeps
  const examStartedAt = session?.examStartedAt
  const isExamMode = session?.examMode === true

  useEffect(() => {
    if (!isExamMode || !examStartedAt) return

    const tick = () => {
      const elapsed = Math.floor((Date.now() - examStartedAt) / 1000)
      const remaining = Math.max(0, EXAM_DURATION - elapsed)
      setTimeLeft(remaining)
      if (remaining === 0) {
        router.push("/results")
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isExamMode, examStartedAt, router])

  // Show mode selection when session has no answers, isn't a missed-questions session,
  // and examMode hasn't been chosen yet (undefined = not yet picked)
  const showModeSelect =
    session !== null &&
    Object.keys(session.answers).length === 0 &&
    session.mode !== "missed" &&
    session.examMode === undefined

  const handleStartPractice = useCallback(
    (opts: { count: number; domain: number | null }) => {
      const s = createSession("normal", undefined, {
        count: opts.count,
        domain: opts.domain ?? undefined,
        cert: session?.cert ?? "secplus",
      })
      const updated: QuizSession = { ...s, examMode: false }
      saveSession(updated)
      setSession(updated)
      sendGAEvent("event", "quiz_mode_selected", { mode: "practice" })
    },
    [session?.cert]
  )

  const handleStartExam = useCallback(() => {
    const s = createExamSession(session?.cert ?? "secplus")
    const updated: QuizSession = { ...s, examMode: true, examStartedAt: Date.now() }
    saveSession(updated)
    setSession(updated)
    setSelected(null)
    setExplanation(null)
    sendGAEvent("event", "quiz_mode_selected", { mode: "exam" })
  }, [session?.cert])

  const currentQuestion: Question | undefined =
    session?.questions[session.currentIndex]

  const progress = session
    ? (session.currentIndex / session.questions.length) * 100
    : 0

  const handleAnswer = useCallback(
    (choice: "A" | "B" | "C" | "D") => {
      if (!session || selected !== null || !currentQuestion) return
      setSelected(choice)
      setExplanation(null)
      setLoadingExplanation(true)
      const correct = choice === currentQuestion.answer
      sendGAEvent("event", "question_answered", {
        correct,
        question_id: currentQuestion.id,
      })
      const newAnswers = { ...session.answers, [currentQuestion.id]: choice }
      const newMissed = correct
        ? session.missedIds.filter((id) => id !== currentQuestion.id)
        : [...new Set([...session.missedIds, currentQuestion.id])]
      const updated: QuizSession = {
        ...session,
        answers: newAnswers,
        score: session.score + (correct ? 1 : 0),
        missedIds: newMissed,
      }
      saveSession(updated)
      setSession(updated)

      // Update streak once per session (idempotent within the same day)
      if (!streakUpdatedRef.current) {
        streakUpdatedRef.current = true
        const { count, milestone } = updateStreak()
        setStreakCount(count)
        if (milestone !== null) {
          setStreakMilestone(milestone)
          setTimeout(() => setStreakMilestone(null), 4000)
        }
      }

      if (session.isUnlocked) {
        fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: currentQuestion.question,
            options: currentQuestion.options,
            answer: currentQuestion.answer,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            setExplanation(data.explanation ?? null)
            setLoadingExplanation(false)
          })
          .catch(() => setLoadingExplanation(false))
      } else {
        setLoadingExplanation(false)
      }
    },
    [session, selected, currentQuestion]
  )

  const handleNext = useCallback(() => {
    if (!session || selected === null) return
    const nextIndex = session.currentIndex + 1

    if (!session.isUnlocked && nextIndex >= session.questions.length) {
      localStorage.setItem("passplus_completed", "true")
      sendGAEvent("event", "paywall_shown")
      setShowPaywall(true)
      setSelected(null)
      setExplanation(null)
      return
    }

    if (nextIndex >= session.questions.length) {
      saveSession({ ...session, currentIndex: nextIndex })
      router.push("/results")
      return
    }

    directionRef.current = 1
    const updated = { ...session, currentIndex: nextIndex }
    saveSession(updated)
    setSession(updated)
    // Restore saved answer for next question (null if not yet answered)
    const nextQ = updated.questions[nextIndex]
    setSelected(nextQ ? (updated.answers[nextQ.id] ?? null) : null)
    setExplanation(null)
    setLoadingExplanation(false)
  }, [session, selected, router])

  const handlePrev = useCallback(() => {
    if (!session || session.currentIndex <= 0) return
    const prevIndex = session.currentIndex - 1
    directionRef.current = -1
    const updated = { ...session, currentIndex: prevIndex }
    saveSession(updated)
    setSession(updated)
    // Restore the saved answer so the review state is visible (read-only)
    const prevQ = updated.questions[prevIndex]
    setSelected(prevQ ? (updated.answers[prevQ.id] ?? null) : null)
    setExplanation(null)
    setLoadingExplanation(false)
  }, [session])

  const handleConfirmAction = useCallback(() => {
    if (!session) { setConfirmAction(null); return }
    if (confirmAction === "restart") {
      setConfirmAction(null)
      const s = createSession("normal", undefined, { cert: session.cert ?? "secplus" })
      saveSession(s)
      setSession(s)
      setSelected(null)
      setExplanation(null)
      streakUpdatedRef.current = false
    } else if (confirmAction === "to-exam") {
      setConfirmAction(null)
      const s = createExamSession(session.cert ?? "secplus")
      const updated: QuizSession = { ...s, examMode: true, examStartedAt: Date.now() }
      saveSession(updated)
      setSession(updated)
      setSelected(null)
      setExplanation(null)
      streakUpdatedRef.current = false
    } else if (confirmAction === "to-practice") {
      setConfirmAction(null)
      const s = createSession("normal", undefined, { cert: session.cert ?? "secplus" })
      const updated: QuizSession = { ...s, examMode: false }
      saveSession(updated)
      setSession(updated)
      setSelected(null)
      setExplanation(null)
      streakUpdatedRef.current = false
    }
  }, [session, confirmAction])

  const handleUnlock = useCallback(() => {
    sendGAEvent("event", "unlock_clicked")
    unlock()
    const s = createSession("normal")
    saveSession(s)
    setSession(s)
    setShowPaywall(false)
    setSelected(null)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm"
        >
          Loading questions…
        </motion.div>
      </div>
    )
  }

  if (!session || (!currentQuestion && !showPaywall && !showModeSelect)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground text-sm">No questions found.</p>
        <Link href="/" className="text-accent-green text-sm hover:underline">
          ← Back home
        </Link>
      </div>
    )
  }

  // A question that was previously answered (navigated back to for review)
  const isReviewing =
    selected !== null &&
    currentQuestion !== undefined &&
    session.answers[currentQuestion.id] !== undefined &&
    // Only "reviewing" if we're not at the frontier (frontier = highest answered index)
    session.currentIndex < Object.keys(session.answers).length

  const answeredCorrectly = selected !== null && selected === currentQuestion?.answer
  const isLastFreeQuestion =
    !session.isUnlocked &&
    session.currentIndex === session.questions.length - 1

  const timerColor =
    timeLeft !== null && timeLeft <= 300
      ? "text-red-400"
      : timeLeft !== null && timeLeft <= 1200
      ? "text-yellow-500"
      : "text-muted-foreground"

  const slideX = shouldReduce ? 0 : 40

  const courseSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "CompTIA Security+ SY0-701 Practice Quiz",
      description:
        "Free practice questions for CompTIA Security+ SY0-701. 490 questions across Practice Mode and Exam Mode covering all five domains with instant feedback and domain-level score breakdown.",
      url: "https://studypassplus.com/quiz",
      provider: {
        "@type": "Organization",
        name: "PassPlus",
        url: "https://studypassplus.com",
      },
      teaches: "CompTIA Security+ SY0-701 exam preparation",
      educationalCredentialAwarded: "CompTIA Security+ SY0-701",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description:
            "25 free practice questions, no signup required. Full access to 490 questions for $9.99 one-time.",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "CompTIA Network+ N10-009 Practice Quiz",
      description:
        "Free practice questions for CompTIA Network+ N10-009. 490 questions across Practice Mode and Exam Mode covering all five domains with instant feedback and domain-level score breakdown.",
      url: "https://studypassplus.com/quiz?cert=netplus",
      provider: {
        "@type": "Organization",
        name: "PassPlus",
        url: "https://studypassplus.com",
      },
      teaches: "CompTIA Network+ N10-009 exam preparation",
      educationalCredentialAwarded: "CompTIA Network+ N10-009",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description:
            "10 free practice questions, no signup required. Full access to 490 questions for $9.99 one-time.",
        },
      },
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {/* Streak */}
          {streakCount > 0 && (
            <span className="flex items-center gap-1 text-orange-400 font-medium">
              <Flame className="w-3.5 h-3.5" />{streakCount}
            </span>
          )}

          {!showModeSelect && (
            <>
              <span className="w-px h-3 bg-border" />
              <span>
                Q{session.currentIndex + 1}/{session.questions.length}
              </span>
              <span className="w-px h-3 bg-border" />
              <span>
                Score{" "}
                <span className="text-accent-green font-medium">{session.score}</span>
              </span>
            </>
          )}

          {isExamMode && timeLeft !== null && (
            <>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 shrink-0" />
                <span className="hidden sm:inline">Time left</span>
                <span className={`font-mono font-semibold tabular-nums ${timerColor}`}>
                  {formatTime(timeLeft)}
                </span>
              </span>
            </>
          )}

          {!session.isUnlocked && !showModeSelect && (
            <>
              <span className="w-px h-3 bg-border" />
              <span className="text-yellow-500">Free</span>
            </>
          )}

          {/* Restart button */}
          {!showModeSelect && (
            <>
              <span className="w-px h-3 bg-border" />
              <button
                onClick={() => setConfirmAction("restart")}
                title="Restart quiz"
                className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Mode toggle - paid users only, not on mode select screen */}
          {!showModeSelect && session.isUnlocked && (
            <button
              onClick={() => setConfirmAction(isExamMode ? "to-practice" : "to-exam")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                isExamMode
                  ? "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                  : "border-accent-green/30 text-accent-green hover:bg-accent-green/10"
              }`}
            >
              {isExamMode ? <><Clock className="w-3 h-3" /> Exam</> : <><Zap className="w-3 h-3" /> Practice</>}
            </button>
          )}
        </div>
      </header>

      {/* Confirmation banner */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            key="confirm-banner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="sticky top-[57px] z-10 overflow-hidden bg-muted border-b border-border"
          >
            <div className="px-5 py-3 flex items-center justify-between gap-4 max-w-2xl mx-auto">
              <span className="text-sm text-foreground">
                {confirmAction === "restart" && "Restart quiz? All progress will be cleared."}
                {confirmAction === "to-exam" && "Start 90-min exam timer? Your progress is saved."}
                {confirmAction === "to-practice" && "Remove the timer? Your progress is saved."}
              </span>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleConfirmAction}
                  className="flex items-center justify-center bg-accent-green hover:bg-accent-hover text-black font-semibold px-3 py-1.5 rounded-lg text-xs min-h-[32px] transition-colors"
                >
                  {confirmAction === "restart" ? "Restart" : "Confirm"}
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex items-center justify-center border border-border hover:bg-background text-foreground font-medium px-3 py-1.5 rounded-lg text-xs min-h-[32px] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak milestone toast */}
      <AnimatePresence>
        {streakMilestone !== null && (
          <motion.div
            key="streak-toast"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-card border border-orange-500/30 rounded-2xl px-5 py-3 shadow-lg text-sm font-medium pointer-events-none"
          >
            <Flame className="w-5 h-5 text-orange-400 shrink-0" />
            <span className="text-foreground">
              {streakMilestone} day streak!{" "}
              <span className="text-orange-400">Keep it up!</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated progress bar */}
      {!showModeSelect && (
        <div className="h-px bg-border w-full">
          <motion.div
            className="h-full bg-accent-green origin-left"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        </div>
      )}

      {/* Mode selection */}
      {showModeSelect ? (
        <ModeSelectScreen
          onPractice={handleStartPractice}
          onExam={handleStartExam}
          shouldReduce={!!shouldReduce}
          displayName={displayName}
          isUnlocked={session.isUnlocked}
          cert={session?.cert ?? cert}
        />
      ) : (
        /* Quiz content */
        <main className="flex-1 flex flex-col items-center px-4 py-10">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={session.currentIndex}
                initial={
                  shouldReduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: directionRef.current * slideX }
                }
                animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={
                  shouldReduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: directionRef.current * -slideX }
                }
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {/* Question meta */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                    Exam {currentQuestion?.exam} · Q{currentQuestion?.id}
                  </span>
                  {isReviewing && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                      Review
                    </span>
                  )}
                </div>

                {/* Question text */}
                <div className="bg-card border border-border rounded-2xl p-6 mb-5 shadow-sm">
                  <p className="text-base leading-7 font-medium">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {(["A", "B", "C", "D"] as const).map((opt, i) => {
                    const isCorrect = opt === currentQuestion?.answer
                    const isChosen = selected === opt
                    let variant: "default" | "correct" | "wrong" = "default"
                    if (selected !== null) {
                      if (isCorrect) variant = "correct"
                      else if (isChosen) variant = "wrong"
                    }
                    return (
                      <OptionButton
                        key={opt}
                        label={opt}
                        text={currentQuestion?.options[opt] ?? ""}
                        variant={variant}
                        onClick={() => handleAnswer(opt)}
                        disabled={selected !== null}
                        index={i}
                        shouldReduce={!!shouldReduce}
                      />
                    )
                  })}
                </div>

                {/* Feedback + navigation */}
                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-5 flex flex-col gap-3"
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
                            Wrong. Correct answer:{" "}
                            {currentQuestion?.answer}.{" "}
                            {currentQuestion?.options[currentQuestion.answer]}
                          </>
                        )}
                      </div>

                      {/* Locked teaser - free users, wrong answer only */}
                      {!session.isUnlocked && !answeredCorrectly && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs text-muted-foreground"
                        >
                          Why is this wrong?{" "}
                          <a
                            href="https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sendGAEvent("event", "unlock_clicked_teaser")}
                            className="text-accent-green hover:text-accent-hover transition-colors"
                          >
                            Unlock full AI explanations
                          </a>
                        </motion.p>
                      )}

                      {/* AI explanation - paid users only */}
                      <AnimatePresence>
                        {session.isUnlocked && (loadingExplanation || explanation) && (
                          <motion.p
                            key="explanation"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            {loadingExplanation ? (
                              <span className="text-muted-foreground/40 italic text-xs">
                                Loading explanation…
                              </span>
                            ) : (
                              <>
                                <span className="text-accent-green font-medium">
                                  Why:{" "}
                                </span>
                                {explanation}
                              </>
                            )}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Navigation buttons row */}
                      <motion.div
                        initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                        animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="flex gap-2"
                      >
                        {/* Previous button - only when not on first question */}
                        {session.currentIndex > 0 && (
                          <motion.button
                            whileHover={shouldReduce ? {} : { scale: 1.01 }}
                            whileTap={shouldReduce ? {} : { scale: 0.98 }}
                            onClick={handlePrev}
                            className="flex items-center justify-center gap-1.5 border border-border hover:bg-muted text-foreground font-medium py-3 rounded-xl transition-colors min-h-[44px] text-sm px-4 shrink-0"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </motion.button>
                        )}

                        {/* Next / Continue / See Results button */}
                        <motion.button
                          whileHover={shouldReduce ? {} : { scale: 1.01 }}
                          whileTap={shouldReduce ? {} : { scale: 0.98 }}
                          onClick={handleNext}
                          className="flex flex-1 items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm"
                        >
                          {isLastFreeQuestion
                            ? "Continue →"
                            : session.currentIndex + 1 >= session.questions.length
                            ? "See Results"
                            : isReviewing
                            ? "Next Question"
                            : "Next Question"}
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      )}

      {/* Paywall overlay */}
      <AnimatePresence>
        {showPaywall && (
          <PaywallOverlay
            onUnlock={handleUnlock}
            onGoToResults={() => router.push("/results")}
            shouldReduce={!!shouldReduce}
            isExamMode={isExamMode}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const COUNT_OPTIONS = [
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "75", value: 75 },
  { label: "100", value: 100 },
  { label: "All (255)", value: 255 },
]

const DOMAIN_OPTIONS: { label: string; sublabel: string; value: number | null }[] = [
  { label: "All Domains", sublabel: "255 questions", value: null },
  { label: "Domain 1", sublabel: "General Security Concepts · 59 Qs", value: 1 },
  { label: "Domain 2", sublabel: "Threats, Vulnerabilities & Mitigations · 54 Qs", value: 2 },
  { label: "Domain 3", sublabel: "Security Architecture · 44 Qs", value: 3 },
  { label: "Domain 4", sublabel: "Security Operations · 69 Qs", value: 4 },
  { label: "Domain 5", sublabel: "Security Program Management · 19 Qs", value: 5 },
]

const NETWORK_DOMAIN_OPTIONS: { label: string; sublabel: string; value: number | null }[] = [
  { label: "All Domains", sublabel: "245 questions", value: null },
  { label: "Domain 1", sublabel: "Networking Concepts · 56 Qs", value: 1 },
  { label: "Domain 2", sublabel: "Network Implementation · 49 Qs", value: 2 },
  { label: "Domain 3", sublabel: "Network Operations · 48 Qs", value: 3 },
  { label: "Domain 4", sublabel: "Network Security · 45 Qs", value: 4 },
  { label: "Domain 5", sublabel: "Network Troubleshooting · 47 Qs", value: 5 },
]

function ModeSelectScreen({
  onPractice,
  onExam,
  shouldReduce,
  displayName,
  isUnlocked,
  cert,
}: {
  onPractice: (opts: { count: number; domain: number | null }) => void
  onExam: () => void
  shouldReduce: boolean
  displayName?: string | null
  isUnlocked: boolean
  cert: "secplus" | "netplus"
}) {
  const [step, setStep] = useState<"mode" | "practice-config">("mode")
  const [questionCount, setQuestionCount] = useState(25)
  const [domainFilter, setDomainFilter] = useState<number | null>(null)
  const activeDomainOptions = cert === "netplus" ? NETWORK_DOMAIN_OPTIONS : DOMAIN_OPTIONS

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {step === "mode" ? (
          <motion.div
            key="mode"
            className="w-full max-w-lg flex flex-col items-center gap-8"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          >
            <div className="text-center">
              {displayName && (
                <p className="text-sm text-accent-green font-medium mb-1 flex items-center justify-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Good luck, {displayName}!
                </p>
              )}
              <h1 className="text-2xl font-bold mb-2">Choose your mode</h1>
              <p className="text-sm text-muted-foreground">
                How would you like to study today?
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* Practice Mode */}
              <motion.button
                onClick={() => setStep("practice-config")}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
                initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" as const }}
                className="flex flex-col items-start gap-4 bg-card border border-border hover:border-accent-green/40 rounded-2xl p-6 text-left transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center group-hover:bg-accent-green/15 transition-colors">
                  <Zap className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h2 className="font-semibold text-base mb-1">Practice Mode</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    No timer. Answer at your own pace with instant feedback after
                    each question.
                  </p>
                </div>
              </motion.button>

              {/* Exam Mode */}
              <motion.button
                onClick={onExam}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
                initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" as const }}
                className="flex flex-col items-start gap-4 bg-card border border-border hover:border-accent-green/40 rounded-2xl p-6 text-left transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center group-hover:bg-accent-green/15 transition-colors">
                  <Clock className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h2 className="font-semibold text-base mb-1">Exam Mode</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert === "netplus"
                      ? "90 minute countdown. Simulates real Network+ exam conditions. Auto-submits when time runs out."
                      : "90 minute countdown. Simulates real Security+ exam conditions. Auto-submits when time runs out."}
                  </p>
                </div>
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground/60 text-center">
              {cert === "netplus"
                ? "CompTIA Network+ allows 90 minutes for the real exam"
                : "CompTIA Security+ allows 90 minutes for the real exam"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="practice-config"
            className="w-full max-w-lg flex flex-col gap-7"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          >
            {/* Header */}
            <div>
              <button
                onClick={() => setStep("mode")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-green" />
                </div>
                <h1 className="text-xl font-bold">Practice Mode</h1>
              </div>
              <p className="text-sm text-muted-foreground ml-12">
                Configure your session
              </p>
            </div>

            {/* Question count */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">Questions</label>
              <div className="flex flex-wrap gap-2">
                {COUNT_OPTIONS.map((opt) => {
                  const locked = !isUnlocked && opt.value !== 25
                  const selected = questionCount === opt.value
                  return (
                    <button
                      key={opt.value}
                      disabled={locked}
                      onClick={() => !locked && setQuestionCount(opt.value)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-colors min-h-[40px] ${
                        selected
                          ? "bg-accent-green/15 border-accent-green/50 text-accent-green"
                          : locked
                          ? "border-border text-muted-foreground/40 cursor-not-allowed"
                          : "border-border text-muted-foreground hover:border-accent-green/30 hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                      {locked && <Lock className="w-3 h-3" />}
                    </button>
                  )
                })}
              </div>
              {!isUnlocked && (
                <p className="text-xs text-muted-foreground/60">
                  Unlock to choose a larger set
                </p>
              )}
            </div>

            {/* Domain filter */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">
                Domain
                {!isUnlocked && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground/60 inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Paid only
                  </span>
                )}
              </label>
              <div className="flex flex-col gap-2">
                {activeDomainOptions.map((opt) => {
                  const locked = !isUnlocked && opt.value !== null
                  const selected = domainFilter === opt.value
                  return (
                    <button
                      key={opt.value ?? "all"}
                      disabled={locked}
                      onClick={() => !locked && setDomainFilter(opt.value)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors min-h-[48px] text-left ${
                        selected
                          ? "bg-accent-green/10 border-accent-green/40 text-foreground"
                          : locked
                          ? "border-border opacity-40 cursor-not-allowed"
                          : "border-border hover:border-accent-green/30 hover:bg-muted/50"
                      }`}
                    >
                      <span>
                        <span className="font-medium">{opt.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {opt.sublabel}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 shrink-0 ml-3">
                        {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />}
                        {selected && !locked && (
                          <span className="w-2 h-2 rounded-full bg-accent-green" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Start button */}
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.01 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              onClick={() => onPractice({ count: questionCount, domain: domainFilter })}
              className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold py-3.5 rounded-xl transition-colors min-h-[52px] text-sm"
            >
              Start Practice
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function OptionButton({
  label,
  text,
  variant,
  onClick,
  disabled,
  index,
  shouldReduce,
}: {
  label: string
  text: string
  variant: "default" | "correct" | "wrong"
  onClick: () => void
  disabled: boolean
  index: number
  shouldReduce: boolean
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (variant === "wrong" && !shouldReduce && buttonRef.current) {
      motionAnimate(
        buttonRef.current,
        { x: [0, 6, -6, 6, -6, 0] },
        { duration: 0.4, ease: "easeInOut" }
      )
    }
  }, [variant, shouldReduce])

  const bgColor =
    variant === "correct"
      ? "rgba(34, 197, 94, 0.1)"
      : variant === "wrong"
      ? "rgba(239, 68, 68, 0.1)"
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
      ref={buttonRef}
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
        opacity: { duration: 0.2, delay: index * 0.04 },
        y: { duration: 0.2, delay: index * 0.04 },
        backgroundColor: { type: "spring", stiffness: 300, damping: 25 },
        borderColor: { type: "spring", stiffness: 300, damping: 25 },
      }}
      whileHover={!disabled && !shouldReduce ? { scale: 1.01 } : {}}
      whileTap={!disabled && !shouldReduce ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="flex items-start gap-3 w-full text-left px-4 py-3.5 rounded-xl border text-sm leading-relaxed disabled:cursor-default"
      style={
        shouldReduce
          ? {
              backgroundColor: bgColor,
              borderColor: borderColor,
              minHeight: 44,
            }
          : { minHeight: 44 }
      }
    >
      <span
        className={`font-mono text-xs font-bold shrink-0 w-6 h-6 flex items-center justify-center rounded-md ${labelClass}`}
      >
        {label}
      </span>
      <span className={`flex-1 pt-0.5 ${textClass}`}>{text}</span>
      {variant === "correct" && (
        <CheckCircle className="w-4 h-4 text-accent-green shrink-0 mt-0.5 ml-auto" />
      )}
      {variant === "wrong" && (
        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 ml-auto" />
      )}
    </motion.button>
  )
}

function PaywallOverlay({
  onUnlock,
  onGoToResults,
  shouldReduce,
  isExamMode,
}: {
  onUnlock: () => void
  onGoToResults: () => void
  shouldReduce: boolean
  isExamMode: boolean
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        transition={
          shouldReduce
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 400, damping: 30 }
        }
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl pointer-events-auto">
          <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-accent-green" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">
              You&apos;ve finished your {isExamMode ? "10" : "25"} free questions
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Unlock all{" "}
              <strong className="text-foreground">980 questions</strong> across
              Practice Mode and Exam Mode for both Security+ and Network+.
            </p>
          </div>

          <div className="bg-muted border border-border rounded-xl px-6 py-4 text-center w-full">
            <div className="text-4xl font-bold">$9.99</div>
            <div className="text-xs text-muted-foreground mt-1">
              one-time · lifetime access
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.01 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              onClick={() =>
                window.open(
                  "https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00",
                  "_blank"
                )
              }
              className="w-full bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm"
            >
              Unlock All 980 Questions - $9.99
            </motion.button>
            <button
              onClick={onGoToResults}
              className="w-full text-muted-foreground/60 hover:text-muted-foreground text-xs transition-colors py-1 min-h-[36px]"
            >
              See my results →
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
