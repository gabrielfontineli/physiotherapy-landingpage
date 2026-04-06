"use client"

import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

export function GuiaEngagementTracker() {
  const firedDepths = useRef(new Set<number>())
  const firedSections = useRef(new Set<string>())

  useEffect(() => {
    // ── 1. SCROLL DEPTH ──────────────────────────────────────────────
    const depthMilestones = [25, 50, 75, 90]

    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)

      for (const milestone of depthMilestones) {
        if (pct >= milestone && !firedDepths.current.has(milestone)) {
          firedDepths.current.add(milestone)
          track("scroll_depth", { depth: milestone, page: "guia" })

          // 75%+ scroll = alta intenção → AddToCart como proxy
          if (milestone === 75) {
            track("add_to_cart", {
              content_name: "Guia Hérnia de Disco",
              content_type: "product",
              value: 19.9,
              currency: "BRL",
            })
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    // ── 2. SEÇÕES VISUALIZADAS (IntersectionObserver) ─────────────────
    const sectionMap: Record<string, string> = {
      "section-testimonials": "Depoimentos",
      "section-checklist": "Checklist",
      "section-consequences": "Consequencias",
      "section-modules": "Modulos",
      "section-price": "Preco",
      "section-author": "Autor",
      "section-faq": "FAQ",
      "section-final-cta": "CTAFinal",
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const sectionName = sectionMap[id]
            if (sectionName && !firedSections.current.has(id)) {
              firedSections.current.add(id)
              track("section_view", { section: sectionName, page: "guia" })
            }
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const id of Object.keys(sectionMap)) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
