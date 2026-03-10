import type { Metadata } from "next"
import { CheckCircle, AlertTriangle, BookOpen, Zap, Shield, Star, ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Guia Prático — Destrave sua Hérnia de Disco e Ciático | Dr. Guilherme Carvalho",
  description: "Aprenda a aliviar a dor no nervo ciático e descomprimir a hérnia de disco com exercícios seguros em casa. Guia criado por fisioterapeuta especialista.",
}

const HOTMART_URL = "https://pay.hotmart.com/D104423178L"
const WHATSAPP_URL = "https://wa.me/5584981910924?text=Ol%C3%A1%2C%20Dr.%20Guilherme!%20Tenho%20d%C3%BAvidas%20sobre%20o%20guia."

const pains = [
  "Acorda com dor nas costas todos os dias",
  "Sente formigamento ou dormência que desce pela perna",
  "Já tentou tratamento, mas a dor voltou",
  "Tem medo de piorar fazendo exercício errado",
  "Não consegue agachar, sentar ou dormir confortável",
  "Está cansado de depender só de remédio para aguentar o dia",
]

const modules = [
  {
    number: "01",
    title: "Entenda sua dor",
    description: "O que é hérnia de disco, por que o nervo ciático dói e o que acontece no seu corpo. Quando você entende, para de ter medo.",
  },
  {
    number: "02",
    title: "Posições de alívio imediato",
    description: "Posturas e movimentos que descomprimem o nervo em minutos. Para usar quando a crise bate forte.",
  },
  {
    number: "03",
    title: "Protocolo de exercícios",
    description: "Sequência de exercícios terapêuticos seguros e progressivos para fortalecer sem agravar a hérnia.",
  },
  {
    number: "04",
    title: "O que evitar",
    description: "Movimentos, posturas e hábitos que pioram a hérnia — e como substituí-los no dia a dia.",
  },
  {
    number: "05",
    title: "Rotina sustentável",
    description: "Como montar uma rotina de 10 a 15 minutos por dia para manter a coluna saudável a longo prazo.",
  },
]

const forWho = [
  "Tem diagnóstico de hérnia de disco (L4-L5, L5-S1 ou cervical)",
  "Sofre com dor no nervo ciático (dor que desce pela perna)",
  "Quer fazer exercícios mas tem medo de piorar",
  "Não pode ou não quer depender de sessões presenciais",
  "Busca autonomia para cuidar da própria coluna",
]

const faqs = [
  {
    q: "Preciso ter laudo médico para usar o guia?",
    a: "Não. O guia foi criado para quem já sabe que tem hérnia ou suspeita. Se você ainda não tem diagnóstico, recomendo consultar um profissional antes.",
  },
  {
    q: "Os exercícios são seguros para qualquer fase da hérnia?",
    a: "O guia inclui orientações sobre quando iniciar cada exercício. Em casos de dor muito aguda, recomendo iniciar pelas posições de alívio e avançar gradualmente.",
  },
  {
    q: "Quanto tempo leva para sentir resultado?",
    a: "A maioria dos pacientes relata alívio nas primeiras semanas de prática consistente. O guia não é solução milagrosa — é um método comprovado que exige disciplina.",
  },
  {
    q: "É formato PDF ou vídeo?",
    a: "O guia é em formato digital (PDF + vídeos demonstrativos dos exercícios), acessível pelo celular ou computador.",
  },
]

