import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

export default defineConfig({
  name: "guia-hernia-disco",
  title: "Guia Hérnia de Disco",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Depoimentos")
              .child(S.documentTypeList("testimonial").title("Depoimentos")),
            S.listItem()
              .title("Perguntas Frequentes")
              .child(S.documentTypeList("faq").title("Perguntas Frequentes")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
