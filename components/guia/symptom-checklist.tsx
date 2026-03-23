"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { HOTMART_URL } from "@/lib/config"

const symptoms = [
  "Acordo com dor nas costas todo dia",
  "Sinto formigamento ou dormência na perna",
  "Já tentei tratamento, mas a dor voltou",
  "Tenho medo de piorar fazendo exercício",
  "Não consigo agachar, sentar ou dormir bem",
  "Estou cansado de depender de remédio",
]

export function SymptomChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const count = checked.size

  return (
    <div>
      <ul className="space-y-3">
        {symptoms.map((s, i) => {
          const active = checked.has(i)
          return (
            <li
              key={s}
              onClick={() => toggle(i)}
              className={`flex items-center gap-3 rounded-xl p-4 cursor-pointer select-none transition-all duration-150 ${
                active
                  ? "bg-red-500/15 border border-red-500/35"
                  : "bg-white/[0.035] border border-white/[0.07] hover:bg-white/[0.055]"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                  active ? "bg-red-500 border-red-500" : "border-white/30"
                }`}
              >
                {active && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 10">
                    <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm sm:text-base leading-snug transition-colors ${
                  active ? "text-white font-medium" : "text-white/65"
                }`}
              >
                {s}
              </span>
            </li>
          )
        })}
      </ul>

      {count >= 2 && (
        <div
          className="mt-6 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            background: "rgba(245,200,66,0.08)",
            border: "1px solid rgba(245,200,66,0.30)",
          }}
        >
          <p className="font-bold text-white text-lg">
            Você marcou {count} sintoma{count > 1 ? "s" : ""} — este guia foi feito para você.
          </p>
          <p className="mt-1.5 text-sm text-white/55">
            Em vez de continuar sofrendo, você pode começar a melhorar hoje mesmo.
          </p>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-bold text-[#0c0c0f] bg-[#f5c842] hover:bg-[#f0bb22] transition-all hover:scale-105 shadow-[0_6px_24px_rgba(245,200,66,0.45)]"
          >
            Comece a resolver isso agora
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
}
