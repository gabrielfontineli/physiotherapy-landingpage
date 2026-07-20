"use client"

import { useEffect, useState } from "react"
import { Star, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/quiropraxia/reveal"
import { LazyVideo } from "@/components/quiropraxia/lazy-video"

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

// Depoimentos em vídeo (reels self-hosted). `captionKey` aponta pra quiro.testimonials.videos.
// Carrossel horizontal + LazyVideo: só o poster carrega (lazy), e o <video> só
// monta no clique. Off-screen o browser nem baixa o poster.
const VIDEO_TESTIMONIALS = Array.from({ length: 8 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0")
  return {
    src: `/quiropraxia/reel-${n}.mp4`,
    poster: `/quiropraxia/reel-${n}-poster.webp`,
    captionKey: `videos.c${i + 1}`,
  }
})

export function QuiroTestimonials() {
  const t = useTranslations("quiro.testimonials")
  const [reviews, setReviews] = useState<GoogleReview[]>([])

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]))
  }, [])

  return (
    <section id="depoimentos" className="scroll-mt-20 bg-[var(--q-bg-alt)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal section="testimonials" className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold uppercase tracking-[0.25em] text-[var(--q-copper)]">
            {t("tagline")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--q-text)] text-balance sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[var(--q-muted)]">
            <span className="flex text-[var(--q-copper)]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            {t("ratingStatic")} · {t("subtitle")}
          </p>
        </Reveal>

        {VIDEO_TESTIMONIALS.length > 0 && (
          <>
            <Reveal section="video_testimonials" className="mt-12 text-center">
              <h3 className="font-serif text-xl font-bold text-[var(--q-text)] text-balance sm:text-2xl">
                {t("videoTitle")}
              </h3>
            </Reveal>
            <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
              {VIDEO_TESTIMONIALS.map((v) => (
                <figure key={v.src} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]">
                  <LazyVideo
                    src={v.src}
                    poster={v.poster}
                    ariaLabel={t("videoAria")}
                    className="aspect-[9/16] w-full rounded-2xl border border-[var(--q-border)] bg-[var(--q-ink)]"
                  />
                  <figcaption className="mt-2 px-1 text-xs leading-snug text-[var(--q-muted)] text-balance">
                    {t(v.captionKey)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {reviews.length > 0 && (
          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
            {reviews.map((r) => (
              <figure
                key={r.author_name + r.relative_time_description}
                className="w-[85%] shrink-0 snap-start rounded-2xl border border-[var(--q-border)] bg-[var(--q-card)] p-6 sm:w-[45%] lg:w-[31%]"
              >
                <span className="flex text-[var(--q-copper)]" aria-label={`${r.rating}/5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-[var(--q-muted)]">
                  “{r.text.length > 220 ? `${r.text.slice(0, 220)}…` : r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[var(--q-text)]">
                  {r.author_name}
                  <span className="ml-2 font-normal text-[var(--q-muted)]">
                    {r.relative_time_description}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-6 text-center">
          <a
            href="https://www.google.com/search?q=Dr.+Guilherme+Carvalho+Fisioterapeuta+Natal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--q-copper)] hover:underline"
          >
            {t("seeAll")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>
      </div>
    </section>
  )
}
