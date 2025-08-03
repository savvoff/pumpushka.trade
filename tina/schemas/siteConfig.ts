import type { Collection } from 'tinacms';

export const siteConfig: Collection = {
  name: 'site',
  label: 'Конфігурація сайту',
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
    {
      name: 'header',
      label: 'Header',
      type: 'object',
      fields: [
        { 
          name: 'logo', 
          label: 'Логотип', 
          type: 'image' 
        },
        { 
          name: 'botLinkTitle', 
          label: 'Текст кнопки на бота', 
          type: 'string' 
        },
        { 
          name: 'botLink', 
          label: 'Посилання на бота', 
          type: 'string' 
        },
        {
          name: 'menu',
          label: 'Меню',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label }),
            defaultItem: () => ({
              label: 'Нове посилання',
              href: '/',
            }),
          },
          fields: [
            { name: 'image', label: 'Зображення', type: 'image' },
            { name: 'label', label: 'Назва', type: 'string' },
            { name: 'href', label: 'Посилання', type: 'string' },
          ],
        },
      ],
    },

    {
      name: 'footer',
      label: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'links',
          label: 'Footer соц. мережі',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label }),
            defaultItem: () => ({
              label: 'Нове посилання',
              href: '/',
            }),
          },
          fields: [
            { name: 'icon', label: 'Іконка', type: 'image' },
            { name: 'label', label: 'Назва', type: 'string' },
            { name: 'href', label: 'Посилання', type: 'string' },
          ],
        },
      ],
    },
  ],
};