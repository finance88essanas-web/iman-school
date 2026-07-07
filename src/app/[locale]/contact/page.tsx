import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Admissions } from "@/components/home/Admissions";
import { CtaBand } from "@/components/home/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return buildMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("lead"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <CtaBand />
      <Admissions />
    </>
  );
}
