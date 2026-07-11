import * as React from "react"
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  Sequence,
  spring,
  random,
  staticFile,
} from "remotion"

// Audio props are filenames inside public/; remote URLs pass through as-is.
const resolveAudio = (src: string): string =>
  src.startsWith("http") ? src : staticFile(src)

export interface DailyQuestionProps {
  question: string
  answers: { A: string; B: string; C: string; D: string }
  correct: "A" | "B" | "C" | "D"
  explanation: string
  domain: string
  /** Legacy single voiceover, plays from frame 0 with the fixed 30s timing */
  audioSrc?: string
  /** Two-segment voiceover: question part plays from 0, reveal part from s3 */
  audioQuestionSrc?: string
  audioRevealSrc?: string
  /** Scene boundary overrides (frames), derived from audio by render-video.ts */
  s3?: number
  s4?: number
  durationInFrames?: number
}

// ── constants ──────────────────────────────────────────────────────────────
const GREEN = "#22c55e"
const BG = "#050505"
const CARD_BG = "#111111"
const CARD_BORDER = "#2a2a2a"
const MUTED = "#9ca3af"
const WHITE = "#ffffff"
const RED_BG = "#1c0a0a"
const RED_BORDER = "#7f1d1d"

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

// Default scene boundaries (frames @ 30fps), used when no timing props are
// passed. With two-segment audio, render-video.ts computes s3/s4 from the
// measured voiceover durations instead.
const S2 = 90
const DEFAULT_S3 = 600
const DEFAULT_S4 = 840

const easeOut = Easing.out(Easing.cubic)
const easeInOut = Easing.inOut(Easing.cubic)

function eased(
  frame: number,
  start: number,
  end: number,
  outputRange: [number, number],
  easing = easeOut
) {
  return interpolate(frame, [start, end], outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  })
}

