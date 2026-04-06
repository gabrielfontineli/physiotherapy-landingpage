import { MessageCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { FinalCtaButtons } from "@/components/final-cta-buttons"

export async function FinalCtaSection() {
  const t = await getTranslations("finalCta")

  return (
    <section className="py-16 md:py-24 bg-[oklch(0.16_0.035_240)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <MessageCircle className="mx-auto h-12 w-12 text-accent mb-6" />

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
          {t("title")}
        </h2>

        <p className="mt-4 text-lg text-white/70 text-pretty max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <FinalCtaButtons ctaWhatsapp={t("ctaWhatsapp")} ctaOnline={t("ctaOnline")} />

        <p className="mt-6 text-sm text-white/50">
          {t("note")}
        </p>
      </div>
    </section>
  )
}
