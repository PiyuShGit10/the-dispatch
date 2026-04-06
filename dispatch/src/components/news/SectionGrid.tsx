'use client'

import type { Article } from '@/lib/types'
import ArticleCard from './ArticleCard'
import ArticleModal from '@/components/modals/ArticleModal'
import { useState } from 'react'

interface SectionGridProps {
  section: string
  articles: Article[]
}

export default function SectionGrid({ section, articles }: SectionGridProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  if (articles.length === 0) return null

  return (
    <>
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="section-grid" style={{ border: 'var(--border)' }}>
          {articles.map((article, i) => (
            <div
              key={article.id}
              className="section-grid-item"
              style={{
                borderRight: 'var(--border)',
              }}
            >
              <ArticleCard
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            </div>
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
        .section-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .section-grid-item:nth-child(3n) {
          border-right: none !important;
        }
        @media (max-width: 900px) {
          .section-grid {
            grid-template-columns: 1fr;
          }
          .section-grid-item {
            border-right: none !important;
            border-bottom: var(--border);
          }
          .section-grid-item:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </>
  )
}
