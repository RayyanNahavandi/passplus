"use client"

import { CheckCircle, XCircle } from "lucide-react"
import type { FillBlankPBQ as FillBlankPBQData } from "@/data/pbqQuestions"

export function normalizeBlank(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

export function isBlankCorrect(
  value: string,
  accepted: string[]
): boolean {
  const v = normalizeBlank(value)
  return accepted.some((a) => normalizeBlank(a) === v)
}

export default function FillBlankPBQ({
  pbq,
  submitted,
  values,
  onValuesChange,
}: {
  pbq: FillBlankPBQData
  submitted: boolean
  values: Record<number, string>
  onValuesChange: (next: Record<number, string>) => void
}) {
  return (
    <div className="space-y-4">
      {pbq.intro && (
        <p className="text-sm text-muted-foreground bg-card border border-border rounded-xl p-4">
          {pbq.intro}
        </p>
      )}
      <div className="space-y-3">
        {pbq.blanks.map((blank, i) => {
          const value = values[i] ?? ""
          const correct = submitted && isBlankCorrect(value, blank.accepted)
          const wrong = submitted && !correct
          return (
            <div key={blank.label} className="space-y-1">
              <label
                htmlFor={`pbq-blank-${i}`}
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {blank.label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`pbq-blank-${i}`}
                  type="text"
                  value={value}
                  disabled={submitted}
                  placeholder={blank.placeholder}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onChange={(e) => onValuesChange({ ...values, [i]: e.target.value })}
                  className={`w-full max-w-xs bg-card border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/50 disabled:opacity-70 ${
                    submitted
                      ? correct
                        ? "border-accent-green/50"
                        : "border-red-500/50"
                      : "border-border"
                  }`}
                />
                {correct && <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />}
                {wrong && (
                  <span className="flex items-center gap-1.5 text-xs text-red-400 shrink-0">
                    <XCircle className="w-4 h-4" />
                    {blank.accepted[0]}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
