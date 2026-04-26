"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, X, Loader2, FileText } from "lucide-react";

type Hit = { slug: string; name: string; ext: string; size: number; matches: number; snippets: { start: number; text: string }[] };

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const aborter = useRef<AbortController | null>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!q.trim()) { setHits([]); setTotal(0); setSearched(false); return; }
    if (q.trim().length < 2) return;
    const handle = setTimeout(async () => {
      aborter.current?.abort();
      aborter.current = new AbortController();
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: aborter.current.signal });
        const data = await res.json();
        setHits(data.hits);
        setTotal(data.total);
        setSearched(true);
      } catch { /* aborted */ }
      finally { setLoading(false); }
    }, 200);
    return () => clearTimeout(handle);
  }, [q]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 w-full">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-2">
        <SearchIcon className="w-3.5 h-3.5" /> Full-text search
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-1">Search</h1>
      <p className="text-muted text-sm mb-6">Across every readable file in the repo (manuscript, audit chain, OODA, provenance, reproducibility, agents).</p>

      <div className="relative mb-6">
        <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Try "free energy", "Markov blanket", "ELBO"…'
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {q && (
          <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted py-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Searching…
        </div>
      )}

      {searched && !loading && (
        <div className="text-xs text-muted mb-3">
          {hits.length} file{hits.length !== 1 ? "s" : ""}, {total} total match{total !== 1 ? "es" : ""}
        </div>
      )}

      <ul className="space-y-3">
        {hits.map((h) => (
          <li key={h.slug}>
            <Link
              href={`/docs/${h.slug}`}
              className="block p-4 border border-border rounded-lg bg-card hover:border-accent transition-colors"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <FileText className="w-3.5 h-3.5 text-muted shrink-0" />
                <span className="font-medium text-sm">{h.name}</span>
                <span className="font-mono text-xs text-muted truncate">{h.slug}</span>
                <span className="ml-auto text-xs text-accent font-medium">{h.matches} match{h.matches !== 1 ? "es" : ""}</span>
              </div>
              <div className="space-y-1">
                {h.snippets.map((s, i) => (
                  <div key={i} className="text-xs text-muted leading-relaxed font-mono">
                    <Highlight text={s.text} q={q} />
                  </div>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {searched && hits.length === 0 && !loading && (
        <div className="text-center py-12 text-muted text-sm">
          No matches for "{q}".
        </div>
      )}
    </div>
  );
}

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts: (string | { hi: string })[] = [];
  const lower = text.toLowerCase();
  const needle = q.toLowerCase();
  let i = 0;
  while (i < text.length) {
    const idx = lower.indexOf(needle, i);
    if (idx < 0) { parts.push(text.slice(i)); break; }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push({ hi: text.slice(idx, idx + needle.length) });
    i = idx + needle.length;
  }
  return (
    <>
      {parts.map((p, j) =>
        typeof p === "string"
          ? <span key={j}>{p}</span>
          : <mark key={j} className="bg-accent/20 text-fg rounded px-0.5">{p.hi}</mark>
      )}
    </>
  );
}
