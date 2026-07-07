"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_SOFT } from "./tokens";

/**
 * Word-by-word masked rise for hero-scale headlines. Splitting on spaces
 * is safe for Arabic (shaping/ligatures never cross a space). Each word
 * sits in an overflow-hidden sleeve with a touch of padding so ascenders,
 * descenders, and diacritics are never clipped mid-animation.
 *
 * `highlight` marks a phrase (must match words from `text`) that renders
 * in warm gold — the headline's single point of emphasis.
 */
export function SplitWords({
  text,
  highlight,
  className = "",
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  highlight?: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const highlightWords = new Set(highlight ? highlight.split(" ") : []);
  // Highlighted words switch to the quote voice (Amiri / Lora italic) in
  // warm gold — the editorial mixed-type signature.
  const tone = (word: string) =>
    highlightWords.has(word)
      ? "text-[#c7bce8] [font-family:var(--font-quote)]"
      : "";

  if (reduce) {
    return (
      <span className={className}>
        {text.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className={tone(word)}>
            {i > 0 ? " " : ""}
            {word}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* Real space between sleeves — inline-blocks swallow JSX whitespace,
              which fused adjacent words (most visibly in Arabic). */}
          {i > 0 ? " " : ""}
        <span
          className="inline-block overflow-hidden px-[0.12em] py-[0.14em] -mx-[0.12em] -my-[0.14em] align-baseline"
        >
          <motion.span
            className={`inline-block will-change-transform ${tone(word)}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: EASE_SOFT,
            }}
          >
            {word}
          </motion.span>
        </span>
        </Fragment>
      ))}
    </span>
  );
}
