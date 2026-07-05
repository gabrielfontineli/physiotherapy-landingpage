import { MessageCircle, Instagram, Phone, MapPin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { WHATSAPP_QUIRO_URL, INSTAGRAM_URL } from "@/lib/config"

export async function QuiroFooter() {
  const t = await getTranslations("quiro.footer")
  const tNav = await getTranslations("quiro.header.nav")
  const phone = "+55 (84) 9 8191-0924"

  return (
    <footer className="border-t border-[var(--q-border)] bg-[#0b0c0e] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-lg font-bold text-[var(--q-text)]">Dr. Guilherme Carvalho</p>
          <p className="mt-1 text-sm text-[var(--q-muted)]">{t("role")}</p>
          <p className="mt-3 text-xs text-[var(--q-muted)]">{t("credential")}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">
            {t("contactLabel")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--q-muted)]">
            <li>
              <a
                href={WHATSAPP_QUIRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--q-copper)]"
              >
                <MessageCircle className="h-4 w-4" /> {t("whatsapp")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {phone}
            </li>
            {INSTAGRAM_URL && (
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--q-copper)]"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
            )}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Rua João Pessoa, 198 — Sala 406
                <br />
                Cidade Alta, Natal/RN
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--q-copper)]">
            {t("linksLabel")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--q-muted)]">
            <li><a href="#tratamos" className="hover:text-[var(--q-copper)]">{tNav("conditions")}</a></li>
            <li><a href="#tecnicas" className="hover:text-[var(--q-copper)]">{tNav("techniques")}</a></li>
            <li><a href="#depoimentos" className="hover:text-[var(--q-copper)]">{tNav("testimonials")}</a></li>
            <li><a href="#faq" className="hover:text-[var(--q-copper)]">{tNav("faq")}</a></li>
            <li><a href="#localizacao" className="hover:text-[var(--q-copper)]">{tNav("location")}</a></li>
            <li>
              <Link href="/" className="hover:text-[var(--q-copper)]">
                {t("backHome")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--q-border)] px-4 pt-6 sm:px-6">
        <p className="text-xs text-[var(--q-muted)]">
          © {new Date().getFullYear()} Dr. Guilherme Carvalho. {t("copyright")}
        </p>
      </div>
    </footer>
  )
}
