'use client'

import type { Article } from '@/lib/types'
import AIBadge from '@/components/ui/AIBadge'
import ConfidenceDot from '@/components/ui/ConfidenceDot'
import SidebarItem from './SidebarItem'
import { useState } from 'react'
import ArticleModal from '@/components/modals/ArticleModal'

interface HeroGridProps {
  articles: Article[]
}

export default function HeroGrid({ articles }: HeroGridProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const lead = articles[0]
  const secondary = articles.slice(1, 3)
  const sidebar = articles.slice(3, 5)

  if (!lead) return null

  return (
    <>
      <div className="hero-grid" style={{ border: 'var(--border)', marginBottom: '2rem' }}>
        {/* Cell A — Lead Story */}
        <div
          className="hero-lead"
          style={{
            borderRight: 'var(--border)',
            cursor: 'pointer',
            transition: 'background 100ms ease',
          }}
          onClick={() => setSelectedArticle(lead)}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ede7')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
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
                {lead.section}
              </span>
              <AIBadge />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(20px, 2.5vw, 30px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '10px',
              }}
            >
              {lead.headline}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--text-dek)',
                marginBottom: '12px',
              }}
            >
              {lead.dek}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
                AI Editorial System
              </span>
              <ConfidenceDot level={lead.confidence} />
              <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
                {lead.totalSourceCount} sources · {lead.tier1SourceCount} Tier-1
              </span>
              <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
                {lead.estimated_read_time} min read
              </span>
            </div>
          </div>
        </div>

        {/* Cell B — Secondary Stories */}
        <div className="hero-secondary" style={{ borderRight: 'var(--border)' }}>
          {secondary.map((article, i) => (
            <div
              key={article.id}
              style={{
                borderBottom: i < secondary.length - 1 ? 'var(--border)' : 'none',
                cursor: 'pointer',
                transition: 'background 100ms ease',
              }}
              onClick={() => setSelectedArticle(article)}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5ede7')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
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
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    marginBottom: '6px',
                  }}
                >
                  {article.headline}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--text-dek)',
                    marginBottom: '8px',
                  }}
                >
                  {article.dek}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ConfidenceDot level={article.confidence} />
                  <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
                    {article.estimated_read_time} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cell C — Most Read Sidebar */}
        <div className="hero-sidebar">
          <div
            style={{
              background: 'var(--black)',
              padding: '10px 16px',
              borderBottom: 'var(--border)',
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
              }}
            >
              Most Read Today
            </span>
          </div>
          {sidebar.map((article, i) => (
            <SidebarItem
              key={article.id}
              article={article}
              rank={i + 1}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      </div>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 340px;
          gap: 0;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-lead,
          .hero-secondary {
            border-right: none !important;
            border-bottom: var(--border);
          }
        }
      `}</style>
    </>
  )
}
