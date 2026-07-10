import { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Security+ vs Network+ - Which Should You Take First | PassPlus",
  description:
    "A practical comparison of CompTIA Security+ and Network+ to help you decide which certification to pursue first.",
  keywords:
    "security plus vs network plus, which comptia cert first, network+ before security+, comptia certification order",
  openGraph: {
    title: "Security+ vs Network+ - Which Should You Take First | PassPlus",
    description:
      "A practical comparison of CompTIA Security+ and Network+ to help you decide which certification to pursue first.",
    type: "article",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Should I take Network+ before Security+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your goal. If you want a career in cybersecurity, you can go straight to Security+ without Network+ first. CompTIA does not require Network+ as a prerequisite. However, if you lack networking fundamentals, studying for Network+ first will make Security+ significantly easier since Security+ assumes you understand TCP/IP, subnetting, firewalls, and network architecture.",
      },
    },
    {
      "@type": "Question",
      name: "Which is harder, Security+ or Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most candidates find Security+ harder than Network+. Security+ covers a broader range of topics at a higher level of abstraction, and its scenario-based questions require applying concepts rather than recalling facts. Network+ is more concrete and technical. That said, subnetting on Network+ trips up many candidates who find abstract security concepts easier.",
      },
    },
    {
      "@type": "Question",
      name: "Which pays more, Security+ or Network+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Security+ generally commands higher salaries than Network+. Security roles (SOC analyst, security engineer, information security analyst) typically pay more than network-focused roles (network technician, network administrator) at comparable experience levels. If maximizing compensation is the goal, Security+ is the stronger choice.",
      },
    },
    {
      "@type": "Question",
      name: "Does Network+ help with Security+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, significantly. Security+ covers network security topics including firewalls, VPNs, network segmentation, wireless security, and attack types that target network infrastructure. Candidates with solid Network+ knowledge find these sections of Security+ much more manageable. Roughly 20 to 25% of Security+ content is directly easier with Network+ background.",
      },
    },
    {
      "@type": "Question",
      name: "Can I skip Network+ and go straight to Security+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CompTIA recommends Network+ as background knowledge but does not require it. Many candidates pass Security+ without holding Network+, particularly those who have picked up networking knowledge through work experience or self-study. If you already understand how TCP/IP, routing, switching, and firewalls work, you do not need to take Network+ first.",
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
            Security+ vs Network+ - Which Should You Take First
          </h1>

          <div className="prose-styles">

            <h2>The Short Answer</h2>

            <p>
              If your goal is a career in cybersecurity, go straight to Security+.
              You do not need Network+ first, and skipping it saves you months and
              the cost of an additional exam.
            </p>

            <p>
              If your goal is a career in networking, start with Network+. And if you
              are new to IT with no hands-on experience and you find Security+ content
              hard to follow, Network+ first will make the path significantly smoother.
            </p>

            <h2>What Each Certification Actually Covers</h2>

            <p>
              <strong>Network+ (N10-009)</strong> is a networking fundamentals exam.
              It covers the OSI model, TCP/IP, subnetting, routing protocols, switching,
              wireless standards, cabling, and network troubleshooting. The focus is on
              how networks are built, configured, and maintained. The skills are
              concrete and technical.
            </p>

            <p>
              <strong>Security+ (SY0-701)</strong> is a cybersecurity fundamentals exam.
              It covers threats and vulnerabilities, cryptography, identity and access
              management, security architecture, incident response, and risk management.
              Security+ assumes you understand what a network is and how it works. The
              focus is on protecting systems and responding when things go wrong.
            </p>

            <p>
              The overlap between the two is meaningful. Network security topics -
              firewalls, VPNs, network segmentation, wireless security, and attack
              types that target network infrastructure - appear on Security+. If you
              have Network+ knowledge, those sections are much easier.
            </p>

            <h2>Which Is Harder?</h2>

            <p>
              Most candidates find Security+ harder. The reasons are:
            </p>

            <ul>
              <li>
                <strong>Breadth:</strong> Security+ covers more distinct topic areas
                than Network+. You need to understand cryptography, identity
                management, cloud security, application security, governance, and
                more - all at a level where you can apply the concepts in scenarios.
              </li>
              <li>
                <strong>Question format:</strong> Security+ leans heavily on
                scenario-based questions with two plausible answers. You are not
                just recalling definitions - you are deciding what a security analyst
                should do in a specific situation. This is harder to prepare for than
                factual recall.
              </li>
              <li>
                <strong>Abstraction:</strong> Network+ deals in concrete, measurable
                things: IP addresses, cable lengths, port numbers. Security+ deals in
                frameworks, policies, and judgment calls. That abstraction is harder
                for technical people who prefer concrete problems.
              </li>
            </ul>

            <p>
              That said, subnetting is the great equalizer on Network+. Candidates who
              struggle with math find Network+ harder than Security+. It is not a
              universal rule.
            </p>

            <h2>Which Has Better Career Outcomes?</h2>

            <p>
              Security+ opens more doors. It is DoD 8570 compliant, which means it
              is required or preferred for a wide range of government and defense
              contractor roles. It is also the entry-level credential most commonly
              listed in job postings for SOC analyst, security analyst, and junior
              security engineer roles.
            </p>

            <p>
              Network+ is valuable for roles in network administration and support,
              but those roles are more likely to care about your hands-on experience
              and vendor-specific skills (Cisco, Juniper) than your Network+
              certification alone. CompTIA Network+ is more of a foundation credential
              than a career differentiator in the networking field.
            </p>

            <p>
              If you are deciding purely based on career ROI, Security+ wins.
            </p>

            <h2>The Case for Network+ First</h2>

            <p>
              There are real situations where taking Network+ first makes sense:
            </p>

            <ul>
              <li>
                You are completely new to IT and find Security+ material confusing
                because networking concepts are opaque. Network+ will close that gap.
              </li>
              <li>
                You want to work in networking specifically, not security.
              </li>
              <li>
                You are building toward a full CompTIA certification stack (A+,
                Network+, Security+) and want to follow the recommended progression.
              </li>
              <li>
                Your employer is paying for both and you have time to do them
                sequentially.
              </li>
            </ul>

            <h2>The Case for Security+ First (or Only)</h2>

            <ul>
              <li>
                You already understand basic networking from your job or prior study.
              </li>
              <li>
                You want to move into cybersecurity as quickly as possible.
              </li>
              <li>
                You are studying for a DoD 8570 compliance requirement.
              </li>
              <li>
                You have limited time and budget and need to maximize return on a
                single certification.
              </li>
            </ul>

            <h2>Start with Practice Questions for Either Cert</h2>

            <p>
              The fastest way to figure out which exam is the right next step is to
              try practice questions for both and see where your gaps are.{" "}
              <Link href="/quiz">PassPlus</Link> covers both Security+ SY0-701 and
              Network+ N10-009 with free questions for each, no signup required. Ten
              minutes of practice questions will tell you more about your readiness
              than an hour of reading forum posts.
            </p>

            <p>
              Full access to all 1540 questions across Security+, Network+, and
              A+ is a one-time $9.99 unlock. No subscription.
            </p>
          </div>

          <div className="mt-12 bg-card border border-border rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Try both. See where you stand.</p>
              <p className="text-xs text-muted-foreground">
                Free questions for Security+ and Network+. No signup.
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
        PassPlus - Not affiliated with CompTIA. Original practice questions based on publicly available exam objectives.
      </footer>
    </div>
  )
}
