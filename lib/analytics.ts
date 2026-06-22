declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

type EventParams = Record<string, unknown>

/**
 * Push an event to the GTM dataLayer.
 *
 * GTM is the single source of truth: it routes each event to GA4 / Meta /
 * TikTok / Google Ads via container config (tagmanager.google.com). The app
 * only emits a semantic event name + params; the mapping lives in the panel.
 *
 * See docs/gtm-events.md for the event catalog the traffic manager configures.
 */
export function track(event: string, params?: EventParams): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
