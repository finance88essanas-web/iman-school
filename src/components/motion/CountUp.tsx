"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_SOFT } from "./tokens";

const formatter = new Intl.NumberFormat("en-US");

/**
 * Counting number for the stats band. The final value is server-rendered
 * (SEO + no-JS safe); when the element scrolls into view the JS counts up
 * from zero. Collapses to the static value under reduced motion.
 */
export function CountUp({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !numberRef.current) return;
    const node = numberRef.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_SOFT,
      onUpdate: (v) => {
        node.textContent = formatter.format(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    // Numbers render LTR even inside Arabic text.
    <span ref={ref} dir="ltr" className={`bidi-isolate ${className}`}>
      <span ref={numberRef}>{formatter.format(value)}</span>
      {suffix ? (
        <span className="ms-0.5 align-top text-[0.55em] font-bold text-accent-strong">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
