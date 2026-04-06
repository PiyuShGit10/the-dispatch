'use client'

import type { ArticleSource } from '@/lib/types'

interface SourcesLogProps {
  sources: ArticleSource[]
}

export default function SourcesLog({ sources }: SourcesLogProps) {
  const uniqueSources = sources.reduce((acc, src) => {
    if (!acc.find(s => s.label === src.label)) acc.push(src)
    return acc
  }, [] as ArticleSource[])

  return (
    <div
      style={{
        border: 'var(--border)',
        padding: '1.25rem',
        background: '#fff8f5',
        marginBottom: '2.5rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          borderBottom: 'var(--border-thin)',
          paddingBottom: '8px',
          marginBottom: '12px',
          color: 'var(--black)',
        }}
      >
        Today&apos;s Primary Sources — Transparency Log
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {uniqueSources.map((src) => {
          const isTier1 = src.tier === 1
          return (
            <span
              key={src.label}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                border: isTier1 ? '2px solid var(--black)' : '2px solid rgba(10,10,10,0.45)',
                borderRadius: 0,
                color: isTier1 ? 'var(--black)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'background 100ms ease, color 100ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--black)'
                e.currentTarget.style.color = 'var(--orange)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = isTier1 ? 'var(--black)' : 'var(--text-muted)'
              }}
            >
              T{src.tier} — {src.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
