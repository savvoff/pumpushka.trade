import fs from 'node:fs/promises';

const API_URL = process.env.NEWS_API_URL; // https://api.example.com/news
const OUT = process.env.NEWS_OUT || 'news.json';

const user = process.env.NEWS_USER || '';
const pass = process.env.NEWS_PASS || '';
const basic = Buffer.from(`${user}:${pass}`).toString('base64');

const res = await fetch(API_URL, {
  headers: {
    'Authorization': `Basic ${basic}`,
    'Accept': 'application/json'
  }
});

if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${await res.text()}`);
const data = await res.json();

await fs.writeFile(OUT, JSON.stringify(data, null, 2), 'utf8');
console.log(`Saved ${Array.isArray(data) ? data.length : 0} items → ${OUT}`);
