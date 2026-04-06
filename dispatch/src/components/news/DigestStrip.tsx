import type { DigestItem } from '@/lib/types'

interface DigestStripProps {
  items: DigestItem[]
}

export default function DigestStrip({ items }: DigestStripProps) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div
      className="digest-strip"
      style={{
        background: 'var(--black)',
        color: 'var(--white)',
        border: 'var(--border)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderBottom: '2px solid rgba(255,255,255,0.15)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--orange)',
          }}
        >
          Morning Brief
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {dateStr}
        </span>
      </div>

      {/* Items grid */}
      <div className="digest-grid">
        {items.map((item, i) => (
          <div
            key={item.number}
            style={{
              padding: '16px 20px',
              borderRight: i < items.length - 1 ? '2px solid rgba(255,255,255,0.12)' : 'none',
            }}
            className="digest-item"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: 700,
                color: 'rgba(217,119,87,0.35)',
                display: 'block',
                marginBottom: '6px',
                lineHeight: 1,
              }}
            >
              {item.number}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .digest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .digest-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .digest-item {
            border-right: none !important;
            border-bottom: 2px solid rgba(255,255,255,0.12);
          }
        }
      `}</style>
    </div>
  )
}
