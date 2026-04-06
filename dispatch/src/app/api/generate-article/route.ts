import { NextResponse } from 'next/server'
import { generateArticleForStory } from '@/lib/api'

export async function POST(req: Request) {
  try {
    const { storyId } = await req.json()
    if (!storyId) {
      return NextResponse.json({ error: 'storyId is required' }, { status: 400 })
    }

    const article = await generateArticleForStory(storyId)
    if (!article) {
      return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
    }

    return NextResponse.json(article)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
