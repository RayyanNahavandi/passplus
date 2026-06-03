import * as React from "react"
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Audio } from "remotion"

export interface DailyQuestionProps {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
  audioSrc?: string
}

// ── constants ──────────────────────────────────────────────────────────────
const GREEN = "#22c55e"
const BG = "#000000"
const CARD_BG = "#111111"
const CARD_BORDER = "#2a2a2a"
const MUTED = "#9ca3af"
const WHITE = "#ffffff"
const RED_BG = "#1c0a0a"
const RED_BORDER = "#7f1d1d"

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

// ease-out cubic
const easeOut = Easing.out(Easing.cubic)

function eased(frame: number, start: number, end: number, outputRange: [number, number]) {
  return interpolate(frame, [start, end], outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  })
}

// ── PassPlus "PP" logo mark ────────────────────────────────────────────────
function PPLogo({ size = 96 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: GREEN,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: size * 0.44,
          color: BG,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        PP
      </span>
    </div>
  )
}

// ── Answer card ────────────────────────────────────────────────────────────
function AnswerCard({
  letter,
  text,
  state, // "default" | "correct" | "wrong"
  opacity,
}: {
  letter: string
  text: string
  state: "default" | "correct" | "wrong"
  opacity: number
}) {
  const bgColor =
    state === "correct" ? "#052e16" : state === "wrong" ? RED_BG : CARD_BG
  const borderColor =
    state === "correct" ? GREEN : state === "wrong" ? RED_BORDER : CARD_BORDER
  const badgeBg =
    state === "correct" ? GREEN : state === "wrong" ? "#7f1d1d" : "#1e1e1e"
  const badgeColor =
    state === "correct" ? BG : state === "wrong" ? "#fca5a5" : GREEN
  const textColor =
    state === "correct" ? "#bbf7d0" : state === "wrong" ? "#fca5a5" : WHITE

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 24,
        padding: "30px 36px",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s",
      }}
    >
      {/* Letter badge */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 26,
            color: badgeColor,
          }}
        >
          {letter}
        </span>
      </div>
      {/* Answer text */}
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 500,
          fontSize: 32,
          color: textColor,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  )
}

