import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  IconBlocks,
  IconBookText,
  IconBus,
  IconPalette,
  IconField,
} from "@/components/ui/icons";

/**
 * STUDENT LIFE — a scattering of event stamps: tilted badges in mixed
 * fills and shapes, like the back of a well-traveled notebook. They
 * straighten when touched. The section's energy is the design.
 */
const ACTIVITIES = [
  {
    key: "trips",
    Icon: IconBus,
    tilt: "-rotate-[2deg]",
    fill: "bg-primary text-on-primary",
    shape: "rounded-3xl",
  },
  {
    key: "clubs",
    Icon: IconBlocks,
    tilt: "rotate-[3deg]",
    fill: "bg-accent-soft text-ink border border-accent/40",
    shape: "rounded-full",
  },
  {
    key: "sports",
    Icon: IconField,
    tilt: "-rotate-[3deg]",
    fill: "bg-[#0a2a38] text-accent-soft",
    shape: "rounded-full",
  },
  {
    key: "quran",
    Icon: IconBookText,
    tilt: "rotate-[2deg]",
    fill: "bg-primary-soft text-primary border border-primary/30",
    shape: "rounded-3xl",
  },
  {
    key: "arts",
    Icon: IconPalette,
    tilt: "-rotate-[1.5deg]",
    fill: "bg-accent text-[#0a2a38]",
    shape: "rounded-2xl",
  },
] as const;

export async function StudentLife() {
  const t = await getTranslations("home.life");

  return (
    <Section id="life" className="scroll-mt-24">
      <Reveal>
        <SectionHeader
          index="06"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          align="center"
        />
      </Reveal>

      <Stagger className="mx-auto mt-20 max-w-4xl">
        <ul className="flex flex-wrap items-start justify-center gap-x-6 gap-y-9">
          {ACTIVITIES.map(({ key, Icon, tilt, fill, shape }, i) => (
            <StaggerItem
              key={key}
              as="li"
              className={i % 2 === 1 ? "sm:mt-10" : ""}
            >
              <div
                className={`${tilt} ${fill} ${shape} w-64 p-6 shadow-soft transition-[transform,box-shadow] duration-500 hover:rotate-0 hover:shadow-lift sm:w-72 sm:p-7`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7" />
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold tabular-nums opacity-40"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{t(`items.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed opacity-80">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </ul>
      </Stagger>
    </Section>
  );
}
