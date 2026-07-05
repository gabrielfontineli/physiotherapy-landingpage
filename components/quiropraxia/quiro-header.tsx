"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"
import { cn } from "@/lib/utils"

const anchors = [
  ["conditions", "#tratamos"],
  ["techniques", "#tecnicas"],
  ["testimonials", "#depoimentos"],
  ["faq", "#faq"],
  ["location", "#localizacao"],
] as const

export function QuiroHeader() {
  const t = useTranslations("quiro.header")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[var(--q-bg)]/90 backdrop-blur border-b border-[var(--q-border)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/quiropraxia" className="font-serif text-lg font-bold text-[var(--q-text)]">
          Dr. Guilherme Carvalho
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {anchors.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="text-sm text-[var(--q-muted)] transition-colors hover:text-[var(--q-copper)]"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>
        <QuiroWhatsButton location="header" className="px-5 py-2 text-xs">
          {t("cta")}
        </QuiroWhatsButton>
      </div>
    </header>
  )
}
