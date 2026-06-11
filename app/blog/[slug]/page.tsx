import { notFound } from "next/navigation"

// All posts live as static directories; this catch-all handles unknown slugs
export default function BlogPostFallback() {
  notFound()
}
