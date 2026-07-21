# CLAUDE.md — Guia para agentes de IA

Landing page do **Dr. Guilherme Carvalho** (fisioterapeuta, Natal/RN). Este
arquivo é o ponto de entrada para qualquer IA que for editar o site. Leia antes
de mexer no código. Veja também `memory/MEMORY.md` (memória do Claude) e
`docs/gtm-events.md` (catálogo de analytics).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (componentes base em `components/ui/`)
- **next-intl** — i18n PT (default) / EN
- **next-themes** — dark/light (default: dark)
- **GTM** — analytics (fonte única; ver abaixo)
- **pnpm** — package manager. Node v22+.

## Comandos

| Comando | O quê |
|---------|-------|
| `pnpm dev` | dev server em http://localhost:3000 |
| `pnpm build` | build de produção |
| `pnpm start` | server de produção |
| `pnpm lint` | eslint |

`next.config.mjs` **não** ignora erros de build/type — código tem que compilar.

## Mapa de arquivos

```
app/
  [locale]/
    layout.tsx        # fonts, metadata, JSON-LD, GTM, providers (i18n + theme)
    page.tsx          # composição da landing principal (ordem das seções)
    guia/page.tsx     # página de venda do e-book (identidade dark + gold)
    quiropraxia/page.tsx # landing de quiropraxia (metadata + JSON-LD próprios)
  api/reviews/route.ts # Google Places reviews (server)
  globals.css         # tokens de cor CSS (OKLch), --primary, --accent, fonts
components/
  *.tsx               # seções da landing (1 arquivo por seção)
  guia/*.tsx          # componentes da página /guia
  quiropraxia/*.tsx   # componentes da página /quiropraxia (paleta própria em quiro.css)
  ui/*.tsx            # shadcn/ui — NÃO editar à toa, são primitivos
lib/
  config.ts           # links WhatsApp + Hotmart (FONTE ÚNICA)
  analytics.ts        # track() → dataLayer push
  utils.ts            # cn() (merge de classes)
i18n/
  routing.ts          # locales: ["pt","en"], default pt
  request.ts          # carrega messages/{locale}.json
  navigation.ts       # Link, useRouter, redirect com locale
messages/
  pt.json / en.json   # TODO texto da UI vive aqui
styles/globals.css    # animações de botão (btn-glow-*, btn-shine) — importado no layout
```

## Convenções (siga sempre)

- **Texto nunca hardcoded.** Toda string de UI vai em `messages/pt.json` +
  `messages/en.json` (mesmas chaves nos dois). Componente lê com next-intl.
  - Server component (async): `const t = await getTranslations("namespace")`
  - Client component (`"use client"`): `const t = useTranslations("namespace")`
- **Links e telefone** só em `lib/config.ts` — nunca repetir URL de WhatsApp/Hotmart
  no JSX. Importa de lá.
- **Cores** via tokens CSS de `app/globals.css` (`--primary` = Prussian Blue,
  `--accent` = Gold). Usa classes Tailwind (`bg-primary`, `text-accent`), não hex
  solto. Exceção: a página `/guia` tem paleta própria (dark `#0c0c0f`, gold `#f5c842`).
- **Tipografia**: `font-sans` = Inter, `font-serif` = Playfair Display.
- **Componentes de seção**: 1 arquivo por seção em `components/`, montados em ordem
  em `app/[locale]/page.tsx`.
- **shadcn/ui** (`components/ui/`) são primitivos — preferir compor por cima a editar.

## Receitas — mudanças comuns

**Trocar um texto** → acha a chave em `messages/pt.json`, edita lá e em `en.json`.

**Adicionar seção nova** →
1. cria `components/nova-section.tsx` (server component, lê translations)
2. adiciona chaves em `messages/pt.json` + `en.json`
3. importa e posiciona em `app/[locale]/page.tsx`

**Mudar nº WhatsApp / link Hotmart** → só `lib/config.ts`.

**Mudar cores da marca** → tokens em `app/globals.css`.

**Adicionar evento de analytics** → `track("nome_evento", { ...params })` de
`lib/analytics.ts`. Depois o gestor cria trigger+tag no GTM (sem deploy). Documenta
no `docs/gtm-events.md`.

**Conteúdo da `/guia`** (depoimentos, FAQ, módulos, preço) → tudo inline em
`app/[locale]/guia/page.tsx` como `const` no topo do arquivo. (Era CMS-driven via
Sanity; removido — ninguém editava o `/studio`.)

## Analytics — importante

O site **não** dispara GA4/Meta/TikTok direto. Só empurra eventos semânticos pro
`dataLayer` via `track()`; o **GTM** (`NEXT_PUBLIC_GTM_ID`) roteia pra cada
plataforma no painel. Catálogo completo de eventos: `docs/gtm-events.md`. Não
duplicar PageView.

## Env vars

Template documentado: `.env.example` (copiar pra `.env.local`). **Todas
opcionais** — o site roda sem nenhuma (reviews caem no fallback embutido, GTM
não carrega). Não tratar env var ausente como erro.

## Troubleshooting local

- `[reviews] REQUEST_DENIED` no log do dev → billing desativado no projeto
  Google Cloud (ou Places API não habilitada). **Não é bug** — site usa
  fallback. Fix é no console do Google, não no código.
- Porta 3000 ocupada / `Unable to acquire lock at .next/dev/lock` → dev
  server zumbi: `lsof -nP -iTCP:3000 -sTCP:LISTEN`, `kill <pid>`,
  `rm -f .next/dev/lock`.

## Gotchas

- `params` é `Promise` no App Router (Next 16) — sempre `await params`.
- Locale prefix é `as-needed`: PT sem prefixo na URL, EN com `/en`.
- Metadata + JSON-LD (dados estruturados do negócio) vivem em `app/[locale]/layout.tsx`.
- `TestimonialsSection` busca `/api/reviews` no client (useEffect).
- `TriageFormSection` é form multi-step client que monta URL de WhatsApp das respostas.
