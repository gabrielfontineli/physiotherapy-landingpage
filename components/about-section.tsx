import Image from "next/image"

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="relative pb-6">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[3/4] max-w-xs sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/doctor-portrait.jpg"
                alt="Dr. Guilherme Carvalho, Fisioterapeuta"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:-right-4 lg:right-auto lg:-left-4 rounded-xl bg-[oklch(0.35_0.10_190)] p-3 sm:p-5 shadow-xl">
              <p className="text-lg sm:text-2xl font-bold text-white">CREFITO 1</p>
              <p className="text-xs sm:text-sm text-white/80">318268-F</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Sobre Mim
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
              Dr. Guilherme Carvalho
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Fisioterapeuta Clínico
            </p>

            <p className="mt-6 text-base leading-relaxed text-foreground/80 text-pretty">
              Com mais de cinco anos de experiência e dezenas de aprimoramentos em dor crônica, além de pós-graduações em <strong className="text-foreground">Osteopatia</strong>, <strong className="text-foreground">Quiropraxia</strong> e <strong className="text-foreground">Acupuntura</strong>. Atendo atualmente em Natal, Rio Grande do Norte.
            </p>

            <blockquote className="mt-8 border-l-4 border-accent pl-6 py-2">
              <p className="text-base leading-relaxed text-foreground/80 italic text-pretty">
                {'"'}Meu objetivo é transformar a vida dos meus pacientes, tornando-os mais saudáveis e confiantes. Quero que você compreenda como agir diante de dores nas costas, oferecendo tratamentos eficazes que evitam o uso de medicações e cirurgias desnecessárias.{'"'}
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Osteopatia", "Quiropraxia", "Acupuntura", "Dor Crônica"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
