import { Metadata } from "next"
import { securityPlusAcronyms } from "@/data/securityPlusAcronyms"
import { AcronymsClient } from "./AcronymsClient"

export const metadata: Metadata = {
  title: "Security+ Acronyms List (SY0-701) — Free Flashcards | PassPlus",
  description: `Study all ${securityPlusAcronyms.length} official CompTIA Security+ SY0-701 acronyms with free flashcards. Flip to reveal, mark what you know, and resurface the ones you miss. No signup.`,
  alternates: {
    canonical: "https://www.studypassplus.com/acronyms",
  },
  openGraph: {
    title: "Security+ Acronyms List (SY0-701) — Free Flashcards | PassPlus",
    description:
      "Every official CompTIA Security+ SY0-701 acronym as free flashcards. Flip, test yourself, and drill the ones you miss.",
    type: "website",
  },
}

export default function AcronymsPage() {
  return <AcronymsClient acronyms={securityPlusAcronyms} />
}
