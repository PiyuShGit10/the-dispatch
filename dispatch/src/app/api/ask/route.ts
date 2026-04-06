import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { articleId, messages } = await req.json()

    // For now, provide a mock response since the backend doesn't have a chat endpoint.
    // In production, this would call an LLM API with article context.
    const lastUserMessage = messages?.filter((m: { role: string }) => m.role === 'user').pop()
    const question = lastUserMessage?.content || ''

    const response = generateMockResponse(question, articleId)

    return NextResponse.json({ response })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    )
  }
}

function generateMockResponse(question: string, _articleId?: string): string {
  const q = question.toLowerCase()

  if (q.includes('source') || q.includes('sourcing')) {
    return 'This article draws from a combination of Tier-1 primary sources (government data, official filings, peer-reviewed research) and Tier-2 secondary sources (established outlet reporting, think tank analysis). Each factual claim is attributed to its source. You can review the full source list in the Sources section of the article.'
  }

  if (q.includes('confidence') || q.includes('accuracy')) {
    return 'Confidence scoring is based on three factors: (1) the proportion of Tier-1 vs Tier-2 sources, (2) the degree of consensus among sources, and (3) the recency of the data cited. Articles with primarily Tier-1 sourcing and strong consensus receive "high" confidence ratings. Any editorial caveats are flagged explicitly.'
  }

  if (q.includes('bias') || q.includes('objective')) {
    return 'The Dispatch editorial pipeline is designed to minimize bias through structural requirements: every article must include at least one substantive counterargument, all claims must be attributed to sources, and synthesis is clearly distinguished from established fact. The system does not editorialize or express opinions.'
  }

  if (q.includes('how') && q.includes('work')) {
    return 'Articles are produced through a multi-pass pipeline: (1) Story discovery from news APIs, (2) Source verification and fact extraction using AI, (3) Article drafting with mandatory journalistic structure (lede, nut graf, sourcing, counterargument), (4) Confidence scoring based on source quality, and (5) Publication with full transparency metadata.'
  }

  return 'Thank you for your question. The Dispatch editorial system processes queries by cross-referencing the article\'s source material and editorial metadata. For specific sourcing questions, I can point you to the relevant Tier-1 or Tier-2 sources cited in the article. What specific aspect would you like me to elaborate on?'
}
