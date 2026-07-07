import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/ui/Logo";

/**
 * LIVING PROOF — a quiet dark interlude before the closing gate: this very
 * website, built by a student of the school. Deliberately the sparsest
 * section on the page; the restraint is the message.
 */
export async function StudentProof() {
  const t = await getTranslations("home.proof");

  return (
    <section className="relative z-10 -mt-9 overflow-hidden rounded-t-[2.5rem] bg-[linear-gradient(180deg,#06222e_0%,#0d3f54_100%)] text-on-primary md:rounded-t-[3rem]">
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,124,216,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-2xl px-5 pb-36 pt-24 text-center sm:px-8 md:pb-48 md:pt-32">
        <Reveal>
          <LogoMark className="mx-auto h-14 w-14 text-accent-soft opacity-90" />
          <p className="type-eyebrow mt-8 flex items-center justify-center gap-3 text-accent-soft">
            <span aria-hidden="true" className="h-px w-7 bg-accent" />
            {t("eyebrow")}
            <span aria-hidden="true" className="h-px w-7 bg-accent" />
          </p>
          <h2 className="type-h2 mt-6 text-on-primary">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="type-quote mt-8 text-on-primary/85">{t("p1")}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 text-xl font-bold leading-relaxed text-[#c7bce8]">
            {t("p2")}
          </p>
          <p className="mt-10 text-sm font-semibold tracking-wide text-on-primary/60">
            — {t("signature")} —
          </p>
        </Reveal>
      </div>
    </section>
  );
}
