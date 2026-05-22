import { createClient as _createClient, SupabaseClient } from "@supabase/supabase-js"

// Lazy singleton — not created until first use, so build-time env-var
// absence doesn't throw during static analysis.
let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = _createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _client
}

// Convenience re-export for components that prefer a direct import
export const supabase = {
  get auth() { return getSupabase().auth },
}

// Named export so the auth callback route can follow the standard pattern:
// import { createClient } from "@/lib/supabase"
export function createClient() {
  return getSupabase()
}
