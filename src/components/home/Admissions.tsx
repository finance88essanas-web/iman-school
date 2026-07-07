import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { DirectionalArrow } from "@/components/ui/DirectionalArrow";
import {
  IconCalendar,
  IconPenLine,
  IconSparkles,
  IconUsers,
} from "@/components/ui/icons";
import { whatsappHref } from "@/lib/site-config";

/**
 * ADMISSIONS — the path: four milestones on a dotted route, each a circled
 * numeral. The final station glows gold — the welcome.
 */
const STEPS = ["s1", "s2", "s3", "s4"] as const;

/** 2026–2027 fee schedule (from the school's official fee sheet). */
const FEES = [
  { key: "r1", lbp: "36,000,000", usd: "$1,600" },
  { key: "r2", lbp: "36,000,000", usd: "$1,900" },
  { key: "r3", lbp: "45,000,000", usd: "$2,100" },
  { key: "r4", lbp: "45,000,000", usd: "$2,100" },
  { key: "r5", lbp: "54,000,000", usd: "$2,300" },
  { key: "r6", lbp: "63,000,000", usd: "$2,900" },
] as const;

/** Fee footnotes, recast as scannable cards — one icon per rule. */
const FEE_NOTES = [
  { key: "registration", Icon: IconPenLine },
  { key: "siblings", Icon: IconUsers },
  { key: "newStudent", Icon: IconSparkles },
  { key: "payment", Icon: IconCalendar },
] as const;

export async function Admissions() {
  const t = await getTranslations("home.admissions");
  const tf = await getTranslations("home.fees");
  const ta = await getTranslations("actions");

  return (
    <Section id="admissions" tone="deep" className="scroll-mt-24">
      <Reveal>
        <SectionHeader
          index="09"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          layout="split"
        />
      </Reveal>

      <div className="relative mt-20">
        {/* the route */}
        <span
          aria-hidden="true"
          className="absolute inset-x-10 top-7 hidden border-t-2 border-dashed border-accent/40 lg:block"
        />
        <Stagger className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((key, i) => {
            const last = i === STEPS.length - 1;
            return (
              <StaggerItem key={key}>
                <div className="relative">
                  <span
                    className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold tabular-nums ring-4 ring-paper-deep ${
                      last
                        ? "bg-accent text-[#0a2a38]"
                        : "bg-primary text-on-primary"
                    }`}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="type-small mt-2 max-w-[26ch] leading-relaxed">
                    {t(`steps.${key}.desc`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      {/* fee schedule — a true ledger grid: every cell ruled on all sides */}
      <Reveal delay={0.1}>
        <div className="mt-24 overflow-hidden rounded-3xl bg-paper shadow-soft ring-1 ring-line/70">
          <h3 className="bg-primary px-6 py-5 text-lg font-bold text-on-primary sm:px-8">
            {tf("title")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-start text-sm">
              <thead>
                <tr className="bg-[#d8ebf3] text-xs font-bold uppercase tracking-wide text-primary-deep">
                  <th className="border border-[#b9d6e5] px-6 py-4 text-start sm:px-8">
                    {tf("grade")}
                  </th>
                  <th className="border border-[#b9d6e5] px-6 py-4 text-start">
                    {tf("lbp")}
                  </th>
                  <th className="border border-[#b9d6e5] px-6 py-4 text-start">
                    {tf("usd")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(({ key, lbp, usd }, i) => (
                  <tr
                    key={key}
                    className={`transition-colors hover:bg-accent-soft/40 ${
                      i % 2 === 1 ? "bg-[#eef6fa]" : ""
                    }`}
                  >
                    <td className="border border-line px-6 py-4 font-bold text-ink sm:px-8">
                      {tf(`rows.${key}`)}
                    </td>
                    {/* bidi isolation lives on an inner span — putting it on
                        the td turns the cell inline-block in RTL and breaks
                        the table grid */}
                    <td className="border border-line px-6 py-4 font-semibold tabular-nums text-primary">
                      <span className="bidi-isolate">{lbp}</span>
                    </td>
                    <td className="border border-line px-6 py-4 font-semibold tabular-nums text-accent-strong">
                      <span className="bidi-isolate">{usd}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-6 py-4 text-xs font-semibold text-ink-soft sm:px-8">
            {tf("stationery")}
          </p>
        </div>

        {/* the fine print, promoted to cards — one rule per plaque */}
        <h4 className="type-eyebrow mt-12 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-7 bg-accent" />
          {tf("notesTitle")}
        </h4>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEE_NOTES.map(({ key, Icon }) => (
            <div
              key={key}
              className="card-thread flex items-start gap-4 rounded-2xl bg-[#e9f4f9] p-6 shadow-soft ring-1 ring-[#c6e0ec]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-primary-deep">
                  {tf(`notes.${key}.title`)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {tf(`notes.${key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 inline-flex items-center gap-2 text-lg font-bold text-primary"
        >
          <span className="link-draw">{ta("apply")}</span>
          <DirectionalArrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </a>
      </Reveal>
    </Section>
  );
}
