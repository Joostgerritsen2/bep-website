'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, Database, Zap, CreditCard, Scale, ArrowRight, Check, X, Minus } from 'lucide-react'

const comparisonRows = [
  {
    criteriaNl: '100% eigen cloud',
    criteriaEn: '100% own cloud',
    bep: 'check',
    copilot: 'cross',
    glean: 'partial',
    watermelon: 'cross',
  },
  {
    criteriaNl: 'Verbindt ALLE data',
    criteriaEn: 'Connects ALL data',
    bep: 'check',
    copilot: 'partial',
    copilotNote: 'M365',
    glean: 'check',
    watermelon: 'cross',
  },
  {
    criteriaNl: 'Voert taken uit',
    criteriaEn: 'Executes tasks',
    bep: 'check',
    copilot: 'partial',
    copilotNote: 'Office',
    glean: 'cross',
    watermelon: 'cross',
  },
  {
    criteriaNl: 'Transparante prijs',
    criteriaEn: 'Transparent pricing',
    bep: 'check',
    bepNote: '\u20ac499/mo',
    copilot: 'partial',
    copilotNote: '\u20ac21/user',
    glean: 'cross',
    gleanNote: 'offerte',
    watermelon: 'check',
  },
  {
    criteriaNl: 'EU AI Act compliant',
    criteriaEn: 'EU AI Act compliant',
    bep: 'check',
    copilot: 'partial',
    glean: 'partial',
    watermelon: 'cross',
  },
  {
    criteriaNl: 'Open-source AI',
    criteriaEn: 'Open-source AI',
    bep: 'check',
    copilot: 'cross',
    glean: 'partial',
    watermelon: 'cross',
  },
]

function StatusIcon({ status }: { status: string }) {
  if (status === 'check') return <span className="check"><Check size={16} /></span>
  if (status === 'cross') return <span className="cross"><X size={16} /></span>
  return <span className="partial"><Minus size={16} /></span>
}

export function WhyBepContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Waarom BEP', 'Why BEP')}</span>
            <h1>
              {t('Stop met 10 AI tools.', 'Stop using 10 AI tools.')}<br />
              <span className="highlight">{t('Begin met 1 bedrijfsexpert.', 'Start with 1 business expert.')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Geen chatbot. Geen copilot. BEP is de nieuwe bedrijfsexpert die al je data verbindt, doorzoekt \u00e9n acties uitvoert.',
                'Not a chatbot. Not a copilot. BEP is the new business expert that connects all your data, searches it and executes actions.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="section section-white">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Vergelijking', 'Comparison')}</span>
              <h2>{t('BEP vs. de rest', 'BEP vs. the rest')}</h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>{t('Criteria', 'Criteria')}</th>
                  <th>BEP</th>
                  <th>MS Copilot</th>
                  <th>Glean</th>
                  <th>Watermelon</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i}>
                    <td>{t(row.criteriaNl, row.criteriaEn)}</td>
                    <td>
                      <StatusIcon status={row.bep} />
                      {row.bepNote && <small> ({row.bepNote})</small>}
                    </td>
                    <td>
                      <StatusIcon status={row.copilot} />
                      {row.copilotNote && <small> ({row.copilotNote})</small>}
                    </td>
                    <td>
                      <StatusIcon status={row.glean} />
                      {row.gleanNote && <small> ({row.gleanNote})</small>}
                    </td>
                    <td>
                      <StatusIcon status={row.watermelon} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        </div>
      </section>

      {/* ===== 5 USPs ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Onze voordelen', 'Our advantages')}</span>
              <h2>{t('Wat BEP uniek maakt', 'What makes BEP unique')}</h2>
            </div>
          </FadeUp>
          <div className="usp-grid">
            <FadeUp delay={0.1}>
              <div className="usp-card">
                <div className="icon"><Shield size={24} /></div>
                <h3>{t('100% Data Soevereiniteit', '100% Data Sovereignty')}</h3>
                <p>
                  {t(
                    'Jouw data blijft in jouw cloud. Geen Amerikaanse servers, geen vendor lock-in. Volledig GDPR-compliant en EU AI Act ready.',
                    'Your data stays in your cloud. No American servers, no vendor lock-in. Fully GDPR-compliant and EU AI Act ready.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="usp-card">
                <div className="icon"><Database size={24} /></div>
                <h3>{t('Verbindt ALLE Bedrijfsdata', 'Connects ALL Business Data')}</h3>
                <p>
                  {t(
                    'Niet alleen Microsoft of Google. BEP koppelt ERP, CRM, e-mail, documenten, databases \u2014 alles in \u00e9\u00e9n doorzoekbare kennisbank.',
                    'Not just Microsoft or Google. BEP connects ERP, CRM, email, documents, databases \u2014 everything in one searchable knowledge base.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="usp-card">
                <div className="icon"><Zap size={24} /></div>
                <h3>{t('Vindt \u00e9n Doet', 'Finds and Acts')}</h3>
                <p>
                  {t(
                    'Andere tools zoeken alleen. BEP voert ook taken uit: e-mails versturen, records bijwerken, rapportages genereren. Volledig autonoom.',
                    'Other tools only search. BEP also executes tasks: sending emails, updating records, generating reports. Fully autonomous.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="usp-card">
                <div className="icon"><CreditCard size={24} /></div>
                <h3>{t('Transparante Prijzen', 'Transparent Pricing')}</h3>
                <p>
                  {t(
                    'Vaste maandprijs vanaf \u20ac499. Geen verborgen kosten, geen per-user licenties die uit de hand lopen bij groei.',
                    'Fixed monthly price from \u20ac499. No hidden costs, no per-user licenses that get out of hand as you grow.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="usp-card" style={{ gridColumn: '1 / -1' }}>
                <div className="icon"><Scale size={24} /></div>
                <h3>{t('Gaat je kennis bijna met pensioen?', 'Is your knowledge about to retire?')}</h3>
                <p>
                  {t(
                    'Elke organisatie heeft medewerkers die met jarenlange ervaring vertrekken. BEP vangt die kennis op voordat het te laat is. Maak institutionele kennis beschikbaar voor iedereen.',
                    'Every organization has employees who leave with years of experience. BEP captures that knowledge before it\'s too late. Make institutional knowledge available to everyone.'
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
            <h2>{t('Ontdek wat BEP voor jou kan betekenen', 'Discover what BEP can do for you')}</h2>
            <p>{t('Bouw je persoonlijke plan in 2 minuten', 'Build your personal plan in 2 minutes')}</p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white">
                {t('Demo aanvragen', 'Request demo')} <ArrowRight size={18} />
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
