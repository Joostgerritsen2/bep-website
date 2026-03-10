'use client'
import { useState, useEffect, useCallback } from 'react'
import { useLang } from '@/lib/language'
import { CheckCircle, ChevronRight, Zap, ArrowRight } from 'lucide-react'

interface Scenario {
  role: { nl: string; en: string }
  initials: string
  question: { nl: string; en: string }
  systems: string[]
  sources: { name: string; detail: string }[]
  answer: { nl: string; en: string }
  actions: { nl: string; en: string; type: 'send' | 'update' | 'create' }[]
}

const scenarios: Scenario[] = [
  {
    role: { nl: 'Sales Manager', en: 'Sales Manager' },
    initials: 'JV',
    question: {
      nl: 'Update over order 4829 + stuur de klant een statusmail',
      en: 'Update on order 4829 + send client a status email',
    },
    systems: ['ERP', 'CRM', 'Email'],
    sources: [
      { name: 'SAP', detail: 'Order #4829' },
      { name: 'Salesforce', detail: 'Technova BV' },
      { name: 'Outlook', detail: '3 threads' },
    ],
    answer: {
      nl: 'Order 4829 — in productie afd. B3, levering 15 maart. Klant: Technova BV, laatst gesproken 2 mrt.',
      en: 'Order 4829 — in production dept. B3, delivery March 15. Client: Technova BV, last contact Mar 2.',
    },
    actions: [
      { nl: 'Statusmail verstuurd → Technova BV', en: 'Status email sent → Technova BV', type: 'send' },
      { nl: 'CRM contactmoment bijgewerkt', en: 'CRM contact moment updated', type: 'update' },
      { nl: 'Opvolgtaak → 16 maart', en: 'Follow-up task → March 16', type: 'create' },
    ],
  },
  {
    role: { nl: 'Operations', en: 'Operations' },
    initials: 'ML',
    question: {
      nl: 'Machine P7 foutcode E-42 — hoe op te lossen?',
      en: 'Machine P7 error code E-42 — how to fix?',
    },
    systems: ['Kennisbank', 'Docs', 'Logs'],
    sources: [
      { name: 'Kennisbank', detail: '3 artikelen' },
      { name: 'Handleiding', detail: 'P7-rev4.pdf' },
      { name: 'Logboek', detail: '12 feb incident' },
    ],
    answer: {
      nl: 'E-42 = drukregulatie-fout. Oplossing in 3 bronnen. Laatst opgelost 12 feb door tech. De Vries.',
      en: 'E-42 = pressure regulation error. Solution in 3 sources. Last resolved Feb 12 by tech. De Vries.',
    },
    actions: [
      { nl: 'Storingsprocedure klaargezet', en: 'Troubleshooting procedure prepared', type: 'create' },
      { nl: 'Onderhoudsticket aangemaakt', en: 'Maintenance ticket created', type: 'create' },
      { nl: 'Notificatie → technicus De Vries', en: 'Notification → technician De Vries', type: 'send' },
    ],
  },
  {
    role: { nl: 'Finance Director', en: 'Finance Director' },
    initials: 'SK',
    question: {
      nl: 'Omzet Q1 vs vorig jaar + management samenvatting',
      en: 'Revenue Q1 vs last year + management summary',
    },
    systems: ['ERP', 'Finance', 'Reports'],
    sources: [
      { name: 'Exact', detail: 'Q1 2025/2024' },
      { name: 'BI Dashboard', detail: 'KPIs' },
      { name: 'Rapportages', detail: 'Jaarverslag' },
    ],
    answer: {
      nl: 'Q1: €2.4M (+18% YoY). B2B Services +31%. Marge 22% → 26%. Pipeline +€800K.',
      en: 'Q1: €2.4M (+18% YoY). B2B Services +31%. Margin 22% → 26%. Pipeline +€800K.',
    },
    actions: [
      { nl: 'Q1 rapport gegenereerd (PDF)', en: 'Q1 report generated (PDF)', type: 'create' },
      { nl: 'Management-samenvatting verstuurd', en: 'Management summary sent', type: 'send' },
      { nl: 'KPI-dashboard bijgewerkt', en: 'KPI dashboard updated', type: 'update' },
    ],
  },
]

const actionEmoji: Record<string, string> = {
  send: '→',
  update: '↻',
  create: '+',
}

type Phase = 'typing' | 'searching' | 'answering' | 'acting' | 'done'

