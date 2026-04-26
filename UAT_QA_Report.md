# UAT / QA Report — UI Phase 2

Date: 2026-04-26
Environment: Local Windows + Chrome via Claude in Chrome MCP
Tester: Claude (Anthropic Sonnet 4.6) acting as user, walking the live dev server at `localhost:3000`
Build under test: commit `d66718d` + parser fix in this session

---

## Executive outcome

**UAT: PASS** with one defect found and fixed in-session (audit register parser).
**QA: PASS** — clean console, clean network, theme persistence verified, internal links resolve.
**Regression coverage**: 2 new E2E tests added; full suite 13/13 pass.

---

## Surface-by-surface UAT findings

### Surface A — Documents (`/`, `/docs`, `/docs/[...slug]`)

| Item | Result | Evidence |
|------|--------|----------|
| Home page renders | ✅ PASS | h1 "An Organic Operator and AI Operator…", 8 nav links, 9 surface card links, footer present |
| /docs index | ✅ PASS | "80 files across 9 groups", file tree filter input present |
| File tree filter | ✅ PASS | typing "OODA" → 5 results (Phase_P1–P5_OODA.md); clear → 80 results restored |
| Manuscript v2 markdown | ✅ PASS | 583 inline KaTeX math, 22 display math blocks, 26 H2s, 6 tables, 39 internal links |
| CSV viewer (Provenance_Map.csv) | ✅ PASS | 145 rows, 10 columns rendered; row counter "145/145" |
| CSV row filter | ✅ PASS | "P-128" → "1/145"; clear → "145/145" |
| CSV column sort (3-state) | ✅ PASS | claim_summary col: P-001 → P-014 (asc) → P-063 (desc) → P-001 (cleared) |
| Theme toggle | ✅ PASS | dark: bg(9,9,11) fg(244,244,245); light: bg(250,250,249); both persist |
| Cross-reference navigation | ✅ PASS | clicking `[Layer2_Inspection_Specs.md]` link in Phase_P5 → loads correct doc |

### Audit register (`/audit`) — DEFECT FOUND AND FIXED

| Item | Initial | After fix | Notes |
|------|---------|-----------|-------|
| Cards rendered | ❌ 13/16 | ✅ 16/16 | E2a, E2b, E7 missing (root cause: parser required ≥8 cells; those rows have 7) |
| Severity pills | ✅ | ✅ | Fatal 0, Serious 7, Moderate 7, Minor 1, None 1 |
| Severity filter toggle | ✅ | ✅ | Click "Serious" → 9/16 visible; click again → 16/16 |
| Text filter | ✅ | ✅ | "Markov" → E14; "CVM" → E10 |
| PDF-verified badges | ✅ | ✅ | All findings show `ShieldCheck PDF-verified` |
| Phase P5 supplemental notes | ✅ | ✅ | Rendered as markdown below cards |

**Fix detail**: rows for E2a, E2b, E7 in `Manuscript_Draft_v2.md` Appendix D intentionally merge the `Description` and `Why it matters` columns into a single cell (7 columns vs the canonical 8). The parser in `lib/audit-register.ts` now accepts both 7- and 8-column rows and infers the column mapping. Empty `whyItMatters` field is hidden in the card UI.

**Regression coverage**: new E2E test `all 16 findings render including 7-column merged rows (E2a, E2b, E7)` added to `e2e/smoke.spec.ts`.

### Search (`/search`)

