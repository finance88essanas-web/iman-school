"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_SOFT } from "@/components/motion/tokens";
import { photos } from "@/lib/photos";

/**
 * FACILITIES — the dark immersive chapter: an oversized typographic index
 * on one side; on the other, layered photography — a large plate, an
 * offset detail card, and a giant ghost numeral floating behind. Full
 * keyboard tab semantics preserved.
 */
const FACILITIES = [
  { key: "labs", photo: photos.labs },
  { key: "computers", photo: photos.computers },
  { key: "sports", photo: photos.sports },
  { key: "prayer", photo: photos.prayer },
  { key: "theater", photo: photos.theater },
] as const;

export function Facilities() {
  const t = useTranslations("home.facilities");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // On small screens the photo plate sits above the index — bring it into
  // view when a facility is picked, so the tap visibly answers.
  const select = (i: number) => {
    setActive(i);
    if (window.innerWidth < 1024) {
      document.getElementById("facility-panel")?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + FACILITIES.length) % FACILITIES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = FACILITIES[active];

  return (
    <Section
      tone="dark"
      className="relative z-10 -mt-9 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3rem]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 start-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(139,124,216,0.13),transparent_70%)]"
      />
      <div className="relative">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow={t("eyebrow")}
            title={t("title")}
            lead={t("lead")}
            layout="split"
            tone="dark"
          />
        </Reveal>

        <div className="mt-20 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* typographic index */}
          <div
            role="tablist"
            aria-label={t("title")}
            onKeyDown={onKeyDown}
            className="order-2 lg:order-1"
          >
            {FACILITIES.map(({ key }, i) => {
              const selected = i === active;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`facility-tab-${key}`}
                  aria-selected={selected}
                  aria-controls="facility-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={`group flex w-full items-baseline gap-5 border-b border-white/10 py-5 text-start transition-[padding] duration-500 first:border-t ${
                    selected ? "ps-3" : "hover:ps-2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`text-sm font-bold tabular-nums transition-colors duration-300 ${
                      selected ? "text-accent" : "text-white/30"
                    }`}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-2xl font-bold transition-colors duration-300 sm:text-3xl ${
                      selected
                        ? "text-on-primary"
                        : "text-outline text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {t(`items.${key}.title`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ms-auto h-2 w-2 rounded-full bg-accent transition-opacity duration-300 ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* layered plate */}
          <div
            id="facility-panel"
            role="tabpanel"
            aria-labelledby={`facility-tab-${current.key}`}
            className="relative order-1 lg:order-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_SOFT }}
                className="relative pb-14"
              >
                {/* ghost numeral behind */}
                <span
                  aria-hidden="true"
                  className="text-outline absolute -top-12 end-2 z-10 text-[7rem] font-bold tabular-nums text-accent/60 sm:text-[9rem]"
                  dir="ltr"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <Photo
                  src={current.photo}
                  alt={t(`items.${current.key}.title`)}
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  className="aspect-[16/11] rounded-3xl shadow-lift"
                />
                {/* offset caption card */}
                <div className="absolute -bottom-0 start-6 end-6 rounded-2xl border border-white/10 bg-[#06222e]/85 p-6 shadow-lift backdrop-blur-md sm:start-10 sm:end-auto sm:max-w-md">
                  <h3 className="text-lg font-bold text-on-primary">
                    {t(`items.${current.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-primary/75">
                    {t(`items.${current.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
