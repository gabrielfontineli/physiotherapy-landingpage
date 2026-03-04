import Image from "next/image"

const treatments = [
  {
    name: "Acupuntura",
    description: "Técnica milenar que utiliza agulhas finas para estimular pontos específicos do corpo, promovendo alívio da dor e restauração do equilíbrio corporal.",
    image: "/images/acupuntura.jpg",
  },
  {
    name: "Quiropraxia",
    description: "Ajuste articular preciso para restaurar a mobilidade da coluna, aliviar compressões nervosas e melhorar a postura.",
    image: "/images/quiropraxia.jpg",
  },
  {
    name: "Osteopatia",
    description: "Terapia manual que trata o corpo de forma global, identificando e corrigindo disfunções que causam dor e limitação.",
    image: "/images/osteopatia.jpg",
  },
  {
    name: "Recovery",
    description: "Protocolo de recuperação com eletrotermofototerapia e técnicas modernas para acelerar a regeneração tecidual e reduzir inflamações.",
    image: "/images/recovery.jpg",
  },
]

export function TreatmentsSection() {
  return (
    <section id="tratamentos" className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Serviços
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Tratamentos Oferecidos
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            Abordagens modernas e baseadas em evidências para devolver sua qualidade de vida.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {treatments.map((treatment) => (
            <div
              key={treatment.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
            >
              <div className="relative h-44 sm:h-56 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground">{treatment.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{treatment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
