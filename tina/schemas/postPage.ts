import type { Collection } from 'tinacms';
import { DEFAULT_LANG, LANGS } from 'tina/constants';

export const postPage: Collection = {
  name: 'post',
  label: 'Пости',
  path: 'src/content/blog',
  format: 'md',
  ui: {
    filename: {
      slugify: (values) => {
        const lang = (values?.lang as string) || DEFAULT_LANG;
        const base = (values?.title ?? 'new-post')
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || 'new-post';
        return `${base}.${lang}`;
      },
    },
  },
  fields: [
    {
      type: 'string',
      name: 'lang',
      label: 'Мова',
      required: true,
      options: LANGS.map(l => ({ value: l.code, label: l.title })),
      ui: { component: 'select' },
    },
    { 
      type: 'string', 
      name: 'title', 
      label: 'Заголовок', 
      isTitle: true, 
      required: true 
    },
    { 
      type: 'string', 
      name: 'description', 
      label: 'Опис' 
    },
    {
      type: 'datetime',
      name: 'publishedAt',
      label: 'Опубліковано',
      required: true,
    },
    {
      type: 'datetime',
      name: 'updatedAt',
      label: 'Оновлено',
    },
    {
      type: 'string', 
      name: 'externalId', 
      label: 'Зовнішній ID', 
      required: true 
    },
    {
      type: 'object',
      name: 'source',
      label: 'Джерело',
      fields: [
        { type: 'string', name: 'name', label: "Ім'я" },
        { type: 'string', name: 'key', label: 'Ключ' },
        { type: 'string', name: 'type', label: 'Тип' },
        {
          type: 'string',
          name: 'url',
          label: 'URL',
          ui: {
            validate: (value?: string) => {
              if (!value) return;
              try {
                const u = new URL(value);
                if (!/^https?:$/.test(u.protocol)) return 'Протокол має бути http/https';
              } catch {
                return 'Некоректна URL-адреса';
              }
            },
          },
        },
      ],
    },
    { 
      type: 'string', 
      name: 'category', 
      label: 'Категорія', 
      required: true 
    },
    { 
      type: 'string', 
      name: 'tags', 
      label: 'Теги', 
      list: true, 
      ui: { 
        component: 'tags' 
      } 
    },
    { 
      type: 'number', 
      name: 'stickyWeight', 
      label: 'Пріоритет (липкий)' 
    },
    {
      type: 'string',
      name: 'canonicalUrl',
      label: 'Канонічна URL',
      ui: {
        validate: (value?: string) => {
          if (!value) return;
          try {
            const u = new URL(value);
            if (!/^https?:$/.test(u.protocol)) return 'Протокол має бути http/https';
          } catch {
            return 'Некоректна URL-адреса';
          }
        },
      },
    },
    {
      type: 'object',
      name: 'coverImage',
      label: 'Обкладинка',
      fields: [
        { type: 'string', name: 'raw', label: 'raw' },
        { type: 'string', name: 'full', label: 'full' },
        { type: 'string', name: 'regular', label: 'regular' },
        { type: 'string', name: 'small', label: 'small' },
        { type: 'string', name: 'thumb', label: 'thumb' },
        { type: 'string', name: 'small_s3', label: 'small_s3' },
      ],
    },
    {
      type: 'string',
      name: 'sentiment',
      label: 'Сентимент',
      options: [
        { value: 'POSITIVE', label: 'Позитивний' },
        { value: 'NEGATIVE', label: 'Негативний' },
        { value: 'NEUTRAL', label: 'Нейтральний' },
      ],
      ui: { component: 'select' },
    },
    { 
      type: 'number', 
      name: 'score', 
      label: 'Оцінка' 
    },
    {
      type: 'object',
      name: 'ai',
      label: 'AI',
      fields: [
        { type: 'boolean', name: 'rewritten', label: 'Переписано' },
        { type: 'datetime', name: 'expandedAt', label: 'Дата останньої генерації' },
        { type: 'number', name: 'version', label: 'Версія' },
        { type: 'string', name: 'translatedFrom', label: 'Мова' },
      ],
    },
    { 
      type: 'boolean', 
      name: 'draft', 
      label: 'Чернетка', 
      required: true 
    },
    { 
      type: 'rich-text', 
      name: 'body', 
      label: 'Текст', 
      isBody: true 
    },
  ],
  defaultItem: () => ({
    lang: DEFAULT_LANG,
    draft: true,
    tags: [],
  }),
};