import type { Collection } from 'tinacms';

export const homePage: Collection = {
  name: 'home',
  label: 'Головна сторінка',
  path: 'src/content/pages',
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
      type: 'rich-text',
      toolbarOverride: ['heading', 'bold', 'italic'],
    },
    {
      name: 'heroSubtitle',
      label: 'Hero: Підзаголовок',
      type: 'string',
    },
    {
      name: 'heroButtonText',
      label: 'Hero: Текст кнопки',
      type: 'string',
    },
    {
      name: 'heroButtonUrl',
      label: 'Hero: Посилання на кнопку',
      type: 'string',
    },
    {
      name: 'featuresTitle',
      label: 'Список можливостей: Заголовок',
      type: 'rich-text',
      toolbarOverride: ['heading', 'bold', 'italic'],
    },
    {
      name: 'features',
      label: 'Список можливостей',
      type: 'string',
      list: true,
    },
    {
      name: 'howItWorksTitle',
      label: 'Як працює бот: Заголовок',
      type: 'rich-text',
      toolbarOverride: ['heading', 'bold', 'italic'],
    },
    {
      name: 'howItWorksVideo',
      label: 'Як працює бот: Відео',
      type: 'string',
    },
    {
      name: 'howItWorks',
      label: 'Як працює бот',
      type: 'string',
      list: true,
    },
    {
      name: 'testTitle',
      label: 'Тестуй: Заголовок',
      type: 'string',
      ui: {
        component: 'textarea',
      },
    },
    {
      name: 'testButtonText',
      label: 'Тестуй: Текст кнопки',
      type: 'string',
    },
    {
      name: 'testButtonUrl',
      label: 'Тестуй: Посилання на кнопку',
      type: 'string',
    },
    {
      name: 'tariffsTitle',
      label: 'Тарифи: Заголовок',
      type: 'string',
    },
    {
      name: 'tariffsSubTitle',
      label: 'Тарифи: Підзаголовок',
      type: 'string',
    },
    {
      name: 'tariffs',
      label: 'Тарифи',
      type: 'object',
      list: true,
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
          type: 'string',
        },
        {
          name: 'price',
          label: 'Ціна',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Опис',
          type: 'string',
        },
        {
          name: 'benefits',
          label: 'Переваги',
          type: 'string',
          list: true,
        },
        {
          name: 'buttonText',
          label: 'Текст кнопки',
          type: 'string',
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
      ui: {
        itemProps: (item) => ({
          label: item?.title ?? 'Новий тариф',
        }),
      },
    },
  ],
};