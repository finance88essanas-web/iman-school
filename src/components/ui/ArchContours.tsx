/**
 * ARCH CONTOURS — concentric outlines of the brand arch, like contour
 * lines on a drafting table. This replaces the tiled star pattern as the
 * site's large-scale decorative layer: drawn once, cropped at edges,
 * never repeated. Pure SVG strokes — costs nothing to paint.
 *
 * Geometry: all arcs share one center line (cy = 220), so the nest reads
 * as a single hand-set composition.
 */
export function ArchContours({
  className = "",
  layers = 4,
}: {
  className?: string;
  layers?: number;
}) {
  const paths = Array.from({ length: layers }, (_, i) => {
    const inset = 20 + i * 38;
    const x0 = inset;
    const x1 = 440 - inset;
    const r = (x1 - x0) / 2;
    const cy = 220;
    return `M ${x0} 560 L ${x0} ${cy} A ${r} ${r} 0 0 1 ${x1} ${cy} L ${x1} 560`;
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 560"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      className={`pointer-events-none ${className}`}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}
