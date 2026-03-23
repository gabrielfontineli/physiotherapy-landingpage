import type { Metadata } from "next"
import Image from "next/image"
import {
  CheckCircle,
  Star,
  Shield,
  Zap,
  Award,
  BookOpen,
  Clock,
  Smartphone,
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  Pill,
  Activity,
  Brain,
  Users,
  Play,
  Layers,
  TrendingUp,
} from "lucide-react"
import { BuyButton } from "@/components/guia/buy-button"
import { StickyCta } from "@/components/guia/sticky-cta"
import { PixelViewContent } from "@/components/guia/pixel-events"
import { CountdownTimer } from "@/components/guia/countdown-timer"
import { SymptomChecklist } from "@/components/guia/symptom-checklist"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WHATSAPP_GUIDE_URL, HOTMART_URL } from "@/lib/config"
import {
  getTestimonials,
  getFaqs,
  getGuiaConfig,
  getPainPoints,
  getGuideModules,
  getTrustStats,
  getForWhoItems,
} from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Destrave sua Hérnia de Disco e Ciático — Guia do Dr. Guilherme Carvalho",
  description:
    "Aprenda a aliviar a dor no nervo ciático e descomprimir a hérnia de disco com exercícios seguros em casa. Guia criado por fisioterapeuta especialista.",
}

// ── STATIC FALLBACKS ───────────────────────────────────────────────────
const pains = [
  "Acordo com dor nas costas todo dia",
  "Sinto formigamento ou dormência na perna",
  "Já tentei tratamento, mas a dor voltou",
  "Tenho medo de piorar fazendo exercício",
  "Não consigo agachar, sentar ou dormir bem",
  "Estou cansado de depender de remédio",
]

const modules = [
  { number: "01", title: "Entenda sua dor", description: "O que é hérnia de disco, por que o nervo ciático dói e o que acontece no seu corpo. Quando você entende, para de ter medo.", icon: BookOpen, result: "Você vai saber exatamente o que está acontecendo na sua coluna." },
  { number: "02", title: "Posições de alívio imediato", description: "Posturas e movimentos que descomprimem o nervo em minutos. Para usar quando a crise bate forte.", icon: Zap, result: "Você vai conseguir aliviar a crise sem precisar de remédio.", highlight: true },
  { number: "03", title: "Protocolo de exercícios", description: "Sequência de exercícios terapêuticos seguros e progressivos para fortalecer sem agravar a hérnia.", icon: Award, result: "Você vai fortalecer a coluna sem medo de piorar." },
  { number: "04", title: "O que evitar", description: "Movimentos, posturas e hábitos que pioram a hérnia — e como substituí-los no dia a dia.", icon: Shield, result: "Você vai parar de fazer sem saber o que agrava sua dor." },
  { number: "05", title: "Rotina sustentável", description: "Como montar uma rotina de 10 a 15 minutos por dia para manter a coluna saudável a longo prazo.", icon: Clock, result: "Você vai ter um plano claro para nunca mais entrar em crise." },
]

const trustStats = [
  { value: "+50", label: "Avaliações 5 estrelas", sub: "no Google" },
  { value: "5+", label: "Anos de experiência", sub: "em dor crônica" },
  { value: "3", label: "Pós-graduações", sub: "especializações" },
  { value: "500+", label: "Pacientes atendidos", sub: "presencial e online" },
]

