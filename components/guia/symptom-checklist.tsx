"use client"

import { useState, useRef } from "react"
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
  const leadFired = useRef(false)

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)

      if (next.size >= 2 && !leadFired.current) {
        leadFired.current = true
        const leadParams = {
          content_name: "Guia Hérnia de Disco — Checklist",
          content_category: "guia",
          value: 19.9,
          currency: "BRL",
        }
        window.fbq?.("track", "Lead", leadParams)
        window.ttq?.track("SubmitForm", leadParams)
      }

      return next
    })
  }

  const count = checked.size

  return (
    <>
      <style>{`
        @keyframes symptom-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(220,38,38,0); }
          50%       { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(220,38,38,0.12); }
        }
        @keyframes symptom-bounce {
          0%, 100% { transform: translateY(0); }
          40%       { transform: translateY(-4px); }
          60%       { transform: translateY(-2px); }
        }
        @keyframes cta-pop {
          0%   { transform: scale(0.92); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes glow-red {
          0%, 100% { box-shadow: 0 4px 20px rgba(220,38,38,0.35); }
          50%       { box-shadow: 0 6px 32px rgba(220,38,38,0.65); }
        }
        @keyframes btn-bounce {
          0%, 100% { transform: translateY(0)    scale(1); }
          30%       { transform: translateY(-6px) scale(1.03); }
          60%       { transform: translateY(-2px) scale(1.01); }
        }
        .symptom-idle {
          animation: symptom-pulse 2.4s ease-in-out infinite;
        }
        .symptom-idle:nth-child(2) { animation-delay: 0.4s; }
        .symptom-idle:nth-child(3) { animation-delay: 0.8s; }
        .symptom-idle:nth-child(4) { animation-delay: 1.2s; }
        .symptom-idle:nth-child(5) { animation-delay: 1.6s; }
        .symptom-idle:nth-child(6) { animation-delay: 2.0s; }
        .symptom-checked {
          animation: symptom-bounce 0.35s ease-out;
        }
        .cta-appear {
          animation: cta-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .cta-btn-bounce {
          animation: btn-bounce 1.4s ease-in-out infinite, glow-red 1.4s ease-in-out infinite;
        }
      `}</style>

      <ul className="space-y-3">
        {symptoms.map((s, i) => {
          const active = checked.has(i)
          return (
            <li
              key={s}
              onClick={() => toggle(i)}
              className={active ? "symptom-checked" : "symptom-idle"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                borderRadius: "0.875rem",
                padding: "1rem 1.125rem",
                cursor: "pointer",
                userSelect: "none",
                transition: "background 0.15s, border-color 0.15s",
                background: active ? "#fff1f2" : "#fff",
                border: active ? "2px solid #dc2626" : "2px solid #e2e8f0",
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  flexShrink: 0,
                  height: "1.375rem",
                  width: "1.375rem",
                  borderRadius: "0.375rem",
                  border: active ? "2px solid #dc2626" : "2px solid #cbd5e1",
                  background: active ? "#dc2626" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {active && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Texto */}
              <span
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  lineHeight: 1.4,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#991b1b" : "#1e293b",
                  transition: "color 0.15s, font-weight 0.15s",
                }}
              >
                {s}
              </span>

              {/* Indicador ativo */}
              {active && (
                <span
                  style={{
                    marginLeft: "auto",
                    flexShrink: 0,
                    fontSize: "1.1rem",
                  }}
                >
                  ✅
                </span>
              )}
            </li>
          )
        })}
      </ul>

      {count >= 2 && (
        <div
          className="cta-appear mt-6 rounded-2xl p-6 text-center"
          style={{ background: "#fff1f2", border: "2px solid #fca5a5" }}
        >
          <p className="font-black text-xl" style={{ color: "#7f1d1d" }}>
            Você marcou {count} sintoma{count > 1 ? "s" : ""}.
          </p>
          <p className="mt-1.5 text-base font-semibold" style={{ color: "#b91c1c" }}>
            Este guia foi feito exatamente para você.
          </p>
          <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
            Em vez de continuar sofrendo, você pode começar a melhorar hoje mesmo.
          </p>
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn-bounce mt-5 inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-black text-white transition-all"
            style={{
              background: "#dc2626",
              fontSize: "1.05rem",
            }}
          >
            QUERO ALIVIAR MINHA DOR AGORA
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  )
}
