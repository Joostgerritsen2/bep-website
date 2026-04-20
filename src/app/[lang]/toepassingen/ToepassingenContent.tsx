'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { TrendingUp, CreditCard, HeadphonesIcon, BookOpen, Users, Settings } from 'lucide-react'

const departments = [
  {
    icon: TrendingUp,
    agentNl: 'Sales Agent',
    agentEn: 'Sales Agent',
    titleNl: 'BEP voor Sales',
    titleEn: 'BEP for Sales',
    subtitleNl: 'Je pipeline bijgehouden. Zonder dat je ernaar vraagt.',
    subtitleEn: 'Your pipeline managed. Without you asking.',
    descNl: 'De Sales Agent houdt je CRM scherp, signaleert stille prospects en bereidt follow-ups voor op basis van eerdere deals. Jij sluit, BEP houdt bij.',
    descEn: 'The Sales Agent keeps your CRM sharp, flags quiet prospects and prepares follow-ups based on previous deals. You close, BEP keeps track.',
    chat: [
      { from: 'agent', textNl: 'Goedemorgen. Prospect Bakker B.V. heeft je voorstel 4× bekeken maar niet gereageerd. Ik heb een follow-up mail opgesteld.', textEn: 'Good morning. Prospect Bakker B.V. has viewed your proposal 4× but hasn\'t responded. I\'ve drafted a follow-up email.' },
      { from: 'user', textNl: 'Stuur maar.', textEn: 'Send it.' },
      { from: 'agent', textNl: 'Verstuurd. Ik plan over 3 dagen een herinnering in als er geen reactie is.', textEn: 'Sent. I\'ll schedule a reminder in 3 days if there\'s no response.' },
    ],
    statsNl: ['Stille prospects gesignaleerd', 'Follow-ups automatisch opgesteld', 'Pipeline altijd actueel'],
    statsEn: ['Quiet prospects flagged', 'Follow-ups drafted automatically', 'Pipeline always up to date'],
  },
  {
    icon: CreditCard,
    agentNl: 'Finance Agent',
    agentEn: 'Finance Agent',
    titleNl: 'BEP voor Finance',
    titleEn: 'BEP for Finance',
    subtitleNl: 'Geen factuur valt meer tussen wal en schip.',
    subtitleEn: 'No invoice falls through the cracks.',
    descNl: 'De Finance Agent bewaakt deadlines, detecteert afwijkingen en bereidt maandafsluitingen voor. Geen handmatige exports meer, geen verrassingen.',
    descEn: 'The Finance Agent monitors deadlines, detects anomalies and prepares month-end closes. No more manual exports, no surprises.',
    chat: [
      { from: 'agent', textNl: 'Er staan 4 facturen open die meer dan 30 dagen oud zijn. Totaalwaarde €18.400. Zal ik herinneringen versturen?', textEn: '4 invoices are outstanding for more than 30 days. Total value €18,400. Shall I send reminders?' },
      { from: 'user', textNl: 'Ja, maar niet naar Janssen. Die betalen altijd te laat maar altijd wél.', textEn: 'Yes, but not to Janssen. They always pay late but always do.' },
      { from: 'agent', textNl: 'Herinneringen verstuurd naar de overige 3. Janssen heb ik uit de lijst gehaald en een notitie aangemaakt.', textEn: 'Reminders sent to the other 3. I\'ve excluded Janssen and created a note.' },
    ],
    statsNl: ['Openstaande facturen bewaakt', 'Afwijkingen direct gesignaleerd', 'Maandafsluiting automatisch voorbereid'],
    statsEn: ['Outstanding invoices monitored', 'Anomalies flagged immediately', 'Month-end close prepared automatically'],
  },
  {
    icon: HeadphonesIcon,
    agentNl: 'Support Agent',
    agentEn: 'Support Agent',
    titleNl: 'BEP voor Support',
    titleEn: 'BEP for Support',
    subtitleNl: 'Terugkerende vragen? Eén keer beantwoord. Altijd beschikbaar.',
    subtitleEn: 'Recurring questions? Answered once. Always available.',
    descNl: 'De Support Agent herkent patronen in tickets, maakt kennisartikelen aan en zorgt dat medewerkers direct antwoord krijgen, zonder een collega te hoeven storen.',
    descEn: 'The Support Agent recognizes patterns in tickets, creates knowledge articles and ensures employees get immediate answers, without disturbing colleagues.',
    chat: [
      { from: 'agent', textNl: 'Deze week zijn 9 tickets binnengekomen over de nieuwe onkostendeclaratie. Ik heb een kennisartikel aangemaakt. Publiceren?', textEn: '9 tickets came in this week about the new expense declaration. I\'ve created a knowledge article. Publish it?' },
      { from: 'user', textNl: 'Ja. Stuur ook een notificatie naar het team.', textEn: 'Yes. Also send a notification to the team.' },
      { from: 'agent', textNl: 'Gepubliceerd en notificatie verstuurd naar 23 medewerkers.', textEn: 'Published and notification sent to 23 employees.' },
    ],
    statsNl: ['Patronen in tickets herkend', 'Kennisartikelen automatisch aangemaakt', 'Antwoord direct, zonder zoeken'],
    statsEn: ['Patterns in tickets recognised', 'Knowledge articles created automatically', 'Instant answers, no searching'],
  },
  {
    icon: BookOpen,
    agentNl: 'Knowledge Agent',
    agentEn: 'Knowledge Agent',
    titleNl: 'BEP voor Kennismanagement',
    titleEn: 'BEP for Knowledge Management',
    subtitleNl: 'Expertise die blijft, ook als mensen vertrekken.',
    subtitleEn: 'Expertise that stays, even when people leave.',
    descNl: 'De Knowledge Agent indexeert alle bedrijfsdocumenten en borgt expertise van ervaren medewerkers. Kennis verdwijnt niet meer als iemand vertrekt.',
    descEn: 'The Knowledge Agent indexes all company documents and preserves expertise from experienced employees. Knowledge no longer disappears when someone leaves.',
    chat: [
      { from: 'user', textNl: 'Hoe hebben we de aanbesteding voor gemeente Utrecht vorig jaar aanepakt?', textEn: 'How did we handle the tender for Utrecht municipality last year?' },
      { from: 'agent', textNl: 'Gevonden in het projectarchief. In 2023 hebben jullie gekozen voor aanpak X, met als onderscheidend argument Y. De offerte scoorde 87 punten. Wil je de volledige aanpak zien?', textEn: 'Found in the project archive. In 2023 you chose approach X, with distinguishing argument Y. The bid scored 87 points. Want to see the full approach?' },
      { from: 'user', textNl: 'Ja, graag.', textEn: 'Yes please.' },
    ],
    statsNl: ['Alle documenten doorzoekbaar', 'Expertise geborgd voor vertrek', 'Antwoord met exacte bronvermelding'],
    statsEn: ['All documents searchable', 'Expertise preserved before departure', 'Answer with exact source reference'],
  },
  {
    icon: Users,
    agentNl: 'HR Agent',
    agentEn: 'HR Agent',
    titleNl: 'BEP voor HR',
    titleEn: 'BEP for HR',
    subtitleNl: 'Onboarding en beleid altijd binnen handbereik.',
    subtitleEn: 'Onboarding and policy always within reach.',
    descNl: 'De HR Agent ondersteunt nieuwe medewerkers bij onboarding, beantwoordt HR-vragen en bewaakt contractverlengingen en jubileums proactief.',
    descEn: 'The HR Agent supports new employees during onboarding, answers HR questions and proactively monitors contract renewals and anniversaries.',
    chat: [
      { from: 'agent', textNl: 'Het contract van Meijer loopt over 6 weken af. Wil je dat ik een verlengingsgesprek inplan?', textEn: 'Meijer\'s contract expires in 6 weeks. Want me to schedule a renewal meeting?' },
      { from: 'user', textNl: 'Ja, plan in met de manager.', textEn: 'Yes, schedule it with the manager.' },
      { from: 'agent', textNl: 'Afspraak ingepland voor volgende week dinsdag. Ik herinner je 2 dagen van tevoren.', textEn: 'Meeting scheduled for next Tuesday. I\'ll remind you 2 days beforehand.' },
    ],
    statsNl: ['Contractverlengingen bewaakt', 'Onboarding-vragen direct beantwoord', 'HR-beleid altijd doorzoekbaar'],
    statsEn: ['Contract renewals monitored', 'Onboarding questions answered instantly', 'HR policy always searchable'],
  },
  {
    icon: Settings,
    agentNl: 'Operations Agent',
    agentEn: 'Operations Agent',
    titleNl: 'BEP voor Operations',
    titleEn: 'BEP for Operations',
    subtitleNl: 'Processen die zichzelf bewaken.',
    subtitleEn: 'Processes that monitor themselves.',
    descNl: 'De Operations Agent bewaakt SLA\'s, signaleert bottlenecks en zorgt dat procedures altijd up-to-date zijn en toegankelijk voor iedereen die ze nodig heeft.',
    descEn: 'The Operations Agent monitors SLAs, flags bottlenecks and ensures procedures are always up-to-date and accessible to everyone who needs them.',
    chat: [
      { from: 'agent', textNl: 'Project Westerhaven dreigt de SLA van deze week te missen. Levertijd ligt 2 dagen achter. Actie nodig?', textEn: 'Project Westerhaven is at risk of missing this week\'s SLA. Delivery is 2 days behind. Action needed?' },
      { from: 'user', textNl: 'Ja, escaleer naar projectleider.', textEn: 'Yes, escalate to project manager.' },
      { from: 'agent', textNl: 'Projectleider geïnformeerd. SLA-risico gelogd in het dashboard.', textEn: 'Project manager informed. SLA risk logged in the dashboard.' },
    ],
    statsNl: ['SLA\'s proactief bewaakt', 'Bottlenecks vroeg gesignaleerd', 'Procedures altijd actueel'],
    statsEn: ['SLAs proactively monitored', 'Bottlenecks flagged early', 'Procedures always current'],
  },
]

