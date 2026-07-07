import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Stages } from "@/components/home/Stages";
import { Facilities } from "@/components/home/Facilities";
import { StudentLife } from "@/components/home/StudentLife";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.academics" });
  return buildMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("lead"),
    path: "/academics",
  });
}

export default async function AcademicsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.academics");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} sheet="sky" />
      <Stages />
      <Facilities />
      <StudentLife />
    </>
  );
}
