"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  Check,
  RotateCcw,
  Shuffle,
  Lock,
  BookOpen,
  ChevronDown,
  Sparkles,
  Layers,
} from "lucide-react"
import { Logo } from "@/components/Logo"
import { useAuth } from "@/components/AuthProvider"
import { isUnlocked } from "@/lib/quiz-store"
import { type Acronym } from "@/data/securityPlusAcronyms"

const STORAGE_KEY = "acronyms:secplus:known"
const STRIPE_URL = "https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
// Free tier: the first slice of the official list. The rest unlock with Pro.
const FREE_LIMIT = 40

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = "setup" | "study" | "done"

export function AcronymsClient({ acronyms }: { acronyms: Acronym[] }) {
  const shouldReduce = useReducedMotion()
  const { isPaid } = useAuth()

  const [unlocked, setUnlocked] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  const [phase, setPhase] = useState<Phase>("setup")
  const [deck, setDeck] = useState<Acronym[]>([])
  const [sessionSize, setSessionSize] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const total = acronyms.length

  // Hydrate unlock state + known-set once.
  useEffect(() => {
    setUnlocked(isPaid || isUnlocked())
    let saved: string[] = []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) saved = JSON.parse(raw)
    } catch {
      saved = []
    }
    setKnown(new Set(saved.filter((s) => acronyms.some((a) => a.acronym === s))))
    setLoaded(true)
  }, [acronyms, isPaid])

  // Persist known-set after load.
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...known]))
    } catch {
      /* storage unavailable — session-only progress */
    }
  }, [known, loaded])

  // The pool this user is allowed to study.
  const pool = useMemo(
    () => (unlocked ? acronyms : acronyms.slice(0, FREE_LIMIT)),
    [acronyms, unlocked]
  )
  const poolSize = pool.length

  // Session-size choices scale to the available pool.
  const sizeOptions = useMemo(() => {
    const base = [10, 25, 50].filter((n) => n < poolSize)
    return [...base, poolSize] // last option = "all available"
  }, [poolSize])

  const startSession = useCallback(
    (size: number) => {
      // Prioritise acronyms the user hasn't marked known yet.
      const notKnown = pool.filter((a) => !known.has(a.acronym))
      const alreadyKnown = pool.filter((a) => known.has(a.acronym))
      const ordered = [...shuffle(notKnown), ...shuffle(alreadyKnown)]
      setDeck(ordered.slice(0, size))
      setSessionSize(size)
      setFlipped(false)
      setPhase("study")
    },
    [pool, known]
  )

  const current = deck[0] ?? null
  const studied = sessionSize - deck.length
  const progress = sessionSize > 0 ? Math.round((studied / sessionSize) * 100) : 0
  const knownCount = known.size

  const markKnown = useCallback(() => {
    if (!current) return
    setKnown((prev) => new Set(prev).add(current.acronym))
    setDeck((prev) => {
      const next = prev.slice(1)
      if (next.length === 0) setPhase("done")
      return next
    })
    setFlipped(false)
  }, [current])

  const markLearning = useCallback(() => {
    if (!current) return
    setDeck((prev) => (prev.length <= 1 ? prev : [...prev.slice(1), prev[0]]))
    setFlipped(false)
  }, [current])

  const reshuffle = useCallback(() => {
    setDeck((prev) => shuffle(prev))
    setFlipped(false)
  }, [])

  const restart = useCallback(() => {
    setPhase("setup")
    setDeck([])
    setFlipped(false)
  }, [])

  // Keyboard: Space/Enter flips, arrows mark (study phase only).
  useEffect(() => {
    if (phase !== "study") return
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
  }, [phase, current, flipped, markKnown, markLearning])

  // Only the pool this user can access is rendered in the reference list —
  // the paid acronyms are never sent to the client as readable text.
  const sortedVisible = useMemo(
    () => [...pool].sort((a, b) => a.acronym.localeCompare(b.acronym)),
    [pool]
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — mirrors the quiz top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm px-4 sm:px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Logo size={28} />
          <span className="hidden sm:inline font-semibold text-sm tracking-tight">
            PassPlus
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
          {phase === "study" && (
            <>
              <span>
                {Math.min(studied + 1, sessionSize)}/{sessionSize}
              </span>
              <span className="w-px h-3 bg-border" />
              <span>
                <span className="hidden sm:inline">Known </span>
                <span className="text-accent-green font-medium">{knownCount}</span>
              </span>
            </>
          )}

          {!unlocked && (
            <>
              <span className="w-px h-3 bg-border" />
              <span className="text-yellow-500">Free</span>
            </>
          )}

          {phase !== "setup" && (
            <>
              <span className="w-px h-3 bg-border" />
              <button
                onClick={restart}
                title="Restart"
                aria-label="Restart"
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground relative before:absolute before:-inset-1.5 before:content-['']"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Top progress bar (study phase) */}
      {phase === "study" && (
        <div
          className="h-1.5 bg-border w-full"
          role="progressbar"
          aria-label="Session progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <motion.div
            className="h-full origin-left rounded-r-full relative"
            style={{ background: "linear-gradient(90deg, rgba(34,197,94,0.8) 0%, #22C55E 100%)" }}
            animate={{ width: `${progress}%` }}
            transition={shouldReduce ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18 }}
          >
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-green shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]"
              aria-hidden
            />
          </motion.div>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* ---------- SETUP ---------- */}
          {phase === "setup" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-accent-green/10 border border-accent-green/20 px-2.5 py-1 rounded-md text-accent-green">
                    <Sparkles className="w-3 h-3" />
                    Study tool
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                    Security+ SY0-701
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Security+ Acronym Flashcards
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Flip each card, mark what you know, and the ones you miss come
                  back around. Progress saves on this device.
                  {unlocked
                    ? ` All ${total} official acronyms unlocked.`
                    : ` ${FREE_LIMIT} acronyms free — unlock all ${total} with Pro.`}
                </p>
              </div>

              {/* Overall progress */}
              {loaded && knownCount > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {knownCount} / {poolSize} known
                    </span>
                    <span>{Math.round((knownCount / poolSize) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.06] border border-white/[0.08] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent-green"
                      style={{ width: `${Math.min(100, Math.round((knownCount / poolSize) * 100))}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Session size picker */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="w-4 h-4 text-accent-green" />
                  How many to study?
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sizeOptions.map((n, i) => {
                    const isAll = n === poolSize
                    return (
                      <button
                        key={`${n}-${i}`}
                        onClick={() => startSession(n)}
                        className="group flex flex-col items-center justify-center gap-0.5 px-4 py-4 rounded-xl border border-border bg-card text-sm font-semibold transition-all hover:border-accent-green/40 hover:bg-accent-green/[0.06] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
                      >
                        <span className="text-foreground group-hover:text-accent-green transition-colors">
                          {isAll ? "All" : n}
                        </span>
                        <span className="text-[11px] font-normal text-muted-foreground">
                          {isAll ? `${poolSize} cards` : "cards"}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Locked / unlock upsell */}
              {!unlocked && (
                <div className="rounded-2xl border border-border bg-card px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">
                        {total - FREE_LIMIT} more acronyms with Pro
                      </p>
                      <p className="text-xs text-muted-foreground">
                        The free deck covers {FREE_LIMIT}. Pro unlocks the full
                        official SY0-701 list plus 500+ practice questions.
                      </p>
                    </div>
                  </div>
                  <a
                    href={STRIPE_URL}
                    className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Unlock all {total}
                  </a>
                </div>
              )}

              {/* Reference list — limited to the user's accessible pool */}
              <FullList
                items={sortedVisible}
                total={total}
                lockedCount={unlocked ? 0 : total - poolSize}
                showAll={showAll}
                onToggle={() => setShowAll((s) => !s)}
              />
            </div>
          )}

          {/* ---------- STUDY ---------- */}
          {phase === "study" && current && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                  Security+ SY0-701
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {deck.length} left
                </span>
              </div>

              {/* Flashcard */}
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? "Show acronym" : "Reveal full term"}
                className="group relative w-full min-h-[16rem] cursor-pointer rounded-2xl bg-card border border-border shadow-sm transition-colors hover:border-accent-green/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
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

              {/* Action buttons (option-card styling) */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={markLearning}
                  disabled={!flipped}
                  style={{ minHeight: 48 }}
                  className="group flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground transition-colors hover:border-amber-400/40 hover:text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Still learning
                </button>
                <button
                  onClick={markKnown}
                  disabled={!flipped}
                  style={{ minHeight: 48 }}
                  className="group flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-accent-green/40 bg-accent-green/10 text-sm font-semibold text-accent-green transition-colors hover:bg-accent-green/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/50"
                >
                  <Check className="w-4 h-4" />
                  Got it
                </button>
              </div>

              {/* Keyboard hint + shuffle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={reshuffle}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Shuffle
                </button>
                <p className="hidden sm:block text-[11px] text-muted-foreground/50">
                  Space to flip · ← still learning · → got it
                </p>
              </div>
            </div>
          )}

          {/* ---------- DONE ---------- */}
          {phase === "done" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-card border border-border shadow-sm px-6 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-accent-green/15 border border-accent-green/30 flex items-center justify-center">
                  <Check className="w-7 h-7 text-accent-green" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold">Session complete</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    You went through {sessionSize} card{sessionSize === 1 ? "" : "s"}.
                    You&apos;ve now marked {knownCount} of {poolSize} known.
                  </p>
                </div>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Study again
                </button>
              </div>

              {!unlocked && (
                <div className="rounded-2xl border border-border bg-card px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div>
                    <p className="font-semibold text-sm mb-0.5">
                      Unlock all {total} acronyms
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Plus 500+ exam-style questions and AI explanations.
                    </p>
                  </div>
                  <a
                    href={STRIPE_URL}
                    className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Go Pro
                  </a>
                </div>
              )}

              <Link
                href="/quiz"
                className="self-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Or jump into the full quiz →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function FullList({
  items,
  total,
  lockedCount,
  showAll,
  onToggle,
}: {
  items: Acronym[]
  total: number
  lockedCount: number
  showAll: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium hover:bg-white/[0.03] transition-colors cursor-pointer"
      >
        <span className="inline-flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent-green" />
          {lockedCount > 0
            ? `Acronym list (${items.length} of ${total})`
            : `Full acronym list (${total})`}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${showAll ? "rotate-180" : ""}`}
        />
      </button>
      <div className={showAll ? "block" : "hidden"}>
        <dl className="divide-y divide-border">
          {items.map((a) => (
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
        {lockedCount > 0 && (
          <a
            href={STRIPE_URL}
            className="flex items-center justify-center gap-2 px-5 py-4 border-t border-border text-sm font-medium text-muted-foreground hover:text-accent-green hover:bg-accent-green/[0.04] transition-colors"
          >
            <Lock className="w-4 h-4" />
            + {lockedCount} more acronyms with Pro
          </a>
        )}
      </div>
    </div>
  )
}
