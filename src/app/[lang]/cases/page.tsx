import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { CasesOverview } from './CasesOverview'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Case Studies — BEP in Practice | BEP' : 'Cases — BEP in de Praktijk | BEP'
  const description = lang === 'en'
    ? 'Real results for real companies. Discover how organizations use BEP to unlock their business knowledge and accelerate processes.'
    : 'Echte resultaten voor echte bedrijven. Ontdek hoe organisaties met BEP hun bedrijfskennis ontsluiten en processen versnellen.'
  const path = '/cases'

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

export default function CasesPage() {
  return <CasesOverview />
}
