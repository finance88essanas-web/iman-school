import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { schoolJsonLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Stats } from "@/components/home/Stats";
import { Stages } from "@/components/home/Stages";
import { WhyUs } from "@/components/home/WhyUs";
import { Facilities } from "@/components/home/Facilities";
import { StudentLife } from "@/components/home/StudentLife";
import { News } from "@/components/home/News";
import { Testimonials } from "@/components/home/Testimonials";
import { Admissions } from "@/components/home/Admissions";
import { Gallery } from "@/components/home/Gallery";
import { StudentProof } from "@/components/home/StudentProof";
import { CtaBand } from "@/components/home/CtaBand";

/**
 * HOMEPAGE — fully static (SSG per locale). Section order tells one story:
 * arrive (hero) → trust (intro, stats) → offering (stages, why, facilities)
 * → life (activities, news, voices, gallery) → act (CTA).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schoolJsonLd(locale as Locale)),
        }}
      />
      <Hero />
      <Intro />
      <Stats />
      <Stages />
      <WhyUs />
      <Facilities />
      <StudentLife />
      <News />
      <Testimonials />
      <Admissions />
      <Gallery />
      <StudentProof />
      <CtaBand />
    </>
  );
}
