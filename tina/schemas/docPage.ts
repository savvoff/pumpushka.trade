import type { Collection } from 'tinacms';
import { DEFAULT_LANG, LANGS } from 'tina/constants';

export const docPage: Collection = {
  name: 'docs',
  label: 'Документація',
  path: 'src/content/docs',
  format: 'md',
  ui: {
    filename: {
      slugify: (values) => {
        const lang = (values?.lang as string) || DEFAULT_LANG;
        const base = (values?.title ?? 'new-doc')
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || 'new-doc';
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
    { type: 'string', name: 'title', label: 'Заголовок', isTitle: true, required: true },
    { type: 'string', name: 'description', label: 'Опис', required: true },
    { type: 'number', name: 'order', label: 'Позиція' },
    { type: 'string', name: 'navTitle', label: 'Заголовок меню' },
    { type: 'boolean', name: 'draft', label: 'Чернетка' },
    { type: 'datetime', name: 'publishedAt', label: 'Опубліковано' },
    { type: 'rich-text', name: 'body', label: 'Текст', isBody: true },
  ],
  defaultItem: () => ({
    lang: DEFAULT_LANG,
    draft: true,
  }),
};