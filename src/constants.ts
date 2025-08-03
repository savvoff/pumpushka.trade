import siteConfig from './content/site-config.json';

export interface SiteConfig {
  siteTitle: Record<string, string>;
  siteDescription: Record<string, string>;
  author: string;
  defaultLanguage: string;
  isIndexing?: boolean;
}

const typedConfig = siteConfig as SiteConfig;

const SITE_TITLE = typedConfig.siteTitle;
const SITE_DESCRIPTION = typedConfig.siteDescription;
const AUTHOR = typedConfig.author;
const DEFAULT_LANG = typedConfig.defaultLanguage;
const ALLOW_ROBOTS = typedConfig.isIndexing;

const TRANSLATIONS: Record<string, any> = {
  'uk': {
    month: 'місяць'
  },
  'en': {
    month: 'month'
  }
};

export {
  SITE_TITLE,
  SITE_DESCRIPTION,
  AUTHOR,
  DEFAULT_LANG,
  TRANSLATIONS,
  ALLOW_ROBOTS
}