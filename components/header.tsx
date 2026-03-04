"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

const navLinks = [
  { label: "Sintomas", href: "#sintomas" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" />
              Agendar
            </a>
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col px-4 sm:px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" />
                Agendar Avaliação
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
