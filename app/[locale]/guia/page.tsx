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
  Play,
  Layers,
  TrendingUp,
  MessageCircle,
  Check,
  X,
  AlertTriangle,
} from "lucide-react"
import { BuyButton } from "@/components/guia/buy-button"
import { StickyCta } from "@/components/guia/sticky-cta"
import { PixelViewContent } from "@/components/guia/pixel-events"
import { CountdownTimer } from "@/components/guia/countdown-timer"
import { SymptomChecklist } from "@/components/guia/symptom-checklist"
import { GuiaEngagementTracker } from "@/components/guia/engagement-tracker"
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

// ── PALETA ──────────────────────────────────────────────────────────────
// bg: #ffffff / #f0f4ff   texto: #0c1b33   azul: #1e3a8a   cta: #ea580c
// ── STATIC FALLBACKS ────────────────────────────────────────────────────
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
  { number: "02", title: "Posições de alívio imediato", description: "Posturas e movimentos que descomprimem o nervo em minutos. Para usar quando a crise bate forte.", icon: Zap, result: "Você vai aliviar a crise sem precisar de remédio.", highlight: true },
  { number: "03", title: "Protocolo de exercícios", description: "Sequência de exercícios terapêuticos seguros e progressivos para fortalecer sem agravar a hérnia. Cada exercício tem vídeo com ângulo lateral e frontal.", icon: Award, result: "Você vai fortalecer a coluna sem medo de piorar." },
  { number: "04", title: "O que evitar", description: "Movimentos, posturas e hábitos que pioram a hérnia — e como substituí-los no dia a dia.", icon: Shield, result: "Você vai parar de fazer o que agrava sua dor sem saber." },
  { number: "05", title: "Rotina sustentável", description: "Como montar uma rotina de 10 a 15 minutos por dia para manter a coluna saudável a longo prazo.", icon: Clock, result: "Você vai ter um plano para nunca mais entrar em crise." },
]

const trustStats = [
  { value: "+50", label: "Avaliações 5 estrelas", sub: "no Google" },
  { value: "5+", label: "Anos de experiência", sub: "em dor crônica" },
  { value: "3", label: "Pós-graduações", sub: "Osteopatia · Quiro · Acu" },
  { value: "500+", label: "Pacientes atendidos", sub: "presencial e online" },
]

// Depoimentos fixos do hero — mensagens reais fornecidas pelo Dr. Guilherme
const HERO_TESTIMONIALS = [
  { name: "Lucas S.", time: "21:12", text: "Minha dor descia da lombar pra perna direto, principalmente quando eu sentava. Depois que comecei a seguir o guia, melhorou uns 80%." },
  { name: "Fernanda R.", time: "08:47", text: "Eu alongava achando que tava ajudando… e só piorava. Depois do guia entendi onde tava errando." },
]

const testimonials = [
  { name: "Lucas S.", time: "21:12", text: "Minha dor descia da lombar pra perna direto, principalmente quando eu sentava. Depois que comecei a seguir o guia, melhorou uns 80%." },
  { name: "Fernanda R.", time: "21:13", text: "Eu alongava achando que tava ajudando… e só piorava. Depois do guia entendi onde tava errando." },
  { name: "Marcos T.", time: "16:52", text: "Tentei YouTube, tentei fisioterapeuta. Esse guia foi o único que resolveu porque tem progressão por fase. Voltei a viver." },
  { name: "Patrícia L.", time: "11:08", text: "L4-L5 e L5-S1. Acordava toda manhã travada. Depois de 10 dias já consigo me levantar sem apoio." },
  { name: "Roberto S.", time: "20:30", text: "Achei que era barato demais para funcionar. Me arrependi de ter esperado. Minha dor no ciático caiu 70%." },
  { name: "Ana C.", time: "08:45", text: "2 anos tentando de tudo. Com o guia pela primeira vez estou no controle. Já consigo levantar sem travar." },
  { name: "Diego F.", time: "14:22", text: "Comprei pensando em devolver. Não devolvi porque na terceira sessão a dor já tinha diminuído muito." },
]

