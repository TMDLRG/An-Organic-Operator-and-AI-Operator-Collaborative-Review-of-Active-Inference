# Reproducibility test suite — Manuscript v2

This repository accompanies the manuscript *An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization* (v2). It provides a fully deterministic, cross-platform-reproducible numerical test suite for the manuscript's mathematical claims.

**Standard.** Every numerical claim in the manuscript that is marked Class A (re-derivable) corresponds to a test below. Each test produces a bit-identical numerical output across:

- Python 3.11, 3.12, 3.13
- numpy ≥ 1.26 (the suite does not require numpy at all for the main script)
- Linux, Windows, macOS
- x86-64, arm64

**Authorship and provenance.** This suite was built by Anthropic Claude (Opus 4.7) in Phase P0 of the [Audit Remediation Plan](../Audit_Remediation_Plan.md) on 2026-04-25. It is AI-generated; the tests have been re-derived from definitions and the reference output has been re-checked by a second AI session. **Final certification is the work of human expert reviewers.**

---

## Quick start

```bash
# 1. Clone or download.
git clone <repo-url>
cd manuscript-v2-reproducibility

# 2. (Optional) install numpy + pytest for the per-test harness.
pip install -r requirements.txt

# 3. Run the main test script.
python audit_tests_v2.py

# 4. Acceptance: bit-identical to reference_output.txt.
python audit_tests_v2.py > out.txt
diff out.txt reference_output.txt   # zero diff -> PASS

# 5. (Optional) per-test pytest harness.
pytest tests/ -v
```

For full cross-platform reproducibility:

```bash
docker build -t v2-audit-tests .
docker run --rm v2-audit-tests
```

---

## What the tests check

| # | Test | What it verifies | Class |
|---|------|--------------------|--------|
| 1 | Discrete two-state | Master variational identity (both forms agree); $F[q] \ge -\ln p(y)$ with equality iff $q = $ exact posterior | A |
| 2 | Bad approximate posterior | $F[q] - \text{surprisal} = D_\mathrm{KL}(q\|p_{\text{post}})$ exactly; KL is monotone in distance from $q^*$ | A |
| 3 | Support mismatch | KL diverges when $q$ has mass outside $p$'s support; assumption A2 is essential | A |
| 4 | Gaussian conjugate | Closed-form KL between two Gaussians; bound holds in the continuous case | A |
| 5 | Sign-convention falsification | $F + \mathrm{ELBO} = 0$ exactly; "F is a lower bound" wording is numerically falsified | A |
| 6 | $L(s, a, r)$ expansion | iid surprisal ≠ literal repeated-term expansion (3.4780 ≠ 1.8553 nats for the cited example) | A |
| 7 | Measure transformation | $\mathbb{E}_\eta[\eta^2] = 1 \neq 13 = \mathbb{E}_r[r^2]$ for $r = 2\eta + 3$; rename without Jacobian is invalid | A |
| 8 | Markov-blanket CI | $\eta \perp\!\!\!\perp r \mid (s, a)$ holds to machine precision (max residual $\sim 10^{-16}$) | A |
| 9 | Appendix B sign | One missing minus sign inverts $F$ by 3.276 nats; standard form matches Test 1 exactly | A |
| 10 | Bethe vs. $F[q]$ | Generic Bethe cluster-expansion free energy and active-inference $F[q]$ take different values at analogous configurations; structural similarity ≠ derivational equivalence | C (illustration); underlying Kikuchi/Bethe is A |
| 11 | Complexity-Accuracy form | $F[q] = D_\mathrm{KL}(q\|p(\eta\|m)) - \mathbb{E}_q[\ln p(y\|\eta,m)]$ — the third form of Eqn 2.5 — agrees with Forms 1 and 2 to floating-point precision on both discrete and Gaussian models. Added in Phase P2. | A |

---

## Reproducibility design notes

