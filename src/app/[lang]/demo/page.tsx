import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { DemoContent } from './DemoContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Schedule a Demo — BEP' : 'Plan een demo — BEP'
  const description = lang === 'en'
    ? 'Schedule a 30-minute demo and see what BEP can do for your organisation.'
    : 'Plan een demo van 30 minuten en ontdek wat BEP voor jouw organisatie kan doen.'
  const path = '/demo'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}${path}`,
      languages: {
        nl: `${siteUrl}/nl${path}`,
        en: `${siteUrl}/en${path}`,
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

export default function DemoPage() {
  return <DemoContent />
}
