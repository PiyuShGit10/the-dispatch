import AIBadge from '@/components/ui/AIBadge'
import { getEditionString, formatDate } from '@/lib/pipeline'

const NAV_ITEMS = ['Politics', 'Economy', 'Technology', 'Climate', 'Health', 'International', 'Business']

interface MastheadProps {
  activeSection?: string
}

export default function Masthead({ activeSection }: MastheadProps) {
  const now = new Date()
  const dateStr = formatDate(now.toISOString())
  const edition = getEditionString()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--white)',
        borderBottom: 'var(--border-thick)',
      }}
    >
      <MastheadStyles />
      {/* Row 1: Date / Logo / Actions */}
      <div className="masthead-top">
        {/* Left: Date + Edition */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
          }}
        >
          {dateStr} · {edition}
        </div>

        {/* Center: Logo */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          THE <span style={{ color: 'var(--orange)' }}>DIS</span>PATCH
        </a>

        {/* Right: AI Badge + Subscribe */}
        <div className="masthead-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AIBadge>Live</AIBadge>
          <button
            className="neo-interactive subscribe-btn"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '6px 14px',
              background: 'var(--black)',
              color: 'var(--orange)',
              border: '2px solid var(--black)',
              borderRadius: 0,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Row 2: Navigation */}
      <nav className="masthead-nav">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeSection?.toLowerCase() === item.toLowerCase()
          return (
            <a
              key={item}
              href={`/section/${item.toLowerCase()}`}
              className="masthead-nav-item"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '10px 20px',
                borderRight: 'var(--border)',
                borderLeft: index === 0 ? 'var(--border)' : 'none',
                background: isActive ? 'var(--orange)' : 'transparent',
                color: isActive ? 'var(--white)' : 'var(--black)',
                whiteSpace: 'nowrap',
                transition: 'background 100ms ease, color 100ms ease',
              }}
            >
              {item}
            </a>
          )
        })}
      </nav>
    </header>
  )
}

export function MastheadStyles() {
  return (
    <style>{`
      .masthead-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 2rem;
        border-bottom: var(--border);
      }

      .masthead-nav {
        display: flex;
        justify-content: center;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        position: relative;
      }
      .masthead-nav::-webkit-scrollbar {
        display: none;
      }

      @media (max-width: 640px) {
        .masthead-top {
          padding: 14px 1rem;
        }
        .masthead-actions {
          display: none !important;
        }
      }

      @media (max-width: 768px) {
        .masthead-nav {
          justify-content: flex-start;
          scroll-snap-type: x mandatory;
        }
        .masthead-nav-item {
          scroll-snap-align: start;
          flex-shrink: 0;
        }
        
        /* A subtle right shadow to indicate scrollability on mobile */
        .masthead-nav::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9));
          pointer-events: none;
        }
      }
    `}</style>
  )
}
