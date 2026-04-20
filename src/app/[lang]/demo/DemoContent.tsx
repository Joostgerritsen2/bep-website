'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { ArrowRight, Clock, CheckCircle2, Calendar } from 'lucide-react'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

export function DemoContent() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    date: '', time: '', message: '',
  })

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.date || !form.time) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'demo-booking' }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const whatToExpect = [
    t('30 minuten, geen salespraat', '30 minutes, no sales pitch'),
    t('We kijken live naar jouw situatie', 'We look at your situation live'),
    t('Concrete voorbeelden uit jouw sector', 'Concrete examples from your sector'),
    t('Direct antwoord op al je vragen', 'Direct answers to all your questions'),
    t('Geen verplichtingen achteraf', 'No obligations afterwards'),
  ]

  return (
    <FadeUpContainer>
      <section className="section section-white" style={{ paddingTop: 140 }}>
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Demo', 'Demo')}</span>
              <h1>{t('Plan een demo', 'Schedule a demo')}</h1>
              <p>
                {t(
                  'Kies een moment en we laten je in 30 minuten zien wat BEP voor jouw organisatie kan doen.',
                  'Pick a time and we\'ll show you in 30 minutes what BEP can do for your organisation.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="contact-grid">
            <FadeUp>
              {status === 'done' ? (
                <div style={{ padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
                  <CheckCircle2 size={48} color="#F5861D" strokeWidth={1.5} />
                  <h3>{t('Demo ingepland!', 'Demo scheduled!')}</h3>
                  <p style={{ color: '#A1AAB8', lineHeight: 1.6 }}>
                    {t(
                      `We hebben je aanvraag ontvangen voor ${form.date} om ${form.time}. Je krijgt een bevestiging op ${form.email}. Tot snel!`,
                      `We received your request for ${form.date} at ${form.time}. You'll receive a confirmation at ${form.email}. See you soon!`
                    )}
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>

                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label>{t('Naam', 'Name')} *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder={t('Jan de Vries', 'Jane Smith')}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="jan@bedrijf.nl"
                        required
                      />
                    </div>
                  </div>

                  {/* Company + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label>{t('Bedrijf', 'Company')}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => set('company', e.target.value)}
                        placeholder={t('Naam bedrijf', 'Company name')}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('Telefoon', 'Phone')}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="+31 6 ..."
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="form-group">
                    <label>
                      <Calendar size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                      {t('Gewenste datum', 'Preferred date')} *
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      min={minDate}
                      onChange={e => set('date', e.target.value)}
                      required
                    />
                  </div>

                  {/* Time slots */}
                  <div className="form-group">
                    <label>
                      <Clock size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                      {t('Tijdstip', 'Time')} *
                    </label>
                    <div className="demo-time-slots">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`demo-time-slot${form.time === slot ? ' demo-time-slot--selected' : ''}`}
                          onClick={() => set('time', slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Context */}
                  <div className="form-group">
                    <label>{t('Wat wil je bespreken? (optioneel)', 'What do you want to discuss? (optional)')}</label>
                    <textarea
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      placeholder={t(
                        'Bijv. sector, huidige tools, specifieke uitdaging...',
                        'E.g. sector, current tools, specific challenge...'
                      )}
                      style={{ minHeight: 100 }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'sending' || !form.name || !form.email || !form.date || !form.time}
                  >
                    {status === 'sending'
                      ? t('Versturen...', 'Sending...')
                      : t('Demo inplannen', 'Schedule demo')
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

            {/* Right panel */}
            <FadeUp delay={0.2}>
              <div className="contact-info">
                <h3>{t('Wat kun je verwachten', 'What to expect')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                  {whatToExpect.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 20, height: 20, flexShrink: 0,
                        background: 'rgba(245,134,29,0.15)',
                        border: '1px solid rgba(245,134,29,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <CheckCircle2 size={12} color="#F5861D" />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: '#A1AAB8' }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: 24,
                  background: 'rgba(245,134,29,0.08)',
                  border: '1px solid rgba(245,134,29,0.2)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F5861D', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('Liever direct mailen?', 'Prefer to email directly?')}
                  </div>
                  <a href="mailto:info@bep.expert" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.95rem' }}>
                    info@bep.expert
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
