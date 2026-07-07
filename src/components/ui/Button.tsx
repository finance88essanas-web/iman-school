import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] px-6 py-3 font-semibold " +
  "transition-[background-color,color,box-shadow,transform] duration-300 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-deep shadow-sm hover:shadow-md",
  secondary:
    "bg-transparent text-primary border border-primary/40 hover:border-primary hover:bg-primary-soft",
  ghost: "bg-transparent text-primary hover:bg-primary-soft",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Internal path (locale-aware) — mutually exclusive with externalHref */
  href?: string;
  /** External URL (WhatsApp, tel:, maps…) */
  externalHref?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/** One button, three voices. Internal links are always locale-aware. */
export function Button({
  children,
  variant = "primary",
  href,
  externalHref,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (externalHref) {
    return (
      <a
        href={externalHref}
        className={cls}
        aria-label={ariaLabel}
        target={externalHref.startsWith("http") ? "_blank" : undefined}
        rel={externalHref.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
