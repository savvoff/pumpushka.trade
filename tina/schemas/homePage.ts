import type { Collection } from 'tinacms';

export const homePage: Collection = {
  name: 'home',
  label: 'Головна сторінка',
  path: 'src/content/pages',
  match: { include: 'home' },
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'Hero: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
        { name: 'en', label: 'English', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
      ],
    },
    {
      name: 'heroSubtitle',
      label: 'Hero: Підзаголовок',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },
    {
      name: 'heroButtonText',
      label: 'Hero: Текст кнопки',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },
    {
      name: 'heroButtonUrl',
      label: 'Hero: Посилання на кнопку',
      type: 'string',
    },
    {
      name: 'featuresTitle',
      label: 'Список можливостей: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', type: 'rich-text', label: 'Українська', toolbarOverride: ['heading', 'bold', 'italic'] },
        { name: 'en', type: 'rich-text', label: 'English', toolbarOverride: ['heading', 'bold', 'italic'] },
      ],
    },
    {
      name: 'features',
      label: 'Список можливостей',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.uk || item?.en || 'Нова можливість',
        }),
      },
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'howItWorksTitle',
      label: 'Як працює бот: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', type: 'rich-text', label: 'Українська', toolbarOverride: ['heading', 'bold', 'italic'] },
        { name: 'en', type: 'rich-text', label: 'English', toolbarOverride: ['heading', 'bold', 'italic'] },
      ],
    },

    {
      name: 'howItWorksVideo',
      label: 'Як працює бот: Відео',
      type: 'image',
    },

    {
      name: 'howItWorks',
      label: 'Як працює бот: Кроки',
      type: 'object',
      list: true,
       ui: {
        itemProps: (item) => ({
          label: item?.uk || item?.en || 'Новий крок',
        }),
      },
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'testTitle',
      label: 'Тестуй: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string', ui: { component: 'textarea' } },
        { name: 'en', label: 'English', type: 'string', ui: { component: 'textarea' } },
      ],
    },

    {
      name: 'testButtonText',
      label: 'Тестуй: Текст кнопки',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'testButtonUrl',
      label: 'Тестуй: Посилання на кнопку',
      type: 'string',
    },

    {
      name: 'tariffsTitle',
      label: 'Тарифи: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'tariffsSubTitle',
      label: 'Тарифи: Підзаголовок',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'tariffs',
      label: 'Тарифи',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title?.uk || item?.title?.en || 'Новий тариф',
        }),
      },
      fields: [
        {
          name: 'isPopular',
          label: 'Популярний',
          type: 'boolean',
        },
        {
          name: 'image',
          label: 'Зображення плану',
          type: 'image',
        },
        {
          name: 'title',
          label: 'Назва тарифу',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'price',
          label: 'Ціна',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Опис',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'benefits',
          label: 'Переваги',
          type: 'object',
          list: true,
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'buttonText',
          label: 'Текст кнопки',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'buttonUrl',
          label: 'Посилання кнопки',
          type: 'string',
        },
        {
          name: 'buttonIcon',
          label: 'Іконка кнопки',
          type: 'image',
        },        
      ],
    },
    {
      name: 'tariffsHint',
      label: 'Тарифи: Помітка',
      type: 'object',
      fields: [
        { name: 'uk', label: 'Українська', type: 'string' },
        { name: 'en', label: 'English', type: 'string' },
      ],
    },

    {
      name: 'faqTitle',
      label: 'ЧаПи: Заголовок',
      type: 'object',
      fields: [
        { name: 'uk', type: 'rich-text', label: 'Українська', toolbarOverride: ['heading', 'bold', 'italic'] },
        { name: 'en', type: 'rich-text', label: 'English', toolbarOverride: ['heading', 'bold', 'italic'] },
      ],
    },
    {
      name: 'faqList',
      label: 'Список ЧаПи',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title?.uk || item?.title?.en || 'ЧаПи пункт',
        }),
      },
      fields: [
        {
          name: 'title',
          label: 'Заголовок',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'string' },
            { name: 'en', label: 'English', type: 'string' },
          ],
        },
        {
          name: 'content',
          label: 'Контент',
          type: 'object',
          fields: [
            { name: 'uk', label: 'Українська', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
            { name: 'en', label: 'English', type: 'rich-text', toolbarOverride: ['heading', 'bold', 'italic'] },
          ],
        },
      ],
    }
  ],
};
