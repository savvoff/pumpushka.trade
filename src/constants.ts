import siteConfig from './content/site-config.json';

export interface SiteConfig {
  siteTitle: Record<string, string>;
  siteDescription: Record<string, string>;
  author: string;
  defaultLanguage: string;
  isIndexing?: boolean;
}

const typedConfig = siteConfig as SiteConfig;

const SITE = {
  title: typedConfig.siteTitle,
  description: typedConfig.siteDescription,
  defaultLanguage: typedConfig.defaultLanguage,
  author: typedConfig.author,
  robots: typedConfig.isIndexing
};

const TRANSLATIONS: Record<string, any> = {
  'uk': {
    month: 'місяць',
    updated: 'Оновлено'
  },
  'en': {
    month: 'month',
    updated: 'Updated'
  }
};

export type LangCode = keyof typeof TRANSLATIONS;

export {
  SITE,
  TRANSLATIONS,
}