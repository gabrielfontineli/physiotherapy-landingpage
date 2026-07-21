# SEO Audit — plano de ação

**Data:** 2026-07-19 · **Site:** doutorguilhermecarvalho.com · **Health Score:** 58/100
Origem: `/seo audit` (7 subagents: technical, content, schema, performance, local, geo, visual).

Checklist ordenado por severidade. Marcar `[x]` ao concluir. Caminhos de arquivo relativos à raiz do repo.

---

## 🔴 Critical

- [ ] **1. Host canônico www.** robots.txt, `sitemap.xml` (`<loc>`) e canonical do /quiropraxia usam non-www; site redireciona non-www→www. Padronizar tudo em `https://www.doutorguilhermecarvalho.com`.
  - `app/sitemap.ts`, `app/robots.ts` (ou onde `Sitemap:` é definido), `metadataBase`/`BASE_URL`
  - Também: mudar redirect apex non-www→www de **307 → 308** (Vercel → Domains, marcar permanente).
- [ ] **2. Canonical na home e /guia.** Só /quiropraxia tem `<link rel=canonical>` (e aponta pro host errado). Add `alternates.canonical` no `generateMetadata` de cada rota.
  - `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/guia/page.tsx`
- [ ] **3. Reviews fabricados sob badge Google.** Billing Places off → `app/api/reviews/route.ts` cai em 6 reviews inventados (nomes fixos, timestamps congelados) exibidos com logo "G" + 5★. Risco confiança/LGPD.
  - Opção A: ligar billing no GCP (fora do código). Opção B: rotular fallback como "exemplo" ou esconder widget até ter reviews reais.
  - `app/api/reviews/route.ts`, `components/testimonials-section.tsx`
- [ ] **4. LocalBusiness duplicado no /quiropraxia.** `layout.tsx` injeta bloco genérico em toda rota + a página adiciona o próprio (mais completo). 2 entities sem `@id` comum, dados conflitantes.
  - Fix simples: pular o `jsonLd` do layout quando pathname == `/quiropraxia`. Ou dar `@id` comum (`${BASE_URL}/#business`).
  - `app/[locale]/layout.tsx`, `app/[locale]/quiropraxia/page.tsx`

## 🟠 High

- [ ] **5. Hero mobile: double-fetch de vídeo.** 2 `<video>` no DOM CSS-toggle (`md:hidden` / `hidden md:block`) → mobile pode baixar os dois (~7.5MB). "Desktop" `hero.mp4` é o mesmo 576×1024 portrait do mobile.
  - Trocar por **1 `<video>`** com 2 `<source media="(min-width:768px)">` + fallback (browser pula o não-casado), `className="... object-center md:object-[75%_center]"`.
  - Reencode: CRF alto / bitrate menor, alvo <1.5MB cada; add `.webm` (VP9/AV1) antes do mp4. Cortar loop se 19s for demais.
  - `components/quiropraxia/quiro-hero.tsx`, `public/quiropraxia/hero*.mp4`
- [ ] **6. Telefone visível + `tel:`.** Número só existe dentro de links `wa.me`; zero texto/`tel:` na home. Add telefone clicável em toda página (header/footer/location).
  - `lib/config.ts` (fonte), `components/footer.tsx`, `components/location-section.tsx`, `components/quiropraxia/quiro-*.tsx`
- [ ] **7. Política de privacidade (LGPD).** Form de triagem coleta dado de saúde; `/privacidade` → 404. Criar página + link no footer (cobrir triagem + handoff WhatsApp).
  - nova rota `app/[locale]/privacidade/page.tsx`, `messages/pt.json` + `en.json`, footer
- [ ] **8. `sameAs` + `Person`/Physician schema.** Maior gap de autoridade YMYL/AI. `INSTAGRAM_URL` vazio em `lib/config.ts`. Popular socials (GBP, Instagram, YouTube) + nó `Person` do Dr. Guilherme (CREFITO, jobTitle, image).
  - `app/[locale]/layout.tsx` (jsonLd), `lib/config.ts`, footer (links sociais visíveis)
