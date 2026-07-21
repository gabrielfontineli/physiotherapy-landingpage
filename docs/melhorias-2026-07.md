# Auditoria técnica & spec de melhorias — Jul/2026

Site: landing Dr. Guilherme Carvalho (Next 16 / React 19 / Tailwind v4 / next-intl / Sanity).
Auditoria feita com viés **YAGNI**: a melhor melhoria costuma ser _deletar_, não adicionar.
Lente: cada item pergunta "isso precisa existir?" antes de "como melhorar?".

---

## 0. Resumo executivo

| Prioridade | Item | Ganho | Esforço |
|---|---|---|---|
| **P0** | Decidir destino do Sanity (usar de verdade ou remover) | −6 deps, −Studio, −200 LOC OU CMS real | baixo/médio |
| **P0** | Remover ~45 componentes `ui/` mortos + deps órfãs | −8 deps, build/instalação mais leve | baixo |
| **P0** | Deduplicar `hooks/` vs `components/ui/` (arquivos idênticos) | fim de confusão de import | baixo |
| **P1** | `pnpm typecheck` + Prettier + CI mínimo (GitHub Action) | dev XP, PR não quebra build | baixo |
| **P1** | Mover fontes brutos (204 MB de `.mov`/`.zip`) pra fora do repo | disco, git status limpo | baixo |
| **P2** | Config ESLint real (hoje `eslint .` sem flat config visível) | lint que pega bug | baixo |
| **P2** | Consolidar 3 "engagement trackers" + revisar `proxy.ts` | menos superfície | médio |
| **P3** | Testes de fumaça (build + rota 200) | rede de segurança | médio |

**Feito nesta passada** (limpeza de disco, arquivos untracked/duplicados):
removidos `hero-video.mp4`, `hero-mobile.mp4` (strays no root — os servidos vivem
comprimidos em `public/quiropraxia/`), `32e89114-*.JPG`, `presencial-explore.html`,
`quiro-spine-mockup.html`, `.DS_Store`, `scratchpad_assets/`.
**Não** removidos (fontes brutos, irreversíveis, já no `.gitignore`) — decisão do dono:
`drive-download-*.zip` (118 MB), `base-quiropraxia.mov` (64 MB), `a969761e-*.MOV`
(22 MB), `briefing_guilherme-1.pdf`. Ver §5.

---

## 1. Sanity faz sentido? — a pergunta principal

**Diagnóstico factual:**

- Sanity é usado em **exatamente uma página**: `/guia` (e-book). Landing principal e
  `/quiropraxia` **não tocam** em Sanity.
- Em `app/[locale]/guia/page.tsx`, **todo campo Sanity tem fallback hardcoded** no
  próprio arquivo (`const pains`, `const modules`, `const testimonials`, `const faqs`,
  preços default `"R$ 47,00"` etc). O padrão é `sanityX.length > 0 ? sanityX : hardcoded`.
- Há um gate `isSanityConfigured`: **sem project id em env, o Sanity nunca roda** e a
  página serve 100% do conteúdo hardcoded. Ou seja: hoje pode já estar rodando como se
  o Sanity não existisse.

**Custo do Sanity no projeto:**

- Deps: `sanity`, `@sanity/vision`, `next-sanity` (+ peso de instalação/build).
- Studio embarcado: `app/studio/**` (3 arquivos + layout).
- `sanity/` inteiro: 8 schemas, `queries.ts` (~200 LOC), `client.ts`, `seed.ndjson`.
- Manutenção de CORS, dataset, deploy de schema.

**Benefício real:** o cliente edita a copy de **uma** página de vendas sem deploy.

**Veredito (decisão do dono, não minha pra tomar sozinho):**

> Pergunta única que decide: **o Dr. Guilherme (ou você) já abriu `/studio` e editou
> algo — e vai editar de novo?**
>
> - **NÃO / nunca abriu** → _remover Sanity inteiro_. O conteúdo já está inline como
>   fallback; é só apagar os imports + a branch `isSanityConfigured` e deixar os `const`.
>   Isso remove 6 deps do grafo, o `/studio`, `sanity/`, e a superfície de CORS/dataset.
>   Melhor DX possível: menos coisa pra entender e quebrar.
> - **SIM, edita a copy sem me chamar** → _manter, mas justificar_. É o único motivo
>   válido. Então: (a) tirar os fallbacks hardcoded gigantes (viram "conteúdo fantasma"
>   que diverge do CMS e confunde), deixando só um fallback mínimo/vazio; (b) rodar o
>   `seed.ndjson` pra popular; (c) documentar no CLAUDE.md que `/guia` é CMS-driven.

