'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, Lock, Code, MessageSquare } from 'lucide-react'
import { cases } from './cases/caseData'
import Image from 'next/image'
import { HeroAgent } from '@/components/HeroAgent'
import { HeroDots } from '@/components/HeroDots'
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
        <HeroDots />
        <div className="container">
          <div className="hero-split">
            <div className="hero-text">
              <FadeUp>
                <h1>
                  {t('Het AI-platform met Agents', 'The AI platform with Agents')}<br />
                  <em className="highlight-text">{t('voor je hele organisatie.', 'for your entire organisation.')}</em>
                </h1>
                <p className="subtitle">
                  {t(
                    'BEP helpt organisaties AI praktisch in te zetten in meerdere afdelingen. De Agents werken op basis van jullie data, systemen en processen en kunnen zelfstandig werk oppakken.',
                    'BEP helps organisations use AI practically across multiple departments. The Agents work based on your data, systems and processes and can handle work autonomously.'
                  )}
                </p>
                <div className="hero-buttons">
                  <a href="/demo" className="btn btn-primary btn-arrow">
                    {t('Plan een demo', 'Schedule a demo')}
                  </a>
                  <Link href="/cases" className="btn btn-ghost btn-arrow">
                    {t('Bekijk cases', 'View cases')}
                  </Link>
                </div>
                {/* Hero Stats */}
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-num orange">2–4</span>
                    <span className="hero-stat-label">{t('weken tot live', 'weeks to live')}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-num">4</span>
                    <span className="hero-stat-label">{t('actieve cases', 'active cases')}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-num orange">100%</span>
                    <span className="hero-stat-label">{t('eigen cloud', 'your own cloud')}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-num">0</span>
                    <span className="hero-stat-label">{t('data buiten je omgeving', 'data outside your env')}</span>
                  </div>
                </div>
                <p className="hero-built-by">
                  {t('Gebouwd en ontwikkeld door', 'Built and developed by')}{' '}
                  <a href="https://www.stekz.com" target="_blank" rel="noopener" className="hero-built-by-link">Stekz</a>
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <HeroAgent />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== VERTROUWENSBLOK ===== */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar-items">
            {[
              { nl: 'Live in 2 tot 4 weken', en: 'Live in 2 to 4 weeks' },
              { nl: 'Draait in je eigen cloud of on-premise', en: 'Runs in your own cloud or on-premise' },
              { nl: 'Data blijft in je eigen omgeving', en: 'Data stays in your own environment' },
              { nl: 'Werkt op basis van je eigen bronnen', en: 'Works based on your own sources' },
              { nl: 'Antwoorden met bronvermelding', en: 'Answers with source references' },
            ].map((item, i) => (
              <div key={i} className="trust-bar-item">
                <span className="trust-bar-check">✓</span>
                {t(item.nl, item.en)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE METRICS ===== */}
      <section className="case-metrics-section">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Bewezen resultaten', 'Proven results')}</span>
            <h2>{t('BEP werkt. In de praktijk.', 'BEP works. In practice.')}</h2>
          </FadeUp>
          <div className="case-metrics-grid">
            <FadeUp delay={0.05}>
              <Link href="/cases/tender-strateeg" className="metric-card">
                <span className="metric-sector">{t('Consultancy · Aanbestedingen', 'Consultancy · Tenders')}</span>
                <span className="metric-num">60%</span>
                <span className="metric-result-label">{t('tijdsbesparing per tender', 'time saved per tender')}</span>
                <p className="metric-desc">{t('500+ documenten doorzoekbaar. Minder handwerk, meer gewonnen aanbestedingen.', '500+ documents searchable. Less manual work, more tenders won.')}</p>
                <span className="metric-client">Tender Strateeg →</span>
              </Link>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link href="/cases/groningen-seaports" className="metric-card metric-card--alt">
                <span className="metric-sector">{t('Havenbeheer · Logistiek', 'Port management · Logistics')}</span>
                <span className="metric-num">3.5×</span>
                <span className="metric-result-label">{t('ROI in jaar 1', 'ROI in year 1')}</span>
                <p className="metric-desc">{t('24/7 operationele kennis beschikbaar voor 200+ medewerkers en klanten.', '24/7 operational knowledge available for 200+ staff and clients.')}</p>
                <span className="metric-client">Groningen Seaports →</span>
              </Link>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Link href="/cases/sjb-advies" className="metric-card">
                <span className="metric-sector">{t('Financieel Advies', 'Financial Advisory')}</span>
                <span className="metric-num">4.2×</span>
                <span className="metric-result-label">{t('ROI op jaarbasis', 'ROI per year')}</span>
                <p className="metric-desc">{t('10.000+ klantdossiers doorzoekbaar. Dienstverlening 40% sneller.', '10,000+ client files searchable. Service delivery 40% faster.')}</p>
                <span className="metric-client">SJB Advies →</span>
              </Link>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link href="/cases/bpz" className="metric-card metric-card--alt">
                <span className="metric-sector">{t('Productie · Manufacturing', 'Production · Manufacturing')}</span>
                <span className="metric-num">0</span>
                <span className="metric-result-label">{t('kennisincidenten na go-live', 'knowledge incidents after go-live')}</span>
                <p className="metric-desc">{t('80 jaar vakkennis geborgd in 2 weken. Nooit meer kennis die verdwijnt met mensen.', '80 years of expertise secured in 2 weeks. Never lose knowledge when people leave.')}</p>
                <span className="metric-client">BPZ →</span>
              </Link>
            </FadeUp>
          </div>
          <FadeUp delay={0.25}>
            <div className="case-metrics-footer">
              <Link href="/cases" className="btn btn-outline btn-arrow">
                {t('Alle cases bekijken', 'View all cases')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== HOE BEP WERKT ===== */}
      <section className="section section-gray bep-motif dark-glow">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Hoe BEP werkt', 'How BEP works')}</span>
              <h2>{t('BEP pakt het op. Jij hoeft er niet aan te denken.', 'BEP picks it up. You don\'t have to think about it.')}</h2>
              <p>{t(
                'BEP monitort je processen continu en pakt taken op voordat jij eraan toe komt.',
                'BEP continuously monitors your processes and picks up tasks before you get to them.'
              )}</p>
            </div>
          </FadeUp>

          <div className="bep-flow">
            <FadeUp delay={0.1}>
              <div className="bep-flow-step">
                <div className="bep-flow-num">01</div>
                <h3>{t('Koppelen', 'Connect')}</h3>
                <p>{t(
                  'BEP sluit aan op je CRM, ERP, e-mail, documenten en agenda\'s. Jouw data blijft waar hij staat. BEP leest mee.',
                  'BEP connects to your CRM, ERP, email, documents and calendars. Your data stays where it is. BEP reads along.'
                )}</p>
              </div>
            </FadeUp>
            <div className="bep-flow-arrow" aria-hidden="true">→</div>
            <FadeUp delay={0.2}>
              <div className="bep-flow-step">
                <div className="bep-flow-num">02</div>
                <h3>{t('Signaleren', 'Detect')}</h3>
                <p>{t(
                  'BEP bewaakt je processen continu. Stille prospect, openstaande factuur, aflopend contract: BEP ziet het voordat jij er aan toe komt.',
                  'BEP continuously monitors your processes. Silent prospect, outstanding invoice, expiring contract: BEP sees it before you get to it.'
                )}</p>
              </div>
            </FadeUp>
            <div className="bep-flow-arrow" aria-hidden="true">→</div>
            <FadeUp delay={0.3}>
              <div className="bep-flow-step">
                <div className="bep-flow-num">03</div>
                <h3>{t('Handelen', 'Act')}</h3>
                <p>{t(
                  'BEP stelt een actie voor of voert hem direct uit. Follow-up verstuurd, CRM bijgewerkt, deadline ingepland. Jij beslist of het automatisch gaat.',
                  'BEP proposes an action or executes it directly. Follow-up sent, CRM updated, deadline scheduled. You decide or it runs automatically.'
                )}</p>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="bep-scenario">
              <div className="bep-scenario-label">{t('Zo ziet dat eruit', 'What that looks like')}</div>
              <div className="bep-scenario-messages">
                <div className="bep-scenario-msg bep-scenario-msg--agent">
                  <span className="bep-scenario-dot" />
                  <div className="bep-scenario-bubble">
                    {t(
                      'Goedemorgen. Prospect Bakker B.V. heeft je voorstel 4× bekeken maar niet gereageerd. Ik heb een follow-up mail opgesteld.',
                      'Good morning. Prospect Bakker B.V. has viewed your proposal 4× but hasn\'t responded. I\'ve drafted a follow-up email.'
                    )}
                  </div>
                </div>
                <div className="bep-scenario-msg bep-scenario-msg--user">
                  <div className="bep-scenario-bubble">{t('Stuur maar.', 'Send it.')}</div>
                </div>
                <div className="bep-scenario-msg bep-scenario-msg--agent">
                  <span className="bep-scenario-dot" />
                  <div className="bep-scenario-bubble">
                    {t(
                      'Verstuurd. Ik plan over 3 dagen een herinnering in als er geen reactie is.',
                      'Sent. I\'ll schedule a reminder in 3 days if there\'s no response.'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
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


      {/* ===== BLOG / INZICHTEN ===== */}
      {latestPosts.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <FadeUp>
              <div className="section-header">
                <span className="section-label">{t('Inzichten', 'Insights')}</span>
                <h2>{t('Onze visie', 'Our vision')}</h2>
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



      {/* Autoriteit / Ecosysteem */}
      <section className="authority-section">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2>{t('Niet zomaar een AI-tool.', 'Not just another AI tool.')}</h2>
              <p style={{ maxWidth: '560px', margin: '0 auto' }}>
                {t(
                  'BEP is gebouwd door het team achter de grootste tech-community events van Noord-Nederland.',
                  'BEP is built by the team behind the largest tech community events in the Northern Netherlands.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="authority-grid">
            <FadeUp delay={0.1}>
              <a
                href="https://www.stekz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo">
                  <Image
                    src="https://www.stekz.com/images/logo.svg"
                    alt="Stekz"
                    width={120}
                    height={32}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="authority-card-name">Stekz</div>
                <div className="authority-card-desc">
                  {t('Het IT bedrijf van Noord-Nederland', 'The IT company of Northern Netherlands')}
                </div>
              </a>
            </FadeUp>

            <FadeUp delay={0.2}>
              <a
                href="https://aigrunn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo">
                  <Image
                    src="https://aigrunn.org/wp-content/uploads/2023/10/cropped-robot-1280.png"
                    alt="AIGrunn"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="authority-card-name">AIGrunn</div>
                <div className="authority-card-desc">
                  {t('AI Tech Event voor software professionals', 'AI Tech Event for software professionals')}
                </div>
              </a>
            </FadeUp>

            <FadeUp delay={0.3}>
              <a
                href="https://pygrunn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo authority-card-logo--text">
                  <span className="pygrunn-badge">PyGrunn</span>
                </div>
                <div className="authority-card-name">PyGrunn</div>
                <div className="authority-card-desc">
                  {t('Python & friends conference', 'Python & friends conference')}
                </div>
              </a>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="authority-events">
              <div className="authority-events-label">{t('Upcoming events', 'Upcoming events')}</div>
              <div className="authority-events-list">
                <a href="https://aigrunn.org" target="_blank" rel="noopener noreferrer" className="authority-event-item">
                  <div className="authority-event-date">
                    <span className="authority-event-day">14</span>
                    <span className="authority-event-month">{t('NOV', 'NOV')}</span>
                  </div>
                  <div className="authority-event-info">
                    <div className="authority-event-name">AIGrunn 2025</div>
                    <div className="authority-event-meta">{t('Groningen · AI Tech Conference voor developers', 'Groningen · AI Tech Conference for developers')}</div>
                  </div>
                  <div className="authority-event-badge">{t('Open', 'Open')}</div>
                </a>
                <a href="https://pygrunn.org" target="_blank" rel="noopener noreferrer" className="authority-event-item">
                  <div className="authority-event-date">
                    <span className="authority-event-day">16</span>
                    <span className="authority-event-month">{t('MEI', 'MAY')}</span>
                  </div>
                  <div className="authority-event-info">
                    <div className="authority-event-name">PyGrunn 2025</div>
                    <div className="authority-event-meta">{t('Groningen · Python & friends conference', 'Groningen · Python & friends conference')}</div>
                  </div>
                  <div className="authority-event-badge authority-event-badge--full">{t('Vol', 'Full')}</div>
                </a>
                <a href="https://www.stekz.com" target="_blank" rel="noopener noreferrer" className="authority-event-item">
                  <div className="authority-event-date">
                    <span className="authority-event-day">Q1</span>
                    <span className="authority-event-month">{t("'26", "'26")}</span>
                  </div>
                  <div className="authority-event-info">
                    <div className="authority-event-name">{t('Workshop AI voor CEO\'s & DGA\'s', 'Workshop AI for CEOs')}</div>
                    <div className="authority-event-meta">{t('Noord-Nederland · Stekz Academy', 'Northern Netherlands · Stekz Academy')}</div>
                  </div>
                  <div className="authority-event-badge">{t('Binnenkort', 'Soon')}</div>
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== SOVEREIGNTY BLOCK ===== */}
      <section className="sovereignty-section dark-glow">
        <div className="container">
          <div className="sovereignty-inner">
            <FadeUp>
              <div className="sovereignty-left">
                <span className="section-label">{t('Waarom BEP anders is', 'Why BEP is different')}</span>
                <h2>
                  {t('Jouw organisatie leert.', 'Your organization learns.')}<br />
                  <em>{t('Jouw data blijft van jou.', 'Your data stays yours.')}</em>
                </h2>
                <p>
                  {t(
                    'BEP is geen generieke copiloot. Het is een bedrijfsplatform dat jouw systemen verbindt, jouw context begrijpt en autonoom handelt, volledig in jouw eigen cloud.',
                    'BEP is not a generic copilot. It is a business platform that connects your systems, understands your context and acts autonomously, entirely in your own cloud.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ul className="sovereignty-pillars">
                {[
                  {
                    titleNl: 'Geen AI-onzin',
                    titleEn: 'No AI hallucinations',
                    descNl: 'Antwoorden op jouw eigen bedrijfsdata, met bronvermelding. Niet op internet, niet gegenereerd uit het niets.',
                    descEn: 'Answers from your own business data, with source citations. Not from the internet, not generated from nothing.',
                  },
                  {
                    titleNl: 'Data soevereiniteit',
                    titleEn: 'Data sovereignty',
                    descNl: '100% on-prem of eigen cloud. Jouw data verlaat nooit jouw omgeving. GDPR-proof, EU AI Act-ready.',
                    descEn: '100% on-prem or own cloud. Your data never leaves your environment. GDPR-proof, EU AI Act-ready.',
                  },
                  {
                    titleNl: 'Open & uitbreidbaar',
                    titleEn: 'Open & expandable',
                    descNl: 'Niet gebonden aan één leverancier. Open-source AI-modellen, maandelijks uitbreidbaar zonder nieuw traject.',
                    descEn: 'Not bound to one vendor. Open-source AI models, monthly expansion without new quotation process.',
                  },
                  {
                    titleNl: 'Menselijke controle',
                    titleEn: 'Human control',
                    descNl: 'BEP handelt autonoom maar je behoudt altijd overzicht. Alles is traceerbaar en controleerbaar ingericht.',
                    descEn: 'BEP acts autonomously but you always maintain oversight. Everything is designed to be traceable and controllable.',
                  },
                ].map((pillar) => (
                  <li key={pillar.titleNl} className="sovereignty-pillar">
                    <span className="sovereignty-dot" />
                    <div>
                      <span className="sovereignty-pillar-title">{t(pillar.titleNl, pillar.titleEn)}</span>
                      <span className="sovereignty-pillar-desc">{t(pillar.descNl, pillar.descEn)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== QUOTES ===== */}
      <section className="quotes-section section section-gray">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Klanten aan het woord', 'Clients speak')}</span>
          </FadeUp>
          <div className="quotes-grid">
            {cases.slice(0, 2).map((c, i) => (
              c.quote && (
                <FadeUp key={c.slug} delay={i * 0.1}>
                  <blockquote className="quote-card">
                    <span className="quote-mark" aria-hidden="true">"</span>
                    <p className="quote-text">{t(c.quote.text.nl, c.quote.text.en)}</p>
                    <footer className="quote-footer">
                      <cite className="quote-author">{c.quote.author}</cite>
                    </footer>
                  </blockquote>
                </FadeUp>
              )
            ))}
          </div>
        </div>
      </section>

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

      {/* ===== HOE KOM IK LIVE ===== */}
      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">{t('Implementatie', 'Implementation')}</span>
              <h2>{t('Live in 4 weken.', 'Live in 4 weeks.')}</h2>
              <p style={{ maxWidth: '480px', margin: '0 auto' }}>
                {t(
                  'Geen jarenlange trajecten. Geen IT-afdeling nodig. BEP draait binnen een maand in jouw eigen cloud.',
                  'No years-long projects. No IT department needed. BEP runs in your own cloud within a month.'
                )}
              </p>
            </div>
          </FadeUp>
          <div className="onboarding-timeline">
            {[
              {
                week: '01',
                titleNl: 'Kickoff & koppelingen', titleEn: 'Kickoff & connections',
                descNl: 'We inventariseren jouw systemen en domeinen. Koppelingen met ERP, CRM, e-mail en documenten worden opgezet.',
                descEn: 'We map your systems and domains. Connections to ERP, CRM, email and documents are set up.',
              },
              {
                week: '02',
                titleNl: 'Data indexering', titleEn: 'Data indexing',
                descNl: 'BEP verwerkt en indexeert jouw bedrijfsdata. De kennisbank wordt opgebouwd en doorzoekbaar gemaakt.',
                descEn: 'BEP processes and indexes your business data. The knowledge base is built and made searchable.',
              },
              {
                week: '03',
                titleNl: 'Eerste agents live', titleEn: 'First agents live',
                descNl: 'De eerste autonome agents gaan live. Ze bewaken deadlines, signaleren kansen en stellen acties voor.',
                descEn: 'The first autonomous agents go live. They monitor deadlines, flag opportunities and suggest actions.',
              },
              {
                week: '04',
                titleNl: 'Team aan boord', titleEn: 'Team on board',
                descNl: 'Jouw team werkt met BEP. Onboarding sessie, eerste resultaten zichtbaar, feedback verwerkt.',
                descEn: 'Your team works with BEP. Onboarding session, first results visible, feedback processed.',
              },
            ].map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="onboarding-step">
                  <div className="onboarding-week">
                    {t(`Week ${step.week}`, `Week ${step.week}`)}
                  </div>
                  {i < 3 && <div className="onboarding-connector" />}
                  <div className="onboarding-content">
                    <div className="onboarding-title">{t(step.titleNl, step.titleEn)}</div>
                    <div className="onboarding-desc">{t(step.descNl, step.descEn)}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section orange-glow dark-glow">
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
              <a href="/demo" className="btn btn-white btn-arrow">
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
