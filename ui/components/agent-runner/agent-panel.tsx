"use client";
import { useEffect, useRef, useState } from "react";
import {
  initDiscrete, stepDiscrete, DEFAULT_DISCRETE_PARAMS,
  initGaussian, stepGaussian, DEFAULT_GAUSSIAN_PARAMS,
  mulberry32, type DiscreteState, type GaussianState,
} from "@/lib/agents";
import { LinePlot } from "@/components/math-runner/plot";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

const COLOR_BELIEF = "rgb(56 189 248)";
const COLOR_TRUE = "rgb(244 114 182)";
const COLOR_F = "rgb(234 179 8)";
const COLOR_OBS = "rgb(120 113 108)";

function Btn({ onClick, children, kind = "default" }: { onClick: () => void; children: React.ReactNode; kind?: "default" | "primary" }) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border transition-colors " +
        (kind === "primary"
          ? "bg-accent text-white border-accent hover:opacity-90"
          : "bg-card border-border hover:bg-bg")
      }
    >
      {children}
    </button>
  );
}

export function DiscreteAgentPanel() {
  const [state, setState] = useState<DiscreteState>(initDiscrete());
  const [trueEta, setTrueEta] = useState<0 | 1>(1);
  const [seed, setSeed] = useState(20260426);
  const [running, setRunning] = useState(false);
  const rngRef = useRef(mulberry32(seed));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function reset(newSeed = seed) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    rngRef.current = mulberry32(newSeed);
    setState(initDiscrete());
    setTrueEta(1);
    setRunning(false);
  }

  function step() {
    setState((cur) => {
      const r = stepDiscrete(cur, DEFAULT_DISCRETE_PARAMS, trueEta, rngRef.current);
      setTrueEta(r.trueEta);
      return r.state;
    });
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(step, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, trueEta]);

  const data = state.history.map((h) => ({
    step: h.step, belief: h.qEta1, F: h.F, obs: h.obs, action: h.action,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Btn kind="primary" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Run"}
        </Btn>
        <Btn onClick={step}><StepForward className="w-4 h-4" /> Step</Btn>
        <Btn onClick={() => reset()}><RotateCcw className="w-4 h-4" /> Reset</Btn>
        <div className="ml-2 text-sm flex items-center gap-2">
          <span className="text-muted">seed</span>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            onBlur={() => reset()}
            className="w-28 px-2 py-1 rounded bg-card border border-border font-mono text-xs"
          />
        </div>
        <div className="ml-auto text-sm font-mono text-muted">
          step {state.step} · q(η=1)={state.qEta1.toFixed(4)} · η<sub>true</sub>={trueEta}
        </div>
      </div>

      <div className="border border-border bg-card rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-muted mb-3">Belief and free energy</h3>
        <LinePlot
          data={data}
          xKey="step"
          lines={[
            { key: "belief", label: "q(η=1)", color: COLOR_BELIEF },
            { key: "F", label: "F[q]", color: COLOR_F },
          ]}
          height={280}
        />
      </div>

      <div className="border border-border bg-card rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-muted mb-3">Markov-blanket partition (recent steps)</h3>
        <table className="w-full text-xs font-mono">
          <thead className="text-muted"><tr>
            <th className="text-left py-1">step</th>
            <th className="text-left">obs (sensory)</th>
            <th className="text-left">action (active)</th>
            <th className="text-left">q(η=1) (internal)</th>
            <th className="text-left">F[q]</th>
            <th className="text-left">−ln p(y)</th>
          </tr></thead>
          <tbody>
            {state.history.slice(-12).reverse().map((h) => (
              <tr key={h.step}>
                <td className="py-0.5">{h.step}</td>
                <td>{h.obs}</td>
                <td>{h.action}</td>
                <td>{h.qEta1.toFixed(4)}</td>
                <td>{h.F.toFixed(4)}</td>
                <td>{h.surprisal.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GaussianAgentPanel() {
  const [state, setState] = useState<GaussianState>(() => initGaussian(DEFAULT_GAUSSIAN_PARAMS));
  const [trueEta, setTrueEta] = useState(1.5);
  const [seed, setSeed] = useState(20260426);
  const [running, setRunning] = useState(false);
  const rngRef = useRef(mulberry32(seed));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function reset(newSeed = seed) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    rngRef.current = mulberry32(newSeed);
    setState(initGaussian(DEFAULT_GAUSSIAN_PARAMS));
    setTrueEta(1.5);
    setRunning(false);
  }

  function step() {
    setState((cur) => {
      const r = stepGaussian(cur, DEFAULT_GAUSSIAN_PARAMS, trueEta, rngRef.current);
      setTrueEta(r.trueEta);
      return r.state;
    });
  }

  useEffect(() => {
    if (running) intervalRef.current = setInterval(step, 250);
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, trueEta]);

  const data = state.history.map((h) => ({
    step: h.step, mq: h.mq, sigma: Math.sqrt(h.vq), F: h.F, obs: h.obs,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Btn kind="primary" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Run"}
        </Btn>
        <Btn onClick={step}><StepForward className="w-4 h-4" /> Step</Btn>
        <Btn onClick={() => reset()}><RotateCcw className="w-4 h-4" /> Reset</Btn>
        <div className="ml-2 text-sm flex items-center gap-2">
          <span className="text-muted">seed</span>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            onBlur={() => reset()}
            className="w-28 px-2 py-1 rounded bg-card border border-border font-mono text-xs"
          />
        </div>
        <div className="ml-auto text-sm font-mono text-muted">
          step {state.step} · m_q={state.mq.toFixed(3)} · σ_q={Math.sqrt(state.vq).toFixed(3)} · η<sub>true</sub>={trueEta.toFixed(3)}
        </div>
      </div>

      <div className="border border-border bg-card rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-muted mb-3">Posterior trajectory</h3>
        <LinePlot
          data={data}
          xKey="step"
          lines={[
            { key: "mq", label: "m_q (belief mean)", color: COLOR_BELIEF },
            { key: "sigma", label: "σ_q (belief std)", color: COLOR_F },
            { key: "obs", label: "observation y", color: COLOR_OBS },
          ]}
          height={280}
        />
      </div>

      <div className="border border-border bg-card rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-muted mb-3">Recent steps</h3>
        <table className="w-full text-xs font-mono">
          <thead className="text-muted"><tr>
            <th className="text-left py-1">step</th>
            <th className="text-left">obs</th>
            <th className="text-left">action</th>
            <th className="text-left">m_q</th>
            <th className="text-left">σ_q</th>
            <th className="text-left">F[q]</th>
          </tr></thead>
          <tbody>
            {state.history.slice(-12).reverse().map((h) => (
              <tr key={h.step}>
                <td className="py-0.5">{h.step}</td>
                <td>{h.obs.toFixed(3)}</td>
                <td>{h.action}</td>
                <td>{h.mq.toFixed(4)}</td>
                <td>{Math.sqrt(h.vq).toFixed(4)}</td>
                <td>{h.F.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
