"use client";
import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, X } from "lucide-react";

function parseCSV(src: string): { headers: string[]; rows: string[][] } {
  const out: string[][] = [];
  let cur: string[] = [];
  let buf = "";
  let inQuotes = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"' && src[i + 1] === '"') { buf += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else buf += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { cur.push(buf); buf = ""; }
      else if (c === "\n") { cur.push(buf); out.push(cur); cur = []; buf = ""; }
      else if (c === "\r") { /* skip */ }
      else buf += c;
    }
  }
  if (buf.length || cur.length) { cur.push(buf); out.push(cur); }
  const headers = out.shift() ?? [];
  return { headers, rows: out.filter((r) => r.some((c) => c.length)) };
}

export function CsvTable({ source }: { source: string }) {
  const { headers, rows } = useMemo(() => parseCSV(source), [source]);
  const [sort, setSort] = useState<{ col: number; dir: "asc" | "desc" } | null>(null);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const f = filter.toLowerCase();
    if (!f) return rows;
    return rows.filter((r) => r.some((c) => c.toLowerCase().includes(f)));
  }, [rows, filter]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const out = [...filtered];
    out.sort((a, b) => {
      const av = a[sort.col] ?? "";
      const bv = b[sort.col] ?? "";
      const an = Number(av), bn = Number(bv);
      const cmp = !isNaN(an) && !isNaN(bn) ? an - bn : av.localeCompare(bv);
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return out;
  }, [filtered, sort]);

  function clickSort(col: number) {
    if (!sort || sort.col !== col) setSort({ col, dir: "asc" });
    else if (sort.dir === "asc") setSort({ col, dir: "desc" });
    else setSort(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter rows…"
          className="flex-1 px-2 py-1 rounded-md bg-card border border-border focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {filter && (
          <button onClick={() => setFilter("")} className="p-1 text-muted hover:text-fg">
            <X className="w-4 h-4" />
          </button>
        )}
        <span className="text-xs text-muted ml-auto">{sorted.length}/{rows.length}</span>
      </div>
      <div className="overflow-auto border border-border rounded-md">
        <table className="text-xs font-mono w-full">
          <thead className="bg-card sticky top-0">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => clickSort(i)}
                  className="text-left px-2 py-1.5 border-b border-border cursor-pointer hover:bg-bg select-none whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1">
                    {h}
                    {sort?.col === i && (sort.dir === "asc" ? <ArrowUpAZ className="w-3 h-3" /> : <ArrowDownAZ className="w-3 h-3" />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, ri) => (
              <tr key={ri} className="hover:bg-card/50">
                {r.map((c, ci) => (
                  <td key={ci} className="align-top px-2 py-1 border-b border-border/50 max-w-md break-words">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
