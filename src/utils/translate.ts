import { DEFAULT_LANG } from 'src/constants';

export function useI18n(lang: string) {
  return function t<T = string>(field: Record<string, T>): T {
    return field?.[lang] ?? field?.[DEFAULT_LANG];
  }
}