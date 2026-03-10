import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { TeamContent } from './TeamContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en' ? 'Team — The People Behind BEP' : 'Team — De Mensen Achter BEP'
  const description = lang === 'en'
    ? 'Meet the BEP team. From Groningen, we build the future of business intelligence with data engineers, AI specialists and business consultants.'
    : 'Maak kennis met het BEP team. Vanuit Groningen bouwen we aan de toekomst van bedrijfsintelligentie met data-engineers, AI-specialisten en business consultants.'
  const path = '/team'

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

const teamJsonLd = [
  { name: 'Berco Beute', role: 'AI Whisperer' },
  { name: 'Sven Vintges', role: 'Knowledge Magician' },
  { name: 'Sietse van der Laan', role: 'Making Things Work' },
  { name: 'Jeroen Broekema', role: 'Partner Intelligence Lead' },
  { name: 'Jelle Klaver', role: 'Product Enchanter' },
].map(m => ({
  '@type': 'Person',
  name: m.name,
  jobTitle: m.role,
  worksFor: { '@type': 'Organization', name: 'BEP', url: siteUrl },
}))

export default function TeamPage() {
  return (
    <>
      <TeamContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: teamJsonLd.map((person, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: person,
            })),
          }),
        }}
      />
    </>
  )
}
