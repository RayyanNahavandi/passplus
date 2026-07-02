"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, XCircle, GripVertical, X } from "lucide-react"
import type { MatchingPBQ as MatchingPBQData } from "@/data/pbqQuestions"

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchingPBQ({
  pbq,
  submitted,
  placements,
  onPlacementsChange,
  shouldReduce,
}: {
  pbq: MatchingPBQData
  submitted: boolean
  placements: Record<number, string>
  onPlacementsChange: (next: Record<number, string>) => void
  shouldReduce: boolean
}) {
  const tokens = useMemo(() => shuffled(pbq.pairs.map((p) => p.prompt)), [pbq.id])
  const slots = useMemo(
    () => shuffled(pbq.pairs.map((p, i) => ({ answer: p.answer, correctIndex: i }))),
    [pbq.id]
  )
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  const placedTokens = new Set(Object.values(placements))

  function placeToken(token: string, slotIndex: number) {
    const next: Record<number, string> = {}
    for (const [k, v] of Object.entries(placements)) {
      if (v !== token) next[Number(k)] = v
    }
    next[slotIndex] = token
    onPlacementsChange(next)
    setSelectedToken(null)
  }

  function clearSlot(slotIndex: number) {
    const next = { ...placements }
    delete next[slotIndex]
    onPlacementsChange(next)
  }

  function handleDragEnd(token: string, point: { x: number; y: number }) {
    const els = document.elementsFromPoint(
      point.x - window.scrollX,
      point.y - window.scrollY
    )
    for (const el of els) {
      const slotEl = (el as HTMLElement).closest?.("[data-pbq-slot]")
      if (slotEl) {
        placeToken(token, Number(slotEl.getAttribute("data-pbq-slot")))
        return
      }
    }
  }

  // Placements are keyed by pair index (slot.correctIndex), so scoring in
  // PBQRunner can compare directly against pbq.pairs.
  function isSlotCorrect(pairIndex: number): boolean {
    return placements[pairIndex] === pbq.pairs[pairIndex].prompt
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tokens.map((token) => {
          const placed = placedTokens.has(token)
          if (placed) {
            return (
              <span
                key={token}
                className="px-3 py-1.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground/40 select-none"
              >
                {token}
              </span>
            )
          }
          const selected = selectedToken === token
          return (
            <motion.button
              key={token}
              type="button"
              drag={!submitted}
              dragSnapToOrigin
              dragMomentum={false}
              whileDrag={shouldReduce ? undefined : { scale: 1.05, zIndex: 50 }}
              onDragEnd={(_, info) => handleDragEnd(token, info.point)}
              onClick={() => {
                if (submitted) return
                setSelectedToken(selected ? null : token)
              }}
              disabled={submitted}
              style={{ touchAction: "none" }}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-grab active:cursor-grabbing select-none transition-colors ${
                selected
                  ? "border-accent-green bg-accent-green/15 text-accent-green"
                  : "border-border bg-card text-foreground hover:border-accent-green/40"
              }`}
            >
              <GripVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {token}
            </motion.button>
          )
        })}
      </div>

      <div className="space-y-2">
        {slots.map((slot) => {
          const pairIndex = slot.correctIndex
          const placedToken = placements[pairIndex]
          const correct = submitted && isSlotCorrect(pairIndex)
          return (
            <div
              key={slot.answer}
              data-pbq-slot={pairIndex}
              onClick={() => {
                if (submitted) return
                if (selectedToken) placeToken(selectedToken, pairIndex)
              }}
              className={`flex flex-col sm:flex-row sm:items-center gap-2 rounded-xl border p-3 transition-colors ${
                submitted
                  ? correct
                    ? "border-accent-green/50 bg-accent-green/5"
                    : "border-red-500/50 bg-red-500/5"
                  : selectedToken
                    ? "border-accent-green/50 bg-accent-green/5 cursor-pointer"
                    : "border-border bg-card"
              }`}
            >
              <div
                className={`shrink-0 min-w-[130px] min-h-[38px] flex items-center rounded-lg border px-3 py-1.5 text-sm ${
                  placedToken
                    ? "border-accent-green/30 bg-accent-green/10 font-medium"
                    : "border-dashed border-border text-muted-foreground"
                }`}
              >
                {placedToken ? (
                  <span className="flex items-center gap-2">
                    {placedToken}
                    {!submitted && (
                      <button
                        type="button"
                        aria-label={`Remove ${placedToken}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          clearSlot(pairIndex)
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </span>
                ) : (
                  "Drop here"
                )}
              </div>
              <p className="text-sm text-muted-foreground flex-1">{slot.answer}</p>
              {submitted &&
                (correct ? (
                  <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-red-400 shrink-0">
                    <XCircle className="w-4 h-4" />
                    {pbq.pairs[pairIndex].prompt}
                  </span>
                ))}
            </div>
          )
        })}
      </div>

      {!submitted && selectedToken && (
        <p className="text-xs text-accent-green">
          Tap a description to place &quot;{selectedToken}&quot;
        </p>
      )}
    </div>
  )
}
