"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Lock, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { Progress } from "@/components/ui/progress"
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
    ? Math.round((session.currentIndex / session.questions.length) * 100)
    : 0

  const handleAnswer = useCallback(
    (choice: "A" | "B" | "C" | "D") => {
      if (!session || selected !== null || !currentQuestion) return

      setSelected(choice)
      const correct = choice === currentQuestion.answer
      sendGAEvent("event", "question_answered", { correct, question_id: currentQuestion.id })
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

    // Free user has exhausted their pool — show paywall instead of navigating.
    // Do NOT advance currentIndex so currentQuestion stays defined while the
    // overlay is visible.
    if (!session.isUnlocked && nextIndex >= session.questions.length) {
      sendGAEvent("event", "paywall_shown")
      setShowPaywall(true)
      setSelected(null)
      return
    }

    // Unlocked user (or missed-questions mode) finished all questions → results
    if (nextIndex >= session.questions.length) {
      saveSession({ ...session, currentIndex: nextIndex })
      router.push("/results")
      return
    }

    // Normal advance to next question
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
        <div className="text-muted-foreground text-sm">Loading questions…</div>
      </div>
    )
  }

  // Paywall takes over the full screen — render it even if currentQuestion is
  // somehow undefined (e.g. stale session edge case on reload).
  if (showPaywall || (!session?.isUnlocked && !currentQuestion && session)) {
    return (
      <PaywallOverlay
        onUnlock={handleUnlock}
        onGoToResults={() => router.push("/results")}
      />
    )
  }

  if (!session || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">No questions found.</p>
        <Link href="/" className="text-blue-400 text-sm hover:underline">
          ← Back home
        </Link>
      </div>
    )
  }

  const answeredCorrectly = selected === currentQuestion.answer
  const isLastFreeQuestion =
    !session.isUnlocked &&
    session.currentIndex === session.questions.length - 1

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-sm">PassPlus</span>
        </Link>
        <div className="text-xs text-muted-foreground">
          {session.currentIndex + 1} / {session.questions.length}&nbsp;·&nbsp;Score:{" "}
          {session.score}
          {!session.isUnlocked && (
            <span className="ml-2 text-yellow-400">Free tier</span>
          )}
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 pt-4">
        <Progress value={progress} className="h-1.5 bg-muted" />
      </div>

      {/* Quiz card */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Question meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
              Exam {currentQuestion.exam} · Q{currentQuestion.id}
            </span>
            {currentQuestion.tier === "locked" && !session.isUnlocked && (
              <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
          </div>

          {/* Question text */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-base leading-7 font-medium">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {(["A", "B", "C", "D"] as const).map((opt) => {
              const isCorrect = opt === currentQuestion.answer
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
                  text={currentQuestion.options[opt]}
                  variant={variant}
                  onClick={() => handleAnswer(opt)}
                  disabled={selected !== null}
                />
              )
            })}
          </div>

          {/* Feedback + Next */}
          {selected !== null && (
            <div className="mt-6 flex flex-col gap-4">
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  answeredCorrectly ? "text-green-400" : "text-red-400"
                }`}
              >
                {answeredCorrectly ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Wrong — correct answer:{" "}
                    {currentQuestion.answer}.{" "}
                    {currentQuestion.options[currentQuestion.answer]}
                  </>
                )}
              </div>
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors w-full"
              >
                {isLastFreeQuestion
                  ? "Continue →"
                  : session.currentIndex + 1 >= session.questions.length
                  ? "See Results"
                  : "Next Question"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function OptionButton({
  label,
  text,
  variant,
  onClick,
  disabled,
}: {
  label: string
  text: string
  variant: "default" | "correct" | "wrong"
  onClick: () => void
  disabled: boolean
}) {
  const base =
    "flex items-start gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-150 text-sm leading-relaxed"
  const styles = {
    default:
      "border-border bg-card hover:bg-muted hover:border-blue-500/50 cursor-pointer",
    correct:
      "border-green-500 bg-green-500/10 text-green-300 cursor-default",
    wrong: "border-red-500 bg-red-500/10 text-red-300 cursor-default",
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]}`}
    >
      <span
        className={`font-bold shrink-0 w-5 mt-0.5 ${
          variant === "correct"
            ? "text-green-400"
            : variant === "wrong"
            ? "text-red-400"
            : "text-muted-foreground"
        }`}
      >
        {label}.
      </span>
      <span>{text}</span>
      {variant === "correct" && (
        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5 ml-auto" />
      )}
      {variant === "wrong" && (
        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 ml-auto" />
      )}
    </button>
  )
}

function PaywallOverlay({
  onUnlock,
  onGoToResults,
}: {
  onUnlock: () => void
  onGoToResults: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Lock className="w-8 h-8 text-blue-400" />
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
        <div className="bg-muted rounded-xl px-6 py-4 text-center w-full">
          <div className="text-4xl font-bold text-foreground">$9.99</div>
          <div className="text-sm text-muted-foreground mt-1">
            one-time purchase · lifetime access
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onUnlock}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Unlock All 245 Questions — $9.99
          </button>
          <button
            onClick={onGoToResults}
            className="w-full text-muted-foreground hover:text-foreground text-sm transition-colors py-2"
          >
            See my results →
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Demo: &quot;Unlock&quot; sets{" "}
          <code className="text-xs">passplus_unlocked</code> in localStorage —
          no real payment.
        </p>
      </div>
    </div>
  )
}
