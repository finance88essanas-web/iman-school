import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

/**
 * STATS — a constellation, not a row of boxes: four figures staggered
 * across a wide field at different altitudes, hairline-connected
 * to their captions, one enormous ghost numeral behind.
 */
const STATS = [
  // Founded 2002 — a quarter century of service by the 2026–27 year.
  { key: "years", value: 24, suffix: "+", offset: "lg:mt-0" },
  { key: "students", value: 700, suffix: "+", offset: "lg:mt-24" },
  { key: "educators", value: 70, suffix: "+", offset: "lg:mt-8" }, // client-confirmed
  { key: "success", value: 98, suffix: "%", offset: "lg:mt-32" }, // TODO-CLIENT
] as const;

export async function Stats() {
  const t = await getTranslations("home.stats");

  return (
    <Section tone="deep" className="relative overflow-hidden">
      {/* ghost star anchoring the constellation */}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        fill="currentColor"
        className="pointer-events-none absolute -top-16 end-[10%] h-72 w-72 text-primary opacity-[0.04]"
      >
        <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
      </svg>

      <Reveal>
        <p className="type-eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="font-bold tabular-nums opacity-60">
            02
          </span>
          <span aria-hidden="true" className="h-px w-7 bg-accent" />
          {t("eyebrow")}
        </p>
        <h2 className="type-h2 mt-5 max-w-xl text-ink">{t("title")}</h2>
      </Reveal>

      <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {STATS.map(({ key, value, suffix, offset }, i) => (
          <Reveal key={key} delay={i * 0.12} className={offset}>
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent"
              />
              <div>
                <CountUp
                  value={value}
                  suffix={suffix}
                  className="block text-6xl font-bold tabular-nums leading-none text-primary sm:text-7xl"
                />
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-16 bg-line"
                />
                <p className="mt-3 max-w-[18ch] text-sm font-medium leading-snug text-ink-soft">
                  {t(`items.${key}`)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
