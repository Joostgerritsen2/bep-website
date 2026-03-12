'use client'
import { useState } from 'react'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import Image from 'next/image'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { ArrowRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  technology: 'Technology',
  automation: 'Automation',
  'case-study': 'Case Study',
  'business': 'Business',
}

const categoryColors: Record<string, string> = {
  ai: 'var(--orange)',
  technology: 'var(--cyan)',
  automation: 'var(--green)',
  'case-study': 'rgba(255,255,255,0.6)',
  business: 'var(--orange-dark)',
}

function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null
  const color = categoryColors[category] || 'var(--orange)'
  return (
    <span className="blog-category" style={{ background: `${color}20`, color }}>
      {categoryLabels[category] || category}
    </span>
  )
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function estimateReadTime(excerpt?: string): number {
  if (!excerpt) return 4
  const words = excerpt.split(/\s+/).length
  return Math.max(3, Math.round(words / 40))
}

export function BlogOverview({ posts }: { posts: any[] }) {
  const { lang, t } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const realPosts = posts.filter((p: any) => p.title !== 'Test' && p.slug?.current !== 'test')
  const categories = Array.from(new Set(realPosts.map((p: any) => p.category).filter(Boolean)))

  const filteredPosts = activeFilter === 'all'
    ? realPosts
    : realPosts.filter((p: any) => p.category === activeFilter)

  const featured = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1)

  return (
    <FadeUpContainer>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <FadeUp>
            <span className="section-label">Blog</span>
            <h1>
              {t('Inzichten', 'Insights')}{' '}
              <span className="highlight">{t('& Updates', '& Updates')}</span>
            </h1>
            <p className="subtitle">
              {t(
                'Lees over AI, bedrijfsintelligentie en hoe organisaties met BEP hun data ontsluiten.',
                'Read about AI, business intelligence and how organizations use BEP to unlock their data.'
              )}
            </p>
          </FadeUp>
          {categories.length > 0 && (
            <FadeUp delay={0.1}>
              <div className="blog-filters">
                <button
                  className={`blog-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  {t('Alles', 'All')} ({realPosts.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`blog-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {categoryLabels[cat] || cat} ({realPosts.filter((p: any) => p.category === cat).length})
                  </button>
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section section-white">
        <div className="container">
          {/* Featured post */}
          {featured && (
            <FadeUp>
              <Link href={`/blog/${featured.slug?.current}`} className="blog-featured">
                <div className="blog-featured-img">
                  {featured.coverUrl ? (
                    <Image src={featured.coverUrl} alt={featured.title} width={800} height={500} priority style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="blog-featured-placeholder" />
                  )}
                </div>
                <div className="blog-featured-body">
                  <div className="blog-featured-meta">
                    <CategoryBadge category={featured.category} />
                    <span className="blog-date">
                      {formatDate(featured.publishedAt, lang)} · {estimateReadTime(featured.excerpt)} min
                    </span>
                  </div>
                  <h2>{t(featured.title, featured.titleEn)}</h2>
                  <p>{t(featured.excerpt, featured.excerptEn)}</p>
                  <span className="blog-read-more">
                    {t('Lees meer', 'Read more')} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </FadeUp>
          )}

          {/* Grid */}
          {gridPosts.length > 0 && (
            <>
              <div className="blog-grid-header">
                <h2>{activeFilter === 'all' ? t('Alle artikelen', 'All articles') : categoryLabels[activeFilter] || activeFilter}</h2>
                <span className="blog-grid-count">{filteredPosts.length} {t('artikelen', 'articles')}</span>
              </div>
              <div className="blog-grid">
                {gridPosts.map((post: any, i: number) => (
                  <FadeUp key={post._id || i} delay={i * 0.1}>
                    <Link href={`/blog/${post.slug?.current}`} className="blog-card">
                      <div className="blog-card-img">
                        {post.coverUrl ? (
                          <Image src={post.coverUrl} alt={post.title} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div className="blog-card-placeholder" />
                        )}
                      </div>
                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <CategoryBadge category={post.category} />
                          <span className="blog-date">{estimateReadTime(post.excerpt)} min</span>
                        </div>
                        <h3>{t(post.title, post.titleEn)}</h3>
                        <p>{t(post.excerpt, post.excerptEn)?.slice(0, 120)}...</p>
                        <span className="blog-read-more">
                          {t('Lees meer', 'Read more')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <FadeUp>
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <h3>{t('Nog geen artikelen', 'No articles yet')}</h3>
                <p style={{ color: 'var(--steel)', marginTop: 8 }}>
                  {t('We werken aan nieuwe content. Kom snel terug!', 'We\'re working on new content. Come back soon!')}
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Klaar om je bedrijfsdata te ontsluiten?', 'Ready to unlock your business data?')}</h2>
            <p>{t('Ontdek in 2 minuten wat BEP voor jouw organisatie kan betekenen.', 'Discover in 2 minutes what BEP can do for your organization.')}</p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-white">
                {t('Plan een sessie', 'Schedule a session')} <ArrowRight size={18} />
              </a>
              <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                {t('Neem contact op', 'Get in touch')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
