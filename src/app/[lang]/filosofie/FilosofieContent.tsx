'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, Code, Scale, Globe, ArrowRight } from 'lucide-react'

export function FilosofieContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Onze Filosofie', 'Our Philosophy')}</span>
            <h1>
              {t('Jouw data hoort bij jou.', 'Your data belongs to you.')}<br />
              <span className="highlight">{t('Punt.', 'Period.')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'De EU AI Act is er niet voor niets. Big Tech verdient miljarden aan jouw bedrijfsdata. Wij bouwen AI die van jou is, in jouw cloud, met modellen die je kunt inspecteren. Niet omdat het hip is. Omdat het de enige juiste manier is.',
                'The EU AI Act exists for a reason. Big Tech makes billions from your business data. We build AI that is yours, in your cloud, with models you can inspect. Not because it\'s trendy. Because it\'s the only right way.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== HET PROBLEEM ===== */}
      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Het Probleem', 'The Problem')}</span>
              <h2>{t('De ongemakkelijke waarheid', 'The uncomfortable truth')}</h2>
            </div>
          </FadeUp>
          <div className="trust-grid">
            <FadeUp delay={0.1}>
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3>{t('Big Tech als data-fabriek', 'Big Tech as data factory')}</h3>
                <p>
                  {t(
                    'Microsoft, Google, OpenAI \u2014 ze hebben je data nodig. Hun AI-modellen worden beter van jouw prompts, jouw documenten, jouw bedrijfsgeheimen. Dat is hun verdienmodel. Niet een bug, maar een feature.',
                    'Microsoft, Google, OpenAI \u2014 they need your data. Their AI models get better from your prompts, your documents, your business secrets. That\'s their business model. Not a bug, but a feature.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3>{t('Beloftes zonder bewijs', 'Promises without proof')}</h3>
                <p>
                  {t(
                    '"We trainen niet op jouw data." Maar je kunt het niet verifi\u00ebren. Je data kruist grenzen, passeert infrastructuur die je niet bezit, en wordt verwerkt door code die je niet kunt inspecteren. Vertrouwen is geen compliance-strategie.',
                    '"We don\'t train on your data." But you can\'t verify it. Your data crosses borders, passes through infrastructure you don\'t own, and is processed by code you can\'t inspect. Trust is not a compliance strategy.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3>{t('De EU zegt: genoeg', 'The EU says: enough')}</h3>
                <p>
                  {t(
                    'De EU AI Act eist transparantie, auditeerbaarheid en databescherming. De meeste AI-leveranciers worstelen om compliant te worden. Wij zijn er vanaf dag \u00e9\u00e9n voor ontworpen. Dat is geen toeval \u2014 dat is een keuze.',
                    'The EU AI Act demands transparency, auditability, and data protection. Most AI vendors are scrambling to comply. We designed for it from day one. That\'s not a coincidence \u2014 it\'s a choice.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== ONS ANTWOORD ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Ons Antwoord', 'Our Answer')}</span>
              <h2>{t('Open-source AI in jouw cloud', 'Open-source AI in your cloud')}</h2>
              <p>
                {t(
                  'Wij geloven niet dat je Big Tech moet vertrouwen met je bedrijfsdata. Wij geloven dat je het zelf moet kunnen controleren.',
                  'We don\'t believe you should trust Big Tech with your business data. We believe you should be able to control it yourself.'
                )}
              </p>
            </div>
          </FadeUp>
          <div className="capabilities-grid">
            <FadeUp delay={0.1}>
              <div className="capability-card">
                <div className="icon"><Code size={24} /></div>
                <h3>{t('Open-source modellen', 'Open-source models')}</h3>
                <p>
                  {t(
                    'Geen black box. De AI-modellen die BEP gebruikt zijn open-source: je kunt elke regel code inspecteren, auditen en aanpassen. Volledige transparantie, geen verborgen agenda.',
                    'No black box. The AI models BEP uses are open-source: you can inspect, audit, and modify every line of code. Full transparency, no hidden agenda.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="capability-card">
                <div className="icon"><Shield size={24} /></div>
                <h3>{t('Draait in jouw cloud', 'Runs in your cloud')}</h3>
                <p>
                  {t(
                    'BEP draait in jouw eigen Azure, AWS of GCP omgeving. Je data verlaat nooit je infrastructuur. Geen Amerikaanse servers, geen onduidelijke datastromen, geen verassingen bij een audit.',
                    'BEP runs in your own Azure, AWS, or GCP environment. Your data never leaves your infrastructure. No American servers, no unclear data flows, no surprises during an audit.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="capability-card">
                <div className="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <h3>{t('RAG-architectuur', 'RAG architecture')}</h3>
                <p>
                  {t(
                    'Je data blijft waar het is. BEP doorzoekt je bronnen via Retrieval-Augmented Generation \u2014 zonder je data te kopi\u00ebren, te verplaatsen of op te slaan buiten je eigen omgeving. Slim zoeken zonder risico.',
                    'Your data stays where it is. BEP searches your sources via Retrieval-Augmented Generation \u2014 without copying, moving, or storing your data outside your own environment. Smart search without risk.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="capability-card">
                <div className="icon"><Scale size={24} /></div>
                <h3>{t('Geen vendor lock-in', 'No vendor lock-in')}</h3>
                <p>
                  {t(
                    'Wij binden je niet vast. De modellen zijn open, de data is van jou, en je kunt op elk moment switchen. Omdat echte kwaliteit geen dwang nodig heeft.',
                    'We don\'t lock you in. The models are open, the data is yours, and you can switch at any time. Because real quality doesn\'t need coercion.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== ONZE PRINCIPES ===== */}
      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Onze Principes', 'Our Principles')}</span>
              <h2>{t('Waar wij voor staan', 'What we stand for')}</h2>
            </div>
          </FadeUp>
          <div className="trust-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <FadeUp delay={0.1}>
              <div className="trust-card">
                <div className="trust-icon"><Shield size={24} /></div>
                <h3>{t('Data verlaat nooit je omgeving', 'Data never leaves your environment')}</h3>
                <p>
                  {t(
                    'Jouw bedrijfsdata blijft in jouw cloud. Altijd. Geen uitzonderingen, geen kleine lettertjes, geen "maar voor analytics...".',
                    'Your business data stays in your cloud. Always. No exceptions, no fine print, no "but for analytics...".'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="trust-card">
                <div className="trust-icon"><Code size={24} /></div>
                <h3>{t('Volledige transparantie', 'Full transparency')}</h3>
                <p>
                  {t(
                    'Open-source AI die je kunt inspecteren en auditen. Geen verborgen algoritmes, geen geheime dataverwerking. Wat je ziet is wat je krijgt.',
                    'Open-source AI you can inspect and audit. No hidden algorithms, no secret data processing. What you see is what you get.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="trust-card">
                <div className="trust-icon"><Scale size={24} /></div>
                <h3>{t('Geen vendor lock-in', 'No vendor lock-in')}</h3>
                <p>
                  {t(
                    'Stap over wanneer je wilt. Je data, je modellen, je keuze. Wij verdienen je vertrouwen elke dag opnieuw \u2014 niet omdat je contract je dwingt.',
                    'Switch whenever you want. Your data, your models, your choice. We earn your trust every single day \u2014 not because your contract forces you.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="trust-card">
                <div className="trust-icon"><Globe size={24} /></div>
                <h3>{t('EU-first', 'EU-first')}</h3>
                <p>
                  {t(
                    'Ontworpen voor Europese regelgeving. GDPR, EU AI Act, data soevereiniteit \u2014 geen afterthought, maar het fundament waarop alles is gebouwd.',
                    'Designed for European regulation. GDPR, EU AI Act, data sovereignty \u2014 not an afterthought, but the foundation everything is built on.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Klaar om het anders te doen?', 'Ready to do things differently?')}</h2>
            <p>
              {t(
                'Ontdek hoe BEP jouw data beschermt \u00e9n voor je laat werken. Zonder concessies.',
                'Discover how BEP protects your data and makes it work for you. Without compromise.'
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
