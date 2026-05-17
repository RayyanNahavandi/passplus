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
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("passplus_unlocked") === "true"
}

export function unlock(): void {
  localStorage.setItem("passplus_unlocked", "true")
}

export function createSession(mode: "normal" | "missed" = "normal", missedIds?: string[]): QuizSession {
  const unlocked = isUnlocked()

  let pool: Question[]
  if (mode === "missed" && missedIds?.length) {
    pool = shuffle(questions.filter((q) => missedIds.includes(q.id)))
  } else {
    const free = questions.filter((q) => q.tier === "free")
    const locked = questions.filter((q) => q.tier === "locked")
    // Shuffle the free pool first so gating is consistent regardless of source order,
    // then append locked questions for unlocked users.
    pool = unlocked ? shuffle([...free, ...locked]) : shuffle(free)
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
