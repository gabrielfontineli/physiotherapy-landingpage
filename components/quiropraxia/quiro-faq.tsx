import { Plus } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export async function QuiroFaq() {
  const t = await getTranslations("quiro.faq")

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal section="faq" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--q-border)] rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)]">
          {questions.map((n) => (
            <details key={n} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--q-text)] sm:text-base [&::-webkit-details-marker]:hidden">
                {t(`q${n}`)}
                <Plus className="h-4 w-4 shrink-0 text-[var(--q-copper)] transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--q-muted)]">{t(`a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
