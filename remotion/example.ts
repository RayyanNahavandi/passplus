import type { DailyQuestionProps } from "./DailyQuestion"

export const exampleQuestion: DailyQuestionProps = {
  question:
    "A SOC analyst receives an alert that a user account logged in from New York and Tokyo within 30 minutes. Which of the following BEST describes this alert?",
  answers: {
    A: "Brute force attack",
    B: "Impossible travel anomaly",
    C: "Man-in-the-middle attack",
    D: "Credential stuffing",
  },
  correct: "B",
  explanation:
    "Impossible travel anomaly is detected when a user logs in from two geographically distant locations within a timeframe that makes physical travel impossible. This is a UEBA detection pattern.",
  domain: "Domain 4: Security Operations",
}
