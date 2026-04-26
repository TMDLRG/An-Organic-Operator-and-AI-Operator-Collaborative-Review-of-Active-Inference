import Link from "next/link";
import { groupDocs } from "@/lib/docs";

export default function DocsIndex() {
  const groups = groupDocs();
  const total = groups.reduce((n, g) => n + g.entries.length, 0);
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Documents</h1>
      <p className="text-muted mb-8">
        {total} files across {groups.length} groups. Pick anything from the left tree to read with full
        math and cross-references.
      </p>
      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g.label}>
            <h2 className="text-xs uppercase tracking-wider text-muted mb-2">{g.label}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {g.entries.slice(0, 12).map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/docs/${e.slug}`}
                    className="block px-3 py-2 rounded-md border border-border bg-card hover:border-accent text-sm"
                  >
                    <div className="font-mono text-xs text-muted truncate">{e.slug}</div>
                    <div className="font-medium truncate">{e.name}</div>
                  </Link>
                </li>
              ))}
            </ul>
            {g.entries.length > 12 && (
              <div className="mt-2 text-xs text-muted">… {g.entries.length - 12} more in this group</div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
