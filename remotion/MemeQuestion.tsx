import * as React from "react"
import { useCurrentFrame, interpolate, Easing, Audio } from "remotion"

export interface MemeQuestionProps {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
  /** The meme hook shown in scene 1. Defaults to "bro really thought he was ready" */
  hookText?: string
  audioSrc?: string
}

// ── palette ────────────────────────────────────────────────────────────────
const BG = "#000000"
const GREEN = "#22c55e"
const GREEN_DIM = "rgba(34,197,94,0.15)"
const RED = "#ef4444"
const RED_DIM = "rgba(239,68,68,0.15)"
const WHITE = "#ffffff"
const MUTED = "#6b7280"
const CARD_BG = "#141414"
const PILL_BG = "#1c1c1c"
const PILL_BORDER = "#2d2d2d"

const FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

const DEFAULT_HOOK = "bro really thought he was ready"

// ── easing helpers ─────────────────────────────────────────────────────────
const easeOut = Easing.out(Easing.cubic)
const easeOutBack = Easing.out(Easing.back(1.4))

function ease(
  frame: number,
  start: number,
  end: number,
  output: [number, number],
  fn: (t: number) => number = easeOut
): number {
  return interpolate(frame, [start, end], output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: fn,
  })
}

// Damped sine shake: oscillates and decays to zero over `duration` frames
function shakeX(frame: number, startFrame: number, duration = 22): number {
  if (frame < startFrame || frame >= startFrame + duration) return 0
  const t = frame - startFrame
  const decay = 1 - t / duration
  return Math.sin(t * 2.4) * 10 * decay
}

