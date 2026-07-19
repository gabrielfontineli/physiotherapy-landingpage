import { getTranslations } from "next-intl/server"

// Faixa decorativa de rolagem infinita. Termos vêm de quiro.marquee.terms (pt/en).
export async function QuiroMarquee() {
  const t = await getTranslations("quiro.marquee")
  const terms = t.raw("terms") as string[]
  const loop = [...terms, ...terms]

  return (
    <div
      aria-hidden
      className="q-marquee overflow-hidden border-y border-[var(--q-border)] bg-[var(--q-bg-alt)] py-4"
    >
      <div className="q-marquee-track flex w-max items-center whitespace-nowrap">
        {loop.map((term, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif text-lg text-[var(--q-text)] sm:text-xl">{term}</span>
            <span className="mx-6 text-sm text-[var(--q-copper)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
