import type { Metadata } from 'next'
import { Space_Mono, Courier_Prime } from 'next/font/google'
import './globals.css'
import Ticker from '@/components/layout/Ticker'
import Masthead from '@/components/layout/Masthead'
import { TICKER_ITEMS } from '@/lib/articles'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
})

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'THE DISPATCH — AI-Native Autonomous Journalism',
  description: 'An autonomous AI editorial system delivering verified, sourced journalism with full pipeline transparency. Every article is generated, fact-checked, and scored by machine intelligence.',
  keywords: ['AI journalism', 'autonomous newsroom', 'news', 'AI reporting', 'The Dispatch'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${courierPrime.variable}`}>
      <body style={{ background: 'var(--white)', margin: 0 }}>
        <Ticker items={TICKER_ITEMS} />
        <Masthead />
        {children}
      </body>
    </html>
  )
}
