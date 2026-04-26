"use client";
import { useState } from "react";
import { TEST_DEFS } from "@/lib/math-tests";
import { TestRunner } from "@/components/math-runner/test-runner";
import clsx from "clsx";
import { Sigma } from "lucide-react";

export default function MathPage() {
  const [active, setActive] = useState(1);
  const test = TEST_DEFS.find((t) => t.id === active)!;
  return (
    <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
      <aside className="w-72 shrink-0 border-r border-border h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto px-3 py-4">
        <h2 className="text-xs uppercase tracking-wider text-muted mb-2 px-1">11 Tests</h2>
        <ul className="space-y-px">
          {TEST_DEFS.map((t) => {
            const isActive = t.id === active;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t.id)}
                  className={clsx(
                    "w-full text-left px-2 py-2 rounded text-xs leading-tight",
                    isActive ? "bg-accent/10 text-fg border-l-2 border-accent pl-1.5" : "hover:bg-card text-muted hover:text-fg"
                  )}
                >
                  <span className="font-mono opacity-70 mr-1.5">T{t.id.toString().padStart(2, "0")}</span>
                  <span className="font-medium">{t.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 px-2 text-xs text-muted leading-relaxed">
          All tests run client-side via a TypeScript port of{" "}
          <code className="font-mono">audit_tests_v2.py</code>. The Python source remains the canonical
          oracle (87 pytest assertions, bit-identical reference output).
        </div>
      </aside>
      <div className="flex-1 min-w-0 px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted mb-2">
            <Sigma className="w-3.5 h-3.5" /> Test {active.toString().padStart(2, "0")}
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{test.title}</h1>
          <p className="text-muted text-sm">{test.desc}</p>
        </div>
        <TestRunner id={active} />
      </div>
    </div>
  );
}