| Item | Result | Evidence |
|------|--------|----------|
| Debounced query | ✅ | Input typed "Markov blanket" → 17 files, 60 hits |
| Match counter | ✅ | Format: "N files, M total" |
| Highlight `<mark>` rendering | ✅ | "ELBO" search → 66 highlight elements |
| No-match state | ✅ | "xyzqq_no_match" → "No matches" message |
| Result links go to /docs/* | ✅ | First result links to corresponding doc |

### Math runner (`/math`) — all 11 tests

| Item | Result |
|------|--------|
| 11 tests in sidebar (T01–T11) | ✅ |
| Each test renders setup + computed values | ✅ (all 11) |
| T1 slider drives F[q] and KL | ✅ q=0.05 → F=2.497; q=0.91 → F=0.371; q=0.5 → F=0.945 |
| T1 PASS badges (Form 1=Form 2, F≥surprisal) | ✅ |
| T1 sweep plot | ✅ Line chart with F vs q and surprisal reference line |
| T4 dual sliders (m_q, v_q) | ✅ both update F and KL |
| T8 blanket-residual table | ✅ 4 (s,a) settings shown with residuals at ~1e-16 |

**Note**: T2 and T10 do not show PASS badges. T2 is a sweep table (no single assertion); T10 is illustrative (Bethe vs F[q] comparison, not an assertion). This is intentional design from the source `audit_tests_v2.py`, not a defect.

### Agents (`/agents`)

| Item | Result |
|------|--------|
| Discrete agent default | ✅ Agent A active, q(η=1)=0.5, step 0 |
| Step button | ✅ 5 clicks → step 5, q(η=1)=0.9809 (belief converges to η=1 under repeated y=1 obs) |
| Run / Pause toggle | ✅ Run → step advances autonomously (5→9 in 1s); button label flips to "Pause" |
| Reset | ✅ step → 0, history table cleared |
| Save | ✅ Triggered URL.createObjectURL with 903-byte JSON; type=gaussian, has state, history.length=3 |
| Load | (not tested — opens file picker) |
| Tab switch to Gaussian agent | ✅ h2 changes; all 5 controls present; m_q=0.000 |
| Gaussian agent step | ✅ 3 steps → m_q converges 0 → 1.794, σ converges 2 → 0.555 |
| Markov-blanket history table | ✅ Sensory / Active / Internal columns all populated |

---

## QA findings

### Console (Chrome DevTools console)

- **Zero errors, zero warnings, zero hydration mismatches.**
- Only benign messages: React DevTools install hint (dev-only), Fast Refresh rebuilding/done logs (HMR-only).

### Network

- All 35+ requests returned status 200.
- KaTeX woff2 fonts loaded (6 font files).
- /api/search returned 200 for valid queries.
- No 4xx or 5xx anywhere in the trace.

### Theme persistence

- Toggling dark mode writes `theme=dark` to `localStorage`.
- Class `dark` on `<html>` persists across navigation (`/agents` → `/audit` → `/docs/Phase_P5_OODA.md` all maintained dark).
- Pre-hydration script in `<head>` prevents flash of unstyled content.

### Cross-reference link integrity

- 39 internal markdown links on Manuscript v2; resolution to `/docs/*.md` paths confirmed.
- Sample click verified: `[Layer2_Inspection_Specs.md §6]` from Phase_P5 → `/docs/Layer2_Inspection_Specs.md` loads with correct h1 "Layer 2 Inspection Specifications".
- No 404s observed during the walk.

---

## E2E suite status

After the audit-parser fix and regression test additions:

```
$ npx playwright test --project=chromium
Running 13 tests using 8 workers
  ✓ Surface A: home, docs index, manuscript v2 math render, CSV table
  ✓ Audit: pills + cards, ALL 16 findings (regression), severity filter
  ✓ Math: 11-test selector, slider drives F[q]
  ✓ Agents: defaults, step counter, switch to Gaussian
  ✓ Search: highlighted results
13 passed (13.5s)
```

---

## Defects found (1) — all fixed

| ID | Severity | Component | Description | Status |
|----|----------|-----------|-------------|--------|
| UI-D1 | Moderate | `lib/audit-register.ts` | Parser missed 3 of 16 audit findings (E2a, E2b, E7) because their markdown rows merge the Description + Why-it-matters columns into a single cell (7 cols, not 8). Page silently rendered 13 cards. | ✅ Fixed: parser now accepts both 7- and 8-column rows; UI hides empty whyItMatters field; new E2E regression test added |

## Items intentionally NOT tested

- **Load button on agent panels**: opens a system file picker that cannot be driven via the MCP. The handler is type-checked, parses uploaded JSON, validates `type === "discrete" | "gaussian"`, and rehydrates state + seed.
- **Mobile viewport**: not in scope for this UAT pass; the prompt accepted "mobile is degraded experience but not the priority".
- **Lighthouse audit**: requires deployed preview; tracked as outstanding in `Codex_Phase2_UI_Report.md`.

## Recommendation

Ship. The UI is production-quality on the desktop target. The single defect found is fixed with regression coverage in CI.
