import { getFeed } from '@/lib/pipeline'
import ConfidenceDot from '@/components/ui/ConfidenceDot'
import AIBadge from '@/components/ui/AIBadge'
import AskTheDesk from '@/components/chat/AskTheDesk'
import SourcesLog from '@/components/news/SourcesLog'
import SiteFooter from '@/components/layout/SiteFooter'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const articles = await getFeed()
  const article = articles.find(a => String(a.id) === slug || a.slug === slug)

  if (!article) notFound()

  // Parse body into elements
  const bodyElements = article.body.split('\n').filter(l => l.trim()).map((line, i) => {
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

  return (
    <>
      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem' }}>
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
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}
        >
          {article.headline}
        </h1>

        {/* Dek */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            lineHeight: 1.65,
            color: 'var(--text-dek)',
            borderLeft: '4px solid var(--orange)',
            paddingLeft: '16px',
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
            borderTop: 'var(--border)',
            borderBottom: 'var(--border)',
            padding: '1rem 0',
            marginBottom: '2rem',
          }}
        >
          <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
            AI Editorial System
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
            {article.totalSourceCount} sources · {article.tier1SourceCount} Tier-1
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span className="uppercase-label" style={{ color: 'var(--text-muted)' }}>
            {article.estimated_read_time} min read
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <ConfidenceDot level={article.confidence} />
        </div>

        {/* Article body */}
        <article>{bodyElements}</article>

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
        <div style={{ marginTop: '2rem' }}>
          <SourcesLog sources={article.sources} />
        </div>

        {/* AI Disclosure */}
        <div
          style={{
            borderTop: 'var(--border)',
            paddingTop: '1rem',
            marginBottom: '2rem',
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
        <AskTheDesk articleId={String(article.id)} />
      </main>

      <SiteFooter />
    </>
  )
}

