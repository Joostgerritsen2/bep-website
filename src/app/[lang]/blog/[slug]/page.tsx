import { client } from '@/lib/sanity'
import { blogPostBySlugQuery, allBlogPostsQuery } from '@/lib/queries'
import { localBlogPosts } from '../blogData'
import { notFound } from 'next/navigation'
import { BlogDetail } from './BlogDetail'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export const revalidate = 60

function findPost(slug: string, sanityPost: any) {
  if (sanityPost) return sanityPost
  return localBlogPosts.find(p => p.slug.current === slug) || null
}

export async function generateStaticParams() {
  const sanityPosts = await client.fetch(allBlogPostsQuery).catch(() => [])
  const localSlugs = localBlogPosts.map(p => p.slug.current)
  const sanitySlugs = sanityPosts.map((p: any) => p.slug?.current || '').filter(Boolean)
  const allSlugs = Array.from(new Set([...sanitySlugs, ...localSlugs]))
  return ['nl', 'en'].flatMap(lang =>
    allSlugs.map(slug => ({ lang, slug }))
  )
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const { lang, slug } = params
  const sanityPost = await client.fetch(blogPostBySlugQuery, { slug }).catch(() => null)
  const post = findPost(slug, sanityPost)
  if (!post) return { title: 'Blog | BEP' }

  const title = lang === 'en'
    ? (post.titleEn || post.title)
    : (post.title || post.titleEn)
  const description = lang === 'en'
    ? (post.excerptEn || post.excerpt || '')
    : (post.excerpt || post.excerptEn || '')

  return {
    title: `${title} | BEP Blog`,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog/${slug}`,
      languages: {
        'nl': `${siteUrl}/nl/blog/${slug}`,
        'en': `${siteUrl}/en/blog/${slug}`,
        'x-default': `${siteUrl}/nl/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
      publishedTime: post.publishedAt,
      authors: [post.author || 'BEP'],
      ...(post.coverUrl && { images: [{ url: post.coverUrl, width: 1200, height: 630 }] }),
    },
  }
}

export default async function BlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const { lang, slug } = params
  const sanityPost = await client.fetch(blogPostBySlugQuery, { slug }).catch(() => null)
  const post = findPost(slug, sanityPost)
  if (!post) notFound()

  const bodyForLang = lang === 'en' && post.bodyEn ? post.bodyEn : post.body
  const articleBodyText = (bodyForLang || [])
    .filter((b: any) => b._type === 'block')
    .map((b: any) => b.children?.map((c: any) => c.text).join('') || '')
    .join(' ')
    .slice(0, 5000)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: lang === 'en' ? (post.titleEn || post.title) : post.title,
    description: lang === 'en' ? (post.excerptEn || post.excerpt || '') : (post.excerpt || ''),
    articleBody: articleBodyText || undefined,
    author: { '@type': 'Person', name: post.author || 'BEP' },
    publisher: {
      '@type': 'Organization',
      name: 'BEP',
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    url: `${siteUrl}/${lang}/blog/${slug}`,
    inLanguage: lang === 'en' ? 'en' : 'nl',
    ...(post.coverUrl && { image: post.coverUrl }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${lang}/blog/${slug}` },
  }

  return (
    <>
      <BlogDetail post={post} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}
