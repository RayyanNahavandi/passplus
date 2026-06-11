import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Practice Quiz | PassPlus",
  description:
    "Free CompTIA practice quiz for Security+ SY0-701, Network+ N10-009, and A+ Core 1 & 2. Practice Mode and timed Exam Mode with instant feedback. No signup required.",
  alternates: {
    canonical: "https://www.studypassplus.com/quiz",
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
