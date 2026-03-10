export const locales = ['nl', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'nl'

export const pageMeta: Record<string, Record<Locale, { title: string; description: string }>> = {
  home: {
    nl: { title: 'BEP — De Nieuwe Bedrijfsexpert | AI die vindt én doet', description: 'BEP verbindt al je bedrijfsdata, maakt het doorzoekbaar en voert taken autonoom uit. 100% in je eigen cloud, open-source AI.' },
    en: { title: 'BEP — The New Business Expert | AI that finds and acts', description: 'BEP connects all your business data, makes it queryable and executes tasks autonomously. 100% in your own cloud, open-source AI.' },
  },
  'waarom-bep': {
    nl: { title: 'Waarom BEP — Vergelijk met Copilot, Glean & meer', description: 'Ontdek waarom BEP de beste keuze is voor jouw bedrijfsdata. 100% eigen cloud, verbindt alle systemen, voert taken uit.' },
    en: { title: 'Why BEP — Compare with Copilot, Glean & more', description: 'Discover why BEP is the best choice for your business data. 100% own cloud, connects all systems, executes tasks.' },
  },
  cases: {
    nl: { title: 'Klantcases — BEP in de praktijk', description: 'Bekijk hoe organisaties BEP inzetten om hun bedrijfsdata te ontsluiten en processen te automatiseren.' },
    en: { title: 'Client Cases — BEP in practice', description: 'See how organizations use BEP to unlock their business data and automate processes.' },
  },
  team: {
    nl: { title: 'Team — De mensen achter BEP', description: 'Maak kennis met het team achter BEP. Vanuit Groningen bouwen we aan de toekomst van bedrijfsintelligentie.' },
    en: { title: 'Team — The people behind BEP', description: 'Meet the team behind BEP. From Groningen, we build the future of business intelligence.' },
  },
  pricing: {
    nl: { title: 'Pricing — BEP Bedrijfsexpert', description: 'Kies het BEP-pakket dat bij jouw organisatie past. Van Starter tot Enterprise, altijd 100% in je eigen cloud.' },
    en: { title: 'Pricing — BEP Business Expert', description: 'Choose the BEP plan that fits your organization. From Starter to Enterprise, always 100% in your own cloud.' },
  },
  contact: {
    nl: { title: 'Contact — Neem contact op met BEP', description: 'Neem contact op voor een demo of vraag. We helpen je graag verder.' },
    en: { title: 'Contact — Get in touch with BEP', description: 'Get in touch for a demo or question. We are happy to help.' },
  },
  privacy: {
    nl: { title: 'Privacy Policy | BEP', description: 'Het privacybeleid van BEP. Hoe wij omgaan met je gegevens.' },
    en: { title: 'Privacy Policy | BEP', description: 'The privacy policy of BEP. How we handle your data.' },
  },
}