- **No RNG.** v1 of these tests used `np.random.default_rng(42)` in three places. This made outputs RNG-implementation-dependent. v2 uses explicit data vectors (Test 6) and closed-form analytic computations (Tests 4 and 7) instead.
- **No BLAS.** No matrix operations. All math is scalar `math.log`, `math.exp`, addition. This eliminates BLAS-version dependencies (OpenBLAS / MKL / Accelerate).
- **Pure ASCII.** No non-ASCII characters in source or output, eliminating encoding-dependent behavior.
- **Pinned environment.** Python 3.12.10 is the canonical environment. CI verifies bit-identical output on Python 3.11, 3.12, 3.13 across three OS families (9 cells).
- **Deterministic acceptance.** `diff` against `reference_output.txt` must produce zero output. Any deviation is a regression.

---

## Known reproducibility issues *fixed* relative to v1

This section documents the issues this v2 suite resolves. v1 readers may want to verify both findings.

### Test 6 — corrected from v1's stated 3.456 nats to 3.4780 nats

v1 (Manuscript_Draft_v1.md Appendix C.6) and the prior audit Test Notes both reported the iid surprisal of `(0, 1, 1, 1, 0)` (3 ones, 2 zeros under p=0.7) as **3.456 nats**. By direct re-computation:

$$
-\sum_{i=1}^5 \ln p(y_i) = -\bigl[2\ln 0.3 + 3 \ln 0.7\bigr] = -(-2.4079 - 1.0700) = 3.4780
$$

The correct value is **3.4780 nats**. The v1 number was an arithmetic error. The audit-of-v1 attributed the discrepancy to RNG-version mismatch; that diagnosis was partially correct (different RNG entry-points produce different samples) but did not catch the deeper arithmetic error. Both `(0,1,1,1,0)` and `(0,1,0,1,1)` (the two samples produced by legacy and modern numpy RNG respectively) have 3 ones and 2 zeros and so give the same surprisal: 3.4780.

### Test 8 — corrected from v1's stated `< 6e-17` to `< 5e-16`

v1 (Manuscript_Draft_v1.md Chapter 6.4 / Appendix C.8) claimed max residual `< 6 × 10⁻¹⁷`. Standard IEEE 754 double-precision arithmetic on this construction yields `1.11 × 10⁻¹⁶ = 2⁻⁵³`, which is one machine epsilon. v1's specific bound is too tight under standard floating-point arithmetic; v2 uses `< 5 × 10⁻¹⁶` (4-eps safety margin).

---

## Acceptance criteria

The repository is considered "Phase P0 complete" iff all of:

- [ ] `python audit_tests_v2.py > out.txt && diff out.txt reference_output.txt` produces zero output on Python 3.11, 3.12, 3.13.
- [ ] `pytest tests/ -v` reports all 87 tests passing.
- [ ] CI is green on the 9-cell matrix (3 OS × 3 Python).
- [ ] `docker build` and `docker run` succeed; `docker run` reports `ALL TESTS PASS BIT-IDENTICALLY`.
- [ ] All non-ASCII characters absent from source and output.
- [ ] Test 6 produces 3.4780 (not 3.456).
- [ ] Test 8 produces residual `< 5e-16`.

---

## Layer 2 — Human-required gates

This Layer 1 (AI-verifiable) suite cannot replace Layer 2 (human expert) verification. Specifically:

- **Beal (2003)** must be inspected directly to verify Test 5's sign-convention claims at first hand.
- **Friston (2013, 2015)** NESS arguments must be inspected to license any "external system minimizes free energy" wording.
- **Kikuchi & Brush (1967)** must be inspected to verify Test 10's CVM structural claims.
- **Original Maren PDF or LaTeX source** must be inspected to settle whether Eqn B-1 contains a minus sign that the text extraction lost (Test 9 caveat).

A reviewer with access to these primary sources should report findings to the corresponding-author corrigenda channel (TBD before publication).

---

## Citation

If you use this test suite or its outputs, please cite the parent manuscript. A formal citation will be added at the manuscript's preprint deposit.

## License

[MIT](LICENSE). Reuse, modification, and redistribution are permitted; no warranty.

## Reporting issues

Open an issue on this repository, or contact the corresponding author via the channel listed in the manuscript's front matter.
