import type { Article } from './types'
import { fetchArticles } from './api'
import { MOCK_ARTICLES } from './articles'

/**
 * Get feed articles — tries backend first, falls back to mock data.
 */
export async function getFeed(): Promise<Article[]> {
  try {
    const articles = await fetchArticles(100)
    if (articles.length > 0) return articles
  } catch {
    // Backend unavailable — use mock data
  }
  return MOCK_ARTICLES
}

/**
 * Get articles for a specific section.
 */
export function getArticlesBySection(articles: Article[], section: string): Article[] {
  return articles.filter(a => a.section.toLowerCase() === section.toLowerCase())
}

/**
 * Format a date string for display.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format time since publication.
 */
export function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

/**
 * Get edition string for masthead.
 */
export function getEditionString(): string {
  const now = new Date()
  const hour = now.getHours()
  let edition = 'Morning'
  if (hour >= 12 && hour < 17) edition = 'Afternoon'
  if (hour >= 17) edition = 'Evening'
  return `${edition} Edition`
}
