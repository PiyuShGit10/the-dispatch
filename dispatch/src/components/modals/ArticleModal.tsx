'use client'

import { useEffect, useCallback } from 'react'
import type { Article } from '@/lib/types'
import ConfidenceDot from '@/components/ui/ConfidenceDot'
import AIBadge from '@/components/ui/AIBadge'
import AskTheDesk from '@/components/chat/AskTheDesk'

interface ArticleModalProps {
  article: Article
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [handleEscape])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Parse markdown body into paragraphs and headers
  const renderBody = (body: string) => {
    const lines = body.split('\n').filter(l => l.trim())
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderBottom: '2px solid var(--black)',
              margin: '1.75rem 0 0.75rem',
              paddingBottom: '0.35rem',
            }}
          >
            {line.replace('## ', '')}
          </h2>
        )
      }
      return (
        <p
          key={i}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            lineHeight: 1.8,
            marginBottom: '1.1rem',
          }}
        >
          {line}
        </p>
      )
    })
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10,10,10,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 150ms ease',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'slideInUp 200ms ease',
        }}
      >
        {/* Sticky Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'var(--orange)',
            borderBottom: 'var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--white)',
            }}
          >
            The Dispatch — Full Article
          </span>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: 'var(--black)',
              color: 'var(--orange)',
              border: 'none',
              padding: '5px 12px',
              cursor: 'pointer',
              borderRadius: 0,
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          {/* Section + Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
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
            <AIBadge />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(22px, 4vw, 34px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '14px',
            }}
          >
            {article.headline}
          </h1>

          {/* Dek */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'var(--text-dek)',
              borderLeft: '4px solid var(--orange)',
              paddingLeft: '14px',
              marginBottom: '1.5rem',
            }}
          >
            {article.dek}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              borderBottom: 'var(--border)',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
              AI Editorial System
            </span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
              {article.totalSourceCount} sources
            </span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
              {article.estimated_read_time} min read
            </span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <ConfidenceDot level={article.confidence} />
          </div>

          {/* Article Body */}
          <div>{renderBody(article.body)}</div>

          {/* Flags */}
          {article.flags && article.flags.length > 0 && (
            <div
              style={{
                borderTop: 'var(--border)',
                marginTop: '1.5rem',
                paddingTop: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#c0392b',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Editorial Caveats
              </span>
              {article.flags.map((flag, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'var(--text-dek)',
                    marginBottom: '4px',
                  }}
                >
                  ⚠ {flag}
                </p>
              ))}
            </div>
          )}

          {/* Sources */}
          <div
            style={{
              borderTop: 'var(--border)',
              marginTop: '2rem',
              paddingTop: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--orange)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Sources
            </span>
            {article.sources.map((src, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(10,10,10,0.08)',
                }}
              >
                <span style={{ fontWeight: 700, color: 'var(--black)' }}>T{src.tier}</span>
                {' — '}
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    {src.label}
                  </a>
                ) : (
                  src.label
                )}
              </div>
            ))}
          </div>

          {/* AI Disclosure */}
          <div
            style={{
              borderTop: 'var(--border)',
              marginTop: '1.5rem',
              paddingTop: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(10,10,10,0.3)',
              }}
            >
              {article.ai_disclosure}
            </p>
          </div>

          {/* Ask The Desk */}
          <div style={{ marginTop: '2rem' }}>
            <AskTheDesk articleId={String(article.id)} />
          </div>
        </div>
      </div>
    </div>
  )
}
