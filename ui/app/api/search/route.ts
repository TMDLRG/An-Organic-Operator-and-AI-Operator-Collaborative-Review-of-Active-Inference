import { NextResponse } from "next/server";
import { listDocs, readDoc } from "@/lib/docs";

export const dynamic = "force-dynamic";

const MAX_RESULTS = 60;
const MAX_DOC_BYTES = 400_000;     // skip huge files
const SNIPPET_RADIUS = 80;          // chars on each side of a hit
const MAX_SNIPPETS_PER_DOC = 3;

function makeSnippets(content: string, q: string): { start: number; text: string }[] {
  const out: { start: number; text: string }[] = [];
  if (!q) return out;
  const lower = content.toLowerCase();
  const needle = q.toLowerCase();
  let i = 0;
  while (out.length < MAX_SNIPPETS_PER_DOC) {
    const idx = lower.indexOf(needle, i);
    if (idx < 0) break;
    const s = Math.max(0, idx - SNIPPET_RADIUS);
    const e = Math.min(content.length, idx + needle.length + SNIPPET_RADIUS);
    out.push({ start: idx, text: content.slice(s, e).replace(/\s+/g, " ") });
    i = idx + needle.length;
  }
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (!q) return NextResponse.json({ q, hits: [], total: 0 });

  const docs = listDocs();
  const hits: { slug: string; name: string; ext: string; size: number; matches: number; snippets: { start: number; text: string }[] }[] = [];

  for (const d of docs) {
    if (d.size > MAX_DOC_BYTES) continue;
    const { content } = readDoc(d.slug);
    if (!content) continue;
    const lower = content.toLowerCase();
    const needle = q.toLowerCase();
    let count = 0; let i = 0;
    while (true) {
      const idx = lower.indexOf(needle, i);
      if (idx < 0) break;
      count++;
      i = idx + needle.length;
    }
    if (count === 0) continue;
    hits.push({
      slug: d.slug, name: d.name, ext: d.ext, size: d.size,
      matches: count,
      snippets: makeSnippets(content, q),
    });
  }
  hits.sort((a, b) => b.matches - a.matches);
  const total = hits.reduce((n, h) => n + h.matches, 0);
  return NextResponse.json({ q, hits: hits.slice(0, MAX_RESULTS), total });
}
