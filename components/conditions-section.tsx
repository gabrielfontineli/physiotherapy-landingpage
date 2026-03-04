import { Activity } from "lucide-react"

const conditions = [
  { name: "Hérnia de Disco", description: "Tratamento conservador para aliviar a compressão nervosa e recuperar mobilidade." },
  { name: "Dor Lombar", description: "Abordagem personalizada para eliminar a dor e fortalecer a região lombar." },
  { name: "Escoliose", description: "Técnicas manuais e exercícios para correção postural e alívio dos sintomas." },
  { name: "Ciático Inflamado", description: "Tratamento focado na descompressão do nervo e eliminação da dor irradiada." },
  { name: "Dor Cervical", description: "Alívio das tensões cervicais com técnicas modernas e seguras." },
  { name: "Bico de Papagaio", description: "Manejo da dor e restauração funcional com terapia manual especializada." },
  { name: "Protusão Discal", description: "Tratamento preventivo para evitar progressão e reduzir sintomas." },
  { name: "Tendinites e Bursites", description: "Tratamento completo para dores articulares e inflamações." },
]

export function ConditionsSection() {
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Especialidades
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Posso te ajudar nos seguintes casos
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {conditions.map((condition) => (
            <div
              key={condition.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 mb-3 sm:mb-4 transition-colors group-hover:bg-primary/20">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base">{condition.name}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{condition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
