# File Renaming Log

> **⚠ Important correction (Phase P5, 2026-04-26).** The original premise of this log — that the filename `1906.08804v6.pdf.txt` was "misleading" because the arXiv ID was thought not to correspond to Maren TR-2019-01v6 — **has been reversed**. Direct inspection of the original PDF on 2026-04-26 shows the arXiv watermark `arXiv:1906.08804v6 [cs.NE] 18 Aug 2024` on page 1. The original filename was correct. The clean copy under the new name was nonetheless created and remains as a harmless alias; the operation is preserved here for the historical record, but readers should know the rename's *rationale* was wrong.
>
> See [`Phase_P5_OODA.md`](Phase_P5_OODA.md) §2 for the full reversal.

---

## Operation summary

**Date of original operation.** 2026-04-25 (Phase P1 of the [Audit Remediation Plan](Audit_Remediation_Plan.md))

**Operation.** Source file copied (not moved) under a clean human-readable name. Both files preserved.

| Before | After |
|--------|-------|
| `1906.08804v6.pdf.txt` (arXiv-ID-bearing filename) | `1906.08804v6.pdf.txt` AND `Maren_TR-2019-01v6.txt` (two bit-identical files) |

Both files exist on disk. SHA-256 of either:

```
b68b852985a5b16742a81e6de2bf161e239e6bd761dca5bae22de6160379dae1
```

File size: 130,005 bytes. 643 lines. Verified bit-identical immediately after the copy operation.

---

## Original (now-corrected) rationale

The Phase-P1 rationale was:

> *"The original filename `1906.08804v6.pdf.txt` implies an arXiv submission (arXiv:1906.08804) that, on the public arXiv index, does not correspond to Maren TR-2019-01v6 — it corresponds to a different paper. The filename is therefore misleading."*

**This was wrong.** The Phase-P1 audit was based on an inferred lookup of the public arXiv index, not a direct inspection of the PDF itself. When the original PDF was supplied in Phase P5 (2026-04-26), the page-1 watermark was directly observed: `arXiv:1906.08804v6 [cs.NE] 18 Aug 2024`. **The arXiv ID is real and the original filename was correct.** Maren TR-2019-01v6 is the same paper as arXiv:1906.08804v6. The two identifiers point to the same document.

## Why the file copy still stands (and why this log still matters)

Even though the *rationale* was wrong, the copy operation itself is preserved for two reasons:

1. **Reverting the copy would unnecessarily disturb the now-public repository.** Both files are bit-identical and harmless. Any future revision that wishes to keep only one filename can do so cleanly.
2. **The clean human-readable name `Maren_TR-2019-01v6.txt` has independent value as a label.** A reader browsing the working directory benefits from seeing `Maren_TR-2019-01v6.txt` next to other Maren-related artifacts; this is good filename hygiene independent of the arXiv-ID question.

So the file copy is now framed as: *"a useful human-readable alias, created during a phase that had an incorrect rationale, but with no harm done and some convenience preserved."*

## What references which file (as of post-P5)

| Reference type | Resolves to |
|----------------|-------------|
| `Manuscript_Draft_v1.md` line 932 | `1906.08804v6.pdf.txt` (historical; was already correct) |
| `Revision Research and Test Notes.txt` (95 references) | `1906.08804v6.pdf.txt` (historical; correct) |
| `Manuscript_Draft_v1_Audit.md` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias; A.1.a flag reversed) |
| `Audit_Remediation_Plan.md` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias) |
| Memory `reference_corpus_files.md` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias) |
| `Manuscript_Draft_v2.md` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias; Appendix E.1 includes the corrected provenance and the arXiv ID) |
| `Provenance_Map.csv` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias) |
| `v2_patches.md` (post-P5) | `Maren_TR-2019-01v6.txt` (clean alias) |
| `Phase_P5_OODA.md` | `1906.08804v6.pdf` (the original PDF, supplied by the operator on 2026-04-26 from `~/Downloads/`) |

## Cost of duplication

130,005 bytes (~130 KB) of duplicate content on disk. Negligible.

## Future cleanup (revised)

The original Phase-P1 cleanup criterion ("after v1.md is superseded, the original-name file can be deleted") still applies, but now the deletion would *not* be motivated by the original "misleading filename" reason. If a future revision wants to consolidate to a single filename, either name can be the surviving one:

- Keeping only `1906.08804v6.pdf.txt`: most conservative, preserves arXiv-ID provenance, breaks readability slightly
- Keeping only `Maren_TR-2019-01v6.txt`: more readable, preserves audit-chain references, loses the arXiv-ID hint (though Appendix E.1 of v2 carries it explicitly)

Either choice is reasonable. **No action is required.**

## Verification commands (still valid)

```bash
# Both files exist
ls -la 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt

# Both files have identical bytes
diff 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt   # zero output expected
sha256sum 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt   # same hash both lines

# v1.md and Test Notes still resolve to the (always-correct) historical filename
grep -c "1906.08804v6.pdf.txt" Manuscript_Draft_v1.md           # 1
grep -c "1906.08804v6.pdf.txt" "Revision Research and Test Notes.txt"   # 95

# Active artifacts post-P5 use the clean alias
grep -c "Maren_TR-2019-01v6.txt" Manuscript_Draft_v1_Audit.md   # multiple
grep -c "Maren_TR-2019-01v6.txt" Audit_Remediation_Plan.md      # multiple
grep -c "Maren_TR-2019-01v6.txt" Manuscript_Draft_v2.md         # multiple
```

## Audit-chain integrity note

The fact that the audit caught and corrected its own A.1.a flag in Phase P5 is, paradoxically, *evidence the audit chain is working*. A manuscript whose central virtue is "transparent, auditable, correctable" should produce — and openly document — its own reversals when better evidence becomes available. This log preserves both the original (incorrect) reasoning and the (correct) reversal so that any future reviewer can trace the audit's epistemic state at each phase.
