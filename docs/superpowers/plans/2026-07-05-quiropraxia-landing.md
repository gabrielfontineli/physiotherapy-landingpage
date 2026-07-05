# /quiropraxia Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nova página `/quiropraxia` (PT/EN) — landing premium dark "Clínica Noir" otimizada pra SEO local (Quiropraxia Natal) e conversão via WhatsApp, sem tocar na home.

**Architecture:** Rota `app/[locale]/quiropraxia/page.tsx` compõe seções de `components/quiropraxia/` (1 arquivo/seção, server components; client só onde precisa: header sticky, reveal, botões com track, depoimentos). Paleta escopada via classe `.quiro` + CSS vars num css importado pela página. Reuso: `lib/config.ts`, `lib/analytics.ts`, `/api/reviews`, `WhatsAppFab`, i18n `messages/*.json`.

**Tech Stack:** Next.js 16 App Router, React 19, TS, Tailwind v4, next-intl, lucide-react, ffmpeg (conversão de assets, dev-time only).

## Global Constraints

- **Sem dependência nova.** Animações = CSS + IntersectionObserver. Carrossel = scroll-snap. Accordion = `<details>`.
- **Sem test runner no repo.** Ciclo de verificação por task = `pnpm build` (type-check estrito, `next.config.mjs` não ignora erros) + smoke visual no `pnpm dev`. Commit só com build verde.
- **Todo texto de UI** em `messages/pt.json` + `messages/en.json`, namespace `quiro`, mesmas chaves nos dois.
- **`params` é Promise** (Next 16): sempre `await params`.
- Server component: `const t = await getTranslations("quiro.x")`. Client: `useTranslations("quiro.x")`.
- **WhatsApp/links** só de `lib/config.ts`. Analytics só via `track()` de `lib/analytics.ts`.
- Base URL canônica: `https://doutorguilhermecarvalho.com` (mesma do layout).
- Paleta Noir: bg `#101114`, bg-alt `#17181c`, cards `#1b1d21`/`#1f2126`, borda `#26282d`, osso `#f4efe6`, texto `#f4efe8`/muted `#a9a49c`, ink `#221d17`/`#6b645c`, cobre `#c47f4e`, terracota `#b0512c`.
- H1 único: "Quiropraxia em Natal para dores na coluna, pescoço e nervo ciático".
- Respeitar `prefers-reduced-motion`.
- Commits frequentes, mensagens `feat:`/`chore:`/`docs:` como histórico existente, rodapé `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 0: Branch

**Files:** nenhum (git only)

- [ ] **Step 1:** `git checkout -b feat/quiropraxia` (a partir de `docs/ai-guide`, que contém o spec).

---

### Task 1: Assets — vídeo hero, poster, placeholders

**Files:**
- Create: `public/quiropraxia/hero.mp4`, `public/quiropraxia/hero-poster.webp`, `public/quiropraxia/video-institucional.mp4`, `public/quiropraxia/dr-guilherme.webp`, `public/quiropraxia/tecnica-{quiropraxia,osteopatia,dry-needling,miofascial,ventosa,neural,exercicios}.webp`, `public/quiropraxia/galeria-0{1..8}.webp`
- Delete: `public/a969761e1cef4a78838aa19630beb95e.MOV` (22MB cru, não servir)

**Interfaces:**
- Produces: caminhos de asset consumidos pelas Tasks 4–8. Troca futura de asset real = substituir arquivo, mesmo nome.

- [ ] **Step 1: Converter vídeo hero** (fonte HEVC vertical 1080×1920 17s, com áudio → H.264 720×1280 sem áudio, faststart):

```bash
mkdir -p public/quiropraxia
ffmpeg -i public/a969761e1cef4a78838aa19630beb95e.MOV -an \
  -vf "scale=720:1280" -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart public/quiropraxia/hero.mp4
```

Expected: `hero.mp4` ≤ ~3MB. Se >4MB, refazer com `-crf 30`.

- [ ] **Step 2: Poster WebP** (primeiro frame):

```bash
ffmpeg -i public/quiropraxia/hero.mp4 -frames:v 1 -q:v 70 public/quiropraxia/hero-poster.webp
```

- [ ] **Step 3: Placeholder do vídeo institucional** (mesmo arquivo, troca depois):

```bash
cp public/quiropraxia/hero.mp4 public/quiropraxia/video-institucional.mp4
```

- [ ] **Step 4: Placeholders de imagem** (tons noir, aspect ratios finais):

```bash
ffmpeg -f lavfi -i "color=c=0x2b2e34:s=900x1100" -frames:v 1 public/quiropraxia/dr-guilherme.webp
for t in quiropraxia osteopatia dry-needling miofascial ventosa neural exercicios; do
  ffmpeg -f lavfi -i "color=c=0x1f2126:s=1200x800" -frames:v 1 "public/quiropraxia/tecnica-$t.webp"
done
for i in 1 2 3 4 5 6 7 8; do
  ffmpeg -f lavfi -i "color=c=0x22252a:s=1000x1000" -frames:v 1 "public/quiropraxia/galeria-0$i.webp"
done
```

- [ ] **Step 5: Remover MOV do public/** (cópia na raiz do repo permanece):

```bash
rm public/a969761e1cef4a78838aa19630beb95e.MOV
```

- [ ] **Step 6: Verificar e commitar**

```bash
ls -la public/quiropraxia/   # 18 arquivos
du -h public/quiropraxia/hero.mp4
git add public/quiropraxia .gitignore
git commit -m "feat(quiropraxia): add optimized hero video + asset placeholders"
```

Nota: garantir que `public/a969761e*.MOV` não está tracked (estava untracked; `rm` basta).

---

### Task 2: Fundação — tokens CSS, Reveal, botão WhatsApp, config, tracker

**Files:**
- Create: `components/quiropraxia/quiro.css`, `components/quiropraxia/reveal.tsx`, `components/quiropraxia/whats-button.tsx`
- Modify: `lib/config.ts` (adicionar `WHATSAPP_QUIRO_URL`, `INSTAGRAM_URL`), `components/main-engagement-tracker.tsx` (prop `page`)

**Interfaces:**
- Produces:
  - CSS vars `--q-*` + classes `.quiro`, `.q-reveal`, `.q-card-hover` (Tasks 4–8 usam via `var(--q-*)` em arbitrary values Tailwind, ex. `bg-[var(--q-bg)]`).
  - `<Reveal className?: string, delay?: number, section?: string>` — client; fade/translate on-scroll; se `section` passado, dispara `track("section_view", { section, page: "quiropraxia" })` na 1ª visibilidade.
  - `<QuiroWhatsButton location: string, variant?: "solid" | "outline", className?: string, children>` — client; `<a>` pro WhatsApp com `track("whatsapp_click", { location, page: "quiropraxia" })`.
  - `WHATSAPP_QUIRO_URL: string`, `INSTAGRAM_URL: string` (vazio → UI esconde).
  - `<MainEngagementTracker page?: string>` (default `"main"` — home não muda).

- [ ] **Step 1: `components/quiropraxia/quiro.css`**

```css
/* Paleta Noir escopada à página /quiropraxia — não usa tokens globais */
.quiro {
  --q-bg: #101114;
  --q-bg-alt: #17181c;
  --q-card: #1b1d21;
  --q-card2: #1f2126;
  --q-border: #26282d;
  --q-bone: #f4efe6;
  --q-bone-border: #e0d8c7;
  --q-text: #f4efe8;
  --q-muted: #a9a49c;
  --q-ink: #221d17;
  --q-ink-muted: #6b645c;
  --q-copper: #c47f4e;
  --q-terracotta: #b0512c;
  background: var(--q-bg);
  color: var(--q-text);
}

