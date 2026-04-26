# Phase P3 OODA Worksheet — Title and Framing

**Phase.** P3 of the [Audit Remediation Plan](Audit_Remediation_Plan.md): title and framing (Plan §6 covering audit risks H.12, H.13, H.14, H.15, H.16).

**Scope.** 5 patches in [v2_patches.md](v2_patches.md): P-1 (title), P-2 (title-phrase note removal), P-3 (audience claim softening), P-4 (Maren-as-test-case Preface paragraph), P-11 (pre-publication AI disclosure template).

**Working principle.** Framing is third-party-verifiable: the manuscript's title and posture must accurately reflect what the body delivers, with no claims of endorsement or reviewer commitment. Per the standing user instruction ("third-party provability"), every framing claim is checked against the body's actual content.

**Author.** Claude (Opus 4.7), Phase P3, 2026-04-25.

---

## P3 corpus survey (Observe phase, before per-patch OODA)

Before each patch is OODA'd, this survey establishes what's already in v1 — so refinements can target gaps rather than repeat existing language.

### Survey 1: Mentions of named reviewers in v1

`grep -ni "friston\|maren\|active inference institute\| AII\b\|reviewed by"` — 30+ matches across v1.md, categorized:

| Category | Count | Examples | Risk |
|----------|-------|----------|------|
| **Standard citations** (Class B) | 19 | "Parr/Pezzulo/Friston 2022 §2.5", "Beal–Friston sign convention", "Maren 2016" | None — academic context |
| **Dedication** (line 32–37) | 5 named entities | Friston, Maren, Parr, Pezzulo, AII | Disclaimed at line 39 |
| **Audited manuscript references** (Maren TR-2019-01v6) | 8 | "the manuscript we audited (Maren TR-2019-01v6)" | Neutral; already conciliatory |
| **Audience-claim loci** | 1 | Line 711: *"Direct expert review by Friston, Maren, Active Inference Institute reviewers, or other qualified researchers"* | ⚠ Names individuals as suggested reviewers |

### Survey 2: "may be reviewed by" phrase

`grep -ni "may be reviewed by"`:

- **In v1.md**: **0 occurrences.** The phrase is NOT in the manuscript text.
- **In CLAUDE.md (line 7)**: 1 occurrence: *"Your work may be reviewed by Karl Friston, Alianna Maren, the Active Inference Institute, and a global consortium of scientists and students."* (project-internal instruction, not manuscript)
- **In ORCHESTRATE prompt** (project history): present in source prompt; not inherited.

**Implication:** P-3's "search-and-replace" intervention has zero loci in v1's body. It's a preventive patch (blocks regression during v2 production if the phrase enters via copy-paste from CLAUDE.md). Plus the actual audience-claim locus at line 711 needs handling.

### Survey 3: Maren framing tone

Loci where v1 might be perceived as critical of Maren:

| v1 line | Wording | Tone |
|---------|---------|------|
| 53 (Abstract) | "several interpretive layers around the identity drift from the standard convention in ways that warrant repair" | Audit-neutral |
| 377 (Chapter 4.5) | "the slip is repairable in one sentence. We treat this as a wording issue at the interpretive layer, not as a failure of the underlying mathematics" | Conciliatory |
| 544–546 (Chapter 8.5) | "We do not regard the CVM as a flawed contribution; we regard the *bridge* to active-inference $F[q]$ as not yet supplied" | Conciliatory |
| 640 (Chapter 10.4) | "We are not claiming that the manuscript we audited (Maren TR-2019-01v6) is 'wrong' in a global sense" | Explicit disclaimer |
| 697 (Conclusion) | "six specific interpretive issues in the manuscript we audited (q/p reversal, bound direction, …)" | Neutral list |
| 897 (Appendix D title) | "Error Register (Audited Manuscript: Maren TR-2019-01v6)" | Direct but standard audit terminology |

**Implication:** v1 is already consistently humble toward Maren. P-4's Preface paragraph adds an explanation (the *why* of choosing Maren as test case); it doesn't need to soften any existing prose.

