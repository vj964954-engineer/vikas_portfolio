"use client"
import { useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { ReadyCtx } from "./fx"

/* ── Falling code rain (canvas). Pauses off-screen, throttled to ~30fps, off for reduced-motion / data-saver / low-end devices. ── */
export function CodeRain({ className = "rain" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext("2d")
    if (!c || !ctx) return
    const n = navigator as any
    if (matchMedia("(prefers-reduced-motion:reduce)").matches || n.connection?.saveData || n.deviceMemory <= 2 || n.hardwareConcurrency <= 2) return

    const glyphs = "{}()[]<>;=+-*/&|!?#@$%01xyzfunvalletstructclass".split("")
    const TRAIL = 14
    let w = 0, h = 0, fs = 14, cols = 0
    let drops: number[] = [], speed: number[] = []

    const size = () => {
      const r = c.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width; h = r.height
      c.width = Math.max(1, Math.floor(w * dpr)); c.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fs = w < 640 ? 13 : 15
      cols = Math.floor(w / (fs * (w < 640 ? 2 : 1.5)))
      drops = Array.from({ length: cols }, () => Math.random() * (h / fs))
      speed = Array.from({ length: cols }, () => 0.18 + Math.random() * 0.35)
    }
    size()

    let vis = true, raf = 0, last = 0
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting })
    io.observe(c)
    const ro = new ResizeObserver(size)
    ro.observe(c)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${fs}px ui-monospace, monospace`
      const step = w / cols
      const gap = fs * 0.7
      for (let i = 0; i < cols; i++) {
        drops[i] += speed[i]
        for (let t = 0; t < TRAIL; t++) {
          const y = (drops[i] - t) * fs
          if (y < 0 || y > h) continue
          ctx.fillStyle = t === 0 ? "rgba(190,250,255,.95)" : `rgba(34,229,255,${(1 - t / TRAIL) * 0.4})`
          ctx.fillText(glyphs[(i * 7 + Math.floor(drops[i] - t) * 13) % glyphs.length], i * step + (step - gap) / 2, y)
        }
        if ((drops[i] - TRAIL) * fs > h) { drops[i] = -Math.random() * 20; speed[i] = 0.18 + Math.random() * 0.35 }
      }
    }
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!vis || document.hidden || t - last < 33) return
      last = t
      draw()
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect() }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden />
}

/* ── Typing code line with syntax colours. Starts once the intro has finished. ── */
export function hl(s: string): ReactNode[] {
  return s.split(/("[^"]*"?|\b(?:val|var|fun|let|func|struct|class|try|await)\b|\b[A-Z][A-Za-z]*\b|@\w+)/).map((p, i) => {
    if (!p) return null
    if (p[0] === '"') return <span key={i} className="text-[#8ef0b2]">{p}</span>
    if (p[0] === "@") return <span key={i} className="text-[#ffd479]">{p}</span>
    if (/^(val|var|fun|let|func|struct|class|try|await)$/.test(p)) return <span key={i} className="text-[#c4a7ff]">{p}</span>
    if (/^[A-Z]/.test(p)) return <span key={i} className="text-[#6cf0ff]">{p}</span>
    return <span key={i}>{p}</span>
  })
}

export function TypeCode({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ready = useContext(ReadyCtx)
  const [text, setText] = useState("")

  useEffect(() => {
    if (!ready) return
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) { setText(lines[0]); return }
    let k = 0, i = 0, id = 0
    const erase = () => {
      const s = lines[k]
      if (i > 0) { i--; setText(s.slice(0, i)); id = window.setTimeout(erase, 14) }
      else { k = (k + 1) % lines.length; id = window.setTimeout(tick, 250) }
    }
    const tick = () => {
      const s = lines[k]
      if (i < s.length) { i++; setText(s.slice(0, i)); id = window.setTimeout(tick, 38 + Math.random() * 40) }
      else id = window.setTimeout(erase, 2200)
    }
    id = window.setTimeout(tick, 200)
    return () => window.clearTimeout(id)
  }, [ready, lines])

  return <pre className={`code caret ${className}`} aria-hidden>{hl(text)}</pre>
}
