import { client } from '@/lib/sanity'
import { allBlogPostsQuery } from '@/lib/queries'
import { localBlogPosts } from './blogData'
import { BlogOverview } from './BlogOverview'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bep.expert'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang
  const title = lang === 'en' ? 'Blog — Insights & Updates | BEP' : 'Blog — Inzichten & Updates | BEP'
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

function mergePosts(sanityPosts: any[], local: any[]) {
  const sanityIds = new Set(sanityPosts.map((p: any) => p._id))
  const unique = local.filter(p => !sanityIds.has(p._id))
  return [...sanityPosts, ...unique].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export default async function BlogPage() {
  const sanityPosts = await client.fetch(allBlogPostsQuery).catch(() => [])
  const posts = mergePosts(sanityPosts, localBlogPosts)
  return <BlogOverview posts={posts} />
}
