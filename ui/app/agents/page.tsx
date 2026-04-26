"use client";
import { useState } from "react";
import clsx from "clsx";
import { Bot } from "lucide-react";
import { DiscreteAgentPanel, GaussianAgentPanel } from "@/components/agent-runner/agent-panel";

const AGENTS = [
  {
    id: "discrete",
    title: "Agent A — Discrete two-state",
    desc: "Binary η ∈ {0,1}, binary y ∈ {0,1}. Agent observes y, updates q(η) by Bayes, picks action {flip, no-flip} that minimizes expected free energy.",
    model: "Test 1 (audit_tests_v2.py)",
  },
  {
    id: "gaussian",
    title: "Agent B — Continuous Gaussian",
    desc: "Conjugate Gaussian: prior N(0, 4), likelihood N(y; η, 1). Agent maintains a Gaussian posterior, observes y, picks action {-1, 0, +1} that drives belief toward homeostatic prior.",
    model: "Test 4 (audit_tests_v2.py)",
  },
] as const;

export default function AgentsPage() {
  const [active, setActive] = useState<typeof AGENTS[number]["id"]>("discrete");
  const a = AGENTS.find((x) => x.id === active)!;
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8 w-full">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-2">
        <Bot className="w-3.5 h-3.5" /> Active Inference Agents
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">Agents</h1>
      <p className="text-muted text-sm mb-6 max-w-3xl">
        Two reference active-inference agents. Each one minimizes variational free energy on perception
        and selects actions to minimize expected free energy. The TypeScript implementation here is the
        browser-first reference; an OTP/Phoenix implementation in Jido (Elixir, BEAM) lives in
        <code className="font-mono mx-1">/ui/agents-elixir/</code>and follows the binding rules in
        <a href="/docs/AGENTS.md" className="text-accent underline ml-1">AGENTS.md</a>.
      </p>

      <div className="flex gap-2 mb-6 border-b border-border">
        {AGENTS.map((x) => (
          <button
            key={x.id}
            onClick={() => setActive(x.id)}
            className={clsx(
              "px-4 py-2 text-sm border-b-2 -mb-px transition-colors",
              active === x.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
            )}
          >
            {x.title.replace("Agent A — ", "A · ").replace("Agent B — ", "B · ")}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">{a.title}</h2>
        <p className="text-sm text-muted">{a.desc}</p>
        <p className="text-xs text-muted mt-1">Model anchor: <code className="font-mono">{a.model}</code></p>
      </div>

      {active === "discrete" ? <DiscreteAgentPanel /> : <GaussianAgentPanel />}
    </div>
  );
}
