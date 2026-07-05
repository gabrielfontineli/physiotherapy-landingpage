import { Star, MapPin, BadgeCheck } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { QuiroWhatsButton } from "@/components/quiropraxia/whats-button"

export async function QuiroHero() {
  const t = await getTranslations("quiro.hero")

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <div className="absolute inset-0 -z-10">
        <video
          className="q-hero-media h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/quiropraxia/hero-poster.webp"
          aria-label={t("videoAria")}
        >
          <source src="/quiropraxia/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--q-bg)] via-[var(--q-bg)]/75 to-[var(--q-bg)]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgb(196_127_78/0.14),transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.12] text-[var(--q-text)] text-balance sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--q-muted)] sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuiroWhatsButton location="hero">{t("ctaWhatsapp")}</QuiroWhatsButton>
            <a
              href="#localizacao"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--q-border)] px-7 py-3.5 text-sm font-semibold text-[var(--q-text)] transition-colors hover:border-[var(--q-copper)] hover:text-[var(--q-copper)]"
            >
              <MapPin className="h-4 w-4" />
              {t("ctaLocation")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="flex text-[var(--q-copper)]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="font-semibold text-[var(--q-text)]">{t("ratingLabel")}</span>
              <span className="text-[var(--q-muted)]">· {t("ratingCount")}</span>
            </span>
            <span className="flex items-center gap-2 text-[var(--q-muted)]">
              <BadgeCheck className="h-4 w-4 text-[var(--q-copper)]" />
              {t("credential")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
