"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/quiropraxia/reveal"

const STATS = [
  { to: 500, decimals: 0, suffix: "+", id: "patients" },
  { to: 5, decimals: 1, suffix: "", star: true, id: "rating" },
  { to: 5, decimals: 0, suffix: "+", id: "years" },
  { to: 7, decimals: 0, suffix: "", id: "techniques" },
] as const

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useCountUp(to: number, decimals: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReduced()) {
      setValue(to)
      return
    }
    let raf = 0
    let start = 0
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, duration])
  return value.toFixed(decimals)
}

function Stat({
  to,
  decimals,
  suffix,
  star,
  label,
  run,
}: {
  to: number
  decimals: number
  suffix: string
  star?: boolean
  label: string
  run: boolean
}) {
  const shown = useCountUp(to, decimals, run)
  return (
    <div className="text-center">
      <div className="font-serif text-3xl font-bold text-[var(--q-copper)] sm:text-4xl md:text-5xl">
        {shown}
        {suffix}
        {star && <span className="ml-0.5 text-[var(--q-terracotta)]">★</span>}
      </div>
      <div className="mt-1.5 text-xs text-[var(--q-muted)] sm:text-sm">{label}</div>
    </div>
  )
}

export function QuiroStats() {
  const t = useTranslations("quiro.stats")
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRun(true)
        observer.disconnect()
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[var(--q-bg)] py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div ref={ref} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <Stat key={s.id} {...s} label={t(s.id)} run={run} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
