export default {
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    {
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Tier Name', type: 'string' },
          { name: 'price', title: 'Price', type: 'string' },
          { name: 'descriptionNl', title: 'Description (NL)', type: 'string' },
          { name: 'descriptionEn', title: 'Description (EN)', type: 'string' },
          { name: 'featured', title: 'Featured', type: 'boolean' },
          {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'nl', title: 'NL', type: 'string' },
                { name: 'en', title: 'EN', type: 'string' },
              ],
            }],
          },
        ],
      }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Meta Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Meta Title (EN)', type: 'string' },
        { name: 'descriptionNl', title: 'Meta Description (NL)', type: 'text' },
        { name: 'descriptionEn', title: 'Meta Description (EN)', type: 'text' },
      ],
    },
  ],
}
