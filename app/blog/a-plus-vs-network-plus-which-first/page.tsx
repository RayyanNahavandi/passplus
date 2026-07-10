import { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/Logo"

export const metadata: Metadata = {
  title: "CompTIA A+ vs Network+ - Which Should You Take First | PassPlus",
  description:
    "A practical comparison to help you decide whether to take CompTIA A+ or Network+ first based on your goals and background.",
  keywords:
    "a+ vs network+, comptia a+ or network+ first, which comptia cert first, a plus before network plus",
  openGraph: {
    title: "CompTIA A+ vs Network+ - Which Should You Take First | PassPlus",
    description:
      "A practical comparison to help you decide whether to take CompTIA A+ or Network+ first based on your goals and background.",
    type: "article",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Should I take A+ before Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most people new to IT, yes. A+ is the broadest entry-level certification and builds the hardware, operating system, and basic networking foundation that makes Network+ easier. CompTIA itself recommends A+ first in its core certification progression of A+, Network+, then Security+.",
      },
    },
    {
      "@type": "Question",
      name: "Which is harder, A+ or Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are hard in different ways. A+ is a breadth exam with two parts and an enormous range of topics to memorize. Network+ goes deeper on a narrower set of networking concepts, and its subnetting questions trip up many candidates. People who dislike math often find Network+ harder, while people who dislike memorization often find A+ harder.",
      },
    },
    {
      "@type": "Question",
      name: "Can I skip A+ and go straight to Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CompTIA does not require A+ as a prerequisite for Network+. If you already understand computer hardware and operating systems, or you specifically want a networking career, you can start with Network+. A+ is recommended background, not a requirement.",
      },
    },
    {
      "@type": "Question",
      name: "Does A+ help with Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A+ Core 1 includes a networking domain covering ports, protocols, and basic configuration, which gives you a running start on Network+. The overlap is meaningful, so candidates who pass A+ first usually find the early Network+ material familiar.",
      },
    },
    {
      "@type": "Question",
      name: "Which certification leads to a better job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A+ is the standard credential for help desk and desktop support roles, which are the most common entry points into IT. Network+ targets network technician and administrator roles that usually pay more but expect networking focus. If you want to start working quickly, A+ opens the most doors. If you know you want networking, Network+ aligns better with that path.",
      },
    },
  ],
}

