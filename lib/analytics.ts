declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void
      page: () => void
    }
  }
}

type EventParams = Record<string, unknown>

interface PixelMapping {
  ga4Name?: string
  meta?: { action: "track" | "trackCustom"; name: string }
  tiktok?: string
}

const EVENT_MAP: Record<string, PixelMapping> = {
  whatsapp_click: {
    meta: { action: "track", name: "Contact" },
    tiktok: "Contact",
  },
  triage_cta_click: {},
  triage_start: {
    meta: { action: "track", name: "Lead" },
    tiktok: "Subscribe",
  },
  triage_step_complete: {},
  triage_complete: {
    ga4Name: "generate_lead",
    meta: { action: "track", name: "CompleteRegistration" },
    tiktok: "CompleteRegistration",
  },
  scroll_depth: {
    meta: { action: "trackCustom", name: "ScrollDepth" },
    tiktok: "ScrollDepth",
  },
  add_to_cart: {
    meta: { action: "track", name: "AddToCart" },
    tiktok: "AddToCart",
  },
  section_view: {
    meta: { action: "trackCustom", name: "SectionView" },
    tiktok: "SectionView",
  },
  buy_click: {
    ga4Name: "begin_checkout",
    meta: { action: "track", name: "InitiateCheckout" },
    tiktok: "InitiateCheckout",
  },
}

export function track(event: string, params?: EventParams): void {
  if (typeof window === "undefined") return

  const mapping = EVENT_MAP[event] ?? {}
  const ga4Name = mapping.ga4Name ?? event

  window.gtag?.("event", ga4Name, params)

  if (mapping.meta) {
    window.fbq?.(mapping.meta.action, mapping.meta.name, params)
  }

  if (mapping.tiktok) {
    window.ttq?.track?.(mapping.tiktok, params)
  }
}
