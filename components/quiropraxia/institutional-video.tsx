import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"
import { LazyVideo } from "@/components/quiropraxia/lazy-video"

export async function InstitutionalVideo() {
  const t = await getTranslations("quiro.video")

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal section="institutional_video">
          <LazyVideo
            src="/quiropraxia/video-institucional.mp4"
            poster="/quiropraxia/video-institucional-poster.webp"
            ariaLabel={t("videoAria")}
            className="mx-auto aspect-[9/16] w-full max-w-sm rounded-2xl border border-[var(--q-bone-border)] bg-[var(--q-ink)]"
          />
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
