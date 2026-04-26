import Link from "next/link";
import { BookOpen, Sigma, Bot, ArrowRight, ShieldCheck, FileText, GitBranch } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 w-full">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> Audit-grade · Reproducible · Open
        </div>
        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
          An Organic Operator and AI Operator Collaborative Review of <span className="text-accent">Active Inference</span>
        </h1>
        <p className="text-xl text-muted leading-relaxed mb-2">
          Free Energy Minimization: Reviewable Foundations, Reproducible Tests, and Open Tensions.
        </p>
        <p className="text-base text-muted mb-10">
          A transparent re-presentation of the central variational identity with sentence-level provenance,
          a deterministic test suite (87 assertions, bit-identical output), and active-inference agents
          implemented in <a href="/agents" className="text-accent underline">Jido</a>.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <SurfaceCard
            href="/docs"
            icon={BookOpen}
            title="Documents"
            sub="Surface A"
            body="Read the manuscript, audit chain, OODA worksheets, and provenance map. Full KaTeX math, cross-references, dark mode."
          />
          <SurfaceCard
            href="/math"
            icon={Sigma}
            title="Math Runner"
            sub="Surface B"
            body="Run all 11 deterministic tests in your browser via Pyodide. Tweak parameters, compare against reference output, see the master identity in action."
          />
          <SurfaceCard
            href="/agents"
            icon={Bot}
            title="Agents"
            sub="Surface C"
            body="Two active inference agents: a discrete two-state model and a Gaussian conjugate model. Watch belief, free energy, and action trajectories live."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Section
            icon={FileText}
            title="What this is"
            body={`A collaborative review of variational free energy in active inference,
              produced by an organic operator (Michael Polzin) and a chain of AI sessions
              (Anthropic Claude · OpenAI GPT via Ai Onna and Jules · ORCHESTRATE Method).
              Maren's Themesis Technical Report TR-2019-01v6 (arXiv:1906.08804v6) is
              treated as a test case for the audit method, not as a target.`}
          />
          <Section
            icon={GitBranch}
            title="Verification status"
            body={`Phase 1 of the audit-remediation plan (P0–P5) is complete. 87/87 pytest
              assertions pass on Python 3.11/3.12/3.13. Bit-identical output to reference
              on all platforms. Docker reproducibility verified. All 15 audit findings
              cross-checked against the original PDF.`}
          />
        </div>

        <div className="text-xs text-muted border-t border-border pt-6">
          Repository:{" "}
          <a
            href="https://github.com/TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline"
          >
            TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference
          </a>{" "}
          · Citation: see{" "}
          <Link href="/docs/CITATION.cff" className="text-accent underline">CITATION.cff</Link>
        </div>
      </div>
    </div>
  );
}

function SurfaceCard({
  href, icon: Icon, title, sub, body,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="block border border-border rounded-lg p-5 bg-card hover:border-accent transition-colors group"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-2">
        <Icon className="w-3.5 h-3.5" />
        {sub}
      </div>
      <div className="text-lg font-semibold mb-2 flex items-center gap-1 group-hover:text-accent transition-colors">
        {title} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </Link>
  );
}

function Section({
  icon: Icon, title, body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-accent" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
