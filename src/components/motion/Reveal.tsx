"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_SOFT, REVEAL_DISTANCE } from "./tokens";

interface RevealProps {
  children: ReactNode;
  /** Seconds — used to hand-choreograph small sequences. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/**
 * The site's standard scroll reveal: fade + gentle rise, once per element.
 * Vertical-only movement, so it is direction-agnostic (RTL-safe by design).
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: REVEAL_DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: DURATION.base, delay, ease: EASE_SOFT }}
    >
      {children}
    </Tag>
  );
}
