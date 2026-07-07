import type { ReactNode } from "react";
import { ArchContours } from "./ArchContours";

/**
 * ART TILE v2 — an editorial plate, not a placeholder: layered gradient
 * field + cropped arch contours + glass chips. Reads as deliberate art
 * direction while it waits for photography (TODO-CLIENT); when photos
 * arrive this component grows an `image` prop and nothing else changes.
 */

type Hue = "forest" | "moss" | "amber" | "sand";

const hues: Record<Hue, string> = {
  forest: "bg-[linear-gradient(150deg,#256f8b_0%,#0d3f54_100%)] text-on-primary",
  moss: "bg-[linear-gradient(150deg,#2f89a6_0%,#1d6a85_100%)] text-on-primary",
  amber: "bg-[linear-gradient(150deg,#7f6ecf_0%,#56479e_100%)] text-[#f5f1e4]",
  sand: "bg-[linear-gradient(150deg,#efe9d8_0%,#ddd3b8_100%)] text-primary",
};

export function ArtTile({
  hue = "forest",
  label,
  plate,
  icon,
  className = "",
}: {
  hue?: Hue;
  /** Caption chip, bottom start edge (glass). */
  label?: string;
  /** Editorial plate numeral, top start corner — e.g. "01". */
  plate?: string;
  /** Small glyph in a glass seal, top end corner. */
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card)] ${hues[hue]} ${className}`}
    >
      {/* diagonal light — one soft sweep, not a texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.13),transparent_45%)]"
      />
      {/* cropped arch contours anchored to the base */}
      <ArchContours className="absolute -bottom-[12%] -end-[16%] h-[125%] opacity-[0.16]" />

      {plate ? (
        <span
          aria-hidden="true"
          className="absolute start-3.5 top-3 text-[11px] font-bold tracking-[0.18em] opacity-70"
          dir="ltr"
        >
          {plate}
        </span>
      ) : null}

      {icon ? (
        <span className="absolute end-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          {icon}
        </span>
      ) : null}

      {label ? (
        <>
          {/* bottom vignette keeps the label legible on any hue */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent"
          />
          <span className="absolute bottom-3 start-3 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {label}
          </span>
        </>
      ) : null}
    </div>
  );
}
