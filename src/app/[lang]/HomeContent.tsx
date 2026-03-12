'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, CheckCircle, FileText, MessageSquare, Zap, ArrowRight, Lock, Code } from 'lucide-react'
import Image from 'next/image'
import { HeroDemo } from '@/components/HeroDemo'
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
                  BEP — {t('De digitale expert die', 'The digital expert that')}<br />
                  <span className="highlight gradient-text">{t('meedraait in je team.', 'works alongside your team.')}</span>
                </h1>
                <p className="subtitle">
                  {t(
                    'Stel een vraag, krijg direct antwoord uit al je systemen. BEP doorzoekt je ERP, CRM, e-mail en documenten — als een collega die alles weet.',
                    'Ask a question, get instant answers from all your systems. BEP searches your ERP, CRM, email and documents — like a colleague who knows everything.'
                  )}
                </p>
                <div className="hero-buttons">
                  <a href="/contact" className="btn btn-primary">
                    {t('Plan een sessie', 'Schedule a session')} <ArrowRight size={18} />
                  </a>
                  <Link href="/cases" className="btn btn-ghost">
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
              <HeroDemo />
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

      {/* ===== CAPABILITIES ===== */}
      <section className="section section-gray bep-motif">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Wat BEP kan', 'What BEP can do')}</span>
              <h2>{t('Zo werkt BEP in de praktijk', 'How BEP works in practice')}</h2>
            </div>
          </FadeUp>
          <div className="capabilities-grid">
            <FadeUp delay={0.1}>
              <div className="capability-card">
                <div className="icon"><FileText size={24} /></div>
                <h3>{t('Alles weten', 'Know everything')}</h3>
                <p>
                  {t(
                    'BEP kent al je bedrijfsdata. Documenten, e-mails, ERP-data, CRM-records — automatisch geïndexeerd en altijd actueel.',
                    'BEP knows all your business data. Documents, emails, ERP data, CRM records — automatically indexed and always up to date.'
                  )}
                </p>
                <ul>
                  <li>{t('Automatisch indexeren', 'Automatic indexing')}</li>
                  <li>{t('Real-time synchronisatie', 'Real-time sync')}</li>
                  <li>{t('Versiebeheer', 'Version control')}</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="capability-card">
                <div className="icon"><MessageSquare size={24} /></div>
                <h3>{t('Gewoon vragen', 'Just ask')}</h3>
                <p>
                  {t(
                    'Stel vragen zoals je dat aan een collega doet. BEP zoekt direct in al je systemen en geeft een concreet antwoord.',
                    'Ask questions like you would ask a colleague. BEP instantly searches all your systems and gives a concrete answer.'
                  )}
                </p>
                <ul>
                  <li>{t('Natuurlijke taal', 'Natural language')}</li>
                  <li>{t('Cross-systeem zoeken', 'Cross-system search')}</li>
                  <li>{t('Contextbewust', 'Context-aware')}</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="capability-card">
                <div className="icon"><Zap size={24} /></div>
                <h3>{t('Direct regelen', 'Get it done')}</h3>
                <p>
                  {t(
                    'BEP vindt niet alleen het antwoord, maar regelt het ook. E-mail versturen, CRM bijwerken, rapportage maken — automatisch.',
                    'BEP doesn\'t just find the answer, it gets things done. Send email, update CRM, create reports — automatically.'
                  )}
                </p>
                <ul>
                  <li>{t('E-mails versturen', 'Send emails')}</li>
                  <li>{t('Records bijwerken', 'Update records')}</li>
                  <li>{t('Rapportages genereren', 'Generate reports')}</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== SECURITY & TECHNOLOGIE (merged) ===== */}
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

      {/* ===== CASE STUDY ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Resultaten', 'Results')}</span>
              <h2>{t('BEP in de praktijk', 'BEP in practice')}</h2>
            </div>
          </FadeUp>
          <div className="case-content">
            <FadeUp>
              <div className="case-text">
                <h3>{t('Productiebedrijf — 150 medewerkers', 'Manufacturing company — 150 employees')}</h3>
                <p>
                  {t(
                    'Een productiebedrijf met data verspreid over SAP, Outlook, SharePoint en Excel implementeerde BEP om alle bedrijfskennis te ontsluiten en processen te automatiseren.',
                    'A manufacturing company with data spread across SAP, Outlook, SharePoint and Excel implemented BEP to unlock all business knowledge and automate processes.'
                  )}
                </p>
                <div className="case-quote">
                  <p>
                    {t(
                      '"Onze salesmedewerkers hoeven niet meer 4 systemen te raadplegen voor een klantupdate. Ze vragen het aan BEP en het is geregeld."',
                      '"Our sales staff no longer need to consult 4 systems for a client update. They ask BEP and it\'s done."'
                    )}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <Image src="/images/team-member-4.png" alt="" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    <cite>— Operations Manager</cite>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="case-stats">
                <div className="case-stat">
                  <div className="value">80%</div>
                  <div className="label">{t('Minder zoektijd', 'Less search time')}</div>
                </div>
                <div className="case-stat">
                  <div className="value">4.2x</div>
                  <div className="label">ROI</div>
                </div>
                <div className="case-stat">
                  <div className="value">2</div>
                  <div className="label">{t('Weken implementatie', 'Weeks implementation')}</div>
                </div>
                <div className="case-stat">
                  <div className="value">150+</div>
                  <div className="label">{t('Gebruikers', 'Users')}</div>
                </div>
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
                <h2>{t('Thought leadership', 'Thought leadership')}</h2>
                <p>{t('Onze visie op AI, data-soevereiniteit en de toekomst van bedrijfsintelligentie.', 'Our vision on AI, data sovereignty and the future of business intelligence.')}</p>
              </div>
            </FadeUp>
            <div className="home-blog-grid">
              {latestPosts.map((post: any, i: number) => (
                <FadeUp key={post._id || i} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug?.current}`} className="blog-card">
                    <div className="blog-card-body">
                      <span className="blog-category" style={{ background: 'rgba(245,134,29,0.15)', color: 'var(--orange)' }}>
                        {post.category === 'ai' ? 'AI' : post.category === 'business' ? 'Business' : post.category || 'Insight'}
                      </span>
                      <h3>{t(post.title, post.titleEn)}</h3>
                      <p>{t(post.excerpt, post.excerptEn)?.slice(0, 140)}...</p>
                      <span className="blog-read-more">
                        {t('Lees meer', 'Read more')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.4}>
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Link href="/blog" className="btn btn-outline">
                  {t('Bekijk alle artikelen', 'View all articles')} <ArrowRight size={16} />
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
                'Ontdek wat BEP voor jouw organisatie kan betekenen. Plan een sessie en zie het zelf.',
                'Discover what BEP can do for your organization. Schedule a session and see for yourself.'
              )}
            </p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white">
                {t('Plan een sessie', 'Schedule a session')} <ArrowRight size={18} />
              </a>
              <Link href="/contact" className="btn btn-ghost">
                {t('Neem contact op', 'Get in touch')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
