"use client"

import { MapPin, Monitor, BookOpen, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

const services = [
  {
    id: "presencial",
    icon: MapPin,
    title: "Atendimento Presencial",
    subtitle: "Para pacientes em Natal/RN",
    color: "primary",
    bullets: [
      "Avaliação completa presencial",
      "Técnicas manuais avançadas",
      "Acompanhamento individualizado",
    ],
    cta: "Agendar pelo WhatsApp",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    id: "online",
    icon: Monitor,
    title: "Teleatendimento",
    subtitle: "Para qualquer cidade do Brasil",
    color: "accent",
    featured: true,
    bullets: [
      "Consulta por videochamada",
      "Avaliação e orientação personalizada",
      "Exercícios específicos para seu caso",
    ],
    cta: "Fazer pré-triagem",
    href: "#triagem",
    external: false,
  },
  {
    id: "ebook",
    icon: BookOpen,
    title: "E-book Hérnia de Disco",
    subtitle: "Para quem quer se informar",
    color: "green",
    bullets: [
      "Entenda sua condição",
      "Exercícios seguros em casa",
      "Evite cirurgias desnecessárias",
    ],
    cta: "Comprar E-book",
    href: "#ebook",
    external: false,
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Serviços
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Como posso te ajudar?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Escolha a melhor forma de atendimento para o seu caso
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => {
            const Icon = service.icon
            const colorClasses = {
              primary: "bg-primary/10 text-primary border-primary/20",
              accent: "bg-accent/10 text-accent border-accent/40",
              green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
            }
            const buttonClasses = {
              primary: "bg-primary text-primary-foreground hover:bg-primary/90",
              accent: "bg-accent text-accent-foreground hover:bg-accent/90",
              green: "bg-emerald-600 text-white hover:bg-emerald-700",
            }

            return (
              <div
                key={service.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-5 sm:p-6 transition-all hover:shadow-lg ${
                  service.featured 
                    ? "border-accent/40 ring-2 ring-accent/20" 
                    : "border-border"
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Mais procurado
                    </span>
                  </div>
                )}

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{service.subtitle}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-6 w-full font-semibold ${buttonClasses[service.color as keyof typeof buttonClasses]}`}
                >
                  <a
                    href={service.href}
                    target={service.external ? "_blank" : undefined}
                    rel={service.external ? "noopener noreferrer" : undefined}
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <strong>Teleatendimento:</strong> Responda 5 perguntas em 2 minutos e descubra se consigo te ajudar online.
        </p>
      </div>
    </section>
  )
}
