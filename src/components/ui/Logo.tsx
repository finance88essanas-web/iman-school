import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * OFFICIAL CREST — the school's real emblem (public/logo.png, sourced from
 * the association's official site, background removed). Transparent PNG:
 * sits directly on any surface, light or dark.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        fill
        sizes="240px"
        className="object-contain drop-shadow-sm"
      />
    </span>
  );
}

/**
 * Line-drawn glyph of the crest (shield/flame/book) — used only for the
 * oversized background watermarks where a raster badge can't work.
 */
export function LogoGlyph({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {/* Shield */}
      <path d="M20 3 33 7.5v11c0 8.5-5.5 14.5-13 17.5C12.5 33 7 27 7 18.5v-11L20 3Z" />
      {/* Flame of knowledge */}
      <path d="M20 9.5c1.6 1.8 2.4 3.2 2.4 4.5A2.4 2.4 0 0 1 20 16.5a2.4 2.4 0 0 1-2.4-2.5c0-1.3.8-2.7 2.4-4.5Z" />
      {/* Open book */}
      <path d="M13.5 27c2.7-1.5 4.9-1.5 6.5 0 1.6-1.5 3.8-1.5 6.5 0v-7c-2.7-1.5-4.9-1.5-6.5 0-1.6-1.5-3.8-1.5-6.5 0v7Z" />
      <path d="M20 20v7" />
    </svg>
  );
}

/**
 * Full lockup: mark + school name, wrapped in a locale-aware home link.
 * Inherits currentColor so it works on both dark (hero) and light (scrolled
 * header, footer) surfaces.
 */
export function Logo({ className = "" }: { className?: string }) {
  const t = useTranslations();
  return (
    <Link
      href="/"
      aria-label={t("a11y.homeLink")}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      {/* crest a step larger, name a step smaller — the crest leads and the
          lockup never crowds the nav */}
      <LogoMark className="h-12 w-12" />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-bold sm:text-base">{t("site.name")}</span>
        <span className="text-[11px] opacity-80">{t("site.tagline")}</span>
      </span>
    </Link>
  );
}
