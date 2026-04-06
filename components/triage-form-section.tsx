"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { WHATSAPP_BASE } from "@/lib/config"
import { track } from "@/lib/analytics"

const WA_BASE = WHATSAPP_BASE

const WA_ICON = (
  <svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "alert" | "done"

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function TriageFormSection() {
  const t = useTranslations("triage")
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [alertFlags, setAlertFlags] = useState<string[]>([])

  const TOTAL = 7

  const DANGER_FLAGS = [t("d1"), t("d2"), t("d3"), t("d4"), t("d5")]

  const SIMPLE_QUESTIONS = [
    {
      q: 1,
      label: t("q1label"),
      options: [t("q1o1"), t("q1o2"), t("q1o3"), t("q1o4")],
    },
    {
      q: 2,
      label: t("q2label"),
      options: [t("q2o1"), t("q2o2"), t("q2o3"), t("q2o4")],
    },
    {
      q: 3,
      label: t("q3label"),
      options: [t("q3o1"), t("q3o2"), t("q3o3"), t("q3o4")],
    },
    {
      q: 4,
      label: t("q4label"),
      options: [t("q4o1"), t("q4o2"), t("q4o3"), t("q4o4"), t("q4o5")],
    },
    {
      q: 5,
      label: t("q5label"),
      options: [t("q5o1"), t("q5o2"), t("q5o3"), t("q5o4")],
    },
  ]

  const QUESTION_LABELS: Record<number, string> = {
    1: t("label1"),
    2: t("label2"),
    3: t("label3"),
    4: t("label4"),
    5: t("label5"),
    6: t("label6"),
    7: t("label7"),
  }

  function buildWaUrl(answers: Record<number, string>): string {
    const lines = [
      t("waGreeting"),
      "",
      t("waAnswers"),
      ...Object.entries(QUESTION_LABELS).map(
        ([q, label]) => `${q}. ${label}: ${answers[Number(q)] ?? "—"}`
      ),
    ]
    return WA_BASE + encodeURIComponent(lines.join("\n"))
  }

  const goTo = (s: Step) => setTimeout(() => setStep(s), 140)

  const handleSimple = (q: number, opt: string) => {
    if (q === 1) {
      track("triage_start")
    }
    track("triage_step_complete", { step: q })
    setAnswers((prev) => ({ ...prev, [q]: opt }))
    goTo((q + 1) as Step)
  }

  const handleAlertToggle = (flag: string) => {
    const noneText = t("dNone")
    if (flag === noneText) {
      setAlertFlags([noneText])
    } else {
      setAlertFlags((prev) => {
        const without = prev.filter((f) => f !== noneText)
        return without.includes(flag)
          ? without.filter((f) => f !== flag)
          : [...without, flag]
      })
    }
  }

  const confirmAlert = () => {
    const hasDanger = alertFlags.some((f) => DANGER_FLAGS.includes(f))
    if (hasDanger) {
      setAnswers((prev) => ({ ...prev, 6: alertFlags.join(", ") }))
      setStep("alert")
    } else {
      track("triage_step_complete", { step: 6 })
      setAnswers((prev) => ({ ...prev, 6: t("dNone") }))
      setStep(7)
    }
  }

  const handleFinal = (opt: string) => {
    track("triage_step_complete", { step: 7 })
    track("triage_complete")
    setAnswers((prev) => ({ ...prev, 7: opt }))
    goTo("done")
  }

  const currentQ = SIMPLE_QUESTIONS.find((q) => q.q === step)

  return (
    <section id="triagem" className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("tagline")}
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t("subtitle")}{" "}
            <strong className="text-foreground">{t("subtitleBold")}</strong>
          </p>
        </div>

        {/* Questions 1–5 */}
        {currentQ && (
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <ProgressBar
              current={currentQ.q}
              total={TOTAL}
              label={t("progress", { current: currentQ.q, total: TOTAL })}
            />
            <p className="text-base sm:text-lg font-semibold text-foreground mb-5">
              {currentQ.q}. {currentQ.label}
            </p>
            <div className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSimple(currentQ.q, opt)}
                  className={`w-full text-left rounded-xl border px-5 py-3.5 text-sm transition-all hover:border-primary/60 hover:bg-primary/5 ${
                    answers[currentQ.q] === opt
                      ? "border-primary bg-primary/8 text-foreground font-medium"
                      : "border-border bg-background text-foreground/80"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {currentQ.q > 1 && (
              <div className="mt-5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => setStep((currentQ.q - 1) as Step)}
                >
                  {t("back")}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Question 6 — Alert flags */}
        {step === 6 && (
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <ProgressBar
              current={6}
              total={TOTAL}
              label={t("progress", { current: 6, total: TOTAL })}
            />

            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 p-4 mb-5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                  {t("alertNotice")}{" "}
                  <strong>{t("alertNoticeBold")}</strong>
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg font-semibold text-foreground mb-5">
              {t("q6label")}
            </p>

            <div className="space-y-2">
              {[...DANGER_FLAGS, t("dNone")].map((opt) => {
                const isDanger = DANGER_FLAGS.includes(opt)
                const checked = alertFlags.includes(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAlertToggle(opt)}
                    className={`w-full text-left rounded-xl border px-5 py-3.5 text-sm transition-all flex items-start gap-3 ${
                      checked && isDanger
                        ? "border-destructive/60 bg-destructive/5 text-foreground"
                        : checked
                        ? "border-primary bg-primary/8 text-foreground"
                        : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        checked
                          ? isDanger
                            ? "border-destructive bg-destructive"
                            : "border-primary bg-primary"
                          : "border-muted-foreground/40"
                      }`}
                    >
                      {checked && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isDanger && (
                      <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive shrink-0 mt-0.5">
                        {t("alertTag")}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setStep(5)}>
                {t("back")}
              </Button>
              <Button onClick={confirmAlert} disabled={alertFlags.length === 0} className="px-6">
                {t("confirm")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Question 7 */}
        {step === 7 && (
          <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <ProgressBar
              current={7}
              total={TOTAL}
              label={t("progress", { current: 7, total: TOTAL })}
            />
            <p className="text-base sm:text-lg font-semibold text-foreground mb-5">
              {t("q7label")}
            </p>
            <div className="space-y-2">
              {[t("q7o1"), t("q7o2"), t("q7o3"), t("q7o4")].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleFinal(opt)}
                  className={`w-full text-left rounded-xl border px-5 py-3.5 text-sm transition-all hover:border-primary/60 hover:bg-primary/5 ${
                    answers[7] === opt
                      ? "border-primary bg-primary/8 text-foreground font-medium"
                      : "border-border bg-background text-foreground/80"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setStep(6)}>
                {t("back")}
              </Button>
            </div>
          </div>
        )}

        {/* Alert screen */}
        {step === "alert" && (
          <div className="rounded-2xl border-2 border-amber-400/70 bg-amber-50 dark:bg-amber-950/20 p-8 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground text-center text-balance">
              {t("alertTitle")}
            </h3>
            <p className="mt-4 text-foreground/80 leading-relaxed text-center text-pretty">
              {t("alertSubtitle")}
            </p>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setAlertFlags([])
                  setStep(6)
                }}
              >
                {t("alertBack")}
              </Button>
            </div>
          </div>
        )}

        {/* Done screen */}
        {step === "done" && (
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-balance">
              {t("doneTitle")}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("doneSubtitle")}
            </p>
            <Button
              asChild
              size="lg"
              className="btn-glow-green mt-8 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold h-14 px-8"
            >
              <a
                href={buildWaUrl(answers)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "triage_done" })}
              >
                <span className="btn-shine" aria-hidden="true" />
                {WA_ICON}
                {t("doneCta")}
              </a>
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}
