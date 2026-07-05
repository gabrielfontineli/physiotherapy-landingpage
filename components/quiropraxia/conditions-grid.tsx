import {
  Disc3,
  Activity,
  MoveVertical,
  Zap,
  PersonStanding,
  Grip,
  CircleDot,
  Accessibility,
  Trophy,
  Move,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const items = [
  ["hernia", Disc3],
  ["lombar", Activity],
  ["cervical", MoveVertical],
  ["ciatico", Zap],
  ["pescoco", PersonStanding],
  ["escapulas", Grip],
  ["ombro", CircleDot],
  ["quadril", Accessibility],
  ["atletas", Trophy],
  ["movimento", Move],
] as const

export async function ConditionsGrid() {
  const t = await getTranslations("quiro.conditions")

  return (
    <section id="tratamos" className="scroll-mt-20 bg-[var(--q-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="conditions" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm text-[var(--q-muted)] sm:text-base">{t("subtitle")}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map(([key, Icon], i) => (
            <li key={key}>
              <Reveal delay={(i % 5) * 60}>
                <div className="q-card-hover group flex h-full flex-col items-center gap-3 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] px-4 py-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--q-copper)]/10 transition-colors group-hover:bg-[var(--q-copper)]/20">
                    <Icon className="h-5 w-5 text-[var(--q-copper)]" />
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--q-text)]">{t(`items.${key}`)}</h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
