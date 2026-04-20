'use client'
import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/language'
import { X, Send, Loader } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = {
  nl: ['Wat kost BEP?', 'Hoe werkt het?', 'Kan ik een demo plannen?'],
  en: ['What does BEP cost?', 'How does it work?', 'Can I schedule a demo?'],
}

const PROACTIVE_MESSAGES = {
  nl: {
    '/': 'Hoi! Ik zie je de site verkent. Kan ik je uitleggen wat BEP concreet voor jouw organisatie kan doen?',
    '/cases': 'Benieuwd hoe deze cases in de praktijk werken? Stel me gerust een vraag.',
    '/pricing': 'Twijfel je welk plan past? Ik help je graag de juiste keuze maken.',
    '/toepassingen': 'Zie je al een toepassing die bij jou past? Ik kan je meer vertellen.',
    default: 'Hoi! Heb je vragen over BEP? Ik ben hier om te helpen.',
  },
  en: {
    '/': "Hi! I see you're exploring the site. Can I explain what BEP can concretely do for your organisation?",
    '/cases': 'Curious how these cases work in practice? Feel free to ask.',
    '/pricing': "Not sure which plan fits? I'm happy to help you choose.",
    '/toepassingen': 'See an application that fits? I can tell you more.',
    default: "Hi! Any questions about BEP? I'm here to help.",
  },
} as const

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

export function ChatWidget() {
  const { t, lang } = useLang()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [toolCalling, setToolCalling] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const currentLang = lang === 'en' ? 'en' : 'nl'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, toolCalling])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  // Proactive opening: fires once per session after 45s
  useEffect(() => {
    if (sessionStorage.getItem('bep-chat-proactive')) return
    const timer = setTimeout(() => {
      if (open) return
      const lang = currentLang as 'nl' | 'en'
      const pageMessages = PROACTIVE_MESSAGES[lang]
      const page = Object.keys(pageMessages).find(
        key => key !== 'default' && pathname?.startsWith(key)
      ) as keyof typeof pageMessages | undefined
      const text = pageMessages[page ?? 'default']
      sessionStorage.setItem('bep-chat-proactive', '1')
      setOpen(true)
      setMessages([{ id: Date.now(), role: 'assistant', content: text }])
    }, 45000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMessage: Message = { id: Date.now(), role: 'user', content: text.trim() }

    // The API requires messages to start with a user role.
    // If the first message is an assistant (proactive), skip it for the API call.
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
        body: JSON.stringify({ messages: apiMessages, lang: currentLang, page: pathname }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('Chat request failed')
      if (!response.body) throw new Error('No response body')

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
          } catch {
            // skip malformed chunk
          }
        }
        if (finished) break
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages(prev => {
        const filtered =
          prev[prev.length - 1]?.content === '' && prev[prev.length - 1]?.role === 'assistant'
            ? prev.slice(0, -1)
            : prev
        return [
          ...filtered,
          {
            id: Date.now(),
            role: 'assistant',
            content: t(
              'Er ging iets mis. Stuur een e-mail naar info@bep.expert.',
              'Something went wrong. Send an email to info@bep.expert.'
            ),
          },
        ]
      })
    } finally {
      setLoading(false)
      setToolCalling(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating knop */}
      <button
        className={`chat-bubble ${open ? 'chat-bubble-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={t('Open BEP chat', 'Open BEP chat')}
      >
        <Image
          src="/images/bep-icon.png"
          alt="BEP"
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
        <span className="chat-bubble-pulse" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <Image
                src="/images/bep-icon.png"
                alt="BEP"
                width={32}
                height={32}
                className="chat-header-avatar"
                style={{ objectFit: 'contain', background: 'transparent', borderRadius: 0 }}
              />
              <div>
                <div className="chat-header-name">BEP</div>
                <div className="chat-header-status">
                  <span className="chat-online-dot" />
                  {t('Je bedrijfsexpert', 'Your business expert')}
                </div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Berichtenlijst */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-msg">
                  <p>
                    {t(
                      'Hoi! Ik ben BEP. Stel me alles wat je wil weten over wat ik voor jouw organisatie kan betekenen.',
                      "Hi! I'm BEP. Ask me anything about what I can do for your organization."
                    )}
                  </p>
                </div>
                <div className="chat-quick-questions">
                  <p className="chat-quick-label">{t('Snelle vragen:', 'Quick questions:')}</p>
                  {quickQuestions[currentLang].map((q, i) => (
                    <button key={i} className="chat-quick-btn" onClick={() => sendMessage(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                <div className="chat-msg-bubble">
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {loading && !toolCalling && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}

            {toolCalling && (
              <div className="chat-tool-calling">
                <Loader size={12} className="chat-tool-loader" />
                {t('BEP zoekt op\u2026', 'BEP is looking up\u2026')}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('Stel een vraag...', 'Ask a question...')}
              disabled={loading}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label={t('Verstuur', 'Send')}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
