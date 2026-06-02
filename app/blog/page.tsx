import { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | PassPlus: Security+ Study Resources",
  description:
    "Security+ study guides, exam tips, and practice resources for CompTIA SY0-701 candidates.",
}

const posts = [
  {
    slug: "free-a-plus-core-1-practice-questions",
    title: "Free A+ Core 1 220-1101 Practice Questions. No Signup Required.",
    description:
      "245 free A+ Core 1 220-1101 practice questions covering mobile devices, networking, hardware, virtualization, and troubleshooting.",
    date: "May 29, 2026",
    readTime: "6 min read",
  },
  {
    slug: "free-a-plus-core-2-practice-questions",
    title: "Free A+ Core 2 220-1102 Practice Questions. No Signup Required.",
    description:
      "245 free A+ Core 2 220-1102 practice questions covering operating systems, security, software troubleshooting, and operational procedures.",
    date: "May 29, 2026",
    readTime: "6 min read",
  },
  {
    slug: "how-long-to-study-for-a-plus",
    title: "How Long Does It Take to Study for CompTIA A+",
    description:
      "A realistic study timeline for CompTIA A+ Core 1 and Core 2 based on your experience level and available study time.",
    date: "May 29, 2026",
    readTime: "6 min read",
  },
  {
    slug: "a-plus-vs-network-plus-which-first",
    title: "CompTIA A+ vs Network+ - Which Should You Take First",
    description:
      "A practical comparison to help you decide whether to take CompTIA A+ or Network+ first based on your goals and background.",
    date: "May 29, 2026",
    readTime: "5 min read",
  },
  {
    slug: "hardest-domains-on-a-plus-core-1",
    title: "The Hardest Domains on CompTIA A+ Core 1 and How to Study Them",
    description:
      "A breakdown of the most difficult A+ Core 1 220-1101 domains and targeted study strategies for each one.",
    date: "May 29, 2026",
    readTime: "7 min read",
  },
  {
    slug: "comptia-security-plus-passing-score",
    title: "What Is the Passing Score for CompTIA Security+ SY0-701",
    description:
      "The passing score is 750 out of 900. Here is what scaled scoring means, how PBQs are graded, and what to expect when you finish the exam.",
    date: "May 28, 2026",
    readTime: "5 min read",
  },
  {
    slug: "hardest-domains-on-security-plus-sy0-701",
    title: "The Hardest Domains on Security+ SY0-701 and How to Study Them",
    description:
      "Security Operations is 28% of the exam and the most commonly failed domain. Here is a targeted strategy for every domain.",
    date: "May 28, 2026",
    readTime: "7 min read",
  },
  {
    slug: "security-plus-vs-network-plus-which-first",
    title: "Security+ vs Network+ - Which Should You Take First",
    description:
      "You do not need Network+ before Security+. But there are real cases where taking it first makes sense. Here is how to decide.",
    date: "May 28, 2026",
    readTime: "5 min read",
  },
  {
    slug: "how-long-to-study-for-security-plus-sy0-701",
    title: "How Long Does It Take to Study for Security+ SY0-701",
    description:
      "A realistic breakdown by experience level: from no IT background (10 to 12 weeks) to security practitioner (2 to 4 weeks).",
    date: "May 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "how-long-to-study-for-network-plus-n10-009",
    title: "How Long Does It Take to Study for Network+ N10-009",
    description:
      "The honest timeline for N10-009 study, why subnetting breaks most schedules, and a week-by-week plan that actually works.",
    date: "May 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "free-network-plus-n10-009-practice-questions",
    title: "Free Network+ N10-009 Practice Questions. No Signup Required.",
    description:
      "Why subnetting trips up most candidates, which N10-009 domains to prioritize, and why Examtopics will get you failed.",
    date: "May 27, 2026",
    readTime: "5 min read",
  },
  {
    slug: "free-security-plus-sy0-701-practice-questions",
    title: "Free Security+ SY0-701 Practice Questions - No Signup Required",
    description:
      "Why practice questions beat every other study method, which exam domains to prioritize, and why Examtopics answers will get you failed.",
    date: "May 19, 2026",
    readTime: "5 min read",
  },
]

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={28} />
          <span className="font-semibold text-sm tracking-tight">PassPlus</span>
        </Link>
      </header>

      <main className="flex-1 px-6 py-16 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-9 h-9 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-accent-green" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 bg-card border border-border hover:border-accent-green/40 rounded-2xl px-6 py-5 transition-all hover:shadow-[0_0_20px_-6px_rgba(16,185,129,0.12)] cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-semibold text-base leading-snug group-hover:text-accent-green transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {post.description}
              </p>
              <span className="text-xs text-accent-green flex items-center gap-1.5 font-medium">
                Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground/50">
        PassPlus - Not affiliated with CompTIA. Questions adapted from Professor Messer SY0-701 practice materials.
      </footer>
    </div>
  )
}
