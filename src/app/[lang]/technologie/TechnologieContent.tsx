'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import {
  Brain,
  Database,
  Lightbulb,
  Plug,
  Server,
  Shield,
  Globe,
} from 'lucide-react'

const blocks = [
  {
    icon: Brain,
    color: '#F5861D',
    titleNl: 'Engine',
    titleEn: 'Engine',
    descriptionNl: 'De kern van BEP — meerdere RAG-strategieën die samenwerken voor optimale resultaten.',
    descriptionEn: 'The core of BEP — multiple RAG strategies working together for optimal results.',
    items: ['RAG', 'GRAPH-RAG', 'Agentic RAG', 'Branched RAG'],
  },
  {
    icon: Database,
    color: '#4dabf7',
    titleNl: 'Datastores',
    titleEn: 'Datastores',
    descriptionNl: 'Verbind elke databron zonder data te verplaatsen. BEP doorzoekt je bronnen waar ze staan.',
    descriptionEn: 'Connect any data source without moving data. BEP searches your sources where they are.',
    items: ['Documents', 'Databases', 'Websites', 'CRM', 'ERP'],
  },
  {
    icon: Lightbulb,
    color: '#da77f2',
    titleNl: 'Intelligence',
    titleEn: 'Intelligence',
    descriptionNl: 'Agents die leren, plannen en zelfstandig taken uitvoeren. Niet alleen zoeken, maar begrijpen.',
    descriptionEn: 'Agents that learn, plan and execute tasks autonomously. Not just searching, but understanding.',
    items: ['Claims', 'Agents', 'Planning', 'Learnability'],
  },
  {
    icon: Plug,
    color: '#69db7c',
    titleNl: 'Connectors',
    titleEn: 'Connectors',
    descriptionNl: 'Kant-en-klare koppelingen met de tools die je al gebruikt. Plug & play, geen maatwerk nodig.',
    descriptionEn: 'Ready-made connections to the tools you already use. Plug & play, no custom work needed.',
    items: ['Notion', 'Google Drive', 'Azure', 'Confluence', 'SharePoint', 'Salesforce'],
  },
  {
    icon: Server,
    color: '#ffd43b',
    titleNl: 'Infrastructuur',
    titleEn: 'Infrastructure',
    descriptionNl: 'Draai BEP waar jij wilt — in je eigen cloud, on-premise, of hybride. Jouw keuze.',
    descriptionEn: 'Run BEP wherever you want — in your own cloud, on-premise, or hybrid. Your choice.',
    items: ['AWS', 'Azure', 'Google Cloud', 'On-Premise', 'Hybrid', 'Multi-Cloud'],
  },
  {
    icon: Shield,
    color: '#ff6b6b',
    titleNl: 'Beveiliging',
    titleEn: 'Security',
    descriptionNl: 'Enterprise-grade beveiliging als fundament, niet als afterthought. Compliant vanaf dag één.',
    descriptionEn: 'Enterprise-grade security as foundation, not an afterthought. Compliant from day one.',
    items: ['End-to-end encryptie', 'Rol-gebaseerde toegang', 'Audit logging', 'Data isolatie', 'ISO 27001', 'GDPR compliant'],
  },
  {
    icon: Globe,
    color: '#74c0fc',
    titleNl: 'Integratie',
    titleEn: 'Integration',
    descriptionNl: 'Benader BEP zoals jij wilt — via API, web interface, mobiel of in je favoriete tools.',
    descriptionEn: 'Access BEP however you want — via API, web interface, mobile or in your favorite tools.',
    items: ['REST API', 'gRPC', 'GraphQL', 'Web GUI', 'Mobile App', 'Slack / Teams'],
  },
]

export function TechnologieContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Technologie', 'Technology')}</span>
            <h1>
              {t('Onder de ', 'Under the ')}
              <span className="highlight">{t('motorkap', 'hood')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'BEP is modulair opgebouwd. Elk onderdeel is uitwisselbaar, configureerbaar en draait in jouw omgeving. Mix & match precies wat jouw organisatie nodig heeft.',
                'BEP is built modularly. Every component is interchangeable, configurable and runs in your environment. Mix & match exactly what your organization needs.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Architectuur', 'Architecture')}</span>
              <h2>{t('Modulaire bouwblokken', 'Modular building blocks')}</h2>
              <p>
                {t(
                  'Elk blok staat op zichzelf en werkt naadloos samen. Configureer precies de stack die past bij jouw eisen.',
                  'Each block stands on its own and works seamlessly together. Configure exactly the stack that fits your requirements.'
                )}
              </p>
            </div>
          </FadeUp>
          <div className="tech-grid">
            {blocks.map((block, i) => {
              const Icon = block.icon
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="tech-card">
                    <div className="tech-card-header">
                      <div className="tech-card-icon" style={{ color: block.color, backgroundColor: `${block.color}15` }}>
                        <Icon size={24} />
                      </div>
                      <h3>{t(block.titleNl, block.titleEn)}</h3>
                    </div>
                    <p className="tech-card-desc">{t(block.descriptionNl, block.descriptionEn)}</p>
                    <div className="tech-card-items">
                      {block.items.map((item, j) => (
                        <span key={j} className="tech-tag" style={{ borderColor: `${block.color}30`, color: block.color }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Waarom dit ertoe doet', 'Why this matters')}</span>
              <h2>{t('Geen black box, maar transparante architectuur', 'No black box, but transparent architecture')}</h2>
            </div>
          </FadeUp>
          <div className="trust-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <FadeUp delay={0.1}>
              <div className="trust-card">
                <h3>{t('Volledige controle', 'Full control')}</h3>
                <p>{t(
                  'Elk onderdeel draait in jouw omgeving. Je bepaalt zelf welke modellen, datastores en connectoren je gebruikt.',
                  'Every component runs in your environment. You decide which models, datastores and connectors you use.'
                )}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="trust-card">
                <h3>{t('Toekomstbestendig', 'Future-proof')}</h3>
                <p>{t(
                  'Nieuwe AI-modellen? Andere cloud? Extra connectoren? Wissel elk blok uit zonder de rest te raken.',
                  'New AI models? Different cloud? Extra connectors? Swap any block without affecting the rest.'
                )}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="trust-card">
                <h3>{t('Enterprise-ready', 'Enterprise-ready')}</h3>
                <p>{t(
                  'ISO 27001, GDPR, EU AI Act — compliance is geen checkbox maar het fundament van de architectuur.',
                  'ISO 27001, GDPR, EU AI Act — compliance is not a checkbox but the foundation of the architecture.'
                )}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="cta-section orange-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Benieuwd naar de details?', 'Curious about the details?')}</h2>
            <p>{t(
              'We laten je graag zien hoe de architectuur eruitziet voor jouw situatie.',
              'We\'d love to show you what the architecture looks like for your situation.'
            )}</p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white btn-arrow">
                {t('Plan een technisch gesprek', 'Schedule a technical call')}
              </a>
              <Link href="/filosofie" className="btn btn-ghost btn-arrow">
                {t('Lees onze filosofie', 'Read our philosophy')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
