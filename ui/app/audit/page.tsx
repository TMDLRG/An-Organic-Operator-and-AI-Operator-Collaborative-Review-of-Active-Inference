import Link from "next/link";
import { readAuditRegister, severityColor, type Severity } from "@/lib/audit-register";
import { Markdown } from "@/components/doc-viewer/markdown";
import { ShieldAlert, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { AuditFilter } from "@/components/audit/audit-filter";

export const dynamic = "force-dynamic";

export default function AuditPage() {
  const { findings, phase5Notes } = readAuditRegister();
  const counts = findings.reduce(
    (m, f) => ({ ...m, [f.severity]: (m[f.severity] ?? 0) + 1 }),
    {} as Record<Severity, number>
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8 w-full">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-2">
        <ShieldAlert className="w-3.5 h-3.5" /> Audit register · Manuscript_Draft_v2.md Appendix D
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-1">Error Register (E1–E15)</h1>
      <p className="text-muted text-sm max-w-3xl mb-6">
        The audit findings on Maren TR-2019-01v6, treated as a test case for the audit method.
        All E1–E14 findings have been verified verbatim by direct PDF inspection in Phase P5
        (see <Link href="/docs/Phase_P5_OODA.md" className="text-accent underline">Phase_P5_OODA.md §3</Link>).
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <SevPill count={counts["Fatal"] ?? 0} sev="Fatal" />
        <SevPill count={counts["Serious"] ?? 0} sev="Serious" />
        <SevPill count={counts["Moderate"] ?? 0} sev="Moderate" />
        <SevPill count={counts["Minor"] ?? 0} sev="Minor" />
        <span className="text-xs text-muted ml-2">{findings.length} findings · all PDF-verified in Phase P5</span>
      </div>

      <AuditFilter findings={findings} />

      {phase5Notes && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-sm uppercase tracking-wider text-muted mb-3">Phase P5 supplemental notes</h2>
          <div className="bg-card border border-border rounded-lg p-5">
            <Markdown source={phase5Notes} slug="Manuscript_Draft_v2.md" />
          </div>
        </section>
      )}
    </div>
  );
}

function SevPill({ count, sev }: { count: number; sev: Severity }) {
  const c = severityColor(sev);
  return (
    <div className={`px-2.5 py-1 rounded-md text-xs font-medium border ${c.bg} ${c.fg} ${c.border}`}>
      {c.label} <span className="opacity-70 ml-1">{count}</span>
    </div>
  );
}
