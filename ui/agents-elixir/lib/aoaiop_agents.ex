defmodule AoaiopAgents do
  @moduledoc """
  Top-level documentation for the AOAIOP active-inference agent reference
  implementation under the Jido contract.

  ## Contract (binding; see /AGENTS.md)

    * Every agent uses `use Jido.Agent`
    * `cmd/2` is pure: same input → same `{agent, directives}`; no I/O,
      no LLM calls, no `Process.sleep/1`, no randomness
    * Directives describe effects; they do not mutate state directly
    * Zoi-first schemas for state, commands, and signals
    * Cross-agent communication uses `Jido.Signal`, not raw process messages
    * Run `mix q` (format, compile, credo) before declaring agent code complete

  ## Structure

  Two agents reference the manuscript-v2-reproducibility test models:

    * `AoaiopAgents.DiscreteAgent`   — Test 1 (binary η, binary y)
    * `AoaiopAgents.GaussianAgent`   — Test 4 (Gaussian conjugate)

  Both expose the same operations:

    * `init/1`        — construct an initial agent state
    * `cmd/2`         — pure step (perceptual inference + action selection)
    * `signals/0`     — list of `Jido.Signal` types this agent emits
    * `directives/0`  — list of `Jido.Directive` types this agent emits

  ## Active inference ↔ Jido mapping

  | Active inference | Jido construct |
  |---|---|
  | agent state (η posterior) | Zoi schema |
  | belief update on obs | `cmd/2` (pure) |
  | active states (action) | `Jido.Directive` |
  | sensory states (obs) | inbound `Jido.Signal` |
  | Markov-blanket boundary | `Jido.AgentServer` process |
  | inter-agent communication | outbound `Jido.Signal` |

  See knowledgebase/jido/MASTER-INDEX.md for the curated topic map.
  """
end
