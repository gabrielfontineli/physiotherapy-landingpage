import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { WHATSAPP_URL } from "@/lib/config"

export async function ExpectSection() {
  const t = await getTranslations("expect")

  const benefits = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
  ]

  const techniques = [
    t("tech1"),
    t("tech2"),
    t("tech3"),
    t("tech4"),
    t("tech5"),
    t("tech6"),
  ]

  return (
    <section className="py-16 md:py-28 bg-[oklch(0.35_0.10_190)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
              {t("tagline")}
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80 text-pretty">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-white font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
            {techniques.map((technique) => (
              <div
                key={technique}
                className="flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-4 sm:p-6 text-center"
              >
                <span className="font-semibold text-white text-sm">{technique}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
