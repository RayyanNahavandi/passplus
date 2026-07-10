"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  animate as motionAnimate,
  useReducedMotion,
} from "motion/react"
import { Lock, Trophy, ChevronRight, ChevronLeft, CheckCircle, XCircle, Clock, Zap, RotateCcw, Flame, Target, Mail, CalendarDays, Puzzle, Flag } from "lucide-react"
import { Logo } from "@/components/Logo"
import { sendGAEvent } from "@next/third-parties/google"
import { useAuth } from "@/components/AuthProvider"
import { supabase } from "@/lib/supabase"
import {
  createSession,
  createExamSession,
  createPBQSession,
  saveSession,
  loadSession,
  isUnlocked,
  unlock,
  updateStreak,
  getStreak,
  getExamCountdown,
  type QuizSession,
} from "@/lib/quiz-store"
import { type Question } from "@/data/questions"
import { getPBQById, getPBQsForCert, getFreePBQsForCert } from "@/data/pbqQuestions"
import PBQRunner from "@/components/pbq/PBQRunner"

const EXAM_DURATION = 90 * 60 // 5400 seconds
// Free users get AI explanations on their first answers each session as a
// taste of the paid feature.
const FREE_EXPLANATIONS = 5

// Display positions for answer options (top to bottom).
const POSITION_LETTERS = ["A", "B", "C", "D"] as const
type Letter = "A" | "B" | "C" | "D"

