import { defineField, defineType } from "sanity";

/**
 * TUITION & FEES — fully CMS-controlled, per branch.
 * displayMode gives the school three levels of disclosure without any
 * redesign: exact figures, ranges, or "contact us" — per cycle row.
 */
export const tuitionTable = defineType({
  name: "tuitionTable",
  title: "Tuition & Fees",
  type: "document",
  fields: [
    defineField({
      name: "branch",
      type: "reference",
      to: [{ type: "branch" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "academicYear",
      title: "Academic year (e.g. 2026–2027)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "currency",
      type: "string",
      options: { list: ["USD", "LBP"] },
      initialValue: "USD",
    }),
    defineField({
      name: "rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "feeRow",
          fields: [
            defineField({ name: "cycle", title: "Cycle / grade band", type: "localeString" }),
            defineField({
              name: "displayMode",
              type: "string",
              options: {
                list: [
                  { title: "Exact amount", value: "exact" },
                  { title: "Range", value: "range" },
                  { title: "Inquire", value: "inquire" },
                ],
                layout: "radio",
              },
              initialValue: "inquire",
            }),
            defineField({ name: "amount", type: "number", hidden: ({ parent }) => parent?.displayMode !== "exact" }),
            defineField({ name: "min", type: "number", hidden: ({ parent }) => parent?.displayMode !== "range" }),
            defineField({ name: "max", type: "number", hidden: ({ parent }) => parent?.displayMode !== "range" }),
            defineField({ name: "note", type: "localeString" }),
          ],
        },
      ],
    }),
    defineField({ name: "generalNotes", title: "Notes (payment plans, sibling discounts…)", type: "localeText" }),
  ],
  preview: { select: { title: "academicYear", subtitle: "branch.name.en" } },
});