const faqs = [
  { q: "Os exercícios podem piorar minha hérnia?", a: "Não. O guia foi estruturado para respeitar a fase da dor. Primeiro você aprende posições de alívio e descompressão, que reduzem a irritação do nervo. Depois, conforme melhora, entram exercícios progressivos e seguros." },
  { q: "Funciona para hérnia L4-L5 ou L5-S1?", a: "Sim. O guia foi pensado principalmente para hérnia lombar nas regiões L4-L5 e L5-S1, as mais comuns. As estratégias ajudam a reduzir a pressão na coluna e diminuir a irritação do nervo ciático." },
  { q: "Em quanto tempo posso sentir melhora?", a: "Algumas pessoas relatam alívio já nas primeiras aplicações das posições de descompressão. Cada caso é diferente, mas o objetivo é tirá-lo do ciclo de crises — não apenas aliviar momentaneamente." },
  { q: "E se eu já fiz tratamento e não funcionou?", a: "O guia trata especificamente da progressão por fases da dor — algo que muitos protocolos genéricos ignoram. Se você fez exercícios sem respeitar a fase, provavelmente fez a coisa certa na hora errada. Este guia resolve exatamente isso." },
  { q: "Tenho essa dor há anos. Ainda tem jeito?", a: "Sim. A dor crônica não significa que está tudo perdido — significa que o ciclo nunca foi quebrado da forma certa. A chave é respeitar as fases: primeiro aliviar, depois fortalecer. Nessa ordem." },
  { q: "Serve para quem tem mais de 60 anos?", a: "Sim. Os exercícios são adaptáveis e respeitam as limitações individuais. O guia explica como modificar cada movimento se necessário." },
  { q: "Posso usar mesmo tomando medicação?", a: "Sim. O guia é complementar ao tratamento médico. Muitos pacientes conseguem reduzir a dependência de remédio à medida que a dor melhora — mas isso deve ser orientado pelo seu médico." },
  { q: "É diferente do que acho no YouTube?", a: "Muito. O YouTube tem exercícios genéricos sem progressão por fases. Este guia foi estruturado por um fisioterapeuta que trata hérnia todos os dias, com protocolo específico para L4-L5 e L5-S1, do alívio imediato ao fortalecimento." },
  { q: "E se eu tiver dúvidas durante o processo?", a: "Você pode falar diretamente comigo pelo WhatsApp. Respondo pessoalmente. Meu objetivo não é vender um PDF e sumir — é que você realmente melhore." },
  { q: "Tem garantia?", a: "Sim. 7 dias de garantia incondicional. Aplique o guia, veja se funciona. Se não sentir diferença, solicita reembolso pela Hotmart — 100% do valor de volta, sem perguntas. O risco é todo nosso." },
]

const moduleIcons = [BookOpen, Zap, Award, Shield, Clock]

// ── COMPONENTE: card de depoimento WhatsApp ──────────────────────────────
function WaCard({ name, time, text, highlight }: { name: string; time: string; text: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{
        border: highlight ? "2px solid #1e3a8a" : "1px solid #e2e8f0",
        background: "#fff",
      }}
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5" style={{ background: "#1f2c34" }}>
        <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: "#25d166", color: "#000" }}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">{name}</p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>hoje às {time}</p>
        </div>
        {highlight && (
          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: "#1e3a8a", color: "#fff" }}>
            EM DESTAQUE
          </span>
        )}
      </div>
      <div className="px-3 py-4" style={{ background: "#0b141a" }}>
        <div className="relative max-w-[90%] ml-auto rounded-[12px_2px_12px_12px] px-3.5 py-2.5" style={{ background: "#005c4b" }}>
          <p className="text-sm leading-relaxed text-white">{text}</p>
          <p className="text-right text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{time} ✓✓</p>
          <div style={{ position: "absolute", top: 0, right: "-8px", width: 0, height: 0, borderTop: "8px solid #005c4b", borderLeft: "8px solid transparent" }} />
        </div>
      </div>
    </div>
  )
}

