import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Intro } from "@/components/home/Intro";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return buildMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("lead"),
    path: "/about",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  return (
    <>
      {/* Intro carries the identity charter (who we are / mission / goals),
          so /about opens straight into it — its own curved sheet overlaps
          the hero plate. */}
      <PageHero title={t("title")} lead={t("lead")} />
      <Intro />
      <Stats />
      <Testimonials />
    </>
  );
}
