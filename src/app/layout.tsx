import '@/styles/globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import type { Metadata } from 'next'

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-main',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${heading.variable} ${body.variable} ${body.className}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
