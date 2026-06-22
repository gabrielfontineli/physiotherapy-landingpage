"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

/** Fires view_content on the guia page load (GTM routes to Meta + TikTok) */
export function PixelViewContent() {
  useEffect(() => {
    track("view_content", {
      content_name: "Guia Hérnia de Disco",
      content_category: "guia_digital",
      content_type: "product",
      value: 19.9,
      currency: "BRL",
    })
  }, [])

  return null
}
