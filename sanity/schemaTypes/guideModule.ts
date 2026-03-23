import { defineField, defineType } from "sanity"

export const guideModuleType = defineType({
  name: "guideModule",
  title: "Módulos do Guia",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Número (ex: 01)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
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
  preview: { select: { title: "title", subtitle: "number" } },
})
