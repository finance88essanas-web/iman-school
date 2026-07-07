import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans, Amiri, Lora } from "next/font/google";

/**
 * Type system: IBM Plex Sans Arabic + IBM Plex Sans.
 * Chosen deliberately: the pair is designed as one superfamily, so Arabic
 * and Latin share optical weight and rhythm — the single hardest thing to
 * get right on a bilingual site. The token architecture keeps both roles
 * (--font-display / --font-body) swappable in one place if the school's
 * brand assets later justify a characterful display face (e.g. a 29LT
 * family) without touching any component.
 */
export const arabicSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const latinSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

/**
 * Quote voice — a second register reserved for testimony and mission
 * statements only. Amiri (naskh) gives Arabic quotes the warmth of print;
 * Lora italic does the same for Latin. Scarcity keeps it precious.
 */
export const arabicQuote = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-quote-arabic",
  display: "swap",
});

export const latinQuote = Lora({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-quote-latin",
  display: "swap",
});