const testimonials = [
  { name: "Carlos M.", time: "21:43", text: "Já comecei a aplicar ontem e hoje acordei bem melhor. A dor que descia pra perna diminuiu muito." },
  { name: "Fernanda R.", time: "09:17", text: "Eu estava travando direto. Comecei a fazer as posições e já senti alívio. Muito bom mesmo." },
  { name: "Marcos T.", time: "16:52", text: "Finalmente alguém explicou de um jeito que dá pra entender. Já estou conseguindo controlar melhor a dor." },
  { name: "Patrícia L.", time: "11:08", text: "Tenho L4-L5 e L5-S1 e já estou melhorando. Está fazendo muito sentido pra mim." },
  { name: "Roberto S.", time: "20:30", text: "Eu tinha medo de piorar fazendo exercício, mas do jeito que está no guia ficou muito mais seguro." },
  { name: "Ana C.", time: "08:45", text: "A dor não sumiu totalmente ainda, mas melhorou muito. Já consigo levantar sem travar." },
  { name: "Diego F.", time: "14:22", text: "Funciona mesmo. Já senti diferença." },
]

const faqs = [
  { q: "Os exercícios podem piorar minha hérnia?", a: "Não. O guia foi estruturado para respeitar a fase da dor. Primeiro você aprende posições de alívio e descompressão, que reduzem a irritação do nervo. Depois, conforme melhora, entram exercícios progressivos e seguros. O objetivo é evitar exatamente o que piora a crise." },
  { q: "Funciona para hérnia L4-L5 ou L5-S1?", a: "Sim. O guia foi pensado principalmente para hérnia lombar nas regiões L4-L5 e L5-S1, as mais comuns. As estratégias ajudam a reduzir a pressão na coluna e diminuir a irritação do nervo ciático." },
  { q: "Em quanto tempo posso sentir melhora?", a: "Algumas pessoas relatam alívio já nas primeiras aplicações das posições de descompressão. Cada caso é diferente, mas o objetivo é tirá-lo do ciclo de crises — não apenas aliviar momentaneamente." },
  { q: "E se eu já fiz tratamento e não funcionou?", a: "O guia trata especificamente da progressão por fases da dor — algo que muitos protocolos genéricos ignoram. Se você fez exercícios sem respeitar a fase, provavelmente fez a coisa certa na hora errada. Este guia resolve exatamente isso." },
  { q: "Serve para quem tem mais de 60 anos?", a: "Sim. Os exercícios são adaptáveis e respeitam as limitações individuais. O guia explica exatamente como modificar cada movimento se necessário." },
  { q: "Posso usar mesmo tomando medicação?", a: "Sim. O guia é complementar ao tratamento médico, não substitui. Na verdade, muitos pacientes conseguem reduzir a dependência de remédio à medida que a dor melhora — mas isso deve ser sempre orientado pelo seu médico." },
  { q: "É diferente do que acho no YouTube?", a: "Muito. O YouTube tem exercícios genéricos sem progressão por fases. Este guia foi estruturado por um fisioterapeuta que trata hérnia de disco todos os dias, com protocolo específico para L4-L5 e L5-S1, do alívio imediato até o fortalecimento." },
  { q: "Vou conseguir entender os exercícios?", a: "Sim. O guia foi feito para ser simples. Você terá explicações claras com vídeos demonstrativos mostrando exatamente como fazer cada posição. Mesmo quem nunca fez fisioterapia consegue acompanhar." },
  { q: "Tem garantia?", a: "Sim. Você tem 7 dias de garantia incondicional. Se achar que o guia não é para você, solicita o reembolso pela Hotmart — sem perguntas, sem burocracia." },
]

const moduleIcons = [BookOpen, Zap, Award, Shield, Clock]

