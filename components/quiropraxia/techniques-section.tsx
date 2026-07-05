import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const techniques = [
  ["quiropraxia", "tecnica-quiropraxia.webp"],
  ["osteopatia", "tecnica-osteopatia.webp"],
  ["dryNeedling", "tecnica-dry-needling.webp"],
  ["miofascial", "tecnica-miofascial.webp"],
  ["ventosa", "tecnica-ventosa.webp"],
  ["neural", "tecnica-neural.webp"],
  ["exercicios", "tecnica-exercicios.webp"],
] as const

export async function TechniquesSection() {
  const t = await getTranslations("quiro.techniques")

  return (
    <section id="tecnicas" className="scroll-mt-20 bg-[var(--q-bg-alt)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="techniques" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map(([key, img], i) => (
            <Reveal key={key} delay={(i % 3) * 80}>
              <article className="q-card-hover h-full overflow-hidden rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)]">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={`/quiropraxia/${img}`}
                    alt={t("imageAlt", { name: t(`items.${key}.name`) })}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[var(--q-text)]">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--q-muted)]">
                    {t(`items.${key}.text`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
