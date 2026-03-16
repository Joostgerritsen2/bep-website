import { client } from '@/lib/sanity'
import { allBlogPostsQuery } from '@/lib/queries'
import { cases } from './[lang]/cases/caseData'
import { localBlogPosts } from './[lang]/blog/blogData'

const siteUrl = 'https://bep.expert'
const locales = ['nl', 'en']

function localizedEntries(path: string, opts: { lastModified?: Date; changeFrequency?: string; priority?: number }) {
  return locales.map(locale => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified: opts.lastModified || new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: {
        nl: `${siteUrl}/nl${path}`,
        en: `${siteUrl}/en${path}`,
        'x-default': `${siteUrl}/nl${path}`,
      },
    },
  }))
}

export default async function sitemap() {
  // Fetch blog posts from Sanity (with fallback)
  const blogPosts = await client.fetch(allBlogPostsQuery).catch(() => [])

  const sanitySlugs = new Set(blogPosts.map((p: any) => p.slug?.current))
  const allPosts = [
    ...blogPosts,
    ...localBlogPosts.filter(p => !sanitySlugs.has(p.slug.current)),
  ]

  const blogEntries = allPosts.flatMap((post: any) => {
    const slug = post.slug?.current
    if (!slug) return []
    return localizedEntries(`/blog/${slug}`, {
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  const caseEntries = cases.flatMap(c =>
    localizedEntries(`/cases/${c.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  )

  return [
    // Static pages
    ...localizedEntries('', { changeFrequency: 'weekly', priority: 1 }),
    ...localizedEntries('/waarom-bep', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/filosofie', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/cases', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/team', { changeFrequency: 'monthly', priority: 0.6 }),
    ...localizedEntries('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/contact', { changeFrequency: 'yearly', priority: 0.7 }),
    ...localizedEntries('/privacy', { changeFrequency: 'yearly', priority: 0.3 }),
    // Dynamic pages
    ...caseEntries,
    ...blogEntries,
  ]
}
