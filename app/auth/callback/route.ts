// Handles the email-confirmation redirect from Supabase.
// Supabase appends ?code=... to whatever Redirect URL you set in the dashboard.
// Set in Supabase → Authentication → URL Configuration:
//   Site URL:      https://studypassplus.com
//   Redirect URLs: https://studypassplus.com/auth/callback
import { createClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Always land back on the login page so the user can sign in
  // (session is now confirmed; they just need to log in once more)
  return NextResponse.redirect("https://studypassplus.com/login")
}
