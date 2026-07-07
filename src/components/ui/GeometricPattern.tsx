/**
 * SIGNATURE ORNAMENT — an eight-point star (khatam) lattice drawn as an
 * SVG pattern. Used at very low opacity on dark bands and art tiles; it is
 * the site's cultural fingerprint. Pure SVG: zero network cost, crisp at
 * any DPI, cheap to paint on older devices.
 *
 * `id` must be unique per usage on the page (SSR-safe alternative to useId).
 */
export function GeometricPattern({
  id,
  className = "",
  opacity = 0.07,
}: {
  id: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          {/* Eight-point star: two overlapping squares, one rotated 45° */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <rect x="18" y="18" width="20" height="20" />
            <rect
              x="18"
              y="18"
              width="20"
              height="20"
              transform="rotate(45 28 28)"
            />
            {/* Corner diamonds knit neighboring stars together */}
            <rect x="-4" y="-4" width="8" height="8" transform="rotate(45 0 0)" />
            <rect x="52" y="-4" width="8" height="8" transform="rotate(45 56 0)" />
            <rect x="-4" y="52" width="8" height="8" transform="rotate(45 0 56)" />
            <rect x="52" y="52" width="8" height="8" transform="rotate(45 56 56)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
