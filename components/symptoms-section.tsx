"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const symptomGroups = [
  {
    area: "Dor nas costas",
    symptoms: [
      "Dor na parte baixa das costas",
      "Dor no pescoço",
      "Sente as costas travadas ou rígidas",
    ],
  },
  {
    area: "Dor que irradia",
    symptoms: [
      "Dor que desce pela perna até o pé",
      "Formigamento ou dormência no braço ou perna",
      "Sensação de fraqueza nas pernas ou braços",
    ],
  },
  {
    area: "No dia a dia",
    symptoms: [
      "Dificuldade para levantar da cama",
      "Dói ao ficar sentado ou em pé por muito tempo",
      "Já tentou tratamento e não melhorou",
    ],
  },
]

export function SymptomsSection() {
  return (
    <section id="sintomas" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Identificação
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Você sente algum desses sintomas?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Se identificou? Esses podem ser sinais de um problema que precisa de atenção.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {symptomGroups.map((group) => (
            <div key={group.area} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                {group.area}
              </h3>
              <ul className="space-y-3">
                {group.symptoms.map((symptom) => (
                  <li
                    key={symptom}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 rounded-2xl bg-primary/5 border border-primary/20 p-6 sm:p-8 md:p-10 text-center">
          <p className="text-sm sm:text-base md:text-lg font-medium text-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
            Isso pode ser um sinal de <strong className="text-primary">compressão nervosa</strong> causada por hérnia de disco ou disfunção articular — e pode piorar se você não tratar.
          </p>
          <Button
            asChild
            variant="ghost"
            className="mt-6 text-primary hover:text-primary hover:bg-primary/10 font-semibold"
          >
            <a href="#servicos">
              Isso soa familiar? Veja como tratar
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
