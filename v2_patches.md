# v2 Patches — Text Changes for `Manuscript_Draft_v1.md` → `Manuscript_Draft_v2.md`

**Phase.** Specifies the v1→v2 text edits called for by the [Audit Remediation Plan](Audit_Remediation_Plan.md). Each patch has a unique ID, the v1 line range it targets, the exact replacement text, and an acceptance test.

**Status.** Specification only. Patches are *not* applied to v1 (v1 is preserved as the historical first draft). Patches will be applied during Phase P4 (v2 production).

**Author.** Claude (Opus 4.7), Phase P1, 2026-04-25.

**Patch numbering.** Patches are numbered in v1 line order. Each is independently applicable; no patch depends on a later one. Cross-references between patches are noted where they exist.

---

## Patch P-1 — Title revision (Plan H.12, H.14)

**v1 line.** 1.

**Current text:**

> # An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization in Pursuit of Pure Unification and Simplification

**Replacement text:**

> # An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization: Reviewable Foundations, Reproducible Tests, and Open Tensions

**Rationale.** v1's title promises "Pure Unification and Simplification." The body of v1 does not deliver unification. The title-phrase note partly hedges this, but the new title is delivered by the body. Alternative kept on file: *"…: A Reviewable Notation and Sign-Convention Crosswalk"*; the chosen alternative is broader and reflects the chapters on bound discipline, reproducible tests, and open tensions equally.

**Acceptance.** v2 line 1 contains no occurrence of "Pure Unification."

**Cross-reference.** Patch P-2 updates the title-phrase note to reflect the new title.

---

## Patch P-2 — Title-phrase note removal (Plan H.12)

**v1 line.** 11.

**Current text:**

> **Title-phrase note.** "Pursuit of pure unification and simplification" is used aspirationally. It does not assert that any such unification has been achieved. It names an explanatory aim: to reduce avoidable confusion without erasing legitimate mathematical or scientific complexity.

**Replacement text:** *(remove entirely; no longer needed once the title no longer claims unification)*.

**Acceptance.** v2 has no title-phrase note in front matter.

---

## Patch P-3 — Audience claim softening (Plan H.13)

**v1 locations.** Two distinct loci, identified during Phase P3 corpus survey:

**Locus 1 (preventive — search-and-replace).** Search v2 for any phrase of the form *"may be reviewed by Karl Friston, Alianna Maren, the Active Inference Institute"* (this language appears in CLAUDE.md line 7 and may be inadvertently copy-pasted into v2 during drafting). If present, replace with the hedged form:

> *"This manuscript is offered for review by qualified experts in active inference and variational inference. Researchers whose work is referenced herein — including Karl Friston, Alianna Maren, the Active Inference Institute, and the broader VI / active-inference / MIT-Press community — would be among the most qualified reviewers; this manuscript explicitly does not claim that any such party has agreed to review or has been contacted."*

Phase P1 corpus survey confirmed v1.md has zero occurrences of "may be reviewed by"; the locus-1 intervention is therefore preventive (blocks regression during v2 drafting).

**Locus 2 (active — v1 line 711 replacement).** v1 Conclusion's "What would increase confidence" subsection currently reads:

> *"What would increase confidence. Direct expert review by Friston, Maren, Active Inference Institute reviewers, or other qualified researchers. Direct inspection of Beal (2003) Sec. 2.2.1 and Eqns. 2.10–2.16. Independent re-execution of the stress tests. A proposed CVM ↔ active-inference bridge proposition with proof sketch."*

This names individuals as suggested reviewers without explicit "no commitment" hedging. Replace with:

> *"What would increase confidence. Direct expert review by qualified researchers in active inference and variational inference; researchers whose work is referenced herein (Friston, Maren, Parr, Pezzulo, the Active Inference Institute, and the broader community) would be especially well-positioned to review, but this manuscript explicitly does not claim that any such reviewer has been contacted or has agreed to review. Direct inspection of Beal (2003) Sec. 2.2.1 and Eqns. 2.10–2.16 (per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1). Independent re-execution of the stress tests (per [manuscript-v2-reproducibility/](manuscript-v2-reproducibility/)). A proposed CVM ↔ active-inference bridge proposition with proof sketch (per [Audit_Remediation_Plan.md](Audit_Remediation_Plan.md) §1.4 and v2 Chapter 8.2)."*

**P3 refinement note.** The original P1 patch was framed as a single search-and-replace covering CLAUDE.md-style language. Phase P3's corpus survey found that v1 inherits no such language directly, but does contain an audience-claim risk at line 711 (in the Conclusion). The expanded patch covers both: the preventive locus (zero-instance search) and the active locus (line 711 explicit replacement).

**Acceptance.** No assertion in v2 implies endorsement or commitment from named individuals or institutions; the "what would increase confidence" suggestion list explicitly disclaims contact/agreement.

---

## Patch P-4 — Maren-as-test-case Preface paragraph (Plan H.15)

**v1 line.** Insert after line 92 (end of Preface).

**Insertion (refined in Phase P3 to credit specific verified pedagogical contributions):**

