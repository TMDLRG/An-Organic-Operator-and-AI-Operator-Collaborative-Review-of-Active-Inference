import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/ui/nav";

export const metadata: Metadata = {
  title: "AOAIOP · Active Inference Collaborative Review",
  description:
    "An audit-grade collaborative review of variational free energy in active inference. Document viewer, interactive math runner, and active inference agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefers)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-border text-xs text-muted py-3 px-4">
          <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center gap-3 justify-between">
            <span>
              AOAIOP UI · Built with Anthropic Claude · OpenAI GPT (Ai Onna · Jules) · ORCHESTRATE Method
            </span>
            <span>
              Math:{" "}
              <code className="font-mono">manuscript-v2-reproducibility/audit_tests_v2.py</code> · Agents:{" "}
              <code className="font-mono">Jido v2.2.0</code>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
