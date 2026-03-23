import { defineField, defineType } from "sanity"

export const faqType = defineType({
  name: "faq",
  title: "Perguntas Frequentes",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Pergunta",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Resposta",
      type: "text",
      rows: 5,
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
    select: { title: "question" },
  },
})
