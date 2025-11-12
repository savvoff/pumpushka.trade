import fs from 'node:fs/promises';
import path from 'node:path';

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS;
const CACHE_FILE = process.env.UNSPLASH_CACHE || '.cache/unsplash.json';

const MIN_DELAY_MS = Number(process.env.UNSPLASH_MIN_DELAY_MS || 1200); 
const MAX_PER_RUN = Number(process.env.UNSPLASH_MAX_PER_RUN || 40); 
const RETRIES = Number(process.env.UNSPLASH_RETRIES || 3); 
const TIMEOUT_MS = Number(process.env.UNSPLASH_TIMEOUT_MS || 12000);

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'for', 'nor', 'with', 'on', 'in', 'at', 'to', 'from', 'by', 'of',
  'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'as', 'it', 'its', 'into', 'about', 'over', 'after', 'before', 'up', 'down', 'out', 'off',
  'you', 'your', 'we', 'our', 'their', 'they', 'he', 'she', 'his', 'her', 'them'
]);

const BOOST = new Map([
  ['btc', 'bitcoin'], ['eth', 'ethereum'], ['sol', 'solana'], ['usdt', 'tether'],
  ['market', 'market'], ['trading', 'trading chart'], ['macroeconomics', 'federal reserve macro'],
  ['fiat', 'usd'], ['ai', 'artificial intelligence'], ['fed', 'federal reserve'], ['qt', 'quantitative tightening']
]);

function tokenize(text = '') {
  return (text || '')
    .toLowerCase()
    .replace(/[#“”"‘’’(),.;:!?]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function isGoodToken(w) {
  if (!w || STOP.has(w)) return false;
  if (w.length <= 2 && !/^[A-Z0-9]{2,5}$/.test(w.toUpperCase())) return false;
  return true;
}

function dedupePreserveOrder(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) if (!seen.has(x)) { seen.add(x); out.push(x); }
  return out;
}

function boostToken(w) {
  const b = BOOST.get(w) || BOOST.get(w.toLowerCase());
  return b ? [w, b] : [w];
}

let __lastCall = 0;
let __callsThisRun = 0;

async function readJson(file) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { return {}; }
}
async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

// CACHE
async function readCache() { return readJson(CACHE_FILE); }
async function writeCache(cache) { return writeJson(CACHE_FILE, cache); }

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

function jitter(base) {
  const j = Math.floor(Math.random() * 300); // 0..300ms
  return base + j;
}

async function throttle() {
  const now = Date.now();
  const wait = __lastCall + MIN_DELAY_MS - now;
  if (wait > 0) await sleep(wait);
  __lastCall = Date.now();
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(to);
  }
}

export function buildUnsplashQuery({ title, body, category, tags = [] }, opts = {}) {
  const {
    maxTerms = 5,          // how many keywords in the summary
    minBodyWeight = 2,     // how much body can "overrun" title (just a frequency multiplier)
  } = opts;

  const parts = [];

  // Category (translation into "visual" keys)
  if (category) {
    const c = String(category).toLowerCase();
    parts.push(...boostToken(c));
  }

  // Only
  const tagTokens = tags
    .map(t => String(t).toLowerCase())
    .flatMap(t => boostToken(t))
    .slice(0, 6);
  parts.push(...tagTokens);

  // Title tokens (stronger)
  const titleTokens = tokenize(title).filter(isGoodToken);
  parts.push(...titleTokens);

  // Body tokens (a little weaker, but due to the weight minBodyWeight can strengthen relevant words)
  const bodyTokens = tokenize(body).filter(isGoodToken);

  // frequency count
  const freq = new Map();
  const add = (w, weight = 1) => freq.set(w, (freq.get(w) || 0) + weight);

  for (const w of parts) add(w, 3);                 // category/tags/title → base weight 3
  for (const w of bodyTokens) add(w, minBodyWeight);// body → less weight

  const CRYPTO_HINT = new Set(['bitcoin', 'btc', 'ethereum', 'eth', 'solana', 'sol', 'crypto', 'cryptocurrency', 'blockchain', 'federal', 'reserve', 'macro', 'trading', 'chart', 'usd', 'dollar']);
  const candidates = [...freq.entries()]
    .sort((a, b) => {
      const [wa, wv] = a, [wb, wvb] = b;
      const ca = (CRYPTO_HINT.has(wa) ? 0.1 : 0) + wv;
      const cb = (CRYPTO_HINT.has(wb) ? 0.1 : 0) + wvb;
      return cb - ca;
    })
    .map(([w]) => w);

  let final = dedupePreserveOrder(candidates).slice(0, maxTerms);

  if (!final.some(w => /chart|graph|macro|federal|dollar|usd|bank|exchange|market|trading/.test(w))) {
    final.push('trading chart');
  }

  const q = final.join(' ').replace(/\s+/g, ' ').trim();
  return q || 'cryptocurrency trading chart';
}

export async function fetchUnsplashRandom(query, cacheKey = query) {
  const cache = await readCache();
  if (cache[cacheKey]) return cache[cacheKey];

  if (!UNSPLASH_KEY) {
    console.warn('[Unsplash] No UNSPLASH_ACCESS_KEY; skip coverImage');
    return null;
  }

  if (__callsThisRun >= MAX_PER_RUN) {
    console.warn(`[Unsplash] MAX_PER_RUN (${MAX_PER_RUN}) reached; skip further requests`);
    return null;
  }

  const url = new URL('https://api.unsplash.com/photos/random');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('content_filter', 'high');

  let attempt = 0;
  while (attempt <= RETRIES) {
    attempt++;

    await throttle();

    let res;
    try {
      res = await fetchWithTimeout(url.toString(), {
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      });
    } catch (err) {
      if (attempt > RETRIES) {
        console.warn(`[Unsplash] Network error (final): ${err}`);
        return null;
      }
      const backoff = jitter(600 * attempt);
      console.warn(`[Unsplash] Network error (try ${attempt}/${RETRIES}) → wait ${backoff}ms`);
      await sleep(backoff);
      continue;
    }

    const remain = Number(res.headers.get('x-ratelimit-remaining') || '');
    const limit = Number(res.headers.get('x-ratelimit-limit') || '');
    if (!Number.isNaN(remain) && !Number.isNaN(limit)) {
      if (remain <= 0) {
        console.warn(`[Unsplash] Rate limit exhausted (${remain}/${limit}); stop.`);
        return null;
      }
    }

    if (res.ok) {
      __callsThisRun++;
      const data = await res.json();
      const result = {
        id: data?.id,
        alt: data?.alt_description || data?.description || query,
        urls: {
          raw: data?.urls?.raw,
          full: data?.urls?.full,
          regular: data?.urls?.regular,
          small: data?.urls?.small,
          thumb: data?.urls?.thumb,
          small_s3: data?.urls?.small_s3,
        },
        credit: {
          name: data?.user?.name || data?.user?.username || 'Unsplash',
          link: data?.user?.links?.html
            ? `${data.user.links.html}?utm_source=Pumpushka&utm_medium=referral`
            : 'https://unsplash.com/?utm_source=Pumpushka&utm_medium=referral'
        }
      };
      cache[cacheKey] = result;
      await writeCache(cache);
      return result;
    }

    const status = res.status;
    const text = await res.text().catch(() => '');
    const retriable = status === 403 || status === 429 || (status >= 500 && status < 600);

    console.warn(`[Unsplash] ${status} ${res.statusText}${text ? `: ${text}` : ''}`);

    if (!retriable || attempt > RETRIES) {
      return null;
    }

    const backoff = jitter(800 * attempt);
    await sleep(backoff);
  }

  return null;
}
