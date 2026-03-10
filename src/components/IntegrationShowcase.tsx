'use client'
import { useState, useMemo, useCallback } from 'react'
import { useLang } from '@/lib/language'
import { Search, Check, ArrowRight, Plus, X, Phone, Calendar } from 'lucide-react'

const integrations = [
  { name: 'SAP', cat: 'erp' },
  { name: 'Exact Online', cat: 'erp' },
  { name: 'AFAS', cat: 'erp' },
  { name: 'Twinfield', cat: 'erp' },
  { name: 'Visma', cat: 'erp' },
  { name: 'Unit4', cat: 'erp' },
  { name: 'Snelstart', cat: 'erp' },
  { name: 'e-Boekhouden', cat: 'erp' },
  { name: 'Salesforce', cat: 'crm' },
  { name: 'HubSpot', cat: 'crm' },
  { name: 'Pipedrive', cat: 'crm' },
  { name: 'Microsoft Dynamics', cat: 'crm' },
  { name: 'Zoho CRM', cat: 'crm' },
  { name: 'ActiveCampaign', cat: 'crm' },
  { name: 'SharePoint', cat: 'docs' },
  { name: 'Google Drive', cat: 'docs' },
  { name: 'OneDrive', cat: 'docs' },
  { name: 'Dropbox', cat: 'docs' },
  { name: 'Confluence', cat: 'docs' },
  { name: 'Notion', cat: 'docs' },
  { name: 'Outlook', cat: 'comm' },
  { name: 'Gmail', cat: 'comm' },
  { name: 'Slack', cat: 'comm' },
  { name: 'Microsoft Teams', cat: 'comm' },
  { name: 'WhatsApp Business', cat: 'comm' },
  { name: 'Intercom', cat: 'comm' },
  { name: 'PostgreSQL', cat: 'data' },
  { name: 'MongoDB', cat: 'data' },
  { name: 'MySQL', cat: 'data' },
  { name: 'REST APIs', cat: 'data' },
  { name: 'GraphQL', cat: 'data' },
  { name: 'Webhooks', cat: 'data' },
  { name: 'SFTP / FTP', cat: 'data' },
  { name: 'CSV / Excel', cat: 'data' },
]

const categories = [
  { id: 'all', nl: 'Alles', en: 'All' },
  { id: 'erp', nl: 'ERP / Boekhouding', en: 'ERP / Accounting' },
  { id: 'crm', nl: 'CRM / Sales', en: 'CRM / Sales' },
  { id: 'docs', nl: 'Documenten', en: 'Documents' },
  { id: 'comm', nl: 'Communicatie', en: 'Communication' },
  { id: 'data', nl: 'Data & APIs', en: 'Data & APIs' },
]

interface Question {
  id: string
  nl: string
  en: string
  options: { nl: string; en: string; points: number }[]
}

