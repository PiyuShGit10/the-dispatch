'use client'

interface TickerProps {
  items: string[]
}

export default function Ticker({ items }: TickerProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--black)',
        overflow: 'hidden',
        borderBottom: 'var(--border-thick)',
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'ticker 35s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              padding: '10px 40px',
              flexShrink: 0,
            }}
          >
            ▶ {item}
          </span>
        ))}
      </div>
    </div>
  )
}
