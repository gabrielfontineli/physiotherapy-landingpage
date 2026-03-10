import type { Metadata } from "next"
import Image from "next/image"
import { CheckCircle, AlertTriangle, Star, ArrowRight, Shield, Zap, BookOpen, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Destrave sua Hérnia de Disco e Ciático — Guia do Dr. Guilherme Carvalho",
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

function BuyButton({ label = "Quero o Guia Agora", large = true }: { label?: string; large?: boolean }) {
  return (
    <a
      href={HOTMART_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-2xl font-bold text-[#0c0c0f] bg-[#f5c842] hover:bg-[#f0bb22] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-[0_8px_30px_rgba(245,200,66,0.40)] ${large ? "px-8 py-4 text-lg sm:text-xl" : "px-6 py-3 text-base"}`}
    >
      <BookOpen className="h-5 w-5 shrink-0" />
      {label}
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

export default function GuiaPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0c0c0f", color: "#fff", fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* ── TOP BAR ── */}
      <div className="w-full py-2.5 text-center text-sm font-semibold" style={{ background: "#f5c842", color: "#0c0c0f" }}>
        🔥 Oferta de lançamento · Acesso imediato após pagamento
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT — copy */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-medium" style={{ borderColor: "rgba(245,200,66,0.4)", color: "#f5c842", background: "rgba(245,200,66,0.08)" }}>
                <Zap className="h-3.5 w-3.5" />
                Guia Digital — Fisioterapeuta Especialista
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance" style={{ fontFamily: "var(--font-playfair, serif)" }}>
                Destrave sua{" "}
                <span style={{ color: "#f5c842" }}>Hérnia de Disco</span>{" "}
                e Ciático
              </h1>

              <p className="mt-5 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.65)" }}>
                O protocolo criado por fisioterapeuta especialista para você aliviar a dor, retomar sua vida e parar de depender só de remédio — tudo em casa.
              </p>

              {/* Social proof strip */}
              <div className="mt-7 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-[#f5c842] text-[#f5c842]" />)}
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                  +50 avaliações 5 estrelas no Google
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <BuyButton />
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Compra segura via Hotmart</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Acesso imediato</span>
              </div>
            </div>

            {/* RIGHT — product image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-72 sm:w-96" style={{ filter: "drop-shadow(0 40px 60px rgba(99,102,241,0.35))" }}>
                <Image
                  src="/images/hero-guide.png"
                  alt="Guia Prático — Destrave sua Hérnia de Disco e Ciático"
                  width={520}
                  height={520}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center animate-bounce">
          <ChevronDown className="h-6 w-6" style={{ color: "rgba(255,255,255,0.2)" }} />
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="py-16 sm:py-20" style={{ background: "#111116" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-semibold" style={{ borderColor: "rgba(239,68,68,0.35)", color: "#f87171", background: "rgba(239,68,68,0.08)" }}>
            <AlertTriangle className="h-4 w-4" />
            Isso é para você se…
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-balance" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            A dor está controlando a sua vida
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Marque os que se aplicam a você:</p>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {pains.map((pain) => (
              <li key={pain} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(239,68,68,0.2)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#f87171" }} />
                </span>
                <span className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.75)" }}>{pain}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl p-6 sm:p-8" style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.25)" }}>
            <p className="text-base sm:text-lg font-semibold">
              Se você marcou 2 ou mais — este guia foi feito para você.
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Em vez de depender de consultas e esperar semanas, você vai ter um protocolo nas mãos para agir agora.
            </p>
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0c0c0f" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>Conteúdo</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-balance" style={{ fontFamily: "var(--font-playfair, serif)" }}>
              O que tem dentro do guia
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              5 módulos diretos ao ponto, criados por quem trata hérnia de disco todo dia
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className="flex gap-4 sm:gap-6 rounded-2xl p-5 sm:p-6 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold" style={{ background: "rgba(245,200,66,0.12)", color: "#f5c842", border: "1px solid rgba(245,200,66,0.2)" }}>
                  {mod.number}
                </div>
                <div>
                  <h3 className="font-bold">{mod.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="py-16 sm:py-20" style={{ background: "#111116" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>Para quem é</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-balance" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Este guia é ideal se você…
          </h2>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {forWho.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#f5c842" }} />
                <span className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0c0c0f" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start rounded-3xl p-7 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="relative h-28 w-28 shrink-0 rounded-full overflow-hidden" style={{ border: "2px solid rgba(245,200,66,0.4)" }}>
              <Image
                src="/images/dr-guilherme-about-new.png"
                alt="Dr. Guilherme Carvalho"
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>Quem escreveu</span>
              <h3 className="mt-1.5 font-serif text-2xl font-bold" style={{ fontFamily: "var(--font-playfair, serif)" }}>Dr. Guilherme Carvalho</h3>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Fisioterapeuta · CREFITO 1 318268-F</p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes no Brasil todo.
              </p>
              <div className="mt-4 flex items-center gap-1.5 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f5c842] text-[#f5c842]" />)}
                <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>+50 avaliações 5 estrelas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE ── */}
      <section className="py-16 sm:py-24" style={{ background: "#111116" }}>
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-semibold" style={{ borderColor: "rgba(245,200,66,0.4)", color: "#f5c842", background: "rgba(245,200,66,0.08)" }}>
            <Zap className="h-3.5 w-3.5" />
            Oferta de lançamento
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Comece hoje a cuidar da sua coluna
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Acesso imediato ao guia completo. Sem precisar sair de casa.
          </p>

          <div className="mt-8 rounded-3xl p-8 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Guia Digital · Acesso Vitalício</p>

            <div className="mt-5">
              <div className="font-serif text-5xl sm:text-6xl font-bold" style={{ fontFamily: "var(--font-playfair, serif)", color: "#f5c842" }}>
                2x de R$&nbsp;9,95
              </div>
              <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
                ou <strong style={{ color: "#fff" }}>R$ 19,90</strong> à vista
              </p>
            </div>

            <div className="mt-8">
              <BuyButton label="Garantir meu acesso agora" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Processado com segurança pela Hotmart · Sem mensalidade
            </p>

            <div className="mt-8 pt-6 grid grid-cols-3 gap-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <Shield className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Pagamento seguro</p>
              </div>
              <div>
                <Zap className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Acesso imediato</p>
              </div>
              <div>
                <BookOpen className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Formato digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20" style={{ background: "#0c0c0f" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl p-5 sm:p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="font-semibold text-sm sm:text-base">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 sm:py-24 text-center" style={{ background: "#111116" }}>
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-balance" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Chega de esperar a dor passar sozinha
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Você já sofreu o suficiente. O guia está pronto para você agir agora.
          </p>
          <div className="mt-8">
            <BuyButton label="Quero o Guia Agora" />
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Prefere tirar dúvidas antes?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#f5c842" }} className="hover:underline">
              Fale com o Dr. Guilherme pelo WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
        © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos os direitos reservados.
      </footer>
    </div>
  )
}
