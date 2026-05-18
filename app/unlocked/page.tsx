"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { CheckCircle } from "lucide-react"

export default function UnlockedPage() {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("passplus_unlocked", "true")
    const timer = setTimeout(() => router.push("/quiz"), 2000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
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
        <motion.div
          className="w-48 h-px bg-border overflow-hidden rounded-full"
        >
          <motion.div
            className="h-full bg-accent-green"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
