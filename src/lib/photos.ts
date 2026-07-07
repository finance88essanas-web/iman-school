/**
 * PHOTOGRAPHY REGISTRY — the single swap point for imagery.
 *
 * REAL SCHOOL PHOTOS live in `/public/photos/` and are referenced as
 * `/photos/pN.jpg` (client-provided; see public/photos/README for the
 * paste-order → filename map). Slots still on Unsplash `u(...)` are
 * awaiting a real photo — replacing the URL here rethemes every usage;
 * nothing else in the codebase references image sources.
 */
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?q=75&w=${w}&auto=format&fit=crop`;

export const photos = {
  // hero — TODO-CLIENT: awaiting a real wide campus/classroom photo
  hero: u("1509062522246-3755977927d7", 2200), // children raising hands in class
  // intro collage (currently unused — Intro is text-only now)
  study: u("1544717305-2782549b5136"),
  paint: u("1472162072942-cd5147eb3902", 1000),

  // ---- Facilities chapters ----
  labs: u("1532094349884-543bc11b234d"), // TODO-CLIENT: real science lab
  library: u("1521587760476-6c12a4b040da"),
  computers: "/photos/p4.jpg", // real: the school computer lab
  sports: u("1461896836934-ffe607ba8211"), // TODO-CLIENT: real sports court
  prayer: "/photos/p10.jpg", // real: students at the mosque / prayer hall
  theater: "/photos/p9.jpg", // real: the science-fair stage

  // ---- News ----
  grad: "/photos/p1.jpg", // real: first place, BAU trilingual language competition

  // ---- Gallery (all real) ----
  kgGraduation: "/photos/p2.jpg", // KG3 graduation ceremony 2026
  assembly: "/photos/p5.jpg", // students cheering at an event
  scientist: "/photos/p6.jpg", // "Scientist of the Month" award
  volunteering: "/photos/p7.jpg", // volunteering awareness session
  karate: "/photos/p8.jpg", // international karate championship — silver
} as const;
