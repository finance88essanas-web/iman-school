import { GeometricPattern } from "./GeometricPattern";

/**
 * ARCH SCENE — the signature interior of the brand arch: a golden dawn
 * rising behind a thin horizon, one guiding star above it. Used in the
 * hero and intro panels; this is the composition real photography will
 * eventually replace, so it must read as art direction, not absence.
 * Parent must be the arch container (rounded-t-full, overflow-hidden).
 */
export function ArchScene({ patternId }: { patternId?: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {patternId ? <GeometricPattern id={patternId} opacity={0.05} /> : null}

      {/* dawn glow rising from the base */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_at_50%_100%,rgba(199,188,232,0.30),rgba(199,188,232,0.07)_55%,transparent_78%)]" />

      {/* horizon hairline */}
      <div className="absolute inset-x-8 bottom-[31%] h-px bg-[linear-gradient(to_right,transparent,rgba(199,188,232,0.55),transparent)]" />

      {/* guiding star */}
      <svg
        viewBox="0 0 12 12"
        fill="currentColor"
        className="absolute bottom-[43%] left-1/2 h-4 w-4 -translate-x-1/2 text-[#c7bce8] opacity-80"
      >
        <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
      </svg>

      {/* inner hairline — the framed detail */}
      <div className="absolute inset-3 rounded-t-full rounded-b-[calc(var(--radius-card)-0.375rem)] border border-white/10" />
    </div>
  );
}
