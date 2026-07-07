import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { News } from "@/components/home/News";
import { Gallery } from "@/components/home/Gallery";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.news" });
  return buildMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("lead"),
    path: "/news",
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.news");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} sheet="deep" />
      <News />
      <Gallery />
    </>
  );
}
