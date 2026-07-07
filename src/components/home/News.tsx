import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { photos } from "@/lib/photos";

/**
 * NEWS — a magazine spread: featured story with full photography and a
 * serif headline; the remaining stories run as a text-only column with
 * oversized folio numerals and hairline rules.
 * Real school stories; will move into Sanity content documents in Phase 4.
 */
const FEATURED = { key: "honors", date: "2026-06-15", photo: photos.grad } as const;
// TODO-CLIENT: summer-camp photo coming from the school — when it lands,
// promote "camp" to FEATURED with it.
const BRIEFS = [
  { key: "camp", date: "2026-06-29" },
  { key: "registration", date: "2026-01-24" },
  { key: "science", date: "2026-02-14" },
] as const;

export async function News() {
  const t = await getTranslations("home.news");
  const locale = await getLocale();
  const dateFormat = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-LB-u-nu-latn" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <Section id="news" tone="deep" className="scroll-mt-24">
      <Reveal>
        <SectionHeader
          index="07"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          layout="split"
        />
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* featured story */}
        <Reveal>
          <article className="group">
            <div className="overflow-hidden rounded-3xl transition-transform duration-700 [transform:perspective(1100px)] group-hover:[transform:perspective(1100px)_rotateX(2deg)_rotateY(-2deg)_scale(1.01)]">
              <Photo
                src={FEATURED.photo}
                alt={t(`items.${FEATURED.key}.title`)}
                sizes="(max-width: 1024px) 92vw, 55vw"
                className="aspect-[16/10] rounded-3xl transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-7 flex items-center gap-4 text-sm">
              <span className="rounded-full bg-accent px-3.5 py-1 text-xs font-bold text-[#0a2a38]">
                {t(`items.${FEATURED.key}.category`)}
              </span>
              <time dateTime={FEATURED.date} className="font-medium text-ink-soft">
                {dateFormat.format(new Date(FEATURED.date))}
              </time>
            </div>
            <h3 className="type-quote mt-4 text-3xl leading-snug text-ink sm:text-4xl">
              {t(`items.${FEATURED.key}.title`)}
            </h3>
            <p className="type-body mt-4 max-w-xl">
              {t(`items.${FEATURED.key}.excerpt`)}
            </p>
          </article>
        </Reveal>

        {/* briefs column */}
        <Stagger className="lg:border-s lg:border-ink/15 lg:ps-14">
          {BRIEFS.map(({ key, date }, i) => (
            <StaggerItem key={key}>
              <article className="group border-b border-ink/15 py-9 first:pt-0 lg:first:pt-2">
                <div className="flex items-baseline gap-5">
                  <span
                    aria-hidden="true"
                    className="text-outline text-4xl font-bold tabular-nums text-ink-soft"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-bold tracking-wide text-accent-strong">
                        {t(`items.${key}.category`)}
                      </span>
                      <time dateTime={date} className="font-medium text-ink-soft">
                        {dateFormat.format(new Date(date))}
                      </time>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-primary">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="type-small mt-2.5 leading-relaxed">
                      {t(`items.${key}.excerpt`)}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
