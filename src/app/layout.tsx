import '@/styles/globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'

const font = Plus_Jakarta_Sans({
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
    <html className={`${font.variable} ${font.className}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
