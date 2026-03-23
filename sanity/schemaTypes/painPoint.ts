import { defineField, defineType } from "sanity"

export const painPointType = defineType({
  name: "painPoint",
  title: "Pontos de Dor",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Texto",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "text" } },
})