export default function BlogPost() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="border-b border-border px-6 py-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
      </header>

      <main className="flex-1 px-6 py-14 max-w-2xl mx-auto w-full">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          Blog
        </Link>

        <article>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <span>May 29, 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight mb-8">
            CompTIA A+ vs Network+ - Which Should You Take First
          </h1>

          <div className="prose-styles">

            <h2>The Short Answer</h2>

            <p>
              If you are new to IT, start with A+. It is the broadest entry-level
              certification and builds the foundation that makes everything after it
              easier, including Network+. CompTIA designed its core progression in this
              order for a reason: A+, then Network+, then Security+.
            </p>

            <p>
              If you already understand computer hardware and operating systems, or you
              know you want a networking-focused career specifically, you can skip ahead
              and start with Network+. A+ is recommended background, not a hard
              requirement.
            </p>

            <h2>What Each Certification Actually Covers</h2>

            <p>
              <strong>A+ (220-1101 and 220-1102)</strong> is a two-exam, entry-level
              certification covering the full breadth of an IT support role. Core 1
              handles hardware, mobile devices, networking basics, virtualization, and
              troubleshooting. Core 2 handles operating systems, security, software
              troubleshooting, and operational procedures. The focus is wide and
              practical: the everyday problems a support technician solves.
            </p>

            <p>
              <strong>Network+ (N10-009)</strong> is a single-exam networking
              fundamentals certification. It covers the OSI model, IP addressing,
              subnetting, routing and switching, wireless, cabling, network security, and
              troubleshooting. The focus is narrower than A+ but deeper, centered on how
              networks are built, configured, and maintained.
            </p>

            <p>
              The overlap is meaningful. A+ Core 1 includes a 20% networking domain that
              introduces ports, protocols, and basic configuration. If you take A+ first,
              the opening sections of Network+ will feel familiar rather than foreign.
            </p>

            <h2>Which Is Harder?</h2>

            <p>
              They are difficult in different ways, and which one feels harder depends on
              your strengths.
            </p>

            <ul>
              <li>
                <strong>A+ is a breadth challenge.</strong> Two exams, hundreds of
                discrete facts, and a wide range of topics. People who struggle with rote
                memorization often find A+ harder simply because of the sheer volume.
              </li>
              <li>
                <strong>Network+ is a depth challenge.</strong> Fewer topics, but each one
                goes deeper. Subnetting is the classic stumbling block, and many
                candidates who fail Network+ on the first try report running out of time
                on subnet calculations. People who dislike math tend to find Network+
                harder.
              </li>
              <li>
                <strong>Question style differs.</strong> A+ leans on recognition and
                practical scenarios. Network+ leans on applying concepts and working
                through calculations under time pressure.
              </li>
            </ul>

            <p>
              If you are comfortable with numbers but hate memorizing, Network+ may
              actually feel easier than A+. For most newcomers, though, the breadth of A+
              is more approachable as a first step.
            </p>

            <h2>Which Has Better Career Outcomes?</h2>

            <p>
              A+ is the most common entry point into IT. It is the credential employers
              look for on help desk, desktop support, and field technician job postings,
              which are the roles most people use to break into the industry. If your goal
              is to get hired quickly, A+ opens the widest set of doors.
            </p>

            <p>
              Network+ targets network technician and network administrator roles. These
              generally pay more than help desk positions, but they also expect a
              networking focus and often some hands-on experience. Network+ is a stronger
              signal if you already know you want to specialize in networking rather than
              general support.
            </p>

            <p>
              For long-term growth, many people earn both. A+ gets you in the door,
              Network+ moves you toward infrastructure work, and Security+ opens
              cybersecurity roles after that.
            </p>

            <h2>The Case for A+ First</h2>

            <ul>
              <li>You are new to IT and want the broadest possible foundation.</li>
              <li>You are targeting help desk or desktop support as your first job.</li>
              <li>
                You want the networking basics from A+ Core 1 to make Network+ smoother
                later.
              </li>
              <li>You are following the standard CompTIA core progression.</li>
            </ul>

            <h2>The Case for Network+ First</h2>

            <ul>
              <li>You already understand hardware and operating systems well.</li>
              <li>You want a networking-focused career specifically.</li>
              <li>
                You are comfortable with subnetting math and prefer depth over breadth.
              </li>
              <li>
                Your target job postings list Network+ rather than A+ as the requirement.
              </li>
            </ul>

            <h2>Try Practice Questions for Both</h2>

            <p>
              The fastest way to decide is to try questions from each exam and see where
              you stand.{" "}
              <Link href="/quiz">PassPlus</Link> covers both A+ Core 1 and Core 2 and
              Network+ N10-009 with free questions for each, no signup required. Ten
              minutes of practice will tell you more about which exam fits your strengths
              than any comparison article.
            </p>

            <p>
              Full access to all 1540 questions across A+, Network+, and Security+ is a
              one-time $9.99 unlock. No subscription.
            </p>
          </div>

          <div className="mt-12 bg-card border border-border rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Try both. See where you stand.</p>
              <p className="text-xs text-muted-foreground">
                25 free questions, no signup, instant feedback.
              </p>
            </div>
            <Link
              href="/quiz?cert=aplus"
              className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Start Free Quiz
            </Link>
          </div>
        </article>
      </main>

      <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground/50">
        PassPlus - Not affiliated with CompTIA. Original practice questions based on publicly available exam objectives.
      </footer>
    </div>
  )
}
