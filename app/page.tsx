"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Zap, CheckCircle, Lock, ArrowRight, CalendarDays, ChevronDown, LogOut, User, Menu, X, Flame, Pencil, Check, Mail, Info, KeyRound, ExternalLink, Star } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { Logo } from "@/components/Logo"
import { useAuth } from "@/components/AuthProvider"
import { getStreak, getReadinessScore, getExamCountdown, getDomainMastery, DOMAIN_NAMES, unlock } from "@/lib/quiz-store"
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
  const [examCountdown, setExamCountdown] = useState<ReturnType<typeof getExamCountdown>>(null)
  const [mastery, setMastery] = useState<ReturnType<typeof getDomainMastery>>(null)
  const [greeting, setGreeting] = useState<{ line1: string; line2: string | null } | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [nameStatus, setNameStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [nameError, setNameError] = useState("")
  const [showRestoreInput, setShowRestoreInput] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState("")
  const [restoreStatus, setRestoreStatus] = useState<"idle" | "checking" | "notfound">("idle")
  const [showAboutModal, setShowAboutModal] = useState(false)
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

  // Close About modal on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowAboutModal(false)
    }
    if (showAboutModal) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showAboutModal])

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

  useEffect(() => {
    setExamCountdown(getExamCountdown(selectedCert))
    setMastery(getDomainMastery(selectedCert))
  }, [selectedCert])

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
      <nav ref={navRef} className="relative px-6 py-4 flex items-center justify-between">
        {/* Logo - always visible */}
        <motion.div className="flex items-center gap-2" {...fadeUp(0)}>
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </motion.div>

        {/* Centered welcome greeting - logged-in users only */}
        {user && greeting && (
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-snug pointer-events-none max-w-[45%]">
            <span className="text-sm sm:text-base font-semibold text-foreground truncate max-w-full">
              {greeting.line1}
            </span>
            {greeting.line2 && (
              <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-full mt-0.5">
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
          {/* Desktop account menu / sign-in */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowAccountMenu((v) => !v)}
                aria-expanded={showAccountMenu}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground border border-border hover:border-foreground/40 hover:bg-muted px-3 py-1.5 rounded-lg transition-colors min-h-[36px]"
              >
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="max-w-[100px] truncate">{displayName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-150 ${showAccountMenu ? "rotate-180" : ""}`} />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                  {editingName ? (
                    /* ── Name editor ── */
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
                          className="flex-1 flex items-center justify-center gap-1.5 bg-accent-green hover:bg-accent-hover disabled:opacity-50 text-black font-semibold py-1.5 rounded-lg transition-colors text-xs cursor-pointer"
                        >
                          {nameStatus === "saving" ? (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          onClick={() => setEditingName(false)}
                          className="flex-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg py-1.5 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : showRestoreInput ? (
                    /* ── Restore access inline ── */
                    <div className="px-3 py-2 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <KeyRound className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">Restore access</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Enter the email you used at checkout.
                      </p>
                      <input
                        type="email"
                        value={restoreEmail}
                        onChange={(e) => { setRestoreEmail(e.target.value); setRestoreStatus("idle") }}
                        onKeyDown={(e) => { if (e.key === "Enter") handleRestoreAccess() }}
                        placeholder="you@example.com"
                        autoFocus
                        className="w-full bg-muted border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors"
                      />
                      {restoreStatus === "notfound" && (
                        <p className="text-[11px] text-red-400">Email not found. Contact studypassplus@gmail.com</p>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRestoreAccess}
                          disabled={restoreStatus === "checking"}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-accent-green hover:bg-accent-hover disabled:opacity-50 text-black font-semibold py-1.5 rounded-lg transition-colors text-xs cursor-pointer"
                        >
                          {restoreStatus === "checking" ? (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          ) : "Restore"}
                        </button>
                        <button
                          onClick={() => { setShowRestoreInput(false); setRestoreEmail(""); setRestoreStatus("idle") }}
                          className="flex-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg py-1.5 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Main menu ── */
                    <>
                      {/* Account */}
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
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
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

                      {/* Help section */}
                      <div className="h-px bg-border my-1" />
                      <p className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        Help
                      </p>
                      <button
                        onClick={() => { setShowRestoreInput(true); setRestoreEmail(""); setRestoreStatus("idle") }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-muted-foreground" />
                        Already paid? Restore access
                      </button>
                      <a
                        href="mailto:studypassplus@gmail.com"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        Contact Support
                      </a>

                      {/* About */}
                      <div className="h-px bg-border my-1" />
                      <button
                        onClick={() => { setShowAboutModal(true); setShowAccountMenu(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-muted-foreground" />
                        About PassPlus
                      </button>

                      {/* Sign out */}
                      <div className="h-px bg-border my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-muted transition-colors cursor-pointer"
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
              className="text-sm font-medium text-foreground border border-border hover:border-foreground/40 hover:bg-muted px-3 py-1.5 rounded-lg transition-colors min-h-[44px] flex items-center"
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
          aria-expanded={showMobileMenu}
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
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-20 sm:py-28 gap-14">
        <div className="flex flex-col items-center gap-7 max-w-3xl w-full">
          <motion.p
            {...fadeUp(0)}
            className="text-sm text-accent-green font-medium tracking-wide"
          >
            The free CompTIA quiz that doesn&apos;t suck
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[1.03]"
          >
            Pass your{" "}
            <span className="text-accent-green">CompTIA cert</span>
            {" "}with confidence
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base sm:text-lg text-muted-foreground max-w-[480px] leading-relaxed"
          >
            1480 questions across Security+, Network+, and A+. Practice Mode, Exam Mode, instant feedback, and domain breakdown.
          </motion.p>

          {/* Cert selector */}
          <motion.div {...fadeUp(0.22)} className="flex items-center gap-2 flex-wrap justify-center">
            {certs.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  selectedCert === cert.id
                    ? "bg-accent-green/10 border-accent-green/40 text-foreground shadow-[0_0_16px_-4px_rgba(34,197,94,0.25)]"
                    : "bg-card border-border text-muted-foreground hover:border-accent-green/30 hover:text-foreground"
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
                    Unlock full access to all 1480 questions across both modes and get
                    AI explanations for every answer
                  </p>
                </div>
                <a
                  href="https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent("event", "unlock_clicked")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-all text-base w-full sm:w-auto min-h-[52px] shadow-[0_0_24px_-4px_rgba(34,197,94,0.45)] hover:shadow-[0_0_32px_-4px_rgba(34,197,94,0.55)]"
                >
                  Unlock All 1480 Questions - $9.99
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            ) : selectedCert === "aplus" ? (
              <>
                <Link
                  href="/quiz?cert=aplus"
                  onClick={() => sendGAEvent("event", "quiz_started", { cert: "aplus" })}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-all text-base w-full sm:w-auto min-h-[52px] shadow-[0_0_24px_-4px_rgba(34,197,94,0.45)] hover:shadow-[0_0_32px_-4px_rgba(34,197,94,0.55)]"
                >
                  {isUnlocked ? "Start Quiz" : "Start Free Quiz"}
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
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-all text-base w-full sm:w-auto min-h-[52px] shadow-[0_0_24px_-4px_rgba(34,197,94,0.45)] hover:shadow-[0_0_32px_-4px_rgba(34,197,94,0.55)]"
                >
                  {isUnlocked ? "Start Quiz" : "Start Free Quiz"}
                </Link>
                {!isUnlocked && (
                  <span className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
                    Free questions · Network+ N10-009 · No signup required
                  </span>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/quiz"
                  onClick={() => sendGAEvent("event", "quiz_started")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-all text-base w-full sm:w-auto min-h-[52px] shadow-[0_0_24px_-4px_rgba(34,197,94,0.45)] hover:shadow-[0_0_32px_-4px_rgba(34,197,94,0.55)]"
                >
                  {isUnlocked ? "Start Quiz" : "Start Free Quiz"}
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
            className="inline-flex items-center gap-2 border border-border rounded-full px-3.5 py-1.5 text-xs text-muted-foreground bg-card/50"
          >
            <Zap className="w-3 h-3 text-accent-green" />
            Security+ · Network+ · A+ · 1480 questions · Practice + Exam Mode
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {[
            { value: "1480", label: "Total Questions" },
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
              className="flex flex-col items-center justify-center gap-1 bg-card border border-border hover:border-accent-green/30 rounded-xl h-24 px-3 transition-all hover:shadow-[0_0_20px_-8px_rgba(34,197,94,0.18)]"
            >
              <span className="text-2xl font-bold tabular-nums">{stat.value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Streak + Readiness - shown only when data exists */}
        {(streak > 0 || readiness || examCountdown) && (
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
            {examCountdown && (
              <div className="flex items-center justify-center gap-2 bg-card border border-accent-green/20 rounded-xl px-3 h-24 overflow-hidden w-[calc(50%-6px)] sm:w-40">
                <CalendarDays className="w-5 h-5 text-accent-green shrink-0" />
                <div>
                  <span className="text-sm font-bold text-accent-green">
                    {examCountdown.daysLeft === 0
                      ? "Exam today"
                      : examCountdown.daysLeft === 1
                      ? "1 day left"
                      : `${examCountdown.daysLeft} days left`}
                  </span>
                  <span className="text-xs text-muted-foreground block leading-none mt-0.5">
                    {examCountdown.onTrack ? "On track" : `Aim for ${examCountdown.neededPerDay}/day`}
                  </span>
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

        {/* Domain mastery badges */}
        {mastery && (
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap justify-center gap-2 w-full max-w-2xl"
          >
            {mastery.map((m) => {
              const tierClass =
                m.tier === "Mastered"
                  ? "bg-accent-green/10 border-accent-green/25 text-accent-green"
                  : m.tier === "Proficient"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : m.tier === "Familiar"
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                  : "bg-card border-border text-muted-foreground"
              return (
                <span
                  key={m.domain}
                  title={`${DOMAIN_NAMES[selectedCert][m.domain]}: ${m.pct}% (${m.tier})`}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${tierClass}`}
                >
                  {m.tier === "Mastered" && <Star className="w-3 h-3 shrink-0" />}
                  {DOMAIN_NAMES[selectedCert][m.domain]}
                </span>
              )
            })}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/50 pb-2"
          aria-hidden
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Testimonial 1 */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative flex flex-col bg-card border border-accent-green/20 rounded-2xl p-6 sm:p-7 shadow-[0_0_32px_-6px_rgba(34,197,94,0.12)] hover:shadow-[0_0_40px_-6px_rgba(34,197,94,0.18)] hover:border-accent-green/30 transition-all h-full">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent-green fill-accent-green" viewBox="0 0 20 20" aria-hidden="true">
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
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-9 h-9 rounded-full bg-accent-green/15 border border-accent-green/25 flex items-center justify-center text-sm font-bold text-accent-green shrink-0">
                  A
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground leading-none">Alexxx</span>
                  <span className="inline-flex items-center gap-1 text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-full font-medium whitespace-nowrap w-fit">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    CompTIA Security+ Certified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative flex flex-col bg-card border border-accent-green/20 rounded-2xl p-6 sm:p-7 shadow-[0_0_32px_-6px_rgba(34,197,94,0.12)] hover:shadow-[0_0_40px_-6px_rgba(34,197,94,0.18)] hover:border-accent-green/30 transition-all h-full">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent-green fill-accent-green" viewBox="0 0 20 20" aria-hidden="true">
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
                I just took my test this afternoon and I passed! These questions helped me so much thank you for the content I believe in everyone in here you guys got this
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-9 h-9 rounded-full bg-accent-green/15 border border-accent-green/25 flex items-center justify-center text-sm font-bold text-accent-green shrink-0">
                  D
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground leading-none">Dame</span>
                  <span className="inline-flex items-center gap-1 text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-full font-medium whitespace-nowrap w-fit">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    CompTIA Security+ Certified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative flex flex-col bg-card border border-accent-green/20 rounded-2xl p-6 sm:p-7 shadow-[0_0_32px_-6px_rgba(34,197,94,0.12)] hover:shadow-[0_0_40px_-6px_rgba(34,197,94,0.18)] hover:border-accent-green/30 transition-all h-full">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-accent-green fill-accent-green" viewBox="0 0 20 20" aria-hidden="true">
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
                I did your test before the exam, all questions and had 95% right. Still passed so it&apos;s ok. Thank you for your website mate.
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-9 h-9 rounded-full bg-accent-green/15 border border-accent-green/25 flex items-center justify-center text-sm font-bold text-accent-green shrink-0">
                  M
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-sm font-medium text-foreground">Community Member</span>
                    <span className="text-xs text-muted-foreground/50 font-normal">· 802</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-full font-medium whitespace-nowrap w-fit">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    CompTIA Security+ Certified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-5">
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
              desc: "Unlock all 1480 questions across Security+, Network+, and A+ for $9.99.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 p-6 bg-card border border-border hover:border-accent-green/30 rounded-2xl transition-all hover:shadow-[0_0_20px_-6px_rgba(34,197,94,0.14)]"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
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
        <section className="px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto flex flex-col gap-6 items-center"
          >
            <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
            {!isUnlocked && (
              <p className="text-sm text-muted-foreground">
                25 free questions, no account needed.
              </p>
            )}
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur-md bg-accent-green/30 pointer-events-none" aria-hidden />
              <Link
                href="/quiz"
                onClick={() => sendGAEvent("event", "quiz_started")}
                className="relative flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-bold px-10 py-4 rounded-xl transition-all text-base min-h-[52px] w-full sm:w-auto justify-center"
              >
                {isUnlocked ? "Start Quiz" : "Start Free Quiz"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Community CTA */}
      <section className="px-6 py-16 sm:py-24">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto flex flex-col items-center text-center gap-7"
        >
          {/* Discord icon */}
          <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#5865F2" aria-hidden>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Study with others, not alone
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Join 1,000+ people preparing for their CompTIA certification. Daily questions, study tips, and a community that celebrates your pass.
            </p>
          </div>

          <a
            href="https://discord.gg/wYUMRNFWEM"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent("event", "discord_community_clicked")}
            className="group inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all text-sm min-h-[52px] text-white shadow-[0_0_24px_-4px_rgba(88,101,242,0.45)] hover:shadow-[0_0_32px_-4px_rgba(88,101,242,0.55)]"
            style={{ background: "#5865F2" }}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join the Community →
          </a>
        </motion.div>
      </section>

      <footer className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
        <span className="text-center sm:text-left">
          PassPlus - Not affiliated with CompTIA. Original practice questions based on publicly available CompTIA exam objectives.
        </span>
        <Link href="/blog" className="text-accent-green hover:text-accent-hover transition-colors">
          Blog
        </Link>
      </footer>

      {/* About PassPlus modal */}
      {showAboutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowAboutModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="About PassPlus"
        >
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            transition={shouldReduce ? { duration: 0.15 } : { type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo size={28} />
                <span className="font-bold text-base tracking-tight">PassPlus</span>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                PassPlus is a free CompTIA practice quiz built to help people actually pass their certification exams - not just memorize dumps.
              </p>
              <p>
                It covers <strong className="text-foreground">Security+ SY0-701</strong>, <strong className="text-foreground">Network+ N10-009</strong>, and <strong className="text-foreground">A+ Core 1 & 2</strong> with 1,480 questions across Practice Mode and Exam Mode. Paid users get AI explanations for every answer.
              </p>
              <p>
                Built and maintained independently. Questions are original, written from CompTIA exam objectives - not recycled braindumps.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 pt-1 border-t border-border">
              <a
                href="https://www.studypassplus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-accent-green hover:text-accent-hover transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                studypassplus.com
              </a>
              <a
                href="mailto:studypassplus@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                studypassplus@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}
