import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { DirectionalArrow } from "@/components/ui/DirectionalArrow";
import {
  IconAward,
  IconBookText,
  IconHeart,
  IconLanguages,
  IconMessage,
  IconShield,
  IconUsers,
} from "@/components/ui/icons";
import { whatsappHref } from "@/lib/site-config";

/**
 * WHY CHOOSE US — an editorial ledger, not a card grid: the pitch stays
 * pinned on the start side while six numbered reasons scroll past it.
 */
const REASONS = [
  { key: "safety", Icon: IconShield },
  { key: "values", Icon: IconBookText },
  { key: "educators", Icon: IconUsers },
  { key: "results", Icon: IconAward },
  { key: "languages", Icon: IconLanguages },
  { key: "health", Icon: IconHeart },
  { key: "care", Icon: IconMessage },
] as const;

// The poster's three voices — petrol, purple, green — cycling through the
// ledger so the list reads as playful, not administrative.
const REASON_TONES = [
  "text-primary",
  "text-accent-strong",
  "text-[#2e9d72]",
] as const;

export async function WhyUs() {
  const t = await getTranslations("home.why");
  const ta = await getTranslations("actions");

  return (
    <Section id="why" tone="deep" className="scroll-mt-24">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* Pinned pitch */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionHeader index="04" eyebrow={t("eyebrow")} title={t("title")} />
          </Reveal>
          <Reveal delay={0.12}>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary"
            >
              <span className="link-draw">{ta("whatsapp")}</span>
              <DirectionalArrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Numbered ledger — hairlines and type only, no boxes */}
        <Stagger>
          <ul className="border-t border-ink/15">
            {REASONS.map(({ key, Icon }, i) => {
              const tone = REASON_TONES[i % REASON_TONES.length];
              return (
              <StaggerItem key={key} as="li">
                <div className="group flex items-start gap-6 border-b border-ink/15 py-8 transition-[padding] duration-500 sm:gap-8 sm:hover:ps-4">
                  <span
                    aria-hidden="true"
                    className={`pt-0.5 text-3xl font-bold tabular-nums opacity-80 transition-opacity duration-500 group-hover:opacity-100 ${tone}`}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <h3 className={`text-xl font-bold sm:text-2xl ${tone}`}>
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="type-body mt-2 max-w-prose">
                      {t(`items.${key}.desc`)}
                    </p>
                  </span>
                  <Icon className={`mt-1.5 hidden h-6 w-6 shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:block ${tone}`} />
                </div>
              </StaggerItem>
              );
            })}
          </ul>
        </Stagger>
      </div>
    </Section>
  );
}
