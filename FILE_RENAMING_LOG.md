# File Renaming Log

**Date.** 2026-04-25 (Phase P1 of the [Audit Remediation Plan](Audit_Remediation_Plan.md))

**Operation.** Source file copied (not moved) under a clean name. Original file retained for historical reference continuity.

---

## What changed

| Before | After |
|--------|-------|
| `1906.08804v6.pdf.txt` (single file, misleading name) | `1906.08804v6.pdf.txt` AND `Maren_TR-2019-01v6.txt` (two bit-identical files) |

Both files exist on disk. SHA-256 of either:

```
b68b852985a5b16742a81e6de2bf161e239e6bd761dca5bae22de6160379dae1
```

File size: 130,005 bytes. 643 lines. Verified by `python -c 'import hashlib; ...'` immediately after the copy operation.

---

## Why two files instead of a rename

The original filename `1906.08804v6.pdf.txt` implies an arXiv submission (arXiv:1906.08804) that, on the public arXiv index, does **not** correspond to Maren TR-2019-01v6 — it corresponds to a different paper. The filename is therefore misleading.

A simple rename would have been the obvious fix, but it would break:

- `Manuscript_Draft_v1.md` line 932 — the only reference inside v1's Appendix E.1.
- `Revision Research and Test Notes.txt` — the historical audit deliverable from a prior Claude session, which contains 95 markdown links of the form `[SOURCE A:34](1906.08804v6.pdf.txt:34)`.

Both files are *historical artifacts* from completed prior sessions. Modifying them post-hoc would:

1. Lose provenance integrity (the historical record would no longer match what was actually produced).
2. Require an audit trail of its own to explain the in-place edits.
3. Create confusion for anyone comparing the live state to the prior session's output.

The copy strategy preserves all 96 historical references intact while making the cleaner name available for active and future work.

## What references which file

| Reference type | Resolves to |
|----------------|-------------|
| `Manuscript_Draft_v1.md` line 932 | `1906.08804v6.pdf.txt` (historical; will be updated to clean name in v2) |
| `Revision Research and Test Notes.txt` (95 references) | `1906.08804v6.pdf.txt` (historical; left intact) |
| `Manuscript_Draft_v1_Audit.md` (after P1 update) | `Maren_TR-2019-01v6.txt` (active) |
| `Audit_Remediation_Plan.md` (after P1 update) | `Maren_TR-2019-01v6.txt` (active) |
| Memory `reference_corpus_files.md` (after P1 update) | `Maren_TR-2019-01v6.txt` (active) |
| `Provenance_Map.csv` (new in P1) | `Maren_TR-2019-01v6.txt` (active) |
| `v2_patches.md` (new in P1) | `Maren_TR-2019-01v6.txt` (active) |
| `Manuscript_Draft_v2.md` (future, Phase P4) | `Maren_TR-2019-01v6.txt` (active) |

## Cost of duplication

130,005 bytes (~130 KB). On any contemporary storage system this is negligible. The benefit is perfect continuity.

## Future cleanup

After v2 is published and the historical artifacts are no longer load-bearing for active work, a future session may delete `1906.08804v6.pdf.txt` provided that:

1. v1.md has been updated (or formally superseded by v2.md and marked archival).
2. Test Notes' references are no longer relied on for active work.
3. A note is added to this log recording the deletion.

Until those conditions are met, **both files must be preserved**.

## Verification commands

A third-party verifier can confirm the situation with:

```bash
# Both files exist
ls -la 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt

# Both files have identical bytes
diff 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt   # zero output expected
sha256sum 1906.08804v6.pdf.txt Maren_TR-2019-01v6.txt   # same hash both lines

# v1.md and Test Notes still resolve to the historical file
grep -c "1906.08804v6.pdf.txt" Manuscript_Draft_v1.md           # 1
grep -c "1906.08804v6.pdf.txt" "Revision Research and Test Notes.txt"   # 95

# Active artifacts use the clean name
grep -c "Maren_TR-2019-01v6.txt" Manuscript_Draft_v1_Audit.md   # 5 (after update)
grep -c "Maren_TR-2019-01v6.txt" Audit_Remediation_Plan.md      # 2 (after update)
```
