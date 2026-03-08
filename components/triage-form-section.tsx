"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Clock, CheckCircle2, Send, Phone, ArrowRight, XCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5584999999999"
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`

const WA_ICON = (
  <svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// Mask: (XX) XXXXX-XXXX
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ""
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const FLAGS_CAUDA_EQUINA = [
  "Perda de controle urinário ou fecal",
  "Dormência na região íntima (sela)",
]
const FLAGS_SURGICAL = [
  "Perda de força significativa em perna ou braço",
]

type FormAlert = "cauda-equina" | "surgery-indicated" | null

// Reusable card option for radio groups
function RadioCard({
  value,
  selected,
  children,
}: {
  value: string
  selected: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors cursor-pointer ${
        selected
          ? "border-primary bg-primary/8 text-foreground"
          : "border-border bg-background hover:border-primary/40 text-foreground"
      }`}
    >
      <RadioGroupItem value={value} id={`rc-${value}`} className="shrink-0" />
      <Label htmlFor={`rc-${value}`} className="cursor-pointer text-sm font-normal leading-snug w-full">
        {children}
      </Label>
    </div>
  )
}

export function TriageFormSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formAlert, setFormAlert] = useState<FormAlert>(null)

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    cidade: "",
    profissao: "",
    whatsapp: "",
    localDor: "",
    irradiacao: "",
    tempoDor: "",
    nivelDor: "",
    sinaisAlerta: [] as string[],
    exameImagem: "",
    diagnostico: "",
    cirurgiaIndicada: "",
    tratamentos: [] as string[],
    melhorou: "",
    pioraCom: [] as string[],
    atividadeFisica: "",
    atividadeFisicaOutra: "",
    expectativa: "",
    dispostoInvestir: "",
  })

  const totalSteps = 7

  const set = (field: string, value: string | string[]) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const toggle = (field: string, value: string) => {
    const arr = formData[field as keyof typeof formData] as string[]
    set(field, arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
  }

  // Real-time red-flag detection on sinaisAlerta
  const handleSinal = (option: string) => {
    const arr = formData.sinaisAlerta
    const checking = !arr.includes(option)
    const next = checking ? [...arr, option] : arr.filter(v => v !== option)
    set("sinaisAlerta", next)
    if (checking) {
      if (FLAGS_CAUDA_EQUINA.includes(option)) { setFormAlert("cauda-equina"); return }
      if (FLAGS_SURGICAL.includes(option)) { setFormAlert("surgery-indicated"); return }
    }
  }

  // Real-time surgery detection
  const handleCirurgia = (value: string) => {
    set("cirurgiaIndicada", value)
    if (value === "Sim") setFormAlert("surgery-indicated")
  }

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(p => p + 1) }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(p => p - 1) }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // ── CAUDA EQUINA ──────────────────────────────────────────────────────────
  if (formAlert === "cauda-equina") {
    return (
      <section id="triagem" className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border-2 border-destructive/70 bg-destructive/5 p-8 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center text-balance">
              Procure um pronto-socorro agora
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed text-center text-pretty">
              Os sintomas que você indicou podem ser sinal de{" "}
              <strong>Síndrome da Cauda Equina</strong> — uma emergência neurológica.
            </p>
            <div className="mt-6 rounded-xl bg-destructive/10 border border-destructive/30 p-5 space-y-1.5">
              <p className="text-sm font-semibold text-foreground mb-2">Por que não é caso de teleconsulta:</p>
              <ul className="text-sm text-foreground/80 list-disc list-inside space-y-1 leading-relaxed">
                <li>Risco de sequelas neurológicas permanentes</li>
                <li>Requer avaliação médica e exame físico imediato</li>
                <li>Pode necessitar de cirurgia de emergência — o tempo é crítico</li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold">
                <a href="tel:192"><Phone className="mr-2 h-5 w-5" />Ligar para o SAMU — 192</a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                setFormAlert(null)
                set("sinaisAlerta", formData.sinaisAlerta.filter(s => !FLAGS_CAUDA_EQUINA.includes(s)))
                setCurrentStep(3)
              }}>
                Errei a resposta — voltar
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── INDICAÇÃO CIRÚRGICA ───────────────────────────────────────────────────
  if (formAlert === "surgery-indicated") {
    const msg = encodeURIComponent(
      `Olá, Dr. Guilherme! Fiz a triagem online e o formulário identificou que meu caso pode ter indicação cirúrgica. Gostaria de entender melhor minhas opções.`
    )
    return (
      <section id="triagem" className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-8 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center text-balance">
              O atendimento online não é o indicado para você
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed text-center text-pretty">
              Suas respostas indicam <strong>sintomas que sugerem indicação cirúrgica</strong> ou comprometimento
              neurológico significativo. Esse perfil requer avaliação presencial.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-card border border-border p-4">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <strong className="text-foreground">Por que não é indicado online:</strong>{" "}
                  Casos com indicação cirúrgica exigem exame físico, análise de imagem ao vivo e
                  comunicação direta com o cirurgião. Isso não pode ser feito com segurança à distância.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-card border border-border p-4">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <strong className="text-foreground">O que pode ser feito:</strong>{" "}
                  Fisioterapia presencial pode ser uma alternativa conservadora antes da cirurgia,
                  ou reabilitação pós-operatória. Entre em contato para discutir seu caso.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold">
                <a href={`${WA_BASE}${msg}`} target="_blank" rel="noopener noreferrer">
                  {WA_ICON}Falar com o Dr. Guilherme
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                setFormAlert(null)
                if (formData.cirurgiaIndicada === "Sim") {
                  set("cirurgiaIndicada", "")
                  setCurrentStep(4)
                } else {
                  set("sinaisAlerta", formData.sinaisAlerta.filter(s => !FLAGS_SURGICAL.includes(s)))
                  setCurrentStep(3)
                }
              }}>
                Errei a resposta — voltar
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── SUCESSO ───────────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <section id="triagem" className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Triagem enviada!</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Analisarei suas respostas e entrarei em contato pelo WhatsApp em até 24 horas.
            </p>
            <Button asChild size="lg" className="mt-8 bg-[#25D366] hover:bg-[#20BD5A] text-white">
              <a href={`${WA_BASE}${encodeURIComponent("Olá! Acabei de enviar o formulário de triagem.")}`} target="_blank" rel="noopener noreferrer">
                {WA_ICON}Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // ── FORMULÁRIO ────────────────────────────────────────────────────────────
  return (
    <section id="triagem" className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Teleconsulta</span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Triagem — Hérnia de Disco
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Pré-triagem para teleconsulta sobre hérnia de disco, dor lombar, cervical ou ciática. Menos de 5 minutos.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Etapa {currentStep} de {totalSteps}</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />~5 min
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">

          {/* ── STEP 1 ── */}
          {currentStep === 1 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                1 / {totalSteps} — Identificação
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome" className="font-medium text-foreground">Nome completo *</Label>
                  <Input id="nome" value={formData.nome} onChange={e => set("nome", e.target.value)}
                    placeholder="Digite seu nome completo" className="mt-1.5 h-10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="idade" className="font-medium text-foreground">Idade *</Label>
                    <Input id="idade" type="number" value={formData.idade} onChange={e => set("idade", e.target.value)}
                      placeholder="Ex: 35" className="mt-1.5 h-10" />
                  </div>
                  <div>
                    <Label htmlFor="cidade" className="font-medium text-foreground">Cidade/UF *</Label>
                    <Input id="cidade" value={formData.cidade} onChange={e => set("cidade", e.target.value)}
                      placeholder="Ex: Natal/RN" className="mt-1.5 h-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="profissao" className="font-medium text-foreground">Profissão *</Label>
                  <Input id="profissao" value={formData.profissao} onChange={e => set("profissao", e.target.value)}
                    placeholder="Digite sua profissão" className="mt-1.5 h-10" />
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="font-medium text-foreground">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={e => set("whatsapp", maskPhone(e.target.value))}
                    placeholder="(84) 99999-9999"
                    className="mt-1.5 h-10"
                    maxLength={15}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {currentStep === 2 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                2 / {totalSteps} — Sobre sua dor
              </p>
              <div className="space-y-6">
                <div>
                  <Label className="font-medium text-foreground block mb-2.5">Onde é a principal dor? *</Label>
                  <RadioGroup value={formData.localDor} onValueChange={v => set("localDor", v)} className="space-y-2">
                    {["Lombar (parte mais baixa da coluna)", "Cervical (pescoço)", "Torácica (meio das costas)", "Irradia para a perna", "Irradia para o braço"].map(opt => (
                      <RadioCard key={opt} value={opt} selected={formData.localDor === opt}>{opt}</RadioCard>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="font-medium text-foreground block mb-2.5">A dor irradia para perna ou braço? *</Label>
                  <RadioGroup value={formData.irradiacao} onValueChange={v => set("irradiacao", v)} className="space-y-2">
                    {["Não", "Sim, até a coxa", "Sim, até o joelho", "Sim, até o pé", "Sim, até a mão"].map(opt => (
                      <RadioCard key={opt} value={opt} selected={formData.irradiacao === opt}>{opt}</RadioCard>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="font-medium text-foreground block mb-2.5">Há quanto tempo sente dor? *</Label>
                  <RadioGroup value={formData.tempoDor} onValueChange={v => set("tempoDor", v)} className="grid grid-cols-2 gap-2">
                    {["Menos de 7 dias", "1 a 4 semanas", "1 a 3 meses", "Mais de 3 meses"].map(opt => (
                      <RadioCard key={opt} value={opt} selected={formData.tempoDor === opt}>{opt}</RadioCard>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="font-medium text-foreground block mb-2.5">Nível de dor (0 = sem dor, 10 = máxima) *</Label>
                  <div className="flex flex-wrap gap-2">
                    {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => set("nivelDor", String(num))}
                        className={`h-11 w-11 rounded-lg border-2 text-sm font-semibold transition-all ${
                          formData.nivelDor === String(num)
                            ? "border-primary bg-primary text-primary-foreground scale-110"
                            : num >= 8 ? "border-destructive/40 bg-destructive/5 text-foreground hover:border-destructive"
                            : num >= 5 ? "border-accent/40 bg-accent/5 text-foreground hover:border-accent"
                            : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                      >{num}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {currentStep === 3 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                3 / {totalSteps} — Sinais de alerta
              </p>
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 p-4 mb-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                    Responda com atenção.{" "}
                    <strong>Alguns sintomas encerrarão o formulário imediatamente</strong> e
                    redirecionarão para o atendimento correto.
                  </p>
                </div>
              </div>
              <Label className="font-medium text-foreground block mb-3">
                Você apresenta algum desses sintomas? *
              </Label>
              <div className="space-y-2">
                {[
                  { label: "Perda de força significativa em perna ou braço", danger: true },
                  { label: "Perda de controle urinário ou fecal", danger: true },
                  { label: "Dormência na região íntima (sela)", danger: true },
                  { label: "Febre associada à dor nas costas", danger: false },
                  { label: "Nenhum desses", danger: false },
                ].map(({ label, danger }) => {
                  const checked = formData.sinaisAlerta.includes(label)
                  return (
                    <label
                      key={label}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 cursor-pointer transition-colors ${
                        checked && danger ? "border-destructive/60 bg-destructive/5"
                          : checked ? "border-primary bg-primary/8"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleSinal(label)}
                        className="mt-0.5 shrink-0"
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-foreground leading-relaxed">{label}</span>
                        {danger && (
                          <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                            sinal de alerta
                          </span>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4 ── */}
          {currentStep === 4 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                4 / {totalSteps} — Diagnóstico
              </p>
              <div className="space-y-5">
                <div>
                  <Label className="font-medium text-foreground block mb-2.5">Você já realizou exame de imagem? *</Label>
                  <RadioGroup value={formData.exameImagem} onValueChange={v => set("exameImagem", v)} className="grid grid-cols-2 gap-2">
                    {["Não", "Ressonância", "Tomografia", "Raio-X"].map(opt => (
                      <RadioCard key={opt} value={opt} selected={formData.exameImagem === opt}>{opt}</RadioCard>
                    ))}
                  </RadioGroup>
                </div>

                {formData.exameImagem && formData.exameImagem !== "Não" && (
                  <div>
                    <Label htmlFor="diagnostico" className="font-medium text-foreground">
                      Qual o diagnóstico descrito no laudo?
                    </Label>
                    <Textarea
                      id="diagnostico"
                      value={formData.diagnostico}
                      onChange={e => set("diagnostico", e.target.value)}
                      placeholder="Ex: hérnia de disco L4-L5 com compressão radicular..."
                      className="mt-1.5 min-h-[80px]"
                    />
                  </div>
                )}

                <div className="rounded-xl bg-muted/50 border border-border p-5">
                  <Label className="font-semibold text-foreground block mb-3">
                    Algum médico já indicou cirurgia para o seu caso? *
                  </Label>
                  <RadioGroup value={formData.cirurgiaIndicada} onValueChange={handleCirurgia} className="space-y-2">
                    {[
                      { v: "Não", desc: "Nenhum médico recomendou cirurgia" },
                      { v: "Sim", desc: "Tenho indicação cirúrgica" },
                      { v: "Em avaliação", desc: "Ainda estou sendo avaliado" },
                    ].map(({ v, desc }) => (
                      <div
                        key={v}
                        className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 transition-colors ${
                          formData.cirurgiaIndicada === v
                            ? v === "Sim"
                              ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600"
                              : "border-primary bg-primary/8"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={v} id={`cir-${v}`} className="mt-0.5 shrink-0" />
                        <Label htmlFor={`cir-${v}`} className="cursor-pointer">
                          <span className="text-sm font-medium text-foreground">{v}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5 ── */}
          {currentStep === 5 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                5 / {totalSteps} — Tratamentos realizados
              </p>
              <div className="space-y-5">
                <div>
                  <Label className="font-medium text-foreground block mb-3">Quais tratamentos você já fez? *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Medicamentos", "Infiltração", "Fisioterapia", "Pilates", "Cirurgia", "Nenhum"].map(opt => {
                      const checked = formData.tratamentos.includes(opt)
                      return (
                        <label key={opt} className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                          checked ? "border-primary bg-primary/8 text-foreground" : "border-border bg-background hover:border-primary/40 text-foreground"
                        }`}>
                          <Checkbox checked={checked} onCheckedChange={() => toggle("tratamentos", opt)} />
                          <span className="text-sm">{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-foreground block mb-3">Com esses tratamentos melhorou? *</Label>
                  <RadioGroup value={formData.melhorou} onValueChange={v => set("melhorou", v)} className="grid grid-cols-3 gap-2">
                    {[{ v: "Sim", e: "✅" }, { v: "Parcialmente", e: "🔶" }, { v: "Não", e: "❌" }].map(({ v, e }) => (
                      <div key={v} className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-4 transition-colors ${
                        formData.melhorou === v ? "border-primary bg-primary/8" : "border-border bg-background hover:border-primary/40"
                      }`}>
                        <RadioGroupItem value={v} id={`mel-${v}`} className="sr-only" />
                        <Label htmlFor={`mel-${v}`} className="cursor-pointer text-center">
                          <span className="text-xl block">{e}</span>
                          <span className="text-xs font-medium text-foreground mt-1 block">{v}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 6 ── */}
          {currentStep === 6 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                6 / {totalSteps} — Fatores mecânicos
              </p>
              <div className="space-y-5">
                <div>
                  <Label className="font-medium text-foreground block mb-3">A dor piora quando: *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Fica muito tempo sentado", "Fica em pé", "Se abaixa", "Carrega peso", "Dirige", "Ao acordar", "Não sei identificar"].map(opt => {
                      const checked = formData.pioraCom.includes(opt)
                      return (
                        <label key={opt} className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                          checked ? "border-primary bg-primary/8 text-foreground" : "border-border bg-background hover:border-primary/40 text-foreground"
                        }`}>
                          <Checkbox checked={checked} onCheckedChange={() => toggle("pioraCom", opt)} />
                          <span className="text-sm">{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-foreground block mb-3">Pratica atividade física? *</Label>
                  <RadioGroup value={formData.atividadeFisica} onValueChange={v => set("atividadeFisica", v)} className="grid grid-cols-2 gap-2">
                    {["Não", "Musculação", "Caminhada", "Outra"].map(opt => (
                      <RadioCard key={opt} value={opt} selected={formData.atividadeFisica === opt}>{opt}</RadioCard>
                    ))}
                  </RadioGroup>
                  {formData.atividadeFisica === "Outra" && (
                    <Input value={formData.atividadeFisicaOutra} onChange={e => set("atividadeFisicaOutra", e.target.value)}
                      placeholder="Qual atividade?" className="mt-2.5 h-10" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 7 ── */}
          {currentStep === 7 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                7 / {totalSteps} — Expectativa
              </p>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="expectativa" className="font-medium text-foreground">
                    O que você espera da teleconsulta? *
                  </Label>
                  <Textarea
                    id="expectativa"
                    value={formData.expectativa}
                    onChange={e => set("expectativa", e.target.value)}
                    placeholder="Descreva seus objetivos com o tratamento..."
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
                <div className="rounded-xl bg-muted/50 border border-border p-5">
                  <p className="text-xs text-muted-foreground mb-3">O acompanhamento é particular.</p>
                  <Label className="font-semibold text-foreground block mb-3">
                    Está disposto(a) a investir na sua recuperação agora? *
                  </Label>
                  <RadioGroup value={formData.dispostoInvestir} onValueChange={v => set("dispostoInvestir", v)} className="space-y-2">
                    {[
                      { v: "Sim", desc: "Estou pronto para começar" },
                      { v: "Preciso saber os valores", desc: "Quero conhecer os preços primeiro" },
                      { v: "Não no momento", desc: "Ainda não estou decidido" },
                    ].map(({ v, desc }) => (
                      <div key={v} className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 transition-colors ${
                        formData.dispostoInvestir === v ? "border-primary bg-primary/8" : "border-border bg-background hover:border-primary/40"
                      }`}>
                        <RadioGroupItem value={v} id={`inv-${v}`} className="mt-0.5 shrink-0" />
                        <Label htmlFor={`inv-${v}`} className="cursor-pointer">
                          <span className="text-sm font-medium text-foreground">{v}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Essa triagem não substitui avaliação médica presencial em casos de urgência.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="px-6">
              Voltar
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="px-6">
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="px-6">
                {isSubmitting ? "Enviando..." : <><Send className="mr-2 h-4 w-4" />Enviar Triagem</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
