import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { PrivacyContent } from './PrivacyContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Privacy Policy | BEP' : 'Privacy Policy | BEP'
  const description = lang === 'en'
    ? 'BEP privacy policy. Learn how we handle your data, cookies and your rights under GDPR.'
    : 'BEP privacy policy. Lees hoe wij omgaan met je gegevens, cookies en je rechten onder de AVG.'
  const path = '/privacy'

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

export default function PrivacyPage() {
  return <PrivacyContent />
}