/* Reveal on scroll */
.quiro .q-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.quiro .q-reveal.q-visible {
  opacity: 1;
  transform: none;
}

/* Microinteração de card */
.quiro .q-card-hover {
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.quiro .q-card-hover:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--q-copper) 55%, transparent);
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.35);
}

/* Ken Burns discreto no vídeo do hero (parallax-like) */
@keyframes q-slow-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}
.quiro .q-hero-media {
  animation: q-slow-zoom 24s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .quiro .q-reveal { opacity: 1; transform: none; transition: none; }
  .quiro .q-hero-media { animation: none; }
  .quiro .q-card-hover, .quiro .q-card-hover:hover { transform: none; transition: none; }
}
```

- [ ] **Step 2: `components/quiropraxia/reveal.tsx`**

```tsx
"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { track } from "@/lib/analytics"

export function Reveal({
  children,
  className = "",
  delay = 0,
  section,
}: {
  children: ReactNode
  className?: string
  delay?: number
  section?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add("q-visible")
        if (section) track("section_view", { section, page: "quiropraxia" })
        observer.disconnect()
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [section])

  return (
    <div ref={ref} className={`q-reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: `components/quiropraxia/whats-button.tsx`**

```tsx
"use client"

import type { ReactNode } from "react"
import { track } from "@/lib/analytics"
import { WHATSAPP_QUIRO_URL } from "@/lib/config"
import { cn } from "@/lib/utils"

const variants = {
  solid:
    "bg-[var(--q-copper)] text-[var(--q-bg)] hover:brightness-110 shadow-lg shadow-[var(--q-copper)]/20",
  outline:
    "border border-[var(--q-border)] text-[var(--q-text)] hover:border-[var(--q-copper)] hover:text-[var(--q-copper)]",
}

export function QuiroWhatsButton({
  location,
  variant = "solid",
  className,
  children,
}: {
  location: string
  variant?: keyof typeof variants
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={WHATSAPP_QUIRO_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location, page: "quiropraxia" })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  )
}
```

- [ ] **Step 4: `lib/config.ts`** — adicionar ao final:

```ts
export const WHATSAPP_QUIRO_URL = `${WHATSAPP_BASE}${encodeURIComponent(
  "Olá, Dr. Guilherme! Vim pela página de Quiropraxia e gostaria de agendar uma avaliação."
)}`

// ponytail: vazio até Guilherme confirmar handle — UI esconde ícone quando vazio
export const INSTAGRAM_URL = ""
```

- [ ] **Step 5: `components/main-engagement-tracker.tsx`** — generalizar página (home não muda: default `"main"`). Trocar assinatura e evento:

```tsx
export function MainEngagementTracker({ page = "main" }: { page?: string }) {
```

e no `track`: `track("scroll_depth", { depth: milestone, page })`. Dependência do efeito continua `[]` → trocar para `[page]`.

- [ ] **Step 6: Build + commit**

```bash
pnpm build
git add components/quiropraxia lib/config.ts components/main-engagement-tracker.tsx
git commit -m "feat(quiropraxia): add noir tokens, reveal util, whatsapp button"
```

Expected: build verde (css ainda não importado — ok, importa na Task 9).

---

### Task 3: i18n — namespace `quiro` em pt.json + en.json

**Files:**
- Modify: `messages/pt.json`, `messages/en.json` (adicionar chave top-level `"quiro"` ao final do objeto raiz)

**Interfaces:**
- Produces: namespaces `quiro.metadata|header|hero|trust|breadcrumb|about|conditions|techniques|video|steps|testimonials|gallery|faq|finalCta|location|footer` consumidos pelas Tasks 4–9. Chaves listadas abaixo são contrato exato.

- [ ] **Step 1: Adicionar em `messages/pt.json`:**

```json
"quiro": {
  "metadata": {
    "title": "Quiropraxia em Natal/RN | Dr. Guilherme Carvalho — Coluna, Hérnia de Disco e Ciático",
    "description": "Quiropraxia em Natal com fisioterapeuta especialista: quiropraxia, osteopatia, dry needling e terapia manual para dor lombar, hérnia de disco e nervo ciático. Agende sua avaliação."
  },
  "header": {
    "nav": {
      "conditions": "O que tratamos",
      "techniques": "Técnicas",
      "testimonials": "Depoimentos",
      "faq": "Dúvidas",
      "location": "Localização"
    },
    "cta": "Agendar"
  },
  "hero": {
    "eyebrow": "Quiropraxia · Natal/RN",
    "title": "Quiropraxia em Natal para dores na coluna, pescoço e nervo ciático",
    "subtitle": "Tratamento personalizado utilizando Quiropraxia, Osteopatia, Dry Needling e Terapia Manual para aliviar a dor, restaurar os movimentos e melhorar sua qualidade de vida.",
    "ctaWhatsapp": "Agendar pelo WhatsApp",
    "ctaLocation": "Ver localização",
    "ratingLabel": "Nota 5,0 no Google",
    "ratingCount": "mais de 50 avaliações",
    "credential": "CREFITO 1 318268-F",
    "videoAria": "Vídeo de atendimentos na clínica: quiropraxia, dry needling e terapia manual"
  },
  "trust": {
    "item1": "Atendimento Particular",
    "item2": "Sessões Individualizadas",
    "item3": "Avaliação Completa",
    "item4": "Localização de Fácil Acesso",
    "item5": "Atendimento Humanizado"
  },
  "breadcrumb": { "home": "Início", "current": "Quiropraxia em Natal" },
  "about": {
    "tagline": "Sobre o profissional",
    "title": "Conheça o Dr. Guilherme Carvalho",
    "p1": "Fisioterapeuta especialista em terapia manual, com atuação dedicada ao tratamento de dores na coluna, hérnia de disco e nervo ciático em Natal/RN. Cada paciente recebe avaliação completa e um plano de tratamento individual — nada de protocolos genéricos.",
    "p2": "A filosofia é simples: encontrar a origem da dor, tratá-la com as técnicas certas — quiropraxia, osteopatia, dry needling — e devolver o movimento com segurança, sem pressa e com acompanhamento próximo.",
    "imageAlt": "Dr. Guilherme Carvalho, fisioterapeuta e quiropraxista em Natal/RN"
  },
  "conditions": {
    "tagline": "O que tratamos",
    "title": "Dores e condições que tratamos na clínica",
    "subtitle": "Da dor aguda à limitação de movimento — tratamento com base em avaliação, não em achismo.",
    "items": {
      "hernia": "Hérnia de Disco",
      "lombar": "Dor Lombar",
      "cervical": "Dor Cervical",
      "ciatico": "Nervo Ciático",
      "pescoco": "Dor no Pescoço",
      "escapulas": "Dor entre as Escápulas",
      "ombro": "Dor no Ombro",
      "quadril": "Dor no Quadril",
      "atletas": "Recovery para Atletas",
      "movimento": "Limitação de Movimento"
    }
  },
  "techniques": {
    "tagline": "Técnicas utilizadas",
    "title": "Terapia manual de verdade, técnica por técnica",
    "items": {
      "quiropraxia": {
        "name": "Quiropraxia",
        "text": "Ajustes articulares precisos para restaurar o movimento da coluna e aliviar dores na lombar, no pescoço e na região torácica."
      },
      "osteopatia": {
        "name": "Osteopatia",
        "text": "Abordagem global do corpo: articulações, músculos e fáscias tratados em conjunto para resolver a causa da dor, não só o sintoma."
      },
      "dryNeedling": {
        "name": "Dry Needling",
        "text": "Agulhamento seco em pontos-gatilho para desativar contraturas musculares profundas e dores irradiadas."
      },
      "miofascial": {
        "name": "Liberação Miofascial",
        "text": "Técnicas manuais sobre a fáscia para reduzir tensão, melhorar circulação e devolver elasticidade ao tecido."
      },
      "ventosa": {
        "name": "Ventosaterapia",
        "text": "Sucção controlada que melhora o fluxo sanguíneo local e ajuda na recuperação muscular."
      },
      "neural": {
        "name": "Mobilização Neural",
        "text": "Movimentos específicos que liberam o deslizamento dos nervos — essencial em casos de ciático e formigamentos."
      },
      "exercicios": {
        "name": "Exercícios Terapêuticos",
        "text": "Exercícios prescritos de forma individual para estabilizar a coluna e evitar que a dor volte."
      }
    },
    "imageAlt": "Aplicação de {name} no consultório em Natal"
  },
  "video": {
    "tagline": "Vídeo institucional",
    "title": "Como funciona o tratamento",
    "p1": "Do primeiro contato à alta: avaliação completa, explicação clara do diagnóstico funcional e tratamento com as técnicas que fazem sentido para o seu caso.",
    "p2": "Assista e conheça o consultório, o método de trabalho e o que esperar da sua primeira consulta de quiropraxia em Natal.",
    "videoAria": "Vídeo institucional da clínica"
  },
  "steps": {
    "tagline": "Como funciona a consulta",
    "title": "Sua primeira consulta, passo a passo",
    "s1": { "title": "Avaliação completa", "text": "Histórico, exame físico e testes de movimento para entender seu quadro por inteiro." },
    "s2": { "title": "Identificação da origem da dor", "text": "Não tratamos sintoma solto: localizamos a estrutura e o padrão que causam a dor." },
    "s3": { "title": "Tratamento personalizado", "text": "Quiropraxia, osteopatia, dry needling — as técnicas certas para o seu caso, já na primeira sessão." },
    "s4": { "title": "Exercícios específicos", "text": "Prescrição individual para fortalecer e estabilizar o que a avaliação apontou." },
    "s5": { "title": "Plano de recuperação", "text": "Número estimado de sessões, metas claras e reavaliações para medir a evolução." }
  },
  "testimonials": {
    "tagline": "Depoimentos",
    "title": "Quem tratou, recomenda",
    "subtitle": "Avaliações reais de pacientes no Google",
    "googleLabel": "Avaliações do Google",
    "seeAll": "Ver avaliações no Google",
    "ratingStatic": "5,0"
  },
  "gallery": {
    "tagline": "Galeria",
    "title": "O consultório e os atendimentos",
    "alt1": "Consultório de fisioterapia e quiropraxia em Natal",
    "alt2": "Ajuste de quiropraxia na coluna",
    "alt3": "Aplicação de dry needling",
    "alt4": "Técnica de osteopatia",
    "alt5": "Sessão de recovery para atletas",
    "alt6": "Atendimento de terapia manual",
    "alt7": "Sala de atendimento",
    "alt8": "Exercícios terapêuticos orientados"
  },
  "faq": {
    "tagline": "Perguntas frequentes",
    "title": "Dúvidas comuns sobre quiropraxia",
    "q1": "O tratamento dói?",
    "a1": "Não. As técnicas são aplicadas com precisão e dentro do limite de conforto de cada paciente. Algumas pessoas sentem leve sensibilidade após a sessão, que passa em poucas horas.",
    "q2": "Quiropraxia é segura?",
    "a2": "Sim. Aplicada por fisioterapeuta habilitado, após avaliação completa, a quiropraxia é segura e tem indicações e contraindicações respeitadas caso a caso.",
    "q3": "Quem pode fazer?",
    "a3": "Adultos de todas as idades — de atletas a idosos. A avaliação inicial define se há alguma contraindicação e qual técnica é mais adequada para você.",
    "q4": "Quanto tempo dura a consulta?",
    "a4": "Em média 50 minutos a 1 hora, incluindo avaliação e tratamento já na primeira sessão.",
    "q5": "Quantas sessões normalmente são necessárias?",
    "a5": "Depende do caso. Quadros agudos costumam responder em poucas sessões; condições crônicas pedem um plano um pouco mais longo. Você recebe uma estimativa clara na avaliação.",
    "q6": "Vocês tratam hérnia de disco?",
    "a6": "Sim. Hérnia de disco é uma das condições mais frequentes no consultório, tratada com terapia manual, mobilização neural e exercícios específicos.",
    "q7": "Tratam nervo ciático?",
    "a7": "Sim. Dor ciática responde muito bem à combinação de quiropraxia, mobilização neural e dry needling, conforme a origem identificada na avaliação.",
    "q8": "Aceitam plano de saúde?",
    "a8": "O atendimento é particular, o que garante sessões individuais e tempo integral dedicado ao seu caso. Fornecemos recibo para reembolso junto ao seu plano."
  },
  "finalCta": {
    "title": "Está procurando Quiropraxia em Natal?",
    "text": "Agende sua avaliação presencial e descubra qual é a melhor estratégia para tratar sua dor.",
    "cta": "Agendar avaliação pelo WhatsApp"
  },
  "location": {
    "tagline": "Localização",
    "title": "Fácil de chegar, no centro de Natal",
    "addressLabel": "Endereço",
    "addressLine1": "Rua João Pessoa, 198 — Edifício Canaçu, Sala 406",
    "addressLine2": "Cidade Alta, Natal/RN",
    "addressNote": "(vizinho à Caixa Econômica Federal)",
    "hoursLabel": "Horário de atendimento",
    "hoursText": "Segunda a sexta, com hora marcada.",
    "hoursText2": "Agende pelo WhatsApp.",
    "directions": "Como chegar",
    "mapTitle": "Mapa — consultório na Cidade Alta, Natal/RN"
  },
  "footer": {
    "role": "Fisioterapeuta · Quiropraxia · Osteopatia",
    "contactLabel": "Contato",
    "whatsapp": "WhatsApp",
    "linksLabel": "Links rápidos",
    "credential": "CREFITO 1 318268-F",
    "copyright": "Todos os direitos reservados.",
    "backHome": "Página inicial"
  }
}
```

- [ ] **Step 2: Adicionar em `messages/en.json`** (mesmas chaves, traduzidas — manter nomes de técnicas):

```json
"quiro": {
  "metadata": {
    "title": "Chiropractic Care in Natal, Brazil | Dr. Guilherme Carvalho — Spine, Disc Herniation & Sciatica",
    "description": "Chiropractic care in Natal with a specialist physiotherapist: chiropractic, osteopathy, dry needling and manual therapy for low back pain, disc herniation and sciatica. Book your assessment."
  },
  "header": {
    "nav": {
      "conditions": "What we treat",
      "techniques": "Techniques",
      "testimonials": "Reviews",
      "faq": "FAQ",
      "location": "Location"
    },
    "cta": "Book now"
  },
  "hero": {
    "eyebrow": "Chiropractic · Natal, Brazil",
    "title": "Chiropractic care in Natal for spine, neck and sciatic nerve pain",
    "subtitle": "Personalized treatment combining Chiropractic, Osteopathy, Dry Needling and Manual Therapy to relieve pain, restore movement and improve your quality of life.",
    "ctaWhatsapp": "Book via WhatsApp",
    "ctaLocation": "See location",
    "ratingLabel": "5.0 rating on Google",
    "ratingCount": "over 50 reviews",
    "credential": "CREFITO 1 318268-F",
    "videoAria": "Video of treatments at the clinic: chiropractic, dry needling and manual therapy"
  },
  "trust": {
    "item1": "Private Practice",
    "item2": "One-on-One Sessions",
    "item3": "Thorough Assessment",
    "item4": "Easy-to-Reach Location",
    "item5": "Humanized Care"
  },
  "breadcrumb": { "home": "Home", "current": "Chiropractic in Natal" },
  "about": {
    "tagline": "About the professional",
    "title": "Meet Dr. Guilherme Carvalho",
    "p1": "Physiotherapist specializing in manual therapy, dedicated to treating spine pain, disc herniation and sciatica in Natal, Brazil. Every patient gets a thorough assessment and an individual treatment plan — no generic protocols.",
    "p2": "The philosophy is simple: find the source of the pain, treat it with the right techniques — chiropractic, osteopathy, dry needling — and restore movement safely, with close follow-up.",
    "imageAlt": "Dr. Guilherme Carvalho, physiotherapist and chiropractic practitioner in Natal, Brazil"
  },
  "conditions": {
    "tagline": "What we treat",
    "title": "Pain and conditions we treat at the clinic",
    "subtitle": "From acute pain to restricted movement — treatment based on assessment, not guesswork.",
    "items": {
      "hernia": "Disc Herniation",
      "lombar": "Low Back Pain",
      "cervical": "Cervical Pain",
      "ciatico": "Sciatic Nerve",
      "pescoco": "Neck Pain",
      "escapulas": "Pain Between Shoulder Blades",
      "ombro": "Shoulder Pain",
      "quadril": "Hip Pain",
      "atletas": "Athlete Recovery",
      "movimento": "Restricted Movement"
    }
  },
  "techniques": {
    "tagline": "Techniques we use",
    "title": "Real manual therapy, technique by technique",
    "items": {
      "quiropraxia": {
        "name": "Chiropractic",
        "text": "Precise joint adjustments to restore spinal movement and relieve low back, neck and thoracic pain."
      },
      "osteopatia": {
        "name": "Osteopathy",
        "text": "A whole-body approach: joints, muscles and fascia treated together to solve the cause of pain, not just the symptom."
      },
      "dryNeedling": {
        "name": "Dry Needling",
        "text": "Dry needling of trigger points to release deep muscle contractures and radiating pain."
      },
      "miofascial": {
        "name": "Myofascial Release",
        "text": "Hands-on fascia techniques to reduce tension, improve circulation and restore tissue elasticity."
      },
      "ventosa": {
        "name": "Cupping Therapy",
        "text": "Controlled suction that improves local blood flow and supports muscle recovery."
      },
      "neural": {
        "name": "Neural Mobilization",
        "text": "Specific movements that free nerve gliding — essential for sciatica and tingling."
      },
      "exercicios": {
        "name": "Therapeutic Exercise",
        "text": "Individually prescribed exercises to stabilize the spine and keep pain from coming back."
      }
    },
    "imageAlt": "{name} being applied at the clinic in Natal"
  },
  "video": {
    "tagline": "Inside the clinic",
    "title": "How treatment works",
    "p1": "From first contact to discharge: thorough assessment, a clear explanation of your functional diagnosis, and treatment with the techniques that make sense for your case.",
    "p2": "Watch to see the clinic, the working method and what to expect from your first chiropractic visit in Natal.",
    "videoAria": "Clinic institutional video"
  },
  "steps": {
    "tagline": "How the visit works",
    "title": "Your first visit, step by step",
    "s1": { "title": "Thorough assessment", "text": "History, physical exam and movement tests to fully understand your condition." },
    "s2": { "title": "Finding the source of pain", "text": "We don't chase loose symptoms: we locate the structure and pattern causing the pain." },
    "s3": { "title": "Personalized treatment", "text": "Chiropractic, osteopathy, dry needling — the right techniques for your case, starting at the first session." },
    "s4": { "title": "Specific exercises", "text": "Individual prescription to strengthen and stabilize what the assessment revealed." },
    "s5": { "title": "Recovery plan", "text": "Estimated number of sessions, clear goals and reassessments to track progress." }
  },
  "testimonials": {
    "tagline": "Reviews",
    "title": "Patients recommend it",
    "subtitle": "Real patient reviews on Google",
    "googleLabel": "Google reviews",
    "seeAll": "See reviews on Google",
    "ratingStatic": "5.0"
  },
  "gallery": {
    "tagline": "Gallery",
    "title": "The clinic and the care",
    "alt1": "Physiotherapy and chiropractic clinic in Natal",
    "alt2": "Chiropractic spinal adjustment",
    "alt3": "Dry needling application",
    "alt4": "Osteopathy technique",
    "alt5": "Athlete recovery session",
    "alt6": "Manual therapy session",
    "alt7": "Treatment room",
    "alt8": "Guided therapeutic exercise"
  },
  "faq": {
    "tagline": "Frequently asked questions",
    "title": "Common questions about chiropractic care",
    "q1": "Does the treatment hurt?",
    "a1": "No. Techniques are applied precisely and within each patient's comfort limit. Some people feel mild soreness after the session, which fades within hours.",
    "q2": "Is chiropractic safe?",
    "a2": "Yes. Performed by a licensed physiotherapist after a thorough assessment, chiropractic care is safe, with indications and contraindications respected case by case.",
    "q3": "Who can be treated?",
    "a3": "Adults of all ages — from athletes to seniors. The initial assessment rules out contraindications and defines the best technique for you.",
    "q4": "How long does a visit take?",
    "a4": "On average 50 minutes to 1 hour, including assessment and treatment at the first session.",
    "q5": "How many sessions are usually needed?",
    "a5": "It depends on the case. Acute conditions often respond within a few sessions; chronic ones need a slightly longer plan. You get a clear estimate at the assessment.",
    "q6": "Do you treat disc herniation?",
    "a6": "Yes. Disc herniation is one of the most frequent conditions at the clinic, treated with manual therapy, neural mobilization and specific exercises.",
    "q7": "Do you treat sciatica?",
    "a7": "Yes. Sciatic pain responds very well to the combination of chiropractic, neural mobilization and dry needling, depending on the source found at the assessment.",
    "q8": "Do you accept health insurance?",
    "a8": "Care is private, which guarantees one-on-one sessions fully dedicated to your case. We provide receipts for reimbursement with your insurance plan."
  },
  "finalCta": {
    "title": "Looking for chiropractic care in Natal?",
    "text": "Book your in-person assessment and find out the best strategy to treat your pain.",
    "cta": "Book an assessment via WhatsApp"
  },
  "location": {
    "tagline": "Location",
    "title": "Easy to reach, in downtown Natal",
    "addressLabel": "Address",
    "addressLine1": "Rua João Pessoa, 198 — Edifício Canaçu, Suite 406",
    "addressLine2": "Cidade Alta, Natal, Brazil",
    "addressNote": "(next to Caixa Econômica Federal)",
    "hoursLabel": "Opening hours",
    "hoursText": "Monday to Friday, by appointment.",
    "hoursText2": "Book via WhatsApp.",
    "directions": "Get directions",
    "mapTitle": "Map — clinic in Cidade Alta, Natal, Brazil"
  },
  "footer": {
    "role": "Physiotherapist · Chiropractic · Osteopathy",
    "contactLabel": "Contact",
    "whatsapp": "WhatsApp",
    "linksLabel": "Quick links",
    "credential": "CREFITO 1 318268-F",
    "copyright": "All rights reserved.",
    "backHome": "Home page"
  }
}
```

- [ ] **Step 3: Validar JSON + commit**

```bash
python3 -c "import json; json.load(open('messages/pt.json')); json.load(open('messages/en.json')); print('ok')"
git add messages/
git commit -m "feat(quiropraxia): add pt/en copy for chiropractic landing"
```

---

### Task 4: Header, Hero, Trust bar, Breadcrumb

**Files:**
- Create: `components/quiropraxia/quiro-header.tsx` (client), `components/quiropraxia/quiro-hero.tsx`, `components/quiropraxia/trust-bar.tsx`, `components/quiropraxia/quiro-breadcrumb.tsx`

**Interfaces:**
- Consumes: `QuiroWhatsButton`, `Reveal`, namespaces `quiro.header|hero|trust|breadcrumb`, assets `hero.mp4`/`hero-poster.webp`.
- Produces: `<QuiroHeader>`, `<QuiroHero>`, `<TrustBar>`, `<QuiroBreadcrumb>` — server components sem props (header é client). Âncoras alvo: `#tratamos`, `#tecnicas`, `#depoimentos`, `#faq`, `#localizacao`.

- [ ] **Step 1: `components/quiropraxia/quiro-header.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"
import { cn } from "@/lib/utils"

const anchors = [
  ["conditions", "#tratamos"],
  ["techniques", "#tecnicas"],
  ["testimonials", "#depoimentos"],
  ["faq", "#faq"],
  ["location", "#localizacao"],
] as const

export function QuiroHeader() {
  const t = useTranslations("quiro.header")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-[var(--q-bg)]/90 backdrop-blur border-b border-[var(--q-border)]" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/quiropraxia" className="font-serif text-lg font-bold text-[var(--q-text)]">
          Dr. Guilherme Carvalho
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {anchors.map(([key, href]) => (
            <a key={key} href={href} className="text-sm text-[var(--q-muted)] transition-colors hover:text-[var(--q-copper)]">
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>
        <QuiroWhatsButton location="header" className="px-5 py-2 text-xs">
          {t("cta")}
        </QuiroWhatsButton>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: `components/quiropraxia/quiro-hero.tsx`**

```tsx
import { Star, MapPin, BadgeCheck } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"

export async function QuiroHero() {
  const t = await getTranslations("quiro.hero")

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <div className="absolute inset-0 -z-10">
        <video
          className="q-hero-media h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/quiropraxia/hero-poster.webp"
          aria-label={t("videoAria")}
        >
          <source src="/quiropraxia/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--q-bg)] via-[var(--q-bg)]/75 to-[var(--q-bg)]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgb(196_127_78/0.14),transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.12] text-[var(--q-text)] text-balance sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--q-muted)] sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuiroWhatsButton location="hero">{t("ctaWhatsapp")}</QuiroWhatsButton>
            <a
              href="#localizacao"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--q-border)] px-7 py-3.5 text-sm font-semibold text-[var(--q-text)] transition-colors hover:border-[var(--q-copper)] hover:text-[var(--q-copper)]"
            >
              <MapPin className="h-4 w-4" />
              {t("ctaLocation")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="flex text-[var(--q-copper)]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="font-semibold text-[var(--q-text)]">{t("ratingLabel")}</span>
              <span className="text-[var(--q-muted)]">· {t("ratingCount")}</span>
            </span>
            <span className="flex items-center gap-2 text-[var(--q-muted)]">
              <BadgeCheck className="h-4 w-4 text-[var(--q-copper)]" />
              {t("credential")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `components/quiropraxia/trust-bar.tsx`**

```tsx
import { Wallet, UserRound, ClipboardList, MapPin, HeartHandshake } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const items = [
  ["item1", Wallet],
  ["item2", UserRound],
  ["item3", ClipboardList],
  ["item4", MapPin],
  ["item5", HeartHandshake],
] as const

export async function TrustBar() {
  const t = await getTranslations("quiro.trust")

  return (
    <section className="border-y border-[var(--q-border)] bg-[var(--q-bg-alt)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Reveal section="trust_bar">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map(([key, Icon]) => (
              <li key={key} className="flex items-center gap-3 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] px-4 py-3.5 q-card-hover">
                <Icon className="h-5 w-5 shrink-0 text-[var(--q-copper)]" />
                <span className="text-xs font-medium text-[var(--q-text)] sm:text-sm">{t(key)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: `components/quiropraxia/quiro-breadcrumb.tsx`**

```tsx
import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export async function QuiroBreadcrumb() {
  const t = await getTranslations("quiro.breadcrumb")

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <ol className="flex items-center gap-1.5 text-xs text-[var(--q-muted)]">
        <li>
          <Link href="/" className="transition-colors hover:text-[var(--q-copper)]">
            {t("home")}
          </Link>
        </li>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <li aria-current="page" className="text-[var(--q-text)]">{t("current")}</li>
      </ol>
    </nav>
  )
}
```

- [ ] **Step 5: Build + commit**

```bash
pnpm build
git add components/quiropraxia
git commit -m "feat(quiropraxia): header, video hero, trust bar, breadcrumb"
```

---

### Task 5: Sobre, O que tratamos, Técnicas

**Files:**
- Create: `components/quiropraxia/quiro-about.tsx`, `components/quiropraxia/conditions-grid.tsx`, `components/quiropraxia/techniques-section.tsx`

**Interfaces:**
- Consumes: `Reveal`, namespaces `quiro.about|conditions|techniques`, assets `dr-guilherme.webp`, `tecnica-*.webp`.
- Produces: `<QuiroAbout>`, `<ConditionsGrid>` (id `tratamos`), `<TechniquesSection>` (id `tecnicas`).

- [ ] **Step 1: `components/quiropraxia/quiro-about.tsx`** (seção clara)

```tsx
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

export async function QuiroAbout() {
  const t = await getTranslations("quiro.about")

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal section="about">
          <div className="relative aspect-[9/11] max-w-md overflow-hidden rounded-2xl border border-[var(--q-bone-border)]">
            <Image
              src="/quiropraxia/dr-guilherme.webp"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-terracotta)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-ink)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--q-ink-muted)]">{t("p1")}</p>
          <p className="mt-4 leading-relaxed text-[var(--q-ink-muted)]">{t("p2")}</p>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `components/quiropraxia/conditions-grid.tsx`**

