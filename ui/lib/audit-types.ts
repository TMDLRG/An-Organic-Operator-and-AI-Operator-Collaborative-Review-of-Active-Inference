// Client-safe types and pure helpers for the audit register.
// Importing this from a "use client" component does NOT pull node:fs.

export type Severity = "Fatal" | "Serious" | "Moderate" | "Minor" | "None";

export type AuditFinding = {
  id: string;
  location: string;
  category: string;
  severity: Severity;
  description: string;
  whyItMatters: string;
  proposedRepair: string;
  confidence: string;
  pdfVerified: boolean;
};

export function severityColor(sev: Severity): { bg: string; fg: string; border: string; label: string } {
  switch (sev) {
    case "Fatal":    return { bg: "bg-sev-fatal/10",    fg: "text-sev-fatal",    border: "border-sev-fatal/40",    label: "Fatal" };
    case "Serious":  return { bg: "bg-sev-serious/10",  fg: "text-sev-serious",  border: "border-sev-serious/40",  label: "Serious" };
    case "Moderate": return { bg: "bg-sev-moderate/10", fg: "text-sev-moderate", border: "border-sev-moderate/40", label: "Moderate" };
    case "Minor":    return { bg: "bg-sev-minor/10",    fg: "text-sev-minor",    border: "border-sev-minor/40",    label: "Minor" };
    default:         return { bg: "bg-sev-none/10",     fg: "text-sev-none",     border: "border-sev-none/40",     label: "None" };
  }
}
