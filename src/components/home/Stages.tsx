import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import type { Cycle } from "@/lib/site-config";

/**
 * ACADEMIC STAGES — a vertical journey timeline: one gold thread, four
 * star stations, enormous ghost numerals, and rows that step forward on
 * hover. No cards anywhere.
 */
const STAGES: { key: Cycle; index: string }[] = [
  { key: "kg", index: "01" },
  { key: "elementary", index: "02" },
  { key: "intermediate", index: "03" },
  { key: "secondary", index: "04" },
];

export async function Stages() {
  const t = await getTranslations("home.stages");

  return (
    <Section id="stages" tone="sky" className="scroll-mt-24">
      <Reveal>
        <SectionHeader
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          layout="split"
        />
      </Reveal>

      <div className="relative mt-20 lg:mx-16">
        {/* the thread */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 start-[7px] top-4 w-px bg-gradient-to-b from-accent/0 via-accent/70 to-accent/0"
        />
        <ol>
          {STAGES.map(({ key, index }, i) => (
            <li key={key} className="relative">
              <Reveal delay={i * 0.08}>
                <div className="group grid gap-x-8 gap-y-2.5 border-b border-[#c2dcea] py-7 ps-10 transition-[padding] duration-500 first:border-t hover:ps-13 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center md:py-8 lg:gap-x-12">
                  {/* station */}
                  <span
                    aria-hidden="true"
                    className="absolute start-0 top-1/2 flex h-[15px] w-[15px] -translate-y-1/2 items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      className="h-full w-full text-accent transition-transform duration-500 group-hover:scale-150"
                    >
                      <path d="M6 0l1.4 3.2L10.6 2 9.2 5.2 12 6 9.2 6.8l1.4 3.2-3.2-1.2L6 12 4.6 8.8 1.4 10l1.4-3.2L0 6l2.8-.8L1.4 2l3.2 1.2L6 0Z" />
                    </svg>
                  </span>
                  {/* ghost numeral */}
                  <span
                    aria-hidden="true"
                    className="text-outline text-4xl font-bold tabular-nums text-[#b9d6e5] transition-colors duration-500 group-hover:text-accent/50 sm:text-5xl"
                    dir="ltr"
                  >
                    {index}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-ink sm:text-[1.7rem]">
                      {t(`items.${key}.name`)}
                    </h3>
                    <p className="type-body mt-1.5 max-w-2xl">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                  <span className="justify-self-start rounded-full border border-accent/40 bg-accent-soft/50 px-4 py-1.5 text-sm font-bold text-accent-strong sm:justify-self-end">
                    {t(`items.${key}.ages`)}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
