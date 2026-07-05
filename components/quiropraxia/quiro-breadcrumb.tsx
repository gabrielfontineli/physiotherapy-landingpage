import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export async function QuiroBreadcrumb() {
  const t = await getTranslations("quiro.breadcrumb")

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <ol className="flex items-center gap-1.5 text-xs text-[var(--q-muted)]">
        <li>
          <Link href="/" className="transition-colors hover:text-[var(--q-copper)]">
            {t("home")}
          </Link>
        </li>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <li aria-current="page" className="text-[var(--q-text)]">
          {t("current")}
        </li>
      </ol>
    </nav>
  )
}
