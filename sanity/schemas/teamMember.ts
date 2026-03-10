export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'roleEn', title: 'Role (EN)', type: 'string' },
    { name: 'bio', title: 'Bio (NL)', type: 'text' },
    { name: 'bioEn', title: 'Bio (EN)', type: 'text' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
