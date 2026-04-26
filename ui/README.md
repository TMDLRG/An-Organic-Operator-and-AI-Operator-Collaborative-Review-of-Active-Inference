# AOAIOP UI

User interface for the **An-Organic-Operator-and-AI-Operator Collaborative Review of Active Inference**.

Three surfaces in one Next.js 14 app:

- **Surface A — Documents.** Read every Markdown / CSV / source file in the repo with full KaTeX math rendering, cross-references, and dark mode.
- **Surface B — Math Runner.** Run all 11 deterministic numerical demonstrations from `manuscript-v2-reproducibility/audit_tests_v2.py` interactively in the browser. TypeScript port of the test suite, faithful to IEEE 754 double-precision math.
- **Surface C — Agents.** Two active-inference agents (discrete two-state and continuous Gaussian) running live, with belief / free-energy / action trajectories. TypeScript reference implementation; Jido (Elixir/OTP/BEAM) scaffolding sibling at [`agents-elixir/`](agents-elixir/).

## Install

```bash
cd ui
npm install
```

## Develop

```bash
npm run dev          # localhost:3000
```

## Build & start

```bash
npm run build
npm start
```

## Type-check

```bash
npm run typecheck
```

## Architecture

```
ui/
├── app/
│   ├── layout.tsx               root layout, theme bootstrap
│   ├── page.tsx                 home / overview
│   ├── docs/                    Surface A
│   │   ├── layout.tsx           file-tree sidebar
│   │   ├── page.tsx             docs index
│   │   └── [...slug]/page.tsx   markdown / csv / source viewer
│   ├── math/page.tsx            Surface B
│   └── agents/page.tsx          Surface C
├── components/
│   ├── ui/                      nav, theme toggle
│   ├── doc-viewer/              markdown + CSV table
│   ├── math-runner/             test runner + plots
│   └── agent-runner/            agent panels + viz
├── lib/
│   ├── docs.ts                  repo file discovery + read API
│   ├── math-tests.ts            TypeScript port of audit_tests_v2.py
│   └── agents.ts                active inference agent reference impl
├── agents-elixir/               Jido (Elixir/OTP/BEAM) scaffolding
└── public/
```

## Tech stack

- **Next.js 14** (App Router) + **TypeScript 5** + **React 18**
- **Tailwind CSS 3** for styling, custom CSS variables for theming
- **react-markdown** + **remark-math** + **rehype-katex** for math rendering
- **Recharts** for time-series and bar plots
- **lucide-react** for icons
- **Pure-TS math** for instant in-browser test execution (no Pyodide required for current tests, since the Python source uses only `math` stdlib operations that map 1:1 to JS `Math`)

## How the UI relates to the audit chain

The UI is a **viewing/running layer** over the existing audit artifacts. It does **not** modify or replace any source-of-truth file:

- Markdown files in the repo remain authoritative; the doc viewer just renders them.
- `audit_tests_v2.py` remains the Python oracle; the TypeScript port in `lib/math-tests.ts` is for interactive feedback. The Python source's bit-identical reference output (`reference_output.txt`) and 87 pytest assertions remain the canonical Class-A evidence.
- `AGENTS.md` and `knowledgebase/jido/` remain the binding rules for any agent code; the TypeScript agents in `lib/agents.ts` are pedagogical reference implementations, with the production-grade Jido versions in `agents-elixir/`.

## Active inference agents

Two reference agents are implemented in `lib/agents.ts`:

- **Discrete agent** — Test-1-model: η ∈ {0,1}, perceptual inference via exact Bayesian update, action selection via expected free energy minimization (homeostasis: drive obs predictability higher).
- **Gaussian agent** — Test-4-model: conjugate Gaussian, action ∈ {-1, 0, +1}, belief drives toward prior mean.

Both agents:
- maintain a variational posterior `q` over hidden state `η`
- update `q` by minimizing F[q] on each observation
- emit an action that minimizes expected future free energy

The Elixir reference implementation in `agents-elixir/` follows the binding contract from [`AGENTS.md`](../AGENTS.md):
- pure `cmd/2` (no I/O, no PRNG inside)
- directives describe effects (action emission)
- Zoi-first schemas
- `Jido.Signal` for inter-agent communication

When the operator initializes the upstream Jido submodule at `/jido`, the `agents-elixir/mix.exs` dependency line should be switched from `optional: true` to a pinned git ref (v2.2.0), and a Phoenix application can be added in `agents-elixir/lib/aoaiop_agents_web/` to expose the agents over WebSocket / Channels for the Next.js frontend to drive.

## What's deliberately out of scope (for now)

- A Phoenix WebSocket bridge from the Next.js frontend to the Elixir agents. The Elixir scaffolding is in place; the bridge can be added once the operator confirms the Phoenix runtime is up.
- Full client-side Pyodide execution of `audit_tests_v2.py`. The Python source uses only `math` stdlib functions that map 1:1 to JavaScript's `Math.log` / `Math.PI`, so the TypeScript port produces numerically identical results without paying the ~10s Pyodide load cost. The "compare to reference" gate already happens via Docker / CI.

## Deployment

Suitable for Vercel (Next.js native), Fly.io, or any Node 20+ host. The doc viewer reads files from the parent repo via `process.cwd() + "/.."`, so the working directory at runtime must be the `ui/` folder with the repo above it. For deployments where this isn't the case, snapshot the docs at build time (a follow-up enhancement).

## Authors and AI co-contributors

The UI was built under the same provenance discipline as the rest of the repo. See [LICENSE](../LICENSE) and [CITATION.cff](../CITATION.cff) for full attribution. Anthropic Claude scaffolded the UI under the operator's direction, following the binding rules in [`AGENTS.md`](../AGENTS.md) and the design brief in [`Codex_Verification_and_UI_Prompt.md`](../Codex_Verification_and_UI_Prompt.md) Phase 2.
