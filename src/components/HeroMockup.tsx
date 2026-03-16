'use client'
import { useLang } from '@/lib/language'
import { useEffect, useState } from 'react'
import { MessageSquare, Search, Users, BookOpen, Settings, Zap, Send } from 'lucide-react'

interface ChatMessage {
  role: 'agent' | 'user'
  agentName?: string
  agentColor?: string
  textNl: string
  textEn: string
}

const chatMessages: ChatMessage[] = [
  {
    role: 'agent',
    agentName: 'Sales Agent',
    agentColor: '#F5861D',
    textNl: 'Goedemorgen! Ik heb 3 leads geïdentificeerd die deze week opvolging nodig hebben. Eén prospect heeft je voorstel 4x bekeken maar nog niet gereageerd.',
    textEn: 'Good morning! I\'ve identified 3 leads that need follow-up this week. One prospect viewed your proposal 4 times but hasn\'t responded yet.',
  },
  {
    role: 'user',
    textNl: 'Welke prospect bedoel je?',
    textEn: 'Which prospect do you mean?',
  },
  {
    role: 'agent',
    agentName: 'Sales Agent',
    agentColor: '#F5861D',
    textNl: 'De aanvraag van 12 maart voor het logistics-project. Ik heb een concept follow-up mail opgesteld. Zal ik deze versturen?',
    textEn: 'The March 12 request for the logistics project. I\'ve drafted a follow-up email. Shall I send it?',
  },
]

const sidebarChats = [
  { name: 'Sales Agent', color: '#F5861D', previewNl: '3 leads voor opvolging', previewEn: '3 leads for follow-up', time: '09:14', active: true },
  { name: 'Finance Agent', color: '#4dabf7', previewNl: 'Factuur herinnering ingepland', previewEn: 'Invoice reminder scheduled', time: '09:02' },
  { name: 'Knowledge Agent', color: '#69db7c', previewNl: '12 documenten geïndexeerd', previewEn: '12 documents indexed', time: '08:45' },
  { name: 'Support Agent', color: '#da77f2', previewNl: 'Kennisartikel aangemaakt', previewEn: 'Knowledge article created', time: '08:30' },
]

export function HeroMockup() {
  const { t } = useLang()
  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    chatMessages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleMessages(i + 1), 800 + i * 1200))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="hero-mockup">
      {/* Sidebar */}
      <div className="hm-sidebar">
        <div className="hm-sidebar-header">
          <MessageSquare size={16} color="#F5861D" />
          <span className="hm-sidebar-title">BEP</span>
        </div>
        <div className="hm-sidebar-chats">
          {sidebarChats.map((chat, i) => (
            <div key={i} className={`hm-chat-item ${chat.active ? 'active' : ''}`}>
              <div className="hm-chat-dot" style={{ background: chat.color }} />
              <div className="hm-chat-info">
                <div className="hm-chat-name">{chat.name}</div>
                <div className="hm-chat-preview">{t(chat.previewNl, chat.previewEn)}</div>
              </div>
              <div className="hm-chat-time">{chat.time}</div>
            </div>
          ))}
        </div>
        <div className="hm-sidebar-nav">
          <div className="hm-nav-icon active"><MessageSquare size={16} /></div>
          <div className="hm-nav-icon"><Users size={16} /></div>
          <div className="hm-nav-icon"><BookOpen size={16} /></div>
          <div className="hm-nav-icon"><Zap size={16} /></div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="hm-main">
        <div className="hm-main-header">
          <div className="hm-main-dot" style={{ background: '#F5861D' }} />
          <div>
            <div className="hm-main-name">Sales Agent</div>
            <div className="hm-main-status">{t('Actief', 'Active')}</div>
          </div>
          <div className="hm-search-icon"><Search size={14} /></div>
        </div>

        <div className="hm-messages">
          {chatMessages.slice(0, visibleMessages).map((msg, i) => (
            <div key={i} className={`hm-message ${msg.role}`} style={{ animationDelay: `${i * 0.1}s` }}>
              {msg.agentName && (
                <div className="hm-message-agent" style={{ color: msg.agentColor }}>
                  {msg.agentName}
                </div>
              )}
              <div className={`hm-message-bubble ${msg.role}`}>
                {t(msg.textNl, msg.textEn)}
              </div>
            </div>
          ))}
          {visibleMessages >= chatMessages.length && (
            <div className="hm-typing">
              <div className="hm-typing-dots">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="hm-input">
          <span className="hm-input-text">{t('Typ je bericht...', 'Type your message...')}</span>
          <div className="hm-input-send"><Send size={14} /></div>
        </div>
      </div>
    </div>
  )
}
