import type { ReactNode } from "react";

/**
 * SECTION HEADER — the page's editorial voice.
 * - eyebrow row: accent dash + optional section numeral + label
 * - `layout="split"`: title on the start side, lead on the end side,
 *   baseline-aligned (desktop) — the magazine device that keeps long
 *   pages from feeling like a stack of identical blocks.
 * Alignment uses logical values only — mirrors automatically in RTL.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  align = "start",
  layout = "stack",
  as: Tag = "h2",
  tone = "light",
}: {
  eyebrow?: string;
  /** Editorial numeral, e.g. "01" — rendered beside the eyebrow. */
  index?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  layout?: "stack" | "split";
  as?: "h1" | "h2" | "h3";
  /** "light" = on paper tones, "dark" = on primary/dark bands. */
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  const titleCls = Tag === "h1" ? "type-h1" : "type-h2";
  const titleColor = tone === "dark" ? "text-on-primary" : "text-ink";
  const leadColor = tone === "dark" ? "text-on-primary/80" : "";

  const eyebrowRow = eyebrow ? (
    <p
      className={`type-eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-accent-soft" : ""
      } ${centered ? "justify-center" : ""}`}
    >
      {index ? (
        <span aria-hidden="true" className="font-bold tabular-nums opacity-60">
          {index}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px w-7 bg-accent" />
      <span>{eyebrow}</span>
      {centered ? <span aria-hidden="true" className="h-px w-7 bg-accent" /> : null}
    </p>
  ) : null;

  if (layout === "split" && lead) {
    return (
      <div className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="text-start">
          {eyebrowRow}
          <Tag className={`${titleCls} ${titleColor} mt-5`}>{title}</Tag>
        </div>
        <p className={`type-lead max-w-xl md:mb-2 ${leadColor}`}>{lead}</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-start"}`}
    >
      {eyebrowRow}
      <Tag className={`${titleCls} ${titleColor} mt-5`}>{title}</Tag>
      {lead ? (
        <p className={`type-lead mt-6 ${leadColor} ${centered ? "mx-auto" : ""}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Convenience wrapper kept for callers that only need the eyebrow style. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="type-eyebrow flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-7 bg-accent" />
      <span>{children}</span>
    </p>
  );
}