### Survey 4: "Pure Unification" / "Pursuit of"

`grep -ni "pure unification\|pursuit of\|unification"`:

- v1 line 1: title — to be replaced by P-1
- v1 line 11: title-phrase note — to be removed by P-2
- v1 line 167: *"a unifying description of perception, learning, and action"* — describes Friston's program, not v1's contribution; OK to keep
- (no other mentions)

**Implication:** P-1 + P-2 are the *only* title-side interventions. The body of v1 is internally consistent with the new title.

---

## P3-OODA-1 — Patch P-1: Title revision (H.12, H.14)

### Observe
v1 line 1: *"An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization in Pursuit of Pure Unification and Simplification"*

131 characters. Includes "Pursuit of Pure Unification and Simplification" — a claim the body does not deliver.

### Orient
The title must do three things:
1. **Accurately label the manuscript.** What does the body actually deliver?
2. **Be marketable** if commercial publication is pursued (KDP, etc.).
3. **Pass third-party verification:** a reader who reads only the title and abstract should not be misled about what they're getting.

What v2's body delivers:
- An audit-grade collaborative review (Audit + Audit-of-Audit + Remediation Plan)
- Reviewable structure (Provenance_Map.csv, sentence-level claims with evidence classes)
- Reproducible numerical tests (87 pytest tests, bit-identical reference output, Dockerfile, CI)
- A conservative thermodynamic analogy treatment
- An open ledger of unresolved tensions (CVM bridge, NESS arguments, source-extraction caveats)
- A notation crosswalk between Beal, Friston, and Blei conventions

What it does NOT deliver:
- Unification of theories
- Empirical validation
- A textbook
- Novel mathematics

### Decide

**Title options under consideration:**

**Option A — Subject-first marketing-friendly:**
> *"Active Inference Free Energy Minimization: A Reviewable, Reproducible, Audit-Grade Collaborative Review by an Organic Operator and an AI Operator"*

| | |
|---|---|
| Length | 167 characters |
| Pros | Subject leads; "audit-grade" signals seriousness; explicitly names operators |
| Cons | Long; "Reviewable, Reproducible, Audit-Grade" is dense |

**Option B — Concise:**
> *"Active Inference Free Energy Minimization Under Audit: Reviewable Foundations, Reproducible Tests, and Open Tensions"*

| | |
|---|---|
| Length | 117 characters |
| Pros | Concise; signals audit; the "Open Tensions" framing is honest |
| Cons | Drops the "organic / AI operator" framing — central to project identity |

**Option C — P-1 current (organic + AI operator preserved):**
> *"An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization: Reviewable Foundations, Reproducible Tests, and Open Tensions"*

| | |
|---|---|
| Length | 167 characters |
| Pros | Preserves the unique "Organic Operator and AI Operator Collaborative Review" framing; signals what the body delivers (Reviewable, Reproducible, Open Tensions); no overclaim |
| Cons | Long; the "Organic Operator and AI Operator" phrasing is unusual |

**Option D — Body-anchored:**
> *"Variational Free Energy in Active Inference: A Collaborative Audit by an Organic Operator and an AI Operator with Reproducible Tests and Open Tensions"*

| | |
|---|---|
| Length | 153 characters |
| Pros | "Variational Free Energy" is standard terminology; "Audit" is direct |
| Cons | Drops the "Free Energy Minimization" subject framing v1 emphasized |

### Verify (third-party provability of each option)

For each option, ask: would a reader of the title-only correctly infer the content?

| Option | "Reviewable" delivered? | "Reproducible" delivered? | "Audit" implied? | "Operator framing" preserved? | Overclaims? |
|--------|-------------------------|---------------------------|------------------|-------------------------------|-------------|
| A | ✓ | ✓ | ✓ ("audit-grade") | ✓ | No |
| B | ✓ | ✓ | ✓ ("under audit") | ✗ (dropped) | No |
| C (P-1) | ✓ | ✓ | implied (Open Tensions = audit findings) | ✓ | No |
| D | ✗ (no "reviewable") | ✓ | ✓ | ✓ | No |

