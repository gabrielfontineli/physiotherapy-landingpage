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
  TrendingDown,
  Pill,
  Activity,
  Brain,
  Users,
  Play,
  Layers,
  TrendingUp,
  MessageCircle,
  Check,
  X,
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
    <div className="min-h-screen bg-[#0a0a0d] text-white overflow-x-hidden">
      <PixelViewContent />

      {/* ── GLOBAL ANIMATIONS ── */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(245,200,66,0.4), 0 8px 40px rgba(245,200,66,0.3); }
          50% { box-shadow: 0 0 60px rgba(245,200,66,0.7), 0 8px 60px rgba(245,200,66,0.5); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          80%, 100% { transform: scale(1.8); opacity: 0; }
        }
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: shine 2.5s ease-in-out infinite;
        }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .glow-btn { animation: glow-pulse 2s ease-in-out infinite; }
        .slide-up { animation: slide-up 0.6s ease-out both; }
        .ping-slow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid rgba(245,200,66,0.6);
          animation: ping-slow 1.8s ease-out infinite;
        }
      `}</style>

      {/* ── 1. BARRA DE URGÊNCIA ── */}
      <div
        className="w-full py-3 text-center text-sm font-bold relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, #b45309 0%, #f59e0b 40%, #f5c842 60%, #f59e0b 80%, #b45309 100%)", color: "#000" }}
      >
        <span className="relative z-10">
          🔥 Oferta de lançamento — <strong>R$&nbsp;19,90</strong> por tempo limitado &nbsp;·&nbsp; Termina em{" "}
          <CountdownTimer />
        </span>
      </div>

      {/* ── 2. HERO ── */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 30% 0%, rgba(245,200,66,0.15) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(245,200,66,0.06) 0%, transparent 60%)" }} />
          {/* Grid lines */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,200,66,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,66,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Copy */}
            <div className="order-2 lg:order-1 text-center lg:text-left slide-up">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-6" style={{ background: "rgba(245,200,66,0.10)", border: "1px solid rgba(245,200,66,0.30)" }}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5c842] opacity-75 ping-slow" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f5c842]" />
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#f5c842] text-[#f5c842]" />)}
                </div>
                <span className="text-sm font-semibold text-[#f5c842]">
                  {cfg.heroSocialProof ?? "+50 avaliações 5 estrelas"}
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="font-black leading-[1.05] text-balance text-white"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", letterSpacing: "-0.02em" }}
              >
                {cfg.heroPreHeadline ?? "Chega de sofrer com"}{" "}
                <span style={{ color: "#f5c842" }}>
                  {cfg.heroHeadline ?? "Hérnia de Disco"}
                </span>
                {cfg.heroSubtitle ? (
                  <> <span className="opacity-60">e</span> {cfg.heroSubtitle}</>
                ) : (
                  <> <span className="opacity-60">e</span> nervo ciático</>
                )}
              </h1>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.65)" }}>
                {cfg.heroDescription ??
                  "O protocolo de fisioterapeuta especialista para aliviar a dor, retomar sua vida e parar de depender só de remédio — tudo em casa."}
              </p>

              {/* CTA block */}
              <div className="mt-8 flex flex-col gap-3 items-center lg:items-start">
                <a
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine glow-btn relative inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-lg sm:text-xl font-black text-[#0a0a0d] bg-[#f5c842] hover:bg-[#f0bb22] transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{ width: "100%", maxWidth: "440px" }}
                >
                  QUERO ALIVIAR MINHA DOR AGORA
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </a>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                  <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-green-400" /> Compra segura</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-400" /> Acesso imediato</span>
                  <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-green-400" /> Garantia 7 dias</span>
                </div>

                <p className="text-2xl font-black" style={{ color: "#f5c842" }}>
                  R$&nbsp;19,90
                  <span className="text-sm font-normal ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <s>R$ 67,00</s> pagamento único
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT — Product image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative float-anim">
                {/* Glow behind image */}
                <div style={{ position: "absolute", inset: "-20%", background: "radial-gradient(circle, rgba(245,200,66,0.20) 0%, transparent 70%)", filter: "blur(30px)", borderRadius: "50%", zIndex: 0 }} />
                <Image
                  src="/images/hero-guide.png"
                  alt="Guia Prático — Destrave sua Hérnia de Disco e Ciático"
                  width={460}
                  height={460}
                  className="relative w-56 sm:w-72 lg:w-[380px] h-auto rounded-3xl"
                  priority
                  style={{ zIndex: 1, filter: "drop-shadow(0 40px 80px rgba(245,200,66,0.30))" }}
                />
                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 text-center"
                  style={{ background: "rgba(10,10,13,0.95)", border: "1px solid rgba(245,200,66,0.35)", backdropFilter: "blur(12px)", zIndex: 2 }}
                >
                  <p className="text-2xl font-black" style={{ color: "#f5c842" }}>R$&nbsp;19,90</p>
                  <p className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>acesso imediato</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP — ouro sólido ── */}
      <div style={{ background: "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a1200 100%)", borderTop: "1px solid rgba(245,200,66,0.25)", borderBottom: "1px solid rgba(245,200,66,0.25)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {activeStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-black text-4xl sm:text-5xl" style={{ color: "#f5c842", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-white mt-1.5">{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DEPOIMENTOS WHATSAPP ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0f0f13" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4" style={{ background: "rgba(37,211,102,0.10)", border: "1px solid rgba(37,211,102,0.25)" }}>
              <MessageCircle className="h-4 w-4" style={{ color: "#25d166" }} />
              <span className="text-sm font-bold" style={{ color: "#25d166" }}>WhatsApp · mensagens reais</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>
              Veja o que estão dizendo
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.20)" }}>
              <TrendingUp className="h-4 w-4 text-[#f5c842]" />
              <p className="text-sm font-semibold text-white"><span className="text-[#f5c842]">87%</span> relatam melhora na primeira semana</p>
            </div>
          </div>

          {/* WhatsApp carousel */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {activeTestimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-[78vw] max-w-[300px] snap-start">
                {/* WhatsApp phone frame */}
                <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* Top bar */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ background: "#1f2c34" }}>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#25d166", color: "#000" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-none">{t.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>hoje às {t.time}</p>
                    </div>
                  </div>
                  {/* Chat area */}
                  <div className="px-3 py-4 min-h-[100px]" style={{ background: "#0b141a", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
                    {/* Bubble */}
                    <div className="relative max-w-[85%] ml-auto rounded-[12px_2px_12px_12px] px-3.5 py-2.5" style={{ background: "#005c4b" }}>
                      <p className="text-sm leading-relaxed text-white">{t.text}</p>
                      <p className="text-right text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {t.time} ✓✓
                      </p>
                      {/* Tail */}
                      <div style={{ position: "absolute", top: 0, right: "-8px", width: 0, height: 0, borderTop: "8px solid #005c4b", borderLeft: "8px solid transparent" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-3 sm:hidden" style={{ color: "rgba(255,255,255,0.20)" }}>
            ← deslize para ver mais →
          </p>
        </div>
      </section>

      {/* ── SINTOMAS — ISSO É VOCÊ? ── */}
      <section className="py-16 sm:py-20" style={{ background: "linear-gradient(180deg, #0a0a0d 0%, #110909 100%)" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.30)" }}>
              <span className="text-lg">👇</span>
              <span className="text-sm font-bold text-red-400">Isso é você?</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>
              Marque seus sintomas
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
              Clique em cada um que se aplica a você
            </p>
          </div>
          <SymptomChecklist />
        </div>
      </section>

      {/* ── O QUE ACONTECE SE VOCÊ NÃO AGIR — fundo vermelho escuro ── */}
      <section className="py-16 sm:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0505 0%, #250a0a 50%, #1a0505 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)" }}>
            <TrendingDown className="h-4 w-4 text-red-400" />
            <span className="text-sm font-bold text-red-400">O que acontece com quem não trata</span>
          </div>

          <h2 className="font-black text-3xl sm:text-5xl text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ignorar a hérnia<br />
            <span className="text-red-400">tem um preço alto</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: TrendingDown, title: "Piora progressiva", desc: "A hérnia não tratada tende a comprimir cada vez mais o nervo, aumentando a dor e o formigamento." },
              { icon: Activity, title: "Perda de mobilidade", desc: "A dor crônica faz você se movimentar menos. Menos movimento gera mais rigidez e fraqueza muscular." },
              { icon: Pill, title: "Dependência de remédio", desc: "Anti-inflamatórios mascaram a dor mas não resolvem a causa. O uso contínuo traz outros riscos à saúde." },
              { icon: Brain, title: "Impacto mental", desc: "Viver com dor afeta sono, humor, trabalho e relacionamentos. A qualidade de vida cai progressivamente." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)" }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(239,68,68,0.15)" }}>
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 rounded-2xl p-6" style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.25)" }}>
            <p className="font-bold text-white text-lg mb-5">Existe um caminho diferente. E ele começa hoje.</p>
            <BuyButton label="Quero começar a melhorar agora" large={false} />
          </div>
        </div>
      </section>

      {/* ── MÓDULOS — visual dramático ── */}
      <section className="py-16 sm:py-24" style={{ background: "#0a0a0d" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: "#f5c842" }}>Conteúdo do guia</span>
            <h2 className="mt-3 font-black text-3xl sm:text-5xl text-white" style={{ letterSpacing: "-0.02em" }}>
              O que você vai aprender
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.42)" }}>
              5 módulos diretos ao ponto, criados por quem trata hérnia todo dia
            </p>
          </div>

          <div className="space-y-4">
            {activeModules.map((mod) => {
              const Icon = mod.icon
              return (
                <div
                  key={mod.number}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: mod.highlight ? "linear-gradient(135deg, rgba(245,200,66,0.10) 0%, rgba(245,200,66,0.04) 100%)" : "rgba(255,255,255,0.03)",
                    border: mod.highlight ? "1px solid rgba(245,200,66,0.40)" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Giant number background */}
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
                    style={{ fontSize: "7rem", lineHeight: 1, color: mod.highlight ? "rgba(245,200,66,0.07)" : "rgba(255,255,255,0.03)", letterSpacing: "-0.04em" }}
                  >
                    {mod.number}
                  </div>

                  {mod.highlight && (
                    <div className="px-6 pt-5 pb-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black" style={{ background: "#f5c842", color: "#000" }}>
                        <Star className="h-3 w-3 fill-current" />
                        MAIS USADO PELOS PACIENTES
                      </span>
                    </div>
                  )}

                  <div className="relative flex gap-5 p-5 sm:p-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: mod.highlight ? "rgba(245,200,66,0.20)" : "rgba(245,200,66,0.07)",
                        border: "1px solid rgba(245,200,66,0.25)",
                        color: "#f5c842",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 pr-16">
                      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "rgba(245,200,66,0.50)" }}>
                        Módulo {mod.number}
                      </p>
                      <h3 className="font-black text-lg text-white">{mod.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                        {mod.description}
                      </p>
                      {mod.result && (
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                          <p className="text-sm font-semibold text-green-400">{mod.result}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Incluso checklist */}
          <div className="mt-8 rounded-2xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="font-black text-white text-base mb-5 text-center">✅ Tudo isso está incluso:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <div key={item.text} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.10)" }}>
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(245,200,66,0.12)" }}>
                      <Icon className="h-3.5 w-3.5 text-[#f5c842]" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANCORAGEM DE PREÇO ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0f0f13" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl sm:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>
              Quanto você já gastou<br />tentando resolver?
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.42)" }}>
              Enquanto isso, o guia custa menos que qualquer consulta
            </p>
          </div>

          {/* Comparison */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="grid grid-cols-3 text-center text-xs font-bold uppercase tracking-widest px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.40)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-left">Opção</span>
              <span>Custo</span>
              <span>Acesso</span>
            </div>
            {[
              { label: "1 sessão de fisioterapia", value: "R$ 150–300", access: "60 min", bad: true },
              { label: "Consulta ortopedista", value: "R$ 300–500", access: "1 vez", bad: true },
              { label: "Remédios / mês", value: "R$ 80–200", access: "temporário", bad: true },
              { label: "Este Guia", value: "R$ 19,90", access: "vitalício", bad: false },
            ].map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-3 items-center px-4 py-3.5"
                style={{
                  background: item.bad ? "transparent" : "rgba(245,200,66,0.07)",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                  borderBottom: !item.bad ? "1px solid rgba(245,200,66,0.25)" : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  {item.bad
                    ? <X className="h-4 w-4 shrink-0 text-red-400" />
                    : <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                  }
                  <span className="text-sm" style={{ color: item.bad ? "rgba(255,255,255,0.55)" : "white", fontWeight: item.bad ? 400 : 700 }}>
                    {item.label}
                  </span>
                </div>
                <span className="text-center text-sm font-bold" style={{ color: item.bad ? "#f87171" : "#f5c842" }}>
                  {item.value}
                </span>
                <span className="text-center text-xs" style={{ color: item.bad ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.65)" }}>
                  {item.access}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(245,200,66,0.12) 0%, rgba(245,200,66,0.05) 100%)", border: "2px solid rgba(245,200,66,0.40)" }}>
            <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: "rgba(245,200,66,0.65)" }}>Preço de lançamento</p>
            <p className="text-sm line-through" style={{ color: "rgba(255,255,255,0.30)" }}>De {cfg.pricingOriginal ?? "R$ 67,00"}</p>
            <p className="font-black leading-none mt-1" style={{ fontSize: "clamp(3.5rem, 10vw, 5rem)", color: "#f5c842", letterSpacing: "-0.03em" }}>
              {cfg.pricingFull ?? "R$ 19,90"}
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>ou {cfg.pricingInstallments ?? "2x de R$ 9,95"} · acesso vitalício</p>
            <p className="mt-1 text-xs font-medium" style={{ color: "rgba(245,200,66,0.60)" }}>menos de R$ 0,66 por dia durante um mês</p>
            <div className="mt-6">
              <BuyButton label={`Garantir meu acesso — ${cfg.pricingFull ?? "R$ 19,90"}`} />
            </div>
            <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Processado pela Hotmart · Garantia de 7 dias · Acesso imediato
            </p>
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section className="py-16 sm:py-20" style={{ background: "#0a0a0d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start rounded-3xl p-7 sm:p-10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="relative shrink-0">
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden relative" style={{ border: "3px solid rgba(245,200,66,0.50)" }}>
                <Image src="/images/dr-guilherme-about-new.png" alt="Dr. Guilherme Carvalho" fill sizes="144px" className="object-cover object-top" />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-2 -right-2 rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: "#f5c842", color: "#000" }}>
                CREFITO
              </div>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: "#f5c842" }}>Quem criou este guia</span>
              <h3 className="mt-1.5 font-black text-2xl sm:text-3xl text-white" style={{ letterSpacing: "-0.02em" }}>
                {cfg.authorName ?? "Dr. Guilherme Carvalho"}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                {cfg.authorCredential ?? "Fisioterapeuta · CREFITO 1 318268-F"}
              </p>
              <div className="mt-4 rounded-xl px-4 py-3 text-left" style={{ background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.12)", borderLeft: "3px solid #f5c842" }}>
                <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.70)" }}>
                  &ldquo;Eu sei o que meus pacientes sofrem. Criei esse guia para que mais pessoas tenham acesso ao que realmente funciona — sem precisar depender de consultas ou remédio.&rdquo;
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                {cfg.authorBio ?? "Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes em todo o Brasil."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                {(cfg.authorSpecializations ?? ["Osteopatia", "Quiropraxia", "Acupuntura"]).map((spec) => (
                  <span key={spec} className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "rgba(245,200,66,0.10)", color: "#f5c842", border: "1px solid rgba(245,200,66,0.20)" }}>
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f5c842] text-[#f5c842]" />)}
                <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {cfg.heroSocialProof ?? "+50 avaliações 5 estrelas no Google"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GARANTIA STRIP ── */}
      <div className="py-6" style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #071207 100%)", borderTop: "1px solid rgba(34,197,94,0.15)", borderBottom: "1px solid rgba(34,197,94,0.15)" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
              🛡️
            </div>
            <div>
              <p className="font-black text-xl text-white">Garantia incondicional de 7 dias</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
                Se em 7 dias você não gostar, devolvemos seu dinheiro. Sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20" style={{ background: "#0a0a0d" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-black text-2xl sm:text-3xl text-center text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
            Perguntas frequentes
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Tudo o que você precisa saber antes de comprar
          </p>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-2">
            {activeFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden border-0"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <AccordionTrigger className="px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-white hover:no-underline hover:text-[#f5c842] transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-6 pb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA FINAL FORTE ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #100e00 0%, #1a1400 50%, #0d0b00 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,200,66,0.12) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: "rgba(245,200,66,0.10)", border: "1px solid rgba(245,200,66,0.30)" }}>
            <Zap className="h-3.5 w-3.5 text-[#f5c842]" />
            <span className="text-sm font-bold text-[#f5c842]">Acesso imediato após pagamento</span>
          </div>

          <h2 className="font-black text-3xl sm:text-5xl text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Daqui a 5 minutos você pode estar<br />
            <span style={{ color: "#f5c842" }}>fazendo o primeiro exercício</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
            Você já sofreu o suficiente. O guia está pronto. Com garantia de 7 dias, não há risco nenhum.
          </p>

          <div className="mt-8">
            <p className="text-sm line-through mb-1" style={{ color: "rgba(255,255,255,0.30)" }}>De {cfg.pricingOriginal ?? "R$ 67,00"}</p>
            <p className="font-black mb-1" style={{ color: "#f5c842", fontSize: "clamp(3rem, 8vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {cfg.pricingFull ?? "R$ 19,90"}
            </p>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.40)" }}>
              ou {cfg.pricingInstallments ?? "2x de R$ 9,95"}
            </p>

            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine glow-btn relative inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-xl font-black text-[#0a0a0d] bg-[#f5c842] hover:bg-[#f0bb22] transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ width: "100%", maxWidth: "460px" }}
            >
              QUERO O GUIA AGORA
              <ArrowRight className="h-5 w-5 shrink-0" />
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Shield className="h-4 w-4" />
            <span>Garantia incondicional de 7 dias · Reembolso sem burocracia</span>
          </div>

          <p className="mt-5 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
            Prefere tirar dúvidas antes?{" "}
            <a href={WHATSAPP_GUIDE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#f5c842" }} className="hover:underline font-semibold">
              Fale com o Dr. Guilherme pelo WhatsApp →
            </a>
          </p>
        </div>
      </section>

      {/* ── URGÊNCIA FINAL ── */}
      <div className="py-4 text-center font-black text-sm" style={{ background: "#dc2626", color: "#fff" }}>
        ⚡ Esse valor pode sair do ar a qualquer momento — garanta agora por R$&nbsp;19,90
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.055)", color: "rgba(255,255,255,0.18)", fontSize: "0.75rem", background: "#0a0a0d" }}>
        © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos os direitos reservados.
      </footer>

      <StickyCta />
    </div>
  )
}
