"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

interface ReadinessRingProps {
  pct: number
  /** Diameter in px. Default 120. */
  size?: number
}

function ringColor(pct: number): string {
  if (pct >= 85) return "#4ade80" // accent-green
  if (pct >= 70) return "#f59e0b" // amber-500
  return "#f87171"                // red-400
}

function ringLabel(pct: number): string {
  if (pct >= 85) return "Ready"
  if (pct >= 70) return "Getting There"
  return "Not Ready"
}

export function ReadinessRing({ pct, size = 120 }: ReadinessRingProps) {
  const shouldReduce = useReducedMotion()
  // Start with full offset (empty ring), animate to target after mount
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // One rAF delay so the browser paints the initial state before transitioning
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const strokeWidth = Math.round(size * 0.09)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const targetOffset = circumference * (1 - pct / 100)
  // Before mount (or reduced motion): show full ring immediately
  const dashOffset = !mounted || shouldReduce ? circumference * (1 - pct / 100) : targetOffset
  // Start invisible ring before mount so animation fires on first render
  const startOffset = shouldReduce ? targetOffset : circumference

  const color = ringColor(pct)
  const label = ringLabel(pct)
  const labelSize = Math.max(10, Math.round(size * 0.105))
  const pctSize = Math.round(size * 0.2)

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`Readiness score: ${pct}% — ${label}`}
          role="img"
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border"
          />
          {/* Progress — fills clockwise from top */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={mounted ? targetOffset : startOffset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{
              transition: shouldReduce
                ? "none"
                : "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>

        {/* Centered text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pointer-events-none">
          <span
            className="font-bold leading-none tabular-nums"
            style={{ fontSize: pctSize, color }}
          >
            {pct}%
          </span>
          <span
            className="text-muted-foreground text-center leading-tight font-medium"
            style={{ fontSize: labelSize }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
