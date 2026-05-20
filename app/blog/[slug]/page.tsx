import { notFound } from "next/navigation"
import { redirect } from "next/navigation"

// All posts live as static directories; this catch-all handles unknown slugs
export default function BlogPostFallback({
  params,
}: {
  params: { slug: string }
}) {
  notFound()
}
