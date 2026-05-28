"use client"

// Runs on every page load. If the user is signed into Supabase and their
// email is in paid_users, it calls unlock() to keep localStorage in sync.
// This means paying users who log in on a new device are unlocked immediately
// without needing to go through Stripe again.
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { unlock } from "@/lib/quiz-store"

export function AuthSync() {
  useEffect(() => {
    async function sync() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      try {
        const res = await fetch("/api/auth/check-paid", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) return
        const { paid } = await res.json() as { paid: boolean }
        if (paid) unlock()
      } catch {
        // Network error - silently skip; localStorage state is unchanged
      }
    }

    sync()
  }, [])

  return null
}
