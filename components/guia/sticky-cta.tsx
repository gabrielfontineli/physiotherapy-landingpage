"use client"

import { useState, useEffect } from "react"
import { BookOpen, ArrowRight } from "lucide-react"
import { HOTMART_URL } from "@/lib/config"

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ background: "#0f0f14", borderTop: "1px solid rgba(245,200,66,0.2)" }}
    >
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block min-w-0">
          <p className="text-sm font-semibold text-white truncate">Destrave sua Hérnia de Disco e Ciático</p>
          <p className="text-xs text-white/40">Guia Digital · Acesso imediato</p>
        </div>
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <div className="text-right">
            <p className="text-xs text-white/35 line-through">R$ 47,00</p>
            <p className="text-base font-bold text-[#f5c842] leading-tight">R$ 19,90</p>
          </div>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-bold bg-[#f5c842] text-[#0c0c0f] hover:bg-[#f0bb22] transition-colors"
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            <span className="hidden xs:inline">Garantir acesso</span>
            <span className="xs:hidden">Comprar</span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  )
}
