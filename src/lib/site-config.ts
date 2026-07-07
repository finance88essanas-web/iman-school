/**
 * SITE CONFIG — the "single campus today, network tomorrow" contract.
 *
 * A Branch is a first-class entity. Every component that touches location
 * data consumes `branches[]`, never a hardcoded campus. Adding a branch
 * later = adding one object here (and, once the CMS is live, one Branch
 * document in Sanity) — zero refactoring.
 *
 * ⚠ TODO-CLIENT: every value marked TODO is a placeholder awaiting
 * confirmed facts from the school. Nothing marked TODO may ship.
 */

export type Cycle = "kg" | "elementary" | "intermediate" | "secondary";

export interface Branch {
  slug: string;
  name: { ar: string; en: string };
  town: { ar: string; en: string };
  cycles: Cycle[];
  phone: string; // TODO-CLIENT
  whatsapp: string; // international format, digits only — TODO-CLIENT
  email: string; // TODO-CLIENT
  address: { ar: string; en: string }; // TODO-CLIENT
  geo: { lat: number; lng: number }; // TODO-CLIENT (approx. Aramoun for now)
  isMain: boolean;
}

export const branches: Branch[] = [
  {
    slug: "aramoun",
    name: {
      ar: "ثانويّة الإيمان النموذجية – عرمون",
      en: "Al Iman Model High School – Aramoun",
    },
    town: { ar: "عرمون", en: "Aramoun" },
    cycles: ["kg", "elementary", "intermediate", "secondary"],
    phone: "+96178847845",
    whatsapp: "96178847845",
    email: "alimanaramoun@gmail.com",
    address: {
      ar: "عرمون، جبل لبنان", // TODO-CLIENT exact address
      en: "Aramoun, Mount Lebanon", // TODO-CLIENT exact address
    },
    geo: { lat: 33.7643, lng: 35.4917 }, // TODO-CLIENT exact pin
    isMain: true,
  },
];

export const mainBranch = branches.find((b) => b.isMain) ?? branches[0];

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2002,
  socials: {
    facebook: "https://www.facebook.com/alimanaramoun",
    instagram: "https://www.instagram.com/alimanaramoun",
  },
  /** Google Maps by name — lands on the school's own place listing. */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "ثانوية الإيمان النموذجية عرمون Al Iman School Aramoun",
  )}`,
};

export const whatsappHref = (branch: Branch = mainBranch) =>
  `https://wa.me/${branch.whatsapp}`;
