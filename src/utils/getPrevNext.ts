import type { SidebarItem } from 'src/types';

const normalize = (p: string | undefined) => p?.replace(/\/+$/, '') ?? '#';

export function getPrevNext(items: SidebarItem[], currentLink: string) {
  const i = items.findIndex(item => normalize(item.link) === normalize(currentLink));
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? items[i - 1] : null,
    next: i < items.length - 1 ? items[i + 1] : null,
  };
}
