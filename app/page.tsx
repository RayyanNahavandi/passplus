"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Zap, CheckCircle, Lock, ArrowRight, CalendarDays, ChevronDown, LogOut, User, Menu, X, Flame, Pencil, Check } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { Logo } from "@/components/Logo"
import { useAuth } from "@/components/AuthProvider"
import { getStreak, getReadinessScore, unlock } from "@/lib/quiz-store"
import { ReadinessRing } from "@/components/ReadinessRing"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const shouldReduce = useReducedMotion()
  const router = useRouter()
  const { user, displayName, signOut, isPaid } = useAuth()
  const [freeCompleted, setFreeCompleted] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedCert, setSelectedCert] = useState<"secplus" | "netplus" | "aplus">("secplus")
  const [streak, setStreak] = useState(0)
  const [readiness, setReadiness] = useState<ReturnType<typeof getReadinessScore>>(null)
  const [greeting, setGreeting] = useState<{ line1: string; line2: string | null } | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [nameStatus, setNameStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [nameError, setNameError] = useState("")
  const [showRestoreInput, setShowRestoreInput] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState("")
  const [restoreStatus, setRestoreStatus] = useState<"idle" | "checking" | "notfound">("idle")
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const handleRestoreAccess = async () => {
    const email = restoreEmail.trim().toLowerCase()
    if (!email || !email.includes("@")) return
    setRestoreStatus("checking")
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.valid) {
        unlock(30) // 30-day cookie for email-only restore (no account)
        sendGAEvent("event", "restore_access_success")
        router.push("/quiz")
      } else {
        setRestoreStatus("notfound")
      }
    } catch {
      setRestoreStatus("notfound")
    }
  }

  // Close desktop account dropdown on click-outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false)
      }
    }
    if (showAccountMenu) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showAccountMenu])

  // Close mobile menu on click-outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setShowMobileMenu(false)
      }
    }
    if (showMobileMenu) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMobileMenu])

  async function handleSignOut() {
    setShowAccountMenu(false)
    await signOut()
    router.refresh()
  }

  function openNameEditor() {
    setNameInput(displayName ?? "")
    setNameError("")
    setNameStatus("idle")
    setEditingName(true)
  }

  async function handleSaveName() {
    const newName = nameInput.trim()
    if (!newName) {
      setNameError("Name can't be empty.")
      setNameStatus("error")
      return
    }
    setNameStatus("saving")
    setNameError("")
    const { error } = await supabase.auth.updateUser({
      data: { display_name: newName },
    })
    if (error) {
      console.error("[auth] updateUser (display_name) error:", error.message, error)
      setNameError(error.message)
      setNameStatus("error")
      return
    }
    // AuthProvider listens to onAuthStateChange (USER_UPDATED) and refreshes
    // the user object, so the navbar name updates without a page reload.
    setNameStatus("success")
    setEditingName(false)
  }


  const certs = [
    { id: "secplus" as const, label: "Security+", sub: "SY0-701", available: true },
    { id: "netplus" as const, label: "Network+", sub: "N10-009", available: true },
    { id: "aplus"  as const, label: "A+",        sub: "Core 1 & 2", available: true },
  ]

  useEffect(() => {
    const completed = localStorage.getItem("passplus_completed") === "true"
    const unlocked = localStorage.getItem("passplus_unlocked") === "true"
    setFreeCompleted(completed && !unlocked)
    setIsUnlocked(unlocked)
    setStreak(getStreak().count)
    setReadiness(getReadinessScore())
  }, [])

  // Reactively update when AuthProvider async-confirms paid status.
  // Handles new devices / cleared localStorage: even if the sync localStorage
  // read above returns false, once Supabase confirms the user is paid the UI
  // immediately shows the paid experience without a page reload.
  useEffect(() => {
    if (isPaid) {
      setIsUnlocked(true)
      setFreeCompleted(false)
    }
  }, [isPaid])

  // Personalized, time-aware greeting (client-only to use the user's local clock)
  useEffect(() => {
    if (!user || !displayName) {
      setGreeting(null)
      return
    }
    const hasStudied =
      !!localStorage.getItem("passplus_quiz_history") ||
      localStorage.getItem("passplus_completed") === "true" ||
      getStreak().count > 0

    const hour = new Date().getHours()
    let timeMsg: string
    if (hour < 12) timeMsg = "Good morning"
    else if (hour < 17) timeMsg = "Good afternoon"
    else if (hour < 20) timeMsg = "Good evening"
    else timeMsg = Math.random() < 0.5 ? "Late night grind" : "Burning the midnight oil"

    if (hasStudied) {
      setGreeting({ line1: `Welcome back, ${displayName}`, line2: timeMsg })
    } else {
      setGreeting({ line1: `Hey ${displayName}, let's get started.`, line2: null })
    }
  }, [user, displayName])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduce ? 0 : 0.5,
      ease: "easeOut" as const,
      delay: shouldReduce ? 0 : delay,
    },
  })

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <nav ref={navRef} className="relative border-b border-border px-6 py-4 flex items-center justify-between">
        {/* Logo - always visible */}
        <motion.div className="flex items-center gap-2" {...fadeUp(0)}>
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </motion.div>

        {/* Centered welcome greeting - logged-in users only */}
        {user && greeting && (
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-tight pointer-events-none max-w-[45%]">
            <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-full">
              {greeting.line1}
            </span>
            {greeting.line2 && (
              <span className="hidden sm:block text-[11px] text-muted-foreground truncate max-w-full">
                {greeting.line2}
              </span>
            )}
          </div>
        )}

        {/* Desktop nav - hidden on mobile */}
        <motion.div {...fadeUp(0.05)} className="hidden md:flex items-center gap-3">
          <Link
            href="/daily"
            onClick={() => sendGAEvent("event", "daily_nav_clicked")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green hover:text-accent-hover transition-colors min-h-[44px] px-1"
          >
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            Daily Question
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse shrink-0" />
          </Link>
          {!freeCompleted && (
            <Link
              href="/quiz"
              onClick={() => sendGAEvent("event", "quiz_started")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
            >
              Start Quiz →
            </Link>
          )}

          {/* Desktop account menu / sign-in */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowAccountMenu((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground border border-border hover:border-foreground/40 hover:bg-muted px-3 py-1.5 rounded-lg transition-colors min-h-[36px]"
              >
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="max-w-[100px] truncate">{displayName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-150 ${showAccountMenu ? "rotate-180" : ""}`} />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                  {editingName ? (
                    <div className="px-3 py-2 flex flex-col gap-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Display name
                      </label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        maxLength={32}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName()
                          if (e.key === "Escape") setEditingName(false)
                        }}
                        className="w-full bg-muted border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:border-accent-green/50 transition-colors"
                      />
                      {nameStatus === "error" && (
                        <p className="text-[11px] text-red-400">{nameError}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveName}
                          disabled={nameStatus === "saving"}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-accent-green hover:bg-accent-hover disabled:opacity-50 text-black font-semibold py-1.5 rounded-lg transition-colors text-xs"
                        >
                          {nameStatus === "saving" ? (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          onClick={() => setEditingName(false)}
                          className="flex-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg py-1.5 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        My Account
                      </Link>
                      <button
                        onClick={openNameEditor}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        Change display name
                      </button>
                      {nameStatus === "success" && (
                        <p className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-accent-green">
                          <Check className="w-3 h-3" />
                          Display name updated.
                        </p>
                      )}
                      <div className="h-px bg-border my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-muted transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign out
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-foreground border border-border hover:border-foreground/40 hover:bg-muted px-3 py-1.5 rounded-lg transition-colors min-h-[36px] flex items-center"
            >
              Sign in
            </Link>
          )}
        </motion.div>

        {/* Hamburger - mobile only */}
        <button
          onClick={() => setShowMobileMenu((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
          aria-label="Menu"
        >
          {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Mobile dropdown */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50 flex flex-col py-2">
            <Link
              href="/daily"
              onClick={() => { setShowMobileMenu(false); sendGAEvent("event", "daily_nav_clicked") }}
              className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-accent-green hover:bg-muted transition-colors"
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              Daily Question
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            </Link>

            {!freeCompleted && (
              <Link
                href="/quiz"
                onClick={() => { setShowMobileMenu(false); sendGAEvent("event", "quiz_started") }}
                className="flex items-center gap-2.5 px-5 py-3 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <Zap className="w-4 h-4 text-muted-foreground shrink-0" />
                Start Quiz
              </Link>
            )}

            <div className="h-px bg-border mx-5 my-1" />

            {user ? (
              <>
                <div className="flex items-center gap-2.5 px-5 py-2">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">{displayName}</span>
                </div>
                <Link
                  href="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-2.5 px-5 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <User className="w-4 h-4 shrink-0" />
                  My Account
                </Link>
                <button
                  onClick={() => { setShowMobileMenu(false); handleSignOut() }}
                  className="flex items-center gap-2.5 px-5 py-3 text-sm text-red-400 hover:bg-muted transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                Sign in
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16 sm:py-24 gap-12">
        <div className="flex flex-col items-center gap-6 max-w-3xl w-full">
          <motion.p
            {...fadeUp(0)}
            className="text-sm text-accent-green font-medium tracking-wide"
          >
            The free CompTIA quiz that doesn&apos;t suck
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Pass your{" "}
            <span className="text-accent-green">CompTIA cert</span>
            {" "}with confidence
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            1470 questions across Practice Mode and Exam Mode covering
            Security+, Network+, and A+. Instant feedback, score tracking, and
            missed-question drills.
          </motion.p>

          {/* Cert selector */}
          <motion.div {...fadeUp(0.22)} className="flex items-center gap-2 flex-wrap justify-center">
            {certs.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                  selectedCert === cert.id
                    ? "bg-accent-green/10 border-accent-green/40 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                }`}
              >
                <span>{cert.label}</span>
                <span className={`text-xs ${selectedCert === cert.id ? "text-accent-green" : "text-muted-foreground/60"}`}>
                  {cert.sub}
                </span>
                {!cert.available && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-semibold bg-muted border border-border text-muted-foreground px-1.5 py-0.5 rounded-full leading-none">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-col items-center gap-3 w-full sm:w-auto"
          >
            {freeCompleted ? (
              <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    You&apos;ve completed your free quiz
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Unlock full access to all 1470 questions across both modes and get
                    AI explanations for every answer
                  </p>
                </div>
                <a
                  href="https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent("event", "unlock_clicked")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  Unlock All 1470 Questions - $9.99
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                {!showRestoreInput ? (
                  <button
                    type="button"
                    onClick={() => { setShowRestoreInput(true); setRestoreStatus("idle") }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[36px]"
                  >
                    Already paid? Restore access
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <input
                        type="email"
                        value={restoreEmail}
                        onChange={(e) => { setRestoreEmail(e.target.value); setRestoreStatus("idle") }}
                        onKeyDown={(e) => { if (e.key === "Enter") handleRestoreAccess() }}
                        placeholder="Email used at checkout"
                        className="flex-1 sm:w-56 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent-green"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleRestoreAccess}
                        disabled={restoreStatus === "checking"}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-card border border-border hover:border-accent-green/50 transition-colors disabled:opacity-50"
                      >
                        {restoreStatus === "checking" ? "Checking…" : "Restore"}
                      </button>
                    </div>
                    {restoreStatus === "notfound" && (
                      <p className="text-xs text-red-400 text-center">
                        Email not found. Contact studypassplus@gmail.com
                      </p>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Having issues? Email studypassplus@gmail.com
                </p>
              </div>
            ) : selectedCert === "aplus" ? (
              <>
                <Link
                  href="/quiz?cert=aplus"
                  onClick={() => sendGAEvent("event", "quiz_started", { cert: "aplus" })}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  {isUnlocked ? "Start Quiz →" : "Start Free Quiz →"}
                </Link>
                {!isUnlocked && (
                  <span className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
                    Free questions · A+ Core 1 &amp; Core 2 · No signup required
                  </span>
                )}
              </>
            ) : selectedCert === "netplus" ? (
              <>
                <Link
                  href="/quiz?cert=netplus"
                  onClick={() => sendGAEvent("event", "quiz_started", { cert: "netplus" })}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  {isUnlocked ? "Start Quiz →" : "Start Free Quiz →"}
                </Link>
                {!isUnlocked && (
                  <span className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
                    25 free questions · Network+ N10-009 · No signup required
                  </span>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/quiz"
                  onClick={() => sendGAEvent("event", "quiz_started")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  {isUnlocked ? "Start Quiz →" : "Start Free Quiz →"}
                </Link>
                {!isUnlocked && (
                  <span className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
                    Join 1,000+ people across 20+ countries studying for SY0-701. Students have already passed
                  </span>
                )}
              </>
            )}
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <Zap className="w-3 h-3 text-accent-green" />
            Security+ · Network+ · A+ · 1470 questions · Practice + Exam Mode
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {[
            { value: "1470", label: "Total Questions" },
            { value: "2", label: "Study Modes" },
            { value: "3", label: "Certs Covered" },
            { value: "Free", label: "First 25 Questions" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-1 bg-card border border-border rounded-xl h-24 px-3"
            >
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Streak + Readiness - shown only when data exists */}
        {(streak > 0 || readiness) && (
          <motion.div
            {...fadeUp(0.35)}
            className="flex flex-wrap justify-center gap-3 w-full max-w-2xl"
          >
            {streak > 0 && (
              <div className="flex items-center justify-center gap-2 bg-card border border-orange-500/20 rounded-xl px-3 h-24 overflow-hidden w-[calc(50%-6px)] sm:w-40">
                <Flame className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <span className="text-sm font-bold text-orange-400">{streak} day streak</span>
                  <span className="text-xs text-muted-foreground block leading-none mt-0.5">Keep it going!</span>
                </div>
              </div>
            )}
            {readiness && (
              <div className="flex flex-col items-center justify-center border border-border rounded-xl px-3 h-24 overflow-hidden bg-card w-[calc(50%-6px)] sm:w-40">
                <ReadinessRing pct={readiness.pct} size={72} />
              </div>
            )}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/30 pb-2"
          aria-hidden
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-10">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-card border border-accent-green/20 rounded-2xl px-7 py-6 shadow-[0_0_24px_-4px_rgba(74,222,128,0.08)]">
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-accent-green fill-accent-green" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-xs font-medium text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-full">
                Verified Pass
              </span>
            </div>

            {/* Quote mark */}
            <span className="text-4xl font-serif leading-none text-accent-green select-none" aria-hidden>
              &ldquo;
            </span>

            <p className="text-sm sm:text-base text-foreground leading-relaxed -mt-2 mb-4">
              I passed! The questions were very similar to the real exam. Highly recommend studying all 200+ questions!
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent-green/15 border border-accent-green/25 flex items-center justify-center text-xs font-bold text-accent-green">
                A
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">Alexxx</span>
                <span className="inline-flex items-center gap-1 text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle className="w-3 h-3" />
                  CompTIA Security+ Certified
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="w-4 h-4 text-accent-green" />,
              title: "Instant Feedback",
              desc: "See the correct answer immediately after every question.",
            },
            {
              icon: <CheckCircle className="w-4 h-4 text-accent-green" />,
              title: "Practice Missed",
              desc: "Drill the questions you got wrong until they stick.",
            },
            {
              icon: <Lock className="w-4 h-4 text-accent-green" />,
              title: "Full Question Bank",
              desc: "Unlock all 1470 questions across Security+, Network+, and A+ for $9.99.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 p-5 bg-card border border-border rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!freeCompleted && (
        <section className="border-t border-border px-6 py-16 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto flex flex-col gap-5 items-center"
          >
            <h2 className="text-xl font-bold">Ready to start?</h2>
            {!isUnlocked && (
              <p className="text-sm text-muted-foreground">
                25 free questions, no account needed.
              </p>
            )}
            <Link
              href="/quiz"
              onClick={() => sendGAEvent("event", "quiz_started")}
              className="flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm min-h-[48px] w-full sm:w-auto justify-center"
            >
              {isUnlocked ? "Start Quiz →" : "Start Free Quiz →"}
            </Link>
          </motion.div>
        </section>
      )}

      {/* Community CTA */}
      <section className="border-t border-border px-6 py-16">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto flex flex-col items-center text-center gap-6"
        >
          {/* Discord icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(88,101,242,0.12)", border: "1px solid rgba(88,101,242,0.25)" }}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#5865F2" aria-hidden>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Study with others, not alone
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Join 1,000+ people preparing for their CompTIA certification. Daily questions, study tips, and a community that celebrates your pass.
            </p>
          </div>

          <a
            href="https://discord.gg/wYUMRNFWEM"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent("event", "discord_community_clicked")}
            className="group inline-flex items-center gap-2.5 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm min-h-[48px] text-white"
            style={{ background: "#5865F2" }}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join the Community →
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
        <span>
          PassPlus - Not affiliated with CompTIA. Original practice questions based on publicly available CompTIA exam objectives.
        </span>
        <Link href="/blog" className="hover:text-muted-foreground transition-colors">
          Blog
        </Link>
      </footer>
    </main>
  )
}
