import { getFeed, getArticlesBySection } from '@/lib/pipeline'
import SectionGrid from '@/components/news/SectionGrid'
import SourcesLog from '@/components/news/SourcesLog'
import SiteFooter from '@/components/layout/SiteFooter'
import AskTheDesk from '@/components/chat/AskTheDesk'
import PipelineBar from '@/components/layout/PipelineBar'
import { notFound } from 'next/navigation'
import type { ArticleSource } from '@/lib/types'

export const dynamic = 'force-dynamic'

const VALID_SECTIONS = ['politics', 'economy', 'technology', 'climate', 'health', 'international', 'business']

interface SectionPageProps {
  params: Promise<{ name: string }>
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { name } = await params

  if (!VALID_SECTIONS.includes(name.toLowerCase())) {
    notFound()
  }

  const sectionName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  const articles = await getFeed()
  const sectionArticles = getArticlesBySection(articles, sectionName)
  const allSources: ArticleSource[] = sectionArticles.flatMap(a => a.sources || [])

  return (
    <>
      <PipelineBar />
      <main style={{ maxWidth: '100%', margin: '0 auto', padding: '2rem' }}>
        {sectionArticles.length > 0 ? (
          <>
            <SectionGrid section={sectionName} articles={sectionArticles} />
            <SourcesLog sources={allSources} />
          </>
        ) : (
          <div
            style={{
              border: 'var(--border)',
              padding: '3rem',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}
            >
              No articles in {sectionName} yet
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                color: 'var(--text-dek)',
              }}
            >
              The editorial pipeline is processing stories. Check back shortly.
            </p>
          </div>
        )}

        <AskTheDesk />
      </main>
      <SiteFooter />
    </>
  )
}
