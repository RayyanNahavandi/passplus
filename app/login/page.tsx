"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Mail, Lock, User, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/Logo"
import { supabase } from "@/lib/supabase"
import { unlock } from "@/lib/quiz-store"
import { useAuth } from "@/components/AuthProvider"

type Mode = "signin" | "signup" | "reset"
type Status = "idle" | "loading" | "confirm_email" | "reset_sent" | "error"

export default function LoginPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Redirect already-authenticated users away from /login
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/")
    }
  }, [authLoading, user, router])

  async function checkPaidAndRedirect(accessToken: string) {
    try {
      const res = await fetch("/api/auth/check-paid", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const { paid } = (await res.json()) as { paid: boolean }
      if (paid) {
        unlock()
        router.push("/quiz")
      } else {
        router.push("/")
      }
    } catch (err) {
      console.error("[auth] check-paid request failed after login:", err)
      router.push("/")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "https://studypassplus.com/reset-password",
        })
        if (error) {
          console.error("[auth] resetPasswordForEmail error:", error.message, error)
          setErrorMsg(error.message)
          setStatus("error")
          return
        }
        setStatus("reset_sent")
        return
      }
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName.trim() || email.split("@")[0] },
          },
        })
        if (error) {
          // Log the exact Supabase error so failures are diagnosable in the console.
          console.error("[auth] signUp error:", error.message, error)
          const msg = error.message.toLowerCase()
          if (msg.includes("already registered") || msg.includes("already been registered")) {
            setErrorMsg("An account with this email already exists. Please sign in instead.")
          } else {
            setErrorMsg(error.message)
          }
          setStatus("error")
          return
        }
        // Supabase obfuscates duplicate signups for security: when the email is
        // already registered it returns a user with an EMPTY identities array
        // and no session (instead of an error). Treat that as "already exists".
        if (
          data.user &&
          Array.isArray(data.user.identities) &&
          data.user.identities.length === 0
        ) {
          console.warn(
            "[auth] signUp returned empty identities — email already registered:",
            email
          )
          setErrorMsg("An account with this email already exists. Please sign in instead.")
          setStatus("error")
          return
        }
        if (!data.session) {
          setStatus("confirm_email")
          return
        }
        await checkPaidAndRedirect(data.session.access_token)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          // Log the exact Supabase error so failures are diagnosable in the console.
          console.error("[auth] signInWithPassword error:", error.message, error)
          const msg = error.message.toLowerCase()
          if (msg.includes("invalid login credentials")) {
            setErrorMsg("Incorrect email or password.")
          } else {
            setErrorMsg(error.message)
          }
          setStatus("error")
          return
        }
        await checkPaidAndRedirect(data.session.access_token)
      }
    } catch (err) {
      // Catch thrown/network errors so the form never hangs on "loading".
      console.error("[auth] Unexpected error during auth:", err)
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
      setStatus("error")
    }
  }

  function switchMode(m: Mode) {
    setMode(m)
    setStatus("idle")
    setErrorMsg("")
  }

  // Show spinner while checking existing session
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-5 h-5 rounded-full border-2 border-border border-t-accent-green animate-spin" />
      </div>
    )
  }

  // Already signed in - render nothing while redirect fires
  if (user) return null

  if (status === "confirm_email") {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="border-b border-border px-5 py-3 flex items-center gap-2">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-accent-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1">Check your inbox</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We sent a confirmation link to{" "}
                <span className="text-foreground font-medium">{email}</span>.
                Click it to activate your account, then come back and sign in.
              </p>
            </div>
            <button
              onClick={() => switchMode("signin")}
              className="text-sm text-accent-green hover:text-accent-hover transition-colors"
            >
              Back to sign in →
            </button>
          </motion.div>
        </main>
      </div>
    )
  }

  // Forgot-password flow: request a reset email
  if (mode === "reset") {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="border-b border-border px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="font-semibold text-sm tracking-tight">PassPlus</span>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-card border border-border rounded-2xl p-7 flex flex-col gap-6"
          >
            {status === "reset_sent" ? (
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-accent-green" />
                </div>
                <div>
                  <h1 className="text-xl font-bold mb-1">Check your email</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Check your email for a password reset link.
                  </p>
                </div>
                <button
                  onClick={() => switchMode("signin")}
                  className="text-sm text-accent-green hover:text-accent-hover transition-colors"
                >
                  Back to sign in →
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center text-center gap-1">
                  <h1 className="text-xl font-bold">Reset your password</h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email and we&apos;ll send you a reset link.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoFocus
                      className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                    />
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-400"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm mt-1"
                  >
                    {status === "loading" ? (
                      <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                    ) : (
                      <>
                        Send reset link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-center text-muted-foreground">
                  Remembered it?{" "}
                  <button
                    onClick={() => switchMode("signin")}
                    className="text-accent-green hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </div>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Mode toggle */}
          <div className="flex bg-muted border border-border rounded-xl p-1 mb-6">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                  mode === m
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-1">
              <h1 className="text-xl font-bold">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === "signin"
                  ? "Sign in to restore access on this device."
                  : "Sign up to link your purchase to an account."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Display name - signup only */}
              <AnimatePresence initial={false}>
                {mode === "signup" && (
                  <motion.div
                    key="displayName"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display name (e.g. Alex)"
                        maxLength={32}
                        className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus={mode === "signin"}
                  className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full bg-muted border border-border rounded-xl pl-9 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => switchMode("reset")}
                  className="self-end -mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </button>
              )}

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-400"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm mt-1"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Sign in" : "Create account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              {mode === "signin" ? (
                <>
                  No account?{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className="text-accent-green hover:underline"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have one?{" "}
                  <button
                    onClick={() => switchMode("signin")}
                    className="text-accent-green hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
