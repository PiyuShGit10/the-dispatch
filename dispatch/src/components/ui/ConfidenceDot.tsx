import type { ConfidenceLevel } from '@/lib/types'

interface ConfidenceDotProps {
  level: ConfidenceLevel
  showLabel?: boolean
}

const COLORS: Record<ConfidenceLevel, string> = {
  high: '#3a9e5f',
  medium: '#D97757',
  low: '#c0392b',
}

export default function ConfidenceDot({ level, showLabel = true }: ConfidenceDotProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: COLORS[level],
          border: `2px solid ${COLORS[level]}`,
          flexShrink: 0,
        }}
      />
      {showLabel && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
          }}
        >
          {level} confidence
        </span>
      )}
    </span>
  )
}
