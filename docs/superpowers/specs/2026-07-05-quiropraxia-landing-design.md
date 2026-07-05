# Design — Página `/quiropraxia` (landing premium SEO local)

**Data:** 2026-07-05
**Status:** Aprovado (brainstorming com Gabriel)

## Objetivo

Página nova, dedicada a SEO local de quiropraxia em Natal/RN, otimizada para
conversão em pacientes presenciais via WhatsApp. Ranquear para: "Quiropraxia
Natal", "Quiropraxista Natal RN", "Osteopatia Natal", "Dry Needling Natal",
"Tratamento para dor na coluna / hérnia de disco / nervo ciático Natal".

A home atual (`/`) **não muda**.

## Decisões tomadas

| Decisão | Escolha |
|---|---|
| Onde vive | Rota nova `app/[locale]/quiropraxia/page.tsx` |
| Direção visual | **Clínica Noir** — paleta própria, escopada à página |
| Ritmo | Seções alternam grafite ↔ osso claro (mockup aprovado no visual companion) |
| Assets | Placeholders estruturados; fotos/vídeos reais chegam depois e só trocam arquivos |
| Animação | CSS + IntersectionObserver — sem lib nova |
| FAQ/copy | `messages/*.json` (não Sanity) — conteúdo estável de SEO |
| Depoimentos | Google reviews reais via `/api/reviews` + slots de vídeo placeholder |

## Paleta Noir (escopada, não toca `globals.css` global)

Wrapper `.quiro` com CSS vars próprias (mesmo padrão da `/guia`):

- Grafite base: `#101114` · grafite alt: `#17181c` · cards: `#1b1d21`/`#1f2126` · bordas: `#26282d`
- Osso (seções claras): `#f4efe6` · texto claro-sobre-escuro: `#f4efe8` / `#a9a49c`
- Ink (texto em seção clara): `#221d17` / `#6b645c`
- Cobre (accent/CTA): `#c47f4e` · terracota em seção clara: `#b0512c`

Fontes já carregadas no layout: **Playfair Display** (títulos) + **Inter** (corpo).

## Estrutura da página (ordem aprovada)

1. **Header enxuto** — logo, âncoras, CTA WhatsApp. Transparente sobre hero, sólido no scroll.
2. **Hero 100vh** — vídeo autoplay/muted/loop/playsinline com overlay escuro.
   - H1 (único): "Quiropraxia em Natal para dores na coluna, pescoço e nervo ciático"
   - Subtítulo do spec; botões "Agendar pelo WhatsApp" (cobre) + "Ver localização" (outline)
   - ★★★★★ nota 5,0 Google + contagem de avaliações (dados do `/api/reviews`)
3. **Barra de confiança** — 5 cards com ícone: Atendimento Particular, Sessões Individualizadas, Avaliação Completa, Localização de Fácil Acesso, Atendimento Humanizado.
4. **Sobre o profissional** (claro) — 2 colunas: foto | "Conheça o Dr. Guilherme Carvalho" + texto curto (experiência, filosofia, terapia manual, atendimento personalizado).
5. **O que tratamos** — grid de 10 cards com ícone + hover: Hérnia de Disco, Dor Lombar, Dor Cervical, Nervo Ciático, Dor no Pescoço, Dor entre as Escápulas, Dor no Ombro, Dor no Quadril, Recovery para Atletas, Limitação de Movimento.
6. **Técnicas utilizadas** — 7 cards grandes com imagem + texto explicativo: Quiropraxia, Osteopatia, Dry Needling, Liberação Miofascial, Ventosaterapia, Mobilização Neural, Exercícios Terapêuticos.
7. **Vídeo institucional** (claro) — vídeo incorporado + texto de como funciona o tratamento. Placeholder até asset chegar.
8. **Como funciona a consulta** — timeline vertical 5 etapas com ícone + descrição: Avaliação completa → Identificação da origem da dor → Tratamento personalizado → Exercícios específicos → Plano de recuperação.
9. **Depoimentos** — primeiro slots de vídeo (placeholder), depois carrossel responsivo de Google reviews (5★, via `/api/reviews`).
10. **Galeria** (claro) — grid elegante misto fotos/vídeos: consultório, quiropraxia, dry needling, osteopatia, recovery, atendimentos. Placeholders nomeados.
11. **FAQ** — accordion com 8 perguntas: O tratamento dói? / Quiropraxia é segura? / Quem pode fazer? / Quanto tempo dura a consulta? / Quantas sessões normalmente são necessárias? / Vocês tratam hérnia de disco? / Tratam nervo ciático? / Aceitam plano de saúde?
12. **CTA final** — "Está procurando Quiropraxia em Natal?" + texto + botão grande WhatsApp.
13. **Localização** — Google Maps embed, endereço, horários, botão "Como chegar".
14. **Footer** — WhatsApp, Instagram, telefone, endereço, links rápidos, Política de Privacidade.
15. **WhatsAppFab** — reuso do componente existente.

