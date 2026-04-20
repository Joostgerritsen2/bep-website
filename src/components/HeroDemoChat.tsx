'use client'
import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/lib/language'
import { Send, Loader, Zap } from 'lucide-react'
import Image from 'next/image'

const BG_MAIN = '#0b1927'
const BG_CHAT = '#0d1f30'
const BORDER  = 'rgba(255,255,255,0.07)'
const TEXT_PRI = 'rgba(255,255,255,0.9)'
const TEXT_SEC = 'rgba(255,255,255,0.55)'
const TEXT_MUT = 'rgba(255,255,255,0.25)'
const ORANGE   = '#F5861D'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const CHIPS_NL = [
  'Wat doet BEP voor logistiek of haven?',
  'Wat kost het om te starten?',
  'Hoe snel kan ik live gaan?',
]
const CHIPS_EN = [
  'What does BEP do for logistics or ports?',
  'What does it cost to get started?',
  'How quickly can I go live?',
]

const WELCOME_NL = 'Hoi! Ik ben BEP — je slimme bedrijfsexpert. Stel me een vraag over wat AI voor jouw organisatie kan doen, of kies een onderwerp hieronder.'
const WELCOME_EN = "Hi! I'm BEP — your smart business expert. Ask me anything about what AI can do for your organisation, or choose a topic below."

// ── Minimal markdown renderer ─────────────────────────────────────────────────

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  )
}

function renderMarkdown(text: string): ReactNode {
  if (!text) return null
  const paragraphs = text.split(/\n\n+/)
  return (
    <>
      {paragraphs.map((para, pi) => {
        const lines = para.split('\n').filter(Boolean)
        const isList = lines.length > 0 && lines.every(l => /^[-✓•]\s/.test(l.trim()))
        if (isList) {
          return (
            <ul key={pi} style={{ margin: pi === 0 ? '0' : '8px 0 0', paddingLeft: '16px' }}>
              {lines.map((item, ii) => (
                <li key={ii} style={{ marginBottom: '2px' }}>
                  {renderInline(item.replace(/^[-✓•]\s*/, ''))}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={pi} style={{ margin: pi === 0 ? '0' : '8px 0 0' }}>
            {renderInline(para.replace(/\n/g, ' '))}
          </p>
        )
      })}
    </>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroDemoChat() {
  const { t, lang } = useLang()
  const currentLang = lang === 'en' ? 'en' : 'nl'

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', content: currentLang === 'en' ? WELCOME_EN : WELCOME_NL },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [toolCalling, setToolCalling] = useState<string | null>(null)
  const [chipsVisible, setChipsVisible] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    setChipsVisible(false)

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMessage: Message = { id: Date.now(), role: 'user', content: text.trim() }

    // Skip the welcome assistant message for API — it's display-only
    const firstUserIdx = messages.findIndex(m => m.role === 'user')
    const apiBase = firstUserIdx >= 0 ? messages.slice(firstUserIdx) : []
    const apiMessages = [...apiBase, userMessage].map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setToolCalling(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang: currentLang, page: '/' }),
        signal: controller.signal,
      })

      if (!response.ok || !response.body) throw new Error('Chat request failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      const assistantId = Date.now() + 1
      let assistantAdded = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        let finished = false
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          try {
            const parsed = JSON.parse(data)
            if (parsed.type === 'tool_call') {
              setToolCalling(parsed.tool)
            } else if (parsed.type === 'text' && typeof parsed.text === 'string') {
              setToolCalling(null)
              if (!assistantAdded) {
                assistantAdded = true
                setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: parsed.text }])
              } else {
                setMessages(prev => [
                  ...prev.slice(0, -1),
                  { id: assistantId, role: 'assistant', content: prev[prev.length - 1].content + parsed.text },
                ])
              }
            } else if (parsed.type === 'done') {
              finished = true
              break
            } else if (parsed.type === 'error') {
              setToolCalling(null)
              if (!assistantAdded) {
                setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: parsed.message ?? t('Er ging iets mis.', 'Something went wrong.') }])
              }
              finished = true
              break
            }
          } catch { /* skip malformed chunk */ }
        }
        if (finished) break
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: t('Er ging iets mis. Probeer het opnieuw.', 'Something went wrong. Please try again.'),
      }])
    } finally {
      setLoading(false)
      setToolCalling(null)
    }
  }

  const chips = currentLang === 'en' ? CHIPS_EN : CHIPS_NL

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: BG_MAIN,
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      height: '420px',
      fontSize: '13px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${BORDER}`,
        background: BG_MAIN,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/images/bep-icon.png"
            alt="BEP"
            width={28}
            height={28}
            style={{ objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: TEXT_PRI }}>BEP</div>
            <div style={{ fontSize: '11px', color: '#4CAF7D', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: 6, height: 6, background: '#4CAF7D', borderRadius: '50%' }} />
              {t('Je bedrijfsexpert', 'Your business expert')}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'rgba(245,134,29,0.1)',
          border: '1px solid rgba(245,134,29,0.25)',
          padding: '4px 10px',
        }}>
          <Zap size={11} color={ORANGE} />
          <span style={{ fontSize: '11px', color: ORANGE, fontWeight: 600 }}>
            {t('Live AI', 'Live AI')}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: BG_CHAT,
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            animation: 'msg-in 0.25s ease',
          }}>
            {msg.role === 'assistant' && (
              <div style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, background: ORANGE, marginTop: 6 }} />
              </div>
            )}
            <div style={{ maxWidth: '82%' }}>
              {msg.role === 'assistant' && (
                <div style={{ fontSize: '11px', fontWeight: 700, color: ORANGE, marginBottom: '4px' }}>BEP</div>
              )}
              <div style={{
                padding: '10px 14px',
                background: msg.role === 'user' ? ORANGE : 'rgba(255,255,255,0.07)',
                color: TEXT_PRI,
                fontSize: '13px',
                lineHeight: '1.5',
                border: msg.role === 'user' ? 'none' : `1px solid rgba(255,255,255,0.06)`,
              }}>
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Quick-start chips — visible until first user message */}
        {chipsVisible && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px' }}>
            {chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => sendMessage(chip)}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: TEXT_SEC,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = ORANGE
                  el.style.color = TEXT_PRI
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.color = TEXT_SEC
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Typing indicator */}
        {loading && !toolCalling && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 8, height: 8, background: ORANGE, flexShrink: 0 }} />
            <div style={{
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.07)',
              border: `1px solid rgba(255,255,255,0.06)`,
              display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 5, height: 5,
                  background: 'rgba(255,255,255,0.3)',
                  animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Tool calling indicator */}
        {toolCalling && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            paddingLeft: '16px',
            color: TEXT_MUT,
            fontSize: '12px',
          }}>
            <Loader size={12} color={ORANGE} style={{ animation: 'spin 1s linear infinite' }} />
            {t('BEP zoekt op\u2026', 'BEP is looking up\u2026')}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        background: BG_MAIN,
        borderTop: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage(input)
            }
          }}
          placeholder={t('Stel een vraag over jouw situatie\u2026', 'Ask a question about your situation\u2026')}
          disabled={loading}
          style={{
            flex: 1,
            padding: '9px 14px',
            border: `1px solid rgba(255,255,255,0.1)`,
            background: 'rgba(255,255,255,0.04)',
            color: loading ? TEXT_MUT : TEXT_PRI,
            fontSize: '13px',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          style={{
            width: 36, height: 36,
            background: loading || !input.trim() ? 'rgba(245,134,29,0.3)' : ORANGE,
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: loading || !input.trim() ? 'default' : 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          <Send size={15} color="white" strokeWidth={2} />
        </button>
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
