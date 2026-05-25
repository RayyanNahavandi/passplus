"use client"

import { questions, type Question } from "@/data/questions"

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
}

// Fixed set of free questions — same 25 questions, same order, on every device.
// Derived once at module load from questions marked tier: "free".
const FREE_QUESTIONS = questions.filter((q) => q.tier === "free")

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
  options?: { count?: number; domain?: number }
): QuizSession {
  const unlocked = isUnlocked()

  let pool: Question[]
  if (mode === "missed" && missedIds?.length) {
    pool = shuffle(questions.filter((q) => missedIds.includes(q.id)))
  } else if (unlocked) {
    // Paid users: optionally filter by domain, then shuffle, then cap at count.
    let base = options?.domain
      ? questions.filter((q) => q.domain === options.domain)
      : questions
    base = shuffle(base)
    pool = options?.count ? base.slice(0, options.count) : base
  } else {
    // Free users always see the exact same 25 questions in the same order —
    // no shuffle, no localStorage needed, consistent across every device.
    pool = FREE_QUESTIONS
  }

  return {
    questions: pool,
    currentIndex: 0,
    answers: {},
    missedIds: [],
    score: 0,
    mode,
    isUnlocked: unlocked,
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
// preserving the unlock flag — paid users keep their access after a reset.
export function resetProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("passplus_session")
  localStorage.removeItem("passplus_completed")
}
