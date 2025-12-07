import fs from 'node:fs/promises';
import path from 'node:path';
import { globby } from 'globby';
import matter from 'gray-matter';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BLOG_DIR = 'src/content/blog';
const AI_VERSION = 1;

function sanitizeContent(md) {
  // remove BOM
  let s = String(md || '').replace(/^\uFEFF/, '');

  if (/^\s*---\s*$/.test(s.split('\n')[0] || '')) {
    s = '\n' + s;
  }

  if (/^\s*(---|\*\*\*)\s*$/.test(s.split('\n')[0] || '')) {
    s = '\n' + s;
  }

  const lines = s.split('\n');
  if (/^\s*[:\-]{3,}\s*$/.test(lines[0] || '')) lines[0] = '## Summary';
  return lines.join('\n').trim() + '\n';
}

async function callOpenAI(prompt, model = 'gpt-4o-mini', temperature = 0.6) {
  const r = await client.chat.completions.create({
    model,
    temperature,
    messages: [{ role: 'user', content: prompt }],
  });
  return r.choices[0]?.message?.content?.trim() || '';
}

function buildRewritePrompt(title, body) {
  return `You are a crypto/markets journalist.

Rewrite and expand the article as **Markdown** in **English only**, but with STRICT rules:

FACT RULES (MANDATORY)
- Use ONLY facts explicitly present in the source text below. 
- Do NOT invent numbers, dates, prices, percentages, token tickers, names, or quotes.
- Do NOT infer price targets, timeframes, or on-chain stats.
- No external knowledge.

STYLE
- Clear headings (H2/H3).
- Start with a 2-3 sentence overview.
- Explain what happened and why it matters (using only provided facts).
- Add analytic "## From author".
- End with a final section titled "## Impact on the crypto market" with 3-6 bullet points.

OUTPUT
- Minimum 400 words.
- Markdown only. No frontmatter, no HTML.

Title: ${title}
Source text:
${body}`;
}

function buildTranslatePrompt(md, locale = 'Ukrainian') {
  return `Translate the following **Markdown** article to **${locale}**.
- Keep Markdown structure unchanged.
- Preserve numbers, tokens, tickers.
- Output **Markdown only**, no frontmatter, no HTML.

---
${md}
---`;
}

function firstParagraph(md) {
  const lines = String(md).split('\n');
  const paras = [];
  let buf = [];
  for (const ln of lines) {
    const l = ln.trim();
    if (!l || /^#{1,6}\s/.test(l) || /^>/.test(l) || /^[*-]\s+/.test(l) || /^\|/.test(l)) {
      if (buf.length) { paras.push(buf.join(' ')); buf = []; }
      continue;
    }
    buf.push(l);
  }
  if (buf.length) paras.push(buf.join(' '));
  return paras[0] || '';
}

function clampDesc(s, max = 180) {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

async function translateInline(text, target = 'Ukrainian') {
  if (!text) return '';
  const prompt = `Translate the following text to ${target}. 
  - Return only the translation, no quotes, no commentary.
  - Keep numbers and proper nouns as-is if applicable.

  Text:
  ${text}`;

  return await callOpenAI(prompt, 'gpt-4o-mini', 0.3);
}


async function writeSafeMarkdown(filepath, data, content) {
  // stringify
  const out = matter.stringify(sanitizeContent(content), data, { lineWidth: 10000 });
  await fs.writeFile(filepath, out, 'utf8');

  // validate by re-parsing (catch YAML issues early)
  try {
    matter(await fs.readFile(filepath, 'utf8'));
  } catch (e) {
    const safer = matter.stringify('## Summary\n\n' + sanitizeContent(content), data, { lineWidth: 10000 });
    await fs.writeFile(filepath, safer, 'utf8');
  }
}

async function main() {
  const files = await globby(`${BLOG_DIR}/**/*.md`);

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);

    // work only with EN originals
    const lang = String(data.lang || 'en').toLowerCase();
    if (lang !== 'en') continue;

    // skip if already rewritten or already a translated copy
    const ai = data.ai ?? null;
    if (ai?.rewritten === true) continue;
    if (ai?.translatedFrom) continue;

    const title = String(data.title || path.parse(file).name);
    const body = String(content || '').trim();
    if (!title || !body) continue;

    console.log('🔄 Rewrite & translate:', path.relative(process.cwd(), file));

    // rewrite / expand EN
    const expandedRaw = await callOpenAI(buildRewritePrompt(title, body));
    if (!expandedRaw) { console.warn('…skip (no expanded text)'); continue; }
    const expanded = sanitizeContent(expandedRaw);

    const enDescription = clampDesc(firstParagraph(expanded) || String(data.description || ''));
    const ukTitle = await translateInline(String(data.title || ''), 'Ukrainian');
    const ukDescription = await translateInline(enDescription, 'Ukrainian');

    // translate to UK
    const ukRaw = await callOpenAI(buildTranslatePrompt(expanded));
    const uk = sanitizeContent(ukRaw || expanded); // if the translation hasn't arrived, don't worry

    // EN flags
    const enData = {
      ...data,
      lang: 'en',
      description: enDescription || data.description || undefined,
      updatedAt: new Date().toISOString(),
      ai: {
        ...(data.ai ?? {}),
        rewritten: true,
        expandedAt: new Date().toISOString(),
        version: AI_VERSION,
      },
    };
    await writeSafeMarkdown(file, enData, expanded);

    // UK copy
    const externalId = data.externalId ? String(data.externalId) : '';
    const ukData = {
      ...data,
      lang: 'uk',
      title: ukTitle || data.title,
      description: ukDescription || data.description,
      updatedAt: new Date().toISOString(),
      ai: {
        ...(data.ai ?? {}),
        translatedFrom: externalId || 'en',
        version: AI_VERSION,
      },
    };

    const { dir, name, ext } = path.parse(file);
    const ukFile = path.join(dir, `${name.replace('.en', '.uk')}${ext}`);
    await writeSafeMarkdown(ukFile, ukData, uk);

    console.log('✅ Done:', ukFile);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
