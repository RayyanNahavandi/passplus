import { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "What Is the Passing Score for CompTIA Security+ SY0-701 | PassPlus",
  description:
    "Everything you need to know about the Security+ SY0-701 passing score, scoring scale, and what to expect on exam day.",
  keywords:
    "security plus passing score, SY0-701 passing score, comptia security+ score, security+ 750 score",
  openGraph: {
    title: "What Is the Passing Score for CompTIA Security+ SY0-701 | PassPlus",
    description:
      "Everything you need to know about the Security+ SY0-701 passing score, scoring scale, and what to expect on exam day.",
    type: "article",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the passing score for CompTIA Security+ SY0-701?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The passing score for CompTIA Security+ SY0-701 is 750 on a scale of 100 to 900. This means you need to score at least 750 out of 900 to pass. The score is not a simple percentage of questions correct - CompTIA uses a scaled scoring system that accounts for question difficulty.",
      },
    },
    {
      "@type": "Question",
      name: "How many questions can you miss on Security+ SY0-701?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because CompTIA uses scaled scoring, there is no exact number of questions you can miss. Harder questions are worth more points. As a rough guide, scoring around 750 on the 900-point scale typically corresponds to getting roughly 72 to 80% of questions correct, but this varies based on which questions appear in your specific exam version.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the Security+ SY0-701 exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Security+ SY0-701 exam allows 90 minutes to complete up to 90 questions. Questions include multiple choice, multiple select, and performance-based questions (PBQs). PBQs are scenario-based interactive tasks that typically take longer to complete than standard multiple choice questions.",
      },
    },
    {
      "@type": "Question",
      name: "What are performance-based questions on Security+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Performance-based questions (PBQs) are interactive scenario tasks on the Security+ exam. They might ask you to configure a firewall, match attack types to scenarios, arrange incident response steps in order, or analyze a network diagram and identify vulnerabilities. PBQs appear at the beginning of the exam and typically take 3 to 5 minutes each. Many test-takers skip them initially and return after completing the multiple choice section.",
      },
    },
    {
      "@type": "Question",
      name: "When do you get your Security+ exam results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You receive your Security+ exam score immediately after completing the exam at the testing center. The screen shows your scaled score and whether you passed or failed. If you passed, your official certificate is issued by CompTIA within a few days. If you failed, the score report shows a breakdown by domain so you know where to focus for a retake.",
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
          <ArrowLeft className="w-3 h-3" /> Blog
        </Link>

        <article>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <span>May 28, 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight mb-8">
            What Is the Passing Score for CompTIA Security+ SY0-701
          </h1>

          <div className="prose-styles">

            <h2>The Passing Score Is 750</h2>

            <p>
              The passing score for CompTIA Security+ SY0-701 is <strong>750 on a
              scale of 100 to 900</strong>. You need to reach 750 to pass. Anything
              below that is a fail regardless of how close you are.
            </p>

            <p>
              That number is published directly by CompTIA and does not change between
              exam versions. What does change is how your raw performance maps to
              the 900-point scale - because CompTIA uses scaled scoring, not a simple
              percentage.
            </p>

            <h2>What Scaled Scoring Means in Practice</h2>

            <p>
              CompTIA does not score Security+ by counting how many questions you got
              right and converting to a percentage. They use scaled scoring, which
              adjusts your result based on the difficulty of the specific questions in
              your exam version.
            </p>

            <p>
              The reason is fairness: different candidates get different question sets,
              and some sets include harder questions than others. Scaled scoring ensures
              that a candidate who gets a harder set of questions is not penalized
              relative to someone who gets an easier set.
            </p>

            <p>
              In practical terms, this means there is no fixed answer to "how many
              questions can I miss and still pass." A rough guide is that 750 out of
              900 corresponds to getting approximately 72 to 80% of questions correct,
              but this is an estimate. Your actual result depends on which questions
              appeared in your version.
            </p>

            <h2>Exam Format: What to Expect on Test Day</h2>

            <p>
              Security+ SY0-701 gives you <strong>90 minutes to answer up to
              90 questions</strong>. The question types are:
            </p>

            <ul>
              <li>
                <strong>Multiple choice (single answer):</strong> The majority of the
                exam. One correct answer from four options. The challenge is that two
                options are often plausible and you need to identify the best one for
                the specific scenario.
              </li>
              <li>
                <strong>Multiple select:</strong> Two or more correct answers from a
                longer list. These are explicitly labeled. Read carefully - selecting
                too few or too many answers scores zero for the question.
              </li>
              <li>
                <strong>Performance-based questions (PBQs):</strong> Interactive
                scenario tasks. You might drag and drop firewall rules into the
                correct order, match attack types to descriptions, configure a network
                diagram, or arrange incident response steps. PBQs are graded
                differently from multiple choice - partial credit is sometimes
                available.
              </li>
            </ul>

            <p>
              PBQs appear at the beginning of the exam and typically take 3 to 5
              minutes each. A common strategy is to flag them and skip to the multiple
              choice section first, then return to PBQs with whatever time is left.
              This avoids spending 15 minutes on a complex PBQ when that time could
              answer six or seven standard questions.
            </p>

            <h2>How Scores Are Reported</h2>

            <p>
              You see your score immediately when you finish the exam at the testing
              center. The screen shows your scaled score and a clear pass or fail
              result. You do not need to wait for an email or log in anywhere to find
              out - the result is right there when you click submit.
            </p>

            <p>
              If you pass, CompTIA issues your official certificate within a few days.
              You can access it through your CertMetrics account. The certification is
              valid for three years, after which you need to renew through continuing
              education units or pass a higher-level exam.
            </p>

            <p>
              If you fail, the score report includes a percentage breakdown by domain
              showing where you lost points. This is genuinely useful. A failing score
              of 720 with a breakdown showing you scored poorly in Security Operations
              and well everywhere else is actionable information. Use the domain
              breakdown to target your retake preparation.
            </p>

            <h2>What a Passing Score Actually Requires</h2>

            <p>
              CompTIA publishes domain weights for SY0-701. Knowing these weights tells
              you where getting questions right matters most:
            </p>

            <ul>
              <li>Security Operations: 28%</li>
              <li>Threats, Vulnerabilities, and Mitigations: 22%</li>
              <li>Security Program Management and Oversight: 20%</li>
              <li>Security Architecture: 18%</li>
              <li>General Security Concepts: 12%</li>
            </ul>

            <p>
              Security Operations alone represents more than one in four points on the
              exam. Performing well in that domain while underperforming elsewhere is
              a much better outcome than the reverse. If you are running short on study
              time before the exam, Security Operations is where additional hours have
              the highest return.
            </p>

            <h2>Retake Policy</h2>

            <p>
              If you fail on the first attempt, you can retake the exam after a
              14-day waiting period. If you fail a second time, the waiting period
              extends to 14 days again. After three failures, you must wait 6 months
              before attempting again.
            </p>

            <p>
              Each attempt requires paying the full exam fee. As of 2026, the voucher
              price for Security+ is approximately $392 USD from CompTIA directly,
              though discounted vouchers are often available through authorized
              retailers. Factor this cost into your preparation timeline: being
              thorougly prepared before sitting the exam is significantly cheaper
              than paying for a retake.
            </p>

            <h2>Simulate the Exam Before You Take It</h2>

            <p>
              The best way to calibrate your readiness is to practice under conditions
              that resemble the real exam: timed, no notes, full-length question sets.{" "}
              <Link href="/quiz">PassPlus</Link> Exam Mode gives you a 90-minute
              countdown with scenario-based questions drawn from all five SY0-701
              domains, matching the real exam format. Start with 25 free practice
              questions to see where your current gaps are.
            </p>

            <p>
              Full access to all 490 Security+ questions across Practice Mode and Exam
              Mode is a one-time $9.99 unlock. No subscription. Good luck on the exam.
            </p>
          </div>

          <div className="mt-12 bg-card border border-border rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Practice under real exam conditions.</p>
              <p className="text-xs text-muted-foreground">
                Timed Exam Mode included. 25 free questions, no signup.
              </p>
            </div>
            <Link
              href="/quiz"
              className="shrink-0 inline-flex items-center gap-2 bg-accent-green hover:bg-accent-hover text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Start Free Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>

      <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground/50">
        PassPlus - Not affiliated with CompTIA. Original practice questions based on publicly available SY0-701 exam objectives.
      </footer>
    </div>
  )
}
