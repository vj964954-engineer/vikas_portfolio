"use client"
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Intro } from "./intro"
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

const fine = () =>
  typeof window !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches && !document.documentElement.classList.contains("lite")

/** true once the boot intro has finished; hero animations wait for it. */
export const ReadyCtx = createContext(true)

export const isLite = () => {
  const n = navigator as any
  return matchMedia("(hover:none)").matches || n.deviceMemory <= 2 || n.hardwareConcurrency <= 2 || !!n.connection?.saveData
}

export function Shell({ children }: { children: ReactNode }) {
  const [intro, setIntro] = useState(true)
  const done = useCallback(() => setIntro(false), [])
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const h = document.documentElement
    if (isLite()) h.classList.add("lite")
    let seen = false
    try { seen = !!sessionStorage.getItem("vj-seen"); sessionStorage.setItem("vj-seen", "1") } catch {}
    const t = setTimeout(done, seen ? 100 : 6000)
    const on = fine() && !matchMedia("(prefers-reduced-motion:reduce)").matches
    let raf = 0, x = 0, y = 0, rx = 0, ry = 0, first = true
    const mv = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      x = e.clientX; y = e.clientY
      if (first) { first = false; rx = x; ry = y; h.classList.add("cursor-on") }
      const t = e.target as Element
      ring.current?.classList.toggle("is-hover", !!t.closest?.("a,button,input,textarea,summary"))
      const g = t.closest?.(".glass") as HTMLElement | null
      if (g) { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", `${x - r.left}px`); g.style.setProperty("--my", `${y - r.top}px`) }
    }
    const down = () => ring.current?.classList.add("is-down")
    const up = () => ring.current?.classList.remove("is-down")
    const loop = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(loop)
    }
    if (on) { addEventListener("pointermove", mv, { passive: true }); addEventListener("pointerdown", down); addEventListener("pointerup", up); raf = requestAnimationFrame(loop) }
    return () => { clearTimeout(t); cancelAnimationFrame(raf); removeEventListener("pointermove", mv); removeEventListener("pointerdown", down); removeEventListener("pointerup", up); h.classList.remove("cursor-on") }
  }, [done])

  useEffect(() => {
    document.documentElement.style.overflow = intro ? "hidden" : ""
    return () => { document.documentElement.style.overflow = "" }
  }, [intro])

  return (
    <ReadyCtx.Provider value={!intro}>
    <MotionConfig reducedMotion="user">
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <motion.div style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent2" aria-hidden />
      <AnimatePresence>
        {intro && <Intro key="intro" onDone={done} />}
      </AnimatePresence>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      {children}
    </MotionConfig>
    </ReadyCtx.Provider>
  )
}

const kinds = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -56, rotateY: 14 },
  right: { opacity: 0, x: 56, rotateY: -14 },
  zoom: { opacity: 0, scale: 0.88, y: 24 },
  flip: { opacity: 0, rotateX: -65, y: 34 },
}
export type RevealKind = keyof typeof kinds

export function Reveal({ children, delay = 0, className = "", kind = "up" }: { children: ReactNode; delay?: number; className?: string; kind?: RevealKind }) {
  return (
    <motion.div className={className} style={kind === "up" ? undefined : { transformPerspective: 900 }} initial={kinds[kind]} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

/** Scroll-driven depth: settles into place as it rises. Never fully transparent, so content can't get stuck hidden. */
export function Depth({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])
  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      {reduce ? <div className={className}>{children}</div> : <motion.div className={className} style={{ rotateX, scale, opacity, transformOrigin: "50% 100%" }}>{children}</motion.div>}
    </div>
  )
}

/** 3D word-by-word title reveal. */
export function Words({ text, now = false, base = 0 }: { text: string; now?: boolean; base?: number }) {
  const to = { opacity: 1, rotateX: 0, y: 0 }
  const from = { opacity: 0, rotateX: -80, y: 24 }
  const ready = useContext(ReadyCtx)
  return (
    <span style={{ display: "block", perspective: 800 }}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} aria-hidden className="inline-block" style={{ transformOrigin: "50% 100%" }}
          initial={{ opacity: 0, rotateX: -80, y: 24 }}
          {...(now ? { animate: ready ? to : from } : { whileInView: to, viewport: { once: true } })}
          transition={{ duration: 0.8, delay: base + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
          {w}{"\u00A0"}
        </motion.span>
      ))}
    </span>
  )
}

export function Head({ t, s, k }: { t: string; s?: string; k?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      {k && <Reveal><p className="mb-3 font-mono text-sm text-accent">{"// "}{k}</p></Reveal>}
      <h2 className="title-2"><Words text={t} /></h2>
      {s && <Reveal delay={0.15}><p className="lead mt-5">{s}</p></Reveal>}
    </div>
  )
}

export function Tilt({ children, className = "", max = 7, glare = false }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 20 }), sy = useSpring(ry, { stiffness: 200, damping: 20 })
  return (
    <motion.div
      className={`${className} tilt`}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !fine()) return
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`)
        e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`)
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0) }}
    >
      {children}
      {glare && <span className="glare" aria-hidden />}
    </motion.div>
  )
}

export function Magnetic({ children, s = 0.3 }: { children: ReactNode; s?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !fine()) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * s); y.set((e.clientY - r.top - r.height / 2) * s)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.span>
  )
}
