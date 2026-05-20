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

const FREE_LIMIT = 25

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
  // Cookie is the primary check — it survives Safari ITP clearing localStorage
  return localStorage.getItem("passplus_unlocked") === "true" || getUnlockCookie()
}

export function unlock(): void {
  localStorage.setItem("passplus_unlocked", "true")
  // First-party cookie backup: persists through Safari ITP localStorage clears.
  // 1-year expiry, Strict same-site, Secure (HTTPS only in prod).
  document.cookie =
    "passplus_unlocked=true; path=/; max-age=31536000; SameSite=Strict; Secure"
}

// Returns (or lazily creates) a device-specific shuffled question order stored
// in localStorage. Free users always get the same first FREE_LIMIT questions
// from this order, so restarting never exposes new free questions.
function getOrCreateQuestionOrder(): Question[] {
  if (typeof window === "undefined") return shuffle(questions)

  const raw = localStorage.getItem("passplus_question_order")
  if (raw) {
    try {
      const ids = JSON.parse(raw) as string[]
      const ordered = ids
        .map((id) => questions.find((q) => q.id === id))
        .filter(Boolean) as Question[]
      if (ordered.length >= FREE_LIMIT) return ordered
    } catch {
      // corrupt — fall through and recreate
    }
  }

  const order = shuffle(questions)
  localStorage.setItem(
    "passplus_question_order",
    JSON.stringify(order.map((q) => q.id))
  )
  return order
}

export function createSession(
  mode: "normal" | "missed" = "normal",
  missedIds?: string[]
): QuizSession {
  const unlocked = isUnlocked()

  let pool: Question[]
  if (mode === "missed" && missedIds?.length) {
    pool = shuffle(questions.filter((q) => missedIds.includes(q.id)))
  } else if (unlocked) {
    // Unlocked users get a fresh shuffle every session for study variety.
    pool = shuffle(questions)
  } else {
    // Free users always see the same first FREE_LIMIT questions from their
    // stored order — restarting never reveals new questions.
    pool = getOrCreateQuestionOrder().slice(0, FREE_LIMIT)
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

// Clears all quiz progress (session, question order, completion flag) while
// preserving the unlock flag — paid users keep their access after a reset.
export function resetProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("passplus_session")
  localStorage.removeItem("passplus_question_order")
  localStorage.removeItem("passplus_completed")
}
