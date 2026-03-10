export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title (NL)', type: 'string' },
    { name: 'titleEn', title: 'Title (EN)', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'excerpt', title: 'Excerpt (NL)', type: 'text' },
    { name: 'excerptEn', title: 'Excerpt (EN)', type: 'text' },
    { name: 'body', title: 'Body (NL)', type: 'array', of: [{ type: 'block' }] },
    { name: 'bodyEn', title: 'Body (EN)', type: 'array', of: [{ type: 'block' }] },
    { name: 'coverImage', title: 'Cover Image', type: 'image' },
  ],
}
