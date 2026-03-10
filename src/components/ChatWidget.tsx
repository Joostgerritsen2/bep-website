'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language'
import { MessageCircle, X, ArrowRight, Mail } from 'lucide-react'

const WHATSAPP_NUMBER = '31622557546'
const EMAIL = 'askme@bep.chat'

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function ChatWidget() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const openWhatsApp = (message?: string) => {
    const msg = encodeURIComponent(
      message || t('Hoi, ik heb een vraag over BEP.', 'Hi, I have a question about BEP.')
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        className={`chat-bubble ${open ? 'chat-bubble-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
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
              <div className="chat-header-avatar">B</div>
              <div>
                <div className="chat-header-name">BEP</div>
                <div className="chat-header-status">
                  <span className="chat-online-dot" />
                  {t('We staan voor je klaar', 'We\'re here for you')}
                </div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-body">
            <div className="chat-welcome">
              <div className="chat-welcome-msg">
                <p>
                  {t(
                    'Hoi! 👋 Heb je een vraag over BEP of wil je weten wat we voor jouw organisatie kunnen betekenen? Chat direct met ons!',
                    'Hi! 👋 Have a question about BEP or want to know what we can do for your organization? Chat with us directly!'
                  )}
                </p>
              </div>

              {/* Primary: WhatsApp */}
              <button
                className="chat-whatsapp-btn"
                onClick={() => openWhatsApp()}
              >
                <WhatsAppIcon />
                {t('Chat via WhatsApp', 'Chat via WhatsApp')}
                <ArrowRight size={16} />
              </button>

              {/* Quick questions */}
              <div className="chat-quick-questions">
                <p className="chat-quick-label">{t('Of stel direct een vraag:', 'Or ask a quick question:')}</p>
                {[
                  { nl: 'Wat kan BEP voor mijn bedrijf betekenen?', en: 'What can BEP do for my business?' },
                  { nl: 'Ik wil een demo plannen', en: 'I want to schedule a demo' },
                  { nl: 'Wat zijn de kosten?', en: 'What are the costs?' },
                ].map((q, i) => (
                  <button
                    key={i}
                    className="chat-quick-btn"
                    onClick={() => openWhatsApp(t(q.nl, q.en))}
                  >
                    {t(q.nl, q.en)}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="chat-divider">
                <span>{t('of', 'or')}</span>
              </div>

              {/* Secondary: Email */}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(t('Vraag over BEP', 'Question about BEP'))}`}
                className="chat-email-btn"
              >
                <Mail size={16} />
                {t('Stuur een e-mail', 'Send an email')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
