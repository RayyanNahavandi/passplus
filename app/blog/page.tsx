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
        <div className="flex items-center gap-2 mb-10">
          <BookOpen className="w-5 h-5 text-accent-green" />
          <h1 className="text-2xl font-bold">Blog</h1>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 bg-card border border-border hover:border-accent-green/40 rounded-2xl px-6 py-5 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-semibold text-base leading-snug group-hover:text-accent-green transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.description}
              </p>
              <span className="text-xs text-accent-green flex items-center gap-1 mt-1">
                Read more <ArrowRight className="w-3 h-3" />
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
