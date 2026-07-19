"use client"

import { useEffect, useState } from "react"

// Fonte única do vídeo de fundo do hero. Escolhe mobile/desktop por viewport
// só depois do mount, então apenas UM arquivo baixa (antes ambos <video> em
// DOM baixavam junto = ~6.7MB no mobile e matavam o LCP). Poster pinta no SSR.
const MOBILE = { src: "/quiropraxia/hero-mobile.mp4", poster: "/quiropraxia/hero-mobile-poster.webp" }
const DESKTOP = { src: "/quiropraxia/hero.mp4", poster: "/quiropraxia/hero-poster.webp" }

export function QuiroHeroVideo({ ariaLabel }: { ariaLabel: string }) {
  const [media, setMedia] = useState<typeof MOBILE | null>(null)

  useEffect(() => {
    setMedia(window.matchMedia("(min-width: 768px)").matches ? DESKTOP : MOBILE)
  }, [])

  return (
    <video
      key={media?.src ?? "ssr"}
      className="q-hero-media h-full w-full object-cover object-center md:object-[75%_center]"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={(media ?? MOBILE).poster}
      aria-label={ariaLabel}
    >
      {/* ponytail: sem <source> no SSR de propósito — evita baixar o vídeo errado antes do matchMedia */}
      {media && <source src={media.src} type="video/mp4" />}
    </video>
  )
}
