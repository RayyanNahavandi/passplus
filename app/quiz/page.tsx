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
import { Shield, Lock, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import {
  createSession,
  saveSession,
  loadSession,
  unlock,
  type QuizSession,
} from "@/lib/quiz-store"
import { type Question } from "@/data/questions"

export default function QuizPage() {
  const router = useRouter()
  const [session, setSession] = useState<QuizSession | null>(null)
  const [selected, setSelected] = useState<"A" | "B" | "C" | "D" | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [loading, setLoading] = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const existing = loadSession()
    if (existing && existing.currentIndex < existing.questions.length) {
      setSession(existing)
    } else {
      const s = createSession("normal")
      saveSession(s)
      setSession(s)
    }
    setLoading(false)
  }, [])

  const currentQuestion: Question | undefined =
    session?.questions[session.currentIndex]

  const progress = session
    ? (session.currentIndex / session.questions.length) * 100
    : 0

  const handleAnswer = useCallback(
    (choice: "A" | "B" | "C" | "D") => {
      if (!session || selected !== null || !currentQuestion) return
      setSelected(choice)
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
    },
    [session, selected, currentQuestion]
  )

  const handleNext = useCallback(() => {
    if (!session || selected === null) return
    const nextIndex = session.currentIndex + 1

    if (!session.isUnlocked && nextIndex >= session.questions.length) {
      sendGAEvent("event", "paywall_shown")
      setShowPaywall(true)
      setSelected(null)
      return
    }

    if (nextIndex >= session.questions.length) {
      saveSession({ ...session, currentIndex: nextIndex })
      router.push("/results")
      return
    }

    const updated = { ...session, currentIndex: nextIndex }
    saveSession(updated)
    setSession(updated)
    setSelected(null)
  }, [session, selected, router])

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

  if (!session || (!currentQuestion && !showPaywall)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground text-sm">No questions found.</p>
        <Link href="/" className="text-accent-green text-sm hover:underline">
          ← Back home
        </Link>
      </div>
    )
  }

  const answeredCorrectly = selected !== null && selected === currentQuestion?.answer
  const isLastFreeQuestion =
    !session.isUnlocked &&
    session.currentIndex === session.questions.length - 1

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Shield className="w-4 h-4 text-accent-green" />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            Q{(session.currentIndex + 1)} /{" "}
            {session.questions.length}
          </span>
          <span className="w-px h-3 bg-border" />
          <span>
            Score{" "}
            <span className="text-accent-green font-medium">{session.score}</span>
          </span>
          {!session.isUnlocked && (
            <>
              <span className="w-px h-3 bg-border" />
              <span className="text-yellow-500">Free</span>
            </>
          )}
        </div>
      </header>

      {/* Animated progress bar */}
      <div className="h-px bg-border w-full">
        <motion.div
          className="h-full bg-accent-green origin-left"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>

      {/* Quiz content */}
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={session.currentIndex}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Question meta */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                  Exam {currentQuestion?.exam} · Q{currentQuestion?.id}
                </span>
                {currentQuestion?.tier === "locked" && !session.isUnlocked && (
                  <span className="inline-flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-md">
                    <Lock className="w-3 h-3" />
                    Locked
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

              {/* Feedback + next */}
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
                          Wrong — correct answer:{" "}
                          {currentQuestion?.answer}.{" "}
                          {currentQuestion?.options[currentQuestion.answer]}
                        </>
                      )}
                    </div>

                    <motion.button
                      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                      animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      whileHover={shouldReduce ? {} : { scale: 1.01 }}
                      whileTap={shouldReduce ? {} : { scale: 0.98 }}
                      onClick={handleNext}
                      className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors w-full min-h-[44px] text-sm"
                    >
                      {isLastFreeQuestion
                        ? "Continue →"
                        : session.currentIndex + 1 >= session.questions.length
                        ? "See Results"
                        : "Next Question"}
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Paywall overlay */}
      <AnimatePresence>
        {showPaywall && (
          <PaywallOverlay
            onUnlock={handleUnlock}
            onGoToResults={() => router.push("/results")}
            shouldReduce={!!shouldReduce}
          />
        )}
      </AnimatePresence>
    </div>
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
      initial={
        shouldReduce ? {} : { opacity: 0, y: 8 }
      }
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
}: {
  onUnlock: () => void
  onGoToResults: () => void
  shouldReduce: boolean
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
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
              You&apos;ve finished your 25 free questions
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Unlock all{" "}
              <strong className="text-foreground">245 questions</strong> across
              three full practice exams covering every SY0-701 domain.
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
              onClick={onUnlock}
              className="w-full bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm"
            >
              Unlock All 245 Questions — $9.99
            </motion.button>
            <button
              onClick={onGoToResults}
              className="w-full text-muted-foreground hover:text-foreground text-sm transition-colors py-2 min-h-[44px]"
            >
              See my results →
            </button>
          </div>

          <p className="text-xs text-muted-foreground/60">
            Demo:{" "}
            <code className="text-xs font-mono">passplus_unlocked</code> is set
            in localStorage — no real payment.
          </p>
        </div>
      </motion.div>
    </>
  )
}