export default async function GuiaPage() {
  const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  const [
    sanityConfig,
    sanityTestimonials,
    sanityFaqs,
    sanityPainPoints,
    sanityModules,
    sanityStats,
  ] = isSanityConfigured
    ? await Promise.all([
        getGuiaConfig(),
        getTestimonials(),
        getFaqs(),
        getPainPoints(),
        getGuideModules(),
        getTrustStats(),
        getForWhoItems(),
      ])
    : [{}, [], [], [], [], [], []]

  const cfg = sanityConfig as Awaited<ReturnType<typeof getGuiaConfig>>

  const activeTestimonials = sanityTestimonials.length > 0 ? sanityTestimonials : testimonials
  const activeFaqs = sanityFaqs.length > 0
    ? sanityFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : faqs
  const activePains = sanityPainPoints.length > 0
    ? (sanityPainPoints as Array<{ text: string }>).map((p) => p.text)
    : pains
  const activeModules = sanityModules.length > 0
    ? (sanityModules as Array<{ number: string; title: string; description: string }>).map((m, i) => ({
        ...m,
        icon: moduleIcons[i] ?? BookOpen,
        result: modules[i]?.result ?? "",
        highlight: i === 1,
      }))
    : modules
  const activeStats = sanityStats.length > 0
    ? (sanityStats as Array<{ value: string; label: string; sub: string }>)
    : trustStats

  return (
    <div
      className="min-h-screen bg-[#0c0c0f] text-white"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      <PixelViewContent />

      {/* ── 1. BARRA DE URGÊNCIA COM CONTADOR ── */}
      <div
        className="w-full py-2.5 text-center text-sm font-semibold"
        style={{ background: "linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%)", color: "#0c0c0f" }}
      >
        🔥 Oferta de lançamento — R$&nbsp;19,90 por tempo limitado &nbsp;·&nbsp; Termina em{" "}
        <CountdownTimer />
      </div>

      {/* ── 2. HERO ── */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(245,200,66,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Social proof badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5 text-sm font-semibold"
                style={{ borderColor: "rgba(245,200,66,0.35)", color: "#f5c842", background: "rgba(245,200,66,0.08)" }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#f5c842] text-[#f5c842]" />
                  ))}
                </div>
                {cfg.heroSocialProof ?? "+50 avaliações 5 estrelas no Google"}
              </div>

              <h1
                className="font-serif font-bold leading-[1.1] text-balance text-white"
                style={{ fontFamily: "var(--font-playfair, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {cfg.heroHeadline ?? "Você não precisa viver refém da dor na coluna"}
              </h1>

              <p
                className="mt-5 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                {cfg.heroDescription ??
                  "O protocolo de um fisioterapeuta especialista para aliviar hérnia de disco e ciático — sem sair de casa, sem depender de remédio."}
              </p>

              {/* Main CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-base sm:text-lg font-bold text-[#0c0c0f] bg-[#f5c842] hover:bg-[#f0bb22] transition-all hover:scale-[1.03] active:scale-[0.97] animate-pulse"
                  style={{ boxShadow: "0 0 0 0 rgba(245,200,66,0.7), 0 8px 30px rgba(245,200,66,0.45)" }}
                >
                  QUERO ALIVIAR MINHA DOR AGORA
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <p className="mt-2.5 text-xs text-center lg:text-left" style={{ color: "rgba(255,255,255,0.30)" }}>
                apenas R$&nbsp;19,90 · acesso imediato · garantia 7 dias
              </p>

              {/* Trust row */}
              <div
                className="mt-5 flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Compra segura via Hotmart</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Acesso imediato</span>
                <span className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5" /> Funciona no celular</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div
                className="relative w-56 sm:w-72 lg:w-80"
                style={{ filter: "drop-shadow(0 32px 70px rgba(245,200,66,0.25))" }}
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
      </section>

      {/* ── STATS STRIP ── */}
      <div className="bg-[#111116] py-8 border-y border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {activeStats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-3xl sm:text-4xl font-bold"
                  style={{ color: "#f5c842", fontFamily: "var(--font-playfair, serif)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-white mt-1">{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.30)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. ISSO É VOCÊ? (checklist interativo) ── */}
      <section className="py-16 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-4 text-sm font-semibold"
              style={{ borderColor: "rgba(239,68,68,0.35)", color: "#f87171", background: "rgba(239,68,68,0.08)" }}
            >
              <AlertTriangle className="h-4 w-4" />
              Isso é você?
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Clique nos sintomas que você tem
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              Marque os que se aplicam a você
            </p>
          </div>
          <SymptomChecklist />
        </div>
      </section>

      {/* ── 4. O QUE ACONTECE SE VOCÊ NÃO AGIR ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5 text-sm font-semibold"
            style={{ borderColor: "rgba(239,68,68,0.35)", color: "#f87171", background: "rgba(239,68,68,0.08)" }}
          >
            <TrendingDown className="h-4 w-4" />
            O que acontece com quem não trata
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Ignorar a hérnia tem um preço
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Não estamos aqui para assustar — mas você precisa saber o que acontece quando a hérnia é ignorada.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: TrendingDown, title: "Piora progressiva", desc: "A hérnia não tratada tende a comprimir cada vez mais o nervo, aumentando a dor e o formigamento ao longo do tempo." },
              { icon: Activity, title: "Perda de mobilidade", desc: "A dor crônica faz você se movimentar menos. Menos movimento gera mais rigidez e fraqueza muscular." },
              { icon: Pill, title: "Dependência de remédio", desc: "Anti-inflamatórios e analgésicos mascaram a dor mas não resolvem a causa. O uso contínuo traz outros riscos à saúde." },
              { icon: Brain, title: "Impacto mental", desc: "Viver com dor constante afeta sono, humor, trabalho e relacionamentos. A qualidade de vida cai progressivamente." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl p-5"
                  style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(239,68,68,0.12)" }}
                  >
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            className="mt-8 rounded-2xl p-6"
            style={{ background: "rgba(245,200,66,0.07)", border: "1px solid rgba(245,200,66,0.22)" }}
          >
            <p className="font-semibold text-white text-base">
              Existe um caminho diferente. E ele começa hoje.
            </p>
            <div className="mt-5">
              <BuyButton label="Quero começar a melhorar agora" large={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MÓDULOS DO GUIA ── */}
      <section className="py-16 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>
              Conteúdo
            </span>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              O que você vai aprender
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              5 módulos diretos ao ponto, criados por quem trata hérnia de disco todo dia
            </p>
          </div>

          <div className="space-y-3">
            {activeModules.map((mod) => {
              const Icon = mod.icon
              return (
                <div
                  key={mod.number}
                  className="relative rounded-2xl p-5 sm:p-6 transition-colors"
                  style={{
                    background: mod.highlight ? "rgba(245,200,66,0.07)" : "rgba(255,255,255,0.035)",
                    border: mod.highlight ? "1px solid rgba(245,200,66,0.30)" : "1px solid rgba(255,255,255,0.065)",
                  }}
                >
                  {mod.highlight && (
                    <div
                      className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                      style={{ background: "#f5c842", color: "#0c0c0f" }}
                    >
                      <Star className="h-3 w-3 fill-current" />
                      Mais usado pelos pacientes
                    </div>
                  )}
                  <div className="flex gap-4 sm:gap-5">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: mod.highlight ? "rgba(245,200,66,0.18)" : "rgba(245,200,66,0.08)",
                        border: "1px solid rgba(245,200,66,0.20)",
                        color: "#f5c842",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: "rgba(245,200,66,0.55)" }}>
                          {mod.number}
                        </span>
                        <h3 className="font-bold text-white">{mod.title}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                        {mod.description}
                      </p>
                      {mod.result && (
                        <p className="mt-2 text-xs font-medium" style={{ color: "#f5c842" }}>
                          → {mod.result}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Incluso checklist */}
          <div className="mt-8 rounded-2xl p-6 sm:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="font-semibold text-white text-sm mb-4">Tudo isso está incluso:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { icon: Play, text: "Exercícios guiados por vídeo" },
                { icon: Layers, text: "Protocolo por fases da dor" },
                { icon: BookOpen, text: "Passo a passo simples" },
                { icon: Zap, text: "Acesso imediato após pagamento" },
                { icon: Smartphone, text: "Funciona em qualquer celular" },
                { icon: Clock, text: "Acesso vitalício ao conteúdo" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROVA SOCIAL ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>
              Depoimentos
            </span>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Veja o que estão dizendo
            </h2>
            {/* Stat destaque */}
            <div
              className="mt-5 inline-flex items-center gap-3 rounded-2xl px-5 py-3"
              style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.20)" }}
            >
              <TrendingUp className="h-5 w-5 text-[#f5c842] shrink-0" />
              <p className="text-sm font-semibold text-white">
                <span className="text-[#f5c842]">87%</span> dos pacientes relatam melhora na primeira semana
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
            style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          >
            {activeTestimonials.map((t) => (
              <div
                key={t.name}
                className="flex-shrink-0 w-[80vw] max-w-[300px] sm:w-[280px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  className="rounded-2xl p-4 h-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {/* Stars */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#f5c842] text-[#f5c842]" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.80)" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: "rgba(245,200,66,0.25)", color: "#f5c842" }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{t.name}</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>cliente verificado · {t.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-3 sm:hidden" style={{ color: "rgba(255,255,255,0.25)" }}>
            ← deslize para ver mais →
          </p>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Shield, label: "Pagamento seguro", sub: "via Hotmart" },
              { icon: CheckCircle, label: "Garantia de 7 dias", sub: "reembolso sem perguntas" },
              { icon: Smartphone, label: "Acesso imediato", sub: "em qualquer dispositivo" },
              { icon: Users, label: "+500 pacientes", sub: "atendidos pelo Dr. Guilherme" },
            ].map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.label}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon className="h-5 w-5 shrink-0" style={{ color: "#f5c842" }} />
                  <div>
                    <p className="text-xs font-semibold text-white">{b.label}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{b.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 7. ANCORAGEM DE PREÇO ── */}
      <section className="py-16 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>
              Perspectiva
            </span>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Quanto você já gastou tentando resolver?
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { label: "1 sessão de fisioterapia", value: "R$ 150–300", per: "por sessão" },
              { label: "Consulta com ortopedista", value: "R$ 300–500", per: "por consulta" },
              { label: "Remédios anti-inflamatórios", value: "R$ 80–200", per: "por mês" },
              { label: "Exame de ressonância", value: "R$ 400–800", per: "por exame" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.13)" }}
              >
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                <div className="text-right shrink-0 ml-4">
                  <span className="font-bold text-red-400 text-sm">{item.value}</span>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.30)" }}>{item.per}</p>
                </div>
              </div>
            ))}
          </div>

          {/* vs. Guia */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: "rgba(245,200,66,0.08)", border: "2px solid rgba(245,200,66,0.35)" }}
          >
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(245,200,66,0.70)" }}>
              O Guia Completo
            </p>
            <div className="mt-3">
              <span className="text-sm line-through" style={{ color: "rgba(255,255,255,0.25)" }}>
                De {cfg.pricingOriginal ?? "R$ 67,00"}
              </span>
              <div
                className="font-serif text-5xl sm:text-6xl font-bold mt-1"
                style={{ color: "#f5c842", fontFamily: "var(--font-playfair, serif)" }}
              >
                {cfg.pricingFull ?? "R$ 19,90"}
              </div>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
                pagamento único · acesso vitalício
              </p>
              <p className="mt-1 text-xs font-medium" style={{ color: "rgba(245,200,66,0.65)" }}>
                menos de R$ 0,66 por dia durante um mês
              </p>
            </div>
            <div className="mt-6">
              <BuyButton label={`Garantir meu acesso — ${cfg.pricingFull ?? "R$ 19,90"}`} />
            </div>
            <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Processado com segurança pela Hotmart · Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. AUTOR ── */}
      <section className="py-16 sm:py-20 bg-[#111116]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div
            className="flex flex-col sm:flex-row gap-8 items-center sm:items-start rounded-3xl p-7 sm:p-10"
            style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.075)" }}
          >
            <div
              className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full overflow-hidden"
              style={{ border: "3px solid rgba(245,200,66,0.50)" }}
            >
              <Image
                src="/images/dr-guilherme-about-new.png"
                alt="Dr. Guilherme Carvalho"
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#f5c842" }}>
                Quem criou este guia
              </span>
              <h3
                className="mt-1.5 font-serif text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair, serif)" }}
              >
                {cfg.authorName ?? "Dr. Guilherme Carvalho"}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                {cfg.authorCredential ?? "Fisioterapeuta · CREFITO 1 318268-F"}
              </p>
              <p className="mt-4 text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.65)" }}>
                &ldquo;Eu sei o que meus pacientes sofrem. Criei esse guia para que mais pessoas tenham acesso ao que realmente funciona — sem precisar depender de consultas ou remédio.&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                {cfg.authorBio ??
                  "Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes em todo o Brasil."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                {(cfg.authorSpecializations ?? ["Osteopatia", "Quiropraxia", "Acupuntura"]).map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "rgba(245,200,66,0.10)", color: "#f5c842", border: "1px solid rgba(245,200,66,0.18)" }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f5c842] text-[#f5c842]" />
                ))}
                <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {cfg.heroSocialProof ?? "+50 avaliações 5 estrelas no Google"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-14 sm:py-20 bg-[#0c0c0f]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold text-center text-white mb-3"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Perguntas frequentes
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Tudo o que você precisa saber antes de comprar
          </p>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-2.5">
            {activeFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden border-0"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.065)" }}
              >
                <AccordionTrigger
                  className="px-5 sm:px-6 py-4 text-sm sm:text-base font-semibold text-white hover:no-underline hover:text-[#f5c842] transition-colors text-left"
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 sm:px-6 pb-4 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── 10. CTA FINAL FORTE ── */}
      <section className="py-16 sm:py-24 bg-[#111116]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5 text-sm font-semibold"
            style={{ borderColor: "rgba(245,200,66,0.35)", color: "#f5c842", background: "rgba(245,200,66,0.08)" }}
          >
            <Zap className="h-3.5 w-3.5" />
            Acesso imediato
          </div>

          <h2
            className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance"
            style={{ fontFamily: "var(--font-playfair, serif)" }}
          >
            Daqui a 5 minutos você pode estar fazendo o primeiro exercício
          </h2>
          <p className="mt-4 text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Você já sofreu o suficiente. O guia está pronto. Com garantia de 7 dias, não há risco nenhum.
          </p>

          {/* Price */}
          <div className="mt-7">
            <p className="text-sm line-through" style={{ color: "rgba(255,255,255,0.25)" }}>
              De {cfg.pricingOriginal ?? "R$ 67,00"}
            </p>
            <p
              className="font-serif text-5xl font-bold"
              style={{ color: "#f5c842", fontFamily: "var(--font-playfair, serif)" }}
            >
              {cfg.pricingFull ?? "R$ 19,90"}
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.40)" }}>
              ou {cfg.pricingInstallments ?? "2x de R$ 9,95"}
            </p>
          </div>

          <div className="mt-7">
            <BuyButton label="QUERO O GUIA AGORA" />
          </div>

          {/* Guarantee */}
          <div className="mt-6 flex items-center justify-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
            <Shield className="h-4 w-4" />
            <span>Garantia incondicional de 7 dias · Reembolso sem burocracia</span>
          </div>

          {/* WhatsApp secondary */}
          <p className="mt-5 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
            Prefere tirar dúvidas antes?{" "}
            <a
              href={WHATSAPP_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f5c842" }}
              className="hover:underline font-medium"
            >
              Fale com o Dr. Guilherme pelo WhatsApp →
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)", color: "rgba(255,255,255,0.18)", fontSize: "0.75rem" }}
      >
        © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos os direitos reservados.
      </footer>

      {/* ── 11. STICKY MOBILE CTA ── */}
      <StickyCta />
    </div>
  )
}
