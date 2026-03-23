"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [time, setTime] = useState({ h: 47, m: 59, s: 59 })

  useEffect(() => {
    const KEY = "guia_countdown_end"
    let endTime = Number(localStorage.getItem(KEY) || "0")
    if (!endTime || endTime < Date.now()) {
      endTime = Date.now() + 48 * 60 * 60 * 1000
      localStorage.setItem(KEY, String(endTime))
    }

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now())
      if (diff === 0) {
        endTime = Date.now() + 48 * 60 * 60 * 1000
        localStorage.setItem(KEY, String(endTime))
      }
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <span className="inline-flex items-center gap-1 font-mono font-bold tabular-nums">
      <span className="bg-black/20 rounded px-1">{pad(time.h)}</span>
      <span>:</span>
      <span className="bg-black/20 rounded px-1">{pad(time.m)}</span>
      <span>:</span>
      <span className="bg-black/20 rounded px-1">{pad(time.s)}</span>
    </span>
  )
}
