import { groupDocs } from "@/lib/docs";
import { FileTree } from "@/components/doc-viewer/file-tree";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = groupDocs();
  return (
    <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
      <aside className="w-72 shrink-0 border-r border-border h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto px-3 py-4">
        <FileTree groups={groups} />
      </aside>
      <div className="flex-1 min-w-0 px-6 py-8">{children}</div>
    </div>
  );
}
