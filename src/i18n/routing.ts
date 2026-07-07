import { defineRouting } from "next-intl/routing";

/**
 * Locale routing — Arabic is the default, first-class experience.
 * `localePrefix: "always"` keeps URLs explicit (/ar/..., /en/...) which
 * simplifies hreflang, analytics, and cache behavior.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const localeLabel: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
