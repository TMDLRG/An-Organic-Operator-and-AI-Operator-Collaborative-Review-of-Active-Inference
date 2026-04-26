"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

// Resolve a repo-relative or in-doc link into something useful for the doc viewer.
function resolveHref(href: string, currentSlug: string): string {
  if (!href) return href;
  // External / mailto / anchor / absolute http
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) return href;
  if (href.startsWith("#")) return href;
  // Strip URL-encoded spaces but keep them for the link target
  const decoded = decodeURIComponent(href);
  // Resolve relative to current document directory
  const parts = currentSlug.split("/");
  parts.pop();
  const base = parts.join("/");
  let combined = decoded;
  if (decoded.startsWith("./")) combined = (base ? base + "/" : "") + decoded.slice(2);
  else if (!decoded.includes("://")) {
    // Assume repo-relative; if it starts with /, treat as repo absolute
    if (decoded.startsWith("/")) combined = decoded.slice(1);
    else combined = (base ? base + "/" : "") + decoded;
  }
  // Normalize "../"
  const segs: string[] = [];
  for (const seg of combined.split("/")) {
    if (seg === "..") segs.pop();
    else if (seg && seg !== ".") segs.push(seg);
  }
  return "/docs/" + segs.join("/");
}

export function Markdown({ source, slug }: { source: string; slug: string }) {
  return (
    <article className="prose-doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          a({ href, children, ...props }) {
            const target = resolveHref(href ?? "", slug);
            const internal = target.startsWith("/") || target.startsWith("#");
            if (internal) return <Link href={target} {...(props as any)}>{children}</Link>;
            return <a href={target} target="_blank" rel="noreferrer" {...(props as any)}>{children}</a>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  );
}
