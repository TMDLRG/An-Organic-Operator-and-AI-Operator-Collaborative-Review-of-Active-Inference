import { notFound } from "next/navigation";
import dynamicImport from "next/dynamic";
import { readDoc } from "@/lib/docs";

// Dynamic-import the heavy renderers to keep the route's First Load JS
// under control. Markdown brings in react-markdown + KaTeX (~200 kB);
// CsvTable is small but the table can be huge.
const Markdown = dynamicImport(() => import("@/components/doc-viewer/markdown").then((m) => m.Markdown), { ssr: true });
const CsvTable = dynamicImport(() => import("@/components/doc-viewer/csv-table").then((m) => m.CsvTable), { ssr: false });

export const dynamic = "force-dynamic";

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.map(decodeURIComponent).join("/");
  const { content, entry } = readDoc(slug);
  if (!entry) notFound();

  if (entry.ext === ".md") {
    return (
      <div>
        <DocHeader slug={entry.slug} size={entry.size} />
        <Markdown source={content} slug={entry.slug} />
      </div>
    );
  }
  if (entry.ext === ".csv") {
    return (
      <div>
        <DocHeader slug={entry.slug} size={entry.size} />
        <CsvTable source={content} />
      </div>
    );
  }
  return (
    <div>
      <DocHeader slug={entry.slug} size={entry.size} />
      <pre className="text-xs font-mono bg-card border border-border rounded-md p-4 overflow-x-auto whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

function DocHeader({ slug, size }: { slug: string; size: number }) {
  const kb = (size / 1024).toFixed(1);
  return (
    <div className="mb-4 pb-3 border-b border-border flex items-baseline gap-3">
      <code className="text-xs font-mono text-muted">{slug}</code>
      <span className="text-xs text-muted">{kb} KB</span>
    </div>
  );
}