- [ ] **9. SSR dos depoimentos.** `TestimonialsSection` busca `/api/reviews` client-side (`useEffect`) → texto invisível pra crawler AI. Renderizar 1ª página no server, manter client só p/ paginação.
  - `components/testimonials-section.tsx`, `app/api/reviews/route.ts`
- [ ] **10. hreflang consistente.** Home usa header HTTP `pt`; /quiropraxia usa `<link>` `pt-BR`; nenhum tem `x-default`. Padronizar `<link rel=alternate hreflang>` em `<head>` de todas, código `pt-BR`, + `x-default`.
  - `alternates.languages` no `generateMetadata` de cada rota; `app/sitemap.ts` (add x-default)
- [ ] **11. Security headers.** Só HSTS presente. Add bloco `headers()`:
  - `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Robots-Tag: noindex` em `/studio/*`.
  - `next.config.mjs`
- [ ] **12. Keyword "fisioterapia".** Nunca aparece no corpo/title (só "fisioterapeuta"). Gap pra "fisioterapia Natal". Add 1 uso natural no H1/subhead/title da home.
  - `messages/pt.json` (hero/title), `app/[locale]/layout.tsx` metadata
- [ ] **13. Bolha WhatsApp cobre CREFITO.** No hero mobile da home a bolha fixa cobre "CREFITO 1 318268-F". Add `padding-bottom` na trust row mobile (≥64px) ou reposicionar.
  - `components/hero-section.tsx` (trust row), `components/whatsapp-fab.tsx`

## 🟡 Medium

- [ ] **14. Schema — props faltando.** `openingHoursSpecification` (confirmar horários reais antes!), `geo` na home, `image` (absoluto), tipo `MedicalClinic` (não `MedicalBusiness` genérico), `Review` individuais (3-5). Snippet pronto no relatório do agent.
  - `app/[locale]/layout.tsx`, `app/[locale]/quiropraxia/page.tsx`
- [ ] **15. `public/llms.txt`.** Ausente — `/llms.txt` cai no dynamic `[locale]` route e renderiza a home com `lang="llms.txt"`. Criar arquivo estático: resumo + links p/ `/`, `/quiropraxia`, `/guia` + FAQ.
- [ ] **16. Definir condições/técnicas.** Hoje são pills sem texto → nada citável por AI. Add 1-2 frases por card (o que é / quando indicado).
  - `components/quiropraxia/conditions-grid.tsx`, `techniques-section.tsx`, `messages/pt.json`+`en.json`
- [ ] **17. Disclaimer médico (YMYL).** 1 linha ("não substitui avaliação presencial") no footer/perto do form.
  - footer ou `components/triage-form-section.tsx`, messages
- [ ] **18. Tap targets ≥44×44.** Hambúrguer mobile 24×24; botões nav ~32px; CTA mobile 42px (2px curto). Add padding/min-height.
  - `components/header.tsx`, `components/quiropraxia/quiro-header.tsx`
- [ ] **19. FAQ na home.** `FAQPage`+`BreadcrumbList` só no /quiropraxia. Add seção FAQ + schema na home.
  - `app/[locale]/page.tsx`, componente novo, messages

## 🟢 Low

- [ ] **20. sitemap `lastmod` real** (hoje = timestamp de build). Usar `_updatedAt` do Sanity ou remover. `app/sitemap.ts`
- [ ] **21. IndexNow** (ping Bing/Yandex no deploy). Opcional.
- [ ] **22. HSTS** add `includeSubDomains; preload`. `next.config.mjs`/Vercel
- [ ] **23. `/studio` noindex** — coberto pelo #11 (X-Robots-Tag).

---

## Não fazer
- ❌ `HowTo` schema — deprecado (set/2023). 2 agents sugeriram; ignorar.
- ⚠️ `FAQPage` — não gera mais rich result (retirado mai/2026). **Manter** o existente pelo benefício AI/LLM; não criar novo só p/ SERP do Google.

## Ações fora do código (você)
- Ligar billing Google Places (GCP) — resolve #3 de verdade.
- Criar/verificar Google Business Profile: categoria correta (fisio/quiro), fotos, Place ID p/ embed real (#3, local).
- Claim Doctoralia + diretórios BR com NAP idêntico → alimenta `sameAs` (#8).
- Confirmar horários de atendimento reais (p/ #14) e handle Instagram (p/ #8).
