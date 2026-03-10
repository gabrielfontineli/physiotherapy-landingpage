import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5584981910924?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

const specializations = [
  { name: "Osteopatia", icon: "🦴" },
  { name: "Quiropraxia", icon: "🔧" },
  { name: "Acupuntura", icon: "📍" },
  { name: "Dry Needling", icon: "💉" },
]

const stats = [
  { value: "5+", label: "Anos de experiência" },
  { value: "3", label: "Pós-graduações" },
  { value: "500+", label: "Pacientes tratados" },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative pb-6 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[3/4] max-w-xs sm:max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/dr-guilherme-about-new.png"
                alt="Dr. Guilherme Carvalho, Fisioterapeuta"
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 448px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-8 lg:right-auto lg:-left-4 rounded-xl bg-[oklch(0.28_0.06_240)] p-3 sm:p-5 shadow-xl">
              <p className="text-lg sm:text-2xl font-bold text-white">CREFITO 1</p>
              <p className="text-xs sm:text-sm text-white/80">318268-F</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Sobre Mim
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
              Dr. Guilherme Carvalho
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Fisioterapeuta Clínico · Natal, RN
            </p>

            <p className="mt-6 text-base leading-relaxed text-foreground/80 text-pretty">
              Com mais de cinco anos de experiência e dezenas de aprimoramentos em dor crônica, além de pós-graduações em Osteopatia, Quiropraxia e Acupuntura. Atendo presencialmente em Natal e online para todo o Brasil.
            </p>

            <blockquote className="mt-6 border-l-4 border-accent pl-5 py-2">
              <p className="text-base leading-relaxed text-foreground/80 italic text-pretty">
                &ldquo;Meu objetivo é transformar a vida dos meus pacientes, tornando-os mais saudáveis e confiantes. Quero que você compreenda como agir diante de dores nas costas, oferecendo tratamentos eficazes que evitam o uso de medicações e cirurgias desnecessárias.&rdquo;
              </p>
            </blockquote>

            <div className="mt-8 grid grid-cols-4 gap-3">
              {specializations.map((spec) => (
                <div
                  key={spec.name}
                  className="flex flex-col items-center justify-center rounded-xl bg-primary/5 border border-primary/10 p-3 text-center"
                >
                  <span className="text-xl">{spec.icon}</span>
                  <span className="mt-1 text-[10px] sm:text-xs font-medium text-foreground">{spec.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`${index > 0 ? "border-l border-border pl-6 sm:pl-8" : ""}`}>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="mt-8 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Quer me conhecer melhor?
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
