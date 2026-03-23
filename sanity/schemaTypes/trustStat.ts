import { defineField, defineType } from "sanity"

export const trustStatType = defineType({
  name: "trustStat",
  title: "Estatísticas de Confiança",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Valor (ex: +50)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Rótulo (ex: Avaliações 5 estrelas)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sub",
      title: "Subtexto (ex: no Google)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "value" } },
})
