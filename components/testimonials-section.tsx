"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import type { GoogleReview } from "@/app/api/reviews/route"

function detectCondition(text: string): string | null {
  const t = text.toLowerCase()
  if (t.includes("hérnia") || t.includes("hernia") || t.includes("disco")) return "Hérnia de Disco"
  if (t.includes("ciátic") || t.includes("ciatico") || t.includes("nervo ciático")) return "Nervo Ciático"
  if (t.includes("escoliose")) return "Escoliose"
  if (t.includes("cervical") || t.includes("pescoço")) return "Cervicalgia"
  if (t.includes("lombar") || t.includes("lombo") || t.includes("l4") || t.includes("l5")) return "Dor Lombar"
  if (t.includes("online") || t.includes("teleconsulta") || t.includes("teleatendimento") || t.includes("videochamada")) return "Teleatendimento"
  if (t.includes("coluna") || t.includes("costas")) return "Dor na Coluna"
  if (t.includes("disc") || t.includes("sciatica") || t.includes("herniation")) return "Disc Herniation"
  return null
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [totalRating, setTotalRating] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loadError, setLoadError] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews ?? [])
        if (data.rating) setTotalRating(data.rating)
        if (data.total) setTotalCount(data.total)
      })
      .catch(() => { setLoadError(true) })
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), 5000)
    const stop = () => clearInterval(timer)
    emblaApi.on("pointerDown", stop)
    return () => {
      clearInterval(timer)
      emblaApi.off("pointerDown", stop)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section
      id="depoimentos"
      className="py-16 md:py-28 bg-secondary/30"
      aria-label={t("sectionLabel")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-4">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {totalRating ? t("googleRating", { rating: totalRating.toFixed(1) }) : t("googleFallback")}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {totalCount ? t("subtitle", { count: totalCount }) : t("subtitleFallback")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={scrollPrev}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">{t("prev")}</span>
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={scrollNext}>
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">{t("next")}</span>
            </Button>
          </div>
        </div>

        {/* Embla carousel */}
        {loadError ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            {t("loadError")}
          </p>
        ) : reviews.length === 0 ? (
          <div className="flex gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="rounded-2xl border border-border bg-card h-52 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef} aria-live="polite" aria-atomic="false">
            <div className="flex -ml-4 sm:-ml-5">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-5"
                >
                  <div className="flex flex-col h-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {review.profile_photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="h-12 w-12 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base">
                            {getInitials(review.author_name)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{review.author_name}</p>
                          <p className="text-xs text-muted-foreground">{review.relative_time_description}</p>
                        </div>
                      </div>
                      <Quote className="h-7 w-7 text-primary/20 shrink-0" />
                    </div>

                    <div className="mt-4 flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="mt-4 flex-1 text-sm text-foreground/80 leading-relaxed line-clamp-5">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {detectCondition(review.text) && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {detectCondition(review.text)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={t("dotLabel", { index: index + 1 })}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=dr+guilherme+carvalho+fisioterapeuta+natal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t("viewAll")}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