const questions: Question[] = [
  {
    id: 'systems',
    nl: 'Hoeveel systemen gebruik je dagelijks?',
    en: 'How many systems do you use daily?',
    options: [
      { nl: '1-2 systemen', en: '1-2 systems', points: 1 },
      { nl: '3-5 systemen', en: '3-5 systems', points: 2 },
      { nl: '6-10 systemen', en: '6-10 systems', points: 3 },
      { nl: '10+ systemen', en: '10+ systems', points: 4 },
    ],
  },
  {
    id: 'searchTime',
    nl: 'Hoeveel tijd besteed je per dag aan informatie zoeken?',
    en: 'How much time do you spend daily searching for information?',
    options: [
      { nl: 'Minder dan 15 minuten', en: 'Less than 15 minutes', points: 1 },
      { nl: '15-30 minuten', en: '15-30 minutes', points: 2 },
      { nl: '30-60 minuten', en: '30-60 minutes', points: 3 },
      { nl: 'Meer dan 1 uur', en: 'More than 1 hour', points: 4 },
    ],
  },
  {
    id: 'knowledge',
    nl: 'Wat gebeurt er als een senior medewerker vertrekt?',
    en: 'What happens when a senior employee leaves?',
    options: [
      { nl: 'Geen probleem — alles is gedocumenteerd', en: 'No problem — everything is documented', points: 1 },
      { nl: 'Enig kennisverlies', en: 'Some knowledge loss', points: 2 },
      { nl: 'Significant kennisverlies', en: 'Significant knowledge loss', points: 3 },
      { nl: 'Kritiek — jarenlange kennis gaat verloren', en: 'Critical — years of knowledge is lost', points: 4 },
    ],
  },
  {
    id: 'sharing',
    nl: 'Hoe deel je data tussen afdelingen?',
    en: 'How do you share data between departments?',
    options: [
      { nl: 'Volledig automatisch', en: 'Fully automated', points: 1 },
      { nl: 'Gedeeltelijk automatisch', en: 'Partially automated', points: 2 },
      { nl: 'Handmatig (copy-paste, e-mail)', en: 'Manual (copy-paste, email)', points: 3 },
      { nl: 'Nauwelijks — ieder team werkt apart', en: 'Barely — each team works separately', points: 4 },
    ],
  },
  {
    id: 'employees',
    nl: 'Hoeveel medewerkers zoeken dagelijks in meerdere systemen?',
    en: 'How many employees search across multiple systems daily?',
    options: [
      { nl: '1-5 medewerkers', en: '1-5 employees', points: 1 },
      { nl: '5-15 medewerkers', en: '5-15 employees', points: 2 },
      { nl: '15-50 medewerkers', en: '15-50 employees', points: 3 },
      { nl: '50+ medewerkers', en: '50+ employees', points: 4 },
    ],
  },
]

const useCases: Record<string, { nl: string; en: string }> = {
  erp: {
    nl: 'Orderstatussen opvragen en klanten automatisch updaten',
    en: 'Query order statuses and automatically update clients',
  },
  crm: {
    nl: 'Klanthistorie doorzoeken over alle contactmomenten',
    en: 'Search client history across all contact moments',
  },
  docs: {
    nl: 'Documenten vinden en samenvatten over alle opslaglocaties',
    en: 'Find and summarize documents across all storage locations',
  },
  comm: {
    nl: 'E-mails en berichten doorzoeken op specifieke onderwerpen',
    en: 'Search emails and messages for specific topics',
  },
  data: {
    nl: 'Rapportages genereren uit meerdere databronnen',
    en: 'Generate reports from multiple data sources',
  },
}

function calculateScore(answers: Record<string, number>, systemCount: number): number {
  const questionPoints = Object.values(answers).reduce((sum, v) => sum + v, 0)
  const maxQuestionPoints = questions.length * 4
  const questionScore = (questionPoints / maxQuestionPoints) * 80

  const systemBonus = Math.min(systemCount, 10) * 2
  return Math.min(100, Math.round(questionScore + systemBonus))
}

function getScoreColor(score: number): string {
  if (score <= 30) return 'var(--green)'
  if (score <= 60) return 'var(--orange)'
  return '#ef4444'
}

function getScoreLabel(score: number, t: (nl: string, en: string) => string) {
  if (score <= 30) return t('Laag risico', 'Low risk')
  if (score <= 60) return t('Gemiddeld risico', 'Medium risk')
  return t('Hoog risico', 'High risk')
}

function getTimeSavings(answers: Record<string, number>): { hoursPerWeek: number; employeeMultiplier: number } {
  const searchTimeMap: Record<number, number> = { 1: 0.2, 2: 0.4, 3: 0.7, 4: 1.2 }
  const employeeMap: Record<number, number> = { 1: 3, 2: 10, 3: 30, 4: 75 }

  const hoursPerDay = searchTimeMap[answers.searchTime] || 0.5
  const employees = employeeMap[answers.employees] || 10

  return {
    hoursPerWeek: Math.round(hoursPerDay * 5 * employees * 0.6),
    employeeMultiplier: employees,
  }
}

