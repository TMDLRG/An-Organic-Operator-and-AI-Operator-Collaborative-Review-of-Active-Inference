"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { DocGroup } from "@/lib/docs";
import { ChevronRight, ChevronDown, FileText, FileJson, FileCode2, Search, X } from "lucide-react";
import clsx from "clsx";

function iconFor(ext: string) {
  if (ext === ".md" || ext === ".txt") return FileText;
  if (ext === ".json" || ext === ".cff" || ext === ".yml" || ext === ".yaml") return FileJson;
  return FileCode2;
}

export function FileTree({ groups }: { groups: DocGroup[] }) {
  const pathname = usePathname();
  const currentSlug = decodeURIComponent(pathname.replace(/^\/docs\/?/, ""));
  const [open, setOpen] = useState<Set<string>>(new Set(groups.map((g) => g.label)));
  const [q, setQ] = useState("");

  function toggle(label: string) {
    const next = new Set(open);
    next.has(label) ? next.delete(label) : next.add(label);
    setOpen(next);
  }

  const filter = q.toLowerCase();

  return (
    <div className="text-sm">
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter files…"
          className="w-full pl-7 pr-7 py-1.5 rounded-md bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {q && (
          <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-fg">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <nav className="space-y-2">
        {groups.map((g) => {
          const visible = filter
            ? g.entries.filter((e) => e.slug.toLowerCase().includes(filter) || e.name.toLowerCase().includes(filter))
            : g.entries;
          if (visible.length === 0) return null;
          const isOpen = open.has(g.label);
          return (
            <div key={g.label}>
              <button
                onClick={() => toggle(g.label)}
                className="w-full flex items-center gap-1 px-1 py-0.5 text-xs uppercase tracking-wider text-muted hover:text-fg"
              >
                {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                {g.label} <span className="ml-auto opacity-60">{visible.length}</span>
              </button>
              {isOpen && (
                <ul className="mt-0.5 space-y-px">
                  {visible.map((e) => {
                    const Icon = iconFor(e.ext);
                    const active = currentSlug === e.slug;
                    return (
                      <li key={e.slug}>
                        <Link
                          href={`/docs/${e.slug}`}
                          className={clsx(
                            "flex items-center gap-1.5 px-2 py-1 rounded text-xs leading-tight",
                            active
                              ? "bg-accent/10 text-fg border-l-2 border-accent pl-1.5"
                              : "text-muted hover:bg-card hover:text-fg"
                          )}
                          title={e.slug}
                        >
                          <Icon className="w-3 h-3 shrink-0 opacity-70" />
                          <span className="truncate">{e.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