```tsx
import {
  Disc3, Activity, MoveVertical, Zap, PersonStanding,
  Grip, CircleDot, Accessibility, Trophy, Move,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const items = [
  ["hernia", Disc3],
  ["lombar", Activity],
  ["cervical", MoveVertical],
  ["ciatico", Zap],
  ["pescoco", PersonStanding],
  ["escapulas", Grip],
  ["ombro", CircleDot],
  ["quadril", Accessibility],
  ["atletas", Trophy],
  ["movimento", Move],
] as const

export async function ConditionsGrid() {
  const t = await getTranslations("quiro.conditions")

  return (
    <section id="tratamos" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="conditions" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm text-[var(--q-muted)] sm:text-base">{t("subtitle")}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map(([key, Icon], i) => (
            <li key={key}>
              <Reveal delay={(i % 5) * 60}>
                <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] px-4 py-6 text-center q-card-hover">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--q-copper)]/10 transition-colors group-hover:bg-[var(--q-copper)]/20">
                    <Icon className="h-5 w-5 text-[var(--q-copper)]" />
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--q-text)]">{t(`items.${key}`)}</h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `components/quiropraxia/techniques-section.tsx`**

```tsx
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const techniques = [
  ["quiropraxia", "tecnica-quiropraxia.webp"],
  ["osteopatia", "tecnica-osteopatia.webp"],
  ["dryNeedling", "tecnica-dry-needling.webp"],
  ["miofascial", "tecnica-miofascial.webp"],
  ["ventosa", "tecnica-ventosa.webp"],
  ["neural", "tecnica-neural.webp"],
  ["exercicios", "tecnica-exercicios.webp"],
] as const

