import type { Metadata } from "next"
import Link from "next/link"
import { LifeBuoy, Lock, RefreshCw, AlertTriangle, Sparkles, CreditCard, Mail } from "lucide-react"
import { Logo } from "@/components/Logo"

export const metadata: Metadata = {
  title: "Help & Troubleshooting | PassPlus",
  description:
    "Fix common PassPlus issues: restore your unlock, recover lost progress, clear your cache safely, and get help from the community.",
}

const DISCORD_URL = "https://discord.gg/wYUMRNFWEM"
const SUPPORT_EMAIL = "studypassplus@gmail.com"

const guides = [
  {
    icon: Lock,
    title: "I paid but the site still shows locked questions",
    steps: [
      "Make sure you are on the same device and browser you used when you purchased.",
      "If you created an account, sign in with your purchase email. Your unlock is restored automatically after signing in.",
      "On the home page, use \"Already purchased? Restore access\" and enter the email you used at checkout.",
      "Still locked? Email us with your Stripe receipt and we will sort it out.",
    ],
  },
  {
    icon: RefreshCw,
    title: "My progress or streak disappeared",
    steps: [
      "Progress is saved in your browser, so it is per device and per browser. Switching from Chrome to Safari, or phone to laptop, starts fresh.",
      "Private/incognito windows do not save progress. Use a normal window while studying.",
      "Clearing your browser's site data also clears progress. See the cache section below before you clear anything.",
      "Your unlock (if you purchased) can always be restored by signing in. Question progress cannot be recovered once cleared.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Clearing your cache (read this first)",
    steps: [
      "A normal refresh is safe. A hard refresh (Cmd+Shift+R / Ctrl+Shift+R) is also safe and fixes most display glitches.",
      "\"Clear site data\" or \"Clear cookies and site data\" will erase your local progress, streak, and unlock flag. Only do this as a last resort.",
      "If you do clear site data and you purchased, sign in afterwards (or use Restore access with your purchase email) to get your unlock back.",
      "iPhone Safari sometimes clears site data on its own after a week of not visiting. Signing in protects your unlock from this.",
    ],
  },
  {
    icon: Sparkles,
    title: "Questions or AI explanations will not load",
    steps: [
      "Check your internet connection, then do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R).",
      "Ad blockers or strict privacy extensions can block requests. Try allowlisting studypassplus.com or a different browser.",
      "AI explanations are generated live, so they can take a couple of seconds. Free sessions include the first 5 explanations.",
      "If a specific question looks broken, tell us in Discord with the question text and we will fix it fast.",
    ],
  },
  {
    icon: CreditCard,
    title: "I was charged but something went wrong",
    steps: [
      "After paying, Stripe should send you back to a confirmation page that unlocks everything automatically.",
      "If that redirect failed, use \"Already purchased? Restore access\" on the home page with your checkout email.",
      "Email us with the receipt from Stripe and we will manually unlock your email, usually within a day.",
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
      </header>

      <main className="flex-1 px-6 py-16 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4 text-accent-green" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Help & Troubleshooting</h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-12">
          Quick fixes for the most common issues. If none of these solve it, the
          Discord community and email at the bottom will.
        </p>

        <div className="flex flex-col gap-4">
          {guides.map((guide) => (
            <section
              key={guide.title}
              className="bg-card border border-border rounded-2xl px-6 py-5"
            >
              <h2 className="flex items-center gap-2.5 font-semibold text-base mb-3">
                <guide.icon className="w-4 h-4 text-accent-green shrink-0" aria-hidden />
                {guide.title}
              </h2>
              <ol className="flex flex-col gap-2 list-decimal pl-5">
                {guide.steps.map((step) => (
                  <li key={step} className="text-sm text-muted-foreground leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-card border border-border rounded-2xl px-6 py-6 flex flex-col items-center text-center gap-4">
          <h2 className="font-semibold text-base">Still stuck?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            The fastest way to get help is the Discord community. For purchase
            issues, email works best so you can attach your receipt.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm text-white px-5 py-3 rounded-xl transition-opacity hover:opacity-90 min-h-[44px]"
              style={{ background: "#5865F2" }}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Ask in Discord
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold text-sm bg-muted border border-border text-foreground px-5 py-3 rounded-xl hover:bg-secondary transition-colors min-h-[44px]"
            >
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </main>

      <footer className="px-6 py-5 text-center text-xs text-muted-foreground/50">
        PassPlus - Not affiliated with CompTIA.
      </footer>
    </div>
  )
}
