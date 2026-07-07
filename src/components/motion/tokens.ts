/**
 * MOTION FOUNDATION — one vocabulary for the whole site.
 * Philosophy: motion as reveal and reassurance. Transform + opacity only
 * (compositor-friendly on older iPhones). Every effect collapses under
 * prefers-reduced-motion.
 */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.55,
  slow: 0.8,
} as const;

export const REVEAL_DISTANCE = 18; // px
export const STAGGER = 0.09; // s between siblings
