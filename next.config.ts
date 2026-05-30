import type { NextConfig } from "next";

// Domains that the browser is allowed to connect to from client-side JS.
// Keep this list tight — add only what the app actually calls from the browser.
const CONNECT_SRC = [
  "'self'",
  "https://*.supabase.co",               // Supabase auth + DB
  "https://www.google-analytics.com",    // GA4 hits
  "https://www.googletagmanager.com",    // GTM
  "https://region1.google-analytics.com",
].join(" ")

// Scripts allowed to execute. 'unsafe-inline' is required by Next.js for
// its own bootstrapping scripts. Removing it would require per-request nonces
// via middleware — a larger refactor.
const SCRIPT_SRC = [
  "'self'",
  "'unsafe-inline'",
  "https://www.googletagmanager.com",
].join(" ")

const ContentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${SCRIPT_SRC}`,
  "style-src 'self' 'unsafe-inline'",    // Tailwind injects inline styles
  "img-src 'self' data: https:",          // allow remote images & data URIs
  "font-src 'self'",
  `connect-src ${CONNECT_SRC}`,
  "frame-src 'none'",                     // no iframes embedded in the app
  "frame-ancestors 'none'",               // prevents clickjacking
  "object-src 'none'",                    // block Flash / old plugin objects
  "base-uri 'self'",                      // prevents base-tag hijacking
  "form-action 'self'",                   // form submissions must stay on-site
  "upgrade-insecure-requests",            // force HTTPS for sub-resources
].join("; ")

const securityHeaders = [
  // Prevent browsers from guessing content types (MIME-sniffing attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Block clickjacking (legacy header — frame-ancestors CSP is the modern equivalent)
  { key: "X-Frame-Options", value: "DENY" },

  // Limit referrer information sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

  // Disable browser features the app doesn't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },

  // Content Security Policy
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
]

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Apply to every route
      source: "/(.*)",
      headers: [
        // Keep existing cache behaviour
        { key: "Cache-Control", value: "no-store, max-age=0" },
        ...securityHeaders,
      ],
    },
  ],
}

export default nextConfig
