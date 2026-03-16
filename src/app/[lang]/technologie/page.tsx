import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { TechnologieContent } from './TechnologieContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Technology — Under the Hood | BEP' : 'Technologie — Onder de Motorkap | BEP'
  const description = lang === 'en'
    ? 'Discover BEP\'s modular architecture: RAG engines, enterprise security, flexible connectors and infrastructure that runs in your own cloud.'
    : 'Ontdek de modulaire architectuur van BEP: RAG engines, enterprise beveiliging, flexibele connectoren en infrastructuur die draait in je eigen cloud.'
  const path = '/technologie'

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

export default function TechnologiePage() {
  return <TechnologieContent />
}
