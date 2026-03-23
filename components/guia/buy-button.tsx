"use client"

import { BookOpen, ArrowRight } from "lucide-react"
import { HOTMART_URL } from "@/lib/config"

interface BuyButtonProps {
  label?: string
  large?: boolean
  className?: string
}

export function BuyButton({ label = "Quero o Guia Agora", large = true, className }: BuyButtonProps) {
  function handleClick() {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: "Guia Hérnia de Disco",
      value: 19.90,
      currency: "BRL",
    })
    window.ttq?.track("InitiateCheckout", {
      content_name: "Guia Hérnia de Disco",
      content_type: "product",
      value: 19.90,
      currency: "BRL",
    })
  }

  return (
    <a
      href={HOTMART_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-3 rounded-2xl font-bold text-[#0c0c0f] bg-[#f5c842] hover:bg-[#f0bb22] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-[0_8px_30px_rgba(245,200,66,0.40)] ${
        large ? "px-8 py-4 text-lg sm:text-xl" : "px-6 py-3 text-base"
      } ${className ?? ""}`}
    >
      <BookOpen className="h-5 w-5 shrink-0" />
      {label}
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  )
}
