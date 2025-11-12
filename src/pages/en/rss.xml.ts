import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { pathToSlug } from '@utils/buildDocsSidebar';
import { useI18n } from '@utils/translate';
import { SITE } from 'src/constants';
import type { BlogPageContent } from 'src/types';
import blog from '../../content/pages/blog.json';

export async function GET(context: APIContext) {
  const content = blog as BlogPageContent;
  const blogCollection = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'en');
  const t = useI18n('en');
  return rss({
    title: `${SITE.author} ${t(content.blogTitle)}`,
    description: t(content.blogDescription),
    site: context.site!,
    items: blogCollection.map((post) => ({
      title: post.data.title,
      pubDate: post.data.updatedAt ?? post.data.publishedAt,
      description: post.data.description,
      // Compute RSS link from post `id`
      link: `/en/blog/${pathToSlug(post.id, 'en')}/`,
    })),
  });
}