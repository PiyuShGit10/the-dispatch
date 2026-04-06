export type ConfidenceLevel = 'high' | 'medium' | 'low'
export type SourceTier = 1 | 2 | 3
export type Section =
  | 'Politics' | 'Economy' | 'Technology'
  | 'Climate' | 'Health' | 'International' | 'Business'

export type PipelineStage =
  | 'story_queue' | 'web_search' | 'source_verify'
  | 'drafting' | 'confidence_score' | 'publish'

export interface ArticleSource {
  label: string
  url?: string
  tier: SourceTier
  accessed: string
}

export interface Article {
  id: number
  story_id: number
  slug: string
  headline: string
  dek: string
  section: Section
  body: string
  sources: ArticleSource[]
  confidence: ConfidenceLevel
  estimated_read_time: number
  tier1SourceCount: number
  totalSourceCount: number
  flags: string[]
  generated_at: string
  ai_disclosure: string
  original_title?: string
  original_source?: string
  original_url?: string
  newsapi_image_url?: string
  category?: string
  region?: string
}

export interface Story {
  id: number
  newsapi_title: string
  newsapi_description: string | null
  newsapi_url: string
  newsapi_source: string | null
  newsapi_image_url: string | null
  newsapi_published_at: string | null
  category: string | null
  region: string | null
  status: 'pending' | 'generating' | 'generated' | 'failed'
  created_at: string
}

export interface PipelineStatus {
  status: string
  uptime: string
  pipeline: {
    stories: Record<string, number>
    totalArticles: number
    lastDiscovery: string | null
    generationQueueDepth: number
  }
}

export interface DigestItem {
  number: string
  summary: string
  section: Section
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
