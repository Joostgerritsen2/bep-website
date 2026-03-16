'use client'
import { useLang } from '@/lib/language'
import { useEffect, useState } from 'react'

interface FeedItem {
  agent: string
  color: string
  messageNl: string
  messageEn: string
  timeAgo: string
}

const feedItems: FeedItem[] = [
  {
    agent: 'Sales Agent',
    color: '#F5861D',
    messageNl: 'Prospect heeft 3 weken niet gereageerd. Follow-up mail verstuurd met nieuw voorstel.',
    messageEn: 'Prospect hasn\'t responded in 3 weeks. Follow-up email sent with new proposal.',
    timeAgo: '2 min',
  },
  {
    agent: 'Finance Agent',
    color: '#4dabf7',
    messageNl: 'Factuur #2847 is 5 dagen over deadline. Automatisch herinnering ingepland.',
    messageEn: 'Invoice #2847 is 5 days overdue. Automatic reminder scheduled.',
    timeAgo: '8 min',
  },
  {
    agent: 'Knowledge Agent',
    color: '#69db7c',
    messageNl: '3 nieuwe beleidsdocumenten geïndexeerd. Relevante precedenten gevonden voor lopend dossier.',
    messageEn: '3 new policy documents indexed. Relevant precedents found for active case.',
    timeAgo: '15 min',
  },
  {
    agent: 'Support Agent',
    color: '#da77f2',
    messageNl: 'Patroon gedetecteerd: 8 vergelijkbare klantvragen deze week. Kennisartikel aangemaakt en gedeeld met team.',
    messageEn: 'Pattern detected: 8 similar customer questions this week. Knowledge article created and shared with team.',
    timeAgo: '23 min',
  },
  {
    agent: 'Orchestrator',
    color: '#F5861D',
    messageNl: 'Klant-onboarding: 4/5 stappen afgerond. Wacht op goedkeuring contractvoorwaarden.',
    messageEn: 'Client onboarding: 4/5 steps completed. Awaiting contract terms approval.',
    timeAgo: '31 min',
  },
]

export function HeroFeed() {
  const { t } = useLang()
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    feedItems.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 600 + i * 900))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="hero-feed">
      <div className="hero-feed-header">
        <span className="hero-feed-dot" />
        <span className="hero-feed-title">BEP Activity</span>
        <span className="hero-feed-live">Live</span>
      </div>
      <div className="hero-feed-items">
        {feedItems.slice(0, visibleCount).map((item, i) => (
          <div
            key={i}
            className="hero-feed-item"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="hero-feed-item-bar" style={{ background: item.color }} />
            <div className="hero-feed-item-content">
              <div className="hero-feed-item-header">
                <span className="hero-feed-agent" style={{ color: item.color }}>
                  {item.agent}
                </span>
                <span className="hero-feed-time">{item.timeAgo}</span>
              </div>
              <p className="hero-feed-message">
                {t(item.messageNl, item.messageEn)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
