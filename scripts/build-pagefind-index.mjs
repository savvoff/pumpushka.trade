import * as pagefind from 'pagefind';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const OUTPUT_DIR = path.join(ROOT, 'public', 'pagefind');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.isFile() && full.endsWith('.md')) files.push(full);
  }
  return files;
}

function splitFrontmatter(src) {
  const fmMatch = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { data: {}, body: src };

  const [, fm, body] = fmMatch;
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    let v = raw.trim();
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    else if (!Number.isNaN(Number(v))) v = Number(v);
    data[key] = v;
  }
  return { data, body };
}

function stripMarkdown(md) {
  return String(md)
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, ' ')     // code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')     // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')      // links
    .replace(/[#>*_\-`]+/g, ' ')               // base markers
    .replace(/\s+/g, ' ')
    .trim();
}

const files = await walk(BLOG_DIR);

const { index } = await pagefind.createIndex({
  // you can not set it if you want language detection by content
  // forceLanguage: 'en',
  verbose: false,
});

for (const file of files) {
  const src = await fs.readFile(file, 'utf8');
  const { data, body } = splitFrontmatter(src);

  const lang = (data.lang || 'en').toLowerCase();
  if (!['en', 'uk'].includes(lang)) continue;

  const rel = path.relative(BLOG_DIR, file);           
  const slugPath = rel
    .replace(/\\/g, '/') 
    .replace(/(\.[a-z]{2})?\.md$/, '');                            

  const langPrefix = lang === 'uk' ? '' : `/${lang}`;
  const url = `${langPrefix}/blog/${slugPath}/`;

  const title = data.title || '';
  const description = data.description || '';
  const text = stripMarkdown(body);

  const content = `${title}\n\n${description}\n\n${text}`.trim();
  if (!content) continue;

  const { errors } = await index.addCustomRecord({
    url,
    content,
    language: lang,
    meta: {
      title,
      description,
      lang,
      category: data.category || '',
    },
  });

  if (errors?.length) {
    console.warn('Pagefind index error for', file, errors);
  }
}

const { errors: writeErrors } = await index.writeFiles({
  outputPath: OUTPUT_DIR,
});

if (writeErrors?.length) {
  console.error('Pagefind writeFiles errors:', writeErrors);
}

await pagefind.close();

console.log('✅ Pagefind index built in', OUTPUT_DIR);