Options A and C both pass the third-party test cleanly. C preserves the project's signature "Organic Operator + AI Operator" framing (which is itself part of the project's contribution — a model for AI-augmented scholarship). I recommend keeping P-1's choice (Option C).

### Decide (final)
**Confirm Option C as P-1.** No refinement needed.

### Act
- Patch P-1 stands as written in v2_patches.md.

### Post-fix evidence class
**Class E** (project-framing). The title is verifiable by reading the body's table of contents.

---

## P3-OODA-2 — Patch P-2: Title-phrase note removal

### Observe
v1 line 11: *"Title-phrase note. 'Pursuit of pure unification and simplification' is used aspirationally. It does not assert that any such unification has been achieved. …"*

This note exists *because* the v1 title contains "Pure Unification and Simplification." If the title is changed (P-1), the note becomes orphaned.

### Orient
Two paths:
- **Remove the note entirely** (P-2 current). Cleaner; new title doesn't need the disclaimer.
- **Repurpose the note** to disclaim the new title's terms (e.g., "Reviewable Foundations" doesn't mean foundations are *fully reviewed*; it means they're *open to review*). This is over-engineering.

P-2's removal is the cleaner choice.

### Verify
After P-1 + P-2 are applied to v2:
- Title is the new Option C
- No orphan title-phrase note
- No language asserts unification

✓ Self-consistent.

### Decide
**Patch P-2 stands.**

### Post-fix evidence class
N/A (removal).

---

## P3-OODA-3 — Patch P-3: Audience claim softening (H.13)

### Observe
P-3's spec: *"Search v2 for any phrase of the form 'may be reviewed by Karl Friston, Alianna Maren, the Active Inference Institute' (this language appears in CLAUDE.md and may be referenced from the manuscript). Replace with hedged form."*

The Survey above showed:
- v1 has **zero** occurrences of "may be reviewed by"
- v1 line 711 has the actual audience-implication risk: *"Direct expert review by Friston, Maren, Active Inference Institute reviewers, or other qualified researchers"*

### Orient
The P-3 patch as written would no-op on v1. The actual locus of risk is v1 line 711.

⚠ **Refinement needed.** P-3 should be expanded to address line 711.

