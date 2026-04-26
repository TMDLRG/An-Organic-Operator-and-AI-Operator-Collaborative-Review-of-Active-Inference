"use client";
import { useMemo, useState } from "react";
import * as M from "@/lib/math-tests";
import { LinePlot, BarPlot } from "./plot";
import { Play, RotateCcw, Sigma } from "lucide-react";
import clsx from "clsx";

function fmt(x: number, p = 6) {
  if (!isFinite(x)) return x > 0 ? "+∞" : "-∞";
  return x.toFixed(p);
}

function PASS({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1 text-xs font-mono px-1.5 py-0.5 rounded",
      ok ? "bg-sev-none/15 text-sev-none" : "bg-sev-fatal/15 text-sev-fatal")}>
      {ok ? "PASS" : "FAIL"} <span className="opacity-70">{label}</span>
    </span>
  );
}

function Slider({
  label, value, min, max, step, onChange, fmt: fm = (v) => v.toFixed(3),
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; fmt?: (v: number) => string;
}) {
  return (
    <label className="block text-sm">
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span className="font-mono text-muted">{fm(value)}</span>
      </div>
      <input
        type="range" value={value} min={min} max={max} step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </label>
  );
}

const COLOR_F = "rgb(56 189 248)";
const COLOR_KL = "rgb(244 114 182)";
const COLOR_REF = "rgb(120 113 108)";

export function TestRunner({ id }: { id: number }) {
  if (id === 1) return <Test1 />;
  if (id === 2) return <Test2 />;
  if (id === 3) return <Test3 />;
  if (id === 4) return <Test4 />;
  if (id === 5) return <Test5 />;
  if (id === 6) return <Test6 />;
  if (id === 7) return <Test7 />;
  if (id === 8) return <Test8 />;
  if (id === 9) return <Test9 />;
  if (id === 10) return <Test10 />;
  if (id === 11) return <Test11 />;
  return null;
}

