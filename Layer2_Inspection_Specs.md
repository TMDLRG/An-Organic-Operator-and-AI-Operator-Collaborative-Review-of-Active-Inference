# Layer 2 Inspection Specifications — Primary-Source Verification Gates

**Phase.** Specifies the **human-required** inspection tasks called for by the [Audit Remediation Plan](Audit_Remediation_Plan.md) §2.2–§2.6, §6.2, and §7. Each task is presented as a checklist a qualified reviewer can execute against the cited primary source and report against.

**Layer.** **2** (human required). The AI audit chain (Phases P0–P3) cannot execute these tasks because the primary sources are not in the working-directory corpus. Layer 2 inspection is what converts secondary citations (Class C — currently mediated through SOURCE A or SOURCE B quotations) into primary citations (Class B — first-hand verified).

**Status.** Specification only. Each task awaits a qualified human reviewer with access to the named source.

**Author.** Claude (Opus 4.7), Phase P1, 2026-04-25.

---

## §1 — Beal (2003) PhD thesis inspection

**Source.**
- Beal, M. J. (2003). *Variational Algorithms for Approximate Bayesian Inference.* PhD thesis, Gatsby Computational Neuroscience Unit, University College London.
- Available publicly: search "Beal 2003 variational thesis PDF" — Gatsby web archive or Beal's personal academic page.

**Why Layer 2.** v1 cites Beal Sect 2.2.1 and Eqns 2.10–2.16, 2.34 as the foundation for the sign-convention bridge between Beal's ELBO and Friston's VFE. The cite is currently mediated through Maren TR-2019-01v6 (which itself quotes Beal). Direct inspection upgrades the cite from secondary (Class C) to primary (Class B).

**Required acquisition.** Obtain a copy of the Beal 2003 PhD thesis PDF.

**Required findings (acceptance checklist).**

| # | What to verify | Where in Beal | Acceptance |
|---|----------------|---------------|------------|
| 1.1 | Beal defines $q_x(x)$ as the variational density over hidden $x$ | Sect 2.2.1, first paragraph | Quote captured verbatim with page number |
| 1.2 | Beal proves $F(q_x, \theta) \le \ln p(y\mid\theta)$ via Jensen's inequality | Eqns 2.12–2.16 | Quote captured; Jensen step explicit |
| 1.3 | Beal's $F(q_x, \theta) = \mathbb{E}_{q_x}[\ln p(x, y\mid \theta)] - \mathbb{E}_{q_x}[\ln q_x(x)]$ | Eqn 2.17 (or equivalent) | Equation captured verbatim |
| 1.4 | Beal Eqn 2.34 explicitly equates $F(q_x, \theta) = -F^{\text{Friston}}$ | Eqn 2.34 (per Maren's cite) | Either confirms or refutes the negation cite in Maren TR:201 |
| 1.5 | Beal Sect 2.2.2 ff. develops EM-style alternation between $q$-optimization and $\theta$-optimization | Sect 2.2.2 | Quote captured to support v2 patch P-18 |

**Reviewer report template:**

```
Beal (2003) Layer 2 inspection report
Reviewer: [name]
Date: [yyyy-mm-dd]
Source acquired: [URL or library reference]

Findings:
1.1: [verbatim Beal text on q_x as variational density, page N]
1.2: [verbatim Eqns 2.12-2.16; Jensen step intact]
1.3: [verbatim Eqn 2.17 or equivalent for F definition]
1.4: [verbatim Eqn 2.34 statement on F sign relation]
1.5: [verbatim Sect 2.2.2 prose on EM alternation]

Verdict: 
  [ ] All Maren-mediated cites of Beal verify against the primary text.
  [ ] [N] discrepancies found; see notes.
```

**Acceptance.** All five required findings produce verbatim quotations with page numbers. The reviewer signs off; v2.md (or v3.md) is updated to cite Beal directly with page references; the corresponding Provenance_Map.csv rows are upgraded from Class C to Class B.

---

## §2 — Friston (2013) "Life as we know it" — NESS argument

**Source.**
- Friston, K. J. (2013). "Life as we know it." *Journal of the Royal Society Interface* 10(86): 20130475. DOI: 10.1098/rsif.2013.0475.
- Available openly via Royal Society Interface.

**Why Layer 2.** v1 Chapter 5.4 unresolved-tension box and Chapter 8 reference Friston (2013) for the non-equilibrium-steady-state (NESS) argument that licenses any "external system minimizes free energy" wording. v1 explicitly defers this argument as Class D / U. Direct inspection either licenses the wording (upgrading to Class B) or confirms the deferral.

**Required acquisition.** PDF or HTML of Friston (2013) at *J. R. Soc. Interface*.

**Required findings (acceptance checklist).**

| # | What to verify | Where in Friston (2013) | Acceptance |
|---|----------------|-------------------------|------------|
| 2.1 | Friston defines a generative process satisfying NESS conditions | Section labeled "Steady state…" or similar | Quote captured |
| 2.2 | Friston's Eqn 2.7 (per Maren's cite at SOURCE A:200, 290) is verified verbatim | Eqn 2.7 of Friston (2013) | Equation captured; matches Maren's transcription |
| 2.3 | The NESS argument relates the agent's $F[q]$ to a process-level quantity | Whichever section establishes this | Quote captured; argument outlined in 1–3 sentences |
| 2.4 | Lemma 2.1 of Friston (2013) (per Maren's cite at SOURCE A:120) is verified | Lemma 2.1 | Statement captured; conditions noted |
| 2.5 | Whether "external system minimizes free energy" wording is *licensed* by the NESS argument or whether it remains a modeling assumption | Whichever section concludes | Reviewer's judgment |

**Reviewer report template:**

```
Friston (2013) NESS Layer 2 inspection report
Reviewer: [name]
Date: [yyyy-mm-dd]

Findings:
2.1: [NESS conditions; quote and page]
2.2: [verbatim Eqn 2.7]
2.3: [NESS argument summary]
2.4: [verbatim Lemma 2.1]
2.5: [reviewer judgment on whether external-FEM language is derived or assumed]

Verdict:
  [ ] NESS argument licenses 'external system minimizes free energy' wording
  [ ] NESS argument is suggestive but does not formally license the wording
  [ ] Wording requires additional assumptions beyond Friston (2013); enumerate
```

**Acceptance.** Reviewer either licenses the wording (v2/v3 retains it with citation) or confirms the deferral (v2/v3 keeps the unresolved-tension box). Either outcome is valid; the inspection's job is to document.

---

## §3 — Friston, Levin, Sengupta, Pezzulo (2015) — Active inference / Markov blankets dynamics

**Source.**
- Friston, K. J., Levin, M., Sengupta, B., Pezzulo, G. (2015). "Knowing one's place: a free-energy approach to pattern regulation." *Journal of the Royal Society Interface* 12(105): 20141383. (Or alternatively the Friston 2015 referenced in SOURCE A reference list — Maren cites a Friston (2015) consistently.)
- Available via *J. R. Soc. Interface*.

**Why Layer 2.** v1 cites Friston (2015) for the Lagrangian formulation, sufficient-statistics, and Eqn 3.1/3.2/3.4 of the active-inference framework that Maren's Eqn 2 is patterned after. Direct inspection verifies Maren's transcriptions and the citation context.

**Required findings.**

| # | What to verify | Where in Friston (2015) | Acceptance |
|---|----------------|-------------------------|------------|
| 3.1 | Eqns 3.1, 3.2, 3.4 (the active-inference equations Maren references) | as cited | Equations captured verbatim; match Maren's transcriptions |
| 3.2 | Lemma 3.1 (per Maren's cite at SOURCE A:207) | as cited | Lemma statement captured |
| 3.3 | The variable $L(s, a, r) = -\ln p(s, a, r)$ definition and whether $L$ has a sum or single form in the source | wherever defined | Resolves Maren's Eqn 13 vs. Eqn 17 ambiguity |

**Reviewer report:** parallel structure to §1, §2.

---

## §4 — Sengupta, Stemmler, Friston (2013) — Helmholtz free energy quote

**Source.**
- Sengupta, B., Stemmler, M., Friston, K. J. (2013). "Information and efficiency in the nervous system — a synthesis." *PLoS Computational Biology* 9(7): e1003157. (Or alternatively Sengupta et al.'s 2013 paper titled with "Helmholtz" — verify via Maren's reference list.)

**Why Layer 2.** v1 Chapter 7.2(a) reproduces SOURCE A's quotation of Sengupta et al. (2013): *"variational free energy is not the Helmholtz free energy… it is a functional of a probability distribution over hidden (fictive) states encoded by internal states $q(y\mid m)$, not the probability distribution over the (physical) internal states. This is why variational free energy pertains to information about hidden states that are represented, not the internal states that represent them."* This quote is currently second-hand (mediated through Maren).

**Required findings.**

| # | What to verify | Where in Sengupta et al. (2013) | Acceptance |
|---|----------------|--------------------------------|------------|
| 4.1 | The exact quoted text appears verbatim in the cited paper | as cited | Page number, section, quotation match |
| 4.2 | The Lemma on complexity minimization quoted by Maren at SOURCE A:72 | as cited | Lemma captured; conditions noted |
| 4.3 | The internal-energy definition $U(t) = -\ln p(s(t), x(t)\mid m)$ quoted by Maren at SOURCE A:68 | as cited | Definition captured |

**Reviewer report:** parallel structure.

**Implication.** Verifying the quote upgrades v1's Chapter 7.2 cite from Class C (via Maren) to Class B (direct).

---

## §5 — Kikuchi & Brush (1967) — Cluster Variation Method

**Source.**
- Kikuchi, R. (1951). "A Theory of Cooperative Phenomena." *Physical Review* 81(6): 988–1003.
- Kikuchi, R., Brush, S. G. (1967). "Improvement of the Cluster-Variation Method." *Journal of Chemical Physics* 47(1): 195–203.

**Why Layer 2.** v1 Chapter 8 cites Kikuchi & Brush for the cluster-variation method's structure (single-site, NN-pair $y_i$, NNN-pair $w_i$, triplet $z_i$ configuration variables, degeneracy weights). Direct inspection verifies the Kikuchi formula and its assumptions. This is also relevant to the Test 10 / Demonstration 10 in `audit_tests_v2.py`, which uses a *generic* Bethe cluster expansion rather than Maren's specific formulation.

**Required findings.**

| # | What to verify | Where in Kikuchi/Brush | Acceptance |
|---|----------------|------------------------|------------|
| 5.1 | The cluster-entropy approximation: $S \approx \sum_\text{clusters} \mu_c S_c$ with appropriate Möbius coefficients | Kikuchi (1951) main result | Formula captured |
| 5.2 | The 2-D specifics: single-site, NN-pair, NNN-pair, triplet configuration variables | Either Kikuchi or Maren's reformulation | Verify Maren's cite is faithful |
| 5.3 | Analytic equilibrium expression (Maren's Eqn C-2) for $z_3$ in $h$ at $\epsilon_0 = 0$ | Maren's cite traces to Kikuchi & Brush | Equation captured; if traced elsewhere, note the actual primary source |
| 5.4 | Degeneracy weights $\beta_i, \gamma_i$ as cited in Maren's Appendix C | Kikuchi or Brush original | Match or no-match recorded |

**Implication.** Upgrades v1 Chapter 8.1 / Appendix C-1 cites from Class C (via Maren) to Class B.

---

## §6 — Original Maren PDF / LaTeX — Eqn B-1 sign settlement (Audit E8 caveat)

**Source.** Maren TR-2019-01v6 *original PDF or LaTeX source*.

**Why Layer 2.** Audit E8 (Appendix B Eqn B-1 missing minus sign) has a caveat: the PDF→text extraction may have lost a minus sign present in the original. The text-extracted file shows `H = sum_i integral q(x_i) ln p(x_i, y_i | theta)` — no minus sign. If the original has a minus sign, E8 reduces to extraction artifact (Minor); if the original lacks it, E8 stands as Serious.

**Required acquisition.** Obtain Maren's original PDF (Themesis website, or correspondence with Maren, or the arXiv-style source if any).

**Required findings.**

| # | What to verify | Where | Acceptance |
|---|----------------|-------|------------|
| 6.1 | Eqn B-1 in the original PDF | Appendix B, Eqn B-1 | Image or transcription showing whether `H = sum q ln p` or `H = -sum q ln p` |
| 6.2 | Eqns B-2 through B-17: are any other signs lost in extraction? | Appendix B | Spot-check 3–4 equations for similar issues |
| 6.3 | Eqn 5 (KL definition; SOURCE A line 130 garbled) | Section 4.1 | Equation captured if extraction was incomplete |
| 6.4 | Eqn 9, 10, 12, 14 (extraction garbled per audit E15) | Section 4.3 ff. | Equations captured |
| 6.5 | Figures 1–6 not verifiable in text extraction | as cited | Figure captions captured |

**Reviewer report template:**

```
Maren TR-2019-01v6 original-PDF inspection report
Reviewer: [name]
Date: [yyyy-mm-dd]
Source acquired: [URL or correspondence reference]

Findings:
6.1: [Eqn B-1 verbatim from original; minus sign present? yes/no]
6.2: [other Appendix B equations: signs intact or lost in extraction]
6.3: [Eqn 5 from original]
6.4: [Eqns 9, 10, 12, 14 from original]
6.5: [Figure captions]

Verdict on E8:
  [ ] Original has minus sign; E8 downgrades to Minor (extraction artifact)
  [ ] Original lacks minus sign; E8 confirmed Serious (mathematical error)
  [ ] Other; explain
```

**Acceptance.** v2 / v3 Appendix D E8 entry is updated based on the verdict.

---

## §7 — Blei, Kucukelbir, McAuliffe (2017) — VI notation

**Source.**
- Blei, D. M., Kucukelbir, A., McAuliffe, J. D. (2017). "Variational Inference: A Review for Statisticians." *Journal of the American Statistical Association* 112(518): 859–877.

**Why Layer 2.** v1 Appendix B (notation crosswalk) has a column for Blei using $x = x_{1:n}$ (observations) and $z = z_{1:m}$ (latents). v1 also references Blei et al. (2017) §2.3 for parameter learning context (v2 patch P-18). Direct inspection verifies the conventions.

**Required findings.**

| # | What to verify | Where in Blei et al. (2017) | Acceptance |
|---|----------------|----------------------------|------------|
| 7.1 | Convention: $x$ = observations, $z$ = latents | §2 | Verbatim notation block captured |
| 7.2 | Definition of approximate posterior $q(z)$ | §2 | Quote captured |
| 7.3 | ELBO definition and sign convention | §2.2 | Equation captured |
| 7.4 | Coordinate-ascent variational inference (CAVI) treatment | §3 | Section captured |
| 7.5 | Parameter-learning treatment | §2.3 | Section captured for v2 patch P-18 cross-reference |

---

## §8 — Hafner et al. (2020/2022) — Action Perception Divergence (APD)

**Source.**
- Hafner, D., et al. (2020/2022). "Action and Perception as Divergence Minimization."

**Why Layer 2.** v1 mentions Hafner et al. as cited by Maren. Not a load-bearing cite for the audit, but a Layer 2 reviewer with access can verify Maren's APD characterization.

**Required findings.**

| # | What to verify | Acceptance |
|---|----------------|------------|
| 8.1 | The "Action Perception Divergence" claim and its mathematical content | Verbatim definition captured |
| 8.2 | Whether Maren's cite at SOURCE A:12 is faithful | Match or no-match recorded |

---

## §9 — Friston et al. (2024) — Renormalization Group Active Inference

**Source.**
- Friston et al. (2024). "Renormalization-group active inference" or similar title.

**Why Layer 2.** v1 mentions this paper as motivating Maren's recent revisions. Not load-bearing for this manuscript's claims; verification is good citizenship.

**Required findings.** Per parallel structure: verify Maren's cite at SOURCE A:11 and SOURCE A:326 is faithful.

---

## Aggregate Layer 2 acceptance

A v3 release that has cleared Layer 2 must have **all of the following**:

| # | Layer 2 gate | Status template |
|---|--------------|------------------|
| L2-1 | Beal (2003) §2.2.1 inspected; quotes captured; v3 cites primary | reviewer report on file |
| L2-2 | Friston (2013) NESS inspected; verdict on external-FEM wording | reviewer report on file |
| L2-3 | Friston (2015) cited equations verified | reviewer report on file |
| L2-4 | Sengupta-Stemmler-Friston (2013) Helmholtz quote verified verbatim | reviewer report on file |
| L2-5 | Kikuchi & Brush (1967) cluster-entropy formula verified | reviewer report on file |
| L2-6 | Original Maren PDF inspected; E8 verdict | reviewer report on file |
| L2-7 | Blei et al. (2017) notation verified | reviewer report on file |
| L2-8 | (Optional) Hafner et al., Friston et al. (2024) verified | reviewer report on file |
| L2-9 | At least two qualified human experts have reviewed v2 (Plan §7.1) | written reports on file |

Each Layer 2 gate produces a **reviewer report** that is appended to the manuscript repository as a verifiable artifact.

---

## How a Layer 2 reviewer should work

1. **Pick one source** from §1–§9 (whichever the reviewer has access to).
2. **Acquire the document.** Free preprints are preferred; library access acceptable; correspondence with the original author acceptable.
3. **Run through the checklist** for that source.
4. **Capture verbatim quotations** with page numbers / section references / equation numbers.
5. **Fill in the reviewer report template.**
6. **Submit the report** to the manuscript repository (or to the corresponding-author corrigenda channel).
7. **Update the relevant rows** of `Provenance_Map.csv` from Class C to Class B (or to Class U / D if the inspection raises new doubts).
8. **Update the relevant patches** in `v2_patches.md` if the inspection reveals that a v2 wording should be adjusted.

A single qualified reviewer can typically complete one Layer 2 gate in 1–4 hours, depending on document length and prior familiarity. The Beal and Sengupta inspections are the most consequential (load-bearing for the Friston-Beal sign-convention bridge and the thermodynamic-analogy limitation, respectively).

---

## What this Layer 2 work cannot do

- It cannot substitute for *expert mathematical review of the manuscript itself*. That is a separate Layer 2 task (Plan §7.1, two-expert reviewer requirement). A reviewer might verify Beal's text and still find issues with how this manuscript uses Beal.
- It cannot prevent post-publication errata. New extractable defects may be found by readers.
- It cannot guarantee that the primary sources are themselves error-free. Sengupta-Stemmler-Friston (2013) might contain a typo; Beal (2003) might have an unflagged sign-convention quirk in a section not on the checklist.

These limits are inherent to scholarship. They are why the manuscript adopts a humble, correction-friendly posture and offers a corrigenda channel.

— *End of Layer 2 inspection specifications.*
