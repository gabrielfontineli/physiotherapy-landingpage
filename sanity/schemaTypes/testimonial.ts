import { defineField, defineType } from "sanity"

export const testimonialType = defineType({
  name: "testimonial",
  title: "Depoimentos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "time",
      title: "Horário (ex: 21:43)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Mensagem",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "text" },
  },
})
