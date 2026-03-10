export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'object',
      fields: [
        { name: 'name', title: 'Company Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'linkedIn', title: 'LinkedIn URL', type: 'url' },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'items',
          title: 'Nav Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'labelNl', title: 'Label (NL)', type: 'string' },
              { name: 'labelEn', title: 'Label (EN)', type: 'string' },
              { name: 'href', title: 'URL', type: 'string' },
            ],
          }],
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'taglineNl', title: 'Tagline (NL)', type: 'string' },
        { name: 'taglineEn', title: 'Tagline (EN)', type: 'string' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'noIndex', title: 'No Index', type: 'boolean' },
      ],
    },
  ],
}
