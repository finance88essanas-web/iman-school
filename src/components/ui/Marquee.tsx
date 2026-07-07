import { Fragment } from "react";

/**
 * VALUES MARQUEE — the slow ticker under the hero. Words are separated by
 * eight-point stars (the site ornament, miniaturized). The strip is forced
 * LTR so the loop direction is stable; the Arabic words inside each span
 * still shape correctly. Screen readers get one clean sentence.
 */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const star = (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-2.5 w-2.5 shrink-0 text-accent"
      fill="currentColor"
    >
      <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
    </svg>
  );

  const run = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-10 pe-10"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap text-sm font-medium tracking-wide opacity-75">
            {item}
          </span>
          {star}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`} dir="ltr">
      <span className="sr-only">{items.join(" · ")}</span>
      <div className="marquee-track" aria-hidden="true">
        {run(true)}
        {run(true)}
      </div>
    </div>
  );
}
