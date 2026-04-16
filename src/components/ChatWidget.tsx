'use client'
import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/lib/language'
import { MessageCircle, X, Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = {
  nl: ['Wat kost BEP?', 'Hoe werkt het?', 'Kan ik een demo plannen?'],
  en: ['What does BEP cost?', 'How does it work?', 'Can I schedule a demo?'],
}

export function ChatWidget() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentLang = lang === 'en' ? 'en' : 'nl'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, lang: currentLang }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      setLoading(false)

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                setMessages(prev => [
                  ...prev.slice(0, -1),
                  { role: 'assistant', content: assistantContent },
                ])
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      }
    } catch {
      setLoading(false)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: t(
            'Er ging iets mis. Stuur een e-mail naar info@bep.expert.',
            'Something went wrong. Send an email to info@bep.expert.'
          ),
        },
      ])
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
        <MessageCircle size={24} />
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
                      'Hi! I\'m BEP. Ask me anything about what I can do for your organization.'
                    )}
                  </p>
                </div>
                <div className="chat-quick-questions">
                  <p className="chat-quick-label">
                    {t('Snelle vragen:', 'Quick questions:')}
                  </p>
                  {quickQuestions[currentLang].map((q, i) => (
                    <button
                      key={i}
                      className="chat-quick-btn"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-msg-bubble">
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="chat-typing">
                <span /><span /><span />
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
