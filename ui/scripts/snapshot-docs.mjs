// Snapshot the parent repo's readable files into ui/repo-snapshot/ so the
// docs viewer, audit register, and search API have everything they need
// at runtime — including in Vercel's serverless functions, where only
// files inside the project root are bundled.
//
// Run automatically as `prebuild` (npm script) and harmlessly idempotent:
// the snapshot directory is rebuilt from scratch on every invocation.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(UI_ROOT, "..");
const SNAPSHOT_DIR = path.join(UI_ROOT, "repo-snapshot");

const ALLOWED_EXT = new Set([".md", ".csv", ".cff", ".yml", ".yaml", ".json", ".py", ".txt", ".tsx", ".ts", ".js"]);
const DENY_DIRS = new Set([
  "ui", "node_modules", ".git", ".github", ".claude", ".next",
  "knowledgebase", "venv", ".venv", "__pycache__", ".pytest_cache",
  "memory", "test-results", "playwright-report", "out",
  "repo-snapshot", "path0", ".vercel",
]);
const DENY_FILES = new Set([
  "1906.08804v6.pdf",
  "1906.08804v6.pdf.txt",
  "Maren_TR-2019-01v6.txt",
  "source_c_extracted.txt",
  "Ai Onna GPT5.4 Pro.docx",
  "Jim_Briefing_Document.md",
]);
const DENY_PATTERNS = [/Briefing_Document\.md$/i, /^book_9780262369978/];

function copyTree(srcRoot, destRoot) {
  let count = 0; let bytes = 0;
  function walk(srcDir, relDir) {
    let entries;
    try { entries = fs.readdirSync(srcDir, { withFileTypes: true }); }
    catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const srcPath = path.join(srcDir, e.name);
      const relPath = relDir ? path.join(relDir, e.name) : e.name;
      if (e.isDirectory()) {
        if (DENY_DIRS.has(e.name)) continue;
        walk(srcPath, relPath);
      } else if (e.isFile()) {
        if (DENY_FILES.has(e.name)) continue;
        if (DENY_PATTERNS.some((p) => p.test(e.name))) continue;
        const ext = path.extname(e.name).toLowerCase();
        if (!ALLOWED_EXT.has(ext)) continue;
        const destPath = path.join(destRoot, relPath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        const data = fs.readFileSync(srcPath);
        fs.writeFileSync(destPath, data);
        count++; bytes += data.length;
      }
    }
  }
  walk(srcRoot, "");
  return { count, bytes };
}

console.log(`[snapshot-docs] source: ${REPO_ROOT}`);
console.log(`[snapshot-docs] target: ${SNAPSHOT_DIR}`);

// Sanity check: only regenerate if the source clearly contains the
// canonical repo files. On Vercel (when only ui/ was uploaded) the
// "parent" is empty and we'd produce a useless snapshot — better to
// leave the committed snapshot intact.
const SENTINEL = path.join(REPO_ROOT, "Manuscript_Draft_v2.md");
if (!fs.existsSync(SENTINEL)) {
  console.log(`[snapshot-docs] skip: sentinel ${SENTINEL} not found.`);
  console.log(`[snapshot-docs] using committed snapshot at ${SNAPSHOT_DIR} instead.`);
  process.exit(0);
}

if (fs.existsSync(SNAPSHOT_DIR)) {
  fs.rmSync(SNAPSHOT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });

const { count, bytes } = copyTree(REPO_ROOT, SNAPSHOT_DIR);
console.log(`[snapshot-docs] copied ${count} files (${(bytes / 1024).toFixed(1)} KB)`);
