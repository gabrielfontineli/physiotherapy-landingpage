import { MapPin, Clock, ArrowUpRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Rua+Jo%C3%A3o+Pessoa%2C+198%2C+Cidade+Alta%2C+Natal%2C+RN"

export async function QuiroLocation() {
  const t = await getTranslations("quiro.location")

  return (
    <section id="localizacao" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="location" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2">
          <div className="h-72 overflow-hidden rounded-2xl border border-[var(--q-border)] lg:h-auto">
            <iframe
              src="https://maps.google.com/maps?q=Rua+Jo%C3%A3o+Pessoa%2C+198%2C+Cidade+Alta%2C+Natal%2C+RN%2C+Brasil&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--q-copper)]" />
              <div>
                <h3 className="font-semibold text-[var(--q-text)]">{t("addressLabel")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--q-muted)]">
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                </p>
                <p className="mt-1.5 text-xs text-[var(--q-muted)]">{t("addressNote")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] p-6">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--q-copper)]" />
              <div>
                <h3 className="font-semibold text-[var(--q-text)]">{t("hoursLabel")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--q-muted)]">
                  {t("hoursText")}
                  <br />
                  {t("hoursText2")}
                </p>
              </div>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--q-copper)] px-7 py-3.5 text-sm font-semibold text-[var(--q-copper)] transition-colors hover:bg-[var(--q-copper)] hover:text-[var(--q-bg)]"
            >
              {t("directions")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
