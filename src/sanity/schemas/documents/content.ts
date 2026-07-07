import { defineField, defineType } from "sanity";

/** News: narrative storytelling posts — the "school is alive" signal. */
export const newsPost = defineType({
  name: "newsPost",
  title: "News post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "localeSlug", validation: (r) => r.required() }),
    defineField({ name: "branch", type: "reference", to: [{ type: "branch" }] }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "cover", type: "seoImage", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "localeText" }),
    defineField({ name: "body", type: "localeBlock" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title.ar", media: "cover", subtitle: "publishedAt" } },
});

export const schoolEvent = defineType({
  name: "schoolEvent",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "branch", type: "reference", to: [{ type: "branch" }] }),
    defineField({ name: "start", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "end", type: "datetime" }),
    defineField({ name: "location", type: "localeString" }),
    defineField({ name: "description", type: "localeText" }),
  ],
  preview: { select: { title: "title.ar", subtitle: "start" } },
});

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery album",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "branch", type: "reference", to: [{ type: "branch" }] }),
    defineField({ name: "date", type: "date" }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "seoImage" }],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "title.ar", media: "images.0" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author (e.g. 'Parent of a Grade 4 student')", type: "localeString" }),
    defineField({ name: "branch", type: "reference", to: [{ type: "branch" }] }),
  ],
  preview: { select: { title: "author.ar" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "document",
  fields: [
    defineField({ name: "question", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "localeBlock", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "question.ar" } },
});

export const careerOpening = defineType({
  name: "careerOpening",
  title: "Career opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "branch", type: "reference", to: [{ type: "branch" }] }),
    defineField({ name: "description", type: "localeBlock" }),
    defineField({ name: "isOpen", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title.ar" } },
});
