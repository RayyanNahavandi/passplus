"use client"

// Cross-device progress sync for signed-in paid users.
//
// Flow: after AuthProvider confirms paid status, syncProgress() pulls the
// remote snapshot, merges it with localStorage (monotonic, field-wise), writes
// the merged result back locally, and pushes it up. Afterwards, quiz-store
// dispatches PROGRESS_EVENT whenever durable progress changes and
// AuthProvider schedules a debounced push.

export const PROGRESS_EVENT = "passplus:progress"

interface StreakData { count: number; lastDate: string }
interface QuizRecord { score: number; total: number }
type MasteryStore = Record<string, Record<string, { correct: number; total: number }>>

export interface ProgressSnapshot {
  streak?: StreakData
  quizHistory?: QuizRecord[]
  totalAnswered?: number
  pace?: Record<string, number>
  domainMastery?: MasteryStore
  examDate?: string
  examDateSkipped?: boolean
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function collectProgress(): ProgressSnapshot {
  const snapshot: ProgressSnapshot = {}
  const streak = readJSON<StreakData>("passplus_streak")
  if (streak?.count) snapshot.streak = streak
  const history = readJSON<QuizRecord[]>("passplus_quiz_history")
  if (history?.length) snapshot.quizHistory = history.slice(-3)
  const answered = parseInt(localStorage.getItem("passplus_total_answered") ?? "0", 10) || 0
  if (answered > 0) snapshot.totalAnswered = answered
  const pace = readJSON<Record<string, number>>("passplus_pace")
  if (pace && Object.keys(pace).length) snapshot.pace = pace
  const mastery = readJSON<MasteryStore>("passplus_domain_mastery")
  if (mastery && Object.keys(mastery).length) snapshot.domainMastery = mastery
  const examDate = localStorage.getItem("passplus_exam_date")
  if (examDate && /^\d{4}-\d{2}-\d{2}$/.test(examDate)) snapshot.examDate = examDate
  if (localStorage.getItem("passplus_exam_date_skipped") === "true") {
    snapshot.examDateSkipped = true
  }
  return snapshot
}

export function mergeProgress(
  local: ProgressSnapshot,
  remote: ProgressSnapshot
): ProgressSnapshot {
  const merged: ProgressSnapshot = {}

  // Streak: most recent lastDate wins; same day -> higher count.
  const streaks = [local.streak, remote.streak].filter((s): s is StreakData => !!s)
  if (streaks.length) {
    merged.streak = streaks.sort(
      (a, b) => b.lastDate.localeCompare(a.lastDate) || b.count - a.count
    )[0]
  }

  merged.totalAnswered = Math.max(local.totalAnswered ?? 0, remote.totalAnswered ?? 0) || undefined

  // Quiz history: prefer the device with more lifetime answers (recency proxy).
  const localLeads = (local.totalAnswered ?? 0) >= (remote.totalAnswered ?? 0)
  merged.quizHistory = (localLeads ? local.quizHistory : remote.quizHistory)
    ?? local.quizHistory ?? remote.quizHistory

  // Pace: per-day max so overlapping days aren't double-counted.
  if (local.pace || remote.pace) {
    const pace: Record<string, number> = { ...(remote.pace ?? {}) }
    for (const [day, n] of Object.entries(local.pace ?? {})) {
      pace[day] = Math.max(pace[day] ?? 0, n)
    }
    merged.pace = pace
  }

  // Domain mastery: per cert+domain, keep the entry with more attempts.
  if (local.domainMastery || remote.domainMastery) {
    const mastery: MasteryStore = {}
    const certs = new Set([
      ...Object.keys(local.domainMastery ?? {}),
      ...Object.keys(remote.domainMastery ?? {}),
    ])
    for (const cert of certs) {
      const l = local.domainMastery?.[cert] ?? {}
      const r = remote.domainMastery?.[cert] ?? {}
      const domains = new Set([...Object.keys(l), ...Object.keys(r)])
      mastery[cert] = {}
      for (const d of domains) {
        const le = l[d]
        const re = r[d]
        mastery[cert][d] = !le ? re! : !re ? le : le.total >= re.total ? le : re
      }
    }
    merged.domainMastery = mastery
  }

  merged.examDate = local.examDate ?? remote.examDate
  if (local.examDateSkipped || remote.examDateSkipped) merged.examDateSkipped = true

  return merged
}

export function applyProgress(snapshot: ProgressSnapshot): void {
  try {
    if (snapshot.streak) {
      localStorage.setItem("passplus_streak", JSON.stringify(snapshot.streak))
    }
    if (snapshot.quizHistory?.length) {
      localStorage.setItem("passplus_quiz_history", JSON.stringify(snapshot.quizHistory))
    }
    if (snapshot.totalAnswered) {
      localStorage.setItem("passplus_total_answered", String(snapshot.totalAnswered))
    }
    if (snapshot.pace) {
      localStorage.setItem("passplus_pace", JSON.stringify(snapshot.pace))
    }
    if (snapshot.domainMastery) {
      localStorage.setItem("passplus_domain_mastery", JSON.stringify(snapshot.domainMastery))
    }
    if (snapshot.examDate) {
      localStorage.setItem("passplus_exam_date", snapshot.examDate)
    }
    if (snapshot.examDateSkipped) {
      localStorage.setItem("passplus_exam_date_skipped", "true")
    }
  } catch {
    // localStorage unavailable (private mode quota, etc.) - sync is best-effort
  }
}

export async function pushProgress(accessToken: string): Promise<void> {
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ progress: collectProgress() }),
    })
  } catch {
    // Offline / transient failure - the next change will retry.
  }
}

/** Pull remote progress, merge with local, apply locally, and push back. */
export async function syncProgress(accessToken: string): Promise<void> {
  try {
    const res = await fetch("/api/progress", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) return
    const { progress } = (await res.json()) as { progress: ProgressSnapshot | null }
    const merged = mergeProgress(collectProgress(), progress ?? {})
    applyProgress(merged)
    await pushProgress(accessToken)
  } catch (err) {
    console.error("[progress-sync] sync failed:", err)
  }
}
