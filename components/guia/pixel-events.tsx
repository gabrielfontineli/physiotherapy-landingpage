"use client"

import { useEffect } from "react"


/** Fires ViewContent on Meta + TikTok when the guia page loads */
export function PixelViewContent() {
  useEffect(() => {
    window.fbq?.("track", "ViewContent", {
      content_name: "Guia Hérnia de Disco",
      content_category: "guia_digital",
      value: 19.90,
      currency: "BRL",
    })

    window.ttq?.track("ViewContent", {
      content_name: "Guia Hérnia de Disco",
      content_type: "product",
      value: 19.90,
      currency: "BRL",
    })
  }, [])

  return null
}