function CtaButton({ label = "Quero o Guia Agora", size = "lg" }: { label?: string; size?: "sm" | "lg" }) {
  return (
    <a
      href={HOTMART_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-accent font-bold text-accent-foreground transition-all hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] shadow-lg shadow-accent/30 ${
        size === "lg"
          ? "px-8 py-4 text-lg sm:text-xl"
          : "px-6 py-3 text-base"
      }`}
    >
      <BookOpen className="h-5 w-5 shrink-0" />
      {label}
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  )
}

export default function GuiaPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[oklch(0.10_0.04_240)] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.20_0.08_240/0.6),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-2 mb-6">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Guia Digital — Acesso Imediato</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-white text-balance">
                Destrave sua{" "}
                <span className="text-accent">Hérnia de Disco</span>{" "}
                e Ciático
              </h1>

              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed text-pretty max-w-xl mx-auto lg:mx-0">
                O guia prático do Dr. Guilherme Carvalho para aliviar a dor no nervo ciático e descomprimir a hérnia — com exercícios seguros em casa, sem precisar de aparelhos ou sessões presenciais.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <CtaButton />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-accent/70" />
                  Compra segura via Hotmart
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-accent/70" />
                  Acesso imediato após pagamento
                </span>
              </div>
            </div>

            {/* Book mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Book spine shadow */}
                <div className="absolute -left-3 top-3 bottom-3 w-6 rounded-l-sm bg-[oklch(0.12_0.05_240)] shadow-2xl" />
                {/* Book cover */}
                <div className="relative w-56 sm:w-72 aspect-[3/4] rounded-r-xl rounded-tl-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.12_240)] via-[oklch(0.16_0.08_240)] to-[oklch(0.10_0.04_240)]" />
                  {/* Cover art using doctor photo */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/dr-guilherme-about-new.png"
                      alt="Dr. Guilherme Carvalho"
                      fill
                      className="object-cover object-top opacity-30 mix-blend-luminosity"
                    />
                  </div>
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div>
                      <div className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Guia Prático</div>
                      <h2 className="font-serif text-white text-xl sm:text-2xl font-bold leading-tight">
                        Destrave sua Hérnia de Disco e Ciático
                      </h2>
                    </div>
                    <div>
                      <div className="h-px bg-white/20 mb-4" />
                      <p className="text-white/60 text-xs">Dr. Guilherme Carvalho</p>
                      <p className="text-accent/80 text-xs mt-0.5">Fisioterapeuta · CREFITO 1 318268-F</p>
                    </div>
                  </div>
                  {/* Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex justify-center animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/30" />
        </div>
      </section>

      {/* ── PAIN SECTION ── */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-4 py-2 mb-6">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Isso é para você se…</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            A dor está controlando a sua vida
          </h2>
          <p className="mt-4 text-muted-foreground">Marque os que se aplicam a você:</p>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {pains.map((pain) => (
              <li key={pain} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                  <span className="h-2 w-2 rounded-full bg-destructive" />
                </span>
                <span className="text-sm sm:text-base text-foreground/80">{pain}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-accent/10 border border-accent/30 p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground text-balance">
              Se você marcou 2 ou mais — esse guia foi feito para você.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Em vez de depender de consultas e esperar semanas, você vai ter um protocolo nas mãos para agir agora.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Conteúdo</span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
              O que tem dentro do guia
            </h2>
            <p className="mt-3 text-muted-foreground">
              5 módulos diretos ao ponto, criados por quem trata hérnia de disco todo dia
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, i) => (
              <div
                key={mod.number}
                className="flex gap-4 sm:gap-6 rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <span className="text-sm font-bold text-primary">{mod.number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{mod.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Para quem é</span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Este guia é ideal se você…
          </h2>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {forWho.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-sm sm:text-base text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-full overflow-hidden border-2 border-primary/30">
              <Image
                src="/images/dr-guilherme-about-new.png"
                alt="Dr. Guilherme Carvalho"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Quem escreveu</span>
              <h3 className="mt-1 font-serif text-xl font-bold text-foreground">Dr. Guilherme Carvalho</h3>
              <p className="text-sm text-muted-foreground">Fisioterapeuta · CREFITO 1 318268-F</p>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed text-pretty">
                Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes no Brasil todo.
              </p>
              <div className="mt-4 flex items-center gap-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">+50 avaliações 5 estrelas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE + CTA ── */}
      <section className="py-16 sm:py-24 bg-[oklch(0.10_0.04_240)]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Oferta de lançamento</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance">
            Comece hoje a cuidar da sua coluna
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Acesso imediato ao guia completo. Você não precisa esperar consulta nem sair de casa.
          </p>

          <div className="mt-8 rounded-3xl bg-card border border-white/10 p-8 sm:p-10">
            <p className="text-sm text-muted-foreground">Guia Digital — Acesso Imediato</p>
            <div className="mt-3 flex items-end justify-center gap-3">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-white">R$&nbsp;47</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Pagamento único · Sem mensalidade</p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <CtaButton label="Quero o Guia Agora" />
              <p className="text-xs text-white/40">Processado com segurança pela Hotmart</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <Shield className="h-6 w-6 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Pagamento seguro</p>
              </div>
              <div>
                <Zap className="h-6 w-6 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Acesso imediato</p>
              </div>
              <div>
                <BookOpen className="h-6 w-6 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Formato digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-background p-5 sm:p-6">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 sm:py-24 bg-background text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
            Chega de esperar a dor passar sozinha
          </h2>
          <p className="mt-4 text-muted-foreground">
            Você já sofreu o suficiente. O guia está pronto para você agir agora.
          </p>
          <div className="mt-8">
            <CtaButton label="Garantir meu acesso" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefere tirar dúvidas antes?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Fale com o Dr. Guilherme pelo WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-border bg-[oklch(0.12_0.03_240)] py-6 text-center">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
