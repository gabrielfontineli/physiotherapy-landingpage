"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useTranslations } from "next-intl"
import { WHATSAPP_URL } from "@/lib/config"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations("header")

  const navLinks = [
    { label: t("navServices"), href: "#servicos" },
    { label: t("navMethod"), href: "#metodo" },
    { label: t("navAbout"), href: "#sobre" },
    { label: t("navTestimonials"), href: "#depoimentos" },
    { label: t("navTriage"), href: "#triagem" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a href="#" className="font-serif text-xl font-bold tracking-tight text-foreground">
          Dr. Guilherme <span className="text-primary">Carvalho</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" />
              {t("schedule")}
            </a>
          </Button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LocaleSwitcher />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col px-4 sm:px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("theme")}</span>
              <ThemeToggle />
            </div>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" />
                {t("scheduleEvaluation")}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
