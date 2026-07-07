import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * INTRO — the school's identity charter: «من نحن»، «رسالتنا»، «أهدافنا»
 * set as graded light-blue plaques (lightest → deepest), closed by the
 * association ribbon naming the network the school belongs to.
 */
export async function Intro() {
  const t = await getTranslations("home.intro");
  const goals = t.raw("goals.items") as string[];
  const branches = t.raw("affiliation.branches") as string[];

  return (
    <Section
      id="about"
      tone="sky"
      className="relative z-10 -mt-9 scroll-mt-24 rounded-t-[2.5rem] md:rounded-t-[3rem]"
    >
      <Reveal>
        <SectionHeader index="01" eyebrow={t("eyebrow")} title={t("title")} />
      </Reveal>

      {/* who we are / our mission — two shades of school blue */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card-thread h-full rounded-3xl bg-[#e9f4f9] p-8 shadow-soft ring-1 ring-[#c6e0ec] sm:p-10">
            <h3 className="type-h3 text-primary-deep">{t("who.title")}</h3>
            <p className="mt-4 text-lg leading-loose text-ink-soft">
              {t("who.body")}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-thread h-full rounded-3xl bg-[#d8ebf3] p-8 shadow-soft ring-1 ring-[#b9d6e5] sm:p-10">
            <h3 className="type-h3 text-primary-deep">{t("mission.title")}</h3>
            <p className="mt-4 text-lg leading-loose text-ink-soft">
              {t("mission.body")}
            </p>
          </div>
        </Reveal>
      </div>

      {/* our goals — numbered, two columns */}
      <Reveal delay={0.15}>
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#cbe4ef] to-[#e9f4f9] p-8 shadow-soft ring-1 ring-[#b9d6e5] sm:p-10">
          <h3 className="type-h3 text-primary-deep">{t("goals.title")}</h3>
          <ul className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold tabular-nums text-on-primary"
                  dir="ltr"
                >
                  {i + 1}
                </span>
                <span className="pt-1.5 font-medium leading-relaxed text-ink">
                  {goal}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* the network we belong to */}
      <Reveal delay={0.2}>
        <div className="mt-6 rounded-3xl bg-primary-deep p-8 text-on-primary shadow-soft sm:p-10">
          <p className="type-eyebrow flex items-center gap-3 text-accent-soft">
            <span aria-hidden="true" className="h-px w-7 bg-accent" />
            {t("affiliation.title")}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-loose text-on-primary/90">
            {t("affiliation.body")}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {branches.map((branch) => {
              const isHome = branch === "عرمون" || branch === "Aramoun";
              return (
                <li
                  key={branch}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    isHome
                      ? "bg-accent text-[#0a2a38]"
                      : "border border-white/20 bg-white/[0.06] text-on-primary/90"
                  }`}
                >
                  {branch}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
