"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { track } from "@/lib/analytics"

export function Reveal({
  children,
  className = "",
  delay = 0,
  section,
}: {
  children: ReactNode
  className?: string
  delay?: number
  section?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add("q-visible")
        if (section) track("section_view", { section, page: "quiropraxia" })
        observer.disconnect()
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [section])

  return (
    <div
      ref={ref}
      className={`q-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
