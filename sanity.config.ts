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
              .title("⚙️ Configurações Gerais")
              .child(
                S.document()
                  .schemaType("guiaConfig")
                  .documentId("guia-config")
                  .title("Configurações Gerais")
              ),
            S.divider(),
            S.listItem()
              .title("💬 Depoimentos")
              .child(S.documentTypeList("testimonial").title("Depoimentos")),
            S.listItem()
              .title("❓ Perguntas Frequentes")
              .child(S.documentTypeList("faq").title("Perguntas Frequentes")),
            S.listItem()
              .title("📦 Módulos do Guia")
              .child(S.documentTypeList("guideModule").title("Módulos do Guia")),
            S.listItem()
              .title("😣 Pontos de Dor")
              .child(S.documentTypeList("painPoint").title("Pontos de Dor")),
            S.listItem()
              .title("✅ Para Quem É")
              .child(S.documentTypeList("forWhoItem").title("Para Quem É")),
            S.listItem()
              .title("📊 Estatísticas de Confiança")
              .child(S.documentTypeList("trustStat").title("Estatísticas de Confiança")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
