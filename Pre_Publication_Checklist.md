# Pre-Publication Checklist

**Phase.** Specifies the venue-by-venue compliance gates that must clear before any public release of `Manuscript_Draft_v2.md`. Referenced from v2 patch P-11 (front-matter AI authorship and contribution disclosure).

**Status.** Specification only. Each gate awaits a real submission decision.

**Author.** Claude (Opus 4.7), Phase P3, 2026-04-25. AI-generated; offered for human verification before any submission.

**Standing instruction.** *Verify each policy at the time of submission.* Policies evolve. Anything below should be cross-checked against the venue's current public guidance on the day of submission. Where a policy has changed since 2026-04-25, follow the current policy and update this file.

---

## §0 Universal pre-submission gates (apply to every venue)

These must clear regardless of venue:

| # | Gate | Status |
|---|------|--------|
| U1 | All Layer 1 fix items applied (Plan §8.1, 30 items) | ⬜ |
| U2 | Audit-of-v2 run; Layer 1 acceptance checklist 30/30 (Plan §6.1) | ⬜ |
| U3 | Reproducibility repository public (or accessible to reviewer) | ⬜ |
| U4 | All 87 pytest tests passing on the 9-cell CI matrix | ⬜ |
| U5 | `audit_tests_v2.py` output bit-identical to `reference_output.txt` on at least three host platforms (Linux x86-64, Windows, macOS arm64) | ⬜ |
| U6 | At least two independent qualified human experts have reviewed v2 (Plan §7.1) | ⬜ |
| U7 | Layer 2 inspection gates L2-1 through L2-8 cleared per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1–§8 | ⬜ |
| U8 | Conflict-of-interest statement in front matter | ⬜ |
| U9 | Corrigenda channel operational (e-mail address or GitHub issue tracker) | ⬜ |
| U10 | Provenance map sample of 20 random rows: 20/20 verifiably accurate | ⬜ |

**Acceptance:** all 10 universal gates ✅ before any submission.

---

## §1 — arXiv (preprint server; recommended FIRST publication channel)

**Recommendation.** Deposit on arXiv before any commercial channel. arXiv timestamps establish priority and create a permanent citable record. If a later commercial channel rejects the work, the preprint is preserved.

### Acquisition path
- arXiv homepage: `https://arxiv.org/`
- Submission portal: `https://arxiv.org/submit`
- Endorsement may be required for first-time submitters in some categories. The likely categories: `q-bio.NC` (computational neuroscience), `stat.ML` (machine learning), `cs.AI`, possibly `cs.LG`.

### arXiv-specific gates

| # | Gate | Action | Status |
|---|------|--------|--------|
| A1 | AI-tools field on submission form | Disclose Anthropic Claude (Opus 4.7) usage; specify the four AI sessions per v2 Appendix E.2 | ⬜ |
| A2 | License | Choose CC-BY 4.0 (recommended for maximum reuse) or CC-BY-NC if commercial restrictions desired | ⬜ |
| A3 | Author list | Michael Polzin as sole human author; Anthropic Claude acknowledged as AI co-contributor in front matter (NOT in author list — most preprint conventions disallow AI as author) | ⬜ |
| A4 | Categories | Primary: `q-bio.NC` (active-inference area); Secondary: `stat.ML`, possibly `cs.AI` | ⬜ |
| A5 | Endorsement | If first-time submitter to chosen category, find an endorser — typically a co-author or established researcher in the area | ⬜ |
| A6 | Companion files | Reproducibility repository link in abstract / references | ⬜ |
| A7 | Title (under 250 chars) | Confirm v2 title fits | ⬜ |
| A8 | Abstract (≤1920 chars / ≤300 words) | Confirm v2 abstract fits | ⬜ |
| A9 | LaTeX or PDF | Decide on submission format (PDF is acceptable; LaTeX preferred for typesetting quality) | ⬜ |

### What arXiv may not allow
- AI-generated submissions where the AI is the *sole* author (must have human-author primary).
- Submissions that don't fit a category (the manuscript is interdisciplinary; choose carefully).

### Verification
After submission, verify the deposit appears in arXiv's listing and the AI-tools field renders correctly.

---

## §2 — Open Science Framework (OSF) or Zenodo (institutional / data repositories)

**Recommendation.** Mirror the manuscript and reproducibility repository to OSF or Zenodo for permanent DOI assignment. Recommended even alongside arXiv.

