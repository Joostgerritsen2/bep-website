export default {
  name: 'integration',
  title: 'Integration',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: {
      list: ['ERP', 'CRM', 'Documents', 'Email', 'Communication', 'Database', 'Other'],
    }},
    { name: 'descriptionNl', title: 'Description (NL)', type: 'text' },
    { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
    { name: 'logo', title: 'Logo', type: 'image' },
  ],
}