// ── Main composition ───────────────────────────────────────────────────────
export function DailyQuestion({
  question,
  answers,
  correct,
  explanation,
  domain,
  audioSrc,
}: DailyQuestionProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // ── Scene 1: intro (frames 0-90) ────────────────────────────────────────
  const logoScale = eased(frame, 0, 30, [0.6, 1])
  const logoOpacity = eased(frame, 0, 25, [0, 1])
  const taglineOpacity = eased(frame, 30, 55, [0, 1])
  const taglineY = eased(frame, 30, 55, [20, 0])

  // scene 1 exits at frame 75
  const scene1Opacity = frame < 75 ? 1 : eased(frame, 75, 90, [1, 0])

  // ── Scene 2: question + answers (frames 90-600) ─────────────────────────
  const s2Start = 90
  const scene2Opacity = eased(frame, s2Start, s2Start + 15, [0, 1])

  const domainOpacity = eased(frame, s2Start, s2Start + 20, [0, 1])

  const questionOpacity = eased(frame, s2Start + 15, s2Start + 45, [0, 1])
  const questionY = eased(frame, s2Start + 15, s2Start + 45, [40, 0])

  // Answers stagger in, 6 frames (~200ms at 30fps) apart
  const answerDelay = 6
  const answerStart = s2Start + 55
  const answerOpacities = (["A", "B", "C", "D"] as const).map((_, i) =>
    eased(frame, answerStart + i * answerDelay, answerStart + i * answerDelay + 18, [0, 1])
  )

  // scene 2 fades out between frames 580-600
  const scene2ExitOpacity =
    frame < 580 ? 1 : eased(frame, 580, 600, [1, 0])

  // ── Scene 3: reveal (frames 600-840) ────────────────────────────────────
  const s3Start = 600
  const scene3Opacity = eased(frame, s3Start, s3Start + 15, [0, 1])

  const answerLabelOpacity = eased(frame, s3Start + 10, s3Start + 30, [0, 1])
  const answerLabelScale = eased(frame, s3Start + 10, s3Start + 30, [0.85, 1])

  const explanationOpacity = eased(frame, s3Start + 40, s3Start + 70, [0, 1])
  const explanationY = eased(frame, s3Start + 40, s3Start + 70, [24, 0])

  // correct card pulses green: quick brightness flash over first 20 frames of scene 3
  const correctFlash = eased(frame, s3Start, s3Start + 20, [0, 1])
  // wrong cards settle to red
  const wrongSettle = eased(frame, s3Start, s3Start + 25, [0, 1])

  const scene3ExitOpacity =
    frame < 825 ? 1 : eased(frame, 825, 840, [1, 0])

  // ── Scene 4: outro (frames 840-900) ─────────────────────────────────────
  const s4Start = 840
  const scene4Opacity = eased(frame, s4Start, s4Start + 20, [0, 1])
  const urlY = eased(frame, s4Start, s4Start + 25, [30, 0])

  // ── helpers ──────────────────────────────────────────────────────────────
  const letters = ["A", "B", "C", "D"] as const

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: BG,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* Voiceover audio - plays from frame 0 if audioSrc is provided */}
      {audioSrc && <Audio src={audioSrc} startFrom={0} />}

      {/* ── SCENE 1: Intro ─────────────────────────────────────────────── */}
      {frame < 90 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            opacity: scene1Opacity,
          }}
        >
          {/* Logo */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          >
            <PPLogo size={140} />
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 52,
                color: GREEN,
                letterSpacing: "-0.02em",
              }}
            >
              PassPlus
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: 34,
                color: MUTED,
                letterSpacing: "0.01em",
              }}
            >
              Daily Security+ Question
            </span>
          </div>
        </div>
      )}

      {/* ── SCENE 2: Question + Answers ────────────────────────────────── */}
      {frame >= s2Start && frame < 600 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "100px 72px",
            gap: 0,
            opacity: Math.min(scene2Opacity, scene2ExitOpacity),
          }}
        >
          {/* Domain pill */}
          <div
            style={{
              opacity: domainOpacity,
              display: "inline-flex",
              alignSelf: "flex-start",
              background: "rgba(34,197,94,0.12)",
              border: "1.5px solid rgba(34,197,94,0.3)",
              borderRadius: 100,
              padding: "10px 28px",
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: 26,
                color: GREEN,
                letterSpacing: "0.01em",
              }}
            >
              {domain}
            </span>
          </div>

          {/* Question */}
          <div
            style={{
              opacity: questionOpacity,
              transform: `translateY(${questionY}px)`,
              marginBottom: 64,
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: 46,
                color: WHITE,
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              {question}
            </p>
          </div>

          {/* Answer cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {letters.map((letter, i) => (
              <div
                key={letter}
                style={{
                  opacity: answerOpacities[i],
                  transform: `translateY(${eased(
                    frame,
                    answerStart + i * answerDelay,
                    answerStart + i * answerDelay + 18,
                    [20, 0]
                  )}px)`,
                }}
              >
                <AnswerCard
                  letter={letter}
                  text={answers[letter]}
                  state="default"
                  opacity={1}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SCENE 3: Reveal ────────────────────────────────────────────── */}
      {frame >= s3Start && frame < 840 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "100px 72px",
            gap: 0,
            opacity: Math.min(scene3Opacity, scene3ExitOpacity),
          }}
        >
          {/* Domain pill */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              background: "rgba(34,197,94,0.12)",
              border: "1.5px solid rgba(34,197,94,0.3)",
              borderRadius: 100,
              padding: "10px 28px",
              marginBottom: 48,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 26, color: GREEN }}>
              {domain}
            </span>
          </div>

          {/* "Answer: X" label */}
          <div
            style={{
              opacity: answerLabelOpacity,
              transform: `scale(${answerLabelScale})`,
              transformOrigin: "left center",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 52,
                color: GREEN,
                letterSpacing: "-0.01em",
              }}
            >
              Answer: {correct}
            </span>
          </div>

          {/* Answer cards with correct/wrong states */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
            {letters.map((letter) => {
              const isCorrect = letter === correct
              const state: "correct" | "wrong" | "default" = isCorrect
                ? "correct"
                : "wrong"
              const opacity = isCorrect
                ? interpolate(correctFlash, [0, 1], [0.7, 1], { extrapolateRight: "clamp" })
                : interpolate(wrongSettle, [0, 1], [1, 0.4], { extrapolateRight: "clamp" })
              return (
                <AnswerCard
                  key={letter}
                  letter={letter}
                  text={answers[letter]}
                  state={state}
                  opacity={opacity}
                />
              )
            })}
          </div>

          {/* Explanation */}
          <div
            style={{
              opacity: explanationOpacity,
              transform: `translateY(${explanationY}px)`,
              background: "#0d0d0d",
              border: "1.5px solid #1f1f1f",
              borderRadius: 20,
              padding: "32px 40px",
            }}
          >
            <p
              style={{
                fontWeight: 400,
                fontSize: 30,
                color: MUTED,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {explanation}
            </p>
          </div>
        </div>
      )}

      {/* ── SCENE 4: Outro ─────────────────────────────────────────────── */}
      {frame >= s4Start && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            opacity: scene4Opacity,
          }}
        >
          {/* Small logo */}
          <PPLogo size={80} />

          {/* URL */}
          <div
            style={{
              transform: `translateY(${urlY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 56,
                color: GREEN,
                letterSpacing: "-0.02em",
              }}
            >
              studypassplus.com
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: 32,
                color: MUTED,
              }}
            >
              Free to try. No signup.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
