import { defineField, defineType } from "sanity";

/** Image with mandatory bilingual alt text — accessibility + SEO by construction. */
export const seoImage = defineType({
  name: "seoImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      validation: (r) => r.required(),
    }),
  ],
});
