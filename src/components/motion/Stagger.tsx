"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_SOFT, REVEAL_DISTANCE, STAGGER } from "./tokens";

/**
 * Staggered group reveal: wrap a list in <Stagger>, each child in
 * <StaggerItem>. Used for card grids, nav items, hero sequences.
 */
export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: STAGGER, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: REVEAL_DISTANCE },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: EASE_SOFT },
        },
      }}
    >
      {children}
    </Tag>
  );
}
