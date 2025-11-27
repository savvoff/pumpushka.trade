import { SITE } from 'src/constants';

export function useI18n(lang: string) {
  return function t<T = string>(field: Record<string, T> | undefined): T {
    if (field) {
      return field?.[lang] ?? field?.[SITE.defaultLanguage];
    }
    return '' as T;
  }
}