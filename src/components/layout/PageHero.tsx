import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArchContours } from "@/components/ui/ArchContours";

/**
 * Inner-page opener: compact dark plate, word-staggered editorial title,
 * one contour. `sheet` curves the following section's tone up over this
 * plate — no flat cuts (sections with their own overlap pass "none").
 */
export async function PageHero({
  title,
  lead,
  sheet = "none",
}: {
  title: string;
  lead: string;
  sheet?: "paper" | "deep" | "sky" | "none";
}) {
  const t = await getTranslations("site");
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#06222e_0%,#1d6a85_100%)] text-on-primary">
      <ArchContours
        layers={4}
        className="absolute -bottom-[45%] end-[-8%] h-[160%] text-white opacity-[0.05]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 start-[-8%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(139,124,216,0.14),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-40 sm:px-8 md:pb-32 md:pt-48">
        <Reveal>
          <p className="type-eyebrow flex items-center gap-3 text-accent-soft">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {t("name")}
          </p>
        </Reveal>
        <h1 className="type-h1 mt-5 max-w-3xl text-on-primary">
          <SplitWords text={title} delay={0.1} />
        </h1>
        <Reveal delay={0.25}>
          <p className="type-lead mt-6 max-w-xl text-on-primary/80">{lead}</p>
        </Reveal>
      </div>
      {sheet !== "none" ? (
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-9 rounded-t-[2.5rem] md:rounded-t-[3rem] ${
            sheet === "paper"
              ? "bg-paper"
              : sheet === "sky"
                ? "bg-[#f1f8fb]"
                : "bg-[linear-gradient(180deg,#f4ecd9,#f4ecd9)]"
          }`}
        />
      ) : null}
    </section>
  );
}