// ── ambient animated background ────────────────────────────────────────────
function AmbientBackground({ frame }: { frame: number }) {
  // Two glow orbs drifting slowly in opposite directions
  const drift1 = Math.sin(frame / 90) * 90
  const drift2 = Math.cos(frame / 110) * 110
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          left: -300 + drift1,
          top: -250 + drift2 * 0.5,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          right: -400 - drift1 * 0.6,
          bottom: -350 + drift2,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.07) 0%, rgba(34,197,94,0) 65%)",
        }}
      />
      {/* faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.045) 1.5px, transparent 1.5px)",
          backgroundSize: "56px 56px",
          backgroundPosition: `0px ${(frame * 0.25) % 56}px`,
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  )
}

// ── top progress bar ───────────────────────────────────────────────────────
function ProgressBar({ frame, duration }: { frame: number; duration: number }) {
  const pct = Math.min(1, frame / duration)
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        background: "rgba(255,255,255,0.06)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: "100%",
          background: `linear-gradient(90deg, #16a34a, ${GREEN})`,
          boxShadow: `0 0 18px rgba(34,197,94,0.8)`,
        }}
      />
    </div>
  )
}

// ── PassPlus "PP" logo mark ────────────────────────────────────────────────
function PPLogo({ size = 96, glow = 0 }: { size?: number; glow?: number }) {
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
        boxShadow: `0 0 ${40 * glow}px rgba(34,197,94,${0.55 * glow})`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: size * 0.44,
          color: "#000",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        PP
      </span>
    </div>
  )
}

// ── countdown ring (last seconds of the question scene) ────────────────────
function CountdownRing({ frame, s3 }: { frame: number; s3: number }) {
  const START = s3 - 190 // appears ~6.3s before the reveal
  const DURATION = 180 // 6 seconds
  if (frame < START) return null

  const appear = eased(frame, START, START + 15, [0, 1])
  const t = Math.min(1, (frame - START) / DURATION)
  const secondsLeft = Math.max(1, Math.ceil(6 - t * 6))
  // pulse on each second boundary
  const withinSecond = ((frame - START) % 30) / 30
  const pulse = 1 + 0.1 * Math.max(0, 1 - withinSecond * 3)

  const R = 52
  const CIRC = 2 * Math.PI * R
  const color = secondsLeft <= 2 ? "#f59e0b" : GREEN

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: appear,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 130,
          height: 130,
          transform: `scale(${pulse})`,
        }}
      >
        <svg width={130} height={130} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={65}
            cy={65}
            r={R}
            fill="rgba(0,0,0,0.55)"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={9}
          />
          <circle
            cx={65}
            cy={65}
            r={R}
            fill="none"
            stroke={color}
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * t}
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 52,
            color,
          }}
        >
          {secondsLeft}
        </span>
      </div>
    </div>
  )
}

// ── celebration particles on the reveal ────────────────────────────────────
function ParticleBurst({ frame, start }: { frame: number; start: number }) {
  if (frame < start) return null
  const t = frame - start
  const N = 26
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: N }).map((_, i) => {
        const seed = `p-${i}`
        const angle = random(seed) * Math.PI * 2
        const speed = 7 + random(seed + "s") * 13
        const size = 10 + random(seed + "z") * 16
        const spin = (random(seed + "r") - 0.5) * 24
        const life = 55 + random(seed + "l") * 30
        const p = Math.min(1, t / life)
        if (p >= 1) return null
        const dist = speed * t * (1 - p * 0.45)
        const x = 540 + Math.cos(angle) * dist
        const y = 430 + Math.sin(angle) * dist + 0.14 * t * t * 0.5
        const opacity = 1 - p
        const isSquare = random(seed + "q") > 0.5
        const color =
          random(seed + "c") > 0.35 ? GREEN : random(seed + "c2") > 0.5 ? "#bbf7d0" : "#16a34a"
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: isSquare ? size : size * 0.45,
              background: color,
              borderRadius: isSquare ? 3 : size,
              opacity,
              transform: `rotate(${t * spin}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}

// ── Answer card ────────────────────────────────────────────────────────────
function AnswerCard({
  letter,
  text,
  state,
  glow = 0,
}: {
  letter: string
  text: string
  state: "default" | "correct" | "wrong"
  glow?: number
}) {
  const bgColor =
    state === "correct" ? "#052e16" : state === "wrong" ? RED_BG : CARD_BG
  const borderColor =
    state === "correct" ? GREEN : state === "wrong" ? RED_BORDER : CARD_BORDER
  const badgeBg =
    state === "correct" ? GREEN : state === "wrong" ? "#7f1d1d" : "#1e1e1e"
  const badgeColor =
    state === "correct" ? "#000" : state === "wrong" ? "#fca5a5" : GREEN
  const textColor =
    state === "correct" ? "#bbf7d0" : state === "wrong" ? "#fca5a5" : WHITE

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 24,
        padding: "30px 36px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow:
          state === "correct" && glow > 0
            ? `0 0 ${44 * glow}px rgba(34,197,94,${0.45 * glow})`
            : "none",
      }}
    >
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
  audioQuestionSrc,
  audioRevealSrc,
  s3,
  s4,
}: DailyQuestionProps) {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()
  const letters = ["A", "B", "C", "D"] as const
  const S3 = s3 ?? DEFAULT_S3
  const S4 = s4 ?? DEFAULT_S4

  // ── Scene 1: intro (0 - S2) ──────────────────────────────────────────────
  const logoSpring = spring({ frame, fps, config: { damping: 10, stiffness: 120, mass: 0.8 } })
  const logoGlow = eased(frame, 8, 35, [0, 1])
  const ringScale = eased(frame, 6, 60, [0.4, 2.4])
  const ringOpacity = eased(frame, 6, 60, [0.7, 0])
  const titleSpring = spring({ frame: frame - 22, fps, config: { damping: 13, stiffness: 110 } })
  const tagOpacity = eased(frame, 40, 62, [0, 1])
  const tagSpacing = eased(frame, 40, 75, [0.25, 0.04])
  // zoom-through exit
  const s1ExitScale = eased(frame, 72, S2, [1, 1.6], easeInOut)
  const s1ExitOpacity = eased(frame, 72, S2, [1, 0])

  // ── Scene 2: question + answers (S2 - S3) ────────────────────────────────
  const pillSpring = spring({ frame: frame - S2, fps, config: { damping: 13, stiffness: 130 } })
  const qBlur = eased(frame, S2 + 12, S2 + 45, [14, 0])
  const qOpacity = eased(frame, S2 + 12, S2 + 45, [0, 1])
  const qY = eased(frame, S2 + 12, S2 + 45, [50, 0])
  const answerStart = S2 + 52
  const answerDelay = 7
  // slide-up + fade exit
  const s2ExitY = eased(frame, S3 - 18, S3, [0, -70], easeInOut)
  const s2ExitOpacity = eased(frame, S3 - 18, S3, [1, 0])

  // ── Scene 3: reveal (S3 - S4) ────────────────────────────────────────────
  const s3Enter = spring({ frame: frame - S3, fps, config: { damping: 14, stiffness: 100 } })
  const labelSpring = spring({ frame: frame - (S3 + 8), fps, config: { damping: 9, stiffness: 150, mass: 0.7 } })
  const correctGlow = eased(frame, S3 + 6, S3 + 30, [0, 1])
  const correctScale = 1 + 0.03 * spring({ frame: frame - (S3 + 6), fps, config: { damping: 8, stiffness: 140 } })
  const wrongSettle = eased(frame, S3 + 4, S3 + 28, [1, 0.35])
  const wrongShrink = eased(frame, S3 + 4, S3 + 28, [1, 0.97])
  const explOpacity = eased(frame, S3 + 42, S3 + 72, [0, 1])
  const explY = eased(frame, S3 + 42, S3 + 72, [30, 0])
  const s3ExitScale = eased(frame, S4 - 16, S4, [1, 0.94], easeInOut)
  const s3ExitOpacity = eased(frame, S4 - 16, S4, [1, 0])

  // ── Scene 4: outro (S4 - end) ────────────────────────────────────────────
  const outroLogo = spring({ frame: frame - S4, fps, config: { damping: 10, stiffness: 120, mass: 0.8 } })
  const urlSpring = spring({ frame: frame - (S4 + 10), fps, config: { damping: 13, stiffness: 110 } })
  const ctaOpacity = eased(frame, S4 + 26, S4 + 44, [0, 1])
  // shimmer sweep across the URL
  const shimmerX = eased(frame, S4 + 18, S4 + 55, [-120, 120], easeInOut)

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
      {audioSrc && <Audio src={resolveAudio(audioSrc)} startFrom={0} />}
      {audioQuestionSrc && (
        <Audio src={resolveAudio(audioQuestionSrc)} startFrom={0} />
      )}
      {audioRevealSrc && (
        <Sequence from={S3}>
          <Audio src={resolveAudio(audioRevealSrc)} startFrom={0} />
        </Sequence>
      )}

      <AmbientBackground frame={frame} />
      <ProgressBar frame={frame} duration={durationInFrames} />

      {/* ── SCENE 1: Intro ─────────────────────────────────────────────── */}
      {frame < S2 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 44,
            opacity: s1ExitOpacity,
            transform: `scale(${s1ExitScale})`,
          }}
        >
          <div style={{ position: "relative" }}>
            {/* expanding pulse ring behind the logo */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: 48,
                border: `3px solid ${GREEN}`,
                opacity: ringOpacity,
                transform: `scale(${ringScale})`,
              }}
            />
            <div style={{ transform: `scale(${logoSpring})` }}>
              <PPLogo size={150} glow={logoGlow} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              transform: `translateY(${(1 - titleSpring) * 46}px)`,
              opacity: titleSpring,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 58,
                color: WHITE,
                letterSpacing: "-0.02em",
              }}
            >
              Pass<span style={{ color: GREEN }}>Plus</span>
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: 34,
                color: MUTED,
                opacity: tagOpacity,
                letterSpacing: `${tagSpacing}em`,
              }}
            >
              Daily Security+ Question
            </span>
          </div>
        </div>
      )}

      {/* ── SCENE 2: Question + Answers ────────────────────────────────── */}
      {frame >= S2 && frame < S3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "100px 72px",
            opacity: s2ExitOpacity,
            transform: `translateY(${s2ExitY}px)`,
          }}
        >
          {/* Domain pill springs in from the left */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              background: "rgba(34,197,94,0.12)",
              border: "1.5px solid rgba(34,197,94,0.3)",
              borderRadius: 100,
              padding: "10px 28px",
              marginBottom: 48,
              opacity: pillSpring,
              transform: `translateX(${(1 - pillSpring) * -80}px)`,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 26, color: GREEN }}>
              {domain}
            </span>
          </div>

          {/* Question: blur-to-sharp entrance */}
          <div
            style={{
              opacity: qOpacity,
              transform: `translateY(${qY}px)`,
              filter: `blur(${qBlur}px)`,
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

          {/* Answers spring in, alternating sides */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {letters.map((letter, i) => {
              const s = spring({
                frame: frame - (answerStart + i * answerDelay),
                fps,
                config: { damping: 13, stiffness: 120, mass: 0.9 },
              })
              const fromX = (i % 2 === 0 ? -1 : 1) * 110
              return (
                <div
                  key={letter}
                  style={{
                    opacity: s,
                    transform: `translateX(${(1 - s) * fromX}px) scale(${0.94 + s * 0.06})`,
                  }}
                >
                  <AnswerCard letter={letter} text={answers[letter]} state="default" />
                </div>
              )
            })}
          </div>

          <CountdownRing frame={frame} s3={S3} />
        </div>
      )}

      {/* ── SCENE 3: Reveal ────────────────────────────────────────────── */}
      {frame >= S3 && frame < S4 && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              padding: "100px 72px",
              opacity: Math.min(s3Enter * 2, s3ExitOpacity),
              transform: `scale(${(0.96 + s3Enter * 0.04) * s3ExitScale})`,
            }}
          >
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

            {/* "Answer: X" springs in with overshoot */}
            <div
              style={{
                opacity: Math.min(1, labelSpring * 1.4),
                transform: `scale(${labelSpring})`,
                transformOrigin: "left center",
                marginBottom: 40,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 54,
                  color: GREEN,
                  letterSpacing: "-0.01em",
                  textShadow: `0 0 30px rgba(34,197,94,${0.5 * correctGlow})`,
                }}
              >
                Answer: {correct}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
              {letters.map((letter) => {
                const isCorrect = letter === correct
                return (
                  <div
                    key={letter}
                    style={{
                      opacity: isCorrect ? 1 : wrongSettle,
                      transform: isCorrect
                        ? `scale(${correctScale})`
                        : `scale(${wrongShrink})`,
                    }}
                  >
                    <AnswerCard
                      letter={letter}
                      text={answers[letter]}
                      state={isCorrect ? "correct" : "wrong"}
                      glow={isCorrect ? correctGlow : 0}
                    />
                  </div>
                )
              })}
            </div>

            <div
              style={{
                opacity: explOpacity,
                transform: `translateY(${explY}px)`,
                background: "rgba(13,13,13,0.9)",
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

          <ParticleBurst frame={frame} start={S3 + 8} />
        </>
      )}

      {/* ── SCENE 4: Outro ─────────────────────────────────────────────── */}
      {frame >= S4 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div style={{ transform: `scale(${outroLogo})` }}>
            <PPLogo size={90} glow={outroLogo} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: urlSpring,
              transform: `translateY(${(1 - urlSpring) * 36}px)`,
            }}
          >
            <span
              style={{
                position: "relative",
                fontWeight: 800,
                fontSize: 58,
                letterSpacing: "-0.02em",
                color: GREEN,
                overflow: "hidden",
                padding: "0 8px",
              }}
            >
              studypassplus.com
              {/* shimmer sweep */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                  transform: `translateX(${shimmerX}%)`,
                }}
              />
            </span>
            <span style={{ fontWeight: 400, fontSize: 32, color: MUTED, opacity: ctaOpacity }}>
              Free to try. No signup.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
