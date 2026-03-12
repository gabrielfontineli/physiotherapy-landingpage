import type { Metadata } from "next"
import Image from "next/image"
import {
  CheckCircle,
  AlertTriangle,
  Star,
  Shield,
  Zap,
  Award,
  BookOpen,
  ChevronDown,
  Users,
  Clock,
  Smartphone,
} from "lucide-react"
import { BuyButton } from "@/components/guia/buy-button"
import { StickyCta } from "@/components/guia/sticky-cta"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WHATSAPP_GUIDE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Destrave sua Hérnia de Disco e Ciático — Guia do Dr. Guilherme Carvalho",
  description:
    "Aprenda a aliviar a dor no nervo ciático e descomprimir a hérnia de disco com exercícios seguros em casa. Guia criado por fisioterapeuta especialista.",
}

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
    description:
      "O que é hérnia de disco, por que o nervo ciático dói e o que acontece no seu corpo. Quando você entende, para de ter medo.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Posições de alívio imediato",
    description:
      "Posturas e movimentos que descomprimem o nervo em minutos. Para usar quando a crise bate forte.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Protocolo de exercícios",
    description:
      "Sequência de exercícios terapêuticos seguros e progressivos para fortalecer sem agravar a hérnia.",
    icon: Award,
  },
  {
    number: "04",
    title: "O que evitar",
    description:
      "Movimentos, posturas e hábitos que pioram a hérnia — e como substituí-los no dia a dia.",
    icon: Shield,
  },
  {
    number: "05",
    title: "Rotina sustentável",
    description:
      "Como montar uma rotina de 10 a 15 minutos por dia para manter a coluna saudável a longo prazo.",
    icon: Clock,
  },
]

const forWho = [
  "Tem diagnóstico de hérnia de disco (L4-L5, L5-S1 ou cervical)",
  "Sofre com dor no nervo ciático (dor que desce pela perna)",
  "Quer fazer exercícios mas tem medo de piorar",
  "Não pode ou não quer depender de sessões presenciais",
  "Busca autonomia para cuidar da própria coluna",
]

const trustStats = [
  { value: "+50", label: "Avaliações 5 estrelas", sub: "no Google" },
  { value: "5+", label: "Anos de experiência", sub: "em dor crônica" },
  { value: "3", label: "Pós-graduações", sub: "especializações" },
  { value: "500+", label: "Pacientes atendidos", sub: "presencial e online" },
]

const faqs = [
  {
    q: "Os exercícios podem piorar minha hérnia?",
    a: "Não. O guia foi estruturado para respeitar a fase da dor. Primeiro você aprende posições de alívio e descompressão da coluna, que ajudam a reduzir a irritação do nervo. Depois, conforme a dor melhora, entram exercícios progressivos e mobilizações seguras. O objetivo é evitar movimentos que possam piorar a crise e ensinar o que realmente ajuda.",
  },
  {
    q: "Funciona para hérnia L4-L5 ou L5-S1?",
    a: "Sim. O guia foi pensado principalmente para quem tem hérnia lombar nas regiões L4-L5 e L5-S1, que são as mais comuns e frequentemente causam dor no nervo ciático. As estratégias explicadas ajudam a reduzir a pressão na coluna e diminuir a irritação do nervo.",
  },
  {
    q: "Em quanto tempo posso sentir melhora?",
    a: "Algumas pessoas relatam alívio já nas primeiras aplicações das posições de descompressão. Mas cada caso é diferente. O principal objetivo do guia é ensinar o que fazer para sair do ciclo de crises, entender melhor a dor e aplicar estratégias seguras no dia a dia.",
  },
  {
    q: "Vou conseguir entender os exercícios?",
    a: "Sim. O guia foi feito para ser simples e direto. Você terá explicações claras + vídeos demonstrativos, mostrando exatamente como fazer cada posição e exercício. Mesmo quem nunca fez fisioterapia consegue acompanhar.",
  },
  {
    q: "Preciso ter diagnóstico médico?",
    a: "Não necessariamente. O guia foi criado para pessoas que já sabem ou suspeitam que têm hérnia de disco ou dor no ciático. Mas se você ainda não tem diagnóstico e tem dúvidas sobre sua condição, o ideal é procurar um profissional de saúde para avaliação.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Você tem 7 dias de garantia. Se achar que o guia não é para você, basta solicitar o reembolso dentro desse prazo. Sem burocracia.",
  },
]

