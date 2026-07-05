import { ClipboardCheck, Search, HandHeart, Dumbbell, TrendingUp } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const steps = [
  ["s1", ClipboardCheck],
  ["s2", Search],
  ["s3", HandHeart],
  ["s4", Dumbbell],
  ["s5", TrendingUp],
] as const

export async function ConsultSteps() {
  const t = await getTranslations("quiro.steps")

  return (
    <section className="bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal section="consult_steps" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="relative mt-12 space-y-8 border-l border-[var(--q-border)] pl-8 sm:mt-16">
          {steps.map(([key, Icon], i) => (
            <li key={key} className="relative">
              <Reveal delay={i * 80}>
                <span className="absolute -left-[3.05rem] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--q-copper)]/40 bg-[var(--q-card)]">
                  <Icon className="h-4 w-4 text-[var(--q-copper)]" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-serif text-lg font-bold text-[var(--q-text)]">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--q-muted)]">
                  {t(`${key}.text`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
