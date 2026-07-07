import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { DirectionalArrow } from "@/components/ui/DirectionalArrow";
import { IconMapPin, IconPhone } from "@/components/ui/icons";
import { mainBranch, site, whatsappHref } from "@/lib/site-config";

/**
 * CTA — the golden gate: the page's only gold band. Ink typography on
 * amber, deep-green action, nothing else on the site looks like this.
 */
export async function CtaBand() {
  const t = await getTranslations("home.cta");
  const ta = await getTranslations("actions");
  const locale = (await getLocale()) as Locale;

  return (
    <section
      id="contact"
      className="relative z-10 -mt-9 scroll-mt-20 overflow-hidden rounded-t-[2.5rem] bg-[linear-gradient(160deg,#b3a7e6_0%,#8b7cd8_55%,#6d5cc3_100%)] text-[#0a2a38] md:rounded-t-[3rem]"
    >
      {/* lighting: one bright sweep + a deep floor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(237,233,249,0.5),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#56479e]/50 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-32 pt-24 text-center sm:px-8 md:pb-48 md:pt-36">
        <Reveal>
          <h2 className="type-mega">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-7 max-w-xl text-lg font-medium leading-relaxed opacity-85">
            {t("lead")}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Magnetic>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen group inline-flex items-center rounded-full bg-primary-deep px-9 py-4.5 text-base font-semibold text-on-primary shadow-lift transition-[background-color,transform] duration-300 hover:bg-[#0a3243] active:scale-[0.98]"
              >
                {ta("whatsapp")}
                <DirectionalArrow className="ms-2.5 transition-[margin] duration-300 group-hover:ms-4" />
              </a>
            </Magnetic>
            <a
              href={`tel:${mainBranch.phone}`}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#0a2a38]/50 px-9 py-4 text-base font-semibold transition-colors duration-300 hover:border-[#0a2a38] hover:bg-[#0a2a38]/10"
            >
              <IconPhone className="h-5 w-5" />
              {ta("call")}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <a
            href={`tel:${mainBranch.phone}`}
            className="bidi-isolate mt-10 inline-block text-2xl font-bold tracking-wide transition-opacity hover:opacity-70"
          >
            {mainBranch.phone}
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium">
            {/* the pin itself opens the school on Google Maps */}
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-75 transition-opacity hover:opacity-100"
            >
              <IconMapPin className="h-4.5 w-4.5" />
              {t("addressNote")} {mainBranch.address[locale]}
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-bold"
            >
              {t("mapLink")}
            </a>
            <a
              href={`mailto:${mainBranch.email}`}
              className="bidi-isolate link-draw font-bold"
            >
              {mainBranch.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
