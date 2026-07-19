import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

export async function QuiroAbout() {
  const t = await getTranslations("quiro.about")

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
              className="object-cover"
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
        </Reveal>
      </div>
    </section>
  )
}
