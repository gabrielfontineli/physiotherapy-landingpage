"use client"

import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/config"
import { track } from "@/lib/analytics"

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "fab" })}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#fff] shadow-xl transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Fale com o Dr. Guilherme pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