function ResultRow({ label, value, mono = true }: { label: string; value: string | number; mono?: boolean }) {
  return (
    <div className="flex justify-between text-sm py-0.5 border-b border-border/30 last:border-0">
      <span className="text-muted">{label}</span>
      <span className={mono ? "font-mono" : ""}>{typeof value === "number" ? fmt(value, 6) : value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card rounded-lg p-4">
      <h3 className="text-xs uppercase tracking-wider text-muted mb-2">{title}</h3>
      {children}
    </div>
  );
}

// --- TEST 1 ---
function Test1() {
  const [q1, setQ1] = useState(0.5);
  const r = M.test1(q1);
  const tight = Math.abs(r.F1 - r.surprisal) < 1e-9;
  const sweepData = Array.from({ length: 41 }, (_, i) => {
    const q = i / 40;
    const t = M.test1(q);
    return { q: q.toFixed(2), F: t.F1, surprisal: t.surprisal };
  });
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">
          Discrete two-state model: η ∈ {`{0,1}`}, p(η=1) = 0.7, p(y=1|η=1) = 0.9. Observe y=1.
          Vary the variational q(η=1) and watch F[q] respond.
        </div>
      </Card>
      <Card title="Parameter">
        <Slider label="q(η=1)" value={q1} min={0.01} max={0.99} step={0.01} onChange={setQ1} />
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Computed">
          <ResultRow label="p(y=1)"                 value={r.pY1} />
          <ResultRow label="−ln p(y=1) (surprisal)" value={r.surprisal} />
          <ResultRow label="exact posterior p(η=1|y=1)" value={r.post[1]} />
          <ResultRow label="F[q] (Form 1)"          value={r.F1} />
          <ResultRow label="F[q] (Form 2)"          value={r.F2} />
          <ResultRow label="ELBO[q]"                value={r.elbo} />
          <ResultRow label="KL(q || posterior)"     value={r.kl} />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <PASS ok={Math.abs(r.F1 - r.F2) < 1e-12} label="Form 1 = Form 2" />
            <PASS ok={r.F1 + 1e-12 >= r.surprisal}    label="F ≥ surprisal" />
            <PASS ok={tight}                          label="tight at q=posterior" />
          </div>
        </Card>
        <Card title="F[q] vs q(η=1)">
          <LinePlot
            data={sweepData}
            xKey="q"
            lines={[
              { key: "F", label: "F[q]", color: COLOR_F },
              { key: "surprisal", label: "−ln p(y=1)", color: COLOR_REF },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

// --- TEST 2 ---
function Test2() {
  const data = M.test2().map((r) => ({ q: r.q1.toFixed(3), F: r.F, KL: r.kl, diff: r.diff }));
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">F[q] − surprisal = KL(q || posterior). Sweep q(η=1) across the unit interval.</div>
      </Card>
      <Card title="Sweep table">
        <BarPlot
          data={data}
          xKey="q"
          bars={[
            { key: "F", label: "F[q]", color: COLOR_F },
            { key: "KL", label: "KL(q || posterior)", color: COLOR_KL },
          ]}
        />
      </Card>
    </div>
  );
}

// --- TEST 3 ---
function Test3() {
  const r = M.test3();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">
          With p(y=1|η=0) = 0, the posterior is degenerate (concentrated at η=1). Uniform q has mass at η=0,
          off the posterior's support — KL diverges to +∞.
        </div>
      </Card>
      <Card title="Computed">
        <ResultRow label="p(y=1)" value={r.pY1} />
        <ResultRow label="exact posterior" value={`(${r.post[0]}, ${r.post[1]})`} />
        <ResultRow label="KL(uniform q || posterior)" value={r.kl} />
        <ResultRow label="status" value={r.status} mono={false} />
        <div className="mt-2"><PASS ok={r.kl === Infinity} label="A2 (q ≪ p) is essential" /></div>
      </Card>
    </div>
  );
}

// --- TEST 4 ---
function Test4() {
  const [mq, setMq] = useState(1.2);
  const [vq, setVq] = useState(0.8);
  const r = M.test4(mq, vq);
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">
          Gaussian prior N(0, 4), likelihood N(y; η, 1), observation y=1.5. Closed-form KL between
          two Gaussians; no Monte Carlo. The exact posterior is N(1.2, 0.8) (verified below).
        </div>
      </Card>
      <Card title="Variational q (mean, variance)">
        <Slider label="m_q" value={mq} min={-2} max={3} step={0.05} onChange={setMq} />
        <Slider label="v_q" value={vq} min={0.05} max={3} step={0.05} onChange={setVq} />
      </Card>
      <Card title="Computed">
        <ResultRow label="exact posterior mean" value={r.postMean} />
        <ResultRow label="exact posterior variance" value={r.postVar} />
        <ResultRow label="surprisal −ln p(y=1.5)" value={r.surprisal} />
        <ResultRow label="KL(q || posterior)" value={r.kl} />
        <ResultRow label="F[q]" value={r.F} />
        <PASS ok={r.F + 1e-12 >= r.surprisal} label="F ≥ surprisal" />
      </Card>
    </div>
  );
}

// --- TEST 5 ---
function Test5() {
  const r = M.test5();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">
          Friston's F is exactly the negative of Beal's ELBO. Friston-style F is an UPPER bound on surprisal;
          ELBO is a LOWER bound on log evidence. Wrong-direction wording is numerically falsified here.
        </div>
      </Card>
      <Card title="Computed">
        <ResultRow label="F (Friston)" value={r.F} />
        <ResultRow label="ELBO (Beal)" value={r.elbo} />
        <ResultRow label="F + ELBO (must be 0)" value={r.sum} />
        <ResultRow label="Counter-wording 'F ≤ surprisal'?" value={r.F <= r.surprisal ? "TRUE" : "FALSE"} mono={false} />
        <ResultRow label="Standard 'F ≥ surprisal'?" value={r.F >= r.surprisal ? "TRUE" : "FALSE"} mono={false} />
        <PASS ok={Math.abs(r.sum) < 1e-12} label="F + ELBO = 0 to machine precision" />
      </Card>
    </div>
  );
}

// --- TEST 6 ---
function Test6() {
  const r = M.test6();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">Maren TR Eqn 13 has the form −∑ ln p(y) with i indexing but no i in the summand. iid surprisal of (0,1,1,1,0) ≠ −I·ln p(y=1).</div>
      </Card>
      <Card title="Computed">
        <ResultRow label="data y" value={`(${r.y.join(",")})`} mono />
        <ResultRow label="iid surprisal −∑ ln p(y_i)" value={r.iidSurprisal} />
        <ResultRow label="literal −I·ln p(y=1)"        value={r.literal} />
        <ResultRow label="difference"                  value={r.diff} />
        <PASS ok={Math.abs(r.iidSurprisal - r.literal) > 1e-3} label="forms differ; Eqn 13 incoherent without iid factorization" />
      </Card>
    </div>
  );
}

