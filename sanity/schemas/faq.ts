export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'questionNl', title: 'Question (NL)', type: 'string' },
    { name: 'questionEn', title: 'Question (EN)', type: 'string' },
    { name: 'answerNl', title: 'Answer (NL)', type: 'text' },
    { name: 'answerEn', title: 'Answer (EN)', type: 'text' },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
