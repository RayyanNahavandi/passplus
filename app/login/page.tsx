"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Mail, Lock, ArrowRight, CheckCircle } from "lucide-react"
import { Logo } from "@/components/Logo"
import { supabase } from "@/lib/supabase"
import { unlock } from "@/lib/quiz-store"

type Mode = "signin" | "signup"
type Status = "idle" | "loading" | "confirm_email" | "error"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function checkPaidAndRedirect(accessToken: string) {
    try {
      const res = await fetch("/api/auth/check-paid", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const { paid } = await res.json() as { paid: boolean }
      if (paid) {
        unlock()
        router.push("/quiz")
      } else {
        router.push("/")
      }
    } catch {
      router.push("/")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setErrorMsg(error.message)
        setStatus("error")
        return
      }
      // If email confirmation is required, data.session is null
      if (!data.session) {
        setStatus("confirm_email")
        return
      }
      await checkPaidAndRedirect(data.session.access_token)
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setErrorMsg(
          error.message === "Invalid login credentials"
            ? "Incorrect email or password."
            : error.message
        )
        setStatus("error")
        return
      }
      await checkPaidAndRedirect(data.session.access_token)
    }
  }

  function switchMode(m: Mode) {
    setMode(m)
    setStatus("idle")
    setErrorMsg("")
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </div>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
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
                  <button onClick={() => switchMode("signup")} className="text-accent-green hover:underline">
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have one?{" "}
                  <button onClick={() => switchMode("signin")} className="text-accent-green hover:underline">
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
