import { Wallet, UserRound, ClipboardList, MapPin, HeartHandshake } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const items = [
  ["item1", Wallet],
  ["item2", UserRound],
  ["item3", ClipboardList],
  ["item4", MapPin],
  ["item5", HeartHandshake],
] as const

export async function TrustBar() {
  const t = await getTranslations("quiro.trust")

  return (
    <section className="border-y border-[var(--q-border)] bg-[var(--q-bg-alt)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Reveal section="trust_bar">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map(([key, Icon]) => (
              <li
                key={key}
                className="q-card-hover flex items-center gap-3 rounded-xl border border-[var(--q-border)] bg-[var(--q-card)] px-4 py-3.5"
              >
                <Icon className="h-5 w-5 shrink-0 text-[var(--q-copper)]" />
                <span className="text-xs font-medium text-[var(--q-text)] sm:text-sm">{t(key)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
