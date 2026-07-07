/**
 * A "forward" arrow that respects reading direction:
 * points right in LTR, left in RTL. Decorative by default.
 */
export function DirectionalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[1em] w-[1em] rtl:-scale-x-100 ${className}`}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
