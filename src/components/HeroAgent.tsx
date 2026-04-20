// src/components/HeroAgent.tsx
'use client'
import { useEffect, useState } from 'react'
import { MessageSquare, Users, BookOpen, Zap, Search, Send } from 'lucide-react'

const agents = [
  {
    color: '#F5861D',
    name: 'Sales Agent',
    preview: '3 leads voor opvolgi...',
    time: '09:14',
    messages: [
      { from: 'agent' as const, text: 'Goedemorgen! Ik heb 3 leads geïdentificeerd die deze week opvolging nodig hebben. Eén prospect heeft je voorstel 4× bekeken maar nog niet gereageerd.' },
      { from: 'user' as const, text: 'Welke prospect bedoel je?' },
      { from: 'agent' as const, text: 'De aanvraag van 12 maart voor het logistics-project. Ik heb een concept follow-up mail opgesteld. Zal ik deze versturen?' },
    ],
  },
  {
    color: '#F59E0B',
    name: 'Finance Agent',
    preview: 'Factuur herinnering...',
    time: '09:02',
    messages: [
      { from: 'agent' as const, text: 'Er staan 4 facturen open die meer dan 30 dagen oud zijn. Totaalwaarde €12.400. Wil je dat ik herinneringen verstuur?' },
      { from: 'user' as const, text: 'Stuur alleen naar de top 2.' },
      { from: 'agent' as const, text: 'Herinneringen verstuurd naar Bouwbedrijf Smit en Logistiek Noord. Ik houd de status bij.' },
    ],
  },
  {
    color: '#4CAF7D',
    name: 'Knowledge Agent',
    preview: '12 documenten geï...',
    time: '08:45',
    messages: [
      { from: 'agent' as const, text: 'Ik heb 12 nieuwe documenten geïndexeerd uit SharePoint. Er zijn 3 procedures bijgewerkt die relevant zijn voor jouw team.' },
      { from: 'user' as const, text: 'Welke procedures?' },
      { from: 'agent' as const, text: 'Aanbestedingsprocedure v3.2, Klachtenafhandeling en het nieuwe privacybeleid. Wil je een samenvatting?' },
    ],
  },
  {
    color: '#14B8A6',
    name: 'Support Agent',
    preview: 'Kennisartikel aange...',
    time: '08:30',
    messages: [
      { from: 'agent' as const, text: 'Ik heb een nieuw kennisartikel aangemaakt op basis van de 5 meest gestelde vragen deze week.' },
      { from: 'user' as const, text: 'Goed. Publiceer het.' },
      { from: 'agent' as const, text: 'Kennisartikel gepubliceerd. Ik stuur een notificatie naar het support-team.' },
    ],
  },
]

const navIcons = [MessageSquare, Users, BookOpen, Zap]

// Dark theme colors
const BG_MAIN    = '#0b1927'
const BG_SIDEBAR = '#091320'
const BG_CHAT    = '#0d1f30'
const BORDER     = 'rgba(255,255,255,0.07)'
const TEXT_PRI   = 'rgba(255,255,255,0.9)'
const TEXT_SEC   = 'rgba(255,255,255,0.4)'
const TEXT_MUT   = 'rgba(255,255,255,0.25)'

export function HeroAgent() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visibleCount, setVisibleCount] = useState(2)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    // Show third message after 1.5s with typing indicator
    const t1 = setTimeout(() => setTyping(true), 1500)
    const t2 = setTimeout(() => { setTyping(false); setVisibleCount(3) }, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [activeIdx])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % agents.length)
      setVisibleCount(2)
      setTyping(false)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const agent = agents[activeIdx]

  return (
    <div style={{
      display: 'flex',
      background: BG_MAIN,
      borderRadius: '0',
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      height: '420px',
      fontSize: '13px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Sidebar — hidden on mobile via CSS */}
      <div className="hero-agent-sidebar" style={{
        width: '220px',
        flexShrink: 0,
        borderRight: `1px solid ${BORDER}`,
        display: 'flex',
        flexDirection: 'column',
        background: BG_SIDEBAR,
      }}>
        {/* Sidebar header */}
        <div style={{
          padding: '16px',
          borderBottom: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <MessageSquare size={18} color="#F5861D" strokeWidth={2.5} />
          <span style={{ fontWeight: 700, fontSize: '15px', color: TEXT_PRI }}>BEP</span>
        </div>

        {/* Agent list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {agents.map((a, i) => (
            <div
              key={i}
              onClick={() => { setActiveIdx(i); setVisibleCount(2); setTyping(false) }}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: i === activeIdx ? 'rgba(245,134,29,0.1)' : 'transparent',
                borderLeft: `3px solid ${i === activeIdx ? '#F5861D' : 'transparent'}`,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '0',
                    background: a.color,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontWeight: 600, color: TEXT_PRI, fontSize: '13px' }}>{a.name}</span>
                </div>
                <span style={{ fontSize: '11px', color: TEXT_MUT }}>{a.time}</span>
              </div>
              <div style={{ fontSize: '12px', color: TEXT_SEC, paddingLeft: '15px' }}>{a.preview}</div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{
          padding: '12px 16px',
          borderTop: `1px solid ${BORDER}`,
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          {navIcons.map((Icon, i) => (
            <Icon key={i} size={18} color={i === 0 ? '#F5861D' : 'rgba(255,255,255,0.2)'} strokeWidth={1.8} style={{ cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      {/* Chat panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG_CHAT }}>
        {/* Chat header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: `1px solid ${BORDER}`,
          background: BG_MAIN,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: TEXT_PRI }}>{agent.name}</div>
            <div style={{ fontSize: '11px', color: '#4CAF7D', fontWeight: 600 }}>Actief</div>
          </div>
          <Search size={16} color="rgba(255,255,255,0.2)" />
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {agent.messages.slice(0, visibleCount).map((msg, i) => (
            <div key={`${activeIdx}-${i}`} style={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              animation: 'msg-in 0.25s ease',
            }}>
              {msg.from === 'agent' && (
                <div style={{ marginRight: '8px', marginTop: '2px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '0',
                    background: agent.color, marginTop: '6px',
                  }} />
                </div>
              )}
              <div style={{ maxWidth: '75%' }}>
                {msg.from === 'agent' && (
                  <div style={{ fontSize: '11px', fontWeight: 700, color: agent.color, marginBottom: '4px' }}>
                    {agent.name}
                  </div>
                )}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '0',
                  background: msg.from === 'user' ? agent.color : 'rgba(255,255,255,0.07)',
                  color: msg.from === 'user' ? '#fff' : TEXT_PRI,
                  fontSize: '13px',
                  lineHeight: '1.45',
                  border: msg.from === 'user' ? 'none' : `1px solid rgba(255,255,255,0.06)`,
                  boxShadow: 'none',
                }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '0',
                background: agent.color,
              }} />
              <div style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '0',
                border: `1px solid rgba(255,255,255,0.06)`,
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '5px', height: '5px', borderRadius: '0',
                    background: 'rgba(255,255,255,0.3)',
                    animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px',
          background: BG_MAIN,
          borderTop: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            flex: 1,
            padding: '9px 14px',
            borderRadius: '0',
            border: `1px solid rgba(255,255,255,0.1)`,
            fontSize: '13px',
            color: TEXT_MUT,
            background: 'rgba(255,255,255,0.04)',
          }}>
            Typ je bericht...
          </div>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '0',
            background: '#F5861D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Send size={15} color="white" strokeWidth={2} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