> *"A note on the choice of Maren TR-2019-01v6 as a primary subject. We chose Maren's manuscript not because it is uniquely error-prone — most expository manuscripts at the variational-inference / active-inference interface contain similar interpretive layers and similar sign-convention hazards — but because it is recent, ambitious, and explicit about its goal of being a Beal–Friston–Blei Rosetta stone. That ambition makes it a good test case for the kind of audit we are trying to demonstrate.*
>
> *None of the findings in this manuscript should be read as dismissing Maren's pedagogical contribution. Specifically, several observations in Maren TR-2019-01v6 are pedagogically valuable and have been verified by direct read in our audit (see [Manuscript_Draft_v1_Audit.md](Manuscript_Draft_v1_Audit.md) §C and [Phase_P3_OODA.md](Phase_P3_OODA.md) Survey 3):*
>
> *- The observation that Friston's notation systematically suppresses summations and integrals (SOURCE A:162) — accurate and useful for any reader transitioning between Beal and Friston conventions.*
> *- The explicit identification that variational free energy is **not** the Helmholtz free energy, with direct quotation of Sengupta-Stemmler-Friston (2013) (SOURCE A:68) — a critical caveat against thermodynamic over-identification that v2 Chapter 7 builds on.*
> *- The explicit acknowledgment of the Beal-to-Friston sign-flip when shifting conventions (SOURCE A:318): "we reverse the signs on all of the terms on the right-hand-side of Eqn. 34, as well as the direction of the inequality." (Maren is correct here; the audit's E2 finding is that the very next sentence at line 319 fails to apply this reversal — an internal contradiction, not a missed convention.)*
> *- The two-form presentation of Eqn 2 that exposes both the energy-minus-entropy and the divergence-plus-evidence decompositions — a perspective often missed in Friston's compressed exposition.*
>
> *Several of our refinements — the four-item CVM bridge checklist; the Markov-blanket trichotomy; the model-vs-process distinction; the Complexity-Accuracy form added in v2 Chapter 2 (Patch P-12) — build directly on the structure of her exposition. The audit's central findings are interpretive-layer corrections — six items (E1–E10 in Appendix D) repairable by edits of one or two sentences each. The core algebra of Maren's Eqn 2 is recoverable, and the notation crosswalk goal is valuable. We treat the audit posture as one of repair, not dismissal."*

**P3 refinement note.** The original P1 patch was conciliatory but did not credit specific Maren pedagogical contributions that the audit verified by direct read. Phase P3 expanded the credit list to four specific verified contributions, each citing the exact SOURCE A line. This makes the "test case, not target" framing more credible — it shows the audit's awareness of Maren's positive contributions, not just her errors.

**Acceptance.** A reader reaching the end of the Preface understands that Maren is treated as a test case for the audit method, not a target; the manuscript explicitly credits four specific Maren contributions; the audit posture is repair-not-dismissal.

---

## Patch P-5 — A1–A3 in Abstract (Plan H.6)

**v1 line.** 51.

**Current text:**

> Consequently, $F[q] \ge -\ln p(y\mid m)$ — the variational free energy upper-bounds surprisal (negative log evidence), and the corresponding ELBO $\mathcal{L}(q) = -F[q]$ lower-bounds log evidence, with equality iff $q = p(\eta\mid y, m)$ a.e.

**Replacement text:**

> Consequently, $F[q] \ge -\ln p(y\mid m)$ — the variational free energy upper-bounds surprisal (negative log evidence), and the corresponding ELBO $\mathcal{L}(q) = -F[q]$ lower-bounds log evidence, with equality iff $q = p(\eta\mid y, m)$ almost everywhere, under the assumptions (A1)–(A3) developed in Chapter 2 (model-evidence positivity, common support, expectation-finiteness).

**Acceptance.** Abstract states the assumptions parenthetically without expanding the proof.

---

## Patch P-6 — Confidence reconciliation note (Plan H.11)

**v1 line.** 61.

**Current text:**

> **Overall confidence.** 8 / 10 on the mathematical core (reasoning in §C5 of Appendix C and §11 of the conclusion). The 2-point gap reflects residual uncertainty about source-extraction artifacts, the un-inspected primary text of Beal (2003), and dynamical/NESS claims we did not re-derive.

**Replacement text:**

> **Overall confidence.** 8 / 10 on the mathematical core. (The prior audit-session deliverable [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) reported 8.5 / 10; the half-point reduction in this manuscript reflects the additional uncertainty introduced by the drafting session — a draft can introduce wording that is more confident than the underlying audit, and we want the overall confidence to reflect the *combination* of audit + drafting rather than the audit alone. The audit-of-audit completed in Phase P0 of the [Audit Remediation Plan](Audit_Remediation_Plan.md) re-confirms 8.5/10 on the core but identifies two reproducibility issues in the original tests (corrected in this v2 draft) that justify the 8/10 here.) The 2-point gap reflects: (i) source-extraction artifacts; (ii) un-inspected primary text of Beal (2003), Friston (2013, 2015), Sengupta-Stemmler-Friston (2013), Kikuchi & Brush (1967), and Blei-Kucukelbir-McAuliffe (2017); (iii) NESS / dynamical claims we did not re-derive; (iv) the corrected reproducibility issues in Tests 6 and 8 (now resolved); (v) residual AI-introduced error risk.

**Acceptance.** Reader understands why audit and drafting confidences differ; the half-point gap is no longer mysterious.

---

## Patch P-7 — SOURCE C model identity hedging (Plan §2.7, H.2)

**v1 line.** 934.

**Current text:**

> **SOURCE C.** Prior independent peer review by GPT-class AI ("Ai Onna GPT5.4 Pro.docx"; extracted to `source_c_extracted.txt`). Used as a hypothesis-generator and independent verification anchor; not treated as authority.

**Replacement text:**

> **SOURCE C.** A prior peer review produced by a GPT-class large language model. The originating file is named `Ai Onna GPT5.4 Pro.docx` (extracted to `source_c_extracted.txt`); the specific model variant is taken on the organic operator's report and was not independently verified by this manuscript's audit chain. Used as a hypothesis-generator and independent verification anchor; not treated as authority.

**Acceptance.** No factual assertion of "GPT 5.4 Pro" as a specific model variant; user-supplied label is identified as such.

---

## Patch P-8 — File rename reference in Appendix E.1 (Plan §2.1)

**v1 line.** 932.

**Current text:**

> **SOURCE A.** Maren, A. J. (2024). *Derivation of the Variational Bayes Equations.* Themesis Technical Report TR-2019-01v6. Read as text-extracted PDF (`1906.08804v6.pdf.txt`, ~130 KB, ~640 lines). Some equation glyphs garbled in extraction; we marked partially uncheckable equations as such.

**Replacement text:**

> **SOURCE A.** Maren, A. J. (2024). *Derivation of the Variational Bayes Equations.* Themesis Technical Report TR-2019-01v6. Read as text-extracted PDF (file `Maren_TR-2019-01v6.txt`, 130,005 bytes, 643 lines, SHA-256 `b68b852985a5b16742a81e6de2bf161e239e6bd761dca5bae22de6160379dae1`). The file was originally named `1906.08804v6.pdf.txt`; the prior name implied an arXiv submission that does not in fact correspond to Maren TR-2019-01v6 in the public arXiv index, so a clean copy under the present name was made in Phase P1 of the [Audit Remediation Plan](Audit_Remediation_Plan.md), with the original retained for historical reference continuity. Some equation glyphs garbled in extraction; we marked partially uncheckable equations as such.

**Acceptance.** v2 references the clean name; reader understands the rename and its rationale.

---

## Patch P-9 — Two-session AI provenance disclosure (Plan §4.1, G.1)

**v1 lines.** 947–953 (Appendix E.2 first paragraphs).

**Current text:**

> ### E.2 AI assistance and roles
>
> This draft was produced under the discipline specified in CLAUDE.md, with AI assistance contributing:
>
> - **Drafting.** Section-level prose drafted by an Anthropic Claude model under the Claude Code interface, with the project CLAUDE.md and the ORCHESTRATE prompt as governing instructions. …

**Replacement text:**

> ### E.2 AI assistance and roles
>
> This draft was produced by a chain of AI sessions under the discipline specified in CLAUDE.md. The chain is:
>
> 1. **Audit Session** (origin session ID `6cb1df80-3db9-4ff5-9325-264571d2b6c7`, prior to v1 draft date). The source corpus was read in full; ten numerical stress tests were specified and executed in Python; the audit deliverable [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) was produced. This session is the substantive origin of the audit findings reproduced in Chapters 9–10 and Appendix D of this manuscript.
>
> 2. **Drafting Session** (this manuscript's original drafting). The audit findings were reorganized into the chapter structure of this manuscript; the front matter and ethical posture were drafted. No new mathematical findings were introduced in this session.
>
> 3. **Audit-of-Audit Session** (post-v1, captured in [`Manuscript_Draft_v1_Audit.md`](Manuscript_Draft_v1_Audit.md)). v1 was audited for source-provenance fidelity, equation-by-equation correctness, and numerical reproducibility. Two reproducibility issues were identified in v1's Tests 6 and 8 and have been corrected in this v2 draft.
>
> 4. **P0–P1 Remediation Sessions** (captured in [`Audit_Remediation_Plan.md`](Audit_Remediation_Plan.md), [`manuscript-v2-reproducibility/`](manuscript-v2-reproducibility/), [`Phase_P1_OODA.md`](Phase_P1_OODA.md), [`Provenance_Map.csv`](Provenance_Map.csv), and the present manuscript). The remediation plan was specified, the reproducibility repository was built and verified end-to-end (73 of 73 pytest tests pass; bit-identical output to the reference under pinned environment), provenance was upgraded, and Layer 2 (human-required) inspection specs were documented.
>
> All four sessions used Anthropic Claude. AI-generated content remains provisional until reviewed by qualified human experts. The Audit-of-Audit session was specifically tasked with not trusting prior outputs and re-verifying them by independent re-execution; that is why two errors in the prior audit-session output (a Test 6 arithmetic error producing 3.456 instead of 3.4780; a Test 8 residual bound `<6e-17` that does not reproduce under standard numpy double-precision) were caught.

**Acceptance.** Reader can identify which session contributed which artifact; the audit chain is fully transparent.

---

## Patch P-10 — Peer-review framing (Plan §4.2, G.2)

**v1 line.** 974.

**Current text:**

> - This draft has *not* been peer-reviewed by qualified human experts. Publication, if pursued, must follow such review.

**Replacement text:**

> - This draft has *not* been peer-reviewed by qualified human experts. Publication, if pursued, must follow such review. Two AI-conducted reviews exist in the corpus: (a) the prior Claude audit captured in [`Revision Research and Test Notes.txt`](Revision%20Research%20and%20Test%20Notes.txt) and the Audit-of-Audit captured in [`Manuscript_Draft_v1_Audit.md`](Manuscript_Draft_v1_Audit.md); and (b) the SOURCE C review by a GPT-class model (file `Ai Onna GPT5.4 Pro.docx`, extracted to `source_c_extracted.txt`). Both AI-review chains substantively concur with this manuscript's central findings, but neither is a substitute for human expert peer review.

**Acceptance.** v2 acknowledges both AI-review chains and clearly states neither replaces human peer review.

---

## Patch P-11 — Pre-publication AI disclosure template (Plan §4.3, H.16)

**v1 location.** Insert after Transparency Statement (after line 25 in v1).

**Insertion (refined in Phase P3 with cross-reference to Pre_Publication_Checklist):**

> ### AI authorship and contribution disclosure (venue-agnostic template)
>
> The substantive drafting, mathematical derivation, numerical stress-test execution, audit, and adversarial review of this manuscript were conducted by Anthropic Claude (Opus 4.7) over four distinct sessions, all initiated and directed by the organic operator Michael Polzin. Claude is acknowledged as an AI co-contributor under whatever venue-specific disclosure standard applies to the publication channel chosen. **This disclosure must be updated to match the specific venue's required form at the time of submission.** A detailed venue-by-venue compliance checklist is in [Pre_Publication_Checklist.md](Pre_Publication_Checklist.md). Summary of venue-specific actions:
>
> - **Amazon KDP**: review the KDP Help page on AI-generated content (current as of submission date); update front-matter AI disclosure as required.
> - **arXiv**: complete the AI-tools field on submission; ensure the contributor list reflects Anthropic's recommended attribution for AI-augmented work.
> - **Peer-reviewed journal**: follow the journal's AI-authorship policy (most major journals require disclosure but do not allow AI as a listed author).
> - **OSF / Zenodo / institutional repository**: typically minimal AI disclosure required, but follow good-citizen norms.
>
> The four AI sessions and their specific contributions are itemized in Appendix E.2 (per Patch P-9). The complete provenance trail — from prior audit through Phase P0 (reproducibility), Phase P1 (provenance + file rename), Phase P2 (mathematical refinements), and Phase P3 (title and framing) — is captured in [Phase_P1_OODA.md](Phase_P1_OODA.md), [Phase_P2_OODA.md](Phase_P2_OODA.md), and [Phase_P3_OODA.md](Phase_P3_OODA.md).
>
> **Conflict of interest.** The organic operator (Michael Polzin) reports no commercial or financial relationships that could be construed as a potential conflict of interest. The AI operator (Anthropic Claude) was used under standard subscription terms; no Anthropic-side review of this manuscript was conducted prior to publication.

**P3 refinement note.** The original P1 patch listed venue-specific actions in summary form. Phase P3 added (a) cross-reference to a new `Pre_Publication_Checklist.md` with venue-by-venue compliance gates; and (b) explicit reference to the four-phase OODA worksheets as the audit-trail anchor.

**Acceptance.** Pre-submission checklist exists; venue-specific actions are explicit; provenance to all four phases is documented.

---

## Patch P-12 — Add Complexity-Accuracy form to Chapter 2 (Plan §3.1, B.1)

**v1 location.** Insert after line 254 (after the (★★) box in Chapter 2.2).

**Insertion:**

> **Form 3 (Complexity minus Accuracy).** A second application of Bayes — splitting the joint via the prior-likelihood factorization $\ln p(y, \eta \mid m) = \ln p(y \mid \eta, m) + \ln p(\eta \mid m)$ rather than the posterior-evidence factorization — gives
> $$
> F[q] \;=\; D_\mathrm{KL}\!\bigl(q(\eta\mid r) \,\big\|\, p(\eta\mid m)\bigr) \;-\; \mathbb{E}_q[\ln p(y\mid \eta, m)]. \tag{$\star{\star}{\star}$}
> $$
> The first term is the *complexity* of $q$ (its KL divergence from the prior over hidden states); the second is the negative *accuracy* (expected log-likelihood) of $q$. This decomposition is the source of the Bayesian-Occam intuition: minimizing $F[q]$ trades complexity for accuracy, with simpler beliefs preferred when the data do not require otherwise. Parr/Pezzulo/Friston 2022 (corpus lines 1316–1317) labels these the "Complexity" and "Accuracy" terms of Eqn 2.5 explicitly. (Class A, derivation; Class B, SOURCE B labels the decomposition.)

**Acceptance.** v2 Chapter 2 contains all three forms of Eqn 2.5 (Energy-Entropy, Complexity-Accuracy, Divergence-Evidence).

---

## Patch P-13 — A3 expectation-finiteness tightening (Plan §3.2, D.5.a)

**v1 line.** 223 (Chapter 2.1) and 769 (Appendix A.5).

**Current text (line 223):**

> - (A3) $\ln p(y, \eta \mid m)$ and $\ln q(\eta \mid r)$ are $q$-integrable.

**Replacement text (refined in Phase P2 to cover all THREE forms of Eqn 2.5):**

> - (A3) The expectations $\mathbb{E}_q\bigl[\ln p(y, \eta \mid m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(\eta \mid y, m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(\eta \mid m)\bigr]$, $\mathbb{E}_q\bigl[\ln p(y \mid \eta, m)\bigr]$, and $\mathbb{E}_q\bigl[\ln q(\eta \mid r)\bigr]$ are all finite. This restricts the variational family $\mathcal{Q}$ to densities under which all relevant log-likelihoods (joint, posterior, prior, and conditional) are integrable in absolute value. The five terms cover Form 1 (joint and entropy), Form 2 (posterior and entropy), and Form 3 (prior, conditional likelihood, and entropy) of the master identity.

**P2 refinement note.** The original P1 patch listed only three expectations (joint, posterior, q). Phase P2's verification of patch P-12 (Complexity-Accuracy Form 3) revealed that Form 3's terms — $\mathbb{E}_q[\ln p(\eta \mid m)]$ (the prior) and $\mathbb{E}_q[\ln p(y \mid \eta, m)]$ (the conditional likelihood) — are not implied by the joint-expectation finiteness in general. The refined A3 explicitly covers all five log-densities used by any of the three forms. (Cross-reference: [Phase_P2_OODA.md](Phase_P2_OODA.md) §P2-OODA-4.)

**Acceptance.** A measure-theoretically literate reviewer can verify all integrals in the proofs of Lemmas 1–2 *and* in the derivation of Form 3 are well-defined under the refined A3.

---

## Patch P-14 — m-index discipline declaration (Plan §3.3, D.2.a)

**v1 location.** Insert as a footnote at line 207 (Chapter 2.1 setup).

**Insertion:**

> *Footnote on notation: throughout this manuscript, the model index $m$ is suppressed in displayed equations once it has been introduced. Where $m$ appears explicitly, it is to emphasize model dependence; where it is absent, it is implicit. This convention follows Parr-Pezzulo-Friston (2022) Section 3.2 (corpus line 2421), which explicitly contrasts the explicit-$m$ Eqn 3.2 with the implicit-$m$ Eqn 2.5 of the same book.*

**Acceptance.** Reader is not surprised when $m$ appears in some equations and not others.

---

## Patch P-15 — Bound table sign-flip footnote (Plan §3.4, D.6.a)

**v1 location.** Insert after line 308 (after the bound hierarchy table in Chapter 3.1).

**Insertion:**

> *Footnote: rows 1 and 2 of the table are sign-flipped restatements of one another. Negating both sides of $\mathcal{L}(q) \le \ln p(y \mid m)$ yields $-\mathcal{L}(q) \ge -\ln p(y \mid m)$, and identifying $-\mathcal{L}(q) = F[q]$ (row 3) and $-\ln p(y \mid m) = L(y)$ (the surprisal) gives $F[q] \ge L(y)$. The two rows convey the same content in two conventions — Beal/Blei/ML versus Friston/active-inference.*

**Acceptance.** Reader following the footnote derives row 2 from row 1 in three lines.

---

## Patch P-16 — q/p slip propagation note (Plan §3.5, F.6.a)

**v1 line.** 377.

**Current text:**

> The manuscript we audited (Maren TR-2019-01v6) makes this slip in a parenthetical near its central equation; the surrounding algebra is intact, and the slip is repairable in one sentence. We treat this as a wording issue at the interpretive layer, not as a failure of the underlying mathematics.

**Replacement text:**

> The manuscript we audited (Maren TR-2019-01v6) makes this slip in a parenthetical near its central equation; the surrounding algebra is intact, and the *local* slip is repairable in one sentence. However, the role-reversal *propagates* — through Section 6.2's bound-direction misnomer (E2), Section 4.3's posterior/process conflation (E6), and Section 8.1's "each separately come to free energy minima" wording (E13). A complete repair therefore touches the parenthetical at line 34 of SOURCE A, the introductory wording of Section 6.2, the "actual distribution of the external system" phrasing at line 132, and Section 8.1's NESS-licensed claim. Each is locally one sentence; collectively, four sentences. We treat these as wording issues at the interpretive layer, not failures of the underlying mathematics.

**Acceptance.** A reader understands the slip propagates to four locations and not just one.

---

## Patch P-17 — r vs μ convention footnote (Plan §3.6, F.3.a)

**v1 line.** 192 (Chapter 1.4).

**Insertion (footnote):**

> *Footnote: Some Friston-style treatments distinguish $\tilde r$ (the internal-state variable) from $\mu$ (the sufficient statistic of $q$ — i.e., the parameter that the variational density is parameterized by). For the purposes of this manuscript we use $\tilde r$ in both senses; this is consistent with the simplification in SOURCE A but loses the variable/parameter distinction. A reviewer working from a treatment that maintains the distinction (e.g., the gradient-descent / sufficient-statistics derivation in Friston 2013) should read $\tilde r$ as "internal state, treated as parameter of $q$" throughout this manuscript.*

**Acceptance.** A Friston-2013-literate reviewer understands the convention used.

---

## Patch P-18 — Parameter-learning acknowledgment (Plan §3.7, F.4.a)

**v1 location.** Insert after line 293 (end of Chapter 2.6).

**Insertion (refined in Phase P2 to flag secondary citations):**

> - It does not develop the parameter-learning aspect of variational Bayes — i.e., the joint optimization of $F[q]$ over $q$ *and* over model parameters $\theta$ that is the core use case of Beal (2003). In the active-inference reading we adopt, $m$ (the model) is treated as fixed throughout this manuscript; the agent's task is recognition (optimizing $q$), not parameter estimation. A treatment that develops the EM-style alternation between $q$-optimization and $\theta$-optimization is in Beal (2003) §2.2.2 ff. and Blei et al. (2017) §2.3. (Class C — outside scope; the citations to Beal and Blei are *secondary* — both primary sources await Layer 2 first-hand verification per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1 (Beal) and §7 (Blei).)

**P2 refinement note.** The P1 patch omitted the secondary-citation flag for Beal and Blei. Both sources are not in the working directory; v1's reliance on them is mediated through standard knowledge of the literature and through SOURCE A's quotations. This is fine for Class C scope, but a reader from a stricter primary-source culture deserves the explicit flag.

**Acceptance.** No claim in v2 implicitly invokes $\theta$-optimization without flagging it; the secondary-citation status of Beal and Blei is explicit.

---

## Patch P-19 — CI notation footnote (Plan §3.8, F.8.b)

**v1 line.** 421 (Chapter 6.1, after the displayed Markov-blanket equation).

**Insertion (footnote):**

> *Footnote: We use the standard probability-theory notation $\perp\!\!\!\perp$ ('double tack') for conditional independence. SOURCE B Box 3.1 (corpus line 1938) writes the same relation with a single tack $\perp$; the meaning is identical. We adopt the double-tack convention for its broader recognition in the variational-inference and statistics literature.*

**Acceptance.** A reader noticing the discrepancy is reassured.

---

## Patch P-20 — Add Appendix C.0 (Reproducibility environment) (Plan §1.1)

**v1 location.** Insert before Appendix C.1 (around line 805 in v1).

**Insertion:**

> ### C.0 Reproducibility environment
>
> All numerical results in Appendix C have been re-executed in Phase P0 of the [Audit Remediation Plan](Audit_Remediation_Plan.md) under a pinned environment to guarantee bit-identical output across platforms. The companion repository [`manuscript-v2-reproducibility/`](manuscript-v2-reproducibility/) provides:
>
> - `audit_tests_v2.py` — main test script using only the Python standard library (no external dependencies; no RNG; closed-form analytics where possible).
> - `tests/test_*.py` — per-test pytest harness (73 individual assertions across 10 tests).
> - `requirements.txt` — pinned dependencies (numpy ≥ 1.26 and pytest ≥ 7.0 only for the pytest harness).
> - `Dockerfile` — fully reproducible execution environment based on `python:3.12.10-slim`.
> - `.github/workflows/ci.yml` — continuous-integration on a 3-OS × 3-Python matrix (9 cells).
> - `reference_output.txt` — bit-identical expected output of `audit_tests_v2.py`.
>
> Acceptance test: `python audit_tests_v2.py > out.txt && diff out.txt reference_output.txt` produces zero output on Python 3.11, 3.12, 3.13 across Linux, Windows, macOS. CI verifies this on every push.
>
> Two reproducibility hygiene issues were corrected from v1's prior tests:
> - **Test 6**: v1 used `np.random.binomial(1, 0.7, 5)` with seed 42 and reported iid surprisal `3.456`; the value `3.456` was an arithmetic error not caught in v1. v2 uses an explicit data vector $(0,1,1,1,0)$ with no RNG; the correct value is `3.4780`.
> - **Test 8**: v1 reported max residual `<6 × 10⁻¹⁷`; standard IEEE 754 double-precision yields `1.11 × 10⁻¹⁶ = 2⁻⁵³` (one machine epsilon). v2 uses the bound `< 5 × 10⁻¹⁶` (4-eps safety margin).

**Acceptance.** Reader knows where the reproducibility repository is, what it guarantees, and what was fixed.

---

## Patch P-21 — Update Test 6 (Plan §1.2, H.3)

**v1 location.** Chapter 9.6 (line 575) and Appendix C.6 (line 867).

**Replacement (Chapter 9.6):**

> ### 9.6 Test 6 — $L(s, a, r)$ expansion
>
> *Five iid Bernoulli observations with $p = 0.7$, taken as the explicit data vector $y = (0, 1, 1, 1, 0)$ (no RNG; data supplied directly to remove RNG-version dependencies).* The valid iid surprisal is $-\sum_i \ln p(y_i) = -[2\ln 0.3 + 3\ln 0.7] = 3.4780$ nats; the literal $-I \cdot \ln p(y) = -5\ln(0.69) = 1.8553$ nats coincides only when all $y_i$ are equal. **Result.** A literal $-\sum_{i=1}^I \ln p(s, a, r)$ expansion (repeated identical term) is incoherent without an iid factorization with distinct data indices. (Class A.)

**Replacement (Appendix C.6):** Update both numbers (`3.456` → `3.4780`) and the framing (no RNG; explicit data vector).

**Acceptance.** v2's Test 6 reproduces deterministically with the explicit data vector; cited number is `3.4780`.

---

## Patch P-22 — Update Test 8 residual bound (Plan §1.3, H.4)

**v1 location.** Chapter 6.4 (line 453) and Appendix C.8 (lines 877–881).

**Replacement (Chapter 6.4):**

> ### 6.4 Numerical anchor
>
> In Appendix C (Test 8), we construct a small chain in which $\eta \to s \to r$, $r \to a$, with $a$ deterministically determined by $r$ alone. We check the CI factorization $p(\eta, r \mid s, a) \stackrel{?}{=} p(\eta \mid s, a)\, p(r \mid s, a)$ across all blanket settings; the residual is **of order machine epsilon ($\sim 10^{-16}$ in IEEE 754 double precision)**, confirming the conditional independence factorization to floating-point precision. (Class A; reproducible.)

**Replacement (Appendix C.8):** Update the bound from `< 6 × 10⁻¹⁷` to `< 5 × 10⁻¹⁶` (4-eps safety margin).

**Acceptance.** v2's Test 8 specification matches what reproduces under standard numpy.

---

## Patch P-23 — Update Test 10 framing (Plan §1.4, H.5)

**v1 location.** Chapter 9.10 (line 591) and Appendix C.10 (line 889).

**Replacement (Chapter 9.10):**

> ### 9.10 Demonstration 10 — CVM bridge
>
> *(This is a demonstration, not a numerical theorem.)* Computed independently, a generic 2-site Bethe / Kikuchi cluster-expansion free energy on an Ising-like grid and the active-inference $F[q]$ for a toy two-state model give numerically distinct values at analogous "configurations." They are different variational principles on different objects until a bridge is supplied. (Class A as a demonstration that structural similarity is not enough; Class D as a description of what would be needed.) **A formal proof (or refutation) of any $F_\mathrm{CVM} \leftrightarrow F[q]$ bridge requires the four-item checklist of Chapter 8.2 and is not attempted in this manuscript.**

**Acceptance.** v2's Test 10 / Demonstration 10 is properly labeled as illustrative.

---

## Patch P-24 — Split E2 into E2a and E2b (Plan §3.9)

**v1 location.** Appendix D Error Register, E2 row.

**Replacement (refined in Phase P2 with aggravating-context finding):** Replace E2 row with two rows:

| ID | Location | Category | Severity | Description | Repair | Conf |
|----|----------|----------|----------|-------------|--------|------|
| E2a | Sec 6.2 line 319 | bound direction | Serious | "the free energy for the model is a lower bound for the free energy of the external system" reverses the canonical bound. **Aggravating context:** Maren's *own* line 318 explicitly states "we reverse the signs on all of the terms on the right-hand-side of Eqn. 34, as well as the direction of the inequality" when shifting from Beal to Friston notation; line 319 immediately applies the *un-reversed* (Beal) direction. The error is therefore not a missed convention but a contradiction with the immediately preceding sentence. | Replace with $F[q] \ge -\ln p(y\mid m)$ form, consistent with Maren's own line 318 statement | 5/5 |
| E2b | Sec 6.2 line 319 | misnomer | Moderate | $L(\tilde s, \tilde a, \tilde r) = -\ln p(\tilde s, \tilde a, \tilde r)$ called "the free energy of the external system" — but $L$ is surprisal (Maren's own Eqn 17), and the external system has not been shown to have a free-energy characterization in the manuscript | Replace "free energy of the external system" with "surprisal (negative log evidence under the generative model)" | 4/5 |

**P2 refinement note.** Reading SOURCE A lines 315–319 closely revealed that line 318 *acknowledges* the inequality reversal that line 319 *fails to apply*. This makes E2a more striking than the P1 patch implied, and worth noting as aggravating context.

**Acceptance.** Two distinct defects are tracked separately; E2a's aggravating context is captured.

---

## Patch P-25 — Refine E7 wording (Plan §3.10, C.7.a)

**v1 location.** Appendix D Error Register, E7 row.

**Replacement description column (refined in Phase P2 with three-locus enumeration and category-error finding):**

> Throughout Sections 4.1, 4.3, and 5.2, the variational density $q$ is treated alternately as a *functional* (the standard reading: $q \in \mathcal{Q}$, and operations on $q$ are operations on the full distribution) and as a *distribution-evaluated-at-equilibrium* (a non-standard reading: $q$ becomes a point quantity once at free-energy minimum). Three specific symptoms verified by direct read of SOURCE A in Phase P2:
>
> - **SOURCE A:134** — *"q corresponds to the equilibrium free energy of the external system"*: conflates $q$ (a distribution) with $F[q]$ (a number) and with "free energy of the external system" (an undefined quantity in the manuscript). Three quantities collapsed into one symbol.
> - **SOURCE A:141** — *"there will not be a sum over all possible values of some distribution over $i$; there will instead be a single probability distribution"*: removing the sum over states is mathematically muddled — the sum is precisely what makes the object a distribution.
> - **SOURCE A:195–197** — *"we may take $L(\tilde s, \tilde a, \tilde r)$ to be the actual distribution of the representational system"*: a category error. $L$ is a scalar (surprisal, by Maren's own Eqn 17), not a distribution. The misnaming runs in parallel with E2b's "free energy of the external system" misnomer at line 319.
>
> Repair: treat $q$ and $p$ as functionals throughout; reserve "value of $F[q]$" or "value at equilibrium" for the scalar quantity; do not apply the word "distribution" to $L$.

**P2 refinement note.** The original P1 patch text already noted oscillation but did not enumerate the three loci with their *specific* symptoms. Locus 3 in particular contains a category error (scalar called distribution) that strengthens the case for revision. Cross-reference: [Phase_P2_OODA.md](Phase_P2_OODA.md) §P2-OODA-12.

**Acceptance.** E7 captures the broader oscillation with three specific instances and their repairs.

---

## Patch P-26 — E8 Layer 2 acceptance gate (Plan §3.11, C.8.a)

**v1 location.** Append to Appendix D below E8.

**Insertion (refined in Phase P2 with explicit Layer 2 cross-reference):**

> **E8 acceptance gate (Layer 2).** The PDF→text-extraction-vs-original ambiguity for Eqn B-1 must be settled before publication of any v3 that depends on this finding. Required action: obtain Maren's original PDF (or LaTeX source) and inspect Eqn B-1 directly. **If the original has the minus sign**, downgrade severity to Minor (typesetting/extraction artifact) and remove from the publishable error list. **If the original lacks the minus sign**, upgrade confidence to 5/5 and retain as Serious. **The full inspection protocol — including reviewer report template, what to capture for Eqns B-1 through B-17, and what to capture for the other extraction-garbled equations (Eqn 5 at line 130; Eqns 9, 10, 12, 14 at lines 155–172) — is in [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §6.** A single qualified reviewer with access to the original PDF can settle E8 in 1–2 hours.

**P2 refinement note.** The P1 patch said "see Layer2_Inspection_Specs.md §6 for the inspection protocol" without making clear that §6 *also* settles the other extraction-garbled equations (Eqns 5, 9, 10, 12, 14). The refined text makes the bundled inspection scope explicit.

**Acceptance.** A future Layer 2 reviewer with the original PDF can settle E8 *and* the other extraction-garbled equations in a single inspection pass.

---

## Patch P-27 — Severity-rating rationale (Plan §5, H.9)

**v1 location.** Insert before the Appendix D table at line 901.

**Insertion:**

> **Note on severity ratings.** This register uses the five-level scale of [CLAUDE.md](.claude/CLAUDE.md) (None / Minor / Moderate / Serious / Fatal). 'Serious' is reserved for issues that block publication of the manuscript as a *derivation paper* if uncorrected — i.e., issues that produce mathematical incorrectness in a load-bearing claim. 'Moderate' is reserved for issues that mislead but do not falsify, or issues whose correction is wording rather than mathematics. Reasonable adjudicators may move individual items between Serious and Moderate; we have rated conservatively (favor 'Serious' when in doubt) because the manuscript will be reviewed by experts who set a high bar.

**Acceptance.** Reviewer disputing a rating has a stated standard to argue against.

---

## Patch summary

| Patch | v1 location | Plan reference | Type | Layer |
|-------|-------------|----------------|------|-------|
| P-1 | Title | H.12 | replace | 1 |
| P-2 | Line 11 | H.12 | remove | 1 |
| P-3 | Front matter | H.13 | replace | 1 |
| P-4 | After line 92 | H.15 | insert | 1 |
| P-5 | Line 51 | H.6 | replace | 1 |
| P-6 | Line 61 | H.11 | replace | 1 |
| P-7 | Line 934 | §2.7, H.2 | replace | 1 |
| P-8 | Line 932 | §2.1 | replace | 1 |
| P-9 | Lines 947–953 | §4.1, G.1 | replace | 1 |
| P-10 | Line 974 | §4.2, G.2 | replace | 1 |
| P-11 | After line 25 | §4.3, H.16 | insert | 1 |
| P-12 | After line 254 | §3.1, B.1 | insert | 1 |
| P-13 | Lines 223, 769 | §3.2, D.5.a | replace | 1 |
| P-14 | Line 207 | §3.3, D.2.a | insert footnote | 1 |
| P-15 | After line 308 | §3.4, D.6.a | insert footnote | 1 |
| P-16 | Line 377 | §3.5, F.6.a | replace | 1 |
| P-17 | Line 192 | §3.6, F.3.a | insert footnote | 1 |
| P-18 | After line 293 | §3.7, F.4.a | insert | 1 |
| P-19 | Line 421 | §3.8, F.8.b | insert footnote | 1 |
| P-20 | Before C.1 | §1.1 | insert | 1 |
| P-21 | Lines 575, 867 | §1.2, H.3 | replace | 1 |
| P-22 | Lines 453, 877 | §1.3, H.4 | replace | 1 |
| P-23 | Lines 591, 889 | §1.4, H.5 | replace | 1 |
| P-24 | Appendix D E2 row | §3.9 | replace | 1 |
| P-25 | Appendix D E7 row | §3.10, C.7.a | replace | 1 |
| P-26 | Appendix D after E8 | §3.11, C.8.a | insert | 1 |
| P-27 | Appendix D before table | §5, H.9 | insert | 1 |

**Total: 27 patches.** All Layer 1. Application is mechanical.

---

## Aggregate acceptance for v2 production (Phase P4)

When v2 is produced, the following must hold:

1. **All 27 patches applied.** v2 differs from v1 in exactly the locations specified.
2. **Provenance map updated.** Each patched v1 line range is updated to v2 line numbers in `Provenance_Map.csv`.
3. **No regressions.** Every Class A claim still re-derives; every Class B claim still has its source line; numerical tests still pass.
4. **Audit-of-v2.** A new audit pass confirms no new defects introduced.
5. **30/30 Layer 1 acceptance items** (see Plan §8.1) check.

— *End of v2 patch specification.*
