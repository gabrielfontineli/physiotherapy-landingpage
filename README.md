# Physiotherapy Landing Page

Landing page para consultório de fisioterapia, construída com Next.js 16, React 19 e Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS v4 + shadcn/ui
- **Formulários:** React Hook Form + Zod
- **Tema:** next-themes (dark/light mode)
- **Package Manager:** pnpm

## Estrutura de Seções

```
/
├── Header           - Navegação e CTA
├── HeroSection      - Captura atenção e gera clique
├── SymptomsSection  - Visitante se identifica com sintomas
├── ServicesSection  - Presencial / Teleatendimento / E-book
├── MethodSection    - Como funciona o tratamento
├── AboutSection     - Autoridade e confiança do profissional
├── TestimonialsSection - Prova social
├── TriageFormSection   - Formulário de pré-triagem
├── LocationSection  - Mapa e endereço
├── FinalCtaSection  - Última chamada para ação
└── Footer
```

## Rodando Localmente

**Pré-requisitos:** Node.js v22+ e pnpm instalados.

```bash
# Instalar dependências
pnpm install

# Servidor de desenvolvimento
pnpm dev

# Acessar em
http://localhost:3000
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Executa o linter |

## Estrutura de Arquivos

```
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout raiz
│   └── page.tsx         # Página principal
├── components/
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── ...              # Demais seções
│   └── whatsapp-fab.tsx # Botão flutuante WhatsApp
├── hooks/               # Custom hooks
├── lib/                 # Utilitários
├── public/
│   └── images/          # Assets de imagem
└── styles/
    └── globals.css
```
