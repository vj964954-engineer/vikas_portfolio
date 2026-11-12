"use client"
import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { FaAndroid, FaApple } from "react-icons/fa"
import { PhoneUI } from "./phone"

const steps = [
  { n: "01", t: "Design the screen", d: "Jetpack Compose and SwiftUI interfaces that feel native on every device." },
  { n: "02", t: "Wire the logic", d: "MVVM and Clean Architecture with Hilt, Room and Retrofit keep every feature testable." },
  { n: "03", t: "Ship to the stores", d: "Release builds go live on Google Play and the App Store. 15+ apps so far." },
]

const ktCode = `class HomeViewModel @Inject constructor(
  private val repo: Repository
) : ViewModel()`
const dataCode = `Retrofit  →  REST API
Room      →  local cache
Firebase  →  auth · push`

function Step({ i, p, children }: { i: number; p: MotionValue<number>; children: ReactNode }) {
  const n = steps.length, a = i / n, b = (i + 1) / n
  const inp = i === 0 ? [0, b - 0.06, b + 0.04] : i === n - 1 ? [a - 0.06, a + 0.04, 1] : [a - 0.06, a + 0.04, b - 0.06, b + 0.04]
  const out = i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  const opacity = useTransform(p, inp, out)
  const y = useTransform(p, inp, out.map((v) => (1 - v) * 30))
  return <motion.div className="col-start-1 row-start-1" style={{ opacity, y }}>{children}</motion.div>
}

function Plane({ z, x, y, children }: { z: MotionValue<number>; x: MotionValue<number>; y: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div
      className="col-start-1 row-start-1 w-[min(60vw,250px)] rounded-2xl border border-line bg-[rgba(9,13,22,.82)] p-4 shadow-[0_30px_80px_-30px_var(--glow)]"
      style={{ x, y, z }}
    >
      {children}
    </motion.div>
  )
}

function JourneyPinned() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 })

  const rotY = useTransform(p, [0, 1], [-32, 32])
  const rotX = useTransform(p, [0, 1], [12, -6])
  const zLogic = useTransform(p, [0, 1], [-40, -260])
  const xLogic = useTransform(p, [0, 1], [0, -70])
  const yLogic = useTransform(p, [0, 1], [0, -110])
  const zData = useTransform(p, [0, 1], [-80, -480])
  const xData = useTransform(p, [0, 1], [0, 60])
  const yData = useTransform(p, [0, 1], [0, 120])
  const zBadge = useTransform(p, [0, 1], [20, 170])
  const badgeOpacity = useTransform(p, [0.55, 0.85], [0, 1])
  const xPlay = useTransform(p, [0, 1], [0, -90])
  const yPlay = useTransform(p, [0, 1], [0, 170])
  const xStore = useTransform(p, [0, 1], [0, 90])
  const yStore = useTransform(p, [0, 1], [0, -170])
  const hint = useTransform(p, [0, 0.08], [1, 0])
  const bar = useTransform(p, [0, 1], [0, 1])

  return (
    <section id="journey" ref={ref} className="relative h-[340vh]" aria-label="How I build apps">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden pt-20">
        <div className="wrap grid w-full items-center gap-2 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <p className="chip chip-accent mb-3">Scroll to build</p>
            <h2 className="font-bold text-[clamp(1.6rem,1rem+3vw,3.5rem)]">From idea to the store.</h2>
            <div className="relative mt-4 grid min-h-[9.5rem] lg:mt-8">
              {steps.map((s, i) => (
                <Step key={s.n} i={i} p={p}>
                  <p className="font-mono text-sm text-accent">{s.n} / 0{steps.length}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold sm:text-3xl">{s.t}</h3>
                  <p className="lead mt-2 max-w-md">{s.d}</p>
                </Step>
              ))}
            </div>
            <div className="mt-4 hidden h-1 w-40 overflow-hidden rounded bg-white/10 lg:block">
              <motion.div className="h-full origin-left bg-gradient-to-r from-accent to-accent2" style={{ scaleX: bar }} />
            </div>
          </div>

          <div className="relative order-1 mx-auto h-[42dvh] w-full max-w-[460px] lg:order-2 lg:h-[72dvh] lg:max-w-none" style={{ perspective: 1400 }} aria-hidden>
            <motion.div className="absolute inset-0 grid place-items-center" style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
              <Plane z={zData} x={xData} y={yData}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">Data layer</p>
                <pre className="code !text-[10px] text-muted sm:!text-[11px]">{dataCode}</pre>
              </Plane>
              <Plane z={zLogic} x={xLogic} y={yLogic}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">Logic layer</p>
                <pre className="code !text-[10px] text-muted sm:!text-[11px]">{ktCode}</pre>
              </Plane>
              <div className="col-start-1 row-start-1" style={{ transformStyle: "preserve-3d" }}>
                <PhoneUI className="[--pw:min(44vw,21dvh)] lg:[--pw:min(250px,34dvh)]" />
              </div>
              <motion.span className="chip chip-accent col-start-1 row-start-1 !px-4 !py-2" style={{ x: xPlay, y: yPlay, z: zBadge, opacity: badgeOpacity }}><FaAndroid />Google Play</motion.span>
              <motion.span className="chip chip-accent col-start-1 row-start-1 !px-4 !py-2" style={{ x: xStore, y: yStore, z: zBadge, opacity: badgeOpacity }}><FaApple />App Store</motion.span>
            </motion.div>
          </div>
        </div>
        <motion.p style={{ opacity: hint }} className="absolute inset-x-0 bottom-5 text-center font-mono text-xs text-muted">scroll ↓</motion.p>
      </div>
    </section>
  )
}

function JourneyStatic() {
  return (
    <section id="journey" className="section" aria-label="How I build apps">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="chip chip-accent mb-3">How I build</p>
          <h2 className="title-2">From idea to the store.</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s) => (
              <li key={s.n}><p className="font-mono text-sm text-accent">{s.n}</p><h3 className="font-display text-2xl font-semibold">{s.t}</h3><p className="lead mt-1">{s.d}</p></li>
            ))}
          </ol>
        </div>
        <div className="grid place-items-center"><PhoneUI /></div>
      </div>
    </section>
  )
}

export function Journey() {
  const reduce = useReducedMotion()
  return reduce ? <JourneyStatic /> : <JourneyPinned />
}
