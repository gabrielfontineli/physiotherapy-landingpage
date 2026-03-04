"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#fff] shadow-xl transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Fale com o Dr. Guilherme pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
