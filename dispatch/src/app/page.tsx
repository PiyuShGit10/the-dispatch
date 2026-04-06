import PipelineBar from '@/components/layout/PipelineBar'
import HeroGrid from '@/components/news/HeroGrid'
import DigestStrip from '@/components/news/DigestStrip'
import SectionGrid from '@/components/news/SectionGrid'
import AskTheDesk from '@/components/chat/AskTheDesk'
import SourcesLog from '@/components/news/SourcesLog'
import SiteFooter from '@/components/layout/SiteFooter'
import { getFeed, getArticlesBySection } from '@/lib/pipeline'
import { MOCK_DIGEST } from '@/lib/articles'
import type { ArticleSource } from '@/lib/types'

export const revalidate = 600

export default async function FrontPage() {
  const articles = await getFeed()

  const techArticles = getArticlesBySection(articles, 'Technology').slice(0, 5)
  const climateArticles = getArticlesBySection(articles, 'Climate').slice(0, 5)
  const healthArticles = getArticlesBySection(articles, 'Health').slice(0, 5)
  const businessArticles = getArticlesBySection(articles, 'Business').slice(0, 5)

  // Collect all sources for transparency log
  const allSources: ArticleSource[] = articles.flatMap(a => a.sources || [])

  return (
    <main style={{ background: 'var(--white)', fontFamily: 'var(--font-mono)' }}>
      <PipelineBar />

      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '2rem 2rem 0' }}>
        <HeroGrid articles={articles} />

        <DigestStrip items={MOCK_DIGEST} />

        {techArticles.length > 0 && (
          <SectionGrid section="Technology" articles={techArticles} />
        )}

        {climateArticles.length > 0 && (
          <SectionGrid section="Climate" articles={climateArticles} />
        )}

        {businessArticles.length > 0 && (
          <SectionGrid section="Business" articles={businessArticles} />
        )}

        {healthArticles.length > 0 && (
          <SectionGrid section="Health" articles={healthArticles} />
        )}

        <SourcesLog sources={allSources} />

        <AskTheDesk />
      </div>

      <SiteFooter />
    </main>
  )
}
