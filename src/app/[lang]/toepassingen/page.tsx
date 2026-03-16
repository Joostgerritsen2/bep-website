import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { ToepassingenContent } from './ToepassingenContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Applications — BEP for every department | BEP' : 'Toepassingen — BEP voor elke afdeling | BEP'
  const description = lang === 'en'
    ? 'Discover how BEP proactively supports your Sales, Finance, Support and Knowledge teams with AI agents that think along and act independently.'
    : 'Ontdek hoe BEP proactief je Sales, Finance, Support en Kennis teams ondersteunt met AI agents die meedenken en zelfstandig handelen.'
  const path = '/toepassingen'

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

export default function ToepassingenPage() {
  return <ToepassingenContent />
}
