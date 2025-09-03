import type { MarkdownInstance } from 'astro';
import type { LangCode } from 'src/constants';
import type { FM } from 'src/types';


type SidebarItem = { text: string; link: string };

const modules = import.meta.glob('/src/content/docs/**/*.md');

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const pathToSlug = (path: string, lang: string) =>
  path
    .replace(/^\/src\/content\/docs\//, '')
    .replace(new RegExp(`\\.${escape(lang)}\\.md$`, 'i'), '');

export async function buildDocsSidebar(
  lang: LangCode,
  opts: { withLangPrefix?: boolean } = { withLangPrefix: true }
): Promise<SidebarItem[]> {
  const items: (SidebarItem & { _order: number })[] = [];

  for (const [path, load] of Object.entries(modules)) {
    const mod = (await load()) as MarkdownInstance<FM>;
    const fm = mod.frontmatter;
    
    if (fm.draft || fm.lang !== lang) continue;
    const slug = pathToSlug(path, lang);
    const prefix = opts.withLangPrefix ? `/${lang}` : '';
    items.push({
      text: fm?.navTitle ?? fm.title,
      link: `${prefix}/docs/${slug}`,
      _order: fm.order ?? 999,
    });
  }

  items.sort((a, b) => a._order - b._order || a.text.localeCompare(b.text));

  return items.map(({ text, link }) => ({ text, link }));
}
