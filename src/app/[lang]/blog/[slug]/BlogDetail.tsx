'use client'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import Image from 'next/image'
import { useLang } from '@/lib/language'
import { PortableText } from '@portabletext/react'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  technology: 'Technology',
  automation: 'Automation',
  'case-study': 'Case Study',
  business: 'Business',
}

const categoryColors: Record<string, string> = {
  ai: 'var(--orange)',
  technology: 'var(--cyan)',
  automation: 'var(--green)',
  'case-study': 'rgba(255,255,255,0.6)',
  business: 'var(--orange-dark)',
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogDetail({ post }: { post: any }) {
  const { lang, t } = useLang()
  const body = lang === 'en' && post.bodyEn ? post.bodyEn : post.body
  const relatedPosts = (post.relatedPosts || []).filter((p: any) => p.slug?.current !== 'test')
  const catColor = categoryColors[post.category] || 'var(--orange)'

  return (
    <FadeUpContainer>
      {/* Hero */}
      <section className={`blog-detail-hero ${post.coverUrl ? '' : 'blog-detail-hero-no-cover'}`}>
        {post.coverUrl && (
          <div className="blog-detail-hero-bg">
            <Image src={post.coverUrl} alt={post.title} width={1400} height={600} priority style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="blog-detail-hero-overlay" />
          </div>
        )}
        <div className="blog-detail-hero-content">
          <div className="container">
            <FadeUp>
              <Link href="/blog" className="blog-detail-back">
                <ArrowLeft size={16} />
                {t('Alle artikelen', 'All articles')}
              </Link>
            </FadeUp>
            <FadeUp>
              <div className="blog-detail-hero-meta">
                {post.category && (
                  <span className="blog-category" style={{ background: `${catColor}20`, color: catColor }}>
                    {categoryLabels[post.category] || post.category}
                  </span>
                )}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
              </div>
            </FadeUp>
            <FadeUp><h1>{t(post.title, post.titleEn)}</h1></FadeUp>
            {(post.excerpt || post.excerptEn) && (
              <FadeUp><p className="blog-detail-excerpt">{t(post.excerpt, post.excerptEn)}</p></FadeUp>
            )}
            <FadeUp>
              <div className="blog-detail-author">
                <div className="blog-detail-author-avatar">
                  {(post.author || 'B').charAt(0)}
                </div>
                <div>
                  <strong>{post.author || 'BEP'}</strong>
                  <span>BEP Team</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="blog-detail-body">
        <div className="blog-detail-content">
          {body ? (
            <PortableText value={body} components={{
              block: {
                h2: ({ children }) => <h2>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                h4: ({ children }) => <h4>{children}</h4>,
                normal: ({ children }) => <p>{children}</p>,
                blockquote: ({ children }) => <blockquote>{children}</blockquote>,
              },
              list: {
                bullet: ({ children }) => <ul>{children}</ul>,
                number: ({ children }) => <ol>{children}</ol>,
              },
              listItem: {
                bullet: ({ children }) => <li>{children}</li>,
                number: ({ children }) => <li>{children}</li>,
              },
              marks: {
                link: ({ children, value }) => (
                  <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
                ),
                strong: ({ children }) => <strong>{children}</strong>,
                em: ({ children }) => <em>{children}</em>,
              },
              types: {
                image: ({ value }) => {
                  const url = value?.asset?.url || value?.asset?._ref
                  if (!url) return null
                  return (
                    <figure className="blog-detail-figure">
                      <Image src={url} alt={value?.alt || ''} width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                      {value?.caption && <figcaption>{value.caption}</figcaption>}
                    </figure>
                  )
                },
              },
            }} />
          ) : (
            <p>{t(post.excerpt, post.excerptEn)}</p>
          )}
        </div>

        {/* Inline CTA */}
        <div className="blog-detail-cta">
          <h3>{t('Meer weten over BEP?', 'Want to learn more about BEP?')}</h3>
          <p>{t(
            'Ontdek hoe BEP jouw bedrijfsdata kan ontsluiten en processen automatiseren.',
            'Discover how BEP can unlock your business data and automate processes.'
          )}</p>
          <Link href="/contact" className="btn btn-white">
            {t('Neem contact op', 'Get in touch')} <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <FadeUp>
              <div className="section-header">
                <h2>{t('Gerelateerde artikelen', 'Related articles')}</h2>
              </div>
            </FadeUp>
            <div className="blog-grid">
              {relatedPosts.slice(0, 3).map((related: any, i: number) => (
                <FadeUp key={related._id} delay={i * 0.1}>
                  <Link href={`/blog/${related.slug?.current}`} className="blog-card">
                    <div className="blog-card-img">
                      {related.coverUrl ? (
                        <Image src={related.coverUrl} alt={related.title} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div className="blog-card-placeholder" />
                      )}
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        {related.category && (
                          <span className="blog-category" style={{
                            background: `${categoryColors[related.category] || 'var(--orange)'}20`,
                            color: categoryColors[related.category] || 'var(--orange)',
                          }}>
                            {categoryLabels[related.category] || related.category}
                          </span>
                        )}
                      </div>
                      <h3>{t(related.title, related.titleEn)}</h3>
                      <p>{t(related.excerpt, related.excerptEn)?.slice(0, 100)}...</p>
                      <span className="blog-read-more">
                        {t('Lees meer', 'Read more')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Klaar om je bedrijfsdata te ontsluiten?', 'Ready to unlock your business data?')}</h2>
            <p>{t('Ontdek in 2 minuten wat BEP voor jouw organisatie kan betekenen.', 'Discover in 2 minutes what BEP can do for your organization.')}</p>
            <div className="hero-buttons">
              <a href="/#ontdek" className="btn btn-white">
                {t('Ontdek BEP', 'Discover BEP')} <ArrowRight size={18} />
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
