'use client'

import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from '@/lib/types'
import AIBadge from '@/components/ui/AIBadge'

interface AskTheDeskProps {
  articleId?: string
}

export default function AskTheDesk({ articleId }: AskTheDeskProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSubmit = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, messages: newMessages }),
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I apologize — I was unable to process that query. Please try again.',
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. The editorial system is temporarily unavailable.',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      style={{
        border: 'var(--border)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'var(--orange)',
          borderBottom: 'var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--white)',
          }}
        >
          Ask The Dispatch — Conversational Newsroom
        </span>
        <AIBadge variant="dark">Live</AIBadge>
      </div>

      {/* Chat Body */}
      <div
        ref={chatBodyRef}
        style={{
          minHeight: '220px',
          maxHeight: '320px',
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {messages.length === 0 && !isLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '180px',
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            Ask a question about {articleId ? 'this article' : 'today\'s coverage'}. Our editorial AI will respond with sourced context.
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '14px',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              animation: 'fadeIn 200ms ease',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '28px',
                height: '28px',
                background: msg.role === 'user' ? 'var(--orange)' : 'var(--black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                color: msg.role === 'user' ? 'var(--white)' : 'var(--orange)',
                flexShrink: 0,
                borderRadius: 0,
              }}
            >
              {msg.role === 'user' ? 'YOU' : 'AI'}
            </div>

            {/* Bubble */}
            <div
              style={{
                maxWidth: '75%',
                padding: '10px 14px',
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                lineHeight: 1.6,
                border: '2px solid var(--black)',
                boxShadow: msg.role === 'assistant' ? 'var(--shadow-sm)' : 'none',
                background: msg.role === 'user' ? 'var(--orange)' : '#fff8f5',
                color: msg.role === 'user' ? 'var(--white)' : 'var(--black)',
                borderRadius: 0,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '14px',
              animation: 'fadeIn 200ms ease',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                background: 'var(--black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                color: 'var(--orange)',
                flexShrink: 0,
              }}
            >
              AI
            </div>
            <div
              style={{
                padding: '10px 14px',
                border: '2px solid var(--black)',
                boxShadow: 'var(--shadow-sm)',
                background: '#fff8f5',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map(j => (
                  <span
                    key={j}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--orange)',
                      animation: 'gendot 1.2s ease-in-out infinite',
                      animationDelay: `${j * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                }}
              >
                Consulting editorial sources…
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Row */}
      <div
        style={{
          borderTop: 'var(--border)',
          display: 'flex',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about sourcing, methodology, or context…"
          style={{
            flex: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            padding: '12px 16px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: 'var(--black)',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'var(--black)',
            color: 'var(--orange)',
            border: 'none',
            borderLeft: 'var(--border)',
            padding: '12px 20px',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            transition: 'background 100ms ease, color 100ms ease',
            whiteSpace: 'nowrap',
            borderRadius: 0,
          }}
          onMouseEnter={(e) => {
            if (!isLoading && input.trim()) {
              e.currentTarget.style.background = 'var(--orange)'
              e.currentTarget.style.color = 'var(--white)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--black)'
            e.currentTarget.style.color = 'var(--orange)'
          }}
        >
          Send →
        </button>
      </div>
    </div>
  )
}
