import type { Article, PipelineStatus, Story } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/**
 * Fetch articles from the backend API.
 */
export async function fetchArticles(limit = 20, offset = 0): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/api/articles?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  const data = await res.json()

  return (data.articles || []).map(normalizeArticle)
}

/**
 * Fetch a single article by ID.
 */
export async function fetchArticleById(id: number): Promise<Article | null> {
  const res = await fetch(`${API_BASE}/api/articles/${id}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return normalizeArticle(data)
}

/**
 * Fetch stories from the backend API.
 */
export async function fetchStories(status?: string, limit = 20): Promise<Story[]> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (status) params.set('status', status)
  const res = await fetch(`${API_BASE}/api/stories?${params}`, {
    next: { revalidate: 30 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.stories || []
}

/**
 * Trigger article generation for a story.
 */
export async function generateArticleForStory(storyId: number): Promise<Article | null> {
  const res = await fetch(`${API_BASE}/api/stories/${storyId}/generate`, {
    method: 'POST',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.article ? normalizeArticle(data.article) : null
}

/**
 * Trigger discovery cycle.
 */
export async function triggerDiscovery(): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/stories/discover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

/**
 * Fetch pipeline status from the backend.
 */
export async function fetchPipelineStatus(): Promise<PipelineStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/api/status`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

/**
 * Client-side fetcher for articles (used in client components).
 */
export async function clientFetchArticles(limit = 20): Promise<Article[]> {
  const res = await fetch(`/api/get-feed?limit=${limit}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.articles || []
}

/**
 * Normalize backend article data to our frontend Article type.
 */
function normalizeArticle(raw: Record<string, unknown>): Article {
  const sources = Array.isArray(raw.sources) ? raw.sources : []
  const flags = Array.isArray(raw.flags) ? raw.flags : []
  const tier1Count = sources.filter((s: Record<string, unknown>) => s.tier === 1).length

  return {
    id: raw.id as number,
    story_id: raw.story_id as number,
    slug: String(raw.id),
    headline: (raw.headline as string) || 'Untitled',
    dek: (raw.dek as string) || '',
    section: mapSection(raw.section as string || raw.category as string),
    body: (raw.body as string) || '',
    sources,
    confidence: normalizeConfidence(raw.confidence as string),
    estimated_read_time: (raw.estimated_read_time as number) || 4,
    tier1SourceCount: tier1Count,
    totalSourceCount: sources.length,
    flags,
    generated_at: (raw.generated_at as string) || new Date().toISOString(),
    ai_disclosure: (raw.ai_disclosure as string) || 'This article was reported and written by an autonomous AI editorial system.',
    original_title: raw.original_title as string | undefined,
    original_source: raw.original_source as string | undefined,
    original_url: raw.original_url as string | undefined,
    newsapi_image_url: raw.newsapi_image_url as string | undefined,
    category: raw.category as string | undefined,
    region: raw.region as string | undefined,
  }
}

function normalizeConfidence(val: string | undefined): 'high' | 'medium' | 'low' {
  if (val === 'high' || val === 'medium' || val === 'low') return val
  return 'medium'
}

function mapSection(raw: string | undefined): Article['section'] {
  if (!raw) return 'Technology'
  const map: Record<string, Article['section']> = {
    technology: 'Technology',
    science: 'Technology',
    business: 'Business',
    economy: 'Economy',
    health: 'Health',
    politics: 'Politics',
    climate: 'Climate',
    international: 'International',
    general: 'Politics',
  }
  return map[raw.toLowerCase()] || 'Technology'
}
