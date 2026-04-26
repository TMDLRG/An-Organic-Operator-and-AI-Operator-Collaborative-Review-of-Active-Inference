// Parse the E1-E15 audit register from Manuscript_Draft_v2.md Appendix D.
// SERVER-ONLY: this file uses node:fs and must not be imported from
// a "use client" component. Client components: import from audit-types.ts.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { AuditFinding, Severity } from "./audit-types";

export type { AuditFinding, Severity } from "./audit-types";
export { severityColor } from "./audit-types";

const REPO_ROOT = path.resolve(process.cwd(), "..");

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
      if (cells.length < 8) continue;
      const id = stripMarkdown(cells[0] ?? "");
      if (id === "ID" || id.startsWith("---") || id.startsWith(":-")) continue;
      if (!/^E\d+[a-z]?$/.test(id)) continue;
      findings.push({
        id,
        location: stripMarkdown(cells[1] ?? ""),
        category: stripMarkdown(cells[2] ?? ""),
        severity: parseSeverity(cells[3] ?? ""),
        description: (cells[4] ?? "").trim(),
        whyItMatters: (cells[5] ?? "").trim(),
        proposedRepair: (cells[6] ?? "").trim(),
        confidence: stripMarkdown(cells[7] ?? ""),
        pdfVerified: (cells[7] ?? "").includes("PDF-verified") || (cells[3] ?? "").includes("Phase P5"),
      });
    }
  }

  const summaryStart = src.indexOf("**Summary (Phase P5 update).**");
  const settledEnd = src.indexOf("---", summaryStart);
  const phase5Notes = summaryStart >= 0 ? src.slice(summaryStart, settledEnd > 0 ? settledEnd : summaryStart + 4000) : "";

  cache = { findings, phase5Notes };
  return cache;
}
