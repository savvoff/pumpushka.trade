import fs from 'node:fs/promises';
import path from 'node:path';
import { slugify } from './slugify.mjs';
import { hashObject } from './hash.mjs';
import { buildUnsplashQuery, fetchUnsplashRandom } from './unsplash.mjs';

const INPUT = process.argv[2] || 'news.json';
const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const INDEX_PATH = path.join(ROOT, '.cache', 'ingest-index.json');
const BANNED = new Set(['SPONSORED', 'CRYPTOCURRENCY']);

const FRESH_DAYS = Number(process.env.FRESH_DAYS || 1); // freshness 1 day
const LAST_COUNT = Number(process.env.LAST_COUNT || 10); // last 10 news from file
const now = Date.now();
const freshMs = FRESH_DAYS * 864e5;

const norm = (v) => String(v || '').trim().toUpperCase();

function sanitizeTag(label) {
  return norm(label)
    .replace(/[:\\/<>|"?*#%&{}[\]^~`]+/g, '-') // :: \ / < > | " ? * # % … → -
    .replace(/\s+/g, ' ')
    .replace(/-+/g, '-')
    .trim();
}

async function ensureDirs(...parts) {
  const dir = path.join(...parts);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

function pickCategory(category_data = []) {
  // Priorities: BTC/ETH/SOL > MARKET > TRADING > other
  const names = category_data
    .map(c => String(c.NAME || c.CATEGORY || ''))
    .filter(n => n && !BANNED.has(n));

  if (names.includes('BTC')) return 'BTC';
  if (names.includes('ETH')) return 'ETH';
  if (names.includes('SOL')) return 'SOL';
  if (names.includes('MARKET')) return 'MARKET';
  if (names.includes('TRADING')) return 'TRADING';
  return names[0] || 'OTHER';
}

export function makeTags(category_data = [], keywords = '') {
  const set = new Set();

  for (const c of category_data) {
    const n1 = norm(c?.NAME).toUpperCase();
    const n2 = norm(c?.CATEGORY).toUpperCase();
    if (n1 && !BANNED.has(n1)) set.add(sanitizeTag(n1));
    if (n2 && !BANNED.has(n2)) set.add(sanitizeTag(n2));
  }

  if (keywords) {
    String(keywords)
      .split('|')
      .map(s => norm(s))
      .filter(Boolean)
      .forEach(k => {
        const up = k.toUpperCase();
        if (!BANNED.has(up)) set.add(sanitizeTag(up));
      });
  }

  return [...set];
}

function toISO(ms) { return new Date(ms).toISOString(); }

const raw = JSON.parse(await fs.readFile(INPUT, 'utf8')).slice(0, LAST_COUNT);
let index = {};
try { 
  index = JSON.parse(await fs.readFile(INDEX_PATH, 'utf8')); 
} catch {}

let created = 0, updated = 0, skipped = 0, tooOld = 0;

for (const item of raw) {
  const externalId = String(item.id);
  const publishedMs = Number(item.published);
  if (!Number.isFinite(publishedMs)) { skipped++; continue; }

  if (now - publishedMs > freshMs) { tooOld++; continue; }

  const title = String(item.title || '').trim();
  const body = String(item.body || '').trim();
  if (!title || !body) { skipped++; continue; }

  const year = new Date(publishedMs).getUTCFullYear();
  const month = String(new Date(publishedMs).getUTCMonth() + 1).padStart(2, '0');

  const baseSlug = slugify(title);
  const lang = item.lang ? item.lang.toLowerCase() : 'en';
  const slug = `${baseSlug}`;
  const absDir = path.join(CONTENT_DIR, String(year), month);
  await ensureDirs(absDir);

  const fileName = `${slug}.${lang}.md`;
  const absPath = path.join(absDir, fileName);
  const relPath = path.relative(ROOT, absPath);

  const category = pickCategory(item.category_data);
  const tags = makeTags(item.category_data, item.keywords || '');
  const sentiment = (item.sentiment || '').toUpperCase();
  const score = item.score ?? undefined;

  const query = buildUnsplashQuery({
    title: item.title,
    body: item.body,
    category,
    tags,
  });

  const cacheKey = `post:${externalId}`;
  const photo = await fetchUnsplashRandom(query, cacheKey);

  const frontmatter = {
    title,
    description: body.slice(0, 180).replace(/\s+/g, ' '),
    publishedAt: toISO(publishedMs),
    updatedAt: toISO(publishedMs),
    lang,
    externalId,
    source: item.source_data ? {
      name: item.source_data.name,
      key: item.source_data.source_key,
      type: item.source_data.source_type
    } : undefined,
    category,
    tags,
    stickyWeight: 0,
    sentiment: ['POSITIVE','NEGATIVE','NEUTRAL'].includes(sentiment) ? sentiment : undefined,
    score,
    canonicalUrl: undefined,
    draft: false,
    coverImage: photo?.urls ?? undefined,
  };

  const contentHash = hashObject({ title, body, publishedMs, category, tags, lang });
  const known = index[externalId];

  if (known && known.hash === contentHash) {
    skipped++;
    continue;
  }

  // convert body into safe markdown (minimum - like plain)
  const safeBody = body;

  const md = `---\n${yaml(frontmatter)}\n---\n\n${safeBody}\n`;
  await fs.writeFile(absPath, md, 'utf8');

  index[externalId] = { path: relPath, hash: contentHash, publishedAt: publishedMs };
  if (known) updated++; else created++;
}

// save the index
await fs.mkdir(path.dirname(INDEX_PATH), { recursive: true });
await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), 'utf8');

console.log(JSON.stringify({ created, updated, skipped, tooOld }, null, 2));

// — — helpers — —
function yaml(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  let out = '';
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;

    if (Array.isArray(v)) {
      out += `${pad}${k}:\n`;
      for (const i of v) {
        out += `${pad}  - ${yamlScalar(i)}\n`;
      }
      continue;
    }

    if (typeof v === 'object' && v !== null) {
      out += `${pad}${k}:\n`;
      out += yaml(v, indent + 1);
      out += '\n';
      continue;
    }

    out += `${pad}${k}: ${yamlScalar(v)}\n`;
  }
  return out.trimEnd();
}

function yamlScalar(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';

  if (typeof v === 'string') {
    const s = v;

    const looksNumber = /^[+-]?\d+(\.\d+)?$/.test(s);
    const looksSci    = /^[+-]?\d+e[+-]?\d+$/i.test(s);
    const looksDate   = /^\d{4}-\d{2}-\d{2}/.test(s); // 2025-01-01...
    const specialWord = /^(true|false|null|yes|no|on|off)$/i.test(s);
    const emptyLike   = s.trim() === '';

    const needsQuoteChars = /[:{}\[\],&*#?|\-<>=!%@\\]/.test(s);

    const simpleToken = /^[\w.\-:/]+$/.test(s);

    if (
      looksNumber || looksSci || looksDate || specialWord || emptyLike ||
      needsQuoteChars || !simpleToken
    ) {
      return JSON.stringify(s); // "..."
    }
    return s;
  }

  return JSON.stringify(String(v));
}