'use client'

import type { Article } from '@/lib/types'
import ConfidenceDot from '@/components/ui/ConfidenceDot'
import AIBadge from '@/components/ui/AIBadge'

interface ArticleCardProps {
  article: Article
  onClick?: () => void
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      style={{
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'background 100ms ease',
        borderBottom: 'var(--border)',
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ede7')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--orange)',
          }}
        >
          {article.section}
        </span>
        <AIBadge variant="dark">AI</AIBadge>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          marginBottom: '6px',
        }}
      >
        {article.headline}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          lineHeight: 1.55,
          color: 'var(--text-dek)',
          marginBottom: '10px',
        }}
      >
        {article.dek}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <ConfidenceDot level={article.confidence} />
        <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
          {article.estimated_read_time} min
        </span>
        <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
          {article.totalSourceCount} sources
        </span>
      </div>
    </div>
  )
}
