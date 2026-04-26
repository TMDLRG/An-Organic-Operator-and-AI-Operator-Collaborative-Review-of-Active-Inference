# An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization

**Manuscript:** [`Manuscript_Draft_v2.md`](Manuscript_Draft_v2.md) (1,137 lines)
**Status:** v2 draft. Layer 1 (AI-executable) of the [Audit Remediation Plan](Audit_Remediation_Plan.md) is complete. Layer 2 (human expert review) gates remain pending.
**Authors:** Michael Polzin (organic operator) with AI co-contributors:
- **Anthropic Claude (Opus 4.7)** — primary drafting, audit, and P0–P4 remediation across four documented sessions; see `Manuscript_Draft_v2.md` Appendix E.2.
- **OpenAI GPT**, accessed via two Custom GPTs both built on the **ORCHESTRATE Method** ([book / Amazon](https://www.amazon.com/ORCHESTRATE-Prompting-Professional-AI-Outputs/dp/B0G2BJKDM6)):
  - **Ai Onna** — produced the prior independent peer review captured as SOURCE C, which catalyzed the audit chain.
  - **Jules** — Custom GPT collaborator on the ORCHESTRATE workflow.
**License:** MIT (this repo); source materials referenced are NOT redistributed (see "Source materials" below).

---

## What this is

This repository contains a collaborative review of variational free energy as it is used in active inference, organized as an audit-grade re-presentation of the central variational identity together with a transparent provenance trail. The contribution is the *audit method and discipline*, not new mathematics; the underlying identities are standard since Beal (2003) and Friston's subsequent work, and are restated here from definitions with reproducible numerical verification.

The manuscript treats Maren's *Themesis Technical Report TR-2019-01v6* ("Derivation of the Variational Bayes Equations") as a *test case* — not a target — for the audit method. Several of the audit's findings build directly on Maren's exposition; four specific pedagogical contributions are credited explicitly in the Preface.

This is AI-augmented work. Provenance is documented at four levels of granularity:

1. **Session-level** — the four AI sessions and their contributions (Manuscript_Draft_v2.md Appendix E.2).
2. **Phase-level** — five phases of remediation (P0 reproducibility, P1 provenance, P2 math refinements, P3 framing, P4 v2 production), each with an OODA worksheet.
3. **Patch-level** — 27 documented patches v1 → v2 in `v2_patches.md`.
4. **Sentence-level** — `Provenance_Map.csv` (125 rows) tracing each substantive claim to its evidence class, source anchor, and verification method.

The reproducibility repository ([`manuscript-v2-reproducibility/`](manuscript-v2-reproducibility/)) provides 87 deterministic pytest assertions across 11 numerical demonstrations, with bit-identical reference output, a `Dockerfile`, and a CI matrix (3 OS × 3 Python versions = 9 cells).

---

## Repository structure

```
.
├── README.md                            (this file)
├── LICENSE                              (MIT)
├── .gitignore
├── .github/workflows/ci.yml             (top-level CI; runs reproducibility suite)
│
├── Manuscript_Draft_v2.md               ← THE MANUSCRIPT (start here)
├── Manuscript_Draft_v1.md               (historical first draft, preserved)
├── Manuscript_Draft_v1_Audit.md         (audit-of-audit performed on v1)
│
├── Audit_Remediation_Plan.md            (4-phase plan: P0–P4)
├── Phase_P1_OODA.md                     (provenance phase OODA worksheet)
├── Phase_P2_OODA.md                     (math refinements OODA worksheet)
├── Phase_P3_OODA.md                     (title and framing OODA worksheet)
├── Phase_P4_OODA.md                     (v2 production OODA worksheet)
│
├── v2_patches.md                        (27 documented v1 → v2 patches)
├── Provenance_Map.csv                   (125-row sentence-level claim trace)
│
├── Layer2_Inspection_Specs.md           (8 primary-source inspection specs for human reviewers)
├── Pre_Publication_Checklist.md         (venue-by-venue compliance gates)
├── FILE_RENAMING_LOG.md                 (source-file rename audit trail)
│
├── audit_tests.py                       (legacy v1 test script; superseded by v2 suite)
└── manuscript-v2-reproducibility/       (the deterministic reproducibility repo)
    ├── README.md                        (run instructions + acceptance criteria)
    ├── LICENSE                          (MIT)
    ├── Dockerfile                       (pinned Python 3.12.10)
    ├── requirements.txt
    ├── audit_tests_v2.py                (main test script; no RNG; deterministic)
    ├── reference_output.txt             (bit-identical expected output)
    ├── .github/workflows/ci.yml         (CI within the subdir, mirrored at repo root)
    └── tests/
        ├── test_01_discrete.py
        ├── test_02_bad_posterior.py
        ├── test_03_support_mismatch.py
        ├── test_04_gaussian_mc.py
        ├── test_05_sign_falsification.py
        ├── test_06_L_expansion.py
        ├── test_07_measure_transformation.py
        ├── test_08_markov_blanket_ci.py
        ├── test_09_appendix_b_sign.py
        ├── test_10_cvm_kikuchi.py
        └── test_11_complexity_accuracy.py
```

---

## Source materials (NOT redistributed in this repo)

The audit references and analyzes the following primary materials. **None is redistributed in this repository.** Readers should obtain them from their respective publishers.

- **SOURCE A** — Maren, A. J. (2024). *Derivation of the Variational Bayes Equations.* Themesis Technical Report TR-2019-01v6. Available from Themesis or by contacting the author. Copyright Alianna J. Maren / Themesis Inc.
- **SOURCE B** — Parr, T., Pezzulo, G., & Friston, K. J. (2022). *Active Inference: The Free Energy Principle in Mind, Brain, and Behavior.* MIT Press. ISBN 9780262045353. Available open access from MIT Press under CC BY-NC-ND. Copyright Massachusetts Institute of Technology.
- **SOURCE C** — A prior peer review produced by a GPT-class large language model (filename `Ai Onna GPT5.4 Pro.docx`); the specific model variant is taken on the operator's report. Not redistributed. Substantive findings are summarized in the audit; full text is not reproduced for third-party-content reasons.
- **Beal, M. J. (2003)**, **Friston (2013, 2015)**, **Sengupta, Stemmler & Friston (2013)**, **Kikuchi & Brush (1967)**, **Blei, Kucukelbir & McAuliffe (2017)** — primary references not directly inspected by the AI audit chain. Specifications for human Layer 2 inspection of each are in [`Layer2_Inspection_Specs.md`](Layer2_Inspection_Specs.md).

The audit's findings (E1–E10 in `Manuscript_Draft_v2.md` Appendix D) cite specific lines of SOURCE A and SOURCE B by line number. A reader obtaining the source materials independently can verify each citation by direct reading.

---

## Quick-start: verify reproducibility

```bash
git clone https://github.com/TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference.git
cd An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference/manuscript-v2-reproducibility

# Install dependencies (numpy and pytest only; main script needs neither)
pip install -r requirements.txt

# Run the deterministic test suite
python audit_tests_v2.py

# Verify bit-identical output to the reference
python audit_tests_v2.py > out.txt && diff out.txt reference_output.txt
echo "Exit code: $?"   # should be 0

# Run the per-test pytest harness (87 assertions across 11 tests)
pytest tests/ -v
```

For full cross-platform reproducibility:

```bash
docker build -t aoaiop-tests manuscript-v2-reproducibility/
docker run --rm aoaiop-tests
```

CI (top-level `.github/workflows/ci.yml`) verifies this on every push across Linux / Windows / macOS × Python 3.11 / 3.12 / 3.13.

---

## Reading order for new readers

| Time available | What to read | Why |
|---|---|---|
| 5 minutes | This README + `Manuscript_Draft_v2.md` Abstract | Get the gist |
| 1 hour | Above + `Manuscript_Draft_v2.md` Chapter 4.5 (q/p discipline) + Appendix D (Error Register) | The load-bearing audit findings + conciliatory framing |
| 4 hours | Full `Manuscript_Draft_v2.md` + run reproducibility tests | Substantive engagement |
| 8 hours | Above + `Manuscript_Draft_v1_Audit.md` + relevant `Phase_P*_OODA.md` | The audit chain in full |
| Collaborative | Engage with one or more error register items in writing; or execute one of the Layer 2 inspections per `Layer2_Inspection_Specs.md` | Convert AI audit to peer-reviewed work |

---

## What this work cannot deliver alone

Per the explicit honesty framing in `Audit_Remediation_Plan.md` §0.1 and §9, AI-augmented work has structural limits:

- **Cannot certify mathematical truth.** A correct derivation is not the same as truth in the academic sense; that requires community use, citation, and time.
- **Cannot replace human peer review.** Eight Layer 2 gates are listed in `Layer2_Inspection_Specs.md` and require human reviewers with access to primary sources.
- **Cannot verify primary sources** that were not in the working directory at audit time (Beal 2003, Friston 2013/2015, Sengupta et al. 2013, Kikuchi & Brush 1967, Blei et al. 2017, original Maren PDF for E8 settlement).
- **Cannot prevent post-publication errata.** A corrigenda channel is specified in `Pre_Publication_Checklist.md` §7.

This repository is the **AI-layer asymptote** of what is achievable without expert human review. Layer 2 is the path forward.

---

## Citation

If you cite this work in progress, please cite by repository URL and commit hash:

> Polzin, M., with Anthropic Claude (Opus 4.7), OpenAI GPT — accessed via the *Ai Onna* and *Jules* Custom GPTs, both built on the **ORCHESTRATE Method** — and TMDLRG (2026). *An Organic Operator and AI Operator Collaborative Review of Active Inference Free Energy Minimization: Reviewable Foundations, Reproducible Tests, and Open Tensions.* GitHub repository, https://github.com/TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference, commit [hash].
>
> ORCHESTRATE Method reference: *ORCHESTRATE — Prompting for Professional AI Outputs.* Amazon: https://www.amazon.com/ORCHESTRATE-Prompting-Professional-AI-Outputs/dp/B0G2BJKDM6

A formal citation will be added when a preprint or DOI is minted (see `Pre_Publication_Checklist.md` §1–§2).

## Reporting issues

Please open a GitHub issue. Substantive critique of the audit is welcome — see `Manuscript_Draft_v2.md` Appendix F (Invitation for Expert Review) for suggested review questions. Layer 2 inspection submissions can be opened as pull requests adding to `Layer2_Inspection_Specs.md`.

## Acknowledgments

See `Manuscript_Draft_v2.md` Dedication for full acknowledgments. None of the people or institutions named has reviewed or approved this draft.

— Last updated: 2026-04-25
