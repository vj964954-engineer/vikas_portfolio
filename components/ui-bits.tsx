"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { usePlatform } from "./platform-provider"

/** Platform-native entrance: Android = springy slide-up, iOS = blur-to-focus fade. */
export function Reveal({
  children, delay = 0, className = "", y = 24,
}: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  return (
    <motion.div
      className={className}
      initial={ios ? { opacity: 0, filter: "blur(10px)", scale: 0.98 } : { opacity: 0, y: y + 12 }}
      whileInView={ios ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={ios ? { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } : { type: "spring", stiffness: 140, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Counts up to numbers inside strings like "50,000+" when scrolled into view. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const m = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/)
  const dec = m && m[2].includes(".") ? m[2].split(".")[1].length : 0
  const target = m ? parseFloat(m[2].replace(/,/g, "")) : 0
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || !m) return
    const c = animate(0, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(dec ? Number(v.toFixed(dec)) : Math.round(v)) })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  if (!m) return <span className={className}>{value}</span>
  return <span ref={ref} className={className}>{m[1]}{(inView ? n : 0).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}{m[3]}</span>
}

/** 3D pointer-tilt wrapper (disabled on touch via pointer events only firing for hover-capable devices). */
export function Tilt({ children, className = "", max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 20 }), sy = useSpring(ry, { stiffness: 200, damping: 20 })
  const glow = useTransform(sy, (v) => `${50 + v * 4}%`)
  return (
    <motion.div
      className={className}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900, ["--gx" as string]: glow }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** Tiny keyword highlighter for the code card. */
export function Highlight({ code }: { code: string }) {
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|\b(class|val|var|let|func|fun|private|final|constructor|inject|async|await|try|return|override|struct|some)\b|\b([A-Z]\w+)\b/gm
  const out: React.ReactNode[] = []
  let last = 0, m: RegExpExecArray | null, i = 0
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const cls = m[1] ? "tk-c" : m[2] ? "tk-s" : m[3] ? "tk-a" : m[4] ? "tk-k" : "tk-t"
    out.push(<span key={i++} className={cls}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  out.push(code.slice(last))
  return <>{out}</>
}

export function SectionHead({
  id, index, eyebrow, title, sub,
}: { id?: string; index: string; eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="eyebrow mb-3">{index} — {eyebrow}</p>
      <h2 id={id} className="h-display text-4xl sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted leading-relaxed">{sub}</p>}
    </Reveal>
  )
}

/** App icon with graceful fallback (Play Store images can fail to hotlink). */
export function AppIcon({ src, name, size = 56, radius }: { src: string; name: string; size?: number; radius?: number }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  // The image can fail before React hydrates (onError never fires) — check again on mount.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [src])
  const r = radius ?? Math.round(size * 0.24)
  if (failed) {
    return (
      <div
        aria-hidden
        className="grid place-items-center font-bold text-accent-ink bg-accent shrink-0"
        style={{ width: size, height: size, borderRadius: r, fontSize: size * 0.42 }}
      >
        {name.trim().charAt(0)}
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={`${name} app icon`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="object-cover shrink-0 bg-surface2"
      style={{ width: size, height: size, borderRadius: r }}
    />
  )
}
