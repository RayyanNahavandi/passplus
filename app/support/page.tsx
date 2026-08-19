"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Mail, Lock, CheckCircle } from "lucide-react"
import { Logo } from "@/components/Logo"
import { unlock } from "@/lib/quiz-store"

function SupportForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [authorized, setAuthorized] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "notfound" | "error" | "success">("idle")

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      setAuthorized(false)
      return
    }
    // Validated server-side so the token value never ships in the bundle
    fetch("/api/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, type: "support" }),
    })
      .then((r) => r.json())
      .then((data: { valid: boolean }) => setAuthorized(data.valid))
      .catch(() => setAuthorized(false))
  }, [searchParams])

  if (!authorized) {
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const r = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data: { valid: boolean } = await r.json()
      if (data.valid) {
        unlock()
        setStatus("success")
        setTimeout(() => router.push("/quiz"), 1500)
      } else {
        setStatus("notfound")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-6 shadow-sm"
    >
      <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
        <Mail className="w-7 h-7 text-accent-green" />
      </div>

      <div>
        <h1 className="text-xl font-bold mb-1">Restore Access</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enter the email used at purchase to unlock the full question bank on this device.
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <CheckCircle className="w-7 h-7 text-accent-green" />
          <p className="text-sm font-medium text-accent-green">Access restored!</p>
          <p className="text-xs text-muted-foreground">Redirecting to quiz…</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle") }}
            placeholder="you@example.com"
            required
            autoFocus
            className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent-green/50 transition-colors min-h-[44px]"
          />

          {status === "notfound" && (
            <p className="text-xs text-red-400 text-left">
              Email not found. Double-check the address used at purchase.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 text-left">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="w-full bg-accent-green hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors min-h-[44px] text-sm"
          >
            {status === "loading" ? "Checking…" : "Restore Access"}
          </button>
        </form>
      )}

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
        <Lock className="w-3 h-3" />
        Support access only
      </div>
    </motion.div>
  )
}

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-5 py-3 flex items-center gap-2">
        <Logo size={28} />
        <span className="font-semibold text-sm tracking-tight">PassPlus</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={null}>
          <SupportForm />
        </Suspense>
      </main>
    </div>
  )
}
