'use client'

interface AIBadgeProps {
  variant?: 'orange' | 'dark'
  children?: React.ReactNode
}

export default function AIBadge({ variant = 'orange', children = 'AI Reported' }: AIBadgeProps) {
  const isOrange = variant === 'orange'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        background: isOrange ? 'var(--orange)' : 'var(--black)',
        color: 'var(--white)',
        border: '2px solid var(--black)',
        borderRadius: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--white)',
          animation: 'pulse 1.4s ease-in-out infinite',
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  )
}