export function IntegrationShowcase() {
  const { t, lang } = useLang()
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [customSystem, setCustomSystem] = useState('')

  // Assessment state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showScore, setShowScore] = useState(false)
  const [assessmentStarted, setAssessmentStarted] = useState(false)

  // Lead form
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '', preference: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const addCustom = () => {
    const name = customSystem.trim()
    if (name) {
      setSelected(prev => new Set(prev).add(name))
      setCustomSystem('')
    }
  }

  const filtered = useMemo(() => {
    let items = integrations
    if (activeCat !== 'all') items = items.filter(i => i.cat === activeCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(i => i.name.toLowerCase().includes(q))
    }
    return items
  }, [activeCat, search])

  const answerQuestion = (questionId: string, points: number) => {
    const newAnswers = { ...answers, [questionId]: points }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300)
    } else {
      setTimeout(() => setShowScore(true), 400)
    }
  }

  const score = showScore ? calculateScore(answers, selected.size) : 0
  const scoreColor = getScoreColor(score)
  const savings = showScore ? getTimeSavings(answers) : null

  // Get relevant use cases based on selected system categories
  const selectedCats = useMemo(() => {
    const cats = new Set<string>()
    const selectedArr = Array.from(selected)
    for (const name of selectedArr) {
      const integration = integrations.find(i => i.name === name)
      if (integration) cats.add(integration.cat)
      else cats.add('data') // custom systems default to data
    }
    return Array.from(cats).slice(0, 3)
  }, [selected])

  const insights = useMemo(() => {
    if (!showScore) return []
    const result: { nl: string; en: string }[] = []

    if (answers.searchTime >= 3) {
      result.push({
        nl: `Met ${savings?.employeeMultiplier || 10} medewerkers die dagelijks zoeken, verliest je organisatie naar schatting ${savings?.hoursPerWeek || 0} uur per week aan informatie zoeken.`,
        en: `With ${savings?.employeeMultiplier || 10} employees searching daily, your organization loses an estimated ${savings?.hoursPerWeek || 0} hours per week on information searching.`,
      })
    } else {
      result.push({
        nl: `Je team besteedt relatief weinig tijd aan zoeken, maar met ${selected.size} systemen is er ruimte voor verbetering.`,
        en: `Your team spends relatively little time searching, but with ${selected.size} systems there's room for improvement.`,
      })
    }

    if (answers.knowledge >= 3) {
      result.push({
        nl: 'Kennisverlies bij vertrek van medewerkers is een significant risico. BEP legt bedrijfskennis vast zodat deze beschikbaar blijft.',
        en: 'Knowledge loss when employees leave is a significant risk. BEP captures business knowledge so it remains available.',
      })
    } else {
      result.push({
        nl: 'Je kennisborging is op orde. BEP kan dit verder versterken door alle bronnen centraal doorzoekbaar te maken.',
        en: 'Your knowledge management is in order. BEP can strengthen this by making all sources centrally searchable.',
      })
    }

    if (answers.sharing >= 3) {
      result.push({
        nl: 'Handmatige datadeling tussen afdelingen kost tijd en leidt tot fouten. BEP verbindt systemen zodat data automatisch beschikbaar is.',
        en: 'Manual data sharing between departments costs time and leads to errors. BEP connects systems so data is automatically available.',
      })
    } else {
      result.push({
        nl: 'Je datadeling is deels geautomatiseerd. BEP kan de laatste stap zetten door alle systemen in één kennisbank te verbinden.',
        en: 'Your data sharing is partially automated. BEP can take the final step by connecting all systems in one knowledge base.',
      })
    }

    return result
  }, [showScore, answers, selected.size, savings])

  const submitLead = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (leadStatus === 'sending') return
    setLeadStatus('sending')
    try {
      const answerSummary = questions.map(q => {
        const a = answers[q.id]
        const option = q.options.find(o => o.points === a)
        return `${lang === 'en' ? q.en : q.nl}: ${option ? (lang === 'en' ? option.en : option.nl) : '?'}`
      }).join('\n')

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          message: `Data Silo Score: ${score}/100\n\n${answerSummary}\n\nSystemen: ${Array.from(selected).join(', ')}\n\nTelefoon: ${leadForm.phone || '(niet opgegeven)'}\nVoorkeur: ${leadForm.preference || 'Geen voorkeur'}`,
          source: 'data-silo-score',
          systems: Array.from(selected).join(', '),
          score,
          phone: leadForm.phone,
          preference: leadForm.preference,
        }),
      })
      if (!res.ok) throw new Error()
      setLeadStatus('done')
    } catch {
      setLeadStatus('error')
    }
  }, [leadForm, selected, answers, score, leadStatus, lang])

  const selectedArr = Array.from(selected)
  const customSystems = selectedArr.filter(s => !integrations.some(i => i.name === s))
  const allAnswered = Object.keys(answers).length === questions.length

  return (
    <div className="integrations-showcase">
      {/* Step 1: Select systems */}
      <div className="showcase-step">
        <div className="showcase-step-num">1</div>
        <div className="showcase-step-content">
          <h3>{t('Selecteer je systemen', 'Select your systems')}</h3>
          <p className="showcase-step-desc">
            {t('Klik op de systemen die jouw organisatie gebruikt.', 'Click the systems your organization uses.')}
          </p>

          <div className="integrations-controls">
            <div className="integrations-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`integrations-tab ${activeCat === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {t(cat.nl, cat.en)}
                </button>
              ))}
            </div>
            <div className="integrations-search">
              <Search size={16} />
              <input
                type="text"
                placeholder={t('Zoek...', 'Search...')}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="integrations-grid-new">
            {filtered.map(item => (
              <button
                key={item.name}
                className={`integration-card ${selected.has(item.name) ? 'selected' : ''}`}
                onClick={() => toggle(item.name)}
              >
                <div className="integration-card-indicator">
                  {selected.has(item.name) && <Check size={12} />}
                </div>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="integrations-custom">
            <input
              type="text"
              placeholder={t('Ander systeem toevoegen...', 'Add another system...')}
              value={customSystem}
              onChange={e => setCustomSystem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustom()}
            />
            <button onClick={addCustom} disabled={!customSystem.trim()} className="integrations-custom-btn">
              <Plus size={16} />
            </button>
          </div>

          {customSystems.length > 0 && (
            <div className="integrations-custom-tags">
              {customSystems.map(name => (
                <span key={name} className="integrations-custom-tag">
                  {name}
                  <button onClick={() => toggle(name)}><X size={12} /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Assessment questions */}
      {selected.size > 0 && (
        <div className="showcase-step">
          <div className="showcase-step-num">2</div>
          <div className="showcase-step-content">
            <h3>{t('Beantwoord 5 snelle vragen', 'Answer 5 quick questions')}</h3>
            <p className="showcase-step-desc">
              {t('We berekenen je Data Silo Score op basis van je antwoorden.', 'We calculate your Data Silo Score based on your answers.')}
            </p>

            {!assessmentStarted ? (
              <button
                className="btn btn-primary"
                onClick={() => setAssessmentStarted(true)}
                style={{ marginTop: 16 }}
              >
                {t('Start de scan', 'Start the scan')} <ArrowRight size={16} />
              </button>
            ) : (
              <div className="assessment-questions">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`assessment-question ${i === currentQuestion ? 'active' : ''} ${i < currentQuestion || (i <= currentQuestion && answers[q.id]) ? 'answered' : ''} ${i > currentQuestion && !answers[q.id] ? 'upcoming' : ''}`}
                  >
                    <div className="assessment-question-header">
                      <span className="assessment-question-num">{i + 1}/5</span>
                      <span className="assessment-question-text">{t(q.nl, q.en)}</span>
                    </div>
                    {(i === currentQuestion || answers[q.id]) && (
                      <div className="assessment-options">
                        {q.options.map((opt, j) => (
                          <button
                            key={j}
                            className={`assessment-option ${answers[q.id] === opt.points ? 'selected' : ''}`}
                            onClick={() => answerQuestion(q.id, opt.points)}
                          >
                            <div className="assessment-option-indicator">
                              {answers[q.id] === opt.points && <Check size={12} />}
                            </div>
                            {t(opt.nl, opt.en)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Progress bar */}
                <div className="assessment-progress">
                  <div
                    className="assessment-progress-bar"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Score + Insights */}
      {showScore && allAnswered && (
        <div className="showcase-step">
          <div className="showcase-step-num">3</div>
          <div className="showcase-step-content">
            <h3>{t('Jouw Data Silo Score', 'Your Data Silo Score')}</h3>

            <div className="score-result">
              {/* Score gauge */}
              <div className="score-gauge-container">
                <div
                  className="score-gauge"
                  style={{
                    background: `conic-gradient(${scoreColor} ${score * 3.6}deg, rgba(255,255,255,0.08) ${score * 3.6}deg)`,
                  }}
                >
                  <div className="score-gauge-inner">
                    <div className="score-gauge-value">{score}</div>
                    <div className="score-gauge-label">{getScoreLabel(score, t)}</div>
                  </div>
                </div>
                {savings && savings.hoursPerWeek > 0 && (
                  <div className="score-savings">
                    <div className="score-savings-value">~{savings.hoursPerWeek}</div>
                    <div className="score-savings-label">{t('verloren uren/week', 'lost hours/week')}</div>
                  </div>
                )}
              </div>

              {/* Insights */}
              <div className="score-insights">
                {insights.map((insight, i) => (
                  <div key={i} className="score-insight">
                    <div className="score-insight-icon">
                      <Check size={16} />
                    </div>
                    <p>{t(insight.nl, insight.en)}</p>
                  </div>
                ))}
              </div>

              {/* Use cases */}
              {selectedCats.length > 0 && (
                <div className="score-usecases">
                  <h4>{t('Wat BEP kan met jouw systemen', 'What BEP can do with your systems')}</h4>
                  {selectedCats.map(cat => (
                    <div key={cat} className="score-usecase">
                      <ArrowRight size={14} />
                      <span>{t(useCases[cat].nl, useCases[cat].en)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Lead capture — Plan een gratis gesprek */}
      {showScore && allAnswered && (
        <div className="showcase-step">
          <div className="showcase-step-num">4</div>
          <div className="showcase-step-content">
            {leadStatus === 'done' ? (
              <div className="showcase-lead-done">
                <Check size={32} />
                <h3>{t('Bedankt! We nemen snel contact op.', 'Thanks! We\'ll be in touch soon.')}</h3>
                <p>
                  {t(
                    'We bespreken je Data Silo Score en de mogelijkheden voor jouw organisatie.',
                    'We\'ll discuss your Data Silo Score and the possibilities for your organization.'
                  )}
                </p>
              </div>
            ) : (
              <>
                <h3>
                  <Phone size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
                  {t('Plan een gratis gesprek', 'Schedule a free consultation')}
                </h3>
                <p className="showcase-step-desc">
                  {t(
                    'We bespreken je score en laten zien hoe BEP jouw data kan verbinden.',
                    'We\'ll discuss your score and show how BEP can connect your data.'
                  )}
                </p>

                <form className="assessment-lead-form" onSubmit={submitLead}>
                  <div className="assessment-lead-fields">
                    <input
                      type="text"
                      placeholder={t('Naam *', 'Name *')}
                      required
                      value={leadForm.name}
                      onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={leadForm.email}
                      onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <input
                      type="tel"
                      placeholder={t('Telefoonnummer', 'Phone number')}
                      value={leadForm.phone}
                      onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                    />
                    <input
                      type="text"
                      placeholder={t('Bedrijfsnaam', 'Company name')}
                      value={leadForm.company}
                      onChange={e => setLeadForm(f => ({ ...f, company: e.target.value }))}
                    />
                  </div>
                  <div className="assessment-lead-preference">
                    <Calendar size={16} />
                    <select
                      value={leadForm.preference}
                      onChange={e => setLeadForm(f => ({ ...f, preference: e.target.value }))}
                    >
                      <option value="">{t('Voorkeur moment', 'Preferred time')}</option>
                      <option value="ochtend">{t('Ochtend (9-12)', 'Morning (9-12)')}</option>
                      <option value="middag">{t('Middag (12-17)', 'Afternoon (12-17)')}</option>
                      <option value="geen">{t('Geen voorkeur', 'No preference')}</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={leadStatus === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                    {leadStatus === 'sending'
                      ? t('Versturen...', 'Sending...')
                      : t('Plan mijn gratis gesprek', 'Schedule my free consultation')
                    }
                    <ArrowRight size={16} />
                  </button>
                  {leadStatus === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 'var(--fs-sm)', marginTop: 8 }}>
                      {t('Er ging iets mis. Probeer het opnieuw.', 'Something went wrong. Try again.')}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