export function HeroDemo() {
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typed, setTyped] = useState(0)
  const [searched, setSearched] = useState(0)
  const [actions, setActions] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const s = scenarios[idx]
  const qText = t(s.question.nl, s.question.en)

  const reset = useCallback(() => {
    setPhase('typing')
    setTyped(0)
    setSearched(0)
    setActions(0)
    setShowAnswer(false)
    setIdx(prev => (prev + 1) % scenarios.length)
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (typed < qText.length) {
        timer = setTimeout(() => setTyped(p => p + 1), Math.random() * 25 + 18)
      } else {
        timer = setTimeout(() => setPhase('searching'), 300)
      }
    } else if (phase === 'searching') {
      if (searched < s.sources.length) {
        timer = setTimeout(() => setSearched(p => p + 1), 550)
      } else {
        timer = setTimeout(() => { setShowAnswer(true); setPhase('answering') }, 300)
      }
    } else if (phase === 'answering') {
      timer = setTimeout(() => setPhase('acting'), 1000)
    } else if (phase === 'acting') {
      if (actions < s.actions.length) {
        timer = setTimeout(() => setActions(p => p + 1), 450)
      } else {
        timer = setTimeout(() => setPhase('done'), 800)
      }
    } else if (phase === 'done') {
      timer = setTimeout(reset, 3000)
    }

    return () => clearTimeout(timer)
  }, [phase, typed, searched, actions, qText, s, reset])

  const switchTo = (i: number) => {
    setIdx(i); setPhase('typing'); setTyped(0)
    setSearched(0); setActions(0); setShowAnswer(false)
  }

  return (
    <div className="hd">
      {/* Top bar */}
      <div className="hd-bar">
        <div className="hd-bar-left">
          <span className="hd-bar-logo">BEP</span>
          <span className="hd-bar-label">Command Center</span>
        </div>
        <div className="hd-bar-systems">
          {s.systems.map((sys, i) => (
            <div key={`${idx}-${i}`} className={`hd-bar-sys ${searched > i ? 'on' : ''} ${phase === 'searching' && searched === i ? 'pulse' : ''}`}>
              <span className="hd-bar-dot" />
              {sys}
            </div>
          ))}
        </div>
      </div>

      {/* Query */}
      <div className="hd-query">
        <div className="hd-query-who">
          <span className="hd-query-initials">{s.initials}</span>
          <span className="hd-query-role">{t(s.role.nl, s.role.en)}</span>
        </div>
        <div className="hd-query-text">
          <ChevronRight size={14} className="hd-chevron" />
          <span>{qText.slice(0, typed)}</span>
          {typed < qText.length && <span className="hd-cursor" />}
        </div>
      </div>

      {/* Processing */}
      {phase !== 'typing' && (
        <div className="hd-process">
          <div className="hd-process-bar">
            <div
              className="hd-process-fill"
              style={{ width: `${(searched / s.sources.length) * 100}%` }}
            />
          </div>
          <div className="hd-sources">
            {s.sources.map((src, i) => (
              <div key={i} className={`hd-source ${searched > i ? 'found' : ''} ${phase === 'searching' && searched === i ? 'scanning' : ''}`}>
                <span className="hd-source-name">{src.name}</span>
                <span className="hd-source-detail">{src.detail}</span>
                {searched > i && <CheckCircle size={11} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer */}
      {showAnswer && (
        <div className="hd-answer">
          <div className="hd-answer-head">
            <Zap size={13} />
            <span>{t('Resultaat', 'Result')}</span>
          </div>
          <p>{t(s.answer.nl, s.answer.en)}</p>
        </div>
      )}

      {/* Actions */}
      {actions > 0 && (
        <div className="hd-actions">
          {s.actions.slice(0, actions).map((a, i) => (
            <div key={i} className="hd-action">
              <span className="hd-action-icon">{actionEmoji[a.type]}</span>
              <span>{t(a.nl, a.en)}</span>
              <CheckCircle size={12} className="hd-action-check" />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="hd-footer">
        <div className="hd-dots">
          {scenarios.map((_, i) => (
            <button key={i} className={`hd-dot ${i === idx ? 'active' : ''}`} onClick={() => switchTo(i)} />
          ))}
        </div>
        <div className="hd-integrations">
          {['SAP', 'Salesforce', 'SharePoint', 'Outlook', 'HubSpot', 'Teams', 'Exact', 'Gmail'].map(name => (
            <span key={name} className="hd-int">{name}</span>
          ))}
        </div>
        <div className="hd-footer-label">{t('Werkt met je bestaande tools', 'Works with your existing tools')}</div>
      </div>
    </div>
  )
}
