import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { ContactContent } from './ContactContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Contact — Get in Touch | BEP' : 'Contact — Neem Contact Op | BEP'
  const description = lang === 'en'
    ? 'Contact BEP. Request a demo, ask a question or schedule a meeting. Email: info@bep.expert.'
    : 'Neem contact op met BEP. Vraag een demo aan, stel een vraag of plan een gesprek. Email: info@bep.expert.'
  const path = '/contact'

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

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'BEP',
    url: siteUrl,
    email: 'info@bep.expert',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@bep.expert',
      contactType: 'sales',
      availableLanguage: ['Dutch', 'English'],
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
    </>
  )
}