## Arquitetura

```
app/[locale]/quiropraxia/page.tsx   # composição + metadata + JSON-LD
components/quiropraxia/*.tsx        # 1 arquivo por seção
components/quiropraxia/reveal.tsx   # client util: reveal-on-scroll (IntersectionObserver)
public/quiropraxia/                 # assets placeholders nomeados
app/sitemap.ts                      # NOVO — site todo
app/robots.ts                       # NOVO — site todo
```

**Reuso obrigatório:** `lib/config.ts` (WhatsApp URL), `lib/analytics.ts`
(`track()`), `/api/reviews`, `WhatsAppFab`, ícones `lucide-react`, convenções
i18n (`getTranslations`/`useTranslations`, namespace `quiropraxia` em
`messages/pt.json` + `en.json`).

## Hero vídeo

- Fonte: `public/a969761e1cef4a78838aa19630beb95e.MOV` (22MB).
- Converter com ffmpeg → `public/quiropraxia/hero.mp4` (H.264, 720p, sem áudio, alvo ≤3MB) + `hero-poster.webp`.
- `<video autoplay muted loop playsinline poster>` com `preload="none"`/lazy — LCP é o poster, não o vídeo.
- Remover MOV cru do `public/` (não servir 22MB).

## Animações e microinterações

- Reveal-on-scroll: componente client `<Reveal>` (IntersectionObserver adiciona classe; CSS faz fade/translate). Respeitar `prefers-reduced-motion`.
- Parallax discreto no hero (CSS transform no scroll, leve).
- Hover em cards e botões: CSS puro (scale/glow/shine — reutilizar padrões de `styles/globals.css` quando servir).
- Sem framer-motion ou lib nova.

## SEO

- **Metadata**: title ~"Quiropraxia em Natal/RN | Dr. Guilherme Carvalho — Fisioterapeuta", description otimizada, OG completo, `alternates` (canonical + hreflang pt/en).
- **H1 único** (hero). H2 por seção, H3 nos cards/etapas.
- **JSON-LD**: `MedicalBusiness` (endereço, horários, geo, telefone, rating agregado), `FAQPage` (8 perguntas), `BreadcrumbList`.
- **Breadcrumb visual**: Home › Quiropraxia em Natal.
- **`app/sitemap.ts` + `app/robots.ts`** — novos, cobrem site inteiro (/, /guia, /quiropraxia, com locales).
- Keywords distribuídas naturalmente na copy PT: quiropraxia natal, quiropraxista, osteopatia, dry needling, terapia manual, dor lombar, hérnia de disco, nervo ciático, Natal/RN. Sem stuffing.
- Imagens: WebP, `next/image` com lazy load, `sizes` corretos.

## Analytics

Eventos existentes do catálogo (`docs/gtm-events.md`), com `page: "quiropraxia"`:

- `whatsapp_click` `{ location: "hero" | "final_cta" | "fab" | "header" | "location" }`
- `scroll_depth` `{ depth, page: "quiropraxia" }`
- `section_view` `{ section, page: "quiropraxia" }`

Zero evento novo — GTM já roteia. Atualizar `docs/gtm-events.md` com a página nova.

## Placeholders (troca futura de assets)

`public/quiropraxia/`: `dr-guilherme.webp`, `tecnica-{quiropraxia,osteopatia,dry-needling,miofascial,ventosa,neural,exercicios}.webp`, `galeria-01..08.webp`, `video-institucional.mp4` (slot), `depoimento-0{1,2}.mp4` (slots). Enquanto não existem: SVG/gradiente placeholder consistente com a paleta, mesmo aspect ratio. Trocar = substituir arquivo, sem tocar código.

## Erros e estados

- `/api/reviews` falha → seção depoimentos mostra só slots de vídeo + link "ver avaliações no Google"; contagem/nota do hero cai para texto estático "Nota 5,0 no Google".
- Vídeo hero falha/lento → poster WebP permanece como fundo.
- `prefers-reduced-motion` → sem parallax, reveals viram opacity simples.

## Teste/verificação

- `pnpm build` limpo (type-safe, sem ignores).
- `pnpm dev` → conferir página nos 2 locales, dark overlay legível, mobile-first.
- Lighthouse local: performance + SEO ≥ 90 desktop/mobile como alvo.
- Validar JSON-LD (Rich Results Test) e sitemap/robots acessíveis.

## Fora de escopo

- Mudanças na home `/` e na `/guia`.
- Vídeos reais (institucional, depoimentos), fotos reais — placeholders.
- Bot WhatsApp, CRM, e-mail marketing (briefing separado).
