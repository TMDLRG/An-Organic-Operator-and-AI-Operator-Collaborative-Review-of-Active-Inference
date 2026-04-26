"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { BookOpen, Sigma, Bot, Home, ShieldAlert, Search as SearchIcon } from "lucide-react";
import clsx from "clsx";

const tabs = [
  { href: "/",       label: "Home",      icon: Home },
  { href: "/docs",   label: "Documents", icon: BookOpen },
  { href: "/audit",  label: "Audit",     icon: ShieldAlert },
  { href: "/math",   label: "Math",      icon: Sigma },
  { href: "/agents", label: "Agents",    icon: Bot },
  { href: "/search", label: "Search",    icon: SearchIcon },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link href="/" className="font-semibold text-fg whitespace-nowrap">
          AOAIOP <span className="text-muted font-normal">· Active Inference Review</span>
        </Link>
        <nav className="flex items-center gap-1 ml-2">
          {tabs.map((t) => {
            const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                  active ? "bg-card text-fg border border-border" : "text-muted hover:text-fg hover:bg-card/50"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/TMDLRG/An-Organic-Operator-and-AI-Operator-Collaborative-Review-of-Active-Inference"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted hover:text-fg"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
