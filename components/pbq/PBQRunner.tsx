"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { Puzzle, ChevronRight } from "lucide-react"
import type { PBQQuestion } from "@/data/pbqQuestions"
import MatchingPBQ from "./MatchingPBQ"
import OrderingPBQ from "./OrderingPBQ"
import FillBlankPBQ, { isBlankCorrect } from "./FillBlankPBQ"

function shuffledAvoidingOriginal(steps: string[]): string[] {
  if (steps.length < 2) return [...steps]
  for (let attempt = 0; attempt < 10; attempt++) {
    const a = [...steps]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    if (a.some((s, i) => s !== steps[i])) return a
  }
  return [...steps].reverse()
}

export default function PBQRunner({
  pbq,
  index,
  count,
  shouldReduce,
  isLast,
  onComplete,
}: {
  pbq: PBQQuestion
  index: number
  count: number
  shouldReduce: boolean
  isLast: boolean
  onComplete: (result: { correct: number; total: number; domain: number }) => void
}) {
  const [submitted, setSubmitted] = useState(false)
  const [placements, setPlacements] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<string[]>(() =>
    pbq.type === "ordering" ? shuffledAvoidingOriginal(pbq.steps) : []
  )
  const [values, setValues] = useState<Record<number, string>>({})

  // Matching slots are shuffled inside MatchingPBQ; it reports placements
  // keyed by its own slot index, so scoring lives there via correctness of
  // each slot. To keep scoring in one place, MatchingPBQ stores the token
  // placed per pair index instead.
  const result = useMemo(() => {
    if (pbq.type === "matching") {
      const total = pbq.pairs.length
      let correct = 0
      for (const [pairIndex, token] of Object.entries(placements)) {
        if (pbq.pairs[Number(pairIndex)]?.prompt === token) correct++
      }
      return { correct, total, domain: pbq.domain }
    }
    if (pbq.type === "ordering") {
      const total = pbq.steps.length
      const correct = order.filter((s, i) => pbq.steps[i] === s).length
      return { correct, total, domain: pbq.domain }
    }
    const total = pbq.blanks.length
    const correct = pbq.blanks.filter((b, i) =>
      isBlankCorrect(values[i] ?? "", b.accepted)
    ).length
    return { correct, total, domain: pbq.domain }
  }, [pbq, placements, order, values])

  const allAttempted =
    pbq.type === "matching"
      ? Object.keys(placements).length === pbq.pairs.length
      : pbq.type === "fill-blank"
        ? pbq.blanks.every((_, i) => (values[i] ?? "").trim().length > 0)
        : true

  const pct = Math.round((result.correct / result.total) * 100)

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-accent-green mb-2">
          <Puzzle className="w-3.5 h-3.5" />
          Performance Based Question {index + 1} of {count}
        </div>
        <h2 className="text-lg sm:text-xl font-semibold mb-1">{pbq.title}</h2>
        <p className="text-sm text-muted-foreground">{pbq.instructions}</p>
      </div>

      {pbq.type === "matching" && (
        <MatchingPBQ
          pbq={pbq}
          submitted={submitted}
          placements={placements}
          onPlacementsChange={setPlacements}
          shouldReduce={shouldReduce}
        />
      )}
      {pbq.type === "ordering" && (
        <OrderingPBQ
          pbq={pbq}
          submitted={submitted}
          order={order}
          onOrderChange={setOrder}
        />
      )}
      {pbq.type === "fill-blank" && (
        <FillBlankPBQ
          pbq={pbq}
          submitted={submitted}
          values={values}
          onValuesChange={setValues}
        />
      )}

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAttempted}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-green text-black font-semibold text-sm hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Submit Answer
        </button>
      ) : (
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 bg-card border border-border rounded-xl p-4"
        >
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {result.correct} of {result.total} correct ({pct}%)
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Partial credit counts toward your score.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onComplete(result)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent-green text-black font-semibold text-sm hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {isLast ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