Recomendação default (lazy): **remover**, a menos que o cliente confirme que edita.
Um único ponto de CMS com fallback completo é quase sempre CMS-teatro.

---

## 2. Código morto — spec de remoção

### 2.1 Componentes `ui/` não usados (~45 de 57)

`components/ui/` tem o dump completo do shadcn (57 arquivos). Imports reais de fora de
`ui/`: só ~12 primitivos (`button` ×16, `separator`, `toast`, `label`, `input`,
`tooltip`, `toggle`, `textarea`, `skeleton`, `sheet`, `dialog`, `accordion`).
O resto (`chart`, `carousel`, `command`, `drawer`, `sidebar`, `calendar`, `table`,
`menubar`, `sonner`, etc.) é peso morto.

**Não deletar na mão** (fecho transitivo — `sheet` puxa outros — é frágil de calcular à
mão). Usar detector:

```bash
pnpm dlx knip                 # lista arquivos + exports + deps não usados
# revisar o report, então deletar o que ele apontar em components/ui/
```

`knip` resolve o grafo transitivo certo e também acha as **deps órfãs** de uma vez.

### 2.2 Dependências órfãs (arrastadas só pelos `ui/` mortos)

Confirmado por grep — cada uma só aparece no seu wrapper `ui/` morto:

| Dep | Único uso | Ação |
|---|---|---|
| `recharts` | `ui/chart.tsx` | remover |
| `vaul` | `ui/drawer.tsx` | remover |
| `cmdk` | `ui/command.tsx` | remover |
| `input-otp` | `ui/input-otp.tsx` | remover |
| `react-day-picker` | `ui/calendar.tsx` | remover |
| `react-resizable-panels` | `ui/resizable.tsx` | remover |
| `sonner` | `ui/sonner.tsx` | remover |
| `date-fns` | 0 usos | remover |
| `@hookform/resolvers` | 0 usos | remover |
| `zod` | 0 usos | remover (confirmar — validação de form vale reintroduzir depois) |

`embla-carousel-react` **fica** (usado direto em `testimonials-section.tsx`).
Depois de deletar os `ui/` mortos: `pnpm remove <deps>` e `pnpm dedupe`.

### 2.3 Hooks duplicados

`hooks/use-toast.ts` é **idêntico** a `components/ui/use-toast.ts`; mesmo caso pra
`use-mobile`. O app importa de `@/hooks/*`. Os `components/ui/use-*` são cópias mortas.

**Ação:** manter `hooks/`, deletar `components/ui/use-toast.ts` e
`components/ui/use-mobile.tsx` (se `knip` confirmar que nada em `ui/` os importa).

---

## 3. Dev XP — lacunas

Ordenado por ROI. Tudo aqui é "adicionar o mínimo", não framework.

1. **Sem `typecheck` script.** `next.config.mjs` não ignora erros de type (bom), mas o
   único jeito de checar tipos é o build inteiro. Adicionar:
   ```jsonc
   // package.json scripts
   "typecheck": "tsc --noEmit"
   ```
2. **Sem formatter.** Adicionar Prettier (config vazia = defaults) + `format` script.
   Uma dep, zero configuração de estilo pra discutir:
   ```bash
   pnpm add -D prettier
   echo '{}' > .prettierrc.json
   # scripts: "format": "prettier --write ."
   ```
3. **Sem CI.** Uma GitHub Action que roda `lint + typecheck + build` em PR pega 90% das
   regressões antes do Vercel. ~20 linhas de YAML, sem novas deps.
4. **ESLint config.** Script é `eslint .` mas não há `eslint.config.*`/`.eslintrc`
   visível na raiz — confirmar que existe e está no flat config do Next 16; senão o lint
   não checa quase nada.