// --- TEST 7 ---
function Test7() {
  const r = M.test7();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">η ~ N(0,1). r = 2η + 3 ~ N(3,4). Without applying the Jacobian, simply renaming the integration variable changes the value of E[·²] by an order of magnitude.</div>
      </Card>
      <Card title="Computed">
        <ResultRow label="E_η[η²]"  value={r.Eeta2} />
        <ResultRow label="E_r[r²]"  value={r.Er2} />
        <ResultRow label="difference" value={r.diff} />
        <PASS ok={Math.abs(r.Er2 - r.Eeta2) > 1} label="measure transformation matters analytically" />
      </Card>
    </div>
  );
}

// --- TEST 8 ---
function Test8() {
  const r = M.test8();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">Construct chain η → s → r → a (with a = r). Then η ⊥ r | (s, a). Verify factorization residuals are at machine epsilon.</div>
      </Card>
      <Card title="Computed">
        <ResultRow label="joint normalization" value={r.total} />
        <ResultRow label="overall max residual" value={r.overall.toExponential(2)} />
        <ResultRow label="acceptance bound" value={r.bound.toExponential(0)} />
        <PASS ok={r.overall < r.bound} label="CI factorization to machine precision (~1.1e-16)" />
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono">
          {r.settings.map((s) => (
            <div key={`${s.s}${s.a}`} className="flex justify-between">
              <span>(s={s.s}, a={s.a})  p(b)={s.pb.toFixed(4)}</span>
              <span>{s.max.toExponential(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// --- TEST 9 ---
function Test9() {
  const r = M.test9();
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">Maren Eqn B-1 (Beal-convention) lacks the minus sign; B-8 (Friston-convention) has it. Dropping the minus inverts the sign of F by 3.276 nats.</div>
      </Card>
      <Card title="Computed">
        <ResultRow label="B-1 as written (no minus)" value={r.HmarenAsWritten} />
        <ResultRow label="standard expected energy"   value={r.Ustandard} />
        <ResultRow label="H[q] = ln 2"                 value={r.Hq} />
        <ResultRow label="F (standard)"                value={r.Fstandard} />
        <ResultRow label="F (using B-1 unrepaired)"    value={r.FwithBugged} />
        <PASS ok={Math.abs(r.Fstandard - r.FwithBugged) > 3} label="missing minus inverts F by ~3.28 nats" />
      </Card>
    </div>
  );
}

// --- TEST 10 ---
function Test10() {
  const [h, setH] = useState(1.2);
  const r = M.test10(h);
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">Generic 2-site Bethe cluster F vs active-inference F[q]. Both have energy-minus-entropy form, but they are different functionals on different objects.</div>
      </Card>
      <Card title="Bethe interaction parameter">
        <Slider label="h" value={h} min={0.1} max={3} step={0.05} onChange={setH} />
      </Card>
      <Card title="Computed">
        <ResultRow label="correlation" value={r.correlation} />
        <ResultRow label="Bethe energy" value={r.energy} />
        <ResultRow label="H_pair" value={r.Hpair} />
        <ResultRow label="H_site" value={r.Hsite} />
        <ResultRow label="F_bethe" value={r.Fbethe} />
        <ResultRow label="F[q] (Test 1 model, uniform q)" value={r.Fai} />
        <ResultRow label="|F_bethe − F[q]|" value={r.dist} />
      </Card>
    </div>
  );
}

// --- TEST 11 ---
function Test11() {
  const data = [0.5, 0.913043478, 0.95].map((q) => {
    const r = M.test11Discrete(q);
    return { q: q.toFixed(6), F1: r.F1, F2: r.F2, F3: r.F3, agree: r.agree };
  });
  return (
    <div className="space-y-4">
      <Card title="Setup">
        <div className="text-sm text-muted">Form 3 (Complexity − Accuracy) = D_KL(q || prior) − E_q[ln p(y|η)]. Verify all three forms agree to machine epsilon.</div>
      </Card>
      <Card title="Discrete model (same as Test 1)">
        <table className="w-full text-xs font-mono">
          <thead className="text-muted">
            <tr><th className="text-left">q(η=1)</th><th>Form 1</th><th>Form 2</th><th>Form 3</th><th>agree?</th></tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.q}><td>{d.q}</td><td>{fmt(d.F1, 10)}</td><td>{fmt(d.F2, 10)}</td><td>{fmt(d.F3, 10)}</td><td>{d.agree ? "YES" : "NO"}</td></tr>
            ))}
          </tbody>
        </table>
        <PASS ok={data.every((d) => d.agree)} label="three forms agree" />
      </Card>
    </div>
  );
}
