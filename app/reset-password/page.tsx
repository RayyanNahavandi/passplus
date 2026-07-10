"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { Lock, CheckCircle, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/Logo"
import { supabase } from "@/lib/supabase"

type Status = "idle" | "loading" | "success" | "error"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [ready, setReady] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Supabase parses the recovery token from the URL hash on load
  // (detectSessionInUrl is on by default). Wait for that before
  // letting the user submit a new password.
  useEffect(() => {
    let mounted = true
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event) => {
      if (mounted) setReady(true)
    })
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error("[auth] reset-password getSession error:", error.message, error)
      if (mounted) setReady(true)
      void session
    })
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.")
      setStatus("error")
      return
    }
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.")
      setStatus("error")
      return
    }
    setStatus("loading")
    setErrorMsg("")
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        console.error("[auth] updateUser (password reset) error:", error.message, error)
        const msg = error.message.toLowerCase()
        if (msg.includes("session") || msg.includes("token") || msg.includes("expired")) {
          setErrorMsg(
            "Your reset link is invalid or has expired. Please request a new one from the sign-in page."
          )
        } else {
          setErrorMsg(error.message)
        }
        setStatus("error")
        return
      }
      setStatus("success")
      setTimeout(() => router.push("/login"), 2500)
    } catch (err) {
      console.error("[auth] Unexpected error during password reset:", err)
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
      setStatus("error")
    }
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
          Back
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-7 flex flex-col gap-6"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-accent-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold mb-1">Password updated</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your password has been changed. Redirecting you to sign in…
                </p>
              </div>
              <Link
                href="/login"
                className="text-sm text-accent-green hover:text-accent-hover transition-colors"
              >
                Go to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center gap-1">
                <h1 className="text-xl font-bold">Set a new password</h1>
                <p className="text-sm text-muted-foreground">
                  Choose a new password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    required
                    minLength={6}
                    autoFocus
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

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                    className="w-full bg-muted border border-border rounded-xl pl-9 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !ready}
                  className="flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm mt-1"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  ) : (
                    <>
                      Update password
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                <Link href="/login" className="text-accent-green hover:underline">
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
