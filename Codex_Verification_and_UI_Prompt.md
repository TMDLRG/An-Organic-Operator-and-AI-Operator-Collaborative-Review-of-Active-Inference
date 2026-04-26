# Prompt for GPT Codex (or any senior coding agent)

**Use this prompt verbatim** when you delegate verification and UI/UX construction to a GPT Codex agent (or any peer agent with comparable repo-execution authority). The prompt is self-contained — Codex should not need to ask the operator clarifying questions for the first phase. Phase 2 begins only if Phase 1 fully passes.

The prompt is structured as a single message that tells Codex its role, where everything is, what to check, what to build, and how "done" is defined.

---

# === PROMPT BEGINS HERE — copy from here through "PROMPT ENDS HERE" ===

## Your role

You are a senior full-stack engineer and audit-grade reviewer. You are inheriting a repository whose central virtue is *transparent, reviewable, reproducible, audit-grade* discipline. Your task is two-phased:

1. **Phase 1 — Verification.** Independently check everything that the repo claims is checkable, run all tests, and cross-check audit findings against primary sources where they are available. Produce a single verification report at the end. Do not build any UI in Phase 1.

2. **Phase 2 — UI/UX construction (gated on Phase 1 passing).** Only if Phase 1 reports zero failures, build a full, beautiful, production-quality user interface for (a) viewing all documents, (b) running all the numerical mathematics interactively, and (c) running active-inference agents using the JIDO SDK that the operator will supply.

**You must complete Phase 1 before touching Phase 2.** If Phase 1 fails, stop, report the failures with file:line citations, and wait for operator direction.

## The repository

**URL:** `https://github.com/TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference`

**License:** MIT.

**Authors / co-contributors (do not alter):** Michael Polzin (organic operator) with Anthropic Claude (Opus 4.7), and OpenAI GPT accessed via the *Ai Onna* and *Jules* Custom GPTs (both built on the ORCHESTRATE Method, see `https://www.amazon.com/ORCHESTRATE-Prompting-Professional-AI-Outputs/dp/B0G2BJKDM6`).

**What this is:** an audit-grade collaborative review of variational free energy in active inference. It uses Alianna Maren's *Themesis Technical Report TR-2019-01v6* (also arXiv:1906.08804v6 [cs.NE]) as a *test case* (not a target) for the audit method. The contribution is the audit method and provenance discipline — not new mathematics; the underlying identities are standard since Beal (2003) and Friston's subsequent work, restated here from definitions.

**Project ethic — read this before anything else:** the project's central virtue is correctability. You do not need to defer to existing claims; you need to *check* them, and if you find errors, document them in the same audit-register style the existing repo uses. The Phase P5 OODA worksheet is a worked example of how the audit chain catches and reverses its own errors (e.g., the A.1.a reversal). You should be willing to do the same — but everything you change must be auditable, with file:line citations and verifiable test runs.

## Repository inventory

After cloning, you will see (top-level):

| Path | Purpose |
|------|---------|
| `Manuscript_Draft_v2.md` | The current manuscript (1,137+ lines). Start here. |
| `Manuscript_Draft_v1.md` | Historical first draft, preserved. |
| `Manuscript_Draft_v1_Audit.md` | Audit-of-audit (an audit performed on v1). |
| `Audit_Remediation_Plan.md` | The 6-phase plan (P0–P5) the audit chain followed. |
| `Phase_P1_OODA.md`–`Phase_P5_OODA.md` | Per-phase OODA worksheets. P5 is the most recent (Layer-2 §6 settlement of the original Maren PDF). |
| `v2_patches.md` | 27 documented patches v1→v2, each with line-level provenance and acceptance criteria. |
| `Provenance_Map.csv` | 145-row sentence-level claim trace. Every load-bearing claim has a row with evidence class, source anchor, and verification method. |
| `Layer2_Inspection_Specs.md` | 8 primary-source inspection specifications for human Layer-2 reviewers. §6 is settled; the rest are pending. |
| `Pre_Publication_Checklist.md` | Venue-by-venue compliance gates (arXiv, OSF, journals, KDP, etc.). |
| `FILE_RENAMING_LOG.md` | Source-file rename audit trail (note: contains a *reversal* — the original rename rationale was wrong; preserved for the historical record). |
| `CITATION.cff` | Citation File Format — GitHub renders a "Cite this repository" button from this. |
| `.zenodo.json` | Zenodo deposit metadata for future preprint deposit. |
| `manuscript-v2-reproducibility/` | The deterministic reproducibility test suite. **All math is here.** See its own README. |
| `Revision Research and Test Notes.txt` | Historical audit deliverable from the prior session. |
| `audit_tests.py` | Legacy v1 test script (superseded by `manuscript-v2-reproducibility/audit_tests_v2.py`; preserved for the historical record). |

