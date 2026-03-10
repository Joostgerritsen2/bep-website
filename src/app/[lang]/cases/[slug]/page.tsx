import type { Metadata } from 'next'
import { cases, getCaseBySlug } from '../caseData'
import { CaseDetail } from './CaseDetail'
import { notFound } from 'next/navigation'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export function generateStaticParams() {
  return ['nl', 'en'].flatMap(lang =>
    cases.map(c => ({ lang, slug: c.slug }))
  )
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const { lang, slug } = params
  const caseStudy = getCaseBySlug(slug)
  if (!caseStudy) return { title: 'Case | BEP' }

  const title = lang === 'en'
    ? `${caseStudy.client} — ${caseStudy.tagline.en} | BEP`
    : `${caseStudy.client} — ${caseStudy.tagline.nl} | BEP`
  const description = lang === 'en' ? caseStudy.description.en : caseStudy.description.nl

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/cases/${slug}`,
      languages: {
        'nl': `${siteUrl}/nl/cases/${slug}`,
        'en': `${siteUrl}/en/cases/${slug}`,
        'x-default': `${siteUrl}/nl/cases/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/cases/${slug}`,
      siteName: 'BEP',
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
  }
}

export default function CasePage({ params }: { params: { lang: string; slug: string } }) {
  const { lang, slug } = params
  const caseStudy = getCaseBySlug(slug)
  if (!caseStudy) notFound()

  const caseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lang === 'en' ? caseStudy.tagline.en : caseStudy.tagline.nl,
    description: lang === 'en' ? caseStudy.description.en : caseStudy.description.nl,
    author: { '@type': 'Organization', name: 'BEP', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'BEP', url: siteUrl },
    url: `${siteUrl}/${lang}/cases/${slug}`,
    about: {
      '@type': 'Organization',
      name: caseStudy.client,
    },
    ...(caseStudy.quote && {
      review: {
        '@type': 'Review',
        reviewBody: lang === 'en' ? caseStudy.quote.text.en : caseStudy.quote.text.nl,
        author: { '@type': 'Person', name: caseStudy.quote.author },
      },
    }),
  }

  return (
    <>
      <CaseDetail caseStudy={caseStudy} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }} />
    </>
  )
}
