# Landing Page — Dr. Guilherme Carvalho

Site do Dr. Guilherme Carvalho, fisioterapeuta em Natal/RN.

| Rota | O quê |
|------|-------|
| `/` | Landing principal (fisioterapia, triagem via WhatsApp) |
| `/quiropraxia` | Landing de quiropraxia (vídeo institucional, foco presencial) |
| `/guia` | Página de venda do e-book (Hotmart) |
| `/studio` | Sanity Studio embarcado (CMS) |

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **next-intl** — i18n PT (default, sem prefixo) / EN (`/en`)
- **Sanity** — CMS (depoimentos, FAQ, config da guia)
- **GTM** — analytics (única integração; roteia GA4/Meta/TikTok no painel)
- **pnpm** + Node v22+

## Rodando local

```bash
pnpm install
cp .env.example .env.local   # opcional — site roda sem env vars
pnpm dev                     # http://localhost:3000
```

Sem `.env.local` o site funciona inteiro: reviews usam fallback embutido,
Sanity/GTM simplesmente não carregam.

## Scripts

| Comando | O quê |
|---------|-------|
| `pnpm dev` | dev server (Turbopack) |
| `pnpm build` | build de produção (type-check incluso — não ignora erros) |
| `pnpm start` | server de produção |
| `pnpm lint` | eslint |

## Env vars

Veja [`.env.example`](./.env.example) — todas opcionais e documentadas lá.

**Google reviews (`/api/reviews`):** precisa de `GOOGLE_PLACES_API_KEY` +
`GOOGLE_PLACE_ID` **e** billing ativo no projeto do Google Cloud com a
"Places API" habilitada. Sem isso a API retorna `REQUEST_DENIED` (aparece no
log do dev server) e o site mostra reviews de fallback — não é erro fatal.

## Troubleshooting

| Sintoma | Causa / fix |
|---------|-------------|
| `Port 3000 is in use ... using 3001` | Server antigo rodando. `lsof -nP -iTCP:3000 -sTCP:LISTEN` e `kill <pid>` |
| `Unable to acquire lock at .next/dev/lock` | `next dev` zumbi. Mata o processo e `rm -f .next/dev/lock` |
| `[reviews] ... REQUEST_DENIED` no log | Billing desativado no Google Cloud (ou Places API não habilitada). Site segue com fallback |
| Build falha com erro de tipo | Intencional — `next.config.mjs` não ignora erros. Corrige o tipo |

## Estrutura

```
app/[locale]/          # páginas (layout, /, /guia, /quiropraxia)
app/api/reviews/       # proxy server-side do Google Places
components/            # seções da landing principal (1 arquivo por seção)
components/quiropraxia # seções do /quiropraxia
components/guia        # seções do /guia
lib/config.ts          # links WhatsApp + Hotmart (fonte única)
lib/analytics.ts       # track() → dataLayer (GTM)
messages/{pt,en}.json  # TODO texto de UI (next-intl)
sanity/                # schemas + queries do CMS
docs/gtm-events.md     # catálogo de eventos de analytics
```

Guia completo para agentes de IA (convenções, receitas): [`CLAUDE.md`](./CLAUDE.md).

## Deploy

Vercel conectada à branch `main` — push na main = deploy.
