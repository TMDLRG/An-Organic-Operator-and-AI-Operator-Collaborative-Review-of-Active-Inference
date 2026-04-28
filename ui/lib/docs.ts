// Repo document discovery + read API.
// Walks the repo (parent of /ui) and surfaces every readable text file.
import fs from "node:fs";
import path from "node:path";

// Resolution order:
//   1. ./repo-snapshot/   — built by scripts/snapshot-docs.mjs (Vercel + prod)
//   2. ../                 — local dev (the parent repo on disk)
function resolveRepoRoot(): string {
  const snapshot = path.resolve(process.cwd(), "repo-snapshot");
  if (fs.existsSync(snapshot)) return snapshot;
  return path.resolve(process.cwd(), "..");
}
const REPO_ROOT = resolveRepoRoot();

const ALLOWED_EXT = new Set([".md", ".csv", ".cff", ".yml", ".yaml", ".json", ".py", ".txt", ".tsx", ".ts", ".js", ".ex", ".exs"]);
const DENY_DIRS = new Set([
  "node_modules", ".git", ".github", ".claude", ".next",
  "knowledgebase",      // browsable separately if needed; large
  "venv", ".venv", "__pycache__", ".pytest_cache",
  "memory",
]);
// Mirror the snapshot-docs.mjs allow-list: within ui/, only surface the
// Jido reference impl, the TS agent + math libs, and the agents page.
const UI_ALLOW_PREFIXES = ["ui/agents-elixir/"];
const UI_ALLOW_FILES = new Set([
  "ui/lib/agents.ts",
  "ui/lib/math-tests.ts",
  "ui/app/agents/page.tsx",
  "ui/README.md",
]);
function uiAllowed(relPosix: string): boolean {
  if (UI_ALLOW_FILES.has(relPosix)) return true;
  if (UI_ALLOW_PREFIXES.some((p) => relPosix.startsWith(p))) return true;
  // Allow ancestor dirs (so the walker descends into them)
  if (UI_ALLOW_PREFIXES.some((p) => p.startsWith(relPosix + "/") || p === relPosix + "/")) return true;
  for (const f of UI_ALLOW_FILES) {
    if (f.startsWith(relPosix + "/")) return true;
  }
  return false;
}
const DENY_FILES = new Set([
  "1906.08804v6.pdf",
  "1906.08804v6.pdf.txt",
  "Maren_TR-2019-01v6.txt",
  "source_c_extracted.txt",
  "Ai Onna GPT5.4 Pro.docx",
  "Jim_Briefing_Document.md",
]);
const DENY_PATTERNS = [/Briefing_Document\.md$/i, /^book_9780262369978/];

export type DocEntry = {
  slug: string;        // path from repo root, posix-style
  name: string;        // basename
  dir: string;         // dirname relative to repo root
  ext: string;
  size: number;
};

export type DocGroup = {
  label: string;
  entries: DocEntry[];
};

let cache: DocEntry[] | null = null;

export function listDocs(): DocEntry[] {
  if (cache) return cache;
  const out: DocEntry[] = [];
  function walk(dir: string) {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      const rel = path.relative(REPO_ROOT, full).split(path.sep).join("/");
      if (e.isDirectory()) {
        if (DENY_DIRS.has(e.name)) continue;
        if ((rel === "ui" || rel.startsWith("ui/")) && !uiAllowed(rel)) continue;
        walk(full);
      } else if (e.isFile()) {
        if (DENY_FILES.has(e.name)) continue;
        if (DENY_PATTERNS.some((p) => p.test(e.name))) continue;
        const ext = path.extname(e.name).toLowerCase();
        if (!ALLOWED_EXT.has(ext)) continue;
        if ((rel === "ui" || rel.startsWith("ui/")) && !uiAllowed(rel)) continue;
        let size = 0;
        try { size = fs.statSync(full).size; } catch { /* ignore */ }
        out.push({
          slug: rel,
          name: e.name,
          dir: path.dirname(rel) === "." ? "" : path.dirname(rel),
          ext,
          size,
        });
      }
    }
  }
  walk(REPO_ROOT);
  out.sort((a, b) => a.slug.localeCompare(b.slug));
  cache = out;
  return out;
}

export function readDoc(slug: string): { content: string; entry: DocEntry | null } {
  const decoded = decodeURIComponent(slug);
  // Resolve safely within repo
  const target = path.resolve(REPO_ROOT, decoded);
  if (!target.startsWith(REPO_ROOT)) return { content: "", entry: null };
  const docs = listDocs();
  const entry = docs.find((d) => d.slug === decoded) ?? null;
  if (!entry) return { content: "", entry: null };
  let content = "";
  try { content = fs.readFileSync(target, "utf-8"); } catch { content = ""; }
  return { content, entry };
}

const GROUP_RULES: { label: string; pattern: RegExp }[] = [
  { label: "Manuscript",        pattern: /^Manuscript_Draft_v[12]/ },
  { label: "Manuscript",        pattern: /^Manuscript_Draft_v1_Audit/ },
  { label: "Audit chain",       pattern: /^Audit_Remediation_Plan|FILE_RENAMING_LOG|Layer2_Inspection_Specs|Pre_Publication_Checklist|v2_patches|Codex_Phase1_Verification_Report/ },
  { label: "OODA worksheets",   pattern: /^Phase_P\d+_OODA/ },
  { label: "Provenance",        pattern: /^Provenance_Map\.csv|^CITATION\.cff|^\.zenodo\.json/ },
  { label: "Reproducibility",   pattern: /^manuscript-v2-reproducibility\// },
  { label: "Agents (Jido)",     pattern: /^AGENTS\.md|^knowledgebase\/|^jido\/|^ui\/agents-elixir\/|^ui\/lib\/agents\.ts$|^ui\/app\/agents\/page\.tsx$/ },
  { label: "Codex prompt",      pattern: /^Codex_Verification_and_UI_Prompt/ },
  { label: "Project root",      pattern: /^[^\/]+$/ },
];

export function groupDocs(): DocGroup[] {
  const docs = listDocs();
  const buckets = new Map<string, DocEntry[]>();
  for (const d of docs) {
    let label = "Other";
    for (const rule of GROUP_RULES) {
      if (rule.pattern.test(d.slug)) { label = rule.label; break; }
    }
    if (!buckets.has(label)) buckets.set(label, []);
    buckets.get(label)!.push(d);
  }
  const order = [
    "Manuscript", "Audit chain", "OODA worksheets",
    "Provenance", "Reproducibility", "Agents (Jido)",
    "Codex prompt", "Project root", "Other",
  ];
  return order.filter((l) => buckets.has(l)).map((label) => ({
    label, entries: buckets.get(label)!.sort((a, b) => a.slug.localeCompare(b.slug)),
  }));
}
