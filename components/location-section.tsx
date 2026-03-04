import { MapPin, Clock, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5584999999999?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."

export function LocationSection() {
  return (
    <section id="localizacao" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Localização
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Onde fica localizado?
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl overflow-hidden border border-border h-64 sm:h-80 lg:h-auto order-2 lg:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.023!2d-35.209!3d-5.786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDcnMTAuMCJTIDM1wrAxMic0MC4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do consultório"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-background p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Endereço</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Bairro Cidade Alta, Rua João Pessoa, 198.
                  <br />
                  Edifício Canaçu, Sala 406.
                  <br />
                  Centro de Natal, Rio Grande do Norte
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  (vizinho à Caixa Econômica Federal)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-background p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Atendimento</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Atendimento com hora marcada.
                  <br />
                  Agende sua avaliação pelo WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-accent/40 bg-accent/5 p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Importante</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Não recebemos plano de saúde. Atendimento particular com foco total no seu tratamento.
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Agendar Avaliação
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
