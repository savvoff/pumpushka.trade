import type { Collection } from 'tinacms';

export const blogPage: Collection = {
  name: 'blog',
  label: 'Блог',
  path: 'src/content/pages',
  format: 'json',
  match: { include: 'blog' },
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: 'blogTitle',
      label: 'Заголовок блога',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },
    {
      name: 'blogDescription',
      label: 'Опис блога',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string', ui: { component: 'textarea' } },
        { name: 'en', label: 'English', type: 'string', ui: { component: 'textarea' } },
      ],
    },
  ]
};
