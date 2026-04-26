import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "rgb(var(--bg) / <alpha-value>)" },
        fg: { DEFAULT: "rgb(var(--fg) / <alpha-value>)" },
        muted: { DEFAULT: "rgb(var(--muted) / <alpha-value>)" },
        border: { DEFAULT: "rgb(var(--border) / <alpha-value>)" },
        accent: { DEFAULT: "rgb(var(--accent) / <alpha-value>)" },
        card: { DEFAULT: "rgb(var(--card) / <alpha-value>)" },
        sev: {
          fatal: "#dc2626",
          serious: "#ea580c",
          moderate: "#ca8a04",
          minor: "#65a30d",
          none: "#16a34a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: { maxWidth: "72ch" },
        },
      },
    },
  },
};
export default config;
