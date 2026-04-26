// Parse the E1-E15 audit register from Manuscript_Draft_v2.md Appendix D.
// SERVER-ONLY: this file uses node:fs and must not be imported from
// a "use client" component. Client components: import from audit-types.ts.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { AuditFinding, Severity } from "./audit-types";

export type { AuditFinding, Severity } from "./audit-types";
export { severityColor } from "./audit-types";

function resolveRepoRoot(): string {
  const snapshot = path.resolve(process.cwd(), "repo-snapshot");
  if (fs.existsSync(snapshot)) return snapshot;
  return path.resolve(process.cwd(), "..");
}
const REPO_ROOT = resolveRepoRoot();

let cache: { findings: AuditFinding[]; phase5Notes: string } | null = null;

function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function parseSeverity(s: string): Severity {
  const cleaned = stripMarkdown(s);
  if (cleaned.startsWith("Fatal")) return "Fatal";
  if (cleaned.startsWith("Serious")) return "Serious";
  if (cleaned.startsWith("Moderate")) return "Moderate";
  if (cleaned.startsWith("Minor")) return "Minor";
  return "None";
}

export function readAuditRegister(): { findings: AuditFinding[]; phase5Notes: string } {
  if (cache) return cache;
  const v2Path = path.join(REPO_ROOT, "Manuscript_Draft_v2.md");
  let src = "";
  try { src = fs.readFileSync(v2Path, "utf-8"); } catch { return { findings: [], phase5Notes: "" }; }

  const lines = src.split("\n");
  const findings: AuditFinding[] = [];
  let inAppendixD = false;

  for (const raw of lines) {
    if (raw.startsWith("## Appendix D")) { inAppendixD = true; continue; }
    if (inAppendixD && raw.startsWith("## ")) break;
    if (!inAppendixD) continue;

    if (raw.startsWith("|")) {
      const cells = raw.split("|").map((c) => c.trim());
      // Drop empty leading/trailing cells from leading/trailing |
      while (cells.length && cells[0] === "") cells.shift();
      while (cells.length && cells[cells.length - 1] === "") cells.pop();
      // Accept 8-column (canonical) and 7-column (some rows merge description+why)
      if (cells.length < 7) continue;
      const id = stripMarkdown(cells[0] ?? "");
      if (id === "ID" || id.startsWith("---") || id.startsWith(":-")) continue;
      if (!/^E\d+[a-z]?$/.test(id)) continue;
      // For 7-column rows: cells are [id, loc, cat, sev, description-and-why, repair, conf]
      // For 8-column rows: cells are [id, loc, cat, sev, description, why, repair, conf]
      const merged = cells.length === 7;
      const desc = (cells[4] ?? "").trim();
      const why = merged ? "" : (cells[5] ?? "").trim();
      const repair = merged ? (cells[5] ?? "").trim() : (cells[6] ?? "").trim();
      const conf = merged ? (cells[6] ?? "") : (cells[7] ?? "");
      findings.push({
        id,
        location: stripMarkdown(cells[1] ?? ""),
        category: stripMarkdown(cells[2] ?? ""),
        severity: parseSeverity(cells[3] ?? ""),
        description: desc,
        whyItMatters: why,
        proposedRepair: repair,
        confidence: stripMarkdown(conf),
        pdfVerified: conf.includes("PDF-verified") || (cells[3] ?? "").includes("Phase P5"),
      });
    }
  }

  const summaryStart = src.indexOf("**Summary (Phase P5 update).**");
  const settledEnd = src.indexOf("---", summaryStart);
  const phase5Notes = summaryStart >= 0 ? src.slice(summaryStart, settledEnd > 0 ? settledEnd : summaryStart + 4000) : "";

  cache = { findings, phase5Notes };
  return cache;
}
