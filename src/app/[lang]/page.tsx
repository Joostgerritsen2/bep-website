import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { HomeContent } from './HomeContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'en'
    ? 'BEP — The New Business Expert | AI that finds and acts'
    : 'BEP — De Nieuwe Bedrijfsexpert | AI die vindt én doet'
  const description = lang === 'en'
    ? 'BEP connects all your business data, makes it queryable and executes tasks autonomously. 100% in your own cloud, open-source AI.'
    : 'BEP verbindt al je bedrijfsdata, maakt het doorzoekbaar en voert taken autonoom uit. 100% in je eigen cloud, open-source AI.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'nl': `${siteUrl}/nl`,
        'en': `${siteUrl}/en`,
        'x-default': `${siteUrl}/nl`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}`,
      siteName: 'BEP',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
  }
}

function getFaqJsonLd(lang: string) {
  if (lang === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What exactly is BEP?', acceptedAnswer: { '@type': 'Answer', text: 'BEP is an AI business expert that connects all your business data — from ERP and CRM to email and documents. You can ask questions in natural language and BEP actually executes tasks, like looking up order status, sending emails or updating your CRM.' } },
        { '@type': 'Question', name: 'Where does BEP run? Is my data safe?', acceptedAnswer: { '@type': 'Answer', text: 'BEP runs 100% in your own cloud environment. Your data never leaves your infrastructure. We use open-source AI models, so there is no dependency on external AI providers. Fully GDPR-compliant and EU AI Act-ready.' } },
        { '@type': 'Question', name: 'Which systems can BEP connect to?', acceptedAnswer: { '@type': 'Answer', text: 'BEP connects with all common business systems: ERP (SAP, Exact, AFAS), CRM (Salesforce, HubSpot), document management (SharePoint, Google Drive), email (Outlook, Gmail), databases and more.' } },
        { '@type': 'Question', name: 'How quickly is BEP operational?', acceptedAnswer: { '@type': 'Answer', text: 'The basic setup typically takes 2-4 weeks, depending on the number of systems to connect and the complexity of your data. After the initial setup, BEP continuously learns and becomes smarter.' } },
        { '@type': 'Question', name: 'What does BEP cost?', acceptedAnswer: { '@type': 'Answer', text: 'BEP is available from €499/month for the Starter plan. Check our pricing page for all plans and options.' } },
        { '@type': 'Question', name: 'Can BEP actually execute tasks?', acceptedAnswer: { '@type': 'Answer', text: "Yes, that is what makes BEP unique. BEP doesn't just find the answer, it also executes the action. Think of updating records in your CRM, sending status updates to customers, generating reports, or creating tasks in your project management tool." } },
      ],
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Wat is BEP precies?', acceptedAnswer: { '@type': 'Answer', text: 'BEP is een AI-bedrijfsexpert die al je bedrijfsdata verbindt — van ERP en CRM tot e-mail en documenten. Je kunt in natuurlijke taal vragen stellen en BEP voert ook daadwerkelijk taken uit, zoals het opzoeken van orderstatus, het versturen van e-mails of het bijwerken van je CRM.' } },
      { '@type': 'Question', name: 'Waar draait BEP? Is mijn data veilig?', acceptedAnswer: { '@type': 'Answer', text: 'BEP draait 100% in je eigen cloud-omgeving. Je data verlaat nooit je infrastructuur. We gebruiken open-source AI-modellen, dus er is geen afhankelijkheid van externe AI-providers. Volledig GDPR-compliant en EU AI Act-ready.' } },
      { '@type': 'Question', name: 'Welke systemen kan BEP koppelen?', acceptedAnswer: { '@type': 'Answer', text: 'BEP koppelt met alle gangbare bedrijfssystemen: ERP (SAP, Exact, AFAS), CRM (Salesforce, HubSpot), documentmanagement (SharePoint, Google Drive), e-mail (Outlook, Gmail), databases en meer.' } },
      { '@type': 'Question', name: 'Hoe snel is BEP operationeel?', acceptedAnswer: { '@type': 'Answer', text: 'De basisopzet duurt doorgaans 2-4 weken, afhankelijk van het aantal te koppelen systemen en de complexiteit van je data. Na de initiële setup leert BEP continu bij en wordt steeds slimmer.' } },
      { '@type': 'Question', name: 'Wat kost BEP?', acceptedAnswer: { '@type': 'Answer', text: 'BEP is beschikbaar vanaf €499/maand voor het Starter-pakket. Bekijk onze pricing-pagina voor alle pakketten en mogelijkheden.' } },
      { '@type': 'Question', name: 'Kan BEP ook daadwerkelijk taken uitvoeren?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, dat is wat BEP uniek maakt. BEP vindt niet alleen het antwoord, maar voert ook de actie uit. Denk aan het bijwerken van records in je CRM, het versturen van statusupdates naar klanten, het genereren van rapportages, of het aanmaken van taken in je projectmanagement tool.' } },
    ],
  }
}

export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <>
      <HomeContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(params.lang)) }} />
    </>
  )
}