// Fisher-Yates shuffle. Used to randomize answer-option order at render time
// so the correct answer does not cluster on any single letter (fixes the
// reported A/B/C/D distribution bias). The underlying question data is never
// mutated; only the display order changes.
function shuffleLetters(): Letter[] {
  const a: Letter[] = ["A", "B", "C", "D"]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function QuizPage() {
  const router = useRouter()
  const { displayName, isPaid } = useAuth()
  const [cert, setCert] = useState<"secplus" | "netplus" | "aplus">("secplus")
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
  const [combo, setCombo] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [examCountdown, setExamCountdown] = useState<ReturnType<typeof getExamCountdown>>(null)
  const [streakMilestone, setStreakMilestone] = useState<number | null>(null)
  // 1 = forward, -1 = backward - drives slide direction
  const directionRef = useRef<1 | -1>(1)
  const streakUpdatedRef = useRef(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const certParam = (params.get("cert") ?? "secplus") as "secplus" | "netplus" | "aplus"
    setCert(certParam)

    const completed = localStorage.getItem("passplus_completed") === "true"
    const unlocked = localStorage.getItem("passplus_unlocked") === "true"
    if (completed && !unlocked) {
      router.replace("/")
      return
    }
    const existing = loadSession()
    // Only resume a session if it is in-progress AND for the same cert as the URL.
    // Mismatched cert (user switched certs on the landing page) or a completed session
    // both get a fresh start so the mode selector is always shown.
    // Also discard stale free sessions when the user has since paid - they should get
    // a fresh paid session rather than resuming the 25-question free one.
    const existingCert = existing?.cert ?? "secplus"
    const sessionNeedsUpgrade = existing && !existing.isUnlocked && isUnlocked()
    // PBQ drill sessions have no multiple-choice questions, so they resume
    // whenever any PBQ is still unanswered.
    const pbqPending =
      existing?.pbqIds?.some((id) => !existing.pbqResults?.[id]) ?? false
    if (
      existing &&
      !sessionNeedsUpgrade &&
      (existing.currentIndex < existing.questions.length || pbqPending) &&
      existingCert === certParam
    ) {
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
    setExamCountdown(getExamCountdown(certParam))
    setLoading(false)
  }, [router])

  // When AuthProvider async-confirms paid status, upgrade any stale free session.
  // This fixes the race condition where the session was created before syncPaidStatus
  // resolved, and also handles new devices where localStorage was empty on load.
  useEffect(() => {
    if (!isPaid) return
    setSession((prev) => {
      if (!prev || prev.isUnlocked) return prev // already a paid session
      console.log("[quiz] isPaid confirmed - upgrading stale free session to paid")
      const fresh = createSession("normal", undefined, { cert: prev.cert ?? "secplus" })
      saveSession(fresh)
      return fresh
    })
  }, [isPaid])

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

  const handleStartPbq = useCallback(() => {
    const s = createPBQSession(session?.cert ?? "secplus")
    const updated: QuizSession = { ...s, examMode: false }
    saveSession(updated)
    setSession(updated)
    setSelected(null)
    setExplanation(null)
    sendGAEvent("event", "quiz_mode_selected", { mode: "pbq" })
  }, [session?.cert, session?.isUnlocked])

  const currentQuestion: Question | undefined =
    session?.questions[session.currentIndex]

  // PBQ phase: any session with unanswered PBQs shows those first (exam
  // sessions front-load them like the real CompTIA exam; drill sessions
  // contain only PBQs).
  const pbqCount = session?.pbqIds?.length ?? 0
  const pbqDone = session?.pbqResults
    ? Object.keys(session.pbqResults).length
    : 0
  const pendingPbqId = session?.pbqIds?.find(
    (id) => !session.pbqResults?.[id]
  )
  const currentPbq = pendingPbqId ? getPBQById(pendingPbqId) : undefined
  const inPbqPhase = !!currentPbq && !showModeSelect && !showPaywall

  // Randomized display order of the four options for the current question.
  // Recomputed whenever the displayed question changes (new id or index), so a
  // fresh order is produced each time a question is shown, while staying stable
  // across re-renders of the same question (e.g. after the user answers). The
  // original option letters are preserved underneath, so answer tracking,
  // scoring, and results are unaffected by the visual reordering.
  const displayOrder = useMemo<Letter[]>(
    () => shuffleLetters(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuestion?.id, session?.currentIndex]
  )

  // The display position (A-D) the correct answer now occupies after shuffling.
  const correctDisplayLetter: Letter | undefined = currentQuestion
    ? POSITION_LETTERS[displayOrder.indexOf(currentQuestion.answer)]
    : undefined

  const progress = !session
    ? 0
    : inPbqPhase
    ? (pbqDone / Math.max(pbqCount, 1)) * 100
    : session.questions.length > 0
    ? (session.currentIndex / session.questions.length) * 100
    : 100

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
      setCombo(correct ? (c) => c + 1 : 0)

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
        // Get the current Supabase session token to authenticate the explain request.
        // The server verifies this to prevent unauthenticated access to the AI endpoint.
        supabase.auth.getSession().then(({ data: { session: authSession } }) => {
          const headers: Record<string, string> = { "Content-Type": "application/json" }
          if (authSession?.access_token) {
            headers["Authorization"] = `Bearer ${authSession.access_token}`
          }
          return fetch("/api/explain", {
            method: "POST",
            headers,
            body: JSON.stringify({
              question: currentQuestion.question,
              options: currentQuestion.options,
              answer: currentQuestion.answer,
              cert: session.cert ?? "secplus",
            }),
          })
        })
          .then((r) => (r instanceof Response ? r : null)?.json())
          .then((data) => {
            setExplanation(data?.explanation ?? null)
            setLoadingExplanation(false)
          })
          .catch(() => setLoadingExplanation(false))
      } else if (Object.keys(session.answers).length < FREE_EXPLANATIONS) {
        // Free sample: AI explanations for the first few answers per session.
        fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: currentQuestion.question,
            options: currentQuestion.options,
            answer: currentQuestion.answer,
            cert: session.cert ?? "secplus",
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            setExplanation(data?.explanation ?? null)
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
      // Safety net: re-check live paid status. The session may have been created
      // before payment completed (race condition). If the user has since paid,
      // silently upgrade to a fresh paid session instead of showing the paywall.
      if (isUnlocked()) {
        const fresh = createSession("normal", undefined, { cert: session.cert ?? "secplus" })
        const withMode: QuizSession = { ...fresh, examMode: false }
        saveSession(withMode)
        setSession(withMode)
        setSelected(null)
        setExplanation(null)
        return
      }
      localStorage.setItem("passplus_completed", "true")
      sendGAEvent("event", "paywall_shown")
      setShowPaywall(true)
      setSelected(null)
      setExplanation(null)
      return
    }

    if (nextIndex >= session.questions.length) {
      saveSession({ ...session, currentIndex: nextIndex })
      setShowSummary(true)
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

  const handlePbqComplete = useCallback(
    (result: { correct: number; total: number; domain: number }) => {
      if (!session || !currentPbq) return
      const updated: QuizSession = {
        ...session,
        pbqResults: { ...(session.pbqResults ?? {}), [currentPbq.id]: result },
      }
      saveSession(updated)
      sendGAEvent("event", "pbq_completed", {
        pbq_id: currentPbq.id,
        correct: result.correct,
        total: result.total,
      })

      if (!streakUpdatedRef.current) {
        streakUpdatedRef.current = true
        const { count, milestone } = updateStreak()
        setStreakCount(count)
        if (milestone !== null) {
          setStreakMilestone(milestone)
          setTimeout(() => setStreakMilestone(null), 4000)
        }
      }

      const remaining =
        updated.pbqIds?.some((id) => !updated.pbqResults?.[id]) ?? false
      if (!remaining && updated.questions.length === 0) {
        // PBQ-only drill finished: go straight to results without updating
        // state so the empty-question guard never flashes.
        router.push("/results")
        return
      }
      setSession(updated)
    },
    [session, currentPbq, router]
  )

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
      setCombo(0)
      streakUpdatedRef.current = false
    } else if (confirmAction === "to-exam") {
      setConfirmAction(null)
      const s = createExamSession(session.cert ?? "secplus")
      const updated: QuizSession = { ...s, examMode: true, examStartedAt: Date.now() }
      saveSession(updated)
      setSession(updated)
      setSelected(null)
      setExplanation(null)
      setCombo(0)
      streakUpdatedRef.current = false
    } else if (confirmAction === "to-practice") {
      setConfirmAction(null)
      const s = createSession("normal", undefined, { cert: session.cert ?? "secplus" })
      const updated: QuizSession = { ...s, examMode: false }
      saveSession(updated)
      setSession(updated)
      setSelected(null)
      setExplanation(null)
      setCombo(0)
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
    setCombo(0)
  }, [])

  const handleToggleFlag = useCallback(() => {
    if (!session || !currentQuestion) return
    const flagged = session.flaggedIds ?? []
    const next = flagged.includes(currentQuestion.id)
      ? flagged.filter((id) => id !== currentQuestion.id)
      : [...flagged, currentQuestion.id]
    const updated: QuizSession = { ...session, flaggedIds: next }
    saveSession(updated)
    setSession(updated)
  }, [session, currentQuestion])

  // Keyboard shortcuts: 1-4 or A-D to answer, Enter/ArrowRight for next,
  // ArrowLeft for previous, F to flag. Disabled while overlays, PBQs, or
  // inputs are active.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showModeSelect || showPaywall || showSummary || inPbqPhase || confirmAction) return
      const target = e.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const key = e.key.toLowerCase()
      if (selected === null) {
        const numIdx = ["1", "2", "3", "4"].indexOf(key)
        const letterIdx = ["a", "b", "c", "d"].indexOf(key)
        const idx = numIdx !== -1 ? numIdx : letterIdx
        if (idx !== -1) {
          e.preventDefault()
          handleAnswer(displayOrder[idx])
          return
        }
      } else if (key === "enter" || key === "arrowright") {
        e.preventDefault()
        handleNext()
        return
      }
      if (key === "arrowleft") {
        e.preventDefault()
        handlePrev()
        return
      }
      if (key === "f") {
        e.preventDefault()
        handleToggleFlag()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [
    showModeSelect,
    showPaywall,
    showSummary,
    inPbqPhase,
    confirmAction,
    selected,
    displayOrder,
    handleAnswer,
    handleNext,
    handlePrev,
    handleToggleFlag,
  ])

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

  if (!session || (!currentQuestion && !showPaywall && !showModeSelect && !inPbqPhase)) {
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

  const isFlagged =
    currentQuestion !== undefined &&
    (session.flaggedIds ?? []).includes(currentQuestion.id)

  const answeredCorrectly = selected !== null && selected === currentQuestion?.answer
  const isLastFreeQuestion =
    !session.isUnlocked &&
    session.currentIndex === session.questions.length - 1

  const timerColor =
    timeLeft !== null && timeLeft <= 300
      ? "text-red-400 animate-pulse bg-red-500/10 border border-red-500/25 rounded-md px-1.5"
      : timeLeft !== null && timeLeft <= 900
      ? "text-orange-400"
      : timeLeft !== null && timeLeft <= 1800
      ? "text-yellow-400"
      : "text-muted-foreground"

  const slideX = shouldReduce ? 0 : 40

  const courseSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "CompTIA Security+ SY0-701 Practice Quiz",
      description:
        "Free practice questions for CompTIA Security+ SY0-701. 520 questions across Practice Mode and Exam Mode covering all five domains with instant feedback and domain-level score breakdown.",
      url: "https://www.studypassplus.com/quiz",
      provider: {
        "@type": "Organization",
        name: "PassPlus",
        url: "https://www.studypassplus.com",
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
            "25 free practice questions, no signup required. Full access to 520 questions for $9.99 one-time.",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "CompTIA Network+ N10-009 Practice Quiz",
      description:
        "Free practice questions for CompTIA Network+ N10-009. 510 questions across Practice Mode and Exam Mode covering all five domains with instant feedback and domain-level score breakdown.",
      url: "https://www.studypassplus.com/quiz?cert=netplus",
      provider: {
        "@type": "Organization",
        name: "PassPlus",
        url: "https://www.studypassplus.com",
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
            "38 free practice questions, no signup required. Full access to 510 questions for $9.99 one-time.",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "CompTIA A+ Core 1 & Core 2 Practice Quiz",
      description:
        "Free practice questions for CompTIA A+ (220-1101 Core 1 & 220-1102 Core 2). 510 questions across Practice Mode and Exam Mode covering both Core exams with instant feedback and domain-level score breakdown.",
      url: "https://www.studypassplus.com/quiz?cert=aplus",
      provider: {
        "@type": "Organization",
        name: "PassPlus",
        url: "https://www.studypassplus.com",
      },
      teaches: "CompTIA A+ Core 1 (220-1101) and Core 2 (220-1102) exam preparation",
      educationalCredentialAwarded: "CompTIA A+",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description:
            "Free practice questions, no signup required. Full access to 510 questions for $9.99 one-time.",
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
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm px-4 sm:px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Logo size={28} />
          <span className="hidden sm:inline font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
          {/* Streak */}
          {streakCount > 0 && (
            <span className="flex items-center gap-1 text-orange-400 font-medium">
              <Flame className="w-3.5 h-3.5" />{streakCount}
            </span>
          )}

          {/* Exam countdown - only when the user has set an exam date */}
          {!isExamMode && examCountdown && (
            <span
              className="flex items-center gap-1 text-accent-green font-medium"
              title={`${examCountdown.daysLeft} days until your exam`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              {examCountdown.daysLeft}d
            </span>
          )}

          {!showModeSelect && inPbqPhase && (
            <>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1">
                <Puzzle className="w-3 h-3 shrink-0" />
                PBQ {Math.min(pbqDone + 1, pbqCount)}/{pbqCount}
              </span>
            </>
          )}

          {!showModeSelect && !inPbqPhase && (
            <>
              <span className="w-px h-3 bg-border" />
              <span>
                Q{session.currentIndex + 1}/{session.questions.length}
              </span>
              <span className="w-px h-3 bg-border" />
              <span>
                <span className="hidden sm:inline">Score </span>
                <span className="text-accent-green font-medium">{session.score}</span>
              </span>
              <AnimatePresence>
                {combo >= 3 && (
                  <motion.span
                    key={combo}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 4 }}
                    animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={
                      shouldReduce
                        ? { duration: 0.15 }
                        : { type: "spring", stiffness: 500, damping: 22 }
                    }
                    className="flex items-center gap-1 bg-accent-green/10 border border-accent-green/25 text-accent-green font-semibold px-2 py-0.5 rounded-full"
                  >
                    <Zap className="w-3 h-3 shrink-0" />
                    {combo}x
                  </motion.span>
                )}
              </AnimatePresence>
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
                aria-label="Restart quiz"
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
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
        <div
          className="h-1.5 bg-border w-full"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <motion.div
            className="h-full origin-left rounded-r-full relative"
            style={{ background: "linear-gradient(90deg, rgba(34,197,94,0.8) 0%, #22C55E 100%)" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            {/* Glow dot at the leading edge */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-green shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]" aria-hidden />
          </motion.div>
        </div>
      )}

      {/* Mode selection */}
      {showModeSelect ? (
        <ModeSelectScreen
          onPractice={handleStartPractice}
          onExam={handleStartExam}
          onPbq={handleStartPbq}
          shouldReduce={!!shouldReduce}
          displayName={displayName}
          isUnlocked={session.isUnlocked}
          cert={session?.cert ?? cert}
        />
      ) : inPbqPhase && currentPbq ? (
        <main className="flex-1 flex flex-col items-center px-4 py-10">
          <div className="w-full max-w-2xl">
            <PBQRunner
              key={currentPbq.id}
              pbq={currentPbq}
              index={pbqDone}
              count={pbqCount}
              shouldReduce={!!shouldReduce}
              isLast={pbqDone + 1 >= pbqCount && session.questions.length === 0}
              onComplete={handlePbqComplete}
            />
          </div>
        </main>
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
                    Exam {currentQuestion?.exam} · {currentQuestion?.id}
                  </span>
                  {isReviewing && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                      Review
                    </span>
                  )}
                  <button
                    onClick={handleToggleFlag}
                    aria-pressed={isFlagged}
                    aria-label={isFlagged ? "Remove flag from this question" : "Flag this question for review"}
                    title={isFlagged ? "Unflag question" : "Flag for review (F)"}
                    className={`ml-auto inline-flex items-center gap-1.5 text-xs font-medium border px-2.5 py-2 rounded-md transition-colors min-h-[36px] cursor-pointer ${
                      isFlagged
                        ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-400"
                        : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-yellow-500/30"
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isFlagged ? "fill-yellow-400" : ""}`} />
                    <span className="hidden sm:inline">{isFlagged ? "Flagged" : "Flag"}</span>
                  </button>
                </div>

                {/* Question text */}
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 mb-5 shadow-sm">
                  <p className="text-base leading-[1.75] font-medium">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {displayOrder.map((opt, i) => {
                    // `opt` is the original data letter; `i` is its shuffled
                    // display slot, relabeled A-D top to bottom.
                    const positionLetter = POSITION_LETTERS[i]
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
                        label={positionLetter}
                        text={currentQuestion?.options[opt] ?? ""}
                        variant={variant}
                        chosen={isChosen}
                        onClick={() => handleAnswer(opt)}
                        disabled={selected !== null}
                        index={i}
                        shouldReduce={!!shouldReduce}
                      />
                    )
                  })}
                </div>

                {/* Keyboard hint - desktop only */}
                {selected === null && (
                  <p className="hidden sm:block mt-3 text-[11px] text-muted-foreground/50 text-center">
                    Press 1-4 or A-D to answer
                  </p>
                )}

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
                            {correctDisplayLetter}.{" "}
                            {currentQuestion?.options[currentQuestion.answer]}
                          </>
                        )}
                      </div>

                      {/* Locked teaser - free users past the sample, wrong answer only */}
                      {!session.isUnlocked &&
                        !answeredCorrectly &&
                        !loadingExplanation &&
                        !explanation && (
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

                      {/* AI explanation - paid users always, free users for the first sample answers */}
                      <AnimatePresence>
                        {(loadingExplanation || explanation) && (
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
                                {!session.isUnlocked && (
                                  <span className="block mt-1.5 text-xs text-muted-foreground/60">
                                    Free AI explanation{" "}
                                    {Math.min(
                                      Object.keys(session.answers).length,
                                      FREE_EXPLANATIONS
                                    )}{" "}
                                    of {FREE_EXPLANATIONS}.{" "}
                                    <a
                                      href="https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() =>
                                        sendGAEvent("event", "unlock_clicked_teaser")
                                      }
                                      className="text-accent-green hover:text-accent-hover transition-colors"
                                    >
                                      Unlock unlimited
                                    </a>
                                  </span>
                                )}
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

      {/* Session summary overlay */}
      <AnimatePresence>
        {showSummary && (
          <SessionSummaryOverlay
            session={session}
            streakCount={streakCount}
            shouldReduce={!!shouldReduce}
            onContinue={() => router.push("/results")}
          />
        )}
      </AnimatePresence>

      {/* Paywall overlay */}
      <AnimatePresence>
        {showPaywall && (
          <PaywallOverlay
            onUnlock={handleUnlock}
            onGoToResults={() => router.push("/results")}
            shouldReduce={!!shouldReduce}
            freeCount={session.questions.length}
            cert={session.cert ?? "secplus"}
            score={session.score}
            total={Object.keys(session.answers).length}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const DOMAIN_OPTIONS: { label: string; sublabel: string; value: number | null }[] = [
  { label: "All Domains", sublabel: "275 questions", value: null },
  { label: "Domain 1", sublabel: "General Security Concepts · 65 Qs", value: 1 },
  { label: "Domain 2", sublabel: "Threats, Vulnerabilities & Mitigations · 59 Qs", value: 2 },
  { label: "Domain 3", sublabel: "Security Architecture · 50 Qs", value: 3 },
  { label: "Domain 4", sublabel: "Security Operations · 77 Qs", value: 4 },
  { label: "Domain 5", sublabel: "Security Program Management · 24 Qs", value: 5 },
]

const NETWORK_DOMAIN_OPTIONS: { label: string; sublabel: string; value: number | null }[] = [
  { label: "All Domains", sublabel: "265 questions", value: null },
  { label: "Domain 1", sublabel: "Networking Concepts · 60 Qs", value: 1 },
  { label: "Domain 2", sublabel: "Network Implementation · 53 Qs", value: 2 },
  { label: "Domain 3", sublabel: "Network Operations · 52 Qs", value: 3 },
  { label: "Domain 4", sublabel: "Network Security · 49 Qs", value: 4 },
  { label: "Domain 5", sublabel: "Network Troubleshooting · 51 Qs", value: 5 },
]

// A+ spans two exams (Core 1 & Core 2) whose domain numbers overlap, so the
// domain-number filter cannot cleanly separate them. Offer the full bank only.
const APLUS_DOMAIN_OPTIONS: { label: string; sublabel: string; value: number | null }[] = [
  { label: "All Domains", sublabel: "265 questions · Core 1 & Core 2", value: null },
]

function ModeSelectScreen({
  onPractice,
  onExam,
  onPbq,
  shouldReduce,
  displayName,
  isUnlocked,
  cert,
}: {
  onPractice: (opts: { count: number; domain: number | null }) => void
  onExam: () => void
  onPbq: () => void
  shouldReduce: boolean
  displayName?: string | null
  isUnlocked: boolean
  cert: "secplus" | "netplus" | "aplus"
}) {
  const [step, setStep] = useState<"mode" | "practice-config">("mode")
  const [questionCount, setQuestionCount] = useState(25)
  const [domainFilter, setDomainFilter] = useState<number | null>(null)
  const allCount = cert === "secplus" ? 275 : 265
  const countOptions = [
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "75", value: 75 },
    { label: "100", value: 100 },
    { label: `All (${allCount})`, value: allCount },
  ]
  const activeDomainOptions =
    cert === "netplus" ? NETWORK_DOMAIN_OPTIONS
    : cert === "aplus" ? APLUS_DOMAIN_OPTIONS
    : DOMAIN_OPTIONS

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
                className="flex flex-col items-start gap-4 bg-card border border-border hover:border-accent-green/40 rounded-2xl p-6 text-left transition-all hover:shadow-[0_0_20px_-6px_rgba(34,197,94,0.2)] group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
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
                className="flex flex-col items-start gap-4 bg-card border border-border hover:border-accent-green/40 rounded-2xl p-6 text-left transition-all hover:shadow-[0_0_20px_-6px_rgba(34,197,94,0.2)] group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center group-hover:bg-accent-green/15 transition-colors">
                  <Clock className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h2 className="font-semibold text-base mb-1">Exam Mode</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert === "netplus"
                      ? "90 minute countdown. Simulates real Network+ exam conditions. Auto-submits when time runs out."
                      : cert === "aplus"
                      ? "90 minute countdown. Simulates real A+ exam conditions. Auto-submits when time runs out."
                      : "90 minute countdown. Simulates real Security+ exam conditions. Auto-submits when time runs out."}
                  </p>
                </div>
              </motion.button>

              {/* PBQ Drill - certs with PBQ content only */}
              {getPBQsForCert(cert).length > 0 && (
                <motion.button
                  onClick={onPbq}
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.26, ease: "easeOut" as const }}
                  className="sm:col-span-2 flex flex-col items-start gap-4 bg-card border border-border hover:border-accent-green/40 rounded-2xl p-6 text-left transition-all hover:shadow-[0_0_20px_-6px_rgba(34,197,94,0.2)] group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
                >
                  <div className="w-full flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center group-hover:bg-accent-green/15 transition-colors">
                      <Puzzle className="w-5 h-5 text-accent-green" />
                    </div>
                    {!isUnlocked && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-accent-green bg-accent-green/10 border border-accent-green/25 px-2.5 py-1 rounded-full">
                        Try {getFreePBQsForCert(cert).length} free
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-base mb-1">PBQ Drill</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isUnlocked
                        ? "Performance Based Questions: drag-and-drop matching, ordering, and fill-in scenarios, just like the real exam."
                        : `Performance Based Questions like the real exam opens with. Try ${getFreePBQsForCert(cert).length} free, unlock all ${getPBQsForCert(cert).length}.`}
                    </p>
                  </div>
                </motion.button>
              )}
            </div>

            <p className="text-xs text-muted-foreground/60 text-center">
              {cert === "netplus"
                ? "CompTIA Network+ allows 90 minutes for the real exam"
                : cert === "aplus"
                ? "CompTIA A+ allows 90 minutes per Core exam"
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
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 min-h-[40px] cursor-pointer"
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
                {countOptions.map((opt) => {
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
  chosen,
  onClick,
  disabled,
  index,
  shouldReduce,
}: {
  label: string
  text: string
  variant: "default" | "correct" | "wrong"
  chosen: boolean
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
    if (variant === "correct" && chosen && !shouldReduce && buttonRef.current) {
      motionAnimate(
        buttonRef.current,
        { scale: [1, 1.03, 1] },
        { duration: 0.3, ease: "easeOut" }
      )
      motionAnimate(
        buttonRef.current,
        {
          boxShadow: [
            "0 0 0 0 rgba(34,197,94,0.45)",
            "0 0 0 10px rgba(34,197,94,0)",
            "0 0 14px -4px rgba(34,197,94,0.3)",
          ],
        },
        { duration: 0.6, ease: "easeOut" }
      )
    }
  }, [variant, chosen, shouldReduce])

  const bgColor =
    variant === "correct"
      ? "rgba(34,197,94,0.1)"
      : variant === "wrong"
      ? "rgba(239, 68, 68, 0.1)"
      : "var(--card)"

  const borderColor =
    variant === "correct"
      ? "rgba(34,197,94,0.7)"
      : variant === "wrong"
      ? "rgba(239,68,68,0.7)"
      : "var(--border)"

  const boxShadow =
    variant === "correct"
      ? "0 0 14px -4px rgba(34,197,94,0.3)"
      : variant === "wrong"
      ? "0 0 14px -4px rgba(239,68,68,0.25)"
      : "none"

  const textClass =
    variant === "correct"
      ? "text-accent-green"
      : variant === "wrong"
      ? "text-red-400"
      : "text-foreground"

  const labelClass =
    variant === "correct"
      ? "bg-accent-green/20 text-accent-green"
      : variant === "wrong"
      ? "bg-red-500/20 text-red-400"
      : "bg-muted text-muted-foreground group-hover:bg-accent-green/10 group-hover:text-accent-green"

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
      whileTap={!disabled && !shouldReduce ? { scale: 0.99 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="group flex items-start gap-3 w-full text-left px-4 py-4 rounded-xl border text-sm leading-relaxed cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50 focus-visible:ring-offset-1 hover:border-accent-green/30 disabled:hover:border-inherit transition-shadow"
      style={
        shouldReduce
          ? {
              backgroundColor: bgColor,
              borderColor: borderColor,
              boxShadow,
              minHeight: 48,
            }
          : { minHeight: 48, boxShadow }
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

const SUMMARY_DOMAIN_NAMES: Record<string, Record<number, string>> = {
  secplus: {
    1: "General Security Concepts",
    2: "Threats, Vulnerabilities & Mitigations",
    3: "Security Architecture",
    4: "Security Operations",
    5: "Security Program Management & Oversight",
  },
  netplus: {
    1: "Networking Concepts",
    2: "Network Implementation",
    3: "Network Operations",
    4: "Network Security",
    5: "Network Troubleshooting",
  },
  aplus: {
    1: "Mobile Devices",
    2: "Networking",
    3: "Hardware",
    4: "Virtualization & Cloud Computing",
    5: "Hardware & Network Troubleshooting",
  },
}

function SessionSummaryOverlay({
  session,
  streakCount,
  shouldReduce,
  onContinue,
}: {
  session: QuizSession
  streakCount: number
  shouldReduce: boolean
  onContinue: () => void
}) {
  // Each PBQ counts as one question; partial credit is a fraction of it.
  const pbqEntries = session.pbqResults ? Object.values(session.pbqResults) : []
  const pbqScore = pbqEntries.reduce((s, r) => s + r.correct / r.total, 0)
  const total = Object.keys(session.answers).length + pbqEntries.length
  const combinedScore = session.score + pbqScore
  const displayScore = Math.round(combinedScore * 10) / 10
  const accuracy = total > 0 ? Math.round((combinedScore / total) * 100) : 0

  const domainNames = SUMMARY_DOMAIN_NAMES[session.cert ?? "secplus"]
  let weakest: { id: number; pct: number } | null = null
  for (const id of [1, 2, 3, 4, 5]) {
    const qs = session.questions.filter((q) => q.domain === id && q.id in session.answers)
    if (qs.length === 0) continue
    const correct = qs.filter((q) => session.answers[q.id] === q.answer).length
    const domainPct = Math.round((correct / qs.length) * 100)
    if (weakest === null || domainPct < weakest.pct) weakest = { id, pct: domainPct }
  }

  const rows = [
    {
      icon: <Target className="w-4 h-4 text-accent-green shrink-0" />,
      text: (
        <>
          You scored <strong className="text-foreground">{displayScore}/{total}</strong> ({accuracy}% accuracy)
        </>
      ),
    },
    ...(streakCount > 0
      ? [{
          icon: <Flame className="w-4 h-4 text-orange-400 shrink-0" />,
          text: (
            <>
              <strong className="text-foreground">{streakCount} day streak</strong> - keep it going
            </>
          ),
        }]
      : []),
    ...(weakest !== null && weakest.pct < 100
      ? [{
          icon: <Zap className="w-4 h-4 text-yellow-400 shrink-0" />,
          text: (
            <>
              Weakest area: <strong className="text-foreground">{domainNames[weakest.id]}</strong> ({weakest.pct}%)
            </>
          ),
        }]
      : []),
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md"
      />
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={
          shouldReduce
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 380, damping: 28 }
        }
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="w-full max-w-sm pointer-events-auto bg-card border border-border rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-5 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/25 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-accent-green" />
          </div>

          <h2 className="text-xl font-bold tracking-tight">Session complete</h2>

          <div className="w-full flex flex-col gap-3 text-left">
            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
                animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                className="flex items-center gap-2.5 text-sm text-muted-foreground bg-muted border border-border rounded-xl px-4 py-3"
              >
                {row.icon}
                <span>{row.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + rows.length * 0.15 }}
            whileHover={shouldReduce ? {} : { scale: 1.01 }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            onClick={onContinue}
            className="w-full bg-accent-green hover:bg-accent-hover text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            See Full Results
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function PaywallOverlay({
  onUnlock,
  onGoToResults,
  shouldReduce,
  freeCount,
  cert,
  score,
  total,
}: {
  onUnlock: () => void
  onGoToResults: () => void
  shouldReduce: boolean
  freeCount: number
  cert: string
  score: number
  total: number
}) {
  const [leadEmail, setLeadEmail] = useState("")
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!leadEmail) return
    setLeadStatus("sending")
    try {
      const r = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, cert, score, total }),
      })
      const data: { ok: boolean } = await r.json()
      setLeadStatus(data.ok ? "done" : "error")
    } catch {
      setLeadStatus("error")
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
        transition={
          shouldReduce
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 380, damping: 28 }
        }
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        {/* Card - premium dark with green glow border */}
        <div
          className="w-full max-w-md pointer-events-auto rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-5 shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #0d1a12 0%, #0a1210 100%)",
            border: "1px solid rgba(34,197,94,0.35)",
            boxShadow: "0 0 40px rgba(34,197,94,0.12), 0 25px 50px rgba(0,0,0,0.7)",
          }}
        >
          {/* Urgency pill */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-medium px-3 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              {!shouldReduce && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            Limited launch pricing - grab it before it goes up
          </div>

          {/* Trophy icon */}
          <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/25 flex items-center justify-center">
            <Trophy className="w-7 h-7 text-accent-green" />
          </div>

          {/* Loss-aversion headline */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold leading-snug tracking-tight">
              Don&apos;t walk into your exam underprepared
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You&apos;ve used your {freeCount} free questions. Candidates who
              practice all 1,540 questions pass{" "}
              <strong className="text-foreground">2× more often</strong>.
            </p>
          </div>

          {/* What you get bullets */}
          <ul className="w-full text-left space-y-2 text-sm">
            {[
              "1,540 questions across Security+, Network+ & A+",
              "30 interactive PBQs: matching, ordering & fill-in drills",
              "Practice Mode + timed Exam Mode simulation",
              "AI explanations for every question",
              "Lifetime access - pay once, use forever",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>

          {/* Price anchor block */}
          <div
            className="w-full rounded-xl px-5 py-4 text-center"
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              {/* Struck-through anchor price */}
              <span className="text-lg line-through text-muted-foreground/50">$29.99</span>
              <span className="text-4xl font-bold text-foreground">$9.99</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              one-time payment · lifetime access · no subscription
            </div>
          </div>

          {/* CTA with pulsing glow */}
          <div className="flex flex-col gap-3 w-full">
            <div className="relative">
              {/* Glow layer */}
              {!shouldReduce && (
                <motion.div
                  animate={{ opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-xl blur-md"
                  style={{ background: "rgba(34,197,94,0.45)" }}
                />
              )}
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                onClick={() =>
                  window.open(
                    "https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00",
                    "_blank"
                  )
                }
                className="relative w-full bg-accent-green hover:bg-accent-hover text-black font-bold py-3.5 rounded-xl transition-colors min-h-[48px] text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2"
              >
                Unlock All 1,540 Questions - $9.99
              </motion.button>
            </div>

            {/* Reassurance line */}
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              Secure checkout via Stripe. Questions available instantly after payment. No subscription, ever.
            </p>

            {/* Secondary action */}
            <button
              onClick={onGoToResults}
              className="w-full text-muted-foreground/50 hover:text-muted-foreground text-xs transition-colors py-1 min-h-[36px] cursor-pointer"
            >
              See my results so far →
            </button>

            {/* Email capture */}
            <div className="w-full border-t border-border/60 pt-4">
              {leadStatus === "done" ? (
                <div className="flex items-center justify-center gap-2 text-sm text-accent-green min-h-[44px]">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  You&apos;re on the list. Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-2">
                  <label
                    htmlFor="paywall-lead-email"
                    className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    Email me my results + a 7-day study plan
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="paywall-lead-email"
                      type="email"
                      value={leadEmail}
                      onChange={(e) => {
                        setLeadEmail(e.target.value)
                        if (leadStatus === "error") setLeadStatus("idle")
                      }}
                      placeholder="you@example.com"
                      required
                      className="flex-1 min-w-0 bg-muted border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                    />
                    <button
                      type="submit"
                      disabled={leadStatus === "sending" || !leadEmail}
                      className="shrink-0 border border-accent-green/40 hover:bg-accent-green/10 disabled:opacity-50 disabled:cursor-not-allowed text-accent-green font-medium px-4 rounded-xl transition-colors min-h-[44px] text-sm cursor-pointer"
                    >
                      {leadStatus === "sending" ? "Sending…" : "Send"}
                    </button>
                  </div>
                  {leadStatus === "error" && (
                    <p className="text-xs text-red-400 text-left">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
