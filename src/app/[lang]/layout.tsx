import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { LangProvider } from '@/lib/language'
import { SetHtmlLang } from '@/components/SetHtmlLang'
import { GoogleTagManager, GTMNoScript } from '@/components/GoogleTagManager'
import { CookieConsent } from '@/components/CookieConsent'
import { ChatWidget } from '@/components/ChatWidget'
import { locales } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: { default: 'BEP — De Nieuwe Bedrijfsexpert', template: '%s | BEP' },
    description: lang === 'en'
      ? 'BEP connects all your business data, makes it queryable and executes tasks autonomously. 100% in your own cloud, open-source AI.'
      : 'BEP verbindt al je bedrijfsdata, maakt het doorzoekbaar en voert taken autonoom uit. 100% in je eigen cloud, open-source AI.',
    openGraph: {
      title: lang === 'en'
        ? 'BEP — The New Business Expert | AI that finds and acts'
        : 'BEP — De Nieuwe Bedrijfsexpert | AI die vindt én doet',
      description: lang === 'en'
        ? 'BEP connects all your business data, makes it queryable and executes tasks autonomously. 100% in your own cloud, open-source AI.'
        : 'BEP verbindt al je bedrijfsdata, maakt het doorzoekbaar en voert taken autonoom uit. 100% in je eigen cloud, open-source AI.',
      url: `${siteUrl}/${lang}`,
      siteName: 'BEP',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'nl': `${siteUrl}/nl`,
        'en': `${siteUrl}/en`,
        'x-default': `${siteUrl}/nl`,
      },
    },
  }
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  return (
    <>
      <SetHtmlLang lang={lang} />
      <GoogleTagManager />
      <GTMNoScript />
      <LangProvider lang={lang}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ChatWidget />
      </LangProvider>

      {/* JSON-LD: Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://bep.expert/#organization",
        name: "BEP",
        url: "https://bep.expert",
        description: lang === 'en'
          ? "BEP is the new AI business expert. Connects all your business data, makes it queryable and executes tasks autonomously. 100% in your own cloud."
          : "BEP is de nieuwe AI bedrijfsexpert. Verbindt al je bedrijfsdata, maakt het doorzoekbaar en voert taken autonoom uit. 100% in je eigen cloud.",
        knowsAbout: ["AI Business Expert", "Data Sovereignty", "Enterprise AI", "Business Data", "Task Automation", "Knowledge Management"],
      })}} />
      {/* JSON-LD: SoftwareApplication */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://bep.expert/#software",
        name: "BEP",
        applicationCategory: "BusinessApplication",
        description: "AI Business Expert — connects business data, enables smart querying, and executes tasks autonomously",
        operatingSystem: "Cloud-based",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "499",
          highPrice: "3900",
        },
        publisher: { "@id": "https://bep.expert/#organization" },
      })}} />
      {/* JSON-LD: WebSite */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://bep.expert/#website",
        url: "https://bep.expert",
        name: "BEP — De Nieuwe Bedrijfsexpert",
        description: "AI die vindt én doet. 100% in je eigen cloud.",
        publisher: { "@id": "https://bep.expert/#organization" },
        inLanguage: ["nl", "en"],
      })}} />
    </>
  )
}
