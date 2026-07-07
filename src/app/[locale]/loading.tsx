import { LogoMark } from "@/components/ui/Logo";

/**
 * Route-transition state — a breathing mark on paper, nothing more.
 * Homepage is fully static so this rarely shows; inner pages (Phase 3)
 * will pass through it.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-paper">
      <LogoMark className="h-16 w-16 animate-pulse text-primary" />
      {/* gold thread breathing beneath the mark */}
      <span className="block h-0.5 w-28 overflow-hidden rounded-full bg-line">
        <span className="block h-full w-full animate-pulse rounded-full bg-accent" />
      </span>
    </div>
  );
}
