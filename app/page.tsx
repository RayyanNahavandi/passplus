"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Zap, CheckCircle, Lock, ArrowRight, CalendarDays } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { Logo } from "@/components/Logo"
import { DiscordBanner } from "@/components/DiscordBanner"

export default function Home() {
  const shouldReduce = useReducedMotion()
  const [freeCompleted, setFreeCompleted] = useState(false)

  useEffect(() => {
    const completed = localStorage.getItem("passplus_completed") === "true"
    const unlocked = localStorage.getItem("passplus_unlocked") === "true"
    setFreeCompleted(completed && !unlocked)
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduce ? 0 : 0.5,
      ease: "easeOut" as const,
      delay: shouldReduce ? 0 : delay,
    },
  })

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <motion.div className="flex items-center gap-2" {...fadeUp(0)}>
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </motion.div>
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
          <Link
            href="/daily"
            onClick={() => sendGAEvent("event", "daily_nav_clicked")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green hover:text-accent-hover transition-colors min-h-[44px] px-1"
          >
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            Daily Question
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse shrink-0" />
          </Link>
          {!freeCompleted && (
            <Link
              href="/quiz"
              onClick={() => sendGAEvent("event", "quiz_started")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
            >
              Start Quiz →
            </Link>
          )}
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16 sm:py-24 gap-12">
        <div className="flex flex-col items-center gap-6 max-w-3xl w-full">
          <motion.p
            {...fadeUp(0)}
            className="text-sm text-accent-green font-medium tracking-wide"
          >
            The free Security+ quiz that doesn&apos;t suck
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Pass your{" "}
            <span className="text-accent-green">Security+</span>
            {" "}with confidence
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            245 real-style questions across three full practice exams covering
            every SY0-701 domain. Instant feedback, score tracking, and
            missed-question drills.
          </motion.p>

          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-col items-center gap-3 w-full sm:w-auto"
          >
            {freeCompleted ? (
              <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    You&apos;ve completed your free quiz
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Unlock full access to retake with all 245 questions and get
                    AI explanations for every answer
                  </p>
                </div>
                <a
                  href="https://buy.stripe.com/4gM7sKfJ459a9E85ny2Nq00"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent("event", "unlock_clicked")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  Unlock All 245 Questions — $9.99
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/support?token=SUPPORT2026"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[36px] flex items-center"
                >
                  Already paid? Click here to restore access
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/quiz"
                  onClick={() => sendGAEvent("event", "quiz_started")}
                  className="group flex items-center justify-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-10 py-4 rounded-xl transition-colors text-base w-full sm:w-auto min-h-[52px]"
                >
                  Start Free Quiz, No Signup Required
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="text-xs text-muted-foreground">
                  Join 50+ people studying for SY0-701
                </span>
              </>
            )}
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <Zap className="w-3 h-3 text-accent-green" />
            CompTIA SY0-701 · 245 questions · 3 practice exams
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {[
            { value: "245", label: "Practice Questions" },
            { value: "3", label: "Full Exams" },
            { value: "5", label: "SY0-701 Domains" },
            { value: "Free", label: "First 25 Questions" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-1 bg-card border border-border rounded-xl py-5 px-3"
            >
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="w-4 h-4 text-accent-green" />,
              title: "Instant Feedback",
              desc: "See the correct answer immediately after every question.",
            },
            {
              icon: <CheckCircle className="w-4 h-4 text-accent-green" />,
              title: "Practice Missed",
              desc: "Drill the questions you got wrong until they stick.",
            },
            {
              icon: <Lock className="w-4 h-4 text-accent-green" />,
              title: "Full Question Bank",
              desc: "Unlock all 245 questions across three exams for $9.99.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 p-5 bg-card border border-border rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!freeCompleted && (
        <section className="border-t border-border px-6 py-16 text-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto flex flex-col gap-5 items-center"
          >
            <h2 className="text-xl font-bold">Ready to start?</h2>
            <p className="text-sm text-muted-foreground">
              25 free questions, no account needed.
            </p>
            <Link
              href="/quiz"
              onClick={() => sendGAEvent("event", "quiz_started")}
              className="flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm min-h-[48px] w-full sm:w-auto justify-center"
            >
              Start Free Quiz, No Signup Required
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      )}

      {/* Discord */}
      <section className="border-t border-border px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <DiscordBanner />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
        <span>
          PassPlus — Not affiliated with CompTIA. Original practice questions based on CompTIA SY0-701 exam objectives.
        </span>
        <Link href="/blog" className="hover:text-muted-foreground transition-colors">
          Blog
        </Link>
      </footer>
    </main>
  )
}
