'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { type CaseStudy } from '../caseData'

const sectionBgs = [
  undefined,
  'rgba(245,134,29,0.06)',
  'rgba(255,255,255,0.03)',
]

export function CaseDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="case-detail-hero">
        <div className="container">
          <FadeUp>
            <Link href="/cases" className="case-detail-back">
              <ArrowLeft size={16} />
              {t('Alle cases', 'All cases')}
            </Link>
            <span className="case-detail-badge">
              {t(caseStudy.sector.nl, caseStudy.sector.en)}
            </span>
            <h1>{caseStudy.client}</h1>
            <p className="case-detail-tagline">
              {t(caseStudy.tagline.nl, caseStudy.tagline.en)}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== COVER IMAGE ===== */}
      {caseStudy.coverImage && (
        <section className="case-detail-cover">
          <div className="container">
            <FadeUp>
              <Image
                src={caseStudy.coverImage}
                alt={caseStudy.client}
                width={1200}
                height={500}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', maxHeight: 480 }}
              />
            </FadeUp>
          </div>
        </section>
      )}

      {/* ===== STATS BAR ===== */}
      <section className="case-detail-stats">
        <div className="container">
          <FadeUp>
            <div className="case-detail-stats-grid">
              {caseStudy.stats.map(stat => (
                <div className="case-detail-stat-item" key={stat.value}>
                  <div className="case-detail-stat-value">{stat.value}</div>
                  <div className="case-detail-stat-label">
                    {t(stat.label.nl, stat.label.en)}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="case-detail-intro">
        <div className="container">
          <FadeUp>
            <div className="case-detail-intro-inner">
              <Image
                className="case-detail-logo"
                src={caseStudy.logo}
                alt={caseStudy.client}
                width={180}
                height={60}
              />
              <p className="case-detail-text">
                {t(caseStudy.description.nl, caseStudy.description.en)}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== BODY SECTIONS ===== */}
      {caseStudy.sections.map((section, i) => (
        <section
          key={i}
          className="case-detail-section"
          style={sectionBgs[i] ? { background: sectionBgs[i] } : undefined}
        >
          <div className="container">
            <FadeUp>
              <div className="case-detail-section-inner">
                <h2 className="case-detail-section-title">
                  {t(section.title.nl, section.title.en)}
                </h2>
                <div className="case-detail-section-content">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{t(p.nl, p.en)}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      ))}

      {/* ===== QUOTE ===== */}
      {caseStudy.quote && (
        <section className="case-detail-quote">
          <div className="container">
            <FadeUp>
              <blockquote className="case-detail-quote-text">
                &ldquo;{t(caseStudy.quote.text.nl, caseStudy.quote.text.en)}&rdquo;
              </blockquote>
              <cite className="case-detail-quote-author">
                — {caseStudy.quote.author}
              </cite>
            </FadeUp>
          </div>
        </section>
      )}

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
              <a href="/contact" className="btn btn-white btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
              <Link href="/contact" className="btn btn-ghost btn-arrow">
                {t('Neem contact op', 'Get in touch')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
