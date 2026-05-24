"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { unlock } from "@/lib/quiz-store"

interface AuthContextType {
  user: User | null
  /** true while the initial session is being loaded from localStorage */
  loading: boolean
  /** user_metadata.display_name, or email prefix as fallback */
  displayName: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  displayName: null,
  signOut: async () => {},
})

async function syncPaidStatus(accessToken: string) {
  try {
    const res = await fetch("/api/auth/check-paid", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) return
    const { paid } = (await res.json()) as { paid: boolean }
    if (paid) unlock()
  } catch {
    // Network error — silently skip
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load session persisted in localStorage by the Supabase client
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.access_token) syncPaidStatus(session.access_token)
      setLoading(false)
    })

    // Keep state fresh across tabs and after silent token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.access_token) syncPaidStatus(session.access_token)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
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
    <AuthContext.Provider value={{ user, loading, displayName, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
