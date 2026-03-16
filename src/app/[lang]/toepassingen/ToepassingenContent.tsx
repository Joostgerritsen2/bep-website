'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { TrendingUp, CreditCard, HeadphonesIcon, BookOpen, ArrowRight } from 'lucide-react'

const useCases = [
  {
    icon: TrendingUp,
    color: '#F5861D',
    titleNl: 'BEP voor Sales',
    titleEn: 'BEP for Sales',
    descriptionNl: 'Je Sales Agent houdt je pipeline scherp. Signaleert stille prospects, bereidt follow-ups voor en stelt offertes samen op basis van eerdere deals.',
    descriptionEn: 'Your Sales Agent keeps your pipeline sharp. Flags quiet prospects, prepares follow-ups and compiles quotes based on previous deals.',
    examplesNl: [
      'Prospect heeft voorstel 3x bekeken maar niet gereageerd → follow-up mail klaar',
      'Nieuwe lead past bij profiel van gewonnen deal → automatisch verrijkt met context',
      'Kwartaalrapport sales pipeline → samengesteld en verstuurd naar management',
    ],
    examplesEn: [
      'Prospect viewed proposal 3x but didn\'t respond → follow-up email ready',
      'New lead matches profile of won deal → automatically enriched with context',
      'Quarterly sales pipeline report → compiled and sent to management',
    ],
  },
  {
    icon: CreditCard,
    color: '#4dabf7',
    titleNl: 'BEP voor Finance',
    titleEn: 'BEP for Finance',
    descriptionNl: 'Je Finance Agent bewaakt deadlines, signaleert afwijkingen en bereidt rapportages voor. Geen factuur valt meer tussen wal en schip.',
    descriptionEn: 'Your Finance Agent monitors deadlines, flags anomalies and prepares reports. No invoice falls through the cracks anymore.',
    examplesNl: [
      'Factuur 5 dagen over deadline → automatisch herinnering ingepland',
      'Ongebruikelijke uitgave gedetecteerd → melding naar financieel verantwoordelijke',
      'Maandafsluiting → alle data verzameld en rapport gegenereerd',
    ],
    examplesEn: [
      'Invoice 5 days overdue → automatic reminder scheduled',
      'Unusual expense detected → notification to financial manager',
      'Month-end close → all data collected and report generated',
    ],
  },
  {
    icon: HeadphonesIcon,
    color: '#da77f2',
    titleNl: 'BEP voor Support',
    titleEn: 'BEP for Support',
    descriptionNl: 'Je Support Agent herkent patronen in klantvragen, maakt kennisartikelen aan en zorgt dat terugkerende problemen structureel worden opgelost.',
    descriptionEn: 'Your Support Agent recognizes patterns in customer questions, creates knowledge articles and ensures recurring issues are structurally resolved.',
    examplesNl: [
      '8 vergelijkbare tickets deze week → kennisartikel aangemaakt en gedeeld',
      'Klant stelt vraag die eerder beantwoord is → direct antwoord met bronvermelding',
      'Nieuwe feature veroorzaakt vragen → samenvatting doorgestuurd naar product team',
    ],
    examplesEn: [
      '8 similar tickets this week → knowledge article created and shared',
      'Customer asks previously answered question → instant answer with source reference',
      'New feature causing questions → summary forwarded to product team',
    ],
  },
  {
    icon: BookOpen,
    color: '#69db7c',
    titleNl: 'BEP voor Kennismanagement',
    titleEn: 'BEP for Knowledge Management',
    descriptionNl: 'Je Knowledge Agent indexeert alle bedrijfsdocumenten, ontsluit jarenlange expertise en zorgt dat kennis beschikbaar blijft — ook als ervaren medewerkers vertrekken.',
    descriptionEn: 'Your Knowledge Agent indexes all company documents, unlocks years of expertise and ensures knowledge remains available — even when experienced employees leave.',
    examplesNl: [
      'Nieuwe beleidsdocumenten automatisch geïndexeerd en doorzoekbaar',
      'Senior medewerker gaat met pensioen → alle kennis vastgelegd en beschikbaar',
      '"Hoe deden we dit vorig jaar?" → antwoord met exacte bronvermelding in seconden',
    ],
    examplesEn: [
      'New policy documents automatically indexed and searchable',
      'Senior employee retiring → all knowledge captured and available',
      '"How did we do this last year?" → answer with exact source reference in seconds',
    ],
  },
]

export function ToepassingenContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Toepassingen', 'Applications')}</span>
            <h1>
              {t('BEP voor ', 'BEP for ')}
              <span className="highlight">{t('elke afdeling', 'every department')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Specialistische AI agents die meedraaien in je team. Niet één tool voor alles, maar een expert per domein.',
                'Specialized AI agents that integrate into your team. Not one tool for everything, but an expert per domain.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {useCases.map((uc, i) => {
        const Icon = uc.icon
        return (
          <section
            key={i}
            className={`section ${i % 2 === 0 ? 'section-white' : 'section-gray'}`}
          >
            <div className="container">
              <FadeUp>
                <div className="usecase-block">
                  <div className="usecase-header">
                    <div className="usecase-icon" style={{ color: uc.color }}>
                      <Icon size={32} />
                    </div>
                    <div>
                      <h2>{t(uc.titleNl, uc.titleEn)}</h2>
                      <p className="usecase-description">{t(uc.descriptionNl, uc.descriptionEn)}</p>
                    </div>
                  </div>
                  <div className="usecase-examples">
                    <h3>{t('Voorbeelden', 'Examples')}</h3>
                    <ul>
                      {uc.examplesNl.map((_, j) => (
                        <li key={j}>{t(uc.examplesNl[j], uc.examplesEn[j])}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        )
      })}

      <section className="cta-section orange-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Welke agent past bij jouw team?', 'Which agent fits your team?')}</h2>
            <p>{t('Plan een gesprek en ontdek hoe BEP jouw afdeling kan versterken.', 'Schedule a call and discover how BEP can strengthen your department.')}</p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
              <Link href="/cases" className="btn btn-ghost btn-arrow">
                {t('Bekijk cases', 'View cases')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
