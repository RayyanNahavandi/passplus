// SERVER-ONLY — never import this in client components or lib/quiz-store.ts
// Uses the service-role key which bypasses RLS.
import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _admin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _admin
}

export const supabaseAdmin = {
  get auth() { return getSupabaseAdmin().auth },
  from: (table: string) => getSupabaseAdmin().from(table),
}
