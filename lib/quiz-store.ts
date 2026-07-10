"use client"

import { questions, type Question } from "@/data/questions"
import { examQuestions } from "@/data/examQuestions"
import { networkPracticeQuestions } from "@/data/networkPlusQuestions"
import { networkExamQuestions } from "@/data/networkPlusExamQuestions"
import { aplusPracticeQuestions } from "@/data/aplusPracticeQuestions"
import { aplusExamQuestions } from "@/data/aplusExamQuestions"
import { getPBQsForCert } from "@/data/pbqQuestions"

type Cert = "secplus" | "netplus" | "aplus"

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
  cert?: Cert
  resultsRecorded?: boolean
  pbqIds?: string[]
  pbqResults?: Record<string, { correct: number; total: number; domain: number }>
  flaggedIds?: string[]
}

// Fixed set of free practice questions - same 25 questions, same order, on every device.
const FREE_QUESTIONS = questions.filter((q) => q.tier === "free")

// Fixed set of free exam questions (EQ001–EQ010), same order on every device.
const FREE_EXAM_QUESTIONS = examQuestions.filter((q) => q.tier === "free") as unknown as Question[]

const FREE_NETWORK_QUESTIONS = (networkPracticeQuestions as unknown as Question[]).filter((q) => q.tier === "free")
const FREE_NETWORK_EXAM_QUESTIONS = (networkExamQuestions as unknown as Question[]).filter((q) => q.tier === "free")

const FREE_APLUS_QUESTIONS = (aplusPracticeQuestions as unknown as Question[]).filter((q) => q.tier === "free")
const FREE_APLUS_EXAM_QUESTIONS = (aplusExamQuestions as unknown as Question[]).filter((q) => q.tier === "free")

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

export function unlock(days = 365): void {
  localStorage.setItem("passplus_unlocked", "true")
  // First-party cookie backup: persists through Safari ITP localStorage clears.
  // Default 1-year expiry; pass 30 for the email-only restore flow.
  const maxAge = days * 86400
  document.cookie =
    `passplus_unlocked=true; path=/; max-age=${maxAge}; SameSite=Strict; Secure`
}

