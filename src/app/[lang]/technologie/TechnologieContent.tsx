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
    titleNl: 'Engine',
    titleEn: 'Engine',
    descNl: 'Meerdere RAG-strategieën die parallel draaien. BEP kiest altijd de strategie die past bij de vraag.',
    descEn: 'Multiple RAG strategies running in parallel. BEP always picks the strategy that fits the question.',
    tags: ['RAG', 'Graph-RAG', 'Agentic RAG', 'Branched RAG'],
  },
  {
    icon: Lightbulb,
    titleNl: 'Intelligentie',
    titleEn: 'Intelligence',
    descNl: 'Agents die plannen, leren en zelfstandig taken uitvoeren. Niet wachten op een vraag, maar proactief handelen.',
    descEn: 'Agents that plan, learn and execute tasks autonomously. Not waiting for a question, but acting proactively.',
    tags: ['Autonome Agents', 'Planning', 'Claims', 'Learnability'],
  },
  {
    icon: Plug,
    titleNl: 'Connectoren',
    titleEn: 'Connectors',
    descNl: 'Kant-en-klare koppelingen met de systemen die je al gebruikt. Geen migratie, geen maatwerk.',
    descEn: 'Ready-made connections to the systems you already use. No migration, no custom work.',
    tags: ['SharePoint', 'Salesforce', 'Google Drive', 'Confluence', 'Notion'],
  },
  {
    icon: Database,
    titleNl: 'Databronnen',
    titleEn: 'Data sources',
    descNl: 'Documenten, databases, e-mail, CRM, ERP: BEP doorzoekt ze waar ze staan, zonder data te verplaatsen.',
    descEn: 'Documents, databases, email, CRM, ERP: BEP searches them where they live, without moving data.',
    tags: ['Documenten', 'Databases', 'Websites', 'CRM', 'ERP', 'E-mail'],
  },
  {
    icon: Server,
    titleNl: 'Infrastructuur',
    titleEn: 'Infrastructure',
    descNl: 'BEP draait in jouw eigen omgeving. Jij bepaalt de cloud, wij zorgen dat het werkt.',
    descEn: 'BEP runs in your own environment. You choose the cloud, we make it work.',
    tags: ['AWS', 'Azure', 'Google Cloud', 'On-Premise', 'Hybrid'],
  },
  {
    icon: Globe,
    titleNl: 'Integratie',
    titleEn: 'Integration',
    descNl: 'BEP sluit aan bij hoe jouw team werkt: via de web-interface, API, Slack of Teams.',
    descEn: 'BEP fits how your team works: via web interface, API, Slack or Teams.',
    tags: ['Web GUI', 'REST API', 'Slack / Teams', 'Mobile'],
  },
]

export function TechnologieContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero dark-glow">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Technologie', 'Technology')}</span>
            <h1>
              {t('Zo is ', 'How ')}
              <span className="highlight">BEP</span>
              {t(' gebouwd', ' is built')}
            </h1>
            <p className="subtitle">
              {t(
                'Modulaire architectuur. Wij richten het in op basis van jouw systemen en doelen en houden het draaiende.',
                'Modular architecture. We set it up based on your systems and goals and keep it running.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== TECH BLOCKS ===== */}
      <section className="section tech-dark-section">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {t('Architectuur', 'Architecture')}
              </span>
              <h2 style={{ color: '#fff' }}>
                {t('Zes bouwblokken. Eén platform.', 'Six building blocks. One platform.')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                {t(
                  'Elk onderdeel is uitwisselbaar. Nieuw AI-model? Andere cloud? Extra koppeling? We wisselen het uit zonder de rest aan te raken.',
                  'Every component is interchangeable. New AI model? Different cloud? Extra integration? We swap it without touching the rest.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="tech-blocks-grid">
            {blocks.map((block, i) => {
              const Icon = block.icon
              return (
                <FadeUp key={i} delay={i * 0.05}>
                  <div className="tech-block">
                    <div className="tech-block-top">
                      <div className="tech-block-icon">
                        <Icon size={22} />
                      </div>
                      <h3>{t(block.titleNl, block.titleEn)}</h3>
                    </div>
                    <p>{t(block.descNl, block.descEn)}</p>
                    <div className="tech-block-tags">
                      {block.tags.map((tag, j) => (
                        <span key={j} className="tech-block-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )
            })}
          </div>

          {/* Security foundation bar */}
          <FadeUp delay={0.5}>
            <div className="tech-security-bar">
              <div className="tech-security-bar-left">
                <Shield size={20} />
                <span>{t('Beveiliging', 'Security')}</span>
              </div>
              <p>{t('Enterprise-beveiliging loopt door alle lagen heen: end-to-end encryptie, RBAC, audit logging, GDPR-compliant en ISO 27001.', 'Enterprise security runs through all layers: end-to-end encryption, RBAC, audit logging, GDPR-compliant and ISO 27001.')}</p>
              <div className="tech-block-tags">
                {['End-to-end encryptie', 'RBAC', 'Audit logging', 'GDPR', 'ISO 27001'].map((tag, i) => (
                  <span key={i} className="tech-block-tag">{tag}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== PRINCIPLES ===== */}
      <section className="section tech-dark-section">
        <div className="container">
          <div className="tech-principles-grid">
            <FadeUp delay={0.1}>
              <div className="tech-principle-card">
                <div className="tech-principle-num">01</div>
                <h3>{t('Wij richten het in', 'We configure it')}</h3>
                <p>{t('BEP is geen self-service tool. Wij bouwen de architectuur op basis van jouw systemen en doelen en houden die draaiende.', 'BEP is not a self-service tool. We build the architecture based on your systems and goals and keep it running.')}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="tech-principle-card">
                <div className="tech-principle-num">02</div>
                <h3>{t('Toekomstbestendig', 'Future-proof')}</h3>
                <p>{t('Elk blok is uitwisselbaar. Nieuw AI-model beschikbaar? Andere cloud? Extra koppeling? We wisselen het uit zonder de rest aan te raken.', 'Every block is interchangeable. New AI model available? Different cloud? Extra integration? We swap it without touching the rest.')}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="tech-principle-card">
                <div className="tech-principle-num">03</div>
                <h3>{t('Compliance als fundament', 'Compliance as foundation')}</h3>
                <p>{t('ISO 27001, GDPR, EU AI Act: niet als checkbox achteraf, maar als ontwerpregel van dag één.', 'ISO 27001, GDPR, EU AI Act: not a checkbox afterthought, but a design rule from day one.')}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section dark-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Benieuwd hoe dit eruitziet voor jouw situatie?', 'Curious what this looks like for your situation?')}</h2>
            <p>{t('We lopen graag door de architectuur heen op basis van jouw systemen.', 'We\'d love to walk through the architecture based on your systems.')}</p>
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
