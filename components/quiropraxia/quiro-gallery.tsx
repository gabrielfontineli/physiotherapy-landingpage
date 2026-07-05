import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/quiropraxia/reveal"

const photos = [1, 2, 3, 4, 5, 6, 7, 8] as const

export async function QuiroGallery() {
  const t = await getTranslations("quiro.gallery")

  return (
    <section className="bg-[var(--q-bone)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="gallery" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--q-terracotta)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-ink)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-4">
          {photos.map((n, i) => (
            <Reveal key={n} delay={(i % 4) * 60} className={i % 5 === 0 ? "md:row-span-2" : ""}>
              <div
                className={`relative overflow-hidden rounded-xl border border-[var(--q-bone-border)] ${
                  i % 5 === 0 ? "aspect-square md:aspect-[1/2.05]" : "aspect-square"
                }`}
              >
                <Image
                  src={`/quiropraxia/galeria-0${n}.webp`}
                  alt={t(`alt${n}`)}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
