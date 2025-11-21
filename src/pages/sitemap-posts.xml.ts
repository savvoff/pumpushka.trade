import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from 'src/constants';

type BlogEntry = Awaited<ReturnType<typeof getCollection<'blog'>>>[number];

function getDate(entry: BlogEntry): Date {
  return (
    entry.data.updatedAt ||
    entry.data.publishedAt ||
    new Date()
  );
}

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Missing site config', { status: 500 });
  }

  const entries = await getCollection('blog', ({ data }) => !data.draft);

  const groups = new Map<
    string,
    { en?: BlogEntry; uk?: BlogEntry; others: BlogEntry[] }
  >();

  for (const e of entries) {
    const externalId = String(e.data.externalId || e.slug);
    const lang = (e.data.lang || SITE.defaultLanguage).toLowerCase();

    const g = groups.get(externalId) ?? { others: [] };
    if (lang === 'en') g.en = e;
    else if (lang === 'uk') g.uk = e;
    else g.others.push(e);
    groups.set(externalId, g);
  }

  const urls: string[] = [];

  for (const [, g] of groups) {
    const variants: { lang: string; loc: string; lastmod: string }[] = [];

    if (g.en) {
      const u = new URL(`/en/blog/${g.en.slug}/`, site);
      variants.push({
        lang: 'en',
        loc: u.toString(),
        lastmod: getDate(g.en).toISOString().slice(0, 10),
      });
    }
    if (g.uk) {
      // default lang without locale
      const u = new URL(`/blog/${g.uk.slug}/`, site);
      variants.push({
        lang: 'uk',
        loc: u.toString(),
        lastmod: getDate(g.uk).toISOString().slice(0, 10),
      });
    }

    if (variants.length === 0) continue;

    const lastmod = variants
      .map((v) => v.lastmod)
      .sort()
      .slice(-1)[0];

    for (const v of variants) {
      const altLinks = variants
        .map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.loc}" />`
        )
        .join('');
      const xDefault = variants[0];
      const xDefaultLink = xDefault
        ? `<xhtml:link rel="alternate" hreflang="x-default" href="${xDefault.loc}" />`
        : '';

      urls.push(`
  <url>
    <loc>${v.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    ${altLinks}
    ${xDefaultLink}
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
