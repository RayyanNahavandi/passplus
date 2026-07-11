"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { unlock } from "@/lib/quiz-store"
import { PROGRESS_EVENT, pushProgress, syncProgress } from "@/lib/progress-sync"

interface AuthContextType {
  user: User | null
  /** true while the initial session is being loaded from localStorage */
  loading: boolean
  /**
   * true once the server has confirmed this user is a paid customer.
   * Set asynchronously after login/page-load via /api/auth/check-paid.
   * Use this (not just localStorage) as the reactive source of truth for paid status.
   */
  isPaid: boolean
  /** user_metadata.display_name, or email prefix as fallback */
  displayName: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isPaid: false,
  displayName: null,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPaid, setIsPaid] = useState(false)

  // Latest access token for the paid user, used by the progress-push listener.
  // Null until paid status is confirmed, so free users never hit /api/progress.
  const paidTokenRef = useRef<string | null>(null)
  const hasSyncedRef = useRef(false)

  // Moved inside the component so it can call setIsPaid.
  // Called on every page load and auth state change for logged-in users.
  // This makes Supabase the source of truth rather than localStorage alone.
  const syncPaidStatus = useCallback(async (accessToken: string) => {
    try {
      const res = await fetch("/api/auth/check-paid", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) {
        console.error("[auth] check-paid returned non-OK status:", res.status)
        return
      }
      const { paid } = (await res.json()) as { paid: boolean }
      if (paid) {
        unlock()          // persist to localStorage + cookie for sync reads
        setIsPaid(true)   // reactive signal for components
        console.log("[auth] paid status confirmed from Supabase")
        paidTokenRef.current = accessToken
        // Pull + merge + push cross-device progress once per app load.
        if (!hasSyncedRef.current) {
          hasSyncedRef.current = true
          syncProgress(accessToken)
        }
      }
    } catch (err) {
      console.error("[auth] check-paid request failed:", err)
    }
  }, [])

  useEffect(() => {
    // Load session persisted in localStorage by the Supabase client
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error("[auth] getSession error:", error.message, error)
      setUser(session?.user ?? null)
      if (session?.access_token) syncPaidStatus(session.access_token)
      setLoading(false)
    })

    // Keep state fresh across tabs and after silent token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.access_token) {
        syncPaidStatus(session.access_token)
      } else {
        // Signed out - clear paid state
        setIsPaid(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [syncPaidStatus])

  // Debounced push whenever durable progress changes (quiz-store dispatches
  // PROGRESS_EVENT). Only fires for confirmed paid users.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const onProgress = () => {
      const token = paidTokenRef.current
      if (!token) return
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => pushProgress(token), 5_000)
    }
    window.addEventListener(PROGRESS_EVENT, onProgress)
    return () => {
      window.removeEventListener(PROGRESS_EVENT, onProgress)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("[auth] signOut error:", error.message, error)
    setIsPaid(false)
    paidTokenRef.current = null
    hasSyncedRef.current = false
    if (typeof window !== "undefined") {
      localStorage.removeItem("passplus_unlocked")
      document.cookie =
        "passplus_unlocked=; path=/; max-age=0; SameSite=Strict; Secure"
    }
  }, [])

  const displayName: string | null =
    (user?.user_metadata?.display_name as string | undefined) ??
    (user?.email ? user.email.split("@")[0] : null)

  return (
    <AuthContext.Provider value={{ user, loading, isPaid, displayName, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