What is **not** in the repo (intentionally — copyright):

- `1906.08804v6.pdf.txt` / `Maren_TR-2019-01v6.txt` (Maren TR — copyright Alianna J. Maren / Themesis)
- `book_9780262369978*` (Parr/Pezzulo/Friston 2022 — MIT Press)
- `Ai Onna GPT5.4 Pro.docx` / `source_c_extracted.txt` (third-party AI review output)
- `1906.08804v6.pdf` (the original PDF used in Phase P5)

The audit references and quotes these; readers should obtain them from their respective publishers. Some of this may have been provided to you separately by the operator.

---

# Phase 1 — Verification

The bar is *full audit-grade independent verification*. You may not skip steps in the name of speed.

## Phase 1.1 — Repository hygiene

Do the following and document in your verification report:

1. Clone the repo. Confirm `git status` is clean and `git log --oneline -10` shows the recent commits make sense.
2. Confirm SHA-256 of any file you depend on, especially the source corpus if the operator provided it.
3. Verify the LICENSE and README list the four AI co-contributors (Anthropic Claude; OpenAI GPT via Ai Onna; OpenAI GPT via Jules; ORCHESTRATE Method) and the ORCHESTRATE Amazon URL.
4. Verify the CITATION.cff file parses (try `cffconvert --validate` or render the GitHub "Cite this repository" button).

## Phase 1.2 — Reproducibility test suite (THE CRITICAL ITEM)

Inside `manuscript-v2-reproducibility/`:

1. Install dependencies per `requirements.txt`. Pin Python 3.11, 3.12, AND 3.13 (run all three).
2. Run `python audit_tests_v2.py > out.txt` on each Python version. **Verify** `diff out.txt reference_output.txt` produces zero output on each. This is the bit-identical-output guarantee.
3. Run `pytest tests/ -v`. **All 87 assertions must pass** across 11 tests.
4. Run `python audit_tests_v2.py > out2.txt && diff out.txt out2.txt`. Determinism check: same script, same machine, two runs, zero diff.
5. Build the Dockerfile. Run the image. Verify it produces the same `ALL TESTS PASS BIT-IDENTICALLY` message.
6. Cross-check the GitHub Actions matrix in `.github/workflows/ci.yml`. Verify it hits 9 cells (3 OS × 3 Python).

If any of 1–6 fails, **stop and report**. Do not proceed to Phase 1.3.

Specific known-correct values (your run must match these to the stated precision):

| Test | Quantity | Expected value |
|------|----------|----------------|
| 1 | $-\ln p(y=1)$ | 0.3711 nats (to 4 dp) |
| 1 | exact posterior $p(\eta=1\|y=1)$ | 0.913043 |
| 1 | $F[q]$ at uniform $q$ | 0.9446 nats |
| 4 | Gaussian surprisal | 1.9487 nats |
| 6 | iid surprisal of $(0,1,1,1,0)$ | 3.4780 nats |
| 8 | max CI residual | $< 5 \times 10^{-16}$ |
| 9 | $F$ with B-1 corrected sign | 0.9446 nats (matches Test 1) |
| 11 | All three forms agree | match to 1e-12 |

## Phase 1.3 — Audit findings cross-check

The audit register contains 15 findings (E1–E15) listed in `Manuscript_Draft_v2.md` Appendix D. For each finding:

1. Look up the cited line in the audit's source artifact (typically `Phase_P5_OODA.md §3` cites Maren PDF page numbers; older artifacts cite text-extracted line numbers).
2. If the operator has supplied the original Maren PDF, open that PDF at the cited page and verify the verbatim quotation is correct.
3. If the operator has not supplied the original PDF, mark the finding as "not independently verifiable from this repo alone" and skip to the next.

