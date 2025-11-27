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
  defaultItem: () => ({
    postsPerPage: 12,
  }),
  fields: [
    {
      name: 'siteTitle',
      label: 'Заголовок сайту',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },
    {
      name: 'siteDescription',
      label: 'Опис сайту',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'rich-text' },
        { name: 'en', label: 'English', type: 'rich-text' },
      ],
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
      name: 'postsPerPage',
      label: 'Кількість постів на сторінку',
      type: 'number',
    },
    {
      name: 'slogan',
      label: 'Дивіз',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
        { name: 'en', label: 'English', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
      ],
    },
    {
      name: 'header',
      label: 'Header',
      type: 'object',
      fields: [
        {
          name: 'logo',
          label: 'Логотип',
          type: 'image',
        },
        {
          name: 'botLinkTitle',
          label: 'Текст кнопки на бота',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'botLink',
          label: 'Посилання на бота',
          type: 'string',
        },
        {
          name: 'menu',
          label: 'Меню',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label?.uk }),
            defaultItem: () => ({
              label: { uk: 'Нове посилання', en: 'New Link' },
              href: { uk: '/', en: '/' },
            }),
          },
          fields: [
            { name: 'image', label: 'Зображення', type: 'image' },
            {
              name: 'label',
              label: 'Назва',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
            {
              name: 'href',
              label: 'Посилання',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
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
          name: 'logo',
          label: 'Логотип',
          type: 'image',
        },
        {
          name: 'about',
          label: 'Про автора',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
            { name: 'en', label: 'English', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
          ],
        },
        {
          name: 'links',
          label: 'Footer соц. мережі',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label?.uk }),
            defaultItem: () => ({
              label: { uk: 'Нове посилання', en: 'New Link' },
              href: { uk: '#', en: '#' },
            }),
          },
          fields: [
            { name: 'icon', label: 'Іконка', type: 'image' },
            {
              name: 'label',
              label: 'Назва',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
            {
              name: 'href',
              label: 'Посилання',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'navigation',
          label: 'Навігація',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label?.uk }),
            defaultItem: () => ({
              label: { uk: 'Нове посилання', en: 'New Link' },
              href: { uk: '#', en: '#' },
            }),
          },
          fields: [
            {
              name: 'label',
              label: 'Назва',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
            {
              name: 'href',
              label: 'Посилання',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
          ],
        },      
        {
          name: 'contacts',
          label: 'Контакти',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => ({ label: item?.label?.uk }),
            defaultItem: () => ({
              label: { uk: 'Нове посилання', en: 'New Link' },
              href: { uk: '#', en: '#' },
            }),
          },
          fields: [
            { name: 'icon', label: 'Іконка', type: 'string', description: 'tabler.io' },
            {
              name: 'label',
              label: 'Назва',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
            {
              name: 'href',
              label: 'Посилання',
              type: 'object',
              fields: [
                { name: 'uk', label: 'Українська', type: 'string' },
                { name: 'en', label: 'English', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'form',
          label: 'Форма зв\'язку',
          type: 'object',
          ui: {
            defaultItem: () => ({
              token: 'token',
            }),
          },
          fields: [
            { name: 'token', label: 'Токен', type: 'string' },
          ],
        },
      ],
    },
  ],
};
