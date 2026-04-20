'use client'
import { useEffect, useState } from 'react'

const agents = [
  { name: 'Sales Agent',     color: '#F5861D' },
  { name: 'Finance Agent',   color: '#F59E0B' },
  { name: 'Knowledge Agent', color: '#4CAF7D' },
  { name: 'Support Agent',   color: '#14B8A6' },
]

export function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [hiding, setHiding]   = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('bep_splash')) return
    sessionStorage.setItem('bep_splash', '1')
    setVisible(true)
    const t1 = setTimeout(() => setHiding(true), 2200)
    const t2 = setTimeout(() => setVisible(false), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div className={`splash${hiding ? ' splash-hiding' : ''}`}>
      <div className="splash-inner">

        {/* Logo */}
        <div className="splash-logo">BEP</div>

        {/* Tagline */}
        <p className="splash-tagline">Agents initialiseren</p>

        {/* Agent list */}
        <div className="splash-agents">
          {agents.map((a, i) => (
            <div key={a.name} className="splash-agent" style={{ animationDelay: `${0.7 + i * 0.18}s` }}>
              <span className="splash-dot" style={{ background: a.color }} />
              <span className="splash-agent-name">{a.name}</span>
              <span className="splash-check" style={{ animationDelay: `${1.4 + i * 0.08}s` }}>✓</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="splash-bar">
          <div className="splash-bar-fill" />
        </div>
      </div>
    </div>
  )
}
