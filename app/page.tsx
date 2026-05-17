"use client"

import Link from "next/link"
import { Shield, Lock, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight">PassPlus</span>
        </div>
        <Link
          href="/quiz"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Start Quiz →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium">
          <Zap className="w-3.5 h-3.5" />
          CompTIA SY0-701 Practice Exams
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
          Pass your{" "}
          <span className="text-blue-400">Security+</span>{" "}
          exam with confidence
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
          200+ real-style questions from all five SY0-701 domains. Instant feedback, progress tracking,
          and a practice-missed-questions mode to drill your weak spots.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/quiz"
            onClick={() => sendGAEvent("event", "quiz_started")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            Start Free — 25 Questions
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-sm text-muted-foreground">
            No sign-up required
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-6 text-sm">
          {[
            { value: "200+", label: "Practice Questions" },
            { value: "3", label: "Full Practice Exams" },
            { value: "5", label: "SY0-701 Domains" },
            { value: "Free", label: "First 25 Questions" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-5 h-5 text-yellow-400" />,
              title: "Instant Feedback",
              desc: "See the correct answer immediately. Learn from every wrong choice.",
            },
            {
              icon: <CheckCircle className="w-5 h-5 text-green-400" />,
              title: "Practice Missed Questions",
              desc: "After each session, drill the questions you got wrong until they stick.",
            },
            {
              icon: <Lock className="w-5 h-5 text-blue-400" />,
              title: "Full Question Bank",
              desc: "Unlock all 200+ questions from three complete practice exams for $9.99.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-semibold text-base">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-6 items-center">
          <h2 className="text-2xl font-bold">Ready to start studying?</h2>
          <p className="text-muted-foreground text-sm">
            25 free questions, no account needed. Upgrade to unlock all 200+ questions.
          </p>
          <Link
            href="/quiz"
            onClick={() => sendGAEvent("event", "quiz_started")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Start Free Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        PassPlus — Not affiliated with CompTIA. Questions adapted from Professor Messer SY0-701 practice materials.
      </footer>
    </main>
  )
}
