import type { LangCode } from './constants';

export type FM = {
  title: string;
  lang: LangCode;
  description: string;
  navTitle?: string,
  image?: string;
  draft?: boolean;
  publishedAt?: string | Date;
  order?: number;
};

export type SidebarItem = { 
  text: string; 
  link?: string; 
  header?: boolean 
};

export type Post = {
  title: string;
  description?: string;
  publishedAt: EpochTimeStamp; // epoch ms
  updatedAt?: EpochTimeStamp;
  lang: LangCode;
  externalId: string; // id
  source?: { 
    name:string; 
    key:string; 
    type:string; 
    url?:string 
  };
  category: string; 
  tags: string[];
  stickyWeight?: number; 
  canonicalUrl?: string;
  coverImage?: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
  sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score?: number;
  draft: boolean;
  ai?: {
    rewritten: boolean,
    expandedAt?: EpochTimeStamp,
    version?: number,
    translatedFrom?: string,
  }
}

export interface Tariff {
  isPopular: boolean;
  image: string;
  title: Record<string, string>;
  price: string;
  description: Record<string, string>;
  benefits: Record<string, string>[];
  buttonText: Record<string, string>;
  buttonUrl: string;
  buttonIcon: string;
}

export interface FaqItem {
  title: Record<string, string>;
  content: Record<string, string>;
}

export interface HomePageContent {
  heroTitle: Record<string, string>;
  heroSubtitle: Record<string, string>;
  heroButtonText: Record<string, string>;
  heroButtonUrl: string;
  featuresTitle: Record<string, string>;
  features: Record<string, string>[];
  howItWorksTitle: Record<string, string>;
  howItWorksVideo: string;
  howItWorks: Record<string, string>[];
  testTitle: Record<string, string>;
  testButtonText: Record<string, string>;
  testButtonUrl: string;
  tariffsTitle: Record<string, string>;
  tariffsSubTitle: Record<string, string>;
  tariffsHint: Record<string, string>;
  tariffs: Tariff[];
  faqTitle: Record<string, string>;
  faqList: FaqItem[];
}

export interface BlogPageContent {
  blogTitle: Record<string, string>;
  blogDescription: Record<string, string>;
}

type MenuItem = {
  image: string;
  label: Record<string, string>;
  href: Record<string, string>;
};

export interface Header {
  logo?: string;
  menu?: MenuItem[];
  botLink?: string;
  botLinkTitle?: Record<string, string>;
}

type SocialItem = {
  icon: string;
  label: Record<string, string>;
  href: Record<string, string>;
};

type ContactsItem = {
  icon: string;
  label: Record<string, string>;
  href: Record<string, string>;
};

type NavItem = {
  label: Record<string, string>;
  href: Record<string, string>;
};

export interface Footer {
  logo?: string;
  about?: Record<string, string>;
  links?: SocialItem[];
  navigation?: NavItem[];
  contacts?: ContactsItem[];
  form?: {
    token?: string;
  };
}