import type { Article } from '@/lib/types'
import ConfidenceDot from '@/components/ui/ConfidenceDot'

interface SidebarItemProps {
  article: Article
  rank: number
  onClick?: () => void
}

export default function SidebarItem({ article, rank, onClick }: SidebarItemProps) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: 'var(--border)',
        cursor: 'pointer',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        transition: 'background 100ms ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ede7')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Rank number */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'rgba(217,119,87,0.25)',
          lineHeight: 1,
          flexShrink: 0,
          minWidth: '28px',
        }}
      >
        {String(rank).padStart(2, '0')}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}
        >
          {article.headline}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--orange)',
            }}
          >
            {article.section}
          </span>
          <ConfidenceDot level={article.confidence} showLabel={false} />
          <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
            {article.estimated_read_time}m
          </span>
        </div>
      </div>
    </div>
  )
}
