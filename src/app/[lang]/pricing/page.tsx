import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { PricingContent } from './PricingContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Pricing — Simple, Transparent Plans | BEP' : 'Pricing — Eenvoudige, Transparante Pakketten | BEP'
  const description = lang === 'en'
    ? 'BEP pricing starts at €499/month. Choose Starter, Professional or Enterprise. Always 100% in your own cloud.'
    : 'BEP pricing begint bij €499/maand. Kies Starter, Professional of Enterprise. Altijd 100% in je eigen cloud.'
  const path = '/pricing'

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

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'BEP — AI Business Expert',
  description: 'AI business expert that connects all your business data, makes it queryable and executes tasks autonomously.',
  brand: { '@type': 'Organization', name: 'BEP' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '499',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '499',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Up to 1,000 documents, 5 users, 3 integrations, knowledge base + search',
    },
    {
      '@type': 'Offer',
      name: 'Professional',
      price: '1099',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1099',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Up to 10,000 documents, 20 users, unlimited integrations, knowledge base + search + tasks',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      price: '3900',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '3900',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '500,000+ documents, unlimited users, unlimited integrations, all functionality, custom workflows',
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <PricingContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
    </>
  )
}
