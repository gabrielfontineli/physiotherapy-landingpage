"use client"

import { useState } from "react"
import { Play } from "lucide-react"

// Vídeo sob demanda: só o poster (webp, loading="lazy") carrega até o clique.
// Off-screen num carrossel o browser nem baixa o poster. Nenhum byte de vídeo
// nem <video> em DOM antes do play — zero autoplay fora do viewport.
export function LazyVideo({
  src,
  poster,
  className = "",
  ariaLabel,
}: {
  src: string
  poster: string
  className?: string
  ariaLabel: string
}) {
  const [play, setPlay] = useState(false)

  if (play) {
    return (
      <video
        className={className}
        controls
        autoPlay
        preload="auto"
        poster={poster}
        aria-label={ariaLabel}
      >
        <source src={src} type="video/mp4" />
      </video>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={ariaLabel}
      className={`group relative block overflow-hidden ${className}`}
    >
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 ring-1 ring-white/30 backdrop-blur-sm transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
        </span>
      </span>
    </button>
  )
}
