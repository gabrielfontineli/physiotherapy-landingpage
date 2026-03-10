import { MapPin, Target, Zap, Award } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Mapa da Dor",
    description: "Criamos juntos um mapa completo da sua dor: onde dói, quando piora, o que alivia. Entendemos o padrão para atacar a causa, não só o sintoma.",
  },
  {
    number: "02",
    icon: Target,
    title: "Plano Personalizado",
    description: "Com base no seu Mapa da Dor, montamos um protocolo sob medida: técnicas específicas, frequência ideal e metas claras de recuperação.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Tratamento Ativo",
    description: "Exercícios terapêuticos, quiropraxia, osteopatia, dry needling, acupuntura — aplicamos as técnicas certas para o seu caso. Diversas especializações no tratamento da dor, sempre com você participando ativamente.",
  },
  {
    number: "04",
    icon: Award,
    title: "Alta com Autonomia",
    description: "Você sai sabendo como cuidar do seu corpo para evitar recaídas. O objetivo é você não depender de mim para sempre.",
  },
]

export function MethodSection() {
  return (
    <section id="metodo" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Meu Método
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Do Mapa da Dor à sua recuperação
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Um processo único que começa mapeando sua dor para tratá-la de verdade
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-border" />
                )}
                
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
