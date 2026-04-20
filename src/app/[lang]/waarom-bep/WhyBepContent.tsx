'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Shield, Database, Zap, CreditCard, Scale, Check, X, Minus, TrendingUp, Brain, AlertTriangle, Globe } from 'lucide-react'

const comparisonRows = [
  {
    criteriaNl: 'Prijs (25 gebruikers)',
    criteriaEn: 'Price (25 users)',
    bep:     { status: 'check',   note: '\u20ac595/maand vast' },
    copilot: { status: 'cross',   note: '\u20ac750/maand + M365 licentie' },
    glean:   { status: 'cross',   note: 'min. \u20ac4.000/maand' },
    gpt:     { status: 'cross',   note: 'min. 150 users vereist' },
  },
  {
    criteriaNl: 'Data blijft in eigen cloud',
    criteriaEn: 'Data stays in own cloud',
    bep:     { status: 'check',   note: '100% jouw infra' },
    copilot: { status: 'partial', note: 'Microsoft servers' },
    glean:   { status: 'partial', note: 'Beheerd door Glean' },
    gpt:     { status: 'cross',   note: 'OpenAI cloud (VS)' },
  },
  {
    criteriaNl: 'Koppelt ERP, CRM en e-mail',
    criteriaEn: 'Connects ERP, CRM and email',
    bep:     { status: 'check',   note: 'SAP, Exact, Salesforce, Outlook...' },
    copilot: { status: 'partial', note: 'Alleen Microsoft ecosysteem' },
    glean:   { status: 'check',   note: '100+ connectoren' },
    gpt:     { status: 'partial', note: 'Via maatwerk / API' },
  },
  {
    criteriaNl: 'Proactieve agents',
    criteriaEn: 'Proactive agents',
    bep:     { status: 'check',   note: 'Handelt zonder dat jij vraagt' },
    copilot: { status: 'partial', note: 'Beperkt via Copilot Studio' },
    glean:   { status: 'partial', note: 'Nieuw, nog beperkt (2025)' },
    gpt:     { status: 'partial', note: 'Operator feature, beperkt' },
  },
  {
    criteriaNl: 'Open-source AI modellen',
    criteriaEn: 'Open-source AI models',
    bep:     { status: 'check',   note: 'Llama, Mistral, Qwen' },
    copilot: { status: 'cross',   note: 'Alleen OpenAI modellen' },
    glean:   { status: 'cross',   note: 'Gesloten modellen' },
    gpt:     { status: 'cross',   note: 'Alleen OpenAI modellen' },
  },
  {
    criteriaNl: 'EU AI Act compliant',
    criteriaEn: 'EU AI Act compliant',
    bep:     { status: 'check',   note: 'By design vanaf dag 1' },
    copilot: { status: 'partial', note: 'EU Data Boundary, maar flex routing' },
    glean:   { status: 'partial', note: 'EMEA regio beschikbaar' },
    gpt:     { status: 'partial', note: 'EU data residency (feb 2025)' },
  },
  {
    criteriaNl: 'Live in minder dan 4 weken',
    criteriaEn: 'Live in less than 4 weeks',
    bep:     { status: 'check',   note: 'Vaste onboarding in 4 weken' },
    copilot: { status: 'partial', note: 'Afhankelijk van IT afdeling' },
    glean:   { status: 'cross',   note: 'Enterprise sales traject' },
    gpt:     { status: 'partial', note: 'Afhankelijk van integraties' },
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
      <section className="hero dark-glow">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Waarom BEP', 'Why BEP')}</span>
            <h1>
              {t('Stop met 10 AI tools.', 'Stop using 10 AI tools.')}<br />
              <span className="highlight">{t('Begin met 1 bedrijfsexpert.', 'Start with 1 business expert.')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Geen chatbot. Geen copilot. BEP is de nieuwe bedrijfsexpert die proactief meekijkt, kansen signaleert en taken oppakt, voordat jij eraan denkt.',
                'Not a chatbot. Not a copilot. BEP is the new business expert that proactively monitors, flags opportunities and handles tasks, before you even think of it.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== DE WERELD VERANDERT ===== */}
      <section className="section section-dark why-change-section">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">{t('De context', 'The context')}</span>
              <h2 style={{ maxWidth: '680px', margin: '0 auto 16px' }}>
                {t(
                  'De manier waarop bedrijven werken verandert fundamenteel.',
                  'The way businesses operate is changing fundamentally.'
                )}
              </h2>
              <p style={{ maxWidth: '560px', margin: '0 auto', color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: '1.65' }}>
                {t(
                  'Organisaties die nu niet investeren in kennisinfrastructuur verliezen binnen drie jaar hun concurrentiepositie aan bedrijven die wél met AI werken.',
                  'Organisations that don\'t invest in knowledge infrastructure now will lose their competitive position within three years to companies that do work with AI.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="why-change-grid">
            {[
              {
                icon: TrendingUp,
                statNl: '70%', statEn: '70%',
                labelNl: 'van bedrijfstijd gaat op aan zoeken, vergaderen en administratie',
                labelEn: 'of business time is spent searching, meeting and administration',
              },
              {
                icon: Brain,
                statNl: '85%', statEn: '85%',
                labelNl: 'van bedrijfskennis is nooit vastgelegd en zit alleen in hoofden van mensen',
                labelEn: 'of business knowledge is never documented and exists only in people\'s heads',
              },
              {
                icon: AlertTriangle,
                statNl: '40%', statEn: '40%',
                labelNl: 'van de waardevolle kennis verdwijnt als een senior medewerker vertrekt',
                labelEn: 'of valuable knowledge disappears when a senior employee leaves',
              },
              {
                icon: Globe,
                statNl: '3×', statEn: '3×',
                labelNl: 'sneller groeien organisaties die AI inzetten voor kenniswerk',
                labelEn: 'faster growth for organisations that use AI for knowledge work',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="why-change-card">
                    <div className="why-change-icon"><Icon size={20} /></div>
                    <div className="why-change-stat">{t(item.statNl, item.statEn)}</div>
                    <p className="why-change-label">{t(item.labelNl, item.labelEn)}</p>
                  </div>
                </FadeUp>
              )
            })}
          </div>

          <FadeUp delay={0.4}>
            <p className="why-change-conclusion">
              {t(
                'BEP is het antwoord. Geen generiek AI-tool, maar een platform dat jouw specifieke bedrijfskennis verbindt, bewaart en actief inzet.',
                'BEP is the answer. Not a generic AI tool, but a platform that connects, preserves and actively deploys your specific business knowledge.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="section why-compare-section">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">{t('Vergelijking', 'Comparison')}</span>
              <h2>{t('BEP vs. de markt', 'BEP vs. the market')}</h2>
              <p style={{ maxWidth: '520px', margin: '0 auto' }}>
                {t('Wat betaal je echt? Wat krijg je echt?', 'What do you actually pay? What do you actually get?')}
              </p>
            </div>
          </FadeUp>

          {/* Cost reality cards */}
          <FadeUp delay={0.1}>
            <p className="cost-compare-intro">
              {t('Wat kost het bij 25 gebruikers per maand?', 'What does it cost for 25 users per month?')}
            </p>
          </FadeUp>
          <div className="cost-compare-grid">
            {[
              {
                name: 'MS Copilot',
                perUser: t('€30 /user/maand', '€30 /user/month'),
                totalNl: '€750/maand',
                totalEn: '€750/month',
                totalNoteNl: '+ verplichte M365 licentie (€22–33/user)',
                totalNoteEn: '+ mandatory M365 licence (€22–33/user)',
                catchNl: ['Werkt alleen in Microsoft ecosysteem', 'Data op Microsoft servers', 'Elke nieuwe medewerker kost extra'],
                catchEn: ['Works only in Microsoft ecosystem', 'Data on Microsoft servers', 'Every new employee costs extra'],
                isBep: false,
              },
              {
                name: 'Glean',
                perUser: t('~€50 /user/maand', '~€50 /user/month'),
                totalNl: '>€4.000/maand',
                totalEn: '>€4,000/month',
                totalNoteNl: 'Minimum €50.000/jaar. Altijd sales call.',
                totalNoteEn: 'Minimum €50,000/year. Always requires sales call.',
                catchNl: ['Beheerd door Glean, niet jijzelf', 'Hoge instapdrempel', 'Geen proactieve agents'],
                catchEn: ['Managed by Glean, not you', 'High minimum spend', 'No proactive agents'],
                isBep: false,
              },
              {
                name: 'ChatGPT Enterprise',
                perUser: t('~€50+ /user/maand', '~€50+ /user/month'),
                totalNl: 'Niet beschikbaar',
                totalEn: 'Not available',
                totalNoteNl: 'Minimum 150 gebruikers vereist.',
                totalNoteEn: 'Minimum 150 users required.',
                catchNl: ['Niet beschikbaar bij kleine teams', 'Data op OpenAI servers (VS)', 'ERP/CRM vereist maatwerk'],
                catchEn: ['Not available for small teams', 'Data on OpenAI servers (US)', 'ERP/CRM requires custom work'],
                isBep: false,
              },
              {
                name: 'BEP',
                perUser: t('Geen kosten per gebruiker', 'No per-user costs'),
                totalNl: '€595/maand',
                totalEn: '€595/month',
                totalNoteNl: 'Vaste prijs per pakket. Niet per gebruiker.',
                totalNoteEn: 'Fixed price per plan. Not per user.',
                catchNl: ['100% in jouw eigen cloud', 'Verbindt ERP, CRM, e-mail, documenten', 'Proactief: handelt zonder dat jij vraagt'],
                catchEn: ['100% in your own cloud', 'Connects ERP, CRM, email, documents', 'Proactive: acts without being asked'],
                isBep: true,
              },
            ].map((card, i) => (
              <FadeUp key={card.name} delay={i * 0.08}>
                <div className={`cost-compare-card ${card.isBep ? 'cost-compare-card--bep' : 'cost-compare-card--competitor'}`}>
                  <div className="cost-compare-name">{card.name}</div>
                  <div className="cost-compare-per-user">{card.perUser}</div>
                  <div className="cost-compare-total">
                    <span className="cost-compare-total-num">{t(card.totalNl, card.totalEn)}</span>
                    <span className="cost-compare-total-note">{t(card.totalNoteNl, card.totalNoteEn)}</span>
                  </div>
                  <ul className="cost-compare-list">
                    {card.catchNl.map((_, j) => (
                      <li key={j}>
                        <span className={card.isBep ? 'cost-check' : 'cost-cross'}>{card.isBep ? '✓' : '✗'}</span>
                        {t(card.catchNl[j], card.catchEn[j])}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Positioning chart */}
          <FadeUp delay={0.3}>
            <div className="positioning-wrap">
              <p className="positioning-title">
                {t('Waar staat BEP in de markt?', 'Where does BEP sit in the market?')}
              </p>
              <div className="positioning-chart">
                {/* Axes */}
                <div className="pos-axis-y">
                  <span>{t('Proactief', 'Proactive')}</span>
                  <span>{t('Reactief', 'Reactive')}</span>
                </div>
                <div className="pos-axis-x">
                  <span>{t('Data bij leverancier', 'Data at vendor')}</span>
                  <span>{t('Volledige data controle', 'Full data control')}</span>
                </div>

                {/* Grid lines */}
                <div className="pos-grid" />

                {/* Quadrant label */}
                <div className="pos-quad-label" style={{ top: '8%', right: '6%' }}>
                  {t('Ideaal', 'Ideal')}
                </div>

                {/* Competitors */}
                {[
                  { name: 'Notion AI',          x: 14, y: 74, bep: false },
                  { name: 'Guru',               x: 18, y: 60, bep: false },
                  { name: 'ChatGPT Ent.',        x: 30, y: 48, bep: false },
                  { name: 'MS Copilot',         x: 44, y: 44, bep: false },
                  { name: 'Glean',              x: 60, y: 42, bep: false },
                  { name: 'BEP',                x: 83, y: 10, bep: true  },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className={`pos-dot ${tool.bep ? 'pos-dot--bep' : 'pos-dot--competitor'}`}
                    style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
                  >
                    <span className="pos-dot-label">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Feature table */}
          <FadeUp delay={0.5}>
            <div className="compare-table-wrap">
              <table className="comparison-table-new">
                <thead>
                  <tr>
                    <th>{t('Criteria', 'Criteria')}</th>
                    <th className="col-bep">BEP</th>
                    <th>MS Copilot</th>
                    <th>Glean</th>
                    <th>ChatGPT Ent.</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td className="criteria-cell">{t(row.criteriaNl, row.criteriaEn)}</td>
                      <td className="col-bep">
                        <StatusIcon status={row.bep.status} />
                        <span className="table-note">{row.bep.note}</span>
                      </td>
                      <td>
                        <StatusIcon status={row.copilot.status} />
                        <span className="table-note">{row.copilot.note}</span>
                      </td>
                      <td>
                        <StatusIcon status={row.glean.status} />
                        <span className="table-note">{row.glean.note}</span>
                      </td>
                      <td>
                        <StatusIcon status={row.gpt.status} />
                        <span className="table-note">{row.gpt.note}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="compare-disclaimer">
                {t(
                  'Prijzen gebaseerd op publiek beschikbare informatie (april 2025). Concurrentprijzen zijn schattingen waar geen officiële pricing beschikbaar is.',
                  'Prices based on publicly available information (April 2025). Competitor prices are estimates where no official pricing is available.'
                )}
              </p>
            </div>
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
                    'Niet alleen Microsoft of Google. BEP koppelt ERP, CRM, e-mail, documenten, databases: alles in \u00e9\u00e9n doorzoekbare kennisbank.',
                    'Not just Microsoft or Google. BEP connects ERP, CRM, email, documents, databases: everything in one searchable knowledge base.'
                  )}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="usp-card">
                <div className="icon"><Zap size={24} /></div>
                <h3>{t('Proactief, niet reactief', 'Proactive, not reactive')}</h3>
                <p>
                  {t(
                    'Andere tools wachten tot je iets vraagt. BEP kijkt proactief mee: signaleert stille klanten, pakt openstaande taken op en bereidt voorstellen voor. Zonder dat je erom hoeft te vragen.',
                    'Other tools wait until you ask. BEP proactively monitors: flags quiet clients, picks up outstanding tasks and prepares proposals. Without you having to ask.'
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

      {/* ===== ECOSYSTEEM ===== */}
      <section className="authority-section">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2>{t('Gebouwd door mensen die het weten.', 'Built by people who know.')}</h2>
              <p style={{ maxWidth: '520px', margin: '0 auto', color: 'rgba(255,255,255,0.55)' }}>
                {t(
                  'BEP komt voort uit het ecosysteem van Stekz, het team dat AIGrunn en PyGrunn organiseert. Events voor en door developers.',
                  'BEP comes from the Stekz ecosystem, the team that organises AIGrunn and PyGrunn. Events for and by developers.'
                )}
              </p>
            </div>
          </FadeUp>
          <div className="authority-grid" style={{ marginTop: '40px' }}>
            <FadeUp delay={0.1}>
              <a href="https://www.stekz.com" target="_blank" rel="noopener noreferrer" className="authority-card">
                <div className="authority-card-name">Stekz</div>
                <div className="authority-card-desc">{t('Het IT bedrijf van Noord-Nederland', 'The IT company of Northern Netherlands')}</div>
              </a>
            </FadeUp>
            <FadeUp delay={0.2}>
              <a href="https://aigrunn.org" target="_blank" rel="noopener noreferrer" className="authority-card">
                <div className="authority-card-name">AIGrunn</div>
                <div className="authority-card-desc">{t('AI Tech Event voor software professionals', 'AI Tech Event for software professionals')}</div>
              </a>
            </FadeUp>
            <FadeUp delay={0.3}>
              <a href="https://pygrunn.org" target="_blank" rel="noopener noreferrer" className="authority-card">
                <div className="authority-card-name">PyGrunn</div>
                <div className="authority-card-desc">{t('Python & friends conference', 'Python & friends conference')}</div>
              </a>
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
