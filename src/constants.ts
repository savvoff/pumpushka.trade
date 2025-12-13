import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import Cta1 from '@components/adv/Cta1.astro';
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
  placeholder: (w: number = 400, h: number = 300) => (`https://placehold.co/${w}x${h}/94a3b8/white?text=Image`),
  cta: {
    Cta1
  },
};

export type CtaName = keyof typeof SITE.cta;

const TRANSLATIONS: Record<string, any> = {
  'uk': {
    month: 'місяць',
    updated: 'Оновлено',
    home: 'Головна',
    toc: 'Зміст',
    categories: 'Категорії',
    tags: 'Теги',
    blog: 'Блог',
    source: 'Джерело',
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
    copyright: 'Всі права захищені',
    aboutUs: 'Про нас',
    contacts: 'Контакти',
    writeUs: 'Зв`язок зі мною',
    send: 'Відправити',
  },
  'en': {
    month: 'month',
    updated: 'Updated',
    home: 'Homepage',
    toc: 'Table of content',
    categories: 'Categories',
    tags: 'Tags',
    blog: 'Blog',
    source: 'Source',
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
    copyright: 'All rights reserved',
    aboutUs: 'About us',
    contacts: 'Contacts',
    writeUs: 'Write to me',
    send: 'Send message',
  }
};

export type LangCode = keyof typeof TRANSLATIONS;

export {
  SITE,
  TRANSLATIONS,
}