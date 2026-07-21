import Image from "next/image"
import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"

export async function QuiroAbout() {
  const t = await getTranslations("quiro.about")
  const features = [t("f1"), t("f2"), t("f3"), t("f4")]

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal section="about">
          <div className="relative aspect-[9/11] max-w-md overflow-hidden rounded-2xl border border-[var(--q-bone-border)]">
            <Image
              src="/quiropraxia/dr-guilherme.webp"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-terracotta)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-ink)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--q-ink-muted)]">{t("p1")}</p>
          <p className="mt-4 leading-relaxed text-[var(--q-ink-muted)]">{t("p2")}</p>
          <p className="mt-4 leading-relaxed text-[var(--q-ink-muted)]">{t("p3")}</p>

          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--q-copper)]/15">
                  <Check className="h-4 w-4 text-[var(--q-terracotta)]" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-[var(--q-ink)] sm:text-base">{f}</span>
              </li>
            ))}
          </ul>

          <QuiroWhatsButton location="about" className="mt-8">
            {t("cta")}
          </QuiroWhatsButton>
        </Reveal>
      </div>
    </section>
  )
}
