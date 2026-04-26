"use client";
import { useMemo, useState } from "react";
import { type AuditFinding, type Severity, severityColor } from "@/lib/audit-types";
import { CheckCircle2, ShieldCheck, X } from "lucide-react";
import clsx from "clsx";

const SEV_ORDER: Severity[] = ["Fatal", "Serious", "Moderate", "Minor", "None"];

export function AuditFilter({ findings }: { findings: AuditFinding[] }) {
  const [active, setActive] = useState<Set<Severity>>(new Set(SEV_ORDER));
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const f = q.toLowerCase();
    return findings.filter((x) => {
      if (!active.has(x.severity)) return false;
      if (!f) return true;
      return [x.id, x.location, x.category, x.description, x.whyItMatters, x.proposedRepair]
        .join(" ").toLowerCase().includes(f);
    });
  }, [findings, active, q]);

  function toggleSev(s: Severity) {
    const next = new Set(active);
    next.has(s) ? next.delete(s) : next.add(s);
    setActive(next);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        <span className="text-muted uppercase tracking-wider">Filter:</span>
        {SEV_ORDER.map((s) => {
          const c = severityColor(s);
          const on = active.has(s);
          return (
            <button
              key={s}
              onClick={() => toggleSev(s)}
              className={clsx(
                "px-2 py-1 rounded-md border transition-opacity",
                c.bg, c.fg, c.border,
                on ? "opacity-100" : "opacity-30"
              )}
            >
              {c.label}
            </button>
          );
        })}
        <div className="flex-1 min-w-[200px] relative ml-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by text…"
            className="w-full px-3 py-1.5 rounded-md bg-card border border-border text-xs focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-fg">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <span className="text-muted ml-auto">{filtered.length}/{findings.length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((f) => <Card key={f.id} f={f} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted text-sm">No findings match the current filter.</div>
      )}
    </div>
  );
}

function Card({ f }: { f: AuditFinding }) {
  const c = severityColor(f.severity);
  return (
    <article className={clsx("border rounded-lg overflow-hidden", c.border)}>
      <header className={clsx("px-4 py-2 flex items-center gap-2 text-xs font-medium border-b", c.bg, c.fg, c.border)}>
        <span className="font-mono">{f.id}</span>
        <span className="opacity-80">·</span>
        <span>{c.label}</span>
        <span className="opacity-70">· conf {f.confidence.replace(/[^\d/]/g, "")}</span>
        {f.pdfVerified && (
          <span className="ml-auto inline-flex items-center gap-1 opacity-90">
            <ShieldCheck className="w-3 h-3" /> PDF-verified
          </span>
        )}
      </header>
      <div className="p-4 space-y-2.5">
        <div className="text-xs text-muted">
          <span className="font-medium text-fg/70">{f.category}</span> · {f.location}
        </div>
        <div className="text-sm leading-relaxed">{f.description}</div>
        <Field label="Why it matters" value={f.whyItMatters} />
        <Field label="Proposed repair" value={f.proposedRepair} />
      </div>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted mb-0.5">{label}</div>
      <div className="text-xs leading-relaxed">{value}</div>
    </div>
  );
}
