"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Seamless locale toggle: same page, other language.
 * Rendered as a link-styled button so switching never loses context.
 */
export function LanguageSwitcher({
  className = "text-primary",
}: {
  /** Pass a text color utility; defaults to primary (light surfaces). */
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("actions");
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className={`link-draw font-semibold ${className}`}
      lang={next}
      dir={next === "ar" ? "rtl" : "ltr"}
    >
      {t("switchLocale")}
    </button>
  );
}
