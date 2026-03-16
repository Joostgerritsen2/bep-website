'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, CheckCircle, Database, GitBranch, Bot, Users, ArrowRight, Lock, Code } from 'lucide-react'
import { cases } from './cases/caseData'
import Image from 'next/image'
import { EcosystemVisual } from '@/components/EcosystemVisual'
import dynamic from 'next/dynamic'


const FAQ = dynamic(
  () => import('@/components/FAQ').then(m => ({ default: m.FAQ })),
  { loading: () => <div style={{ minHeight: 300 }} /> }
)

export function HomeContent({ latestPosts = [] }: { latestPosts?: any[] }) {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero hero-new">
        <div className="hero-bg-mesh" />
        <div className="container">
          <div className="hero-split">
            <div className="hero-text">
              <FadeUp>
                <h1>
                  BEP{' '}
                  <span className="gradient-text">{t('je nieuwe bedrijfsexpert', 'your new business expert')}</span>
                </h1>
                <p className="subtitle">
                  {t(
                    'BEP verbindt al je bedrijfsdata, doorzoekt alles en voert taken uit. Volledig autonoom, volledig in je eigen cloud.',
                    'BEP connects all your business data, searches everything and executes tasks. Fully autonomous, fully in your own cloud.'
                  )}
                </p>
                <div className="hero-buttons">
                  <a href="/contact" className="btn btn-primary btn-arrow">
                    {t('Plan een demo', 'Schedule a demo')}
                  </a>
                  <Link href="/cases" className="btn btn-ghost btn-arrow">
                    {t('Bekijk cases', 'View cases')}
                  </Link>
                </div>
                <div className="hero-team">
                  <div className="hero-team-faces">
                    {[
                      { id: 2, name: 'Berco', role: 'AI Whisperer' },
                      { id: 3, name: 'Sven', role: 'Knowledge Magician' },
                      { id: 1, name: 'Sietse', role: 'Making Things Work' },
                      { id: 4, name: 'Jeroen', role: 'Partner Intelligence Lead' },
                      { id: 6, name: 'Jelle', role: 'Product Enchanter' },
                    ].map((member, idx) => (
                      <div key={member.id} className="hero-team-member" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <Image
                          src={`/images/team-member-${member.id}.png`}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="hero-team-photo"
                          {...(idx < 3 ? { priority: true } : {})}
                        />
                        <div className="hero-team-info">
                          <span className="hero-team-name">{member.name}</span>
                          <span className="hero-team-role">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="hero-team-tagline">
                    {t('Gebouwd vanuit Groningen door mensen die het begrijpen', 'Built from Groningen by people who understand')}
                  </p>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <EcosystemVisual />
            </FadeUp>
          </div>
          <FadeUp delay={0.4}>
            <div className="hero-badges">
              <div className="hero-badge">
                <Shield size={16} /> {t('100% eigen cloud', '100% your own cloud')}
              </div>
              <div className="hero-badge">
                <CheckCircle size={16} /> GDPR Compliant
              </div>
              <div className="hero-badge">
                <CheckCircle size={16} /> EU AI Act Ready
              </div>
              <div className="hero-badge">
                <CheckCircle size={16} /> Open-source AI
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== CLIENT LOGOS ===== */}
      <section className="client-logos">
        <div className="container">
          <div className="client-logos-label">
            {t('Vertrouwd door', 'Trusted by')}
          </div>
          <div className="client-logos-grid">
            <Image src="/images/client-tender-strateeg.png" alt="Tender Strateeg" width={140} height={40} style={{ objectFit: 'contain' }} />
            <Image src="/images/client-groningen-seaports.png" alt="Groningen Seaports" width={140} height={40} style={{ objectFit: 'contain' }} />
            <Image src="/images/client-sjb-advies.png" alt="SJB Advies" width={140} height={40} style={{ objectFit: 'contain' }} />
            <Image src="/images/client-bpz.png" alt="BPZ" width={100} height={40} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* ===== 4 LAYERS — Art direction concept ===== */}
      <section className="section section-gray bep-motif">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Hoe BEP werkt', 'How BEP works')}</span>
              <h2>{t('Een operationele AI-laag door je hele organisatie', 'An operational AI layer across your entire organization')}</h2>
            </div>
          </FadeUp>
          <div className="capabilities-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <FadeUp delay={0.1}>
              <div className="capability-card">
                <div className="icon"><Database size={24} /></div>
                <h3>{t('Systemen & Data', 'Systems & Data')}</h3>
                <p>
                  {t(
                    'CRM, ERP, e-mail, support, documenten, agenda\'s, interne kennis en externe databronnen — alles verbonden in één laag.',
                    'CRM, ERP, email, support, documents, calendars, internal knowledge and external data sources — all connected in one layer.'
                  )}
                </p>
                <ul>
                  <li>{t('Automatisch geïndexeerd', 'Automatically indexed')}</li>
                  <li>{t('Real-time synchronisatie', 'Real-time sync')}</li>
                  <li>{t('Altijd actueel', 'Always up to date')}</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="capability-card">
                <div className="icon"><GitBranch size={24} /></div>
                <h3>{t('Operationele Processen', 'Operational Processes')}</h3>
                <p>
                  {t(
                    'Sales, onboarding, finance, customer support, operations — taken bewegen door je organisatie. Dossiers veranderen van status, approvals lopen door.',
                    'Sales, onboarding, finance, customer support, operations — tasks move through your organization. Cases change status, approvals flow through.'
                  )}
                </p>
                <ul>
                  <li>{t('Werkstromen geautomatiseerd', 'Workflows automated')}</li>
                  <li>{t('Cross-afdeling zichtbaarheid', 'Cross-department visibility')}</li>
                  <li>{t('Status tracking', 'Status tracking')}</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="capability-card">
                <div className="icon"><Bot size={24} /></div>
                <h3>{t('AI Agents', 'AI Agents')}</h3>
                <p>
                  {t(
                    'Specialistische agents die samenwerken, taken uitvoeren, werk overdragen en mensen inschakelen waar nodig. Sales Agent, Support Agent, Finance Agent — als digitale collega\'s.',
                    'Specialized agents that collaborate, execute tasks, hand off work and involve humans when needed. Sales Agent, Support Agent, Finance Agent — as digital colleagues.'
                  )}
                </p>
                <ul>
                  <li>{t('Onderling samenwerken', 'Collaborate with each other')}</li>
                  <li>{t('Zelfstandig acties uitvoeren', 'Execute actions autonomously')}</li>
                  <li>{t('Beslissingen voorbereiden', 'Prepare decisions')}</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="capability-card">
                <div className="icon"><Users size={24} /></div>
                <h3>{t('Mensen in controle', 'Humans in control')}</h3>
                <p>
                  {t(
                    'Medewerkers reviewen, beslissen en sturen bij. Niet boven de AI als manager, maar naast de agents als collega\'s. AI vergroot je capaciteit, vervangt niet je organisatie.',
                    'Employees review, decide and adjust. Not above AI as managers, but alongside agents as colleagues. AI amplifies your capacity, doesn\'t replace your organization.'
                  )}
                </p>
                <ul>
                  <li>{t('Escalaties en uitzonderingen', 'Escalations and exceptions')}</li>
                  <li>{t('Voortgang en overzicht', 'Progress and oversight')}</li>
                  <li>{t('Menselijk oordeel waar nodig', 'Human judgment where needed')}</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== SECURITY & TECHNOLOGIE ===== */}
      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Technologie & Veiligheid', 'Technology & Security')}</span>
              <h2>{t('Jouw data, jouw controle', 'Your data, your control')}</h2>
              <p>{t(
                'Open-source AI in je eigen cloud. Geen compromissen op privacy, geen afhankelijkheid van Big Tech.',
                'Open-source AI in your own cloud. No compromises on privacy, no dependency on Big Tech.'
              )}</p>
            </div>
          </FadeUp>
          <div className="trust-grid">
            <FadeUp delay={0.1}>
              <div className="trust-card">
                <div className="trust-icon"><Shield size={28} /></div>
                <h3>{t('100% Eigen Cloud', '100% Your Own Cloud')}</h3>
                <p>{t(
                  'BEP draait volledig in jouw infrastructuur. Data verlaat nooit je omgeving. Azure, AWS, GCP of on-premise.',
                  'BEP runs entirely in your infrastructure. Data never leaves your environment. Azure, AWS, GCP or on-premise.'
                )}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="trust-card">
                <div className="trust-icon"><Lock size={28} /></div>
                <h3>GDPR & EU AI Act</h3>
                <p>{t(
                  'Volledig AVG-conform. EU AI Act-ready. Alle dataverwerking binnen de EU. Geen externe AI-afhankelijkheden.',
                  'Fully GDPR compliant. EU AI Act ready. All data processing within the EU. No external AI dependencies.'
                )}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="trust-card">
                <div className="trust-icon"><Code size={28} /></div>
                <h3>{t('Open-Source RAG', 'Open-Source RAG')}</h3>
                <p>{t(
                  'Antwoorden gebaseerd op jouw actuele bedrijfsdata via RAG-architectuur. Open-source modellen, volledige transparantie.',
                  'Answers based on your current business data via RAG architecture. Open-source models, full transparency.'
                )}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== CASES ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Resultaten', 'Results')}</span>
              <h2>{t('BEP in de praktijk', 'BEP in practice')}</h2>
            </div>
          </FadeUp>
          <div className="home-cases-grid">
            {cases.map((caseItem, i) => (
              <FadeUp key={caseItem.slug} delay={i * 0.1}>
                <Link href={`/cases/${caseItem.slug}`} className="home-case-card">
                  <div className="home-case-img">
                    {caseItem.coverImage ? (
                      <Image src={caseItem.coverImage} alt={caseItem.client} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="home-case-placeholder">
                        <Image src={caseItem.logo} alt={caseItem.client} width={120} height={40} style={{ objectFit: 'contain', opacity: 0.8 }} />
                      </div>
                    )}
                  </div>
                  <div className="home-case-body">
                    <span className="home-case-sector">{t(caseItem.sector.nl, caseItem.sector.en)}</span>
                    <h3>{caseItem.client}</h3>
                    <p>{t(caseItem.tagline.nl, caseItem.tagline.en)}</p>
                    <div className="home-case-stats">
                      {caseItem.stats.slice(0, 2).map(stat => (
                        <div key={stat.value} className="home-case-stat">
                          <span className="value">{stat.value}</span>
                          <span className="label">{t(stat.label.nl, stat.label.en)}</span>
                        </div>
                      ))}
                    </div>
                    <span className="blog-read-more">
                      {t('Bekijk case', 'View case')} →
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/cases" className="btn btn-outline btn-arrow">
                {t('Bekijk alle cases', 'View all cases')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== BLOG / INZICHTEN ===== */}
      {latestPosts.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <FadeUp>
              <div className="section-header">
                <span className="section-label">{t('Inzichten', 'Insights')}</span>
                <h2>{t('Thought leadership', 'Thought leadership')}</h2>
                <p>{t('Onze visie op AI, data-soevereiniteit en de toekomst van bedrijfsintelligentie.', 'Our vision on AI, data sovereignty and the future of business intelligence.')}</p>
              </div>
            </FadeUp>
            <div className="home-blog-grid">
              {latestPosts.map((post: any, i: number) => (
                <FadeUp key={post._id || i} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug?.current}`} className="blog-card">
                    <div className="blog-card-img">
                      {post.coverUrl ? (
                        <Image src={post.coverUrl} alt={t(post.title, post.titleEn) || ''} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div className="blog-card-placeholder" />
                      )}
                    </div>
                    <div className="blog-card-body">
                      <p className="blog-card-date">
                        {new Date(post.publishedAt).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
                        {post.author && ` · ${post.author}`}
                      </p>
                      <h3>{t(post.title, post.titleEn)}</h3>
                      <p>{t(post.excerpt, post.excerptEn)?.slice(0, 120)}...</p>
                      <span className="blog-read-more">
                        {t('Lees meer', 'Read more')} →
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.4}>
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Link href="/blog" className="btn btn-outline btn-arrow">
                  {t('Bekijk alle artikelen', 'View all articles')}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      )}


      {/* ===== FAQ ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">FAQ</span>
              <h2>{t('Veelgestelde vragen', 'Frequently asked questions')}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <FAQ />
          </FadeUp>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section orange-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Klaar om BEP te laten meedraaien?', 'Ready to let BEP join your team?')}</h2>
            <p>
              {t(
                'Ontdek wat BEP voor jouw organisatie kan betekenen. Plan een demo en zie het zelf.',
                'Discover what BEP can do for your organization. Schedule a demo and see for yourself.'
              )}
            </p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
              <Link href="/contact" className="btn btn-ghost btn-arrow">
                {t('Neem contact op', 'Get in touch')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
