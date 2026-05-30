// Simple in-memory rate limiter for Vercel serverless functions.
//
// ⚠ State is per function instance — not shared across Vercel instances.
// For production distributed rate limiting replace with Upstash Redis.
// This is sufficient protection against casual abuse and script-kiddie attacks.

interface Window {
  count: number
  resetAt: number
}

const store = new Map<string, Window>()

// Evict expired entries periodically to prevent memory growth.
// One cleanup per 5 minutes is plenty for low-traffic routes.
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60 * 1000) return
  lastCleanup = now
  for (const [key, win] of store) {
    if (now > win.resetAt) store.delete(key)
  }
}

/**
 * Check whether a key (typically an IP address) is within the rate limit.
 *
 * @param key       Identifier to rate-limit (e.g. request IP)
 * @param limit     Max requests allowed per window
 * @param windowMs  Window duration in milliseconds
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { allowed: boolean; remaining: number; resetAt: number } {
  maybeCleanup()
  const now = Date.now()
  const win = store.get(key)

  if (!win || now > win.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: limit - 1, resetAt }
  }

  win.count++
  if (win.count > limit) {
    return { allowed: false, remaining: 0, resetAt: win.resetAt }
  }

  return { allowed: true, remaining: limit - win.count, resetAt: win.resetAt }
}

/** Extract a best-effort IP from a Next.js request. */
export function getIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  )
}