function MiniChat({ messages, agentName, lang }: { messages: typeof departments[0]['chat'], agentName: string, lang: string }) {
  return (
    <div className="dept-chat">
      <div className="dept-chat-header">
        <div className="dept-chat-dot" />
        <span>{agentName}</span>
        <span className="dept-chat-status">{lang === 'nl' ? 'Actief' : 'Active'}</span>
      </div>
      <div className="dept-chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`dept-chat-msg dept-chat-msg--${msg.from}`}>
            <div className="dept-chat-bubble">
              {lang === 'nl' ? msg.textNl : msg.textEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ToepassingenContent() {
  const { lang, t } = useLang()

  return (
    <FadeUpContainer>
      <section className="hero dark-glow">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Toepassingen', 'Applications')}</span>
            <h1>
              {t('BEP voor ', 'BEP for ')}
              <span className="highlight">{t('elke afdeling', 'every department')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Niet één generieke AI, maar een agent die meedenkt in jouw domein. Proactief, op de hoogte van jouw data en klaar om te handelen.',
                'Not one generic AI, but an agent that thinks along in your domain. Proactive, aware of your data and ready to act.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {departments.map((dept, i) => {
        const Icon = dept.icon
        const isEven = i % 2 === 0
        return (
          <section key={i} className={`dept-section ${isEven ? 'dept-section--dark' : 'dept-section--darker'}`}>
            <div className="container">
              <FadeUp>
                <div className="dept-inner">
                  <div className="dept-text">
                    <div className="dept-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <span className="dept-agent-label">{t(dept.agentNl, dept.agentEn)}</span>
                    <h2>{t(dept.titleNl, dept.titleEn)}</h2>
                    <p className="dept-subtitle">{t(dept.subtitleNl, dept.subtitleEn)}</p>
                    <p className="dept-desc">{t(dept.descNl, dept.descEn)}</p>
                    <ul className="dept-stats">
                      {dept.statsNl.map((_, j) => (
                        <li key={j}>
                          <span className="dept-check">✓</span>
                          {t(dept.statsNl[j], dept.statsEn[j])}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="dept-visual">
                    <MiniChat messages={dept.chat} agentName={t(dept.agentNl, dept.agentEn)} lang={lang} />
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        )
      })}

      <section className="cta-section dark-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Welke agent past bij jouw team?', 'Which agent fits your team?')}</h2>
            <p>{t('Plan een gesprek en ontdek hoe BEP jouw afdeling kan versterken.', 'Schedule a call and discover how BEP can strengthen your department.')}</p>
            <div className="hero-buttons">
              <a href="/demo" className="btn btn-white btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
              <Link href="/cases" className="btn btn-ghost btn-arrow">
                {t('Bekijk cases', 'View cases')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
