import type { Collection } from 'tinacms';

export const siteConfig: Collection = {
  name: 'site',
  label: 'Глобальна конфігурація',
  path: 'src/content',
  match: {
    exclude: 'pages/**',
  },
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [    
    {
      name: 'siteTitle',
      label: 'Заголовок сайту',
      type: 'string',
    },
    {
      name: 'siteDescription',
      label: 'Опис сайту',
      type: 'rich-text',
    },
    {
      name: 'author',
      label: 'Автор',
      type: 'string',
    },
    {
      name: 'defaultLanguage',
      label: 'Мова по-замовчуванню',
      type: 'string',
    },
    {
      name: 'isIndexing',
      label: 'Дозволити індексацію',
      type: 'boolean',
    },
  ],
};