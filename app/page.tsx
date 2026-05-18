"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Shield, Zap, CheckCircle, Lock, ArrowRight } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"

export default function Home() {
  const shouldReduce = useReducedMotion()

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
          <Shield className="w-4 h-4 text-accent-green" />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </motion.div>
        <motion.div {...fadeUp(0.05)}>
          <Link
            href="/quiz"
            onClick={() => sendGAEvent("event", "quiz_started")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Start Quiz →
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-24 gap-12">
        <div className="flex flex-col items-center gap-6 max-w-3xl w-full">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            <Zap className="w-3 h-3 text-accent-green" />
            CompTIA SY0-701 Practice Exams
          </motion.div>

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
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/quiz"
              onClick={() => sendGAEvent("event", "quiz_started")}
              className="group flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm min-h-[44px]"
            >
              Start Free — 25 Questions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-xs text-muted-foreground">
              No sign-up required
            </span>
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
            className="flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-8 py-3 rounded-xl transition-colors text-sm min-h-[44px]"
          >
            Start Free Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/50">
        <span>
          PassPlus — Not affiliated with CompTIA. Questions adapted from
          Professor Messer SY0-701 practice materials.
        </span>
        <a
          href="https://discord.gg/pDRSfvr7D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          Join the community → discord.gg/pDRSfvr7D
        </a>
      </footer>
    </main>
  )
}
