import { defineField, defineType } from "sanity";

/**
 * Field-level localization primitives. Every human-readable field on the
 * site is one of these — editors always see Arabic and English side by
 * side, which is how both languages stay first-class.
 */

const locales = [
  { id: "ar", title: "العربية", isDefault: true },
  { id: "en", title: "English" },
];

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: locales.map((l) =>
    defineField({
      name: l.id,
      title: l.title,
      type: "string",
      validation: (r) => (l.isDefault ? r.required() : r),
    }),
  ),
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: locales.map((l) =>
    defineField({ name: l.id, title: l.title, type: "text", rows: 4 }),
  ),
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: locales.map((l) =>
    defineField({
      name: l.id,
      title: l.title,
      type: "array",
      of: [{ type: "block" }],
    }),
  ),
});

export const localeSlug = defineType({
  name: "localeSlug",
  title: "Localized slug",
  type: "object",
  fields: locales.map((l) =>
    defineField({ name: l.id, title: l.title, type: "slug" }),
  ),
});
