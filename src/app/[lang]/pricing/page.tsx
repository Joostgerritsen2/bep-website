import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { PricingContent } from './PricingContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Pricing — Simple, Transparent Plans | BEP' : 'Pricing — Eenvoudige, Transparante Pakketten | BEP'
  const description = lang === 'en'
    ? 'BEP pricing starts at €595/month. Choose Start, Team, Growth or Platform. Always 100% in your own cloud.'
    : 'BEP pricing begint bij €595/maand. Kies Start, Team, Growth of Platform. Altijd 100% in je eigen cloud.'
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
      name: 'Start',
      price: '595',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '595',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '1 domain, 1 integration, 1 standard agent, up to 10 users, onboarding, live in 2 to 4 weeks. One-time setup: €1,250.',
    },
    {
      '@type': 'Offer',
      name: 'Team',
      price: '1250',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1250',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '2 domains, 3 integrations, 3 standard agents, up to 25 users, extended onboarding. One-time expansion: €1,500.',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '2500',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2500',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Multiple domains, 5 integrations, 5 standard agents, up to 50 users, analytics and optimization, priority support. One-time expansion: €2,500.',
    },
    {
      '@type': 'Offer',
      name: 'Platform',
      price: '4500',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '4500',
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Broad rollout, governance, priority support, custom agreements, enterprise options. From €3,500 one-time.',
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
