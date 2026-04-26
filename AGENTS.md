# AGENTS.md — Active Inference Agent Framework Policy

## Mandatory Framework: Jido

**All Active Inference agents, LLM-backed agents, and automated reasoning agents built in or for this repository MUST be implemented using [Jido](jido/) — the native Elixir autonomous-agent framework included as a git submodule at `jido/`.**

No other agent framework (LangChain, AutoGen, CrewAI, custom ad-hoc agent loops, etc.) is permitted for new agent work in this repository. This is a hard constraint, not a preference.

---

## Why Jido

Jido aligns with the mathematical architecture of this project:

- **Pure `cmd/2` contract** — agent state transitions are deterministic, immutable functions: `{updated_agent, directives}`. This mirrors the variational Bayes update: observations come in, beliefs update, actions (directives) are emitted.
- **Runtime separation** — side effects are described as typed `Directive` data structures and executed by the OTP runtime, not inline in agent logic. This enforces the generative-model / generative-process distinction that is central to active inference.
- **Signal-based cross-agent communication** — agents communicate via `Jido.Signal` (CloudEvents envelope), not direct process coupling. This maps naturally onto Markov blanket boundaries: agents only communicate through defined sensory/active state interfaces.
- **Supervised OTP runtime** — `Jido.AgentServer` wraps agents in fault-tolerant GenServer supervision trees. Long-running belief-updating agents do not crash silently.
- **AI is optional** — the core Jido package provides the agent architecture; `jido_ai` adds LLM integration when needed. You can run pure symbolic/mathematical active inference agents without any LLM dependency.

---

## Where Jido Lives In This Repo

```
jido/                  ← upstream git submodule (v2.2.0)
                         https://github.com/agentjido/jido.git
                         The canonical source of truth — Elixir code,
                         tests, guides/, AGENTS.md, usage-rules.md.

knowledgebase/jido/    ← curated, condensed reference for the framework.
                         27 topic files + MASTER-INDEX. Faster to read
                         than the upstream guides; cross-linked back to
                         jido/ for code-level details.
```

After cloning this repository, initialize the submodule:

```bash
git submodule update --init --recursive
```

---

## Required Reading Order (before writing any agent code)

LLM agents and human contributors must follow this order. Do not skip it. The knowledgebase is the fast path; the submodule is the authority.

1. **[`knowledgebase/jido/MASTER-INDEX.md`](knowledgebase/jido/MASTER-INDEX.md)** — navigation hub, ecosystem table, decision tree for "which runtime pattern do I need."
2. **[`knowledgebase/jido/00-philosophy.md`](knowledgebase/jido/00-philosophy.md)** — invariants, the `cmd/2` contract, what NOT to do. Non-negotiable.
3. **[`knowledgebase/jido/25-cheatsheet.md`](knowledgebase/jido/25-cheatsheet.md)** — common code patterns; tells you which module to reach for.
4. The specific topic file(s) for what you are building (see table below).
5. **Only then**, open the upstream submodule at [`jido/`](jido/) for code-level edge cases, signatures, or behavior the knowledgebase does not cover. Treat `jido/lib/` as authoritative when the two disagree, and flag the drift.

---

## Knowledgebase Topic Map

Use this map to jump directly to the right file when you know what you are building. All paths are under `knowledgebase/jido/`.

### Core model

| If you need to... | Read |
|---|---|
| Define an agent (`use Jido.Agent`, schemas, `cmd/2`, hooks) | [`01-agents.md`](knowledgebase/jido/01-agents.md) |
| Define an action (`use Jido.Action`, `run/2`) | [`02-actions.md`](knowledgebase/jido/02-actions.md) |
| Send/receive signals between agents | [`03-signals.md`](knowledgebase/jido/03-signals.md) |
| Emit effects (`Emit`, `SpawnAgent`, `Schedule`, `Cron`, `RunInstruction`) | [`04-directives.md`](knowledgebase/jido/04-directives.md) |
| Mutate agent state (`SetState`, `ReplaceState`, `SetPath`, etc.) | [`05-state-ops.md`](knowledgebase/jido/05-state-ops.md) |

### Runtime

| If you need to... | Read |
|---|---|
| Run a live agent (`use Jido`, `AgentServer`, `call/cast`) | [`06-runtime.md`](knowledgebase/jido/06-runtime.md) |
| Pick a strategy (`Direct`, `FSM`, custom) | [`07-strategies.md`](knowledgebase/jido/07-strategies.md) |
| Add a plugin (Identity / Thread / Memory or custom) | [`08-plugins.md`](knowledgebase/jido/08-plugins.md) |
| Add a sensor (`Jido.Sensor`, ingress directives) | [`09-sensors.md`](knowledgebase/jido/09-sensors.md) |

### Persistence & topology

| If you need to... | Read |
|---|---|
| Persist agent state, hibernate/thaw, journal | [`10-persistence.md`](knowledgebase/jido/10-persistence.md) |
| Compose multi-agent topologies (`Jido.Pod`, `ensure_node/3`) | [`11-pods.md`](knowledgebase/jido/11-pods.md) |
| Add multi-tenancy (`partition:`) | [`12-multi-tenancy.md`](knowledgebase/jido/12-multi-tenancy.md) |

