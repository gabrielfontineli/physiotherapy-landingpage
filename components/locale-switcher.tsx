"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggle = () => {
    const nextLocale = locale === "pt" ? "en" : "pt"
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <button
      onClick={toggle}
      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md border border-border hover:border-primary/40"
      aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      {locale === "pt" ? "EN" : "PT"}
    </button>
  )
}
