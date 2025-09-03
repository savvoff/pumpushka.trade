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