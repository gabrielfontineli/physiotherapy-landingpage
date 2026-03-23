import { defineField, defineType } from "sanity"

export const guiaConfigType = defineType({
  name: "guiaConfig",
  title: "Configurações Gerais",
  type: "document",
  fields: [
    // ── TOP BAR ──
    defineField({
      name: "topBarText",
      title: "Barra do topo",
      type: "string",
      initialValue: "🔥 Oferta de lançamento · R$ 19,90 · Acesso imediato após pagamento",
    }),

    // ── HERO ──
    defineField({
      name: "heroTagline",
      title: "Hero — Tag (ex: Guia Digital — Fisioterapeuta Especialista)",
      type: "string",
      initialValue: "Guia Digital — Fisioterapeuta Especialista",
    }),
    defineField({
      name: "heroPreHeadline",
      title: "Hero — Texto antes do título",
      type: "string",
      initialValue: "Chega de sofrer com",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero — Título principal",
      type: "string",
      initialValue: "Hérnia de Disco",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Subtítulo em destaque",
      type: "string",
      initialValue: "e nervo ciático",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero — Descrição",
      type: "text",
      rows: 3,
      initialValue:
        "O protocolo criado por fisioterapeuta especialista para você aliviar a dor, retomar sua vida e parar de depender só de remédio — tudo em casa.",
    }),
    defineField({
      name: "heroSocialProof",
      title: "Hero — Texto de prova social",
      type: "string",
      initialValue: "+50 avaliações 5 estrelas no Google",
    }),

    // ── PRICING ──
    defineField({
      name: "pricingOriginal",
      title: "Preço original (riscado)",
      type: "string",
      initialValue: "R$ 47,00",
    }),
    defineField({
      name: "pricingInstallments",
      title: "Preço parcelado",
      type: "string",
      initialValue: "2x de R$ 9,95",
    }),
    defineField({
      name: "pricingFull",
      title: "Preço à vista",
      type: "string",
      initialValue: "R$ 19,90",
    }),

    // ── AUTHOR ──
    defineField({
      name: "authorName",
      title: "Nome do autor",
      type: "string",
      initialValue: "Dr. Guilherme Carvalho",
    }),
    defineField({
      name: "authorCredential",
      title: "Credencial (ex: Fisioterapeuta · CREFITO 1 318268-F)",
      type: "string",
      initialValue: "Fisioterapeuta · CREFITO 1 318268-F",
    }),
    defineField({
      name: "authorBio",
      title: "Bio do autor",
      type: "text",
      rows: 4,
      initialValue:
        "Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes em todo o Brasil.",
    }),
    defineField({
      name: "authorSpecializations",
      title: "Especializações (tags)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Osteopatia", "Quiropraxia", "Acupuntura"],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configurações Gerais" }),
  },
})