The findings already verified in Phase P5 (per Phase_P5_OODA.md §3 and Provenance_Map.csv rows P-128–P-139) must remain verified. If you find a discrepancy with what Phase P5 claims, that is itself an audit-register entry — document it.

## Phase 1.4 — Provenance map sample

`Provenance_Map.csv` has 145 rows. Sample 20 random rows and for each:

1. Read the cited source anchor (file:line or test reference).
2. Verify the cited content is what the row says it is.
3. Confirm the evidence class (A/B/C/D/E/U) is appropriate.

Pass criterion: 20/20 verifiable. If any row fails, document it in your report.

## Phase 1.5 — Cross-source consistency

1. Verify v2 manuscript Appendix E.2's four-session AI provenance is consistent with what `Phase_P{1,2,3,4,5}_OODA.md` actually documents. (Spot check: the four sessions should add up to five OODA worksheets — P5 was added after the original four-session disclosure.)
2. Verify the bound direction: the manuscript should consistently say $F[q] \ge -\ln p(y\mid m)$ (UPPER bound on surprisal), and ELBO $\le \ln p(y\mid m)$ (LOWER bound on log evidence). If you find a bound-direction inconsistency in v2 (not in the audited TR), that is a regression and a Phase-1 failure.
3. Verify the Complexity-Accuracy form (Form 3) added in Phase P2 is consistent with the energy-minus-entropy form (Form 1) and the divergence-plus-evidence form (Form 2). Test 11 should mechanically verify this.

## Phase 1 — Acceptance criteria

You may proceed to Phase 2 if and only if **all** of the following hold:

- [ ] All 87 pytest tests pass on Python 3.11, 3.12, AND 3.13.
- [ ] `diff out.txt reference_output.txt` produces zero output on all three Python versions.
- [ ] Determinism check passes (two runs identical).
- [ ] Docker image builds and runs successfully.
- [ ] CITATION.cff parses cleanly.
- [ ] The 8 known-correct values in Phase 1.2 match.
- [ ] All audit findings independently checkable from your environment have been checked.
- [ ] Sample of 20 Provenance_Map rows: 20/20 verifiable.
- [ ] No bound-direction inconsistency in v2.
- [ ] Form 1 = Form 2 = Form 3 verified by Test 11.

If all pass, proceed to Phase 2. If any fail, write the verification report, push to a `verification-report` branch, and STOP.

---

# Phase 2 — UI/UX Construction (only if Phase 1 fully passes)

You are now building the user interface and user experience for this manuscript and its associated mathematics and agents. The bar is **production-quality, beautiful, accessible, fast, accurate**. This is not a sketch. The repo is going to be cited by working scientists and AI researchers; the UI is part of how the work is received.

## Three application surfaces

The UI consists of three integrated surfaces (one application, three views):

### Surface A — Document Viewer

A first-class reader experience for every Markdown / CSV / JSON / source-code document in the repo. Specifically:

- **File tree on the left** with collapsible sections grouped by purpose (Manuscript, Audit chain, OODA worksheets, Provenance, Reproducibility, etc.).
- **Markdown rendering with full math typesetting** (KaTeX for inline + display math; ensure $\LaTeX$ macros render correctly, including `\mathbb`, `\tilde`, `\hat`, `\\|`, etc.).
- **Cross-references resolve as clickable links.** When the manuscript says `see [Phase_P5_OODA.md §3]`, that link must work — open the destination, scroll to the right section.
- **Tab management**: open multiple documents side-by-side; reorder; close.
- **Search**: full-text search across all documents with relevance ranking. Hits highlight in context.
- **Provenance map as an interactive table** with column sorting, filtering by evidence class (A/B/C/D/E/U), filtering by phase (Claude-P0 through Claude-P5).
- **Audit register browser**: E1–E15 displayed as cards with severity color-coding (Serious red, Moderate amber, Minor yellow); each card expands to the full audit text + the Phase-P5-verified PDF citation.
- **Dark mode and light mode** with a toggle. Both must look professional.
- **Responsive**: works on a 4K monitor, laptop, and tablet. Mobile is acceptable as a degraded experience but not the priority.
- **Accessibility**: WCAG AA compliance — keyboard navigation, screen-reader semantics, sufficient color contrast.

