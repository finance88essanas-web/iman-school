"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/ui/Logo";
import { EASE_SOFT } from "./tokens";

/**
 * ENTRY SPLASH — the crest pops over the blurred page, holds a beat, then
 * zooms through the viewer in 3D as the homepage is revealed beneath.
 * Once per browser session; skipped entirely under reduced motion.
 */
export function SplashIntro() {
  const t = useTranslations("site");
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("iman-splash")) return;
      sessionStorage.setItem("iman-splash", "1");
    } catch {
      /* storage unavailable — still play once */
    }
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/50 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.55, delay: 0.1 } }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ scale: 0.45, opacity: 0, rotateY: -75 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotateY: 0,
              transition: { duration: 0.85, ease: EASE_SOFT },
            }}
            exit={{
              scale: 7,
              opacity: 0,
              transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <LogoMark className="h-28 w-28 text-accent-soft drop-shadow-[0_10px_40px_rgba(139,124,216,0.45)] sm:h-36 sm:w-36" />
            <p className="mt-6 text-lg font-bold text-on-primary">{t("name")}</p>
            <p className="mt-1 text-sm text-accent-soft/80">
              {t("tagline")} · <span className="bidi-isolate">2002</span>
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
