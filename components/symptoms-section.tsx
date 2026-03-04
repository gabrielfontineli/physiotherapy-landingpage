"use client"

import { AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

const symptoms = [
  "Dor que desce para a perna",
  "Dormência ou formigamento",
  "Dificuldade de levantar da cama",
  "Dor ao ficar em pé por muito tempo",
  "Já tomou remédio e não resolveu",
  "Travamento nas costas",
]

export function SymptomsSection() {
  return (
    <section id="sintomas" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Atenção
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Você sente algum desses sintomas?
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {symptoms.map((symptom) => (
            <div
              key={symptom}
              className="group flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground">{symptom}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-6 sm:p-8 md:p-12 text-center">
          <p className="text-sm sm:text-base md:text-lg font-medium text-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
            Isso pode ser um sinal de <strong className="text-primary">compressão nervosa</strong> causada por hérnia de disco ou disfunção articular — e pode piorar se você não tratar.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Descubra como tratar sua dor
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