### Surface B — Math Runner

An interactive exploration of the 11 numerical demonstrations in `manuscript-v2-reproducibility/`. Specifically:

- **Test selector**: pick from Test 1 through Test 11 (each labeled with what it demonstrates — "Discrete two-state model", "Bad approximate posterior sweep", etc.).
- **Setup panel**: human-readable description of what the test does, the model parameters, and the expected outcome.
- **Parameter controls**: where the test has parameters that meaningfully vary (e.g., Test 2's $q(\eta=1)$ sweep, Test 4's $q$ mean and variance), provide sliders or numeric inputs for the user to vary them and see the math respond.
- **Run button** that executes the test and displays the output side-by-side with the reference output for comparison.
- **Plots**:
  - Test 1, 2: bar chart of $F[q]$ vs $q(\eta=1)$ alongside KL and surprisal lines.
  - Test 3: warning visualization for the support-mismatch divergence.
  - Test 4: Gaussian curves overlaid (prior, posterior, variational $q$); $F[q]$ as a function of $(m_q, v_q)$ shown as a contour plot.
  - Test 5: bar chart showing $F[q] = -\mathrm{ELBO}[q]$ exactly.
  - Test 6: side-by-side comparison of iid surprisal vs. literal-sum expansion.
  - Test 7: $\mathbb{E}_\eta[\eta^2]$ vs $\mathbb{E}_r[r^2]$ visualization with Jacobian correction shown.
  - Test 8: heatmap of CI residuals across the 4 blanket settings.
  - Test 9: bar chart showing the sign-flip from B-1 (no minus) to B-8 (with minus).
  - Test 10: Bethe vs. $F[q]$ values shown side by side.
  - Test 11: Form 1, Form 2, Form 3 values shown in three columns with equality verified.
- **"Compare with reference"** button that re-runs and verifies bit-identical output to `reference_output.txt`.
- **Export to JSON / CSV** for any computation result, so a reader can reproduce in their own tooling.
- **Math typeset throughout** — every equation and formula in the panel uses KaTeX.

### Surface C — Active Inference Agent Runner

This surface uses **Jido** — an Elixir-based autonomous-agent framework (v2.2.0) that the operator has mandated for all agent work in this repo. The mandate, the active-inference-↔-Jido conceptual mapping, and the binding usage rules are in [`AGENTS.md`](AGENTS.md). **Read AGENTS.md first.** Then:

