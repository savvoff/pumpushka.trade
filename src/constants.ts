import siteConfig from './content/site-config.json';

export interface SiteConfig {
  siteTitle: Record<string, string>;
  siteDescription: Record<string, string>;
  slogan: Record<string, string>;
  author: string;
  defaultLanguage: string;
  postsPerPage: number;
  isIndexing?: boolean;
}

const typedConfig = siteConfig as SiteConfig;

const SITE = {
  title: typedConfig.siteTitle,
  description: typedConfig.siteDescription,
  defaultLanguage: typedConfig.defaultLanguage,
  author: typedConfig.author,
  robots: typedConfig.isIndexing,
  slogan: typedConfig.slogan,
  postsPerPage: typedConfig.postsPerPage,
  placeholder: (w: number = 400, h: number = 300) => (`https://placehold.co/${w}x${h}/94a3b8/white?text=Image`)
};

const TRANSLATIONS: Record<string, any> = {
  'uk': {
    month: 'місяць',
    updated: 'Оновлено',
    home: 'Головна',
    toc: 'Зміст',
    categories: 'Категорії',
    tags: 'Теги',
    blog: 'Блог',
    blogDescription: 'Crypto blog',
    post: 'Стаття',
    page: 'Сторінка',
    words: 'слів',
    next: 'Далі',
    prev: 'Назад',
    back: 'Вернутись',
    recentPosts: 'Останні пости',
    copy: 'Копіювати',
    share: 'Поділитись',
  },
  'en': {
    month: 'month',
    updated: 'Updated',
    home: 'Homepage',
    toc: 'Table of content',
    categories: 'Categories',
    tags: 'Tags',
    blog: 'Blog',
    blogDescription: 'Crypto blog',
    post: 'post',
    page: 'Page',
    words: 'words',
    next: 'Next',
    prev: 'Prev',
    back: 'Go back',
    recentPosts: 'Recent posts',
    copy: 'Copy',
    share: 'Share',
  }
};

export type LangCode = keyof typeof TRANSLATIONS;

export {
  SITE,
  TRANSLATIONS,
}