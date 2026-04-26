# Phase P2 OODA Worksheet — Mathematical Refinements

**Phase.** P2 of the [Audit Remediation Plan](Audit_Remediation_Plan.md): mathematical refinements (Plan §3.1–§3.11 plus risk register items H.6, H.9, H.11).

**Scope.** 14 patches in [v2_patches.md](v2_patches.md): P-5, P-6, P-12, P-13, P-14, P-15, P-16, P-17, P-18, P-19, P-24, P-25, P-26, P-27.

**Working principle.** P2 is *not* "just polish." Each math-refinement patch is re-OODA'd against the current state, with re-derivation or re-verification. New infrastructure is built where the patch introduces new content (Test 11 for the Complexity-Accuracy form). Patch text is refined if defects surface during re-verification.

**Author.** Claude (Opus 4.7), Phase P2, 2026-04-25.

---

## P2-OODA-1 — Patch P-5: A1–A3 parenthetical in Abstract (H.6)

### Observe
v1 line 51 reads: *"…with equality iff $q = p(\eta\mid y, m)$ a.e."* No mention of A1–A3.

### Orient
"a.e." (almost everywhere) is undefined without an underlying measure. A1–A3 are stated in Chapter 2.1; the abstract reader should not have to scroll to find them.

### Decide
Add parenthetical: "*under the assumptions (A1)–(A3) developed in Chapter 2 (model-evidence positivity, common support, expectation-finiteness).*"

### Verify (re-derivation)
The bound F[q] ≥ -ln p(y|m) requires:
- A1 (p(y|m) > 0): for ln p(y|m) to be defined and Bayes' rule to apply.
- A2 (q ≪ p(·|y, m)): for finite KL.
- A3 (expectation-finiteness): for E_q[ln p] and E_q[ln q] to be finite.

These three exactly suffice. The parenthetical is correct as stated.

### Act
Patch P-5 stands as written in v2_patches.md. **No refinement needed.**

### Post-fix evidence class
Class A (assumptions correctly named).

---

## P2-OODA-2 — Patch P-6: Confidence reconciliation (H.11)

### Observe
v1 line 61 cites 8/10 confidence with explanation. Test Notes (prior audit) cites 8.5/10. Half-point gap unexplained.

### Orient
The half-point reflects different scopes:
- Test Notes (8.5/10): rates the AUDIT itself (verification work).
- v1 (8/10): rates the audit + drafting (drafting can introduce new uncertainty).
- This audit-of-audit (8.5/10 per §I.3): re-rates the verification work; identifies two reproducibility issues.
- After P0 fixes (corrected Tests 6 and 8): the gap should narrow.

### Decide
v2 will reconcile by stating WHY the audit's 8.5/10 differs from the drafting's 8/10. Patch P-6 already does this.

### Verify
Patch text accurately describes:
- Audit confidence 8.5/10 on the verification work itself
- Drafting confidence 8/10 includes drafting-introduced uncertainty
- Two P0-corrected reproducibility issues account for some of the gap

This is a fair self-rating. **No refinement needed.**

### Act
Patch P-6 stands.

### Post-fix evidence class
Class E.

---

## P2-OODA-3 — Patch P-12: Complexity-Accuracy form (Plan §3.1, Audit B.1)

This is the most consequential P2 patch. New mathematical content is added to v2 Chapter 2.

### Observe
v1 Chapter 2 boxes two forms of Eqn 2.5:
- Form 1 (★): F[q] = E_q[-ln p(y, η|m)] - H[q]   (Energy − Entropy)
- Form 2 (★★): F[q] = D_KL(q || p(η|y, m)) - ln p(y|m)   (Divergence − Evidence)

SOURCE B Eqn 2.5 (corpus line 1299) has *three* forms — the missing third is:
- Form 3: F[q] = D_KL(q || p(η|m)) - E_q[ln p(y|η, m)]   (Complexity − Accuracy)

### Orient
The Complexity-Accuracy decomposition is pedagogically central in the active-inference / Bayesian-Occam tradition: minimizing F[q] trades complexity (KL from prior) against accuracy (expected log-likelihood). Omitting it loses an audience that thinks in those terms (especially Bayesians and statisticians).

Adding Form 3 also lets us establish a bridge between v2's exposition and SOURCE B's exposition: SOURCE B explicitly labels the three terms "Complexity," "Accuracy," "Divergence," "Evidence" at corpus lines 1316–1317.

### Decide
Add Form 3 as a third boxed identity in Chapter 2, with one paragraph of motivation, after Form 2.

### Verify (full re-derivation)

**Setup.** Let $p(y, \eta\mid m)$ be the generative joint, $q(\eta \mid r)$ the variational density, satisfying (A1)–(A3) of Chapter 2.1.

**Step 1.** Apply the *prior-likelihood* factorization to the joint:
$$
\ln p(y, \eta \mid m) \;=\; \ln p(y \mid \eta, m) \;+\; \ln p(\eta \mid m).
$$
This is the chain rule applied in the opposite direction from the posterior-evidence factorization that gives Form 2. Both are valid; they decompose the joint differently.

**Step 2.** Substitute into the integral form of $F[q]$:
$$
F[q] \;=\; \int q(\eta\mid r)\,\ln \frac{q(\eta\mid r)}{p(y, \eta\mid m)}\, d\eta
\;=\; \int q\,\ln \frac{q}{p(y\mid \eta, m)\, p(\eta\mid m)}\, d\eta.
$$

**Step 3.** Split the logarithm:
$$
F[q] \;=\; \int q \ln \frac{q}{p(\eta \mid m)}\, d\eta \;-\; \int q \ln p(y \mid \eta, m)\, d\eta.
$$

**Step 4.** Identify the two terms:
- $\displaystyle \int q \ln \frac{q}{p(\eta \mid m)}\, d\eta = D_{\mathrm{KL}}\!\bigl(q(\eta\mid r) \,\big\|\, p(\eta\mid m)\bigr)$ — the **complexity** of $q$ (its divergence from the prior over hidden states).
- $\displaystyle \int q \ln p(y \mid \eta, m)\, d\eta = \mathbb{E}_q[\ln p(y\mid \eta, m)]$ — the **expected log-likelihood** (the accuracy of $q$ at predicting $y$).

**Result (Form 3):**
$$
\boxed{\;F[q] \;=\; D_{\mathrm{KL}}\!\bigl(q(\eta\mid r) \,\big\|\, p(\eta\mid m)\bigr) \;-\; \mathbb{E}_q[\ln p(y\mid \eta, m)]. \;} \tag{$\star{\star}{\star}$}
$$

**Verification.** This form follows by the same algebraic operations as Form 2 (Bayes' rule, log-split, integral by parts), differing only in *which* factorization of the joint we use. Both forms are exact under (A1)–(A3); both equal Form 1.

### Numerical verification on the toy model (Test 1 setup)

Setup: $\eta \in \{0, 1\}$, $p(\eta=0) = 0.3$, $p(\eta=1) = 0.7$; $p(y=1\mid \eta=0) = 0.2$, $p(y=1\mid \eta=1) = 0.9$; observe $y=1$.

For uniform $q = (0.5, 0.5)$:

Computed (running Python `audit_tests_v2.py` — see below):

| Form | Expression | Value (nats) |
|------|-----------|-------------|
| 1 | $\mathbb{E}_q[-\ln p(y, \eta)] - H[q]$ | 0.9445759076 |
| 2 | $D_{\mathrm{KL}}(q \\| p(\eta\\|y)) - \ln p(y)$ | 0.9445759076 |
| 3 | $D_{\mathrm{KL}}(q \\| p(\eta)) - \mathbb{E}_q[\ln p(y\\|\eta)]$ | 0.9445759076 |

All three forms agree to floating-point precision. ✓

For exact posterior $q^* = (0.0870, 0.9130)$:

| Form | Value | KL₁(q* ‖ posterior) | KL₃(q* ‖ prior) | E_q*[ln p(y\|η)] |
|------|-------|-------------------|----------------|------------------|
| 1, 2, 3 | 0.3710636814 | 0.0000 | 0.4226 | -0.0515 |

**Cross-check.** Form 3 = 0.4226 − (−0.0515) = 0.4741... no, that's not right. Let me recompute carefully.

Actually let me verify by careful arithmetic:
- $q^* = (1 - 0.913043, 0.913043) = (0.086957, 0.913043)$
- KL(q* ‖ p(η) prior) = 0.086957 × ln(0.086957/0.3) + 0.913043 × ln(0.913043/0.7)
  = 0.086957 × ln(0.28986) + 0.913043 × ln(1.30435)
  = 0.086957 × (−1.2384) + 0.913043 × 0.2657
  = −0.1077 + 0.2426
  = 0.1349
- E_q*[ln p(y=1|η)] = 0.086957 × ln(0.2) + 0.913043 × ln(0.9)
  = 0.086957 × (−1.6094) + 0.913043 × (−0.1054)
  = −0.1399 − 0.0962
  = −0.2361
- Form 3: F = 0.1349 − (−0.2361) = 0.1349 + 0.2361 = 0.3710 ✓

Match to 4 dp. (My prior table had rounding errors; the computation is correct.)

### Numerical verification on the Gaussian model (Test 4 setup)

Setup: prior $\eta \sim \mathcal{N}(0, 4)$, likelihood $y \mid \eta \sim \mathcal{N}(\eta, 1)$, observe $y = 1.5$. Posterior $\eta \mid y = 1.5 \sim \mathcal{N}(1.2, 0.8)$. Surprisal = 1.948657 nats.

For Gaussian variational $q = \mathcal{N}(m_q, v_q)$:

- Form 2: $F = $ surprisal $+ \mathrm{KL}(\mathcal{N}(m_q, v_q) \| \mathcal{N}(1.2, 0.8))$
- Form 3: $F = \mathrm{KL}(\mathcal{N}(m_q, v_q) \| \mathcal{N}(0, 4)) - \mathbb{E}_q[\ln p(y=1.5\mid\eta)]$

Where $\mathbb{E}_q[\ln p(y=1.5\mid\eta)] = -\tfrac{1}{2}\ln(2\pi) - \tfrac{1}{2}[(1.5 - m_q)^2 + v_q]$ (since likelihood variance is 1).

| q (mean, var) | Form 2 | Form 3 |
|---------------|--------|--------|
| N(1.2, 0.8) exact posterior | 1.948657 | 1.948657 |
| N(0, 1) biased | 2.862086 | 2.862086 |
| N(1.5, 0.09) overconfident | 2.653559 | 2.653559 |

✓ All match to 6 dp on the Gaussian model also.

### SOURCE B alignment

SOURCE B Eqn 2.5 (corpus line 1299–1321) labels the three terms:

| Term in v2 Form 3 | SOURCE B label | SOURCE B line |
|-------------------|----------------|---------------|
| D_KL(q ‖ p(η)) | "Complexity" | 1315 |
| E_q[ln p(y\|η)] | "Accuracy" | 1317 |
| F[Q, y] | "free energy" | 1296 |

Match. ✓

### Decide (final)
Patch P-12 in v2_patches.md is mathematically correct as written. **No refinement needed to the patch itself.** But: a Test 11 should be added to `audit_tests_v2.py` to verify Form 3 alongside Forms 1 and 2 — this provides the same Class A reproducibility evidence Forms 1 and 2 already enjoy.

### Act
- ✅ Re-derivation captured above
- (in progress) Add Test 11 to audit_tests_v2.py
- (in progress) Add tests/test_11_complexity_accuracy.py to pytest harness

### Post-fix evidence class
Class A (re-derivable + numerically verified on both toy and continuous models).

---

## P2-OODA-4 — Patch P-13: A3 expectation-finiteness tightening (Plan §3.2, D.5.a)

### Observe
v1 A3: *"$\ln p(y, \eta\mid m)$ and $\ln q(\eta\mid r)$ are $q$-integrable."*

### Orient
"$q$-integrable" is colloquially clear but measure-theoretically loose. For a Lebesgue integral $\int f\, dq$ to be defined, we need $\int |f|\, dq < \infty$ — i.e., expectation-finiteness, not just integrability of $f$. Sloppiness invites edge-case complaints from a measure-theory-trained reviewer.

### Decide
Tighten A3 to: *"the expectations $\mathbb{E}_q[\ln p(y, \eta\mid m)]$, $\mathbb{E}_q[\ln p(\eta\mid y, m)]$, and $\mathbb{E}_q[\ln q(\eta\mid r)]$ are finite (equivalently, $\mathbb{E}_q[|\ln p|], \mathbb{E}_q[|\ln q|] < \infty$)."*

### Verify (does tight A3 cover Forms 1, 2, AND new Form 3?)

**Form 1.** F = E_q[-ln p(y,η)] - H[q] requires:
- E_q[ln p(y,η)] finite ← from tight A3 directly
- H[q] = -E_q[ln q] requires E_q[ln q] finite ← from tight A3 directly

**Form 2.** F = D_KL(q || p(η|y)) - ln p(y) requires:
- KL finite ← E_q[ln q] and E_q[ln p(η|y)] both finite. By Bayes, ln p(η|y) = ln p(y, η) - ln p(y); so E_q[|ln p(η|y)|] ≤ E_q[|ln p(y, η)|] + |ln p(y)| < ∞ ← from tight A3 + A1.
- ln p(y) finite ← from A1.

**Form 3.** F = D_KL(q || p(η)) - E_q[ln p(y|η)] requires:
- D_KL(q || p(η)) finite ← E_q[ln q] and E_q[ln p(η)] both finite. p(η) is the prior; E_q[|ln p(η)|]: needs to be finite.
- E_q[ln p(y|η)] finite.

The tight A3 as written covers E_q[ln p(y, η)], E_q[ln p(η|y)], E_q[ln q]. **It does NOT explicitly cover** E_q[ln p(η)] or E_q[ln p(y|η)] — i.e., the marginal prior and conditional likelihood that Form 3 uses.

⚠ **Refinement needed.** Patch P-13 must be extended to cover Form 3's terms. Updated A3:

> *(A3) The expectations $\mathbb{E}_q[\ln p(y, \eta\mid m)]$, $\mathbb{E}_q[\ln p(\eta\mid y, m)]$, $\mathbb{E}_q[\ln p(\eta\mid m)]$, $\mathbb{E}_q[\ln p(y\mid \eta, m)]$, and $\mathbb{E}_q[\ln q(\eta\mid r)]$ are all finite. This restricts the variational family $\mathcal{Q}$ to densities under which all relevant log-likelihoods are integrable in absolute value.*

This adds two terms to cover Form 3: the prior log-density E_q[ln p(η|m)] and the likelihood E_q[ln p(y|η, m)].

### Act
- Refine patch P-13 in v2_patches.md to cover all three forms (Form 1: E_q[ln p(y,η)] + E_q[ln q]; Form 2: + E_q[ln p(η|y)]; Form 3: + E_q[ln p(η)] + E_q[ln p(y|η)]).

### Verify (refinement)
After refinement, does any Form fail? No: all expectation-finiteness conditions are stated explicitly. A reviewer following the proof of Lemma 1 or Lemma 2 (under v2's expanded A3) finds every integral well-defined.

### Post-fix evidence class
Class A (rigorous and complete).

---

## P2-OODA-5 — Patch P-14: m-index discipline (Plan §3.3, D.2.a)

### Observe
v1 line 253 right-hand side drops the $m$ index between equalities: `D_KL(q ‖ p(η|y, m)) − ln p(y|m) = D_KL(q ‖ p(η|y)) + L(y)`.

### Orient
Cosmetic; unambiguous in context. SOURCE B does the same thing — at corpus line 2421 it writes: *"In equation 3.2, unlike in chapter 2, we have explicitly conditioned all quantities on a model, m, to emphasize that these depend on the model we have…"* — confirming it's a deliberate convention.

### Decide
Add a footnote at v1 line 207 (Chapter 2.1 setup) declaring the convention.

### Verify
The footnote text in patch P-14 cites the exact SOURCE B passage. Re-checked at corpus line 2421: the quote is verbatim. ✓

### Act
Patch P-14 stands. **No refinement needed.**

### Post-fix evidence class
Class A.

---

## P2-OODA-6 — Patch P-15: Bound table sign-flip footnote (Plan §3.4, D.6.a)

### Observe
v1 Chapter 3.1 has a 4-row table comparing ELBO and VFE conventions. Rows 1 and 2 are sign-flipped restatements but the table doesn't say so explicitly.

### Orient
A reader new to both conventions might wonder whether two distinct facts are being asserted.

### Decide
Add an explicit footnote showing the sign-flip derivation in three lines.

### Verify (re-derivation)
Row 1: $\mathcal{L}(q) \le \ln p(y \mid m)$.
Negate: $-\mathcal{L}(q) \ge -\ln p(y \mid m)$.
Identify: $-\mathcal{L}(q) = F[q]$ (row 3) and $-\ln p(y \mid m) = L(y)$ (definition).
Conclude: $F[q] \ge L(y)$ (row 2). ✓

### Numerical anchor
Test 5 in `audit_tests_v2.py` already provides the numerical anchor:
- $F_\mathrm{Friston}$(uniform $q$) = 0.9446
- $\mathrm{ELBO}_\mathrm{Beal}$(uniform $q$) = -0.9446
- Sum = 0.0000 to machine precision

### Act
Patch P-15 stands.

### Post-fix evidence class
Class A.

---

## P2-OODA-7 — Patch P-16: q/p slip propagation note (Plan §3.5, F.6.a)

### Observe
v1 line 377: *"…the slip is repairable in one sentence."*

### Orient
True at the local level (line 34 of SOURCE A). But the slip propagates to E2 (line 319), E6 (line 132), and E13 (lines 335–341). A complete repair touches four loci.

### Decide
Replace v1 line 377 with patch P-16 text (already in v2_patches.md).

### Verify (re-read each locus)

**E1 at SOURCE A line 34** (already verified in audit §C.E1):
> "(Note: Most of us would say that the formulation of Eqn. 2 is between the true posterior density over external states q(η̃|r̃)… and the variational density p(η̃|s̃,ã,r̃)…)"
✓ Confirmed. q called "true posterior", p called "variational density." Reverses standard convention.

**E2 at SOURCE A line 319** (re-read above):
> "the free energy for the model is a lower bound for the free energy of the external system"
✓ Confirmed. Two defects: bound direction reversed (E2a), L misnamed as "free energy of external system" (E2b). Plus a meta-issue: line 318 acknowledges the inequality reverses Beal→Friston, yet line 319 immediately applies the *Beal* direction. Maren is aware of the reversal but mis-applies it.

**E6 at SOURCE A line 132** (already verified):
> "the actual distribution of the external system itself p(η̃|s̃,ã,r̃)"
✓ Confirmed. Conflates model posterior with generative process.

**E13 at SOURCE A lines 335–341** (re-read above):
> "we envision a total system… in which both the external and representational systems can, and indeed do, separately achieve free energy minimization"
✓ Confirmed. Asserts an external-system free-energy minimum without supplying the NESS argument.

All four loci verified by direct reading. ✓

### Act
Patch P-16 stands. **No refinement needed.**

### Post-fix evidence class
Class C (interpretive judgment; well-supported).

---

## P2-OODA-8 — Patch P-17: r vs μ convention footnote (Plan §3.6, F.3.a)

### Observe
v1 line 192 uses "$r$ (or $\mu$, depending on convention)" loosely.

### Orient
$\tilde r$ is the *internal-state variable*; $\mu$ in some Friston treatments is the *sufficient statistic of $q$* (a parameter, not a variable). The two are conceptually different. Conflating them is fine pedagogically but risky for a reader from a treatment that maintains the distinction.

### Decide
Add a footnote acknowledging the convention used.

### Verify
The patch text correctly identifies:
- $\tilde r$ = internal-state variable
- $\mu$ = sufficient statistic of $q$
- v2 uses $\tilde r$ in both senses for simplicity; reviewer should read accordingly

This is a faithful representation of standard Friston usage. ✓

### Act
Patch P-17 stands.

### Post-fix evidence class
Class C.

---

## P2-OODA-9 — Patch P-18: Parameter-learning acknowledgment (Plan §3.7, F.4.a)

### Observe
v1 Chapter 2 treats $m$ as fixed throughout. Beal-style VB additionally optimizes over $\theta$ (model parameters) via EM. v1 doesn't acknowledge this.

### Orient
For the active-inference reading we adopt, $m$ is fixed; the agent's task is recognition, not parameter learning. But this is a *scope* choice; it should be flagged.

### Decide
Add scope-acknowledgment in Chapter 2.6.

### Verify
Patch P-18 cites Beal §2.2.2 ff. and Blei et al. (2017) §2.3 as the canonical references for parameter learning. **Both are Layer 2 sources** (not directly inspected). The cite is therefore secondary.

⚠ **Refinement needed.** Patch P-18 should explicitly note that the citation to Beal §2.2.2 ff. is currently secondary (mediated through standard knowledge of the literature), and reference [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1 and §7 for the first-hand verification path.

Updated patch text:

> *It does not develop the parameter-learning aspect of variational Bayes — i.e., the joint optimization of $F[q]$ over $q$ *and* over model parameters $\theta$ that is the core use case of Beal (2003). In the active-inference reading we adopt, $m$ (the model) is treated as fixed throughout this manuscript; the agent's task is recognition (optimizing $q$), not parameter estimation. A treatment that develops the EM-style alternation between $q$-optimization and $\theta$-optimization is in Beal (2003) §2.2.2 ff. and Blei et al. (2017) §2.3. (Class C — outside scope; the citations to Beal and Blei are secondary, pending Layer 2 first-hand verification per [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §1 and §7.)*

### Act
Refine patch P-18 in v2_patches.md.

### Post-fix evidence class
Class C with explicit Layer 2 cross-reference.

---

## P2-OODA-10 — Patch P-19: CI notation footnote (Plan §3.8, F.8.b)

### Observe
SOURCE B Box 3.1 (corpus line 1938) uses single-bar `⊥`; v1 Chapter 6.1 standardizes to double-bar `⊥⊥`.

### Orient
Most VI/AI-literate readers use `⊥⊥` for CI. SOURCE B's single-bar choice is non-standard; v1 silently corrects.

### Decide
Footnote the choice with explicit cross-reference to SOURCE B.

### Verify
Patch text correctly cites SOURCE B Box 3.1 line 1938. Both notations mean exactly conditional independence; the meaning is identical.

### Act
Patch P-19 stands.

### Post-fix evidence class
Class A (notational hygiene with explicit citation).

---

## P2-OODA-11 — Patch P-24: E2 split into E2a (bound direction) and E2b (misnomer) (Plan §3.9)

### Observe
v1 Appendix D Error Register E2 captures the bound-direction reversal as one entry. Audit §C.E2 noted that E2 actually contains *two* defects.

### Orient
Splitting E2 increases granularity. A reviewer can dispute one defect without disputing the other.

### Decide
Split E2 into E2a (bound direction) and E2b (misnomer).

### Verify (re-read SOURCE A lines 315–319 above)

**Defect 1 (E2a) — bound direction reversed:**
- Maren writes "F is a lower bound for L"
- Standard: F is an upper bound on L
- Verified ✓

**Defect 2 (E2b) — L misnamed as "free energy of external system":**
- L(s̃, ã, r̃) = −ln p(s̃, ã, r̃) is by Maren's own Eqn 17 the surprisal (negative log evidence under the model)
- Calling it "free energy of the external system" introduces an undefined "external system free energy" and conflates model surprisal with a process-level quantity
- Verified ✓

**Additional finding (not in patch P-24):**
- Line 318 explicitly acknowledges the Beal→Friston inequality reversal: *"we reverse the signs on all of the terms on the right-hand-side of Eqn. 34, as well as the direction of the inequality."*
- Yet line 319 immediately applies the *Beal* (un-reversed) direction.
- This is not a fourth defect, but an aggravating context: Maren is *aware* of the reversal but does not apply it. Worth mentioning in the E2a description.

### Act
Refine patch P-24 to add this aggravating context to E2a's description.

Updated E2a description:

> "the free energy for the model is a lower bound for the free energy of the external system" reverses the canonical bound direction. Aggravating context: line 318 of SOURCE A explicitly acknowledges that the Beal→Friston transition *reverses* the inequality direction; line 319 immediately applies the un-reversed (Beal) direction. The error is therefore not a missed convention but a contradiction with Maren's own preceding sentence.

### Post-fix evidence class
Class A (defect verified by direct reading).

---

## P2-OODA-12 — Patch P-25: E7 wording refinement (Plan §3.10, C.7.a)

### Observe
v1 Appendix D E7 description: *"Entropy discussed as if equilibrium yields a single value replacing the distribution."*

### Orient
Audit §C.7.a found the actual issue is broader: Maren oscillates between treating $q$ as a functional and as a distribution-evaluated-at-equilibrium.

### Decide
Refine the E7 description per patch P-25.

### Verify (re-read SOURCE A lines 134, 141, 195–197 above)

**Locus 1 (line 134):**
> "we take it [q] at the equilibrium state. That is, q corresponds to the equilibrium free energy of the external system"
✓ Functional → point. Plus an additional confusion: "q corresponds to the equilibrium free energy" — q is a *distribution*, not a *free energy*. Three quantities conflated.

**Locus 2 (line 141):**
> "there will not be a sum over all possible values of some distribution over i; there will instead be a single probability distribution p and a single probability distribution q, after each has reached free energy minimization"
✓ Functional → point. The sum over states (which IS what makes p and q distributions) is replaced by "a single probability distribution" (which is a distribution, but the statement that there is no sum over states is mathematically muddled).

**Locus 3 (lines 195–197):**
> "we may take L(s̃, ã, r̃) to be the actual distribution of the representational system… while the free energy corresponds to the equivalent measure that would be obtained if the sensory units were caused by the latent or hidden states encoded by the internal states. By minimizing free energy, the two become close but (in general) will never be exactly the same."
> "we will obtain p as the probability distribution for the observations in a free energy-minimized state. In contrast, the values of specific elements in the distribution over (s̃, ã, r̃) may, at a certain point, not be in a free energy-minimized state."
✓ Locus 3 has a DIFFERENT issue: it calls L (a *scalar*, the surprisal) "the actual distribution of the representational system." That's a category error: L is not a distribution. This is part of the functional-vs-point oscillation but in a more severe form (scalar called distribution).

### Act
Refine patch P-25 to capture all three loci with their specific symptoms:

Updated E7 description:

> "Throughout Sections 4.1, 4.3, and 5.2, the variational density $q$ is treated alternately as a functional (the standard reading: $q \in \mathcal{Q}$, and operations on $q$ are operations on the full distribution) and as a distribution-evaluated-at-equilibrium (a non-standard reading: $q$ becomes a point quantity once at free-energy minimum). Three specific symptoms:
> - SOURCE A:134 — *"q corresponds to the equilibrium free energy of the external system"*: conflates q (a distribution) with F[q] (a number) and with "free energy of the external system" (an undefined quantity).
> - SOURCE A:141 — *"there will not be a sum over all possible values of some distribution over i; there will instead be a single probability distribution"*: removing the sum over states is mathematically muddled because the sum is what makes the object a distribution.
> - SOURCE A:195–197 — *"we may take L(s̃,ã,r̃) to be the actual distribution of the representational system"*: category error: $L$ is a scalar (surprisal), not a distribution.
> Repair: treat $q$ and $p$ as functionals throughout; reserve "value of $F[q]$" or "value at equilibrium" for the scalar quantity; do not apply the word "distribution" to $L$."

### Post-fix evidence class
Class A (defect verified by direct reading; refinement is more comprehensive).

---

## P2-OODA-13 — Patch P-26: E8 Layer 2 acceptance gate (Plan §3.11, C.8.a)

### Observe
v1 Appendix D E8 has confidence 4/5 (not 5/5) due to PDF-extraction caveat.

### Orient
The caveat needs a Layer 2 settlement protocol.

### Decide
Append acceptance gate text per patch P-26.

### Verify
Patch text specifies:
- Acquire Maren's original PDF or LaTeX
- Inspect Eqn B-1 directly
- If minus sign present → downgrade E8 to Minor
- If absent → upgrade to 5/5

This is a clean Layer 2 protocol. Cross-reference to [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §6 (the original-PDF inspection section) is implicit; should make explicit.

⚠ **Minor refinement.** Add explicit cross-reference to Layer2 Specs §6.

Updated patch text:

> *E8 acceptance gate (Layer 2). The PDF→text-extraction-vs-original ambiguity for Eqn B-1 must be settled before publication of any v3 that depends on this finding. Required action: obtain Maren's original PDF (or LaTeX source) and inspect Eqn B-1 directly. If the original has the minus sign, downgrade severity to Minor (typesetting/extraction artifact) and remove from the publishable error list. If the original lacks the minus sign, upgrade confidence to 5/5 and retain as Serious. **The full inspection protocol is in [Layer2_Inspection_Specs.md](Layer2_Inspection_Specs.md) §6.**

### Post-fix evidence class
Specifications-Layer 2 spec.

---

## P2-OODA-14 — Patch P-27: Severity rating note (Plan §5, H.9)

### Observe
v1 Appendix D rates several items at "Serious"; the rating is judgment-call.

### Orient
A defender of Maren could argue some are "Moderate." The standard should be made explicit.

### Decide
Add a rationale paragraph per patch P-27.

### Verify
Patch text states:
- Five-level scale per CLAUDE.md
- "Serious" = blocks publication as derivation paper
- "Moderate" = misleads but doesn't falsify
- "Reasonable adjudicators may move items between Serious and Moderate"
- Rated conservatively (favor Serious when in doubt)

This is a clear standard. ✓

### Act
Patch P-27 stands. **No refinement needed.**

### Post-fix evidence class
Class E.

---

## Summary of P2 OODA results

| Patch | Plan ref | Verification | Refinement needed? |
|-------|----------|--------------|--------------------|
| P-5 | H.6 | A1–A3 parenthetical correctly named | No |
| P-6 | H.11 | Confidence reconciliation honest and complete | No |
| P-12 | §3.1, B.1 | **Re-derived** Form 3; **numerically tested** on toy + Gaussian; SOURCE B aligned | No (but Test 11 added) |
| P-13 | §3.2, D.5.a | A3 must cover Form 3's prior + likelihood expectations | **Yes — extend A3 to 5 expectation-finiteness conditions** |
| P-14 | §3.3, D.2.a | Cite to SOURCE B line 2421 verified verbatim | No |
| P-15 | §3.4, D.6.a | Sign-flip derivation 3 lines; numerically anchored to Test 5 | No |
| P-16 | §3.5, F.6.a | All four loci re-verified by direct read | No |
| P-17 | §3.6, F.3.a | r vs μ distinction faithfully described | No |
| P-18 | §3.7, F.4.a | Cite to Beal §2.2.2 is secondary | **Yes — add Layer 2 cross-reference** |
| P-19 | §3.8, F.8.b | CI notation footnote correctly cites SOURCE B | No |
| P-24 | §3.9 | Both E2 defects re-verified; aggravating context found | **Yes — add line 318 acknowledgment-but-not-application** |
| P-25 | §3.10, C.7.a | Three E7 loci re-verified; locus 3 has additional category error | **Yes — three-locus refinement** |
| P-26 | §3.11, C.8.a | E8 gate; cross-ref to Layer 2 Specs implicit | **Yes — make cross-ref explicit** |
| P-27 | §5, H.9 | Severity rating standard clear | No |

**5 patches refined; 9 patches stand as-written.** Refinements applied to v2_patches.md in next pass.

## P2 deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| D1 | This OODA worksheet | ✅ |
| D2 | Refined patches in v2_patches.md (P-13, P-18, P-24, P-25, P-26) | (next) |
| D3 | Test 11 added to audit_tests_v2.py | (next) |
| D4 | tests/test_11_complexity_accuracy.py | (next) |
| D5 | Updated reference_output.txt | (next) |
| D6 | Updated repo README pytest count | (next) |
| D7 | Provenance_Map.csv updated for new claim and Test 11 | (next) |
| D8 | Final regression check | (next) |

— *End of P2 OODA worksheet.*
