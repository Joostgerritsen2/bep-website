'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { cases } from './caseData'

export function CasesOverview() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Resultaten', 'Results')}</span>
            <h1>
              BEP{' '}
              <span className="highlight">{t('in de praktijk', 'in practice')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Echte resultaten voor echte bedrijven. Ontdek hoe organisaties met BEP hun bedrijfskennis ontsluiten en processen versnellen.',
                'Real results for real companies. Discover how organizations use BEP to unlock their business knowledge and accelerate processes.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== CASES GRID ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="cases-grid">
            {cases.map((caseItem, i) => (
              <FadeUp key={caseItem.slug} delay={i * 0.1}>
                <Link href={`/cases/${caseItem.slug}`} className="case-card case-card-link">
                  <div className="case-card-top">
                    <div className="case-card-sector">
                      {t(caseItem.sector.nl, caseItem.sector.en)}
                    </div>
                    <Image
                      className="case-card-logo"
                      src={caseItem.logo}
                      alt={caseItem.client}
                      width={120}
                      height={40}
                    />
                  </div>
                  <h3>{caseItem.client}</h3>
                  <p>{t(caseItem.tagline.nl, caseItem.tagline.en)}</p>
                  <div className="case-card-stats">
                    {caseItem.stats.slice(0, 2).map(stat => (
                      <div className="case-card-stat" key={stat.value}>
                        <div className="value">{stat.value}</div>
                        <div className="label">{t(stat.label.nl, stat.label.en)}</div>
                      </div>
                    ))}
                  </div>
                  <span className="case-card-cta">
                    {t('Bekijk case', 'View case')} <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>
              {t(
                'Klaar om vergelijkbare resultaten te behalen?',
                'Ready to achieve similar results?'
              )}
            </h2>
            <p>
              {t(
                'Bouw je persoonlijke BEP-plan in 2 minuten.',
                'Build your personal BEP plan in 2 minutes.'
              )}
            </p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white">
                {t('Plan een sessie', 'Schedule a session')} <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="btn btn-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
              >
                {t('Neem contact op', 'Get in touch')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
