export default {
  name: 'dataScanPage',
  title: 'Data Scan Page',
  type: 'document',
  fields: [
    { name: 'titleNl', title: 'Title (NL)', type: 'string' },
    { name: 'titleEn', title: 'Title (EN)', type: 'string' },
    { name: 'subtitleNl', title: 'Subtitle (NL)', type: 'text' },
    { name: 'subtitleEn', title: 'Subtitle (EN)', type: 'text' },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'questionNl', title: 'Question (NL)', type: 'string' },
          { name: 'questionEn', title: 'Question (EN)', type: 'string' },
          { name: 'subtitleNl', title: 'Subtitle (NL)', type: 'string' },
          { name: 'subtitleEn', title: 'Subtitle (EN)', type: 'string' },
          {
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'nl', title: 'NL', type: 'string' },
                { name: 'en', title: 'EN', type: 'string' },
                { name: 'score', title: 'Score', type: 'number' },
              ],
            }],
          },
        ],
      }],
    },
    {
      name: 'profiles',
      title: 'Result Profiles',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'nameNl', title: 'Name (NL)', type: 'string' },
          { name: 'nameEn', title: 'Name (EN)', type: 'string' },
          { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
          { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
          { name: 'recommendationNl', title: 'Recommendation (NL)', type: 'string' },
          { name: 'recommendationEn', title: 'Recommendation (EN)', type: 'string' },
          { name: 'minScore', title: 'Min Score', type: 'number' },
        ],
      }],
    },
  ],
}
