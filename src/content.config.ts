import { defineCollection, z } from 'astro:content';
import { SITE } from 'src/constants';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    lang: z.string().default(SITE.defaultLanguage),
    externalId: z.string(),
    source: z.object({
      name: z.string(),
      key: z.string(),
      type: z.string(),
      url: z.string().optional()
    }).optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    stickyWeight: z.number().default(0),
    canonicalUrl: z.string().url().nullable().optional(),
    coverImage: z.object({
      raw: z.string(),
      full: z.string(),
      regular: z.string(),
      small: z.string(),
      thumb: z.string(),
      small_s3: z.string().optional()
    }).nullable().optional(),
    sentiment: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL']).optional(),
    score: z.number().optional(),
    draft: z.boolean().default(false),
    ai: z.object({
      rewritten: z.boolean().default(false),
      expandedAt: z.coerce.date().optional(),
      version: z.number().optional(),
      translatedFrom: z.string().optional(),
    }).nullable().optional(),
  })
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    navTitle: z.string().optional(),
    description: z.string(),
    order: z.number().optional(),
    publishedAt: z.date().optional(),
    draft: z.boolean().default(false),
    lang: z.string().default(SITE.defaultLanguage),
  }),
});

export const collections = { blog, docs };
