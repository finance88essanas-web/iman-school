import { defineField, defineType } from "sanity";

/**
 * BRANCH — the scalability contract of the entire platform.
 * Single campus today (Aramoun); adding a branch later is creating one
 * more of these documents. News, events, careers, galleries, and tuition
 * all reference a branch, so branch pages assemble themselves.
 */
export const branch = defineType({
  name: "branch",
  title: "Branch",
  type: "document",
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "town", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "isMain", title: "Main campus", type: "boolean", initialValue: false }),
    defineField({
      name: "cycles",
      title: "Cycles offered",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "KG / Preschool", value: "kg" },
          { title: "Elementary", value: "elementary" },
          { title: "Intermediate (Brevet)", value: "intermediate" },
          { title: "Secondary (Baccalaureate)", value: "secondary" },
        ],
      },
    }),
    defineField({ name: "principalWord", title: "Principal's word", type: "localeBlock" }),
    defineField({ name: "heroImage", type: "seoImage" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (digits only, intl format)", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "address", type: "localeString" }),
    defineField({ name: "geo", type: "geopoint" }),
  ],
  preview: {
    select: { title: "name.ar", subtitle: "town.en" },
  },
});
