"use client"

import { questions, type Question } from "@/data/questions"
import { examQuestions } from "@/data/examQuestions"
import { networkPracticeQuestions } from "@/data/networkPlusQuestions"
import { networkExamQuestions } from "@/data/networkPlusExamQuestions"

export interface QuizSession {
  questions: Question[]
  currentIndex: number
  answers: Record<string, "A" | "B" | "C" | "D">
  missedIds: string[]
  score: number
  mode: "normal" | "missed"
  isUnlocked: boolean
  examMode?: boolean
  examStartedAt?: number // epoch ms
  cert?: "secplus" | "netplus"
}

// Fixed set of free practice questions - same 25 questions, same order, on every device.
const FREE_QUESTIONS = questions.filter((q) => q.tier === "free")

// Fixed set of free exam questions (EQ001–EQ010), same order on every device.
const FREE_EXAM_QUESTIONS = examQuestions.filter((q) => q.tier === "free") as unknown as Question[]

const FREE_NETWORK_QUESTIONS = (networkPracticeQuestions as unknown as Question[]).filter((q) => q.tier === "free")
const FREE_NETWORK_EXAM_QUESTIONS = (networkExamQuestions as unknown as Question[]).filter((q) => q.tier === "free")

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getUnlockCookie(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.split(";").some((c) => c.trim() === "passplus_unlocked=true")
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false
  if (localStorage.getItem("passplus_unlocked") === "true") return true
  if (getUnlockCookie()) return true
  // URL param fallback for Safari ITP edge cases (?access=granted)
  if (new URLSearchParams(window.location.search).get("access") === "granted") return true
  return false
}

export function unlock(): void {
  localStorage.setItem("passplus_unlocked", "true")
  // First-party cookie backup: persists through Safari ITP localStorage clears.
  // 1-year expiry, Strict same-site, Secure (HTTPS only in prod).
  document.cookie =
    "passplus_unlocked=true; path=/; max-age=31536000; SameSite=Strict; Secure"
}

export function createSession(
  mode: "normal" | "missed" = "normal",
  missedIds?: string[],
  options?: { count?: number; domain?: number; cert?: "secplus" | "netplus" }
): QuizSession {
  const unlocked = isUnlocked()
  const cert = options?.cert ?? "secplus"
  const allQuestions: Question[] = cert === "netplus" ? (networkPracticeQuestions as unknown as Question[]) : questions
  const freeQs: Question[] = cert === "netplus" ? FREE_NETWORK_QUESTIONS : FREE_QUESTIONS

  let pool: Question[]
  if (mode === "missed" && missedIds?.length) {
    pool = shuffle(allQuestions.filter((q) => missedIds.includes(q.id)))
  } else if (unlocked) {
    // Paid users: optionally filter by domain, then shuffle, then cap at count.
    let base = options?.domain
      ? allQuestions.filter((q) => q.domain === options.domain)
      : allQuestions
    base = shuffle(base)
    pool = options?.count ? base.slice(0, options.count) : base
  } else {
    // Free users always see the exact same 25 questions in the same order -
    // no shuffle, no localStorage needed, consistent across every device.
    pool = freeQs
  }

  return {
    questions: pool,
    currentIndex: 0,
    answers: {},
    missedIds: [],
    score: 0,
    mode,
    isUnlocked: unlocked,
    cert,
  }
}

/**
 * Creates a session using the exam question bank (examQuestions.ts).
 * Paid users get all 245 exam questions shuffled.
 * Free users get the fixed EQ001–EQ010 set in order.
 */
export function createExamSession(cert: "secplus" | "netplus" = "secplus"): QuizSession {
  const unlocked = isUnlocked()
  const allExamQs: Question[] = cert === "netplus"
    ? (networkExamQuestions as unknown as Question[])
    : (examQuestions as unknown as Question[])
  const freeExamQs: Question[] = cert === "netplus"
    ? FREE_NETWORK_EXAM_QUESTIONS
    : FREE_EXAM_QUESTIONS
  const pool: Question[] = unlocked ? shuffle(allExamQs) : freeExamQs
  return {
    questions: pool,
    currentIndex: 0,
    answers: {},
    missedIds: [],
    score: 0,
    mode: "normal",
    isUnlocked: unlocked,
    cert,
  }
}

export function saveSession(session: QuizSession): void {
  if (typeof window === "undefined") return
  localStorage.setItem("passplus_session", JSON.stringify(session))
}

export function loadSession(): QuizSession | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("passplus_session")
  if (!raw) return null
  try {
    return JSON.parse(raw) as QuizSession
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("passplus_session")
}

// Clears all quiz progress (session, completion flag) while
// preserving the unlock flag - paid users keep their access after a reset.
export function resetProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("passplus_session")
  localStorage.removeItem("passplus_completed")
}

// ─── Daily streak ─────────────────────────────────────────────────────────────

const STREAK_MILESTONES = [3, 7, 14, 30]

function localDateString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function getStreak(): { count: number; lastDate: string } {
  if (typeof window === "undefined") return { count: 0, lastDate: "" }
  try {
    const raw = localStorage.getItem("passplus_streak")
    return raw ? JSON.parse(raw) : { count: 0, lastDate: "" }
  } catch {
    return { count: 0, lastDate: "" }
  }
}

/**
 * Call when the user answers a question. Idempotent within the same day.
 * Returns the current streak count and any milestone just reached.
 */
export function updateStreak(): { count: number; milestone: number | null } {
  if (typeof window === "undefined") return { count: 0, milestone: null }
  const today = localDateString()
  const current = getStreak()
  if (current.lastDate === today) return { count: current.count, milestone: null }

  const prev = new Date()
  prev.setDate(prev.getDate() - 1)
  const yesterday = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}-${String(prev.getDate()).padStart(2, "0")}`

  const newCount = current.lastDate === yesterday ? current.count + 1 : 1
  localStorage.setItem("passplus_streak", JSON.stringify({ count: newCount, lastDate: today }))

  return {
    count: newCount,
    milestone: STREAK_MILESTONES.includes(newCount) ? newCount : null,
  }
}

// ─── Readiness score (rolling avg of last 3 completed quizzes) ────────────────

interface QuizRecord { score: number; total: number }

export function recordQuizScore(score: number, total: number): void {
  if (typeof window === "undefined" || total === 0) return
  try {
    const raw = localStorage.getItem("passplus_quiz_history")
    const history: QuizRecord[] = raw ? JSON.parse(raw) : []
    history.push({ score, total })
    localStorage.setItem("passplus_quiz_history", JSON.stringify(history.slice(-3)))
  } catch { /* ignore */ }
}

export function getReadinessScore(): {
  pct: number; label: string; textColor: string; bgColor: string
} | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("passplus_quiz_history")
    if (!raw) return null
    const history: QuizRecord[] = JSON.parse(raw)
    if (!history.length) return null
    const pct = Math.round(
      (history.reduce((s, r) => s + r.score, 0) /
       history.reduce((s, r) => s + r.total, 0)) * 100
    )
    if (pct >= 85) return { pct, label: "Ready to Test",  textColor: "text-accent-green",  bgColor: "bg-accent-green/10 border-accent-green/25" }
    if (pct >= 75) return { pct, label: "Almost Ready",   textColor: "text-green-400",      bgColor: "bg-green-500/10 border-green-500/20" }
    if (pct >= 60) return { pct, label: "Getting There",  textColor: "text-yellow-400",     bgColor: "bg-yellow-500/10 border-yellow-500/20" }
    return           { pct, label: "Not Ready",       textColor: "text-red-400",        bgColor: "bg-red-500/10 border-red-500/20" }
  } catch {
    return null
  }
}
