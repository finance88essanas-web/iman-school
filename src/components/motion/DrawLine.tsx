"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_SOFT } from "./tokens";

/**
 * A horizontal line that draws itself in when scrolled into view —
 * used for the stages journey thread. Direction-aware via CSS origin
 * classes passed by the caller (origin-left rtl:origin-right).
 */
export function DrawLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left rtl:origin-right ${className}`}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.4, delay: 0.35, ease: EASE_SOFT }}
    />
  );
}
