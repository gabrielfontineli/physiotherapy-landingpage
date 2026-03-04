import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[oklch(0.15_0.02_220/0.75)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:py-32 relative z-10 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 sm:px-4 py-1.5 mb-6 sm:mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-white/90 tracking-wide uppercase">
              Fisioterapia Especializada em Coluna
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-balance">
            Cuidado individualizado para sua{" "}
            <span className="text-accent">coluna</span> em Natal RN
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-white/80 text-pretty max-w-xl">
            Cada corpo reage de um jeito. O tratamento começa pela avaliação, não pelo nome da dor. O objetivo é devolver movimento e segurança ao corpo.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold px-8"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Agendar Avaliação
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 text-base"
            >
              <a href="#sobre">Saiba Mais</a>
            </Button>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-none">
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-white">5+</p>
              <p className="text-[10px] sm:text-sm text-white/60 leading-tight">Anos de experiência</p>
            </div>
            <div className="text-center sm:text-left border-l border-white/20 pl-4 sm:pl-8">
              <p className="text-xl sm:text-2xl font-bold text-white">4</p>
              <p className="text-[10px] sm:text-sm text-white/60 leading-tight">Especializações</p>
            </div>
            <div className="text-center sm:text-left border-l border-white/20 pl-4 sm:pl-8">
              <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
              <p className="text-[10px] sm:text-sm text-white/60 leading-tight">Atendimento individual</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
