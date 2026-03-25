"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { HOTMART_URL } from "@/lib/config"

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setVisible(pct > 0.30)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "rgba(12,12,15,0.97)",
        borderTop: "1px solid rgba(245,200,66,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">Guia Hérnia de Disco</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-white/30 line-through">R$ 47,00</span>
            <span className="text-base font-bold text-[#f5c842]">R$ 19,90</span>
          </div>
        </div>
        <a
          href={HOTMART_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold bg-[#f5c842] text-[#0c0c0f] hover:bg-[#f0bb22] active:scale-95 transition-all shadow-[0_4px_16px_rgba(245,200,66,0.45)] animate-pulse"
        >
          Garantir acesso
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
