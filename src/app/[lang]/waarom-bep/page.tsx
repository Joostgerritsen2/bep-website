import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { WhyBepContent } from './WhyBepContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Why BEP — Stop Using 10 AI Tools | BEP' : 'Waarom BEP — Stop met 10 AI Tools | BEP'
  const description = lang === 'en'
    ? 'BEP vs Microsoft Copilot, Glean & others. 100% own cloud, connects ALL data, executes tasks. Compare features, pricing and compliance.'
    : 'BEP vs Microsoft Copilot, Glean & anderen. 100% eigen cloud, verbindt ALLE data, voert taken uit. Vergelijk features, pricing en compliance.'
  const path = '/waarom-bep'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}${path}`,
      languages: {
        'nl': `${siteUrl}/nl${path}`,
        'en': `${siteUrl}/en${path}`,
        'x-default': `${siteUrl}/nl${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}${path}`,
      siteName: 'BEP',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
  }
}

export default function WhyBepPage() {
  return <WhyBepContent />
}
