import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"

export async function QuiroFinalCta() {
  const t = await getTranslations("quiro.finalCta")

  return (
    <section className="relative overflow-hidden bg-[var(--q-bg-alt)] py-20 md:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgb(196_127_78/0.22),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal section="final_cta">
          <h2 className="font-serif text-3xl font-bold text-[var(--q-text)] text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--q-muted)] sm:text-lg">
            {t("text")}
          </p>
          <div className="mt-9">
            <QuiroWhatsButton location="final_cta" className="px-10 py-4 text-base">
              {t("cta")}
            </QuiroWhatsButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
