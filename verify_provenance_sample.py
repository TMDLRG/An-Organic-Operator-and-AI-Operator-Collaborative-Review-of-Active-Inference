"""Phase 1.4: deterministic 20-row random sample of Provenance_Map.csv.

For each row, classify whether the cited source anchor is verifiable
from the artifacts available in this environment.
"""
import csv
import os
import random
import re

random.seed(20260426)  # match Codex's seed for cross-comparison

with open("Provenance_Map.csv", "r", encoding="utf-8", errors="replace") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total rows in Provenance_Map.csv: {len(rows)}")

sample = random.sample(rows, 20)

print(f"\nSampled row IDs: {[r['row_id'] for r in sample]}\n")

print(f"{'row_id':<8} {'class':<6} {'anchor (truncated)':<60} {'verifiable':<12}")
print("-" * 95)

available_files = set(os.listdir("."))
artifact_paths = {
    "1906.08804v6.pdf.txt": True,            # Maren TR text extraction (local)
    "Maren_TR-2019-01v6.txt": False,         # gitignored, may not be present
    "book_9780262369978": False,             # SOURCE B book extract (gitignored)
    "source_c_extracted.txt": False,         # SOURCE C extract (gitignored)
    "Manuscript_Draft_v2.md": True,
    "Manuscript_Draft_v1.md": True,
    "Manuscript_Draft_v1_Audit.md": True,
    "Audit_Remediation_Plan.md": True,
    "Phase_P1_OODA.md": True,
    "Phase_P2_OODA.md": True,
    "Phase_P3_OODA.md": True,
    "Phase_P4_OODA.md": True,
    "Phase_P5_OODA.md": True,
    "v2_patches.md": True,
    "Provenance_Map.csv": True,
    "Layer2_Inspection_Specs.md": True,
    "Pre_Publication_Checklist.md": True,
    "FILE_RENAMING_LOG.md": True,
    "manuscript-v2-reproducibility": True,
    "audit_tests.py": True,
    "Revision Research and Test Notes.txt": True,
    "CLAUDE.md": True,
    "AGENTS.md": True,
}

# Update with actual presence
for k in list(artifact_paths.keys()):
    if k in available_files or os.path.exists(k):
        artifact_paths[k] = True

# Also check the .claude/CLAUDE.md
if os.path.exists(".claude/CLAUDE.md"):
    artifact_paths[".claude/CLAUDE.md"] = True

results = []
for row in sample:
    rid = row["row_id"]
    cls = row["evidence_class"]
    anchor = row["source_anchor"]

    verifiable = "?"
    if anchor == "—" or anchor.strip() == "":
        # Class E (project-framing) rows often have no anchor
        if cls == "E":
            verifiable = "N/A (E)"
        else:
            verifiable = "NO ANCHOR"
    else:
        # Search for any known artifact path in the anchor
        verifiable = "NO"
        for path, present in artifact_paths.items():
            if path in anchor:
                if present:
                    verifiable = "YES"
                else:
                    verifiable = "NO (gitignored)"
                break
        # Special cases:
        # - test_*.py / audit_tests* references
        if "audit_tests" in anchor or "test_" in anchor or "manuscript-v2-reproducibility" in anchor:
            verifiable = "YES"
        # - SOURCE B / corpus references
        if "SOURCE B" in anchor or "Parr" in anchor or "book_" in anchor:
            verifiable = "NO (SOURCE B not in repo)"
        # - SOURCE A / Maren text references
        if "SOURCE A" in anchor or "1906.08804v6.pdf.txt" in anchor or "Maren_TR" in anchor:
            verifiable = "YES (Maren .txt local)"
        # - line-only references (corpus line 1234)
        if re.match(r"^\s*corpus line", anchor) or re.match(r"^\s*line \d", anchor):
            verifiable = "PARTIAL (corpus line)"
        # - "Audit §X.Y" references the Manuscript_Draft_v1_Audit.md sections
        if re.search(r"Audit\s*[§¶]?\s*[A-Z]\.[0-9]", anchor) or "Audit \xa7" in anchor or "Audit §" in anchor:
            verifiable = "YES (in v1_Audit.md)"

    results.append((rid, cls, anchor[:58], verifiable))
    print(f"{rid:<8} {cls:<6} {anchor[:58]:<60} {verifiable:<12}")

print("\n" + "=" * 95)
yes = sum(1 for _, _, _, v in results if v.startswith("YES") or v == "N/A (E)")
partial = sum(1 for _, _, _, v in results if v.startswith("PARTIAL"))
no = sum(1 for _, _, _, v in results if v.startswith("NO"))
print(f"VERIFIABLE FROM LOCAL ARTIFACTS: {yes}/20")
print(f"PARTIAL (corpus-line reference, anchor present but not file-pinned): {partial}/20")
print(f"NOT VERIFIABLE (gitignored source corpus or no anchor): {no}/20")
