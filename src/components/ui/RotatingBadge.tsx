/**
 * ROTATING SEAL — circular text orbiting an eight-point star, glass-backed.
 * The kind of ornament a brand team hand-places once. CSS rotation only;
 * the global reduced-motion rule freezes it.
 *
 * The ring is laid out word-by-word (each word rotated into place around
 * the circle) instead of SVG <textPath>: Chromium's RTL support on text
 * paths is broken, and this construction renders Arabic and Latin rings
 * identically. RTL rings advance counterclockwise — the direction Arabic
 * reads around a seal.
 */
export function RotatingBadge({
  text,
  rtl = false,
  className = "",
}: {
  text: string;
  /** Set for Arabic — words advance counterclockwise around the ring. */
  rtl?: boolean;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const step = 360 / words.length;

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center rounded-full border border-white/15 bg-white/[0.07] shadow-lift backdrop-blur-md ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        {words.map((word, i) => (
          <text
            key={`${word}-${i}`}
            x="50"
            y="16"
            textAnchor="middle"
            transform={`rotate(${(rtl ? -step : step) * i} 50 50)`}
            className="fill-current text-[8.5px] font-semibold"
          >
            {word}
          </text>
        ))}
      </svg>
      <svg viewBox="0 0 12 12" className="h-5 w-5 text-accent" fill="currentColor">
        <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
      </svg>
    </div>
  );
}
