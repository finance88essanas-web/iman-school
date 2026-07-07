"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { dataset, projectId } from "./src/sanity/env";

/**
 * Embedded Sanity Studio, served at /studio.
 * Structure: singletons pinned on top, content collections below —
 * organized around how the school's editors think, not around types.
 */
export default defineConfig({
  name: "iman-school",
  title: "Al Iman School — Content Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("branch").title("Branches"),
            S.documentTypeListItem("tuitionTable").title("Tuition & Fees"),
            S.divider(),
            S.documentTypeListItem("newsPost").title("News"),
            S.documentTypeListItem("schoolEvent").title("Events"),
            S.documentTypeListItem("galleryAlbum").title("Galleries"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faqItem").title("FAQ"),
            S.documentTypeListItem("careerOpening").title("Careers"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
