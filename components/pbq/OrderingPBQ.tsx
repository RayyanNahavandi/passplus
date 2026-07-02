"use client"

import { Reorder, useDragControls } from "motion/react"
import { CheckCircle, XCircle, GripVertical, ChevronUp, ChevronDown } from "lucide-react"
import type { OrderingPBQ as OrderingPBQData } from "@/data/pbqQuestions"

export default function OrderingPBQ({
  pbq,
  submitted,
  order,
  onOrderChange,
}: {
  pbq: OrderingPBQData
  submitted: boolean
  order: string[]
  onOrderChange: (next: string[]) => void
}) {
  function move(index: number, delta: number) {
    const target = index + delta
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    onOrderChange(next)
  }

  if (submitted) {
    return (
      <div className="space-y-2">
        {order.map((step, i) => {
          const correct = pbq.steps[i] === step
          return (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                correct
                  ? "border-accent-green/50 bg-accent-green/5"
                  : "border-red-500/50 bg-red-500/5"
              }`}
            >
              <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-card border border-border text-xs font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <span className="text-sm flex-1">{step}</span>
              {correct ? (
                <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-red-400 shrink-0">
                  <XCircle className="w-4 h-4" />
                  Step {pbq.steps.indexOf(step) + 1}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Reorder.Group axis="y" values={order} onReorder={onOrderChange} className="space-y-2">
      {order.map((step, i) => (
        <OrderingItem
          key={step}
          step={step}
          index={i}
          count={order.length}
          onMove={move}
        />
      ))}
    </Reorder.Group>
  )
}

function OrderingItem({
  step,
  index,
  count,
  onMove,
}: {
  step: string
  index: number
  count: number
  onMove: (index: number, delta: number) => void
}) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={step}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 select-none"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        onPointerDown={(e) => controls.start(e)}
        style={{ touchAction: "none" }}
        className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0 p-1 -m-1"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-background border border-border text-xs font-semibold text-muted-foreground">
        {index + 1}
      </span>
      <span className="text-sm flex-1">{step}</span>
      <div className="flex flex-col shrink-0">
        <button
          type="button"
          aria-label="Move up"
          disabled={index === 0}
          onClick={() => onMove(index, -1)}
          className="text-muted-foreground hover:text-foreground disabled:opacity-25 p-0.5"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Move down"
          disabled={index === count - 1}
          onClick={() => onMove(index, 1)}
          className="text-muted-foreground hover:text-foreground disabled:opacity-25 p-0.5"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </Reorder.Item>
  )
}
