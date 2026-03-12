'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Mail, ArrowRight } from 'lucide-react'

export function ContactContent() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <FadeUpContainer>
      <section className="section section-white" style={{ paddingTop: 140 }}>
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">Contact</span>
              <h1>{t('Neem contact op', 'Get in touch')}</h1>
              <p>
                {t(
                  'Vraag een demo aan, stel een vraag of plan een gesprek.',
                  'Request a demo, ask a question or schedule a meeting.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="contact-grid">
            <FadeUp>
              {status === 'done' ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h3>{t('Bedankt voor je bericht!', 'Thanks for your message!')}</h3>
                  <p style={{ color: '#A1AAB8', marginTop: 12 }}>
                    {t(
                      'We nemen zo snel mogelijk contact met je op.',
                      'We will get back to you as soon as possible.'
                    )}
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>{t('Naam', 'Name')}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('Bedrijf', 'Company')}</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('Bericht', 'Message')}</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending'
                      ? t('Versturen...', 'Sending...')
                      : t('Verstuur bericht', 'Send message')
                    }
                    <ArrowRight size={16} />
                  </button>
                  {status === 'error' && (
                    <p style={{ color: '#EF4444', fontSize: '0.875rem' }}>
                      {t('Er ging iets mis. Probeer het opnieuw.', 'Something went wrong. Try again.')}
                    </p>
                  )}
                </form>
              )}
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="contact-info">
                <h3>{t('Direct contact', 'Direct contact')}</h3>
                <div className="contact-info-item">
                  <div className="icon"><Mail size={20} /></div>
                  <div className="details">
                    <h4>Email</h4>
                    <a href="mailto:info@bep.expert">info@bep.expert</a>
                  </div>
                </div>
                <div style={{ marginTop: 40, padding: 24, background: 'rgba(245,134,29,0.12)', borderRadius: '16px', border: '1px solid rgba(245,134,29,0.2)' }}>
                  <h4 style={{ marginBottom: 8 }}>{t('Liever eerst ontdekken?', 'Prefer to explore first?')}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#A1AAB8', marginBottom: 16 }}>
                    {t(
                      'Bouw je persoonlijke BEP-plan in 2 minuten.',
                      'Build your personal BEP plan in 2 minutes.'
                    )}
                  </p>
                  <a href="/contact" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
                    {t('Plan een sessie', 'Schedule a session')} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </FadeUpContainer>
  )
}