5. **`.env.example` existe** (bom) — garantir que lista `NEXT_PUBLIC_GTM_ID`,
   `SANITY_*` (ou remover se §1 = remover Sanity) e a chave do Google Places.

---

## 4. Boas práticas / oportunidades

- **3 trackers de engajamento** (`main-engagement-tracker.tsx`,
  `guia/engagement-tracker.tsx`, `guia/pixel-events.tsx`) — checar sobreposição de
  lógica de scroll/intenção; provável extração de 1 hook compartilhado.
- **`proxy.ts` na raiz** — arquivo solto fora de `app/`. Confirmar se é usado (Next 16
  não o carrega por convenção). Se órfão → deletar; se é middleware, mover pra
  `middleware.ts`.
- **`public/alt.html`** — LP alternativa WIP servida estática (já no `.gitignore`, mas
  presente no disco). Decidir: virar rota real ou apagar.
- **Locale `en`** — confirmar que EN é mantido de fato (`messages/en.json` em dia). Se o
  público é 100% PT/Natal, i18n é complexidade cara pra 0 tráfego EN — candidato a
  remover `next-intl` inteiro (grande simplificação) se EN não converte.
- **Imagens duplicadas** em `public/images/`: `dr-guilherme-about.jpg` +
  `dr-guilherme-about-new.png` e `doctor-portrait.jpg` — checar qual é servida, apagar a
  outra.

---

## 5. Higiene de repositório

- **Fontes brutos no root** (204 MB): `drive-download-*.zip`, `base-quiropraxia.mov`,
  `a969761e-*.MOV`, `briefing_guilherme-1.pdf`. Já cobertos pelo `.gitignore` (não sujam
  o git), mas ocupam disco local. **Recomendação:** mover pro Drive/pasta fora do repo.
  Não deletados nesta passada por serem irreversíveis — decisão sua.
- `.gitignore` está bom (cobre `*.zip`, `*.mov`, `briefing*`, `.leankg`, `.superpowers`,
  `public/alt.html`, `docs/superpowers/`).

---

## 6. Spec de execução (fases)

Cada fase é independente e verificável por `pnpm build` verde.

### Fase A — Decisão Sanity (P0, bloqueia limpeza de deps)
1. Confirmar com o dono: `/studio` é usado? (§1)
2. **Se remover:** apagar imports Sanity + branch `isSanityConfigured` em
   `guia/page.tsx` (deixar os `const` inline), apagar `sanity/`, `app/studio/`,
   `pnpm remove sanity @sanity/vision next-sanity`. Tirar `SANITY_*` do `.env.example`
   e menções no `CLAUDE.md`.
3. **Se manter:** enxugar fallbacks hardcoded, rodar seed, documentar `/guia` CMS-driven.

### Fase B — Poda de código morto (P0)
1. `pnpm dlx knip` → revisar report.
2. Deletar `components/ui/*` apontados como não usados (§2.1).
3. Deletar `components/ui/use-toast.ts` + `use-mobile.tsx` (dupes de `hooks/`, §2.3).
4. `pnpm remove` das deps órfãs (§2.2) + `pnpm dedupe`.
5. `pnpm build` verde.

### Fase C — Dev XP (P1)
1. Scripts `typecheck` + `format` (§3.1, §3.2).
2. GitHub Action `lint + typecheck + build` em PR (§3.3).
3. Verificar ESLint config real (§3.4).

### Fase D — Higiene & consolidação (P2)
1. Mover fontes brutos pra fora do repo (§5).
2. Resolver `proxy.ts`, `public/alt.html`, imagens duplicadas (§4).
3. Investigar unificação dos 3 trackers (§4).

### Fase E — Rede de segurança (P3)
1. Decidir sobre locale EN (§4).
2. Smoke test: build + `GET /` e `/quiropraxia` retornam 200.

---

> Princípio-guia: fases A e B removem mais linhas do que qualquer coisa aqui adiciona.
> Comece por elas. Se `/studio` estiver morto, a Fase A sozinha é a maior melhoria do
> projeto — não por otimizar nada, mas por deletar uma dependência inteira de CMS que
> não paga o próprio custo.
