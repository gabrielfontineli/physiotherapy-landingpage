"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Fires Meta Pixel ViewContent when the guia page loads */
export function PixelViewContent() {
  useEffect(() => {
    window.fbq?.("track", "ViewContent", {
      content_name: "Guia Hérnia de Disco",
      content_category: "guia_digital",
      value: 19.90,
      currency: "BRL",
    })
  }, [])

  return null
}
