"use client"

import type { ReactNode } from "react"
import { track } from "@/lib/analytics"
import { WHATSAPP_QUIRO_URL } from "@/lib/config"
import { cn } from "@/lib/utils"

const variants = {
  solid:
    "bg-[var(--q-copper)] text-[var(--q-bg)] hover:brightness-110 shadow-lg shadow-[var(--q-copper)]/20",
  outline:
    "border border-[var(--q-border)] text-[var(--q-text)] hover:border-[var(--q-copper)] hover:text-[var(--q-copper)]",
}

export function QuiroWhatsButton({
  location,
  variant = "solid",
  className,
  children,
}: {
  location: string
  variant?: keyof typeof variants
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={WHATSAPP_QUIRO_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location, page: "quiropraxia" })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  )
}
