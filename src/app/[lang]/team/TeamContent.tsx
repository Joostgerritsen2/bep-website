'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  { image: '/images/team-member-2.png', name: 'Berco Beute', role: 'AI Whisperer' },
  { image: '/images/team-member-3.png', name: 'Sven Vintges', role: 'Knowledge Magician' },
  { image: '/images/team-member-1.png', name: 'Sietse van der Laan', role: 'Making Things Work' },
  { image: '/images/team-member-4.png', name: 'Jeroen Broekema', role: 'Partner Intelligence Lead' },
  { image: '/images/team-member-6.png', name: 'Jelle Klaver', role: 'Product Enchanter' },
]

export function TeamContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Over ons', 'About us')}</span>
            <h1>
              {t('Het team achter ', 'The team behind ')}
              <span className="highlight">BEP</span>
            </h1>
            <p className="subtitle">
              {t(
                'Vanuit Groningen bouwen we aan de toekomst van bedrijfsintelligentie. Met een team van data-engineers, AI-specialisten en business consultants.',
                'From Groningen, we\'re building the future of business intelligence. With a team of data engineers, AI specialists and business consultants.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="solution-content">
            <FadeUp>
              <Image
                src="/images/team-duo.png"
                alt={t('Het BEP team', 'The BEP team')}
                width={500}
                height={400}
                style={{ objectFit: 'cover', borderRadius: 0 }}
              />
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <span className="section-label">{t('Ons verhaal', 'Our story')}</span>
                <h2>{t('Geboren uit frustratie', 'Born from frustration')}</h2>
                <p>
                  {t(
                    'We zagen hoe bedrijven dagelijks uren verspilden aan het zoeken naar informatie in tientallen losse systemen. Waardevolle kennis die verloren ging als medewerkers vertrokken. Dat moest anders.',
                    'We saw how companies wasted hours every day searching for information across dozens of separate systems. Valuable knowledge lost when employees left. That had to change.'
                  )}
                </p>
                <p>
                  {t(
                    'BEP is gebouwd om alle bedrijfskennis te verbinden, doorzoekbaar te maken en actie te ondernemen \u2014 volledig autonoom, volledig in je eigen cloud.',
                    'BEP is built to connect all business knowledge, make it searchable and take action \u2014 fully autonomous, fully in your own cloud.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== TEAM GRID ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Het team', 'The team')}</span>
              <h2>{t('De mensen achter BEP', 'The people behind BEP')}</h2>
            </div>
          </FadeUp>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1}>
                <div className="team-card">
                  <Image
                    className="team-card-photo"
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: 0 }}
                  />
                  <h3>{member.name}</h3>
                  <div className="role">{member.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Wil je samenwerken?', 'Want to collaborate?')}</h2>
            <p>
              {t(
                'We staan altijd open voor een gesprek.',
                'We\'re always open for a conversation.'
              )}
            </p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn btn-white btn-arrow">
                {t('Neem contact op', 'Get in touch')}
              </Link>
              <a href="/contact" className="btn btn-ghost btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