export function createSession(
  mode: "normal" | "missed" = "normal",
  missedIds?: string[],
  options?: { count?: number; domain?: number; cert?: Cert }
): QuizSession {
  const unlocked = isUnlocked()
  const cert = options?.cert ?? "secplus"
  const allQuestions: Question[] =
    cert === "netplus" ? (networkPracticeQuestions as unknown as Question[])
    : cert === "aplus" ? (aplusPracticeQuestions as unknown as Question[])
    : questions
  const freeQs: Question[] =
    cert === "netplus" ? FREE_NETWORK_QUESTIONS
    : cert === "aplus" ? FREE_APLUS_QUESTIONS
    : FREE_QUESTIONS

  let pool: Question[]
  if (mode === "missed" && missedIds?.length) {
    // Missed/flagged ids can come from an exam-mode session, so search the
    // exam bank as well as the practice bank.
    const examQs: Question[] =
      cert === "netplus" ? (networkExamQuestions as unknown as Question[])
      : cert === "aplus" ? (aplusExamQuestions as unknown as Question[])
      : (examQuestions as unknown as Question[])
    pool = shuffle(
      [...allQuestions, ...examQs].filter((q) => missedIds.includes(q.id))
    )
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
export function createExamSession(cert: Cert = "secplus"): QuizSession {
  const unlocked = isUnlocked()
  const allExamQs: Question[] =
    cert === "netplus" ? (networkExamQuestions as unknown as Question[])
    : cert === "aplus" ? (aplusExamQuestions as unknown as Question[])
    : (examQuestions as unknown as Question[])
  const freeExamQs: Question[] =
    cert === "netplus" ? FREE_NETWORK_EXAM_QUESTIONS
    : cert === "aplus" ? FREE_APLUS_EXAM_QUESTIONS
    : FREE_EXAM_QUESTIONS
  const pool: Question[] = unlocked ? shuffle(allExamQs) : freeExamQs
  // Like the real CompTIA exam, paid exam sessions open with PBQs.
  const certPbqs = unlocked ? getPBQsForCert(cert) : []
  return {
    questions: pool,
    currentIndex: 0,
    answers: {},
    missedIds: [],
    score: 0,
    mode: "normal",
    isUnlocked: unlocked,
    cert,
    ...(certPbqs.length > 0
      ? { pbqIds: shuffle(certPbqs.map((p) => p.id)), pbqResults: {} }
      : {}),
  }
}

/** Creates a PBQ-only drill session (paid feature). */
export function createPBQSession(cert: Cert = "secplus"): QuizSession {
  return {
    questions: [],
    currentIndex: 0,
    answers: {},
    missedIds: [],
    score: 0,
    mode: "normal",
    isUnlocked: isUnlocked(),
    cert,
    pbqIds: shuffle(getPBQsForCert(cert).map((p) => p.id)),
    pbqResults: {},
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

  // Lifetime answered count + rolling 7-day pace map, both used for the
  // exam countdown's on-track calculation.
  try {
    const lifetime = parseInt(localStorage.getItem("passplus_total_answered") ?? "0", 10) || 0
    localStorage.setItem("passplus_total_answered", String(lifetime + total))

    const paceRaw = localStorage.getItem("passplus_pace")
    const pace: Record<string, number> = paceRaw ? JSON.parse(paceRaw) : {}
    const today = localDateString()
    pace[today] = (pace[today] ?? 0) + total
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    for (const date of Object.keys(pace)) {
      if (new Date(date + "T00:00:00") < cutoff) delete pace[date]
    }
    localStorage.setItem("passplus_pace", JSON.stringify(pace))
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

// ─── Exam date countdown ──────────────────────────────────────────────────────

const BANK_SIZES: Record<Cert, number> = { secplus: 500, netplus: 490, aplus: 490 }

export function getExamDate(): string | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("passplus_exam_date")
  return raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : null
}

export function setExamDate(date: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("passplus_exam_date", date)
}

export function clearExamDate(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("passplus_exam_date")
}

export function isExamDateSkipped(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("passplus_exam_date_skipped") === "true"
}

export function skipExamDate(): void {
  if (typeof window === "undefined") return
  localStorage.setItem("passplus_exam_date_skipped", "true")
}

export function getExamCountdown(cert: Cert = "secplus"): {
  daysLeft: number
  neededPerDay: number
  recentPerDay: number
  onTrack: boolean
} | null {
  if (typeof window === "undefined") return null
  const date = getExamDate()
  if (!date) return null
  try {
    const exam = new Date(date + "T00:00:00")
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const daysLeft = Math.ceil((exam.getTime() - todayStart.getTime()) / 86_400_000)
    if (daysLeft < 0) return null

    const answered = parseInt(localStorage.getItem("passplus_total_answered") ?? "0", 10) || 0
    const remaining = Math.max(0, BANK_SIZES[cert] - answered)
    const neededPerDay = Math.ceil(remaining / Math.max(1, daysLeft))

    const paceRaw = localStorage.getItem("passplus_pace")
    const pace: Record<string, number> = paceRaw ? JSON.parse(paceRaw) : {}
    const recentTotal = Object.values(pace).reduce((s, n) => s + n, 0)
    const recentPerDay = Math.round(recentTotal / 7)

    return { daysLeft, neededPerDay, recentPerDay, onTrack: recentPerDay >= neededPerDay }
  } catch {
    return null
  }
}

// ─── Domain mastery (cumulative per cert) ─────────────────────────────────────

export type MasteryTier = "Learning" | "Familiar" | "Proficient" | "Mastered"

export function masteryTier(pct: number): MasteryTier {
  if (pct >= 90) return "Mastered"
  if (pct >= 75) return "Proficient"
  if (pct >= 60) return "Familiar"
  return "Learning"
}

export const DOMAIN_NAMES: Record<Cert, Record<number, string>> = {
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

type MasteryStore = Record<string, Record<string, { correct: number; total: number }>>

export function recordDomainMastery(
  cert: Cert,
  sessionStats: { domain: number; correct: number; total: number }[]
): void {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem("passplus_domain_mastery")
    const store: MasteryStore = raw ? JSON.parse(raw) : {}
    const certStats = store[cert] ?? {}
    for (const s of sessionStats) {
      if (s.total === 0) continue
      const prev = certStats[s.domain] ?? { correct: 0, total: 0 }
      certStats[s.domain] = { correct: prev.correct + s.correct, total: prev.total + s.total }
    }
    store[cert] = certStats
    localStorage.setItem("passplus_domain_mastery", JSON.stringify(store))
  } catch { /* ignore */ }
}

export function getDomainMastery(
  cert: Cert
): { domain: number; pct: number; tier: MasteryTier; total: number }[] | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("passplus_domain_mastery")
    if (!raw) return null
    const store: MasteryStore = JSON.parse(raw)
    const certStats = store[cert]
    if (!certStats) return null
    const entries = Object.entries(certStats)
      .map(([domain, { correct, total }]) => {
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0
        return { domain: Number(domain), pct, tier: masteryTier(pct), total }
      })
      .filter((e) => e.total > 0)
      .sort((a, b) => a.domain - b.domain)
    return entries.length > 0 ? entries : null
  } catch {
    return null
  }
}
