import { NextResponse } from 'next/server'
import { fetchArticles } from '@/lib/api'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  try {
    const articles = await fetchArticles(limit)
    return NextResponse.json({ articles })
  } catch {
    // Fallback to mock data
    const { MOCK_ARTICLES } = await import('@/lib/articles')
    return NextResponse.json({ articles: MOCK_ARTICLES })
  }
}
