import { getTranslations } from "next-intl/server"

export async function Footer() {
  const t = await getTranslations("footer")

  return (
    <footer className="border-t border-border bg-[oklch(0.12_0.03_240)] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="font-serif text-lg font-bold text-white">
              Dr. Guilherme Carvalho
            </p>
            <p className="mt-2 text-sm text-white/60">
              {t("title")}
            </p>
            <p className="mt-1 text-sm text-white/60">
              CREFITO 1 318268-F
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t("navLabel")}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              <a href="#sintomas" className="text-sm text-white/60 hover:text-white transition-colors">
                {t("navSymptoms")}
              </a>
              <a href="#tratamentos" className="text-sm text-white/60 hover:text-white transition-colors">
                {t("navTreatments")}
              </a>
              <a href="#sobre" className="text-sm text-white/60 hover:text-white transition-colors">
                {t("navAbout")}
              </a>
              <a href="#localizacao" className="text-sm text-white/60 hover:text-white transition-colors">
                {t("navLocation")}
              </a>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t("contactLabel")}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-sm text-white/60">
                {t("address1")}
              </p>
              <p className="text-sm text-white/60">
                {t("address2")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            {"© "}{new Date().getFullYear()} Dr. Guilherme Carvalho. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