### Coordination

| If you need to... | Read |
|---|---|
| Orchestrate fan-out, parent/child, aggregation | [`13-orchestration.md`](knowledgebase/jido/13-orchestration.md) |
| Handle orphan/adoption lifecycle | [`14-orphans-adoption.md`](knowledgebase/jido/14-orphans-adoption.md) |
| Schedule work (declarative `schedules:`, dynamic `Cron`) | [`15-scheduling.md`](knowledgebase/jido/15-scheduling.md) |
| Pool workers for throughput | [`16-worker-pools.md`](knowledgebase/jido/16-worker-pools.md) |

### Operations

| If you need to... | Read |
|---|---|
| Add telemetry, spans, tracers, metrics | [`17-observability.md`](knowledgebase/jido/17-observability.md) |
| Debug a misbehaving agent | [`18-debugging.md`](knowledgebase/jido/18-debugging.md) |
| Handle errors (`Jido.Error.*`, `Directive.Error`) | [`19-errors.md`](knowledgebase/jido/19-errors.md) |
| Write tests (`JidoTest.Case`, `Jido.await/2`, `mimic`) | [`20-testing.md`](knowledgebase/jido/20-testing.md) |
| Configure instances, supervision tree, env overrides | [`21-configuration.md`](knowledgebase/jido/21-configuration.md) |
| Discover registered agents/actions/signals | [`22-discovery.md`](knowledgebase/jido/22-discovery.md) |

### Integration & migration

| If you need to... | Read |
|---|---|
| Integrate with Phoenix/LiveView, Ash, PubSub | [`23-integrations.md`](knowledgebase/jido/23-integrations.md) |
| Upgrade from Jido 1.x | [`24-migration-1-to-2.md`](knowledgebase/jido/24-migration-1-to-2.md) |

---

## Knowledgebase Authority Rules

- The knowledgebase is **derived reference**, not a substitute for the upstream submodule. When in doubt, the answer is in [`jido/lib/`](jido/lib/) or [`jido/test/`](jido/test/), not in the topic file.
- The knowledgebase tracks Jido **v2.2.0**. If the submodule is updated to a newer version, treat the knowledgebase as `:uncertain` until refreshed.
- Cite both when justifying a design choice: knowledgebase file for the pattern, upstream file for the source.
- **Never** generate Jido code from memory or general LLM knowledge of "Elixir agent frameworks." Open the topic file. Open the upstream module. Read the actual function signatures.

---

## Active Inference ↔ Jido Mapping

| Active Inference Concept | Jido Construct |
|---|---|
| Agent internal states | `agent.state` (Zoi-validated schema) |
| Belief update / perception | `cmd/2` — pure state transition |
| Action / active states | `Directive` (e.g., `Directive.Emit`) |
| Sensory states (input) | `Jido.Signal` inbound |
| Markov blanket boundary | `AgentServer` public interface |
| Generative model | Agent module definition + schema |
| Policy inference / planning | Action sequences emitted as directives |
| Multi-agent hierarchy | `Directive.SpawnAgent` / `Directive.StopChild` |
| Expected free energy minimization | Agent `cmd/2` choosing minimum-cost action directive |

---

## Mandatory Standards (from `jido/usage-rules.md`)

Read `jido/usage-rules.md` and `jido/AGENTS.md` before writing any agent code. The binding rules are:

1. Keep `cmd/2` **pure** — same input must produce same `{agent, directives}` output. No side effects, no I/O, no randomness inside `cmd/2`.
2. Directives describe effects; they do not mutate state directly.
3. Use **Zoi-first schemas** for all agent, plugin, signal, and directive contracts.
4. Cross-agent communication uses signals, not direct process messages.
5. Plugins and sensors are isolated and composable; do not couple unrelated agent modules.
6. Test pure `cmd/2` logic first; add `AgentServer` integration tests second.
7. Run `mix q` (quality gate: format, compile, credo, dialyzer) before any commit that touches agent code.

---

## What Is Forbidden

- Implementing agent loops outside of the `use Jido.Agent` behaviour.
- Calling LLM APIs directly from agent `cmd/2` (use directives or sensors instead).
- Using `Process.sleep/1` in agent tests.
- Using ad-hoc `GenServer` calls instead of `Jido.AgentServer` for agent process management.
- Treating a `Directive` as a hidden state-mutation mechanism.
- Bypassing Markov blanket boundaries by reaching into another agent's internal state.

---

## Elixir / OTP Requirements

From `jido/AGENTS.md`:

- Elixir `~> 1.18`
- OTP `27+`

---

## References

- [`jido/README.md`](jido/README.md) — framework overview
- [`jido/AGENTS.md`](jido/AGENTS.md) — build and QA commands, architecture snapshot
- [`jido/usage-rules.md`](jido/usage-rules.md) — binding usage rules
- [`jido/guides/`](jido/guides/) — detailed guides
- https://hexdocs.pm/jido — API documentation
- https://jido.run — project site
