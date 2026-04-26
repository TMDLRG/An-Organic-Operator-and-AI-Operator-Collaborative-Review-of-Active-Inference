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

## Submodule Location

```
jido/          ← git submodule: https://github.com/agentjido/jido.git
```

After cloning this repository, initialize the submodule:

```bash
git submodule update --init --recursive
```

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
