"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/components/motion/tokens";
import { QuoteMark } from "@/components/ui/icons";
import { DirectionalArrow } from "@/components/ui/DirectionalArrow";

/**
 * TESTIMONIALS — a theater for one voice at a time: a single enormous
 * serif quote under a towering ghost quote mark, with quiet pagination.
 * ⚠ TODO-CLIENT: placeholder quotes — replace with consented parent
 * testimonials before launch.
 */
const ITEMS = ["t1", "t2", "t3"] as const;

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const ta = useTranslations("a11y");
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((idx + d + ITEMS.length) % ITEMS.length);
  const key = ITEMS[idx];

  return (
    <Section className="relative overflow-hidden">
      <QuoteMark className="pointer-events-none absolute -top-10 start-1/2 h-56 w-56 -translate-x-1/2 text-primary opacity-[0.05] md:h-72 md:w-72" />

      <Reveal>
        <SectionHeader
          index="08"
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="center"
        />
      </Reveal>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <div aria-live="polite" className="min-h-[16rem] sm:min-h-[13rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={key}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_SOFT }}
            >
              <blockquote className="type-quote text-2xl leading-relaxed text-ink sm:text-[1.75rem]">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <span className="block text-base font-bold text-primary">
                  {t(`items.${key}.name`)}
                </span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {t(`items.${key}.role`)}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* pagination */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={ta("prev")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-accent-strong hover:text-accent-strong"
          >
            <DirectionalArrow className="-scale-x-100" />
          </button>
          <div className="flex gap-2.5">
            {ITEMS.map((k, i) => (
              <button
                key={k}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`${i + 1} / ${ITEMS.length}`}
                aria-current={i === idx ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === idx ? "w-8 bg-accent-strong" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={ta("next")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-accent-strong hover:text-accent-strong"
          >
            <DirectionalArrow />
          </button>
        </div>
      </div>
    </Section>
  );
}
