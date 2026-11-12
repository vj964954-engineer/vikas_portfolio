"use client"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue, type Variants } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { hl } from "./codefx"

const EASE = [0.22, 1, 0.36, 1] as const
const reducedNow = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion:reduce)").matches

/** "99%+", "−40%", "4.2★", "50,000+" → counts up to the number when `on` turns true. */
export function CountText({ text, on }: { text: string; on: boolean }) {
  const m = text.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/)
  const [v, setV] = useState(0)
  const num = m ? parseFloat(m[2].replace(/,/g, "")) : 0
  useEffect(() => {
    if (!on || !m) return
    if (reducedNow()) { setV(num); return }
    const c = animate(0, num, { duration: 1.6, ease: EASE, onUpdate: setV })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, num])
  if (!m) return <>{text}</>
  const dec = m[2].includes(".") ? m[2].split(".")[1].length : 0
  const out = m[2].includes(",") ? Number(v.toFixed(dec)).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec)
  return <>{m[1]}{out}{m[3]}</>
}

function W({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const opacity = useTransform(p, [a, b], [0.2, 1])
  return <motion.span style={{ opacity }} className="mr-[.28em] inline-block">{w}</motion.span>
}

/** Paragraph whose words light up one by one as you scroll. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] })
  const words = text.split(" ")
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{words.map((w, i) => <W key={i} w={w} p={p} a={(i / words.length) * 0.9} b={Math.min(1, ((i + 1) / words.length) * 0.9 + 0.1)} />)}</span>
    </p>
  )
}

const chipV: Variants = { h: { opacity: 0, scale: 0.7, y: 10 }, s: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } }

/** Chips that pop in one after another. */
export function StaggerChips({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <motion.ul className="flex flex-wrap gap-2" initial="h" whileInView="s" viewport={{ once: true, margin: "-10%" }} variants={{ s: { transition: { staggerChildren: 0.045 } } }}>
      {items.map((i) => <motion.li key={i} variants={chipV} className={`chip ${accent ? "chip-accent" : ""}`}>{i}</motion.li>)}
    </motion.ul>
  )
}

/** Code block that types itself when scrolled into view. */
export function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const ref = useRef<HTMLPreElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reducedNow()) { setN(code.length); return }
    let i = 0
    const id = window.setInterval(() => { i += 2; setN(Math.min(i, code.length)); if (i >= code.length) window.clearInterval(id) }, 16)
    return () => window.clearInterval(id)
  }, [inView, code])
  return (
    <pre ref={ref} className={`code relative ${className}`} aria-hidden>
      <span className="invisible">{code}</span>
      <span className="absolute inset-0 p-4">{hl(code.slice(0, n))}</span>
    </pre>
  )
}

/** 3D ring of skills that turns by itself and with your scroll. */
export function SkillOrbit({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rot = useTransform(scrollYProgress, [0, 1], [0, 420])
  const n = items.length
  return (
    <div ref={ref} className="relative mx-auto mt-14 h-[15rem] w-full overflow-hidden sm:h-[22rem]" style={{ perspective: 1200 }} aria-hidden>
      <motion.div className="absolute left-1/2 top-1/2 size-0" style={{ transformStyle: "preserve-3d", rotateX: -10, rotateY: reduce ? 0 : rot }}>
        <div className="orbit">
          {items.map((t, i) => (
            <span key={t} className="orbit-item chip chip-accent" style={{ transform: `rotateY(${(i * 360) / n}deg) translateZ(var(--orbit-r)) translate(-50%,-50%)` }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/** Timeline spine that fills as you scroll. Place inside a relative wrapper. */
export function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
  const s = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <div ref={ref} aria-hidden className="absolute inset-y-0 left-0 w-px bg-line">
      <motion.div className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent2 shadow-[0_0_12px_var(--glow)]" style={{ scaleY: s }} />
    </div>
  )
}

export function Parallax({ children, className = "", from = 40, to = -40 }: { children: ReactNode; className?: string; from?: number; to?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  return <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>{children}</motion.div>
}

/** Decorative floating 3D cube that drifts at its own speed while scrolling. */
export function Deco({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <Parallax className={`pointer-events-none absolute hidden lg:block ${className}`} from={80} to={-80}>
      <div style={{ perspective: 600 }} aria-hidden>
        <div className="cube" style={{ "--s": `${size}px` } as CSSProperties}><i /><i /><i /><i /><i /><i /></div>
      </div>
    </Parallax>
  )
}

/** Glowing line that draws itself between sections. */
export function Divider() {
  return (
    <div aria-hidden className="wrap">
      <motion.div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.1, ease: EASE }} />
    </div>
  )
}

const rail = [["top", "Home"], ["journey", "Build"], ["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["projects", "Projects"], ["insights", "Numbers"], ["services", "Services"], ["writing", "Writing"], ["contact", "Contact"]]

/** Dots on the right edge: shows where you are, click to jump. */
export function SectionRail() {
  const [active, setActive] = useState("top")
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" })
    rail.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav aria-label="Page sections" className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 xl:flex">
      {rail.map(([id, l]) => (
        <a key={id} href={`#${id}`} aria-label={l} aria-current={active === id ? "true" : undefined} className="group relative flex h-6 items-center gap-3 pl-6">
          <span className="pointer-events-none rounded-full border border-line bg-[rgba(10,12,20,.85)] px-2.5 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100">{l}</span>
          <span className={`block rounded-full transition-all duration-300 ${active === id ? "size-3 bg-accent shadow-[0_0_14px_var(--glow)]" : "size-1.5 bg-white/30 group-hover:bg-white/60"}`} />
        </a>
      ))}
    </nav>
  )
}

/** Floating button with a circle that fills as you scroll. */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const len = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0.03, 0.08], [0, 1])
  const pe = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"))
  return (
    <motion.button
      type="button" aria-label="Back to top" style={{ opacity, pointerEvents: pe }}
      onClick={() => scrollTo({ top: 0, behavior: reducedNow() ? "auto" : "smooth" })}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 grid size-12 cursor-pointer place-items-center rounded-full border border-line bg-[rgba(10,12,20,.85)] text-fg"
    >
      <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <motion.circle cx="18" cy="18" r="16" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: len }} />
      </svg>
      <ArrowUp size={18} />
    </motion.button>
  )
}

/** Live Jaipur clock (IST). */
export function LocalTime() {
  const [t, setT] = useState("")
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()))
    f()
    const id = window.setInterval(f, 1000)
    return () => window.clearInterval(id)
  }, [])
  return <p className="chip chip-accent w-fit font-mono"><span className="size-2 animate-pulse rounded-full bg-accent" />Jaipur · {t || "--:--:--"} IST</p>
}

/** Little particle burst, shown when the message is sent. */
export function Burst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        return <motion.i key={i} className="absolute size-2 rounded-full bg-accent" initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * 110, y: Math.sin(a) * 60, opacity: 0, scale: 0.3 }} transition={{ duration: 0.9, ease: "easeOut" }} />
      })}
    </span>
  )
}

export { AnimatePresence }