### Decide
Refine P-3 to include line 711 softening. Specifically: line 711 (in the conclusion's "What would increase confidence" subsection) currently names individuals; replace with role-based hedging.

### Act
Refine P-3 in v2_patches.md.

**Updated P-3 text** (covers two loci):

**Locus 1 (preventive — search-and-replace):** if v2 contains a phrase of the form *"may be reviewed by Karl Friston, Alianna Maren, the Active Inference Institute"* (e.g., copy-pasted from CLAUDE.md), replace with: *"This manuscript is offered for review by qualified experts in active inference and variational inference. Researchers whose work is referenced herein — including Karl Friston, Alianna Maren, the Active Inference Institute, and the broader VI / active-inference / MIT-Press community — would be among the most qualified reviewers; this manuscript explicitly does not claim that any such party has agreed to review or has been contacted."*

**Locus 2 (v1 line 711 in Conclusion):** Replace:
> *"What would increase confidence. Direct expert review by Friston, Maren, Active Inference Institute reviewers, or other qualified researchers. Direct inspection of Beal (2003) Sec. 2.2.1 and Eqns. 2.10–2.16. Independent re-execution of the stress tests. A proposed CVM ↔ active-inference bridge proposition with proof sketch."*

with:

> *"What would increase confidence. Direct expert review by qualified researchers in active inference and variational inference; researchers whose work is referenced herein (Friston, Maren, Parr, Pezzulo, the Active Inference Institute, and the broader community) would be especially well-positioned, but this manuscript explicitly does not claim that any such reviewer has been contacted or has agreed to review. Direct inspection of Beal (2003) Sec. 2.2.1 and Eqns. 2.10–2.16 (per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1). Independent re-execution of the stress tests (per [manuscript-v2-reproducibility/](manuscript-v2-reproducibility/)). A proposed CVM ↔ active-inference bridge proposition with proof sketch (per [Audit_Remediation_Plan.md](Audit_Remediation_Plan.md) Chapter 8.2)."*

### Verify
After refinement: v2 has no audience-claim language asserting reviewer commitment, including in the "What would increase confidence" suggestion list.

### Post-fix evidence class
**Class E** (framing, properly hedged).

---

## P3-OODA-4 — Patch P-4: Maren-as-test-case Preface paragraph (H.15)

### Observe
P-4 inserts a paragraph after v1 line 92 explaining why Maren TR-2019-01v6 was chosen as the audit subject.

The patch text reads:
> *"A note on the choice of Maren TR-2019-01v6 as a primary subject. We chose Maren's manuscript not because it is uniquely error-prone… but because it is recent, ambitious, and explicit about its goal of being a Beal–Friston–Blei Rosetta stone. … None of the findings should be read as dismissing Maren's pedagogical contribution; the central algebra of her Eqn 2 is recoverable, and the notation crosswalk goal is valuable. Several of our refinements (the four-item CVM bridge checklist; the Markov-blanket trichotomy; the model/process distinction) build directly on the structure of her exposition."*

### Orient
The patch acknowledges:
- Maren's manuscript's algebra is recoverable (already known)
- The Rosetta-stone goal is valuable
- Three v2 refinements build on Maren's structure

What it could ALSO acknowledge (per the audit's §3.1 "Genuine contributions verified"):
- Maren correctly identifies that Friston systematically suppresses summations and integrals — a *useful and verified* pedagogical observation
- Maren correctly identifies the Beal–Friston sign-flip relationship (the audit confirms her line 318 is correct, even though line 319 misapplies it)
- Maren explicitly cites Sengupta-Stemmler-Friston (2013)'s "VFE is not Helmholtz free energy" caveat — an important hedge
- Maren's two-form presentation of Eqn 2 is conceptually correct

⚠ **Refinement candidate.** P-4 could expand to specifically credit these Maren contributions. This makes the "test case, not target" framing more credible — it shows we're aware of Maren's positive contributions, not just her errors.

### Decide
Refine P-4 to add a 1–2 sentence credit list.

### Act
Refine P-4 in v2_patches.md.

**Updated P-4 text:**

> *"A note on the choice of Maren TR-2019-01v6 as a primary subject. We chose Maren's manuscript not because it is uniquely error-prone — most expository manuscripts at the variational-inference / active-inference interface contain similar interpretive layers and similar sign-convention hazards — but because it is recent, ambitious, and explicit about its goal of being a Beal–Friston–Blei Rosetta stone. That ambition makes it a good test case for the kind of audit we are trying to demonstrate.*
>
> *None of the findings in this manuscript should be read as dismissing Maren's pedagogical contribution. Specifically, several observations in Maren TR-2019-01v6 are pedagogically valuable and have been verified by direct read in our audit (see [Manuscript_Draft_v1_Audit.md](Manuscript_Draft_v1_Audit.md) §C):*
>
> *- the observation that Friston's notation systematically suppresses summations and integrals (SOURCE A:162) — accurate and useful;*
> *- the explicit identification that variational free energy is not the Helmholtz free energy, with direct quotation of Sengupta-Stemmler-Friston (2013) (SOURCE A:68);*
> *- the explicit acknowledgment of the Beal-to-Friston sign-flip when shifting conventions (SOURCE A:318); and*
> *- the two-form presentation of Eqn 2 that exposes both the energy-minus-entropy and the divergence-plus-evidence decompositions.*
>
> *Several of our refinements (the four-item CVM bridge checklist; the Markov-blanket trichotomy; the model/process distinction) build directly on the structure of her exposition. The audit's central findings are interpretive-layer corrections — six items spread across the parenthetical at line 34, the bound-direction wording at line 319, the posterior/process conflation at line 132, the L-expansion at line 166, the integration substitution at lines 105 and 289, and the Appendix B sign at line 457 — each repairable by edits of one or two sentences. The core algebra of Maren's Eqn 2 is recoverable, and the notation crosswalk goal is valuable."*

### Verify
A reader of v2's Preface understands:
- Why Maren was chosen (test case, not target)
- That Maren's manuscript has *specific* pedagogical contributions that v2 credits
- That the audit findings are interpretive-layer corrections, not core-algebra failures
- That the audit's spirit is repair, not dismissal

This is more substantive than the original P-4. ✓

### Post-fix evidence class
**Class E** (framing, with specific verifiable contribution credits).

---

## P3-OODA-5 — Patch P-11: Pre-publication AI disclosure template (H.16)

### Observe
P-11 inserts a venue-agnostic AI disclosure statement into the front matter, with sub-bullets for KDP, arXiv, peer-reviewed journals, OSF/Zenodo.

### Orient
The risk: AI-disclosure policies *evolve*. A 2026-04-25 disclosure may not match policy at submission time. The patch wisely says "verify at submission time."

What the patch could be more diligent about:
- The conflict-of-interest statement is included (good).
- The four-session AI provenance is referenced via §4.1 (Patch P-9), but the disclosure template doesn't mention session count.
- Specific venue-by-venue *checklist* with anticipated requirements would be useful.

⚠ **Refinement candidate.** Build a separate `Pre_Publication_Checklist.md` with venue-by-venue gates, and reference it from P-11.

### Decide
1. Refine P-11 to reference Pre_Publication_Checklist.md
2. Build Pre_Publication_Checklist.md as a P3 deliverable

### Act
- Build Pre_Publication_Checklist.md (next deliverable)
- Refine P-11 in v2_patches.md

### Verify
A reader pursuing publication has a single document (`Pre_Publication_Checklist.md`) that lists, per venue, what to verify before submission.

### Post-fix evidence class
**Class E** (publication-process framing).

---

## P3 framing-consistency check

After P-1, P-2, P-3, P-4 are applied to v2, do all framing statements *agree*?

| Statement type | Locus in v2 | Tone |
|----------------|-------------|------|
| Title (P-1) | Line 1 | Reviewable, reproducible, open tensions; no unification |
| Operator framing | Lines 3–5 (operators), Preface (P-4) | Organic + AI; non-credentialed; AI provisional |
| Dedication (line 32–37) | Front matter | Acknowledgment + line 39 disclaimer |
| Preface | Includes new P-4 paragraph | Maren as test case + credits |
| Audience claim | "Suggested next steps" (line 711, post-P-3) | Hedged; no commitment claim |
| AI disclosure (P-11) | Front matter post-Transparency | Four-session chain; venue-agnostic; checklist reference |
| Appendix F | Existing | "Correction not endorsement" |

Cross-check: no statement contradicts another. ✓ Framing is internally consistent post-P3.

---

## P3 deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| D1 | This OODA worksheet | ✅ |
| D2 | Refined patch P-3 (audience claim + line 711) | (next) |
| D3 | Refined patch P-4 (Maren credits) | (next) |
| D4 | Refined patch P-11 (Pre_Publication_Checklist cross-ref) | (next) |
| D5 | `Pre_Publication_Checklist.md` (new) | (next) |
| D6 | `Provenance_Map.csv` updated for title and framing | (next) |
| D7 | Final continuity check | (next) |

## Summary of P3 OODA results

| Patch | Plan ref | Verification | Refinement needed? |
|-------|----------|--------------|--------------------|
| P-1 | H.12, H.14 | Option C confirmed: title accurately labels body, no overclaim | No |
| P-2 | H.12 | Removal cleanly self-consistent with P-1 | No |
| P-3 | H.13 | Found unanticipated locus at v1 line 711; preventive search-and-replace alone is insufficient | **Yes — add line 711 explicit replacement** |
| P-4 | H.15 | Patch is conciliatory but doesn't credit specific Maren contributions verified by audit | **Yes — add four-item credit list** |
| P-11 | H.16 | Patch good but lacks venue-by-venue checklist | **Yes — build separate Pre_Publication_Checklist.md and cross-reference** |

**3 of 5 P3 patches refined; 2 stand as-written.** Refinements applied next.

— *End of P3 OODA worksheet.*
