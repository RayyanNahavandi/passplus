// Verifies a Supabase JWT, looks up the user's email in paid_users,
// and returns { paid: boolean }.  Called by AuthSync on every page load
// and by the login page after sign-in.
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization")
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null

  if (!token) {
    return NextResponse.json({ paid: false }, { status: 401 })
  }

  // Verify the JWT and get the user
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user?.email) {
    return NextResponse.json({ paid: false }, { status: 401 })
  }

  // Check paid_users table
  const { data } = await supabaseAdmin
    .from("paid_users")
    .select("email")
    .eq("email", user.email.toLowerCase())
    .maybeSingle()

  return NextResponse.json({ paid: !!data })
}
