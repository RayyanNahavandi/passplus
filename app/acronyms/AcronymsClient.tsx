"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  Check,
  RotateCcw,
  Shuffle,
  Sparkles,
  BookOpen,
  ChevronDown,
} from "lucide-react"
import { Logo } from "@/components/Logo"
import { type Acronym } from "@/data/securityPlusAcronyms"

const STORAGE_KEY = "acronyms:secplus:known"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function AcronymsClient({ acronyms }: { acronyms: Acronym[] }) {
  const shouldReduce = useReducedMotion()

  const [known, setKnown] = useState<Set<string>>(new Set())
  const [queue, setQueue] = useState<Acronym[]>([])
  const [flipped, setFlipped] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [showAll, setShowAll] = useState(false)

  // Hydrate known-set from localStorage, then build the initial deck.
  useEffect(() => {
    let saved: string[] = []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) saved = JSON.parse(raw)
    } catch {
      saved = []
    }
    const knownSet = new Set(saved.filter((s) => acronyms.some((a) => a.acronym === s)))
    setKnown(knownSet)
    setQueue(shuffle(acronyms.filter((a) => !knownSet.has(a.acronym))))
    setLoaded(true)
  }, [acronyms])

  // Persist the known-set whenever it changes (after initial load).
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...known]))
    } catch {
      /* storage unavailable — session-only progress */
    }
  }, [known, loaded])

  const current = queue[0] ?? null
  const total = acronyms.length
  const knownCount = known.size
  const progress = total > 0 ? Math.round((knownCount / total) * 100) : 0

  const markKnown = useCallback(() => {
    if (!current) return
    setKnown((prev) => new Set(prev).add(current.acronym))
    setQueue((prev) => prev.slice(1))
    setFlipped(false)
  }, [current])

  const markLearning = useCallback(() => {
    if (!current) return
    // Send it to the back of the queue so it resurfaces this session.
    setQueue((prev) => (prev.length <= 1 ? prev : [...prev.slice(1), prev[0]]))
    setFlipped(false)
  }, [current])

  const reshuffle = useCallback(() => {
    setQueue((prev) => shuffle(prev))
    setFlipped(false)
  }, [])

  const resetProgress = useCallback(() => {
    setKnown(new Set())
    setQueue(shuffle(acronyms))
    setFlipped(false)
  }, [acronyms])

  // Keyboard shortcuts: Space/Enter flips, arrows mark.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!current) return
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && (e.key === "ArrowRight" || e.key.toLowerCase() === "k")) {
        markKnown()
      } else if (flipped && (e.key === "ArrowLeft" || e.key.toLowerCase() === "j")) {
        markLearning()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [current, flipped, markKnown, markLearning])

  const done = loaded && queue.length === 0

  const sortedAll = useMemo(
    () => [...acronyms].sort((a, b) => a.acronym.localeCompare(b.acronym)),
    [acronyms]
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
        <Link
          href="/quiz"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Full Quiz
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* Title block */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent-green/10 border border-accent-green/20 px-2.5 py-1 rounded-md text-accent-green">
                <Sparkles className="w-3 h-3" />
                Free study tool
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                Security+ SY0-701
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Security+ Acronyms Flashcards
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All {total} acronyms from the official CompTIA Security+ SY0-701
              objectives. Flip each card, mark what you know, and the ones you
              miss come back around. Progress saves on this device.
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {knownCount} / {total} known
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/[0.06] border border-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent-green"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={shouldReduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* Flashcard / completion */}
          {!loaded ? (
            <div className="h-64 rounded-2xl bg-white/[0.04] border border-white/[0.08] animate-pulse" />
          ) : done ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] px-6 py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-accent-green/15 border border-accent-green/30 flex items-center justify-center">
                <Check className="w-7 h-7 text-accent-green" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">You&apos;ve cleared the deck</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  All {total} acronyms marked as known. Reset anytime to run
                  through them again before exam day.
                </p>
              </div>
              <button
                onClick={resetProgress}
                className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Start over
              </button>
            </div>
          ) : (
            current && (
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setFlipped((f) => !f)}
                  aria-label={flipped ? "Show acronym" : "Reveal full term"}
                  className="group relative w-full min-h-[16rem] cursor-pointer rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_10px_30px_-12px_rgba(0,0,0,0.8)] transition-all hover:border-accent-green/40 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={flipped ? "back" : "front"}
                      initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-10 text-center"
                    >
                      {!flipped ? (
                        <>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground">
                            Acronym
                          </span>
                          <span className="text-4xl sm:text-5xl font-bold tracking-tight break-words">
                            {current.acronym}
                          </span>
                          <span className="text-xs text-muted-foreground mt-2">
                            Tap or press Space to reveal
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs uppercase tracking-widest text-accent-green">
                            {current.acronym}
                          </span>
                          <span className="text-xl sm:text-2xl font-semibold leading-snug text-foreground break-words">
                            {current.full}
                          </span>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>

                {/* Action row */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={markLearning}
                    disabled={!flipped}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-sm font-medium text-muted-foreground transition-all hover:border-amber-400/40 hover:text-amber-300 hover:bg-white/[0.07] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Still learning
                  </button>
                  <button
                    onClick={markKnown}
                    disabled={!flipped}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-accent-green/40 bg-accent-green/10 text-sm font-semibold text-accent-green transition-all hover:bg-accent-green/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Got it
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{queue.length} left in this round</span>
                  <button
                    onClick={reshuffle}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    Shuffle
                  </button>
                </div>
              </div>
            )
          )}

          {/* Reset (visible mid-progress) */}
          {loaded && !done && knownCount > 0 && (
            <button
              onClick={resetProgress}
              className="self-center inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset progress
            </button>
          )}

          {/* Full list (SEO + reference) */}
          <div className="mt-4 rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-green" />
                Full acronym list ({total})
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
            <div className={showAll ? "block" : "hidden"}>
              <dl className="divide-y divide-border">
                {sortedAll.map((a) => (
                  <div
                    key={a.acronym}
                    className="flex items-baseline gap-4 px-5 py-2.5 text-sm"
                  >
                    <dt className="font-mono font-semibold text-accent-green shrink-0 w-28 break-words">
                      {a.acronym}
                    </dt>
                    <dd className="text-muted-foreground">{a.full}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2 bg-card border border-border rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Ready for real questions?</p>
              <p className="text-xs text-muted-foreground">
                Put these acronyms to work on 500+ exam-style questions. No signup.
              </p>
            </div>
            <Link
              href="/quiz"
              className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Start Free Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
