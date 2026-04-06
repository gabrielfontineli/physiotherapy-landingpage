import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { HeroCtaButtons } from "@/components/hero-cta-buttons"

export async function HeroSection() {
  const t = await getTranslations("hero")

  return (
    <section className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-dr-guilherme.png"
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          className="object-cover object-[85%_center] md:object-[60%_center] lg:object-center"
          priority
        />
        {/* Mobile: dark at bottom so content is readable, photo visible at top */}
        {/* Desktop: dark on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_240/0.98)] via-[oklch(0.08_0.03_240/0.80)] to-[oklch(0.08_0.03_240/0.15)] md:bg-none" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[oklch(0.08_0.03_240/0.90)] via-[oklch(0.08_0.03_240/0.50)] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16 md:py-28 relative z-10 w-full">
        <div className="max-w-2xl">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white text-balance">
            {t("titleMain")}{" "}
            <span className="text-accent">{t("titleAccent")}</span>
          </h1>

          <p className="mt-3 sm:mt-6 text-sm sm:text-lg md:text-xl leading-relaxed text-white/85 text-pretty max-w-xl hidden sm:block">
            {t("descriptionFull")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:hidden">
            {t("descriptionShort")}
          </p>

          <HeroCtaButtons ctaWhatsapp={t("ctaWhatsapp")} ctaOnline={t("ctaOnline")} />

          <div className="mt-5 sm:mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              {t("badge1")}
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              {t("badge2")}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              {t("badge3")}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              {t("badge4")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
