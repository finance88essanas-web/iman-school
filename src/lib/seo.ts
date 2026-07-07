import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site, mainBranch } from "@/lib/site-config";

/**
 * SEO FOUNDATION
 * - buildMetadata(): per-page metadata with full hreflang alternates.
 * - schoolJsonLd(): School structured data (local SEO backbone).
 */

interface PageSeo {
  locale: Locale;
  title: string;
  description: string;
  /** Path without locale prefix, e.g. "/" or "/admissions" */
  path: string;
}

export function buildMetadata({ locale, title, description, path }: PageSeo): Metadata {
  const clean = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${site.url}/${l}${clean}`]),
  );

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `${site.url}/${locale}${clean}`,
      languages: {
        ...languages,
        "x-default": `${site.url}/${routing.defaultLocale}${clean}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/${locale}${clean}`,
      siteName: title,
      locale: locale === "ar" ? "ar_LB" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export function schoolJsonLd(locale: Locale) {
  const b = mainBranch;
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: b.name[locale],
    url: `${site.url}/${locale}`,
    foundingDate: String(site.foundedYear),
    telephone: b.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address[locale],
      addressLocality: b.town[locale],
      addressCountry: "LB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: b.geo.lat,
      longitude: b.geo.lng,
    },
  };
}