export default function GuiaPage() {
  return (
    <div
      className="min-h-screen bg-[#0c0c0f] text-white font-sans"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      {/* ── TOP BAR ── */}
      <div className="w-full py-2.5 text-center text-sm font-semibold bg-[#f5c842] text-[#0c0c0f]">
        🔥 Oferta de lançamento · R$&nbsp;19,90 · Acesso imediato após pagamento
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Gold radial glow — consistent with brand identity */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(245,200,66,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT — copy */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-medium"
                style={{
                  borderColor: "rgba(245,200,66,0.4)",
                  color: "#f5c842",
                  background: "rgba(245,200,66,0.08)",
                }}
              >
                <Zap className="h-3.5 w-3.5" />
                Guia Digital — Fisioterapeuta Especialista
              </div>

              <h1
                className="font-serif font-bold leading-[1.0] text-balance"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                <span className="block text-xl sm:text-2xl font-semibold text-white/55">
                  Chega de sofrer com
                </span>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl text-white mt-1"
                >
                  Hérnia de Disco
                </span>
                <span
                  className="block text-2xl sm:text-3xl mt-2 italic"
                  style={{ color: "#f5c842" }}
                >
                  e nervo ciático
                </span>
              </h1>

              <p
                className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                O protocolo criado por fisioterapeuta especialista para você aliviar a dor,
                retomar sua vida e parar de depender só de remédio —{" "}
                <span className="text-white/85 font-medium">tudo em casa.</span>
              </p>

              {/* Social proof strip */}
              <div className="mt-7 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#f5c842] text-[#f5c842]" />
                  ))}
                </div>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem" }}>
                  +50 avaliações 5 estrelas no Google
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <BuyButton />
              </div>

              <div
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> Compra segura via Hotmart
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" /> Acesso imediato
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5" /> Funciona no celular
                </span>
              </div>
            </div>

            {/* RIGHT — product image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div
                className="relative w-64 sm:w-80 lg:w-96"
                style={{ filter: "drop-shadow(0 40px 80px rgba(245,200,66,0.22))" }}
              >
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
          <ChevronDown className="h-6 w-6" style={{ color: "rgba(255,255,255,0.15)" }} />
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-semibold"
            style={{
              borderColor: "rgba(239,68,68,0.35)",
              color: "#f87171",
              background: "rgba(239,68,68,0.08)",
            }}
          >
            <AlertTriangle className="h-4 w-4" />
            Reconhece alguma dessas situações?
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl font-bold text-balance"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            A dor está controlando a sua vida
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
            Marque mentalmente os que se aplicam a você:
          </p>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {pains.map((pain) => (
              <li
                key={pain}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(239,68,68,0.18)" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#f87171" }}
                  />
                </span>
                <span className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {pain}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-10 rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(245,200,66,0.07)",
              border: "1px solid rgba(245,200,66,0.22)",
            }}
          >
            <p className="text-base sm:text-lg font-semibold">
              Se você se identificou com 2 ou mais — este guia foi feito para você.
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Em vez de depender de consultas e esperar semanas, você vai ter um protocolo
              nas mãos para agir agora.
            </p>
            <div className="mt-6">
              <BuyButton label="Quero resolver isso agora" large={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="py-16 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#f5c842" }}
            >
              Conteúdo
            </span>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              O que tem dentro do guia
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              5 módulos diretos ao ponto, criados por quem trata hérnia de disco todo dia
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => {
              const Icon = mod.icon
              return (
                <div
                  key={mod.number}
                  className="flex gap-4 sm:gap-6 rounded-2xl p-5 sm:p-6 transition-colors hover:bg-white/[0.03]"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.065)",
                  }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      background: "rgba(245,200,66,0.10)",
                      color: "#f5c842",
                      border: "1px solid rgba(245,200,66,0.18)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: "rgba(245,200,66,0.55)" }}
                      >
                        {mod.number}
                      </span>
                      <h3 className="font-bold text-white">{mod.title}</h3>
                    </div>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.50)" }}
                    >
                      {mod.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST / SOCIAL PROOF ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "#f5c842" }}
            >
              Por que confiar
            </span>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Método validado por pacientes reais
            </h2>
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#f5c842] text-[#f5c842]" />
                ))}
              </div>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem" }}>
                +50 avaliações 5 estrelas no Google
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="font-serif text-3xl sm:text-4xl font-bold"
                  style={{ color: "#f5c842", fontFamily: "var(--font-playfair, serif)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{
              background: "rgba(245,200,66,0.05)",
              border: "1px solid rgba(245,200,66,0.18)",
            }}
          >
            <Users
              className="h-10 w-10 shrink-0"
              style={{ color: "#f5c842" }}
            />
            <div>
              <p className="font-semibold text-white">
                O mesmo protocolo aplicado no consultório, agora no seu celular
              </p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Dr. Guilherme atende presencialmente em Natal e online para todo o Brasil.
                Os exercícios do guia são os mesmos prescritos nas consultas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section className="py-16 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "#f5c842" }}
          >
            Para quem é
          </span>
          <h2
            className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-balance"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Este guia é ideal se você…
          </h2>

          <ul className="mt-8 space-y-3 text-left max-w-xl mx-auto">
            {forWho.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 shrink-0 mt-0.5"
                  style={{ color: "#f5c842" }}
                />
                <span
                  className="text-sm sm:text-base"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div
            className="flex flex-col sm:flex-row gap-8 items-center sm:items-start rounded-3xl p-7 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.075)",
            }}
          >
            <div
              className="relative h-28 w-28 shrink-0 rounded-full overflow-hidden"
              style={{ border: "2px solid rgba(245,200,66,0.4)" }}
            >
              <Image
                src="/images/dr-guilherme-about-new.png"
                alt="Dr. Guilherme Carvalho"
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#f5c842" }}
              >
                Quem escreveu
              </span>
              <h3
                className="mt-1.5 font-serif text-2xl font-bold"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                Dr. Guilherme Carvalho
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                Fisioterapeuta · CREFITO 1 318268-F
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em
                Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no
                consultório em Natal e online para pacientes em todo o Brasil.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                {["Osteopatia", "Quiropraxia", "Acupuntura"].map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      background: "rgba(245,200,66,0.10)",
                      color: "#f5c842",
                      border: "1px solid rgba(245,200,66,0.18)",
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f5c842] text-[#f5c842]" />
                ))}
                <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  +50 avaliações 5 estrelas
                </span>
              </div>
            </div>
          </div>
        </div>


      {/* ── FINAL CTA ── */}
      <div className="py-16 sm:py-24 text-center">
        <div
          className="relative mx-auto max-w-xl px-4 sm:px-6 overflow-hidden"
        >
          {/* Subtle gold glow behind CTA */}
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-10 h-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(245,200,66,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <Award className="mx-auto h-10 w-10 mb-6" style={{ color: "#f5c842" }} />
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Chega de esperar a dor passar sozinha
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm mx-auto"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Você já sofreu o suficiente. O guia está pronto para você agir agora.
              Com garantia de 7 dias, não há risco.
            </p>
            <div className="mt-8">
              <BuyButton label="Quero o Guia Agora" />
            </div>
            <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
              Prefere tirar dúvidas antes?{" "}
              <a
                href={WHATSAPP_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#f5c842" }}
                className="hover:underline"
              >
                Fale com o Dr. Guilherme pelo WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>        
      </section>

      {/* ── GUARANTEE + PRICE ── */}
      <section className="py-16 sm:py-24 bg-[#0c0c0f]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          {/* Guarantee */}
          <div
            className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-5 text-left"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(245,200,66,0.10)",
                border: "2px solid rgba(245,200,66,0.25)",
              }}
            >
              <Shield className="h-8 w-8" style={{ color: "#f5c842" }} />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-white text-base">Garantia incondicional de 7 dias</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Se por qualquer motivo não ficar satisfeito, solicite o reembolso integral
                pela Hotmart — sem perguntas, sem burocracia.
              </p>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-sm font-semibold"
            style={{
              borderColor: "rgba(245,200,66,0.4)",
              color: "#f5c842",
              background: "rgba(245,200,66,0.08)",
            }}
          >
            <Zap className="h-3.5 w-3.5" />
            Oferta de lançamento
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Comece hoje a cuidar da sua coluna
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
            Acesso imediato ao guia completo. Sem precisar sair de casa.
          </p>

          <div
            className="mt-8 rounded-3xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.075)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
              Guia Digital · Acesso Vitalício
            </p>

            <div className="mt-5">
              <p className="text-sm line-through" style={{ color: "rgba(255,255,255,0.25)" }}>
                De R$&nbsp;47,00
              </p>
              <div
                className="font-serif text-5xl sm:text-6xl font-bold"
                style={{
                  fontFamily: "var(--font-playfair, serif)",
                  color: "#f5c842",
                }}
              >
                2x de R$&nbsp;9,95
              </div>
              <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
                ou{" "}
                <strong style={{ color: "#fff" }}>R$&nbsp;19,90</strong> à vista
              </p>
            </div>

            <div className="mt-8">
              <BuyButton label="Garantir meu acesso agora" />
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.20)" }}>
              Processado com segurança pela Hotmart · Sem mensalidade
            </p>

            <div
              className="mt-8 pt-6 grid grid-cols-3 gap-4 text-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <Shield className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Pagamento seguro
                </p>
              </div>
              <div>
                <Zap className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Acesso imediato
                </p>
              </div>
              <div>
                <BookOpen className="h-5 w-5 mx-auto mb-1.5" style={{ color: "#f5c842" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Formato digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Perguntas frequentes
          </h2>
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden border-0"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.065)",
                }}
              >
                <AccordionTrigger
                  className="px-5 sm:px-6 py-4 text-sm sm:text-base font-semibold text-white hover:no-underline hover:text-[#f5c842] transition-colors"
                  style={{ borderBottom: "none" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 sm:px-6 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── POST-FAQ CTA ── */}
      <section className="py-16 bg-[#0c0c0f] border-t border-white/5">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Ainda com dor?
          </h2>
          <p className="text-base sm:text-lg mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            Comece hoje a entender como aliviar a sua hérnia de disco e o ciático.
          </p>
          
          <div 
            className="mb-8 p-6 rounded-2xl"
            style={{ background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.2)" }}
          >
            <p className="text-xl font-bold text-[#f5c842] mb-2">
              Acesso imediato ao guia completo por R$19,90.
            </p>
            <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              Você ainda conta com garantia de 7 dias. Se não achar que o guia é para você, pode solicitar o reembolso sem burocracia.
            </p>
          </div>

          <BuyButton label="QUERO ACESSAR O GUIA" />
        </div>
      </section>  

      {/* ── FOOTER ── */}
      <footer
        className="py-6 text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.055)",
          color: "rgba(255,255,255,0.18)",
          fontSize: "0.75rem",
        }}
      >
        © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos
        os direitos reservados.
      </footer>

      {/* ── STICKY CTA ── */}
      <StickyCta />
    </div>
  )
}
