import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { arabicQuote, arabicSans, latinQuote, latinSans } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SplashIntro } from "@/components/motion/SplashIntro";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return buildMetadata({
    locale: locale as Locale,
    title: t("name"),
    description: t("description"),
    path: "/",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this subtree.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "a11y" });
  const dir = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${arabicSans.variable} ${latinSans.variable} ${arabicQuote.variable} ${latinQuote.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
          >
            {t("skipToContent")}
          </a>
          <SplashIntro />
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
