export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        { name: 'subtitleNl', title: 'Subtitle (NL)', type: 'text' },
        { name: 'subtitleEn', title: 'Subtitle (EN)', type: 'text' },
        { name: 'ctaTextNl', title: 'CTA Text (NL)', type: 'string' },
        { name: 'ctaTextEn', title: 'CTA Text (EN)', type: 'string' },
        { name: 'ctaUrl', title: 'CTA URL', type: 'string' },
      ],
    },
    {
      name: 'problem',
      title: 'Problem Section',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        {
          name: 'items',
          title: 'Problem Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'titleNl', title: 'Title (NL)', type: 'string' },
              { name: 'titleEn', title: 'Title (EN)', type: 'string' },
              { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
              { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
            ],
          }],
        },
      ],
    },
    {
      name: 'solution',
      title: 'Solution Section',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
        { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
      ],
    },
    {
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'titleNl', title: 'Title (NL)', type: 'string' },
          { name: 'titleEn', title: 'Title (EN)', type: 'string' },
          { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
          { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
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
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'titleNl', title: 'Title (NL)', type: 'string' },
          { name: 'titleEn', title: 'Title (EN)', type: 'string' },
          { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
          { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
        ],
      }],
    },
    {
      name: 'caseStudy',
      title: 'Featured Case Study',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
        { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
        { name: 'quoteNl', title: 'Quote (NL)', type: 'text' },
        { name: 'quoteEn', title: 'Quote (EN)', type: 'text' },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'labelNl', title: 'Label (NL)', type: 'string' },
              { name: 'labelEn', title: 'Label (EN)', type: 'string' },
            ],
          }],
        },
      ],
    },
    {
      name: 'integrations',
      title: 'Integrations List',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'icon', title: 'Icon Emoji', type: 'string' },
        ],
      }],
    },
    {
      name: 'ctaBlock',
      title: 'CTA Block',
      type: 'object',
      fields: [
        { name: 'titleNl', title: 'Title (NL)', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
        { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
      ],
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