// ── PPLogo ─────────────────────────────────────────────────────────────────
function PPLogo({ size = 72 }: { size?: number }) {
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
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
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

// ── MemePill: answer in scene 2 ────────────────────────────────────────────
function MemePill({
  letter,
  text,
  opacity,
  offsetX,
}: {
  letter: string
  text: string
  opacity: number
  offsetX: number
}) {
  return (
    <div
      style={{
        opacity,
        transform: `translateX(${offsetX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: PILL_BG,
        border: `1.5px solid ${PILL_BORDER}`,
        borderRadius: 999,
        padding: "22px 32px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Letter badge */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: GREEN_DIM,
          border: `1.5px solid ${GREEN}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 22,
            color: GREEN,
          }}
        >
          {letter}
        </span>
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 28,
          color: WHITE,
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  )
}

// ── RevealPill: answer in scene 3 ─────────────────────────────────────────
function RevealPill({
  letter,
  text,
  isCorrect,
  scale,
  translateX,
}: {
  letter: string
  text: string
  isCorrect: boolean
  scale: number
  translateX: number
}) {
  const bg = isCorrect ? "rgba(34,197,94,0.18)" : RED_DIM
  const border = isCorrect ? GREEN : RED
  const badgeBg = isCorrect ? GREEN : RED
  const textColor = isCorrect ? "#bbf7d0" : "#fca5a5"

  return (
    <div
      style={{
        transform: `scale(${scale}) translateX(${translateX}px)`,
        transformOrigin: "left center",
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 999,
        padding: "22px 32px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Letter badge */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 22,
            color: isCorrect ? BG : WHITE,
          }}
        >
          {isCorrect ? letter : "X"}
        </span>
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 28,
          color: textColor,
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  )
}

// ── Main composition ───────────────────────────────────────────────────────
export function MemeQuestion({
  question,
  answers,
  correct,
  explanation,
  domain,
  hookText,
  audioSrc,
}: MemeQuestionProps) {
  const frame = useCurrentFrame()

  const hook = hookText ?? DEFAULT_HOOK
  const letters = ["A", "B", "C", "D"] as const

  // ── Scene 1: hook slam (frames 0-60) ─────────────────────────────────────
  const s1End = 60

  // Hook text slams in from top with bounce overshoot
  const hookY = ease(frame, 0, 28, [-320, 0], easeOutBack)
  const hookScale = ease(frame, 0, 20, [1.25, 1])
  const hookOpacity = ease(frame, 0, 10, [0, 1])

  // Subtitle fades in slightly later
  const subtitleOpacity = ease(frame, 20, 45, [0, 1])
  const subtitleY = ease(frame, 20, 45, [18, 0])

  // Scene 1 exit fade
  const s1Opacity = frame < 50 ? 1 : ease(frame, 50, s1End, [1, 0])

  // ── Scene 2: question + answers (frames 60-480) ───────────────────────────
  const s2Start = 60
  const s2End = 480

  const scene2Opacity = ease(frame, s2Start, s2Start + 12, [0, 1])

  // Card slides up from bottom
  const cardY = ease(frame, s2Start, s2Start + 28, [500, 0])
  const cardOpacity = ease(frame, s2Start, s2Start + 15, [0, 1])

  // "are you cooked?" corner text
  const cookedOpacity = ease(frame, s2Start + 30, s2Start + 50, [0, 1])

  // Question text fades in once card lands
  const questionOpacity = ease(frame, s2Start + 25, s2Start + 45, [0, 1])

  // Answers stagger in - 3 frames apart (100ms at 30fps)
  const answerStart = s2Start + 50
  const ANSWER_GAP = 3
  const pillOpacities = letters.map((_, i) =>
    ease(frame, answerStart + i * ANSWER_GAP, answerStart + i * ANSWER_GAP + 12, [0, 1])
  )
  const pillOffsets = letters.map((_, i) =>
    ease(frame, answerStart + i * ANSWER_GAP, answerStart + i * ANSWER_GAP + 12, [30, 0])
  )

  // Scene 2 exit
  const s2ExitOpacity = frame < s2End - 15 ? 1 : ease(frame, s2End - 15, s2End, [1, 0])

  // ── Flash transition (frames 476-492) ────────────────────────────────────
  const flashOpacity =
    frame < 476 || frame > 492
      ? 0
      : interpolate(frame, [476, 482, 492], [0, 0.9, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })

  // ── Scene 3: reveal (frames 480-720) ─────────────────────────────────────
  const s3Start = 480
  const s3End = 720

  const scene3Opacity = ease(frame, s3Start, s3Start + 12, [0, 1])

  // "THE ANSWER IS X" slams in with overshoot
  const answerSlamScale = ease(frame, s3Start + 5, s3Start + 22, [1.7, 1], easeOutBack)
  const answerSlamOpacity = ease(frame, s3Start + 5, s3Start + 18, [0, 1])
  const answerSlamY = ease(frame, s3Start + 5, s3Start + 22, [-60, 0], easeOutBack)

  // Correct card scale pulse: 1 -> 1.07 (overshoot) -> 1.02 (settle)
  const correctCardScale = interpolate(
    frame,
    [s3Start + 8, s3Start + 18, s3Start + 28],
    [1.0, 1.07, 1.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  )

  // Explanation fades in later in scene 3
  const explainOpacity = ease(frame, s3Start + 45, s3Start + 70, [0, 1])
  const explainY = ease(frame, s3Start + 45, s3Start + 70, [20, 0])

  // Scene 3 exit
  const s3ExitOpacity = frame < s3End - 15 ? 1 : ease(frame, s3End - 15, s3End, [1, 0])

  // ── Scene 4: outro (frames 720-900) ──────────────────────────────────────
  const s4Start = 720

  const scene4Opacity = ease(frame, s4Start, s4Start + 18, [0, 1])
  const cta1Opacity = ease(frame, s4Start + 5, s4Start + 28, [0, 1])
  const cta1Y = ease(frame, s4Start + 5, s4Start + 28, [-30, 0], easeOutBack)
  const urlOpacity = ease(frame, s4Start + 28, s4Start + 50, [0, 1])
  const urlScale = ease(frame, s4Start + 28, s4Start + 50, [0.85, 1])
  const subOpacity = ease(frame, s4Start + 45, s4Start + 65, [0, 1])
  const logoOpacity = ease(frame, s4Start + 55, s4Start + 75, [0, 1])

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: BG,
        fontFamily: FONT,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Voiceover - plays from frame 0 if provided */}
      {audioSrc && <Audio src={audioSrc} startFrom={0} />}

      {/* ── SCENE 1: Hook slam ──────────────────────────────────────────── */}
      {frame < s1End && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 64px",
            gap: 28,
            opacity: s1Opacity,
          }}
        >
          {/* Hook text */}
          <div
            style={{
              transform: `translateY(${hookY}px) scale(${hookScale})`,
              opacity: hookOpacity,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: 72,
                color: WHITE,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                textTransform: "lowercase",
              }}
            >
              {hook} 💀
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 4,
                height: 28,
                background: GREEN,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: 36,
                color: GREEN,
                letterSpacing: "0.01em",
              }}
            >
              Security+ SY0-701
            </span>
          </div>
        </div>
      )}

      {/* ── SCENE 2: Question + Answers ─────────────────────────────────── */}
      {frame >= s2Start && frame < s2End && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "80px 60px 80px",
            opacity: Math.min(scene2Opacity, s2ExitOpacity),
          }}
        >
          {/* "are you cooked?" top right corner */}
          <div
            style={{
              position: "absolute",
              top: 72,
              right: 60,
              opacity: cookedOpacity,
            }}
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: 24,
                color: MUTED,
                fontStyle: "italic",
              }}
            >
              are you cooked?
            </span>
          </div>

          {/* Domain tag */}
          <div
            style={{
              opacity: cardOpacity,
              display: "inline-flex",
              alignSelf: "flex-start",
              marginBottom: 36,
              marginTop: 20,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: GREEN,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {domain}
            </span>
          </div>

          {/* Question card with green left border */}
          <div
            style={{
              transform: `translateY(${cardY}px)`,
              opacity: cardOpacity,
              background: CARD_BG,
              borderLeft: `5px solid ${GREEN}`,
              borderRadius: "0 20px 20px 0",
              padding: "36px 40px",
              marginBottom: 44,
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: 40,
                color: WHITE,
                lineHeight: 1.45,
                margin: 0,
                opacity: questionOpacity,
              }}
            >
              {question}
            </p>
          </div>

          {/* Answer pills - staggered */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {letters.map((letter, i) => (
              <MemePill
                key={letter}
                letter={letter}
                text={answers[letter]}
                opacity={pillOpacities[i]}
                offsetX={pillOffsets[i]}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Flash transition ─────────────────────────────────────────────── */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: WHITE,
            opacity: flashOpacity,
            zIndex: 90,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── SCENE 3: Reveal ─────────────────────────────────────────────── */}
      {frame >= s3Start && frame < s3End && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "80px 60px",
            opacity: Math.min(scene3Opacity, s3ExitOpacity),
          }}
        >
          {/* "THE ANSWER IS X" */}
          <div
            style={{
              opacity: answerSlamOpacity,
              transform: `translateY(${answerSlamY}px) scale(${answerSlamScale})`,
              transformOrigin: "left center",
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: 80,
                color: WHITE,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              THE ANSWER IS{" "}
              <span style={{ color: GREEN }}>{correct}</span>
            </span>
          </div>

          {/* Answer pills with correct/wrong states */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {letters.map((letter) => {
              const isCorrect = letter === correct
              const tx = isCorrect ? 0 : shakeX(frame, s3Start + 8)
              const sc = isCorrect ? correctCardScale : 1
              return (
                <RevealPill
                  key={letter}
                  letter={letter}
                  text={answers[letter]}
                  isCorrect={isCorrect}
                  scale={sc}
                  translateX={tx}
                />
              )
            })}
          </div>

          {/* Explanation */}
          <div
            style={{
              opacity: explainOpacity,
              transform: `translateY(${explainY}px)`,
              background: "#0f0f0f",
              borderLeft: `3px solid ${MUTED}`,
              borderRadius: "0 16px 16px 0",
              padding: "24px 32px",
            }}
          >
            <p
              style={{
                fontWeight: 400,
                fontSize: 28,
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

      {/* ── SCENE 4: Outro ──────────────────────────────────────────────── */}
      {frame >= s4Start && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            gap: 0,
            opacity: scene4Opacity,
          }}
        >
          {/* "don't be cooked" */}
          <div
            style={{
              opacity: cta1Opacity,
              transform: `translateY(${cta1Y}px)`,
              marginBottom: 48,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: 68,
                color: WHITE,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                textTransform: "lowercase",
              }}
            >
              don&apos;t be cooked 💀
            </span>
          </div>

          {/* studypassplus.com */}
          <div
            style={{
              opacity: urlOpacity,
              transform: `scale(${urlScale})`,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 58,
                color: GREEN,
                letterSpacing: "-0.02em",
              }}
            >
              studypassplus.com
            </span>
          </div>

          {/* Subline */}
          <div style={{ opacity: subOpacity, marginBottom: 72 }}>
            <span
              style={{
                fontWeight: 400,
                fontSize: 30,
                color: MUTED,
              }}
            >
              free practice, no signup
            </span>
          </div>

          {/* PassPlus logo - bottom center */}
          <div style={{ opacity: logoOpacity }}>
            <PPLogo size={72} />
          </div>
        </div>
      )}
    </div>
  )
}