export default async function GuiaPage() {
  const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  const [
    sanityConfig,
    sanityTestimonials,
    sanityFaqs,
    sanityPainPoints,
    sanityModules,
    sanityStats,
    sanityForWho,
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

  const sanityForWhoItems = sanityForWho as Array<{ _id: string; text: string }>
  const activeForWhoIsFor = sanityForWhoItems.length > 0
    ? sanityForWhoItems.map((i) => i.text)
    : [
        "Você tem diagnóstico de hérnia L4-L5 ou L5-S1",
        "Sente dor que desce pela perna (nervo ciático)",
        "Já fez fisioterapia sem resultado consistente",
        "Quer entender o que está acontecendo na sua coluna",
        "Tem 10–15 minutos por dia para dedicar à sua recuperação",
      ]
  const activeForWhoIsNotFor = [
    "Você tem indicação cirúrgica confirmada por médico",
    "Está em fase aguda com déficit motor severo",
    "Busca fórmula mágica sem compromisso nenhum",
  ]

  const originalPrice = cfg.pricingOriginal ?? "R$ 47,00"
  const currentPrice = cfg.pricingFull ?? "R$ 19,90"
  const installments = cfg.pricingInstallments ?? "2x de R$ 9,95"

  // depoimentos do hero: sempre fixos (mensagens reais do Dr. Guilherme)
  const heroTestimonials = HERO_TESTIMONIALS

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#fff", color: "#0c1b33" }}>
      <PixelViewContent />
      <GuiaEngagementTracker />

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
        }
        @keyframes glow-orange {
          0%, 100% { box-shadow: 0 4px 24px rgba(234,88,12,0.45), 0 2px 8px rgba(234,88,12,0.30); }
          50%       { box-shadow: 0 8px 40px rgba(234,88,12,0.70), 0 4px 16px rgba(234,88,12,0.50); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping-slow {
          0%        { transform: scale(1); opacity: 0.8; }
          80%, 100% { transform: scale(1.8); opacity: 0; }
        }
        .btn-orange {
          position: relative;
          overflow: hidden;
          animation: glow-orange 2s ease-in-out infinite;
        }
        .btn-orange::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: shine 2.5s ease-in-out infinite;
        }
        .slide-up { animation: slide-up 0.55s ease-out both; }
        .ping-slow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid rgba(234,88,12,0.55);
          animation: ping-slow 1.8s ease-out infinite;
        }
      `}</style>

      {/* ── BARRA DE URGÊNCIA ── */}
      <div className="w-full py-2.5 text-center text-sm font-black" style={{ background: "#dc2626", color: "#fff" }}>
        🔥 Pré-lançamento: <strong>47 vagas</strong> a <strong>R$&nbsp;19,90</strong> — depois sobe para {originalPrice} &nbsp;·&nbsp; Termina em <CountdownTimer />
      </div>

      {/* ══════════════════════════════════════════════
          HERO — acima da dobra
      ══════════════════════════════════════════════ */}
      <section className="relative" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start pt-10 pb-12 sm:pt-14 sm:pb-16">

            {/* ── COLUNA ESQUERDA: copy ── */}
            <div className="slide-up">

              {/* Credencial + estrelas */}
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-6"
                style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-70 ping-slow" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ea580c]" />
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
                </div>
                <span className="text-sm font-bold" style={{ color: "#1e3a8a" }}>
                  {cfg.heroSocialProof ?? "+50 avaliações 5★ · Fisioterapeuta com CREFITO"}
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-black leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", color: "#0c1b33" }}
              >
                {cfg.heroPreHeadline ?? "Se sua dor no ciático"}{" "}
                <span style={{ color: "#dc2626" }}>
                  {cfg.heroHeadline ?? "vai e volta,"}
                </span>
                <br />
                <span style={{ color: "#0c1b33" }}>
                  {cfg.heroSubtitle ?? "você está tratando errado."}
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="mt-5 text-lg sm:text-xl leading-relaxed font-medium"
                style={{ color: "#334155", maxWidth: 520 }}
              >
                {cfg.heroDescription ??
                  "Aprenda o que fazer em cada fase da dor para aliviar o ciático e a hérnia — sem depender só de remédio, sem precisar sair de casa."}
              </p>

              {/* Depoimentos de destaque — acima da dobra em mobile */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
                {heroTestimonials.map((t, i) => (
                  <WaCard key={t.name} name={t.name} time={t.time} text={t.text} highlight={i === 0} />
                ))}
              </div>

              {/* Benefícios da oferta */}
              <ul className="mt-8 space-y-3">
                {[
                  "Saiba exatamente o que fazer mesmo com dor forte",
                  "Funciona mesmo que a dor desça para a perna",
                  "Exercícios seguros para L4-L5 e L5-S1",
                  "10–15 minutos por dia, no celular, em casa",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "#dcfce7" }}>
                      <Check className="h-3 w-3" style={{ color: "#16a34a" }} />
                    </span>
                    <span className="text-base font-semibold" style={{ color: "#0c1b33" }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Empurrão final */}
              <div className="mt-8 rounded-xl px-5 py-4 flex items-start gap-3"
                style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}>
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#ea580c" }} />
                <p className="text-base font-bold leading-snug" style={{ color: "#7c2d12" }}>
                  Se você continuar fazendo do jeito errado, a dor vai continuar voltando.
                </p>
              </div>

              {/* PREÇO + CTA */}
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-black" style={{ color: "#0c1b33" }}>{currentPrice}</p>
                  <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>
                    <s>{originalPrice}</s> · pagamento único
                  </p>
                </div>

                <a
                  href={HOTMART_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange relative inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-lg sm:text-xl font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ width: "100%", maxWidth: 480, background: "#ea580c" }}
                >
                  QUERO ALIVIAR MINHA DOR AGORA
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </a>

                <div className="flex flex-wrap gap-4 text-xs font-medium" style={{ color: "#64748b" }}>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-green-500" /> Compra 100% segura
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-green-500" /> Acesso imediato
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Garantia 7 dias
                  </span>
                </div>
              </div>

            </div>

            {/* ── COLUNA DIREITA: foto + depoimentos (desktop) ── */}
            <div className="hidden lg:flex flex-col gap-5 items-center">
              <Image
                src="/images/hero-guide.png"
                alt="Dr. Guilherme Carvalho — Fisioterapeuta"
                width={480}
                height={580}
                priority
                className="w-full object-contain object-top rounded-2xl"
                style={{ maxHeight: 440 }}
              />
              <div className="grid grid-cols-1 gap-3 w-full">
                {heroTestimonials.map((t, i) => (
                  <WaCard key={t.name} name={t.name} time={t.time} text={t.text} highlight={i === 0} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP — azul escuro ── */}
      <div style={{ background: "#0c1b33" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {activeStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-black text-4xl sm:text-5xl" style={{ color: "#ea580c", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-white mt-1.5">{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SINTOMAS — ISSO É VOCÊ? ── */}
      <section id="section-checklist" className="py-16 sm:py-20 relative overflow-hidden" style={{ background: "#0c1b33" }}>
        {/* Glow vermelho atrás */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.18) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
              style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.40)" }}>
              <span className="text-lg">👇</span>
              <span className="text-sm font-bold text-red-400">Isso é você?</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>
              Marque seus sintomas
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.50)" }}>
              Clique em cada um que se aplica a você
            </p>
          </div>
          <SymptomChecklist />
        </div>
      </section>

      {/* ── CONSEQUÊNCIAS ── */}
      <section id="section-consequences" className="py-16 sm:py-20" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
            <TrendingDown className="h-4 w-4" style={{ color: "#dc2626" }} />
            <span className="text-sm font-bold" style={{ color: "#dc2626" }}>O que acontece com quem não trata</span>
          </div>

          <h2 className="font-black text-3xl sm:text-5xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ignorar a hérnia<br />
            <span style={{ color: "#dc2626" }}>tem um preço alto</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: TrendingDown, title: "Piora progressiva", desc: "A hérnia não tratada tende a comprimir cada vez mais o nervo, aumentando a dor e o formigamento." },
              { icon: Activity, title: "Perda de mobilidade", desc: "A dor crônica faz você se movimentar menos. Menos movimento gera mais rigidez e fraqueza muscular." },
              { icon: Pill, title: "Dependência de remédio", desc: "Anti-inflamatórios mascaram a dor mas não resolvem a causa. O uso contínuo traz outros riscos." },
              { icon: Brain, title: "Impacto mental", desc: "Viver com dor afeta sono, humor, trabalho e relacionamentos. A qualidade de vida cai progressivamente." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-4 rounded-2xl p-5"
                  style={{ background: "#fff5f5", border: "1px solid #fecaca" }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "#fee2e2" }}>
                    <Icon className="h-5 w-5" style={{ color: "#dc2626" }} />
                  </div>
                  <div>
                    <p className="font-black" style={{ color: "#0c1b33" }}>{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Objeção "Já tentei de tudo" */}
          <div className="mt-10 rounded-2xl p-6 text-left"
            style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderLeft: "4px solid #1e3a8a" }}>
            <p className="font-black text-base mb-2" style={{ color: "#0c1b33" }}>
              &ldquo;Já tentei de tudo e nada funcionou.&rdquo;
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              A maioria dos protocolos falha porque não respeita a <strong>fase da dor</strong>. Você provavelmente fez a coisa certa <em>na hora errada</em>. O guia foi construído em torno disso: primeiro alivia a crise, depois fortalece. Nessa ordem. É o que muda o resultado.
            </p>
          </div>

          <div className="mt-8 rounded-2xl p-6" style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
            <p className="font-black text-lg mb-5" style={{ color: "#0c1b33" }}>Existe um caminho diferente. E ele começa hoje.</p>
            <BuyButton label="QUERO ALIVIAR MINHA DOR AGORA" large={false} />
          </div>
        </div>
      </section>

      {/* ── PARA QUEM É / NÃO É ── */}
      <section id="section-for-who" className="py-16 sm:py-20" style={{ background: "#f0f4ff" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl sm:text-4xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
              Este guia é para você?
            </h2>
            <p className="mt-3 text-base" style={{ color: "#64748b" }}>
              Seja honesto — o guia só funciona para quem se encaixa no perfil certo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #bbf7d0" }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: "#dcfce7" }}>
                  <Check className="h-4 w-4" style={{ color: "#16a34a" }} />
                </div>
                <p className="font-black text-base" style={{ color: "#0c1b33" }}>É para você se:</p>
              </div>
              <ul className="space-y-3">
                {activeForWhoIsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                    <span className="text-sm leading-snug" style={{ color: "#334155" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #fecaca" }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: "#fee2e2" }}>
                  <X className="h-4 w-4" style={{ color: "#dc2626" }} />
                </div>
                <p className="font-black text-base" style={{ color: "#0c1b33" }}>NÃO é para você se:</p>
              </div>
              <ul className="space-y-3">
                {activeForWhoIsNotFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                    <span className="text-sm leading-snug" style={{ color: "#64748b" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS — todos ── */}
      <section id="section-testimonials" className="py-16 sm:py-20" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
              style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
              <MessageCircle className="h-4 w-4" style={{ color: "#16a34a" }} />
              <span className="text-sm font-bold" style={{ color: "#16a34a" }}>WhatsApp · mensagens reais</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
              Veja o que estão dizendo
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
              <TrendingUp className="h-4 w-4" style={{ color: "#1e3a8a" }} />
              <p className="text-sm font-semibold" style={{ color: "#0c1b33" }}>
                <span style={{ color: "#1e3a8a" }}>87%</span> relatam melhora na primeira semana
              </p>
            </div>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {activeTestimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-[82vw] max-w-[310px] snap-start">
                <WaCard name={t.name} time={t.time} text={t.text} />
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-3 sm:hidden" style={{ color: "#94a3b8" }}>
            ← deslize para ver mais →
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full px-4 py-2"
              style={{ background: "#fefce8", border: "1px solid #fde68a" }}>
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
              <span className="text-sm font-bold ml-1.5" style={{ color: "#0c1b33" }}>+50 avaliações verificadas no Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section id="section-modules" className="py-16 sm:py-24" style={{ background: "#f0f4ff" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: "#1e3a8a" }}>
              Conteúdo do guia
            </span>
            <h2 className="mt-3 font-black text-3xl sm:text-5xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
              O que você vai aprender
            </h2>
            <p className="mt-3 text-base" style={{ color: "#64748b" }}>
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
                    background: mod.highlight ? "#fff" : "#fff",
                    border: mod.highlight ? "2px solid #1e3a8a" : "1px solid #e2e8f0",
                    boxShadow: mod.highlight ? "0 4px 24px rgba(30,58,138,0.12)" : "none",
                  }}
                >
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
                    style={{ fontSize: "7rem", lineHeight: 1, color: mod.highlight ? "rgba(30,58,138,0.05)" : "rgba(0,0,0,0.03)", letterSpacing: "-0.04em" }}
                  >
                    {mod.number}
                  </div>

                  {mod.highlight && (
                    <div className="px-6 pt-5 pb-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black"
                        style={{ background: "#1e3a8a", color: "#fff" }}>
                        <Star className="h-3 w-3 fill-current" />
                        MAIS USADO PELOS PACIENTES
                      </span>
                    </div>
                  )}

                  <div className="relative flex gap-5 p-5 sm:p-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: mod.highlight ? "#dbeafe" : "#f0f4ff",
                        border: "1px solid #bfdbfe",
                        color: "#1e3a8a",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 pr-16">
                      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#93c5fd" }}>
                        Módulo {mod.number}
                      </p>
                      <h3 className="font-black text-lg" style={{ color: "#0c1b33" }}>{mod.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#64748b" }}>
                        {mod.description}
                      </p>
                      {mod.result && (
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                          <p className="text-sm font-bold text-green-700">{mod.result}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Incluso checklist */}
          <div className="mt-8 rounded-2xl p-6 sm:p-8" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
            <p className="font-black text-base mb-5 text-center" style={{ color: "#0c1b33" }}>
              ✅ Tudo isso está incluso:
            </p>
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
                  <div key={item.text} className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#dbeafe" }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: "#1e3a8a" }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#334155" }}>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section id="section-author" className="py-16 sm:py-20" style={{ background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start rounded-3xl p-7 sm:p-10"
            style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
            <div className="relative shrink-0">
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden relative"
                style={{ border: "4px solid #1e3a8a" }}>
                <Image src="/images/dr-guilherme-about-new.png" alt="Dr. Guilherme Carvalho" fill sizes="144px" className="object-cover object-top" />
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-full px-2.5 py-1 text-[10px] font-black"
                style={{ background: "#1e3a8a", color: "#fff" }}>
                CREFITO
              </div>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: "#1e3a8a" }}>
                Quem criou este guia
              </span>
              <h3 className="mt-1.5 font-black text-2xl sm:text-3xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
                {cfg.authorName ?? "Dr. Guilherme Carvalho"}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
                {cfg.authorCredential ?? "Fisioterapeuta · CREFITO 1 318268-F"}
              </p>
              <div className="mt-4 rounded-xl px-4 py-3 text-left"
                style={{ background: "#fff", border: "1px solid #bfdbfe", borderLeft: "4px solid #1e3a8a" }}>
                <p className="text-sm leading-relaxed italic" style={{ color: "#334155" }}>
                  &ldquo;Eu sei o que meus pacientes sofrem. Criei esse guia para que mais pessoas tenham acesso ao que realmente funciona — sem precisar depender de consultas ou remédio.&rdquo;
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#475569" }}>
                {cfg.authorBio ?? "Mais de 5 anos especializando em dor crônica e coluna. Pós-graduado em Osteopatia, Quiropraxia e Acupuntura. Trata hérnia de disco e ciático no consultório em Natal e online para pacientes em todo o Brasil."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                {(cfg.authorSpecializations ?? ["Osteopatia", "Quiropraxia", "Acupuntura"]).map((spec) => (
                  <span key={spec} className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: "#dbeafe", color: "#1e3a8a", border: "1px solid #bfdbfe" }}>
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />)}
                <span className="text-xs ml-1" style={{ color: "#64748b" }}>
                  {cfg.heroSocialProof ?? "+50 avaliações 5 estrelas no Google"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GARANTIA — azul escuro ── */}
      <div className="py-8" style={{ background: "#0c1b33" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              🛡️
            </div>
            <div>
              <p className="font-black text-xl text-white">Teste por 7 dias. Não melhorou nada? Devolução completa.</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Compre, aplique, veja se funciona. Se em 7 dias não sentir diferença — ou simplesmente não gostar — solicita reembolso pela Hotmart e recebe 100% de volta.{" "}
                <strong className="text-white">Sem perguntas. O risco é todo nosso.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PREÇO ── */}
      <section id="section-price" className="py-16 sm:py-20" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl sm:text-4xl" style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
              Quanto você já gastou<br />tentando resolver?
            </h2>
            <p className="mt-3 text-base" style={{ color: "#64748b" }}>
              Uma sessão de fisioterapia custa 15× mais que este guia — e termina em 60 minutos. O guia fica para sempre.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
            <div className="grid grid-cols-3 text-center text-xs font-bold uppercase tracking-widest px-4 py-3"
              style={{ background: "#f0f4ff", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
              <span className="text-left">Opção</span>
              <span>Custo</span>
              <span>Acesso</span>
            </div>
            {[
              { label: "1 sessão de fisioterapia", value: "R$ 150–300", access: "60 min", bad: true },
              { label: "Consulta ortopedista",     value: "R$ 300–500", access: "1 vez",  bad: true },
              { label: "Remédios / mês",           value: "R$ 80–200",  access: "temporário", bad: true },
              { label: "Este Guia",                value: currentPrice, access: "vitalício",  bad: false },
              { label: "Não fazer nada",           value: "Piora progressiva", access: "sem fim", bad: true, danger: true },
            ].map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-3 items-center px-4 py-3.5"
                style={{
                  background: item.bad ? (item.danger ? "#fff5f5" : "#fff") : "#f0fdf4",
                  borderTop: i > 0 ? "1px solid #f1f5f9" : undefined,
                  borderBottom: !item.bad ? "2px solid #86efac" : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  {item.bad
                    ? <X className={`h-4 w-4 shrink-0 ${item.danger ? "text-red-600" : "text-red-400"}`} />
                    : <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                  }
                  <span className="text-sm"
                    style={{ color: item.bad ? (item.danger ? "#991b1b" : "#64748b") : "#0c1b33", fontWeight: item.bad ? 400 : 700 }}>
                    {item.label}
                  </span>
                </div>
                <span className="text-center text-sm font-bold"
                  style={{ color: item.bad ? (item.danger ? "#dc2626" : "#ef4444") : "#16a34a" }}>
                  {item.value}
                </span>
                <span className="text-center text-xs"
                  style={{ color: item.bad ? (item.danger ? "#ef4444" : "#94a3b8") : "#64748b" }}>
                  {item.access}
                </span>
              </div>
            ))}
          </div>

          {/* Por que tão barato? */}
          <div className="mt-6 rounded-2xl p-5" style={{ background: "#f0f4ff", border: "1px solid #bfdbfe" }}>
            <p className="font-bold text-sm mb-1.5" style={{ color: "#1e3a8a" }}>Por que tão barato?</p>
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              Porque o objetivo é que o máximo de pessoas com hérnia tenha acesso — não só quem pode pagar consulta particular. O conteúdo é o mesmo que aplico no consultório. O formato digital é o que permite esse preço.
            </p>
          </div>

          {/* Box de compra */}
          <div className="mt-8 rounded-3xl p-6 sm:p-8 text-center"
            style={{ background: "#0c1b33", border: "2px solid #1e3a8a" }}>
            <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>
              Preço de pré-lançamento · 47 vagas
            </p>
            <p className="text-sm line-through" style={{ color: "rgba(255,255,255,0.30)" }}>De {originalPrice}</p>
            <p className="font-black leading-none mt-1"
              style={{ fontSize: "clamp(3.5rem, 10vw, 5rem)", color: "#ea580c", letterSpacing: "-0.03em" }}>
              {currentPrice}
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              ou {installments} · acesso vitalício
            </p>
            <p className="mt-1 text-xs font-medium" style={{ color: "rgba(234,88,12,0.70)" }}>
              menos de R$ 0,66 por dia durante um mês
            </p>
            <div className="mt-6">
              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange relative inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-xl font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ width: "100%", maxWidth: 460, background: "#ea580c" }}
              >
                QUERO ALIVIAR MINHA DOR AGORA
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>
            <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Hotmart · Garantia 7 dias · Acesso imediato
            </p>
            <p className="mt-2 text-xs font-semibold" style={{ color: "rgba(234,88,12,0.60)" }}>
              Com dúvidas? Fale com o Dr. Guilherme pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="section-faq" className="py-14 sm:py-20" style={{ background: "#f0f4ff" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-black text-2xl sm:text-3xl text-center mb-2"
            style={{ color: "#0c1b33", letterSpacing: "-0.02em" }}>
            Perguntas frequentes
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "#64748b" }}>
            Tudo o que você precisa saber antes de comprar
          </p>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-2">
            {activeFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden border-0"
                style={{ background: "#fff", border: "1px solid #e2e8f0" }}
              >
                <AccordionTrigger
                  className="px-5 sm:px-6 py-4 text-sm sm:text-base font-bold hover:no-underline transition-colors text-left"
                  style={{ color: "#0c1b33" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-6 pb-4 text-sm leading-relaxed"
                  style={{ color: "#475569" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="section-final-cta" className="py-20 sm:py-28 relative" style={{ background: "#0c1b33" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(234,88,12,0.10) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(234,88,12,0.12)", border: "1px solid rgba(234,88,12,0.35)" }}>
            <Zap className="h-3.5 w-3.5" style={{ color: "#ea580c" }} />
            <span className="text-sm font-bold" style={{ color: "#ea580c" }}>Acesso imediato após pagamento</span>
          </div>

          <h2 className="font-black text-3xl sm:text-5xl text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Daqui a 5 minutos você pode estar<br />
            <span style={{ color: "#ea580c" }}>fazendo o primeiro exercício</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Você já sofreu o suficiente. Com garantia de 7 dias e devolução sem perguntas, o risco é todo nosso.
          </p>

          <div className="mt-8">
            <p className="text-sm line-through mb-1" style={{ color: "rgba(255,255,255,0.30)" }}>De {originalPrice}</p>
            <p className="font-black mb-1" style={{ color: "#ea580c", fontSize: "clamp(3rem, 8vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {currentPrice}
            </p>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.40)" }}>ou {installments}</p>

            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange relative inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-xl font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ width: "100%", maxWidth: 460, background: "#ea580c" }}
            >
              QUERO ALIVIAR MINHA DOR AGORA
              <ArrowRight className="h-5 w-5 shrink-0" />
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Shield className="h-4 w-4" />
            <span>Garantia incondicional de 7 dias · O risco é todo nosso</span>
          </div>

          <p className="mt-5 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
            Prefere tirar dúvidas antes?{" "}
            <a href={WHATSAPP_GUIDE_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: "#ea580c" }} className="hover:underline font-semibold">
              Fale com o Dr. Guilherme pelo WhatsApp →
            </a>
          </p>
        </div>
      </section>

      {/* ── URGÊNCIA FINAL ── */}
      <div className="py-4 text-center font-black text-sm" style={{ background: "#dc2626", color: "#fff" }}>
        ⚡ Oferta de pré-lançamento: apenas 47 vagas a {currentPrice} — depois sobe para {originalPrice}
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid #e2e8f0", color: "#94a3b8", fontSize: "0.75rem", background: "#fff" }}>
        © {new Date().getFullYear()} Dr. Guilherme Carvalho · CREFITO 1 318268-F · Todos os direitos reservados.
      </footer>

      <StickyCta />
    </div>
  )
}
