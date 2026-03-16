'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
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
      {/* ===== IMMERSIVE HERO ===== */}
      <section
        className="case-detail-hero"
        style={caseStudy.coverImage ? { backgroundImage: `url(${caseStudy.coverImage})` } : undefined}
      >
        <div className="container">
          <FadeUp>
            <Link href="/cases" className="case-detail-back">
              <ArrowLeft size={16} />
              {t('Alle cases', 'All cases')}
            </Link>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span className="case-detail-badge">
              {t(caseStudy.sector.nl, caseStudy.sector.en)}
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1>{caseStudy.client}</h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="case-detail-tagline">
              {t(caseStudy.tagline.nl, caseStudy.tagline.en)}
            </p>
          </FadeUp>
        </div>
        <div className="case-detail-scroll">
          <ChevronDown size={24} />
        </div>
      </section>

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