export async function TechniquesSection() {
  const t = await getTranslations("quiro.techniques")

  return (
    <section id="tecnicas" className="scroll-mt-20 bg-[var(--q-bg-alt)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="techniques" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map(([key, img], i) => (
            <Reveal key={key} delay={(i % 3) * 80}>
              <article className="h-full overflow-hidden rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)] q-card-hover">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={`/quiropraxia/${img}`}
                    alt={t("imageAlt", { name: t(`items.${key}.name`) })}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[var(--q-text)]">{t(`items.${key}.name`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--q-muted)]">{t(`items.${key}.text`)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Build + commit**

```bash
pnpm build
git add components/quiropraxia
git commit -m "feat(quiropraxia): about, conditions grid, techniques sections"
```

---

### Task 6: Vídeo institucional + Timeline da consulta

**Files:**
- Create: `components/quiropraxia/institutional-video.tsx`, `components/quiropraxia/consult-steps.tsx`

**Interfaces:**
- Consumes: `Reveal`, namespaces `quiro.video|steps`, assets `video-institucional.mp4`, `hero-poster.webp`.
- Produces: `<InstitutionalVideo>`, `<ConsultSteps>`.

- [ ] **Step 1: `components/quiropraxia/institutional-video.tsx`** (seção clara)

```tsx
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

export async function InstitutionalVideo() {
  const t = await getTranslations("quiro.video")

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal section="institutional_video">
          {/* ponytail: placeholder = cópia do hero.mp4; trocar arquivo quando vídeo real chegar */}
          <video
            className="aspect-video w-full rounded-2xl border border-[var(--q-bone-border)] bg-[var(--q-ink)] object-cover"
            controls
            preload="none"
            poster="/quiropraxia/hero-poster.webp"
            aria-label={t("videoAria")}
          >
            <source src="/quiropraxia/video-institucional.mp4" type="video/mp4" />
          </video>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-terracotta)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-ink)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--q-ink-muted)]">{t("p1")}</p>
          <p className="mt-4 leading-relaxed text-[var(--q-ink-muted)]">{t("p2")}</p>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `components/quiropraxia/consult-steps.tsx`**

```tsx
import { ClipboardCheck, Search, HandHeart, Dumbbell, TrendingUp } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const steps = [
  ["s1", ClipboardCheck],
  ["s2", Search],
  ["s3", HandHeart],
  ["s4", Dumbbell],
  ["s5", TrendingUp],
] as const

export async function ConsultSteps() {
  const t = await getTranslations("quiro.steps")

  return (
    <section className="bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal section="consult_steps" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="relative mt-12 space-y-8 border-l border-[var(--q-border)] pl-8 sm:mt-16">
          {steps.map(([key, Icon], i) => (
            <li key={key} className="relative">
              <Reveal delay={i * 80}>
                <span className="absolute -left-[3.05rem] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--q-copper)]/40 bg-[var(--q-card)]">
                  <Icon className="h-4 w-4 text-[var(--q-copper)]" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-serif text-lg font-bold text-[var(--q-text)]">{t(`${key}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--q-muted)]">{t(`${key}.text`)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Build + commit**

```bash
pnpm build
git add components/quiropraxia
git commit -m "feat(quiropraxia): institutional video + consult timeline"
```

---

### Task 7: Depoimentos + Galeria

**Files:**
- Create: `components/quiropraxia/quiro-testimonials.tsx` (client), `components/quiropraxia/quiro-gallery.tsx`

**Interfaces:**
- Consumes: `GET /api/reviews` → `{ reviews: GoogleReview[], rating?: number, total?: number }` (`GoogleReview` = `{ author_name, rating, text, relative_time_description }`); `Reveal`; namespaces `quiro.testimonials|gallery`; assets `galeria-0{1..8}.webp`.
- Produces: `<QuiroTestimonials>` (id `depoimentos`), `<QuiroGallery>`.

- [ ] **Step 1: `components/quiropraxia/quiro-testimonials.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"
import { Star, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/quiropraxia/reveal"

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

// ponytail: vídeos de depoimento entram aqui quando os arquivos chegarem
// (ex.: "/quiropraxia/depoimento-01.mp4") — seção de vídeos só renderiza se não-vazio
const VIDEO_TESTIMONIALS: string[] = []

export function QuiroTestimonials() {
  const t = useTranslations("quiro.testimonials")
  const [reviews, setReviews] = useState<GoogleReview[]>([])

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]))
  }, [])

  return (
    <section id="depoimentos" className="scroll-mt-20 bg-[var(--q-bg-alt)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="testimonials" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[var(--q-muted)]">
            <span className="flex text-[var(--q-copper)]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            {t("ratingStatic")} · {t("subtitle")}
          </p>
        </Reveal>

        {VIDEO_TESTIMONIALS.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VIDEO_TESTIMONIALS.map((src) => (
              <video key={src} className="aspect-video w-full rounded-2xl border border-[var(--q-border)]" controls preload="none">
                <source src={src} type="video/mp4" />
              </video>
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
            {reviews.map((r) => (
              <figure
                key={r.author_name + r.relative_time_description}
                className="w-[85%] shrink-0 snap-start rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)] p-6 sm:w-[45%] lg:w-[31%]"
              >
                <span className="flex text-[var(--q-copper)]" aria-label={`${r.rating}/5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-[var(--q-muted)]">
                  “{r.text.length > 220 ? `${r.text.slice(0, 220)}…` : r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[var(--q-text)]">
                  {r.author_name}
                  <span className="ml-2 font-normal text-[var(--q-muted)]">{r.relative_time_description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-6 text-center">
          <a
            href="https://www.google.com/search?q=Dr.+Guilherme+Carvalho+Fisioterapeuta+Natal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--q-copper)] hover:underline"
          >
            {t("seeAll")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `components/quiropraxia/quiro-gallery.tsx`** (seção clara)

```tsx
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const photos = [1, 2, 3, 4, 5, 6, 7, 8] as const

export async function QuiroGallery() {
  const t = await getTranslations("quiro.gallery")

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="gallery" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-terracotta)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-ink)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-4">
          {photos.map((n, i) => (
            <Reveal key={n} delay={(i % 4) * 60} className={i % 5 === 0 ? "md:row-span-2" : ""}>
              <div className={`relative overflow-hidden rounded-xl border border-[var(--q-bone-border)] ${i % 5 === 0 ? "aspect-square md:aspect-[1/2.05]" : "aspect-square"}`}>
                <Image
                  src={`/quiropraxia/galeria-0${n}.webp`}
                  alt={t(`alt${n}`)}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Build + commit**

```bash
pnpm build
git add components/quiropraxia
git commit -m "feat(quiropraxia): google reviews carousel + gallery"
```

---

### Task 8: FAQ, CTA final, Localização, Footer

**Files:**
- Create: `components/quiropraxia/quiro-faq.tsx`, `components/quiropraxia/quiro-final-cta.tsx`, `components/quiropraxia/quiro-location.tsx`, `components/quiropraxia/quiro-footer.tsx`

**Interfaces:**
- Consumes: `Reveal`, `QuiroWhatsButton`, `WHATSAPP_URL`/`WHATSAPP_NUMBER`/`INSTAGRAM_URL` de `lib/config.ts`, namespaces `quiro.faq|finalCta|location|footer`.
- Produces: `<QuiroFaq>` (id `faq`), `<QuiroFinalCta>`, `<QuiroLocation>` (id `localizacao`), `<QuiroFooter>`.

- [ ] **Step 1: `components/quiropraxia/quiro-faq.tsx`** — accordion nativo `<details>`:

```tsx
import { Plus } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const questions = [1, 2, 3, 4, 5, 6, 7, 8] as const

export async function QuiroFaq() {
  const t = await getTranslations("quiro.faq")

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal section="faq" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--q-border)] rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)]">
          {questions.map((n) => (
            <details key={n} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--q-text)] sm:text-base [&::-webkit-details-marker]:hidden">
                {t(`q${n}`)}
                <Plus className="h-4 w-4 shrink-0 text-[var(--q-copper)] transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--q-muted)]">{t(`a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `components/quiropraxia/quiro-final-cta.tsx`**

```tsx
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"

export async function QuiroFinalCta() {
  const t = await getTranslations("quiro.finalCta")

  return (
    <section className="relative overflow-hidden bg-[var(--q-bg-alt)] py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgb(196_127_78/0.22),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal section="final_cta">
          <h2 className="font-serif text-3xl font-bold text-[var(--q-text)] text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--q-muted)] sm:text-lg">
            {t("text")}
          </p>
          <div className="mt-9">
            <QuiroWhatsButton location="final_cta" className="px-10 py-4 text-base">
              {t("cta")}
            </QuiroWhatsButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `components/quiropraxia/quiro-location.tsx`**

```tsx
import { MapPin, Clock, ArrowUpRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Rua+Jo%C3%A3o+Pessoa%2C+198%2C+Cidade+Alta%2C+Natal%2C+RN"

export async function QuiroLocation() {
  const t = await getTranslations("quiro.location")

  return (
    <section id="localizacao" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="location" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">{t("tagline")}</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2">
          <div className="h-72 overflow-hidden rounded-2xl border border-[var(--q-border)] lg:h-auto">
            <iframe
              src="https://maps.google.com/maps?q=Rua+Jo%C3%A3o+Pessoa%2C+198%2C+Cidade+Alta%2C+Natal%2C+RN%2C+Brasil&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--q-copper)]" />
              <div>
                <h3 className="font-semibold text-[var(--q-text)]">{t("addressLabel")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--q-muted)]">
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                </p>
                <p className="mt-1.5 text-xs text-[var(--q-muted)]">{t("addressNote")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] p-6">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--q-copper)]" />
              <div>
                <h3 className="font-semibold text-[var(--q-text)]">{t("hoursLabel")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--q-muted)]">
                  {t("hoursText")}
                  <br />
                  {t("hoursText2")}
                </p>
              </div>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--q-copper)] px-7 py-3.5 text-sm font-semibold text-[var(--q-copper)] transition-colors hover:bg-[var(--q-copper)] hover:text-[var(--q-bg)]"
            >
              {t("directions")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: `components/quiropraxia/quiro-footer.tsx`**

```tsx
import { MessageCircle, Instagram, Phone, MapPin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { WHATSAPP_QUIRO_URL, WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/config"

export async function QuiroFooter() {
  const t = await getTranslations("quiro.footer")
  const tNav = await getTranslations("quiro.header.nav")
  const phone = `+55 (84) 9 8191-0924`

  return (
    <footer className="border-t border-[var(--q-border)] bg-[#0b0c0e] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-lg font-bold text-[var(--q-text)]">Dr. Guilherme Carvalho</p>
          <p className="mt-1 text-sm text-[var(--q-muted)]">{t("role")}</p>
          <p className="mt-3 text-xs text-[var(--q-muted)]">{t("credential")}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">{t("contactLabel")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--q-muted)]">
            <li>
              <a href={WHATSAPP_QUIRO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--q-copper)]">
                <MessageCircle className="h-4 w-4" /> {t("whatsapp")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {phone}
            </li>
            {INSTAGRAM_URL && (
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--q-copper)]">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
            )}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Rua João Pessoa, 198 — Sala 406
                <br />
                Cidade Alta, Natal/RN
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">{t("linksLabel")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--q-muted)]">
            <li><a href="#tratamos" className="hover:text-[var(--q-copper)]">{tNav("conditions")}</a></li>
            <li><a href="#tecnicas" className="hover:text-[var(--q-copper)]">{tNav("techniques")}</a></li>
            <li><a href="#depoimentos" className="hover:text-[var(--q-copper)]">{tNav("testimonials")}</a></li>
            <li><a href="#faq" className="hover:text-[var(--q-copper)]">{tNav("faq")}</a></li>
            <li><a href="#localizacao" className="hover:text-[var(--q-copper)]">{tNav("location")}</a></li>
            <li><Link href="/" className="hover:text-[var(--q-copper)]">{t("backHome")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--q-border)] px-4 pt-6 sm:px-6">
        <p className="text-xs text-[var(--q-muted)]">
          © {new Date().getFullYear()} Dr. Guilherme Carvalho. {t("copyright")}
        </p>
      </div>
    </footer>
  )
}
```

Nota: telefone deriva de `WHATSAPP_NUMBER` conceitualmente — manter string formatada local no componente é aceitável (número já centralizado no config pra links). Política de Privacidade: página não existe no site (home também não linka) — deixado fora; criar depois se necessário.

- [ ] **Step 5: Build + commit**

```bash
pnpm build
git add components/quiropraxia
git commit -m "feat(quiropraxia): faq, final cta, location, footer"
```

---

### Task 9: Página — composição, metadata, JSON-LD

**Files:**
- Create: `app/[locale]/quiropraxia/page.tsx`

**Interfaces:**
- Consumes: todos os componentes das Tasks 4–8, `quiro.css`, `WhatsAppFab`, `MainEngagementTracker` (com `page="quiropraxia"`), namespaces `quiro.metadata|faq|breadcrumb`.

- [ ] **Step 1: `app/[locale]/quiropraxia/page.tsx`**

```tsx
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { QuiroHeader } from "@/components/quiropraxia/quiro-header"
import { QuiroHero } from "@/components/quiropraxia/quiro-hero"
import { TrustBar } from "@/components/quiropraxia/trust-bar"
import { QuiroBreadcrumb } from "@/components/quiropraxia/quiro-breadcrumb"
import { QuiroAbout } from "@/components/quiropraxia/quiro-about"
import { ConditionsGrid } from "@/components/quiropraxia/conditions-grid"
import { TechniquesSection } from "@/components/quiropraxia/techniques-section"
import { InstitutionalVideo } from "@/components/quiropraxia/institutional-video"
import { ConsultSteps } from "@/components/quiropraxia/consult-steps"
import { QuiroTestimonials } from "@/components/quiropraxia/quiro-testimonials"
import { QuiroGallery } from "@/components/quiropraxia/quiro-gallery"
import { QuiroFaq } from "@/components/quiropraxia/quiro-faq"
import { QuiroFinalCta } from "@/components/quiropraxia/quiro-final-cta"
import { QuiroLocation } from "@/components/quiropraxia/quiro-location"
import { QuiroFooter } from "@/components/quiropraxia/quiro-footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"
import { MainEngagementTracker } from "@/components/main-engagement-tracker"
import "@/components/quiropraxia/quiro.css"

const BASE_URL = "https://doutorguilhermecarvalho.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "quiro.metadata" })
  const path = locale === "pt" ? "/quiropraxia" : `/${locale}/quiropraxia`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: {
        "pt-BR": `${BASE_URL}/quiropraxia`,
        en: `${BASE_URL}/en/quiropraxia`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}${path}`,
      siteName: "Dr. Guilherme Carvalho — Fisioterapeuta",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [{ url: "/quiropraxia/hero-poster.webp", width: 720, height: 1280 }],
    },
  }
}

export default async function QuiropraxiaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const tFaq = await getTranslations("quiro.faq")
  const tBc = await getTranslations("quiro.breadcrumb")

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${BASE_URL}/quiropraxia#business`,
      name: "Dr. Guilherme Carvalho — Quiropraxia e Fisioterapia em Natal",
      url: `${BASE_URL}/quiropraxia`,
      description:
        "Quiropraxia, osteopatia, dry needling e terapia manual em Natal/RN. Tratamento para dor lombar, hérnia de disco e nervo ciático.",
      telephone: "+5584981910924",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua João Pessoa, 198 — Sala 406",
        addressLocality: "Natal",
        addressRegion: "Rio Grande do Norte",
        postalCode: "59025-500",
        addressCountry: "BR",
      },
      geo: { "@type": "GeoCoordinates", latitude: -5.7838, longitude: -35.2027 },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      medicalSpecialty: ["Physiotherapy", "Chiropractic", "Osteopathy"],
      hasCredential: "CREFITO 1 318268-F",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        "@type": "Question",
        name: tFaq(`q${n}`),
        acceptedAnswer: { "@type": "Answer", text: tFaq(`a${n}`) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tBc("home"), item: BASE_URL },
        { "@type": "ListItem", position: 2, name: tBc("current"), item: `${BASE_URL}/quiropraxia` },
      ],
    },
  ]

  return (
    <div className="quiro min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuiroHeader />
      <main>
        <QuiroHero />
        <TrustBar />
        <QuiroBreadcrumb />
        <QuiroAbout />
        <ConditionsGrid />
        <TechniquesSection />
        <InstitutionalVideo />
        <ConsultSteps />
        <QuiroTestimonials />
        <QuiroGallery />
        <QuiroFaq />
        <QuiroFinalCta />
        <QuiroLocation />
      </main>
      <QuiroFooter />
      <WhatsAppFab />
      <MainEngagementTracker page="quiropraxia" />
    </div>
  )
}
```

Nota: se `setRequestLocale` não existir/for desnecessário na config atual do next-intl, remover o import e a chamada — o resto não muda. Se o build reclamar de importar CSS em page (App Router aceita CSS global em qualquer server component, mas se falhar), mover o import `quiro.css` para dentro do próprio componente via `<style>` NÃO — em vez disso importar `quiro.css` em `app/globals.css` via `@import "../components/quiropraxia/quiro.css";` (escopo continua `.quiro`).

- [ ] **Step 2: Build + smoke**

```bash
pnpm build
```

Expected: rota `/[locale]/quiropraxia` no output do build, sem erros de tipo.

```bash
pnpm dev  # visitar http://localhost:3000/quiropraxia e /en/quiropraxia
```

Checar: vídeo hero toca, overlay legível, reveals funcionam, FAQ abre, mapa carrega, breadcrumb, FAB presente.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/quiropraxia
git commit -m "feat(quiropraxia): compose landing page with metadata + json-ld"
```

---

### Task 10: sitemap.ts, robots.ts, docs de analytics

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`
- Modify: `docs/gtm-events.md`

**Interfaces:**
- Produces: `GET /sitemap.xml`, `GET /robots.txt` (site inteiro).

- [ ] **Step 1: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next"

const BASE_URL = "https://doutorguilhermecarvalho.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/guia", "/quiropraxia"]

  return routes.flatMap((route) => [
    {
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.9,
      alternates: {
        languages: {
          "pt-BR": `${BASE_URL}${route}`,
          en: `${BASE_URL}/en${route}`,
        },
      },
    },
  ])
}
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: "https://doutorguilhermecarvalho.com/sitemap.xml",
  }
}
```

- [ ] **Step 3: `docs/gtm-events.md`** — na tabela de eventos, atualizar linhas existentes (sem criar evento novo):
  - `whatsapp_click`: acrescentar na coluna "Onde dispara": "página /quiropraxia (header, hero, final_cta, footer)" e param `page`.
  - `scroll_depth` e `section_view`: acrescentar `page: "quiropraxia"` nos valores possíveis.

- [ ] **Step 4: Verificar + commit**

```bash
pnpm build
curl -s http://localhost:3000/sitemap.xml | head -20   # com pnpm start ou dev rodando
git add app/sitemap.ts app/robots.ts docs/gtm-events.md
git commit -m "feat(seo): add sitemap.xml + robots.txt; document quiropraxia analytics"
```

---

### Task 11: Verificação final

**Files:** nenhum novo

- [ ] **Step 1:** `pnpm lint` — zero erros novos.
- [ ] **Step 2:** `pnpm build` — verde.
- [ ] **Step 3:** Smoke completo no dev: `/quiropraxia` e `/en/quiropraxia` — H1 único (`document.querySelectorAll("h1").length === 1`), JSON-LD presente (3 blocos), eventos no dataLayer ao clicar WhatsApp (`window.dataLayer` no console), FAQ acessível por teclado, `prefers-reduced-motion` (emular no DevTools) desliga animações.
- [ ] **Step 4:** Home `/` intacta (tracker default `page:"main"`).
- [ ] **Step 5:** Commit final se sobrou ajuste; não fazer push sem o usuário pedir.

## Self-review (executado na escrita do plano)

- Spec coverage: hero vídeo ✓, trust bar ✓, sobre ✓, condições ✓, técnicas ✓, vídeo institucional ✓, timeline ✓, depoimentos ✓, galeria ✓, FAQ ✓, CTA ✓, localização ✓, footer ✓, breadcrumb ✓, metadata/OG ✓, JSON-LD ×3 ✓, sitemap/robots ✓, analytics ✓, reduced-motion ✓, placeholders nomeados ✓.
- Sem TBDs; tipos consistentes (`Reveal`, `QuiroWhatsButton`, namespaces `quiro.*` conferidos entre Tasks 3–9).
- Fora do plano (deliberado): página de Política de Privacidade (home também não tem), fetch dinâmico de rating no hero (estático "5,0 · 50+"; `/api/reviews` alimenta só o carrossel).
