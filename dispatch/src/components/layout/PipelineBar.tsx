'use client'

import { useEffect, useState } from 'react'
import type { PipelineStatus } from '@/lib/types'

const STAGES = [
  { key: 'story_queue', label: 'Story Queue' },
  { key: 'web_search', label: 'Discovery' },
  { key: 'source_verify', label: 'Verification' },
  { key: 'drafting', label: 'Drafting' },
  { key: 'confidence_score', label: 'Scoring' },
  { key: 'publish', label: 'Published' },
]

export default function PipelineBar() {
  const [status, setStatus] = useState<PipelineStatus | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/pipeline-status')
        if (res.ok) {
          const data = await res.json()
          setStatus(data)
        }
      } catch {
        // Silently fail — pipeline bar is non-critical
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000)

    // Rotate active stage for visual effect
    const stageInterval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % STAGES.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(stageInterval)
    }
  }, [])

  const totalArticles = status?.pipeline?.totalArticles ?? 0
  const pendingStories = status?.pipeline?.stories?.pending ?? 0
  const queueDepth = status?.pipeline?.generationQueueDepth ?? 0

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--black)',
        borderTop: 'var(--border-thick)',
        borderBottom: 'var(--border-thick)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 2rem',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {/* Left: Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--orange)',
          whiteSpace: 'nowrap',
        }}
      >
        Editorial Pipeline
      </span>

      {/* Center: Stages */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        {STAGES.map((stage, i) => {
          const isDone = i < activeIndex
          const isActive = i === activeIndex
          const isPending = i > activeIndex

          return (
            <div key={stage.key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isDone ? 'var(--white)' : isActive ? 'var(--orange)' : 'transparent',
                    border: `2px solid ${isPending ? 'rgba(255,255,255,0.3)' : isActive ? 'var(--orange)' : 'var(--white)'}`,
                    animation: isActive ? 'pulse 1.4s ease-in-out infinite' : 'none',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: isPending ? 'rgba(255,255,255,0.4)' : isActive ? 'var(--orange)' : 'var(--white)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stage.label}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <span
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    margin: '0 2px',
                  }}
                >
                  →
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Right: Stats */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {[
          `Articles: ${totalArticles}`,
          `Pending: ${pendingStories}`,
          `Queue: ${queueDepth}`,
        ].map((stat, i) => (
          <span
            key={stat}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--white)',
              padding: '0 12px',
              borderLeft: i > 0 ? '2px solid rgba(255,255,255,0.15)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {stat}
          </span>
        ))}
      </div>
    </div>
  )
}
