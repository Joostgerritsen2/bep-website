import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { FilosofieContent } from './FilosofieContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Our Philosophy — Data Sovereignty | BEP' : 'Onze Filosofie — Data Soevereiniteit | BEP'
  const description = lang === 'en'
    ? 'BEP believes your data belongs to you. Open-source AI, running in your own cloud — fully transparent, fully auditable, EU AI Act compliant from day one.'
    : 'BEP gelooft dat jouw data van jou is. Open-source AI, draaiend in je eigen cloud — volledig transparant, volledig auditeerbaar, EU AI Act compliant vanaf dag \u00e9\u00e9n.'
  const path = '/filosofie'

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
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
  }
}

export default function FilosofiePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lang === 'en' ? 'Our Philosophy — Data Sovereignty' : 'Onze Filosofie — Data Soevereiniteit',
    description: lang === 'en'
      ? 'BEP believes your data belongs to you. Open-source AI, running in your own cloud — fully transparent, fully auditable, EU AI Act compliant from day one.'
      : 'BEP gelooft dat jouw data van jou is. Open-source AI, draaiend in je eigen cloud — volledig transparant, volledig auditeerbaar, EU AI Act compliant vanaf dag \u00e9\u00e9n.',
    author: {
      '@type': 'Organization',
      name: 'BEP',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BEP',
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/${lang}/filosofie`,
    inLanguage: lang === 'en' ? 'en' : 'nl',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FilosofieContent />
    </>
  )
}
