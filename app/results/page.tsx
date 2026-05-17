"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, CheckCircle, XCircle, RefreshCw, BookOpen, Trophy, Target } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { loadSession, clearSession, createSession, saveSession, type QuizSession } from "@/lib/quiz-store"
import { questions, type Question } from "@/data/questions"

export default function ResultsPage() {
  const router = useRouter()
  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)

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
        <div className="text-muted-foreground text-sm">Loading results…</div>
      </div>
    )
  }

  if (!session || Object.keys(session.answers).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">No results to show yet.</p>
        <Link href="/quiz" className="text-blue-400 text-sm hover:underline">Start a quiz →</Link>
      </div>
    )
  }

  const total = Object.keys(session.answers).length
  const score = session.score
  const pct = Math.round((score / total) * 100)
  const missedQuestions = questions.filter((q) => session.missedIds.includes(q.id))

  function gradeLabel(p: number) {
    if (p >= 90) return { label: "Excellent!", color: "text-green-400" }
    if (p >= 80) return { label: "Strong Pass", color: "text-blue-400" }
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

  const handlePracticeMissed = () => {
    if (session.missedIds.length === 0) return
    clearSession()
    const s = createSession("missed", session.missedIds)
    saveSession(s)
    router.push("/quiz")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-500" />
        <span className="font-bold text-sm">PassPlus</span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12 gap-8">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          {/* Score card */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-sm">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <div className="text-6xl font-bold mb-1">{pct}%</div>
              <div className={`text-xl font-semibold ${grade.color}`}>{grade.label}</div>
            </div>
            <div className="flex gap-8 text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-green-400">{score}</span>
                <span className="text-muted-foreground">Correct</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-red-400">{total - score}</span>
                <span className="text-muted-foreground">Wrong</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold">{total}</span>
                <span className="text-muted-foreground">Total</span>
              </div>
            </div>

            {/* Passing guidance */}
            <div className="bg-muted rounded-xl px-4 py-3 text-xs text-muted-foreground max-w-sm">
              CompTIA Security+ typically requires ~75% to pass. Keep studying areas where you scored low.
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNewSession}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Session
            </button>
            {missedQuestions.length > 0 && (
              <button
                onClick={handlePracticeMissed}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-xl transition-colors"
              >
                <Target className="w-4 h-4" />
                Practice {missedQuestions.length} Missed
              </button>
            )}
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 border border-border hover:bg-muted text-foreground font-medium py-3 rounded-xl transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Back Home
            </Link>
          </div>

          {/* Missed questions review */}
          {missedQuestions.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                Missed Questions ({missedQuestions.length})
              </h2>
              <div className="flex flex-col gap-4">
                {missedQuestions.map((q) => {
                  const yourAnswer = session.answers[q.id]
                  return (
                    <MissedCard
                      key={q.id}
                      question={q}
                      yourAnswer={yourAnswer}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Correctly answered questions */}
          {score > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Correct ({score})
              </h2>
              <div className="flex flex-col gap-2">
                {questions
                  .filter((q) => q.id in session.answers && session.answers[q.id] === q.answer)
                  .map((q) => (
                    <div key={q.id} className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground text-xs">Q{q.id} &nbsp;</span>
                        <span className="text-sm line-clamp-2">{q.question}</span>
                        <div className="text-green-400 text-xs mt-1">
                          {q.answer}. {q.options[q.answer]}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
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
    <div className="bg-card border border-red-500/20 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
      >
        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <span className="text-muted-foreground text-xs">Q{question.id} &nbsp;</span>
          <span className="text-sm line-clamp-2">{question.question}</span>
        </div>
        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 flex flex-col gap-2 border-t border-border">
          <div className="mt-3 flex flex-col gap-1.5">
            {(["A", "B", "C", "D"] as const).map((opt) => {
              const isCorrect = opt === question.answer
              const isYours = opt === yourAnswer
              return (
                <div
                  key={opt}
                  className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                    isCorrect
                      ? "bg-green-500/10 border border-green-500/30 text-green-300"
                      : isYours
                      ? "bg-red-500/10 border border-red-500/30 text-red-300"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="font-bold shrink-0 w-4">{opt}.</span>
                  <span>{question.options[opt]}</span>
                  {isCorrect && <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5 ml-auto" />}
                  {isYours && !isCorrect && <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5 ml-auto" />}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
