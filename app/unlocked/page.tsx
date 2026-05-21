"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { CheckCircle, XCircle } from "lucide-react"
import { unlock } from "@/lib/quiz-store"

// Fallback token for manual unlocks and Safari ITP support.
// Keep this value private — share only with users who need manual access.
const UNLOCK_TOKEN = "PP_X9K2M7N4Q8"

type Status = "verifying" | "success" | "failed"

function UnlockedInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>("verifying")

  useEffect(() => {
    const token = searchParams.get("token")
    const sessionId = searchParams.get("session_id")

    // Token path: manual unlock for support cases / Safari ITP fallback
    if (token !== null) {
      if (token === UNLOCK_TOKEN) {
        unlock() // sets both localStorage and cookie
        setStatus("success")
        setTimeout(() => router.push("/quiz"), 2000)
      } else {
        router.replace("/")
      }
      return
    }

    // Stripe path: no session_id means someone navigated here directly
    if (!sessionId) {
      router.replace("/")
      return
    }

    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data: { valid: boolean }) => {
        if (data.valid) {
          unlock() // sets both localStorage and cookie
          setStatus("success")
          setTimeout(() => router.push("/quiz"), 2000)
        } else {
          setStatus("failed")
          setTimeout(() => router.replace("/"), 3000)
        }
      })
      .catch(() => {
        setStatus("failed")
        setTimeout(() => router.replace("/"), 3000)
      })
  }, [router, searchParams])

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center">
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-accent-green border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </div>
        <div>
          <h1 className="text-xl font-bold mb-1">Verifying payment…</h1>
          <p className="text-sm text-muted-foreground">Just a moment</p>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex flex-col items-center gap-4 text-center px-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold mb-1">Verification failed</h1>
          <p className="text-sm text-muted-foreground">Redirecting you home…</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col items-center gap-4 text-center px-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-accent-green" />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-1">Access unlocked!</h1>
        <p className="text-sm text-muted-foreground">Redirecting to your quiz…</p>
      </div>
      <motion.div className="w-48 h-px bg-border overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-accent-green"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function UnlockedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-accent-green border-t-transparent animate-spin" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1">Verifying payment…</h1>
              <p className="text-sm text-muted-foreground">Just a moment</p>
            </div>
          </div>
        }
      >
        <UnlockedInner />
      </Suspense>
    </div>
  )
}