1. Read the curated knowledgebase at [`knowledgebase/jido/`](knowledgebase/jido/), in this order: `MASTER-INDEX.md` → `00-philosophy.md` (invariants; non-negotiable) → `25-cheatsheet.md` (common patterns) → topic files for what you need to build (the topic map is in `AGENTS.md`).
2. The upstream Jido source-of-truth is referenced as a git submodule at `jido/` (https://github.com/agentjido/jido.git); if it is present after `git submodule update --init --recursive`, treat `jido/lib/` and `jido/test/` as authoritative when the knowledgebase and source disagree. If the submodule is not yet initialized in your clone, the knowledgebase is sufficient for the agent scope below.
3. **Hard constraints (from AGENTS.md)** — these are non-negotiable:
   - Pure `cmd/2` contract: same input must produce same `{agent, directives}` output; no side effects, no I/O, no randomness inside `cmd/2`.
   - Directives describe effects; they do not mutate state directly.
   - Zoi-first schemas for all agent, plugin, signal, and directive contracts.
   - Cross-agent communication uses signals (`Jido.Signal`), not direct process messages.
   - Test pure `cmd/2` logic first; add `AgentServer` integration tests second.
   - Run `mix q` (format, compile, credo, dialyzer) before any commit that touches agent code.
   - Forbidden: agent loops outside `use Jido.Agent`; LLM API calls inside `cmd/2`; `Process.sleep/1` in agent tests; ad-hoc `GenServer` calls instead of `Jido.AgentServer`; bypassing Markov blanket boundaries.
4. **Elixir / OTP requirements**: Elixir `~> 1.18`, OTP `27+`.
5. Implement at least **two** active-inference agents using Jido's primitives:
   - **Agent A — Discrete two-state agent**: takes the toy model from Test 1 (binary $\eta$, binary $y$ observation), updates beliefs by perceptual inference (variational free energy minimization), and selects actions to drive the model's surprisal lower over time. Display in real-time: agent's belief $q(\eta)$, observation history, action history, $F[q]$ trajectory.
   - **Agent B — Continuous Gaussian agent**: takes the Test 4 conjugate Gaussian setup, agent maintains a Gaussian variational posterior, observes $y$ values, updates the posterior via gradient descent on $F[q]$, and emits actions to influence the next observation. Display: posterior $\mu, \sigma$ trajectories; $F[q]$ vs. log-evidence ELBO; active-inference loop animation.
3. **Run modes**:
   - **Episodic**: agent runs for $N$ steps, then resets. User selects $N$.
   - **Continuous**: agent runs indefinitely; user can step, pause, resume.
   - **Replay**: load a prior session and replay it.
4. **Visualize**:
   - Agent's belief distribution as a live density plot.
   - Variational free energy as a live time series.
   - Sensory states, active states, internal states as separate panels (the Markov-blanket partition).
   - Generative-process state vs. generative-model belief as overlay (so the model-vs-process distinction is visible — this is one of the manuscript's central pedagogical points; the UI should make it visible).
5. **Save / load**: agents and their state saveable to JSON; loadable back into the runner.

Jido is Elixir/OTP/BEAM, with Phoenix integration documented in `knowledgebase/jido/23-integrations.md`. The active-inference ↔ Jido conceptual mapping in `AGENTS.md` is the canonical one — use it. Do not import any other agent framework (LangChain, AutoGen, CrewAI, custom ad-hoc loops); per `AGENTS.md`, those are explicitly forbidden in this repo for new agent work.

## Tech-stack guidance (you decide)

Choose a stack that meets the bar. Recommendations to consider:

- **Frontend**: Next.js 14+ App Router with TypeScript, Tailwind CSS, shadcn/ui, KaTeX for math, Zustand or Jotai for state, Tanstack Query for data.
- **Document/Markdown rendering**: react-markdown + remark-math + rehype-katex; for cross-refs, a remark plugin that resolves repo-relative links to in-app navigation events.
- **Math runner backend**: a thin Python FastAPI (or Bun/Deno-native, if you avoid Python) wrapping `audit_tests_v2.py` and the per-test functions. Or compile the tests to WebAssembly via Pyodide and run client-side — this would make the demo zero-server and embeddable on Vercel.
- **Agent runner backend**: Jido is Elixir/OTP/BEAM. Run a Phoenix application in a separate process (under a supervised OTP runtime, per Jido's `AgentServer` pattern); bridge to the Next.js frontend via WebSocket / Phoenix Channels. The agent code itself goes in `ui/apps/agents/` as an Elixir umbrella application.
- **Plots**: Plotly, ECharts, or Visx — your pick. Whatever lets you do live-updating with reasonable performance.
- **Search**: MiniSearch or Lunr for client-side; FlexSearch if you need more advanced features.
- **Hosting**: Vercel or Fly.io for the Next.js app; agent backend can be on Fly.io if Elixir/Phoenix.

You may use any other stack you can defend. The criteria are: production-quality output, fast page loads, no hydration mismatches, no broken cross-references, no math-rendering regressions.

## Repository organization for Phase 2

Add the UI as a subdirectory `ui/` at the top of the repo. Inside:

```
ui/
├── README.md                    (how to install, run, deploy)
├── package.json (or equivalent)
├── apps/
│   ├── web/                     (Next.js app)
│   └── agents/                  (JIDO agent backend, after operator supplies)
├── packages/
│   ├── ui-components/           (reusable React components)
│   ├── doc-renderer/            (markdown+math rendering)
│   ├── math-runner-client/      (frontend bindings to the math API)
│   └── agent-runner-client/     (frontend bindings to JIDO)
├── e2e/                         (Playwright or similar)
└── docs/                        (UI architecture decisions)
```

Use a monorepo tool if appropriate (Turborepo, Nx, pnpm workspaces).

## Acceptance criteria for Phase 2

The UI is "done" when **all** of the following hold:

- [ ] User can navigate every Markdown file in the repo via the document viewer with no broken links.
- [ ] All math in all documents renders correctly (no KaTeX errors visible to the user).
- [ ] The provenance map is interactive, sortable, filterable.
- [ ] All 11 numerical demonstrations are runnable from the UI; outputs match `reference_output.txt` for the canonical parameters.
- [ ] Both Agent A and Agent B run on JIDO and visualize their belief and free-energy trajectories.
- [ ] The UI passes Lighthouse Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 on `npm run build && npm run start`.
- [ ] Dark/light mode work correctly across all three surfaces.
- [ ] E2E tests cover the document viewer's main flows, all 11 math demos, and the agent runner's main flows.
- [ ] CI in the existing `.github/workflows/ci.yml` is extended to also run the UI build and E2E tests.
- [ ] A new top-level `ui/README.md` documents how to install, run, and deploy.
- [ ] AI authorship and contribution disclosure (matching the existing style in the project) is present in the UI footer.
- [ ] The audit chain remains intact — you have not modified any of the existing manuscript or audit documents to make the UI work; the UI is a separate layer.

## Project ethic — read this before writing any code

1. **Do not break the audit chain.** Every existing claim in the manuscript, audit, plan, and OODA worksheets is anchored to a verifiable source. If you discover something is wrong while building the UI, document it in the audit-register style and surface it to the operator — do not silently rewrite history.
2. **Do not invent novel mathematics.** If you find yourself wanting to add new mathematical content, stop and ask the operator. The repo's central virtue is that it does not make novel mathematical claims; it audits and re-presents existing standard results.
3. **Provenance is forever.** Every file you add to the repo has authorship and a license header (or equivalent). Document AI authorship per the existing style.
4. **Reproducibility is forever.** Anything you compute in the UI, anyone must be able to compute outside the UI. The UI is a viewing layer over `audit_tests_v2.py`; it is not the source of truth.
5. **Be honest about what you cannot verify.** If JIDO is not what the operator described, or if you find yourself implementing something the operator did not specify, write it down.
6. **Layer 2 is sacred.** Do not pretend you have done Layer 2 work that requires human expert verification (per `Layer2_Inspection_Specs.md`). Layer 2 gates L2-1 through L2-5 and L2-7, L2-8 remain pending. Your UI may surface them as pending items in a "Layer 2 status" panel.

## Output format for your work

When done with Phase 1, produce:

- `Codex_Phase1_Verification_Report.md` at the top of the repo, documenting every check you ran, every result, and any deviations from the expected values.

When done with Phase 2 (only if Phase 1 fully passes), produce:

- The complete `ui/` subdirectory with a working build.
- `Codex_Phase2_UI_Report.md` documenting the architecture decisions, tech stack, deployment instructions, and known limitations.
- An updated `Provenance_Map.csv` with rows describing the UI's verification artifacts.

For each commit you make, follow the commit-message style of the existing repo (descriptive subject, multi-paragraph body, Co-Authored-By trailer).

## When in doubt

When in doubt, do the following in this order:

1. Re-read `Manuscript_Draft_v2.md` Appendix E.2 (the four-AI-session provenance) and `Phase_P5_OODA.md` (the latest Layer-2 settlement) — they describe the project's epistemic posture more clearly than any other artifact.
2. Re-read `Audit_Remediation_Plan.md` §0 (architecture, two layers).
3. Pause and write your reasoning in a comment or scratch document before acting.
4. If still in doubt, surface the question to the operator and wait. Do not guess on irreversible actions.

# === PROMPT ENDS HERE ===

---

## Operator notes (NOT part of the prompt; for the operator's reference)

### What you (the operator) provide to Codex alongside this prompt

1. The repository URL (already in the prompt) or a fresh clone if Codex prefers.
2. The original Maren PDF (`1906.08804v6.pdf`) so Codex can perform the Phase-1.3 PDF-direct cross-checks.
3. ~~The JIDO SDK / source code~~ — **already in the repo** as of commit `261d7a2`. Curated reference at `knowledgebase/jido/` (27 markdown files); upstream submodule reference and binding rules at `AGENTS.md`. Codex should run `git submodule update --init --recursive` after cloning to pull the upstream `jido/` source if it has been added; otherwise the knowledgebase is sufficient for the agent scope.
4. Any deployment credentials Codex needs (Vercel token, Fly.io token, GitHub PAT for the eventual UI commits).
5. (Optional) A list of existing UI design preferences you have — specific colors, fonts, branding — if you want a particular look. Otherwise Codex chooses.

### What to expect from Codex

- A Phase-1 verification report within hours of starting.
- A working UI within days to weeks of starting Phase 2, depending on JIDO complexity.
- Possibly some questions during Phase 2 — Codex is permitted to ask, particularly about JIDO specifics.

### What to NOT expect

- Codex will not silently fix audit findings. The prompt is explicit that any discrepancy is to be documented, not silently rewritten.
- Codex may discover Phase-1 failures. That's the right outcome if there are real issues; do not pressure Codex to skip checks.
- Codex's UI will not be a research result. It is a *viewing/running layer* on top of research that is already in place. The math is in `audit_tests_v2.py`; the UI exposes it.

### Canonical commit hash at time of writing this prompt

Latest commit on `main` when this prompt was first created: `4adc6b5` (P-26 backfill).

---

## HANDOFF STATE — Updated 2026-04-26 after Claude Code remediation

**Phase 1 gates 1.1 and 1.2 have been independently run by Claude Code and pass.**
When you (GPT Codex) clone the repo at the current `main` HEAD, you should expect:

### What was fixed (see `Codex_Phase1_Verification_Report.md` for details)

| # | Fix | Root cause | Commit |
|---|-----|-----------|--------|
| 1 | `audit_tests_v2.py` — removed dead numpy import + conditional footer | Platform-dependent stdout on Python 3.11/3.13 when numpy absent | (current HEAD) |
| 2 | `audit_tests_v2.py` — added `sys.stdout.reconfigure(newline='\n')` | CRLF/LF mismatch: Windows CRLF vs. Docker Linux LF caused every line to differ | (current HEAD) |
| 3 | `reference_output.txt` — regenerated with LF endings | Was committed from Windows with CRLF | (current HEAD) |
| 4 | `manuscript-v2-reproducibility/.gitattributes` — added `* text=auto eol=lf` | Prevents future CRLF re-contamination on Windows checkout | (current HEAD) |
| 5 | `CITATION.cff` — added `authors` to ORCHESTRATE reference; removed `affiliation` from entity-type author entries | CFF 1.2.0 schema: `references` items require `authors`; entity items do not support `affiliation` | (current HEAD) |

### Verified passing (as of current HEAD)

- ✅ `diff out.txt reference_output.txt` → zero output (Windows Python 3.12, locally)
- ✅ Docker build succeeds (`aoaiop-tests:latest`)
- ✅ `docker run --rm aoaiop-tests` → `ALL TESTS PASS BIT-IDENTICALLY`
- ✅ `docker run --rm aoaiop-tests pytest tests/ -v` → `87 passed in 0.18s`
- ✅ `cffconvert --validate -i CITATION.cff` → `Citation metadata are valid according to schema version 1.2.0.`

### What you still need to run (Phase 1.2 multi-version confirmation)

The fixes resolve the 3.11/3.13 failures. You should re-confirm:
- `diff out.txt reference_output.txt` on **Python 3.11** and **3.13** (should now pass because Python forces LF via `sys.stdout.reconfigure`).

### Phase 1.3–1.5 status

Not yet executed. These require the original Maren PDF and a manual 20-row provenance sample. Execute them as specified in the prompt before beginning Phase 2.

### Phase 2 gate status

**Phase 2 may begin** once you have confirmed Phase 1.3–1.5 pass (or are documented as non-blocking in your environment). The critical Phase 1.2 gates are all green.

### Current `main` HEAD

Run `git log --oneline -3` after cloning to confirm you are at or after the remediation commits (they follow `a7f90fb` which was the original Codex Phase 1 verification report commit).
