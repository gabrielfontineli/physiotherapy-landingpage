import { ArrowRight, Monitor, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { WHATSAPP_URL } from "@/lib/config"

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
          className="object-cover object-[75%_center] md:object-[60%_center] lg:object-center"
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

          <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="btn-glow-green bg-[#25D366] hover:bg-[#20BD5A] text-white text-base font-semibold px-6 sm:px-8 h-12 sm:h-14"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <span className="btn-shine" aria-hidden="true" />
                <svg className="relative mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="relative">{t("ctaWhatsapp")}</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="btn-glow-orange bg-amber-500 hover:bg-amber-600 text-white text-base font-semibold h-12 sm:h-14 shadow-sm"
            >
              <a href="#triagem" className="flex items-center">
                <span className="btn-shine btn-shine-delayed" aria-hidden="true" />
                <Monitor className="relative mr-2 h-5 w-5 shrink-0" />
                <span className="relative">{t("ctaOnline")}</span>
              </a>
            </Button>
          </div>

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
