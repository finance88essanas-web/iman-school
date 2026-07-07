import { defineField, defineType } from "sanity";

/** Singleton: network-level settings edited by the head office. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "schoolName", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "localeString" }),
    defineField({ name: "defaultSeoDescription", type: "localeText" }),
    defineField({ name: "foundedYear", type: "number" }),
    defineField({ name: "facebook", type: "url" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "registrationOpenFor", title: "Registration open for (e.g. 2026–2027)", type: "localeString" }),
  ],
});
