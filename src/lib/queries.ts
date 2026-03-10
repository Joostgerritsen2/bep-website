import { groq } from 'next-sanity'

// === HOMEPAGE ===
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero, problem, solution, capabilities, howItWorks, caseStudy, integrations, ctaBlock, seo
  }
`

// === SITE SETTINGS ===
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    company, navigation, footer, seo
  }
`

// === PRICING ===
export const pricingPageQuery = groq`
  *[_type == "pricingPage"][0] {
    tiers, seo
  }
`

// === DATA SCAN ===
export const dataScanQuery = groq`
  *[_type == "dataScanPage"][0] {
    titleNl, titleEn, subtitleNl, subtitleEn,
    questions, profiles
  }
`

// === CASES ===
export const allCasesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id, client, slug, sector, tagline, taglineEn,
    description, descriptionEn,
    "logoUrl": logo.asset->url,
    "coverUrl": coalesce(coverImage.asset->url, externalCoverUrl),
    stats
  }
`

export const caseBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ...,
    "logoUrl": logo.asset->url,
    "coverUrl": coalesce(coverImage.asset->url, externalCoverUrl),
    "relatedCases": *[_type == "caseStudy" && slug.current != $slug] | order(order asc) [0...3] {
      _id, client, slug, sector, tagline, taglineEn,
      "coverUrl": coalesce(coverImage.asset->url, externalCoverUrl)
    }
  }
`

// === FAQ ===
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id, questionNl, questionEn, answerNl, answerEn, order
  }
`

// === BLOG ===
export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, titleEn, slug, author, publishedAt, category,
    excerpt, excerptEn,
    "coverUrl": coverImage.asset->url
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, titleEn, slug, author, publishedAt, category,
    excerpt, excerptEn, body, bodyEn,
    "coverUrl": coverImage.asset->url,
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && category == ^.category] | order(publishedAt desc) [0...3] {
      _id, title, titleEn, slug, author, publishedAt, category,
      excerpt, excerptEn,
      "coverUrl": coverImage.asset->url
    }
  }
`

// === INTEGRATIONS ===
export const allIntegrationsQuery = groq`
  *[_type == "integration"] | order(name asc) {
    _id, name, category,
    descriptionNl, descriptionEn,
    "logoUrl": logo.asset->url
  }
`
