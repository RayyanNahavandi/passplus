import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/unlocked", "/support", "/reset-password", "/results"],
    },
    sitemap: "https://www.studypassplus.com/sitemap.xml",
  }
}
