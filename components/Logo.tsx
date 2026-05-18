export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PassPlus"
    >
      <rect width="40" height="40" rx="9" fill="#0A0A0A" />
      <text
        x="19"
        y="20"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="15"
        fontWeight="800"
        fontFamily="system-ui,-apple-system,sans-serif"
        letterSpacing="-0.5"
      >
        PP
      </text>
      <circle cx="30" cy="30" r="9" fill="#22C55E" />
      <path
        d="M26.5 30.5L29.5 33L33.5 27.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
