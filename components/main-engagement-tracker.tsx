"use client"

import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

export function MainEngagementTracker() {
  const firedDepths = useRef(new Set<number>())

  useEffect(() => {
    const depthMilestones = [25, 50, 75, 90]

    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)

      for (const milestone of depthMilestones) {
        if (pct >= milestone && !firedDepths.current.has(milestone)) {
          firedDepths.current.add(milestone)
          track("scroll_depth", { depth: milestone, page: "main" })
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
