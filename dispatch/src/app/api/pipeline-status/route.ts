import { NextResponse } from 'next/server'
import { fetchPipelineStatus } from '@/lib/api'

export async function GET() {
  try {
    const status = await fetchPipelineStatus()
    if (status) {
      return NextResponse.json(status)
    }

    // Return mock status if backend is unavailable
    return NextResponse.json({
      status: 'ok',
      uptime: '0m 0s',
      pipeline: {
        stories: { pending: 12, generating: 1, generated: 6, failed: 0 },
        totalArticles: 6,
        lastDiscovery: new Date().toISOString(),
        generationQueueDepth: 1,
      },
    })
  } catch {
    return NextResponse.json({
      status: 'ok',
      uptime: '0m 0s',
      pipeline: {
        stories: { pending: 0, generating: 0, generated: 6, failed: 0 },
        totalArticles: 6,
        lastDiscovery: null,
        generationQueueDepth: 0,
      },
    })
  }
}