### Acquisition path
- OSF: `https://osf.io/` (free; supports DOI assignment)
- Zenodo: `https://zenodo.org/` (free; CERN-backed; DOIs)

### OSF/Zenodo gates

| # | Gate | Action | Status |
|---|------|--------|--------|
| O1 | DOI assignment | Both platforms assign DOIs on deposit; choose stable URL | ⬜ |
| O2 | Reproducibility repository deposit | Upload `manuscript-v2-reproducibility/` as a separate component or sibling deposit | ⬜ |
| O3 | License | CC-BY 4.0 (recommended) | ⬜ |
| O4 | AI disclosure | Add to deposit metadata: AI-augmented authorship per v2 Appendix E.2 | ⬜ |
| O5 | Provenance bundle | Include `Provenance_Map.csv`, `Audit_Remediation_Plan.md`, `Phase_P{1,2,3}_OODA.md`, `FILE_RENAMING_LOG.md` as supplementary materials | ⬜ |
| O6 | Versioning | Reserve a slot for v3 (post-Layer-2-review) updates | ⬜ |

### Verification
Deposit completes; DOI minted; URL accessible without login.

---

## §3 — Peer-reviewed journal (recommended for formal publication after preprint)

**Recommendation.** Submit to a journal *after* arXiv deposit, citing the preprint. Strong candidates by topic fit:

- **Journal of the Royal Society Interface** (J. R. Soc. Interface) — where Friston (2013) "Life as we know it" appeared; receptive to active-inference work.
- **Neural Computation** — variational-inference and computational neuroscience.
- **Frontiers in Computational Neuroscience** — open access; receptive to AI-augmented methods.
- **PLOS Computational Biology** — open access; broad scope.
- **Active Inference Institute publications** if any (verify channel).

### Journal-specific gates (general)

| # | Gate | Action | Status |
|---|------|--------|--------|
| J1 | AI authorship policy | Verify the chosen journal's stance on AI co-authorship (most disallow AI as listed author but allow disclosure as contributor) | ⬜ |
| J2 | AI disclosure form | Most journals require an AI-tools disclosure form (e.g., Elsevier, Springer, Nature, etc.) — fill per v2 Appendix E.2 | ⬜ |
| J3 | Plagiarism / similarity check | Run iThenticate or equivalent before submission; AI-augmented work may have higher textual similarity due to standard phrasing | ⬜ |
| J4 | Cover letter | Disclose AI-augmented drafting in cover letter; emphasize the manuscript's audit posture | ⬜ |
| J5 | Reviewer suggestions | If the journal allows suggesting reviewers, include qualified active-inference / VI specialists (with explicit disclaimer that this is a suggestion, not a contact) | ⬜ |
| J6 | Page / word limits | Confirm v2 fits within the journal's limits (v2 is approximately 1,200 manuscript lines, likely 30–40 pages typeset — most journals are flexible for technical reviews) | ⬜ |
| J7 | Companion repository | Link to public reproducibility repository in submission | ⬜ |
| J8 | Double-blind option | If journal offers double-blind review, decide whether to use it | ⬜ |

### What may not fly at peer-reviewed journals
- AI-as-sole-author is universally disallowed.
- Some journals may decline AI-augmented submissions as a matter of policy (rare, but increasing in 2025–2026); verify.
- The "Organic Operator and AI Operator" framing in the title may need to be reformatted for traditional journals (e.g., subtitle rather than title). Pre-submission consultation with the editor is recommended.

---

## §4 — Amazon KDP (Kindle Direct Publishing; commercial channel)

**Recommendation.** KDP is appropriate as a *secondary* channel **after** preprint and ideally peer review. A KDP-only release without prior preprint forecloses scholarly review channels and is not recommended.

### Acquisition path
- KDP homepage: `https://kdp.amazon.com/`
- KDP help on AI-generated content: search for "AI content disclosure" in KDP's help center at submission time.

### KDP-specific gates

