import { client } from '@/lib/sanity'
import { allBlogPostsQuery } from '@/lib/queries'
import { localBlogPosts } from './blogData'
import { BlogOverview } from './BlogOverview'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang
  const title = lang === 'en' ? 'Blog: Insights & Updates | BEP' : 'Blog: Inzichten & Updates | BEP'
  const description = lang === 'en'
    ? 'Read about AI, business intelligence and how BEP helps organizations unlock their data.'
    : 'Lees over AI, bedrijfsintelligentie en hoe BEP organisaties helpt hun data te ontsluiten.'
  const path = '/blog'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}${path}`,
      languages: {
        'nl': `${siteUrl}/nl${path}`,
        'en': `${siteUrl}/en${path}`,
        'x-default': `${siteUrl}/nl${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}${path}`,
      siteName: 'BEP',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
    },
  }
}

// Real photos that override any AI-generated images from Sanity
const coverImageOverrides: Record<string, string> = {
  'dode-data':           'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
  'data-soevereiniteit': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
  'kenniscrisis':        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
  'data-niet-ai':        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
}

function mergePosts(sanityPosts: any[], local: any[]) {
  const sanitySlugs = new Set(sanityPosts.map((p: any) => p.slug?.current))
  const unique = local.filter(p => !sanitySlugs.has(p.slug.current))
  const merged = [...sanityPosts, ...unique].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  // Apply real photo overrides regardless of Sanity image
  return merged.map(p => {
    const override = coverImageOverrides[p.slug?.current]
    return override ? { ...p, coverUrl: override } : p
  })
}

export default async function BlogPage() {
  const sanityPosts = await client.fetch(allBlogPostsQuery).catch(() => [])
  const posts = mergePosts(sanityPosts, localBlogPosts)
  return <BlogOverview posts={posts} />
}
