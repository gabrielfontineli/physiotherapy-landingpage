# GTM — catálogo de eventos do dataLayer

O site agora **não dispara GA4 / Meta / TikTok direto**. Ele só empurra eventos
semânticos pro `dataLayer`, e o **GTM (`GTM-TQ3LNCS2`) faz o roteamento** pra
cada plataforma via configuração no painel (tagmanager.google.com).

Código: `lib/analytics.ts` → `track(event, params)` faz `dataLayer.push({ event, ...params })`.

## O que o gestor precisa montar no GTM

1. **Tags base** (disparar em "All Pages"):
   - GA4 Configuration (`G-RV3BGXF7V7`)
   - Meta Pixel base (`920157670230083`) + PageView
   - TikTok Pixel base (se for usar) + page

2. **Triggers de Custom Event** — um por evento abaixo (Trigger type: *Custom Event*, Event name = nome exato).

3. **Variáveis de Data Layer** pra ler os params (`value`, `currency`, `location`, etc.) e passar pras tags de conversão.

> ⚠️ Não duplicar: GA4/Meta/TikTok agora só existem DENTRO do GTM. Se configurar PageView na tag base, não criar de novo nos custom events.

## Eventos emitidos pelo site

| Evento (dataLayer) | Onde dispara | Params | Mapeamento sugerido (GA4 / Meta / TikTok) |
|---|---|---|---|
| `whatsapp_click` | botões WhatsApp (hero, fab, final, triagem) | `location` | — / `Contact` / `Contact` |
| `triage_cta_click` | CTA abrir triagem | `location` | só GA4 |
| `triage_start` | início do formulário de triagem | — | — / `Lead` / `Subscribe` |
| `triage_step_complete` | cada passo da triagem | `step` | só GA4 (funil granular) |
| `triage_complete` | triagem finalizada | — | `generate_lead` / `CompleteRegistration` / `CompleteRegistration` |
| `scroll_depth` | marcos de scroll | `depth` (25/50/75/100), `page` | — / `ScrollDepth` (custom) / `ScrollDepth` |
| `section_view` | seção entra na tela (guia) | `section`, `page` | — / `SectionView` (custom) / `SectionView` |
| `add_to_cart` | scroll 75% na guia (proxy alta intenção) | `content_name`, `content_type`, `value`, `currency` | — / `AddToCart` / `AddToCart` |
| `view_content` | carga da página da guia | `content_name`, `content_category`, `content_type`, `value`, `currency` | — / `ViewContent` / `ViewContent` |
| `checklist_lead` | 2+ sintomas marcados no checklist | `content_name`, `content_category`, `value`, `currency` | — / `Lead` / `SubmitForm` |
| `buy_click` | clique comprar (Hotmart) | `content_name`, `value`, `currency` | `begin_checkout` / `InitiateCheckout` / `InitiateCheckout` |

Valores monetários: `value: 19.90`, `currency: "BRL"`.

## Adicionar evento novo

No código: `track("nome_do_evento", { ...params })`. Depois o gestor cria o
trigger + tag correspondente no GTM. Sem deploy pro mapeamento — só pra novos
pontos de disparo no site.