| # | Gate | Action | Status |
|---|------|--------|--------|
| K1 | AI-content disclosure | Mandatory since at least 2023; disclose AI-augmented authorship in the submission form per current KDP policy | ⬜ |
| K2 | Author of record | Michael Polzin as sole author; Anthropic Claude acknowledged in front matter, not as KDP author | ⬜ |
| K3 | Categories | Choose appropriate KDP categories — likely "Science & Math > Mathematics" and/or "Computers & Technology > AI & Machine Learning" | ⬜ |
| K4 | Cover design | Custom cover required; consider AI-assisted (with disclosure) or manual | ⬜ |
| K5 | ISBN | KDP can assign a free ISBN; consider whether to use a custom ISBN for institutional registration | ⬜ |
| K6 | Pricing | Set price; KDP Select enrollment optional | ⬜ |
| K7 | Royalty model | Choose 35% or 70% royalty depending on price and territory | ⬜ |
| K8 | Print-on-demand vs. e-book | Decide; both are options on KDP | ⬜ |
| K9 | Front-matter consistency | Ensure KDP version's front matter matches preprint version (no quiet edits between channels) | ⬜ |
| K10 | Attribution to reproducibility repo | Front matter should link to public repository URL | ⬜ |

### What may not fly at KDP
- Insufficient AI disclosure → submission rejection or post-publication takedown.
- Plagiarism detection (KDP runs automated checks) — AI-augmented works can flag false positives; be prepared to respond.

---

## §5 — Active Inference Institute community channels

**Recommendation.** Concurrent with or after preprint, share with AII community channels. AII has a tradition of welcoming substantive technical contributions.

### Acquisition path (verify at submission time)
- AII community Discord, mailing list, or community channels.
- Cross-post to relevant active-inference subreddits or forums if appropriate.

### AII-specific gates

| # | Gate | Action | Status |
|---|------|--------|--------|
| I1 | Community-norm review | Familiarize with AII's contribution norms; align format and tone | ⬜ |
| I2 | Direct outreach | If sharing, address as "for community review" not "for endorsement" | ⬜ |
| I3 | Citation conventions | Verify that v2's citations match AII's preferred style for cross-referenced work | ⬜ |

### What may not fly at AII
- Manuscripts perceived as critical of foundational figures without commensurate care (the v2 Maren-as-test-case framing in Patch P-4 is designed to mitigate this).

---

## §6 — Pre-submission outreach (optional but recommended)

Before formal submission, consider direct outreach to figures named in the manuscript:

| # | Action | Rationale | Status |
|---|--------|-----------|--------|
| R1 | Contact Karl Friston | Share v2 draft as an invitation for review; respect that response may be slow or absent | ⬜ |
| R2 | Contact Alianna Maren | Share v2 draft; discuss the audit findings of TR-2019-01v6; offer to incorporate her feedback into v3 | ⬜ |
| R3 | Contact Active Inference Institute | Submit for community review before formal publication | ⬜ |
| R4 | Set a 90-day response window | If no response within the window, proceed with publication noting the outreach attempt | ⬜ |

**Note.** This step is *optional* and *not blocking*. Publication can proceed without responses. But the act of attempting outreach is good citizenship.

---

## §7 — Post-publication corrigenda

After publication, errors WILL be found. Plan for them:

| # | Action | Status |
|---|--------|--------|
| C1 | Public corrigenda channel (e-mail or GitHub issues) listed in front matter | ⬜ |
| C2 | Commitment to publish a public changelog | ⬜ |
| C3 | Versioning strategy: v3 for next major revision; v2.1, v2.2 for minor corrigenda | ⬜ |
| C4 | Each corrigenda entry: who reported, what was wrong, what changed, when | ⬜ |
| C5 | At least one annual review pass after initial publication | ⬜ |

---

## §8 — Aggregate publication readiness

Publication is appropriate iff **all** of:

- [ ] Universal gates U1–U10 ✅
- [ ] Target venue's specific gates ✅
- [ ] Layer 2 expert reviews completed (L2-1 through L2-9 per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md))
- [ ] Pre-submission outreach attempt made (or 90-day window expired)
- [ ] Corrigenda channel operational (§7 C1)
- [ ] Author confidence rating ≥ 8.5/10 on the math core (currently 8/10 v2 abstract per Patch P-6; expected to rise after Layer 2 expert review confirms)

---

## §9 — Provenance and trail

This checklist itself is a provenance artifact. When submission proceeds, each gate's "Status" column should be filled with:
- A date
- The verifier (typically Michael Polzin as organic operator)
- A reference to the supporting evidence (e.g., "verified KDP AI-disclosure policy at https://kdp.amazon.com/help/topic/X on 2026-MM-DD")

The checklist with Status filled becomes a permanent record of the publication path and survives any future audit.

— *End of Pre-Publication Checklist.*
