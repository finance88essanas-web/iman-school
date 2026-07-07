import { getLocale, getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SplitWords } from "@/components/motion/SplitWords";
import { ScrollFade } from "@/components/motion/ScrollFade";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Photo } from "@/components/ui/Photo";
import { DirectionalArrow } from "@/components/ui/DirectionalArrow";
import { photos } from "@/lib/photos";
import { whatsappHref } from "@/lib/site-config";

/**
 * HERO — a full-screen cinema frame: photography graded deep green,
 * triple scrim for lighting, editorial poster typography in the lower
 * third, one gold highlight phrase. The seal orbits the top corner;
 * the values ticker closes the fold.
 */
export async function Hero() {
  const t = await getTranslations("home.hero");
  const ta = await getTranslations("actions");
  const ts = await getTranslations("site");
  const locale = await getLocale();
  const marqueeItems = t.raw("marquee") as string[];

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-primary-deep text-on-primary">
      {/* cinema plate */}
      <Photo
        src={photos.hero}
        alt={ts("description")}
        priority
        sizes="100vw"
        className="absolute inset-0"
        imgClassName="img-kenburns"
      />
      {/* lighting: base scrim → start-edge column for copy → floor */}
      <div aria-hidden="true" className="absolute inset-0 bg-primary-deep/35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,34,46,0.88)_0%,rgba(6,34,46,0.45)_45%,rgba(6,34,46,0.1)_75%)] rtl:bg-[linear-gradient(to_left,rgba(6,34,46,0.88)_0%,rgba(6,34,46,0.45)_45%,rgba(6,34,46,0.1)_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#06222e] via-[#06222e]/60 to-transparent"
      />

      {/* orbiting seal */}
      <div className="absolute end-8 top-28 hidden lg:block">
        <RotatingBadge
          text={t("badgeRing")}
          rtl={locale === "ar"}
          className="h-32 w-32 text-accent-soft"
        />
      </div>

      {/* poster copy — lower third */}
      <ScrollFade className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-16 pt-40 sm:px-8">
        <Stagger>
          <StaggerItem>
            <p className="type-eyebrow flex items-center gap-3 text-accent-soft">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              {t("eyebrow")}
            </p>
          </StaggerItem>
        </Stagger>

        {/* headline dialed down from mega → display and narrowed, so it
            reads as a composed poster line rather than filling the fold */}
        <h1 className="type-display mt-5 max-w-2xl text-on-primary">
          <SplitWords text={t("title")} highlight={t("titleHighlight")} delay={0.2} />
        </h1>

        <Stagger delay={0.7}>
          <StaggerItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-on-primary/85 sm:text-lg">
              {t("lead")}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Magnetic>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen group inline-flex items-center rounded-full bg-accent px-9 py-4.5 text-base font-semibold text-[#0a2a38] shadow-lift transition-[background-color,transform] duration-300 hover:bg-accent-strong hover:text-white active:scale-[0.98]"
                >
                  {ta("apply")}
                  <DirectionalArrow className="ms-2.5 transition-[margin] duration-300 group-hover:ms-4" />
                </a>
              </Magnetic>
              <a
                href="#about"
                className="link-draw py-2 text-base font-semibold text-on-primary/90 hover:text-on-primary"
              >
                {t("scrollHint")}
              </a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm font-medium text-on-primary/70">
              {(["kg", "elementary", "intermediate", "secondary"] as const).map((key) => (
                <li key={key} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t(`badges.${key}`)}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </ScrollFade>

      {/* values ticker */}
      <div className="relative border-t border-white/10 bg-[#06222e]/60 pb-12 backdrop-blur-sm">
        <Marquee items={marqueeItems} className="py-5" />
      </div>
    </section>
  );
}
