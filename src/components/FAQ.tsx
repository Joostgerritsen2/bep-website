'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  questionNl: string
  questionEn: string
  answerNl: string
  answerEn: string
}

const defaultFaqs: FAQItem[] = [
  {
    questionNl: 'Wat is BEP precies?',
    questionEn: 'What exactly is BEP?',
    answerNl: 'BEP is een AI-bedrijfsexpert die al je bedrijfsdata verbindt — van ERP en CRM tot e-mail en documenten. Je kunt in natuurlijke taal vragen stellen en BEP voert ook daadwerkelijk taken uit, zoals het opzoeken van orderstatus, het versturen van e-mails of het bijwerken van je CRM.',
    answerEn: 'BEP is an AI business expert that connects all your business data — from ERP and CRM to email and documents. You can ask questions in natural language and BEP actually executes tasks, like looking up order status, sending emails or updating your CRM.',
  },
  {
    questionNl: 'Waar draait BEP? Is mijn data veilig?',
    questionEn: 'Where does BEP run? Is my data safe?',
    answerNl: 'BEP draait 100% in je eigen cloud-omgeving. Je data verlaat nooit je infrastructuur. We gebruiken open-source AI-modellen, dus er is geen afhankelijkheid van externe AI-providers. Volledig GDPR-compliant en EU AI Act-ready.',
    answerEn: 'BEP runs 100% in your own cloud environment. Your data never leaves your infrastructure. We use open-source AI models, so there is no dependency on external AI providers. Fully GDPR-compliant and EU AI Act-ready.',
  },
  {
    questionNl: 'Welke systemen kan BEP koppelen?',
    questionEn: 'Which systems can BEP connect to?',
    answerNl: 'BEP koppelt met alle gangbare bedrijfssystemen: ERP (SAP, Exact, AFAS), CRM (Salesforce, HubSpot), documentmanagement (SharePoint, Google Drive), e-mail (Outlook, Gmail), databases en meer. Nieuwe koppelingen worden continu toegevoegd.',
    answerEn: 'BEP connects with all common business systems: ERP (SAP, Exact, AFAS), CRM (Salesforce, HubSpot), document management (SharePoint, Google Drive), email (Outlook, Gmail), databases and more. New integrations are continuously added.',
  },
  {
    questionNl: 'Hoe snel is BEP operationeel?',
    questionEn: 'How quickly is BEP operational?',
    answerNl: 'De basisopzet duurt doorgaans 2-4 weken, afhankelijk van het aantal te koppelen systemen en de complexiteit van je data. Na de initiële setup leert BEP continu bij en wordt steeds slimmer.',
    answerEn: 'The basic setup typically takes 2-4 weeks, depending on the number of systems to connect and the complexity of your data. After the initial setup, BEP continuously learns and becomes smarter.',
  },
  {
    questionNl: 'Wat kost BEP?',
    questionEn: 'What does BEP cost?',
    answerNl: 'BEP is beschikbaar vanaf €499/maand voor het Starter-pakket. Bekijk onze pricing-pagina voor alle pakketten en mogelijkheden. We bieden ook een gratis Data Scan aan om je besparingspotentieel in kaart te brengen.',
    answerEn: 'BEP is available from €499/month for the Starter plan. Check our pricing page for all plans and options. We also offer a free Data Scan to map your savings potential.',
  },
  {
    questionNl: 'Kan BEP ook daadwerkelijk taken uitvoeren?',
    questionEn: 'Can BEP actually execute tasks?',
    answerNl: 'Ja, dat is wat BEP uniek maakt. BEP vindt niet alleen het antwoord, maar voert ook de actie uit. Denk aan het bijwerken van records in je CRM, het versturen van statusupdates naar klanten, het genereren van rapportages, of het aanmaken van taken in je projectmanagement tool.',
    answerEn: 'Yes, that is what makes BEP unique. BEP doesn\'t just find the answer, it also executes the action. Think of updating records in your CRM, sending status updates to customers, generating reports, or creating tasks in your project management tool.',
  },
]

export function FAQ({ faqs }: { faqs?: FAQItem[] }) {
  const { t } = useLang()
  const items = faqs || defaultFaqs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => toggle(i)}>
            {t(faq.questionNl, faq.questionEn)}
            <ChevronDown size={20} />
          </button>
          <div className="faq-answer">
            <div className="faq-answer-inner">
              {t(faq.answerNl, faq.answerEn)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
