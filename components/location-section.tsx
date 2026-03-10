import { MapPin, Clock, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { WHATSAPP_URL } from "@/lib/config"

export async function LocationSection() {
  const t = await getTranslations("location")

  return (
    <section id="localizacao" className="py-16 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("tagline")}
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            {t("title")}
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl overflow-hidden border border-border h-64 sm:h-80 lg:h-auto order-2 lg:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.023!2d-35.209!3d-5.786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDcnMTAuMCJTIDM1wrAxMic0MC4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-background p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("addressLabel")}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                  <br />
                  {t("addressLine3")}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("addressNote")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-background p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("hoursLabel")}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {t("hoursText")}
                  <br />
                  {t("hoursText2")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-accent/40 bg-accent/5 p-4 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("importantLabel")}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {t("importantText")}
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
