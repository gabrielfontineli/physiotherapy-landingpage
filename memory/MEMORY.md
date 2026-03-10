# Physiotherapy Landing Page — Dr. Guilherme Carvalho

## Stack
- Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui, next-intl (PT/EN), next-themes

## Key files
- `lib/config.ts` — WHATSAPP_URL, WHATSAPP_GUIDE_URL, WHATSAPP_BASE, HOTMART_URL, WHATSAPP_NUMBER (single source of truth)
- `app/[locale]/page.tsx` — main landing page composition
- `app/[locale]/guia/page.tsx` — e-book sales page (dark gold identity)
- `app/globals.css` — CSS tokens (Prussian Blue primary + Gold accent, OKLch color space)
- `styles/globals.css` — btn-glow-green, btn-glow-orange, btn-shine animations

## Patterns
- Server components use `getTranslations()` from `next-intl/server` (async function)
- Client components use `useTranslations()` from `next-intl`
- Translations: `messages/pt.json` (default) and `messages/en.json`
- Colors: `--primary` = Prussian Blue, `--accent` = Gold
- Typography: `font-sans` = Inter, `font-serif` = Playfair Display

## /guia page
- Brand colors: `#0c0c0f` (dark bg), `#111116` (alt bg), `#f5c842` (gold)
- Components: `components/guia/buy-button.tsx`, `components/guia/sticky-cta.tsx`
- Uses shadcn `Accordion` for FAQ, `StickyCta` (client) appears after 700px scroll
- Price anchor: R$ 47 → R$ 19,90 · 7-day guarantee · Hotmart payment

## Architecture notes
- ServicesSection and SymptomsSection are async server components
- TestimonialsSection fetches `/api/reviews` on client (useEffect)
- TriageFormSection is a multi-step form ("use client"), builds WhatsApp URL from answers
- `next.config.mjs` has no ignoreBuildErrors (was removed)
