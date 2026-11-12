"use client"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { FaAndroid, FaApple, FaGithub, FaLinkedin } from "react-icons/fa"
import { ArrowDownToLine, MapPin } from "lucide-react"
import { profile, stats, caseStudies } from "@/lib/data"
import { Magnetic, ReadyCtx, Words } from "./fx"
import { CountText } from "./motion"
import { CodeRain, TypeCode } from "./codefx"
import { PhoneUI } from "./phone"
import { AppIcon } from "./icons"

const codeLines = [
  'val vikas = Developer("Android, iOS")',
  "@Composable fun Hero() { }",
  "let apps = try await Store.ship(15)",
  "fun main() = Portfolio.launch()",
]

const roles = ["Android apps", "iOS apps", "Compose screens", "SwiftUI screens"]

function Roles() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600); return () => clearInterval(t) }, [])
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[10ch] items-center overflow-hidden leading-none" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span key={roles[i]} className="gtext whitespace-nowrap pb-1" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.4 }}>
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const iconPos = ["left-[-4%] top-[10%]", "right-[-4%] top-[26%]", "left-[-2%] bottom-[22%]", "right-[0%] bottom-[8%]"]

function Stage() {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const ry = useSpring(mx, { stiffness: 80, damping: 14 }), rx = useSpring(my, { stiffness: 80, damping: 14 })
  const { scrollYProgress } = useScroll()
  const spin = useTransform(scrollYProgress, [0, 0.2], [0, 50])
  const z = useTransform(scrollYProgress, [0, 0.2], [0, -180])
  const rotY = useTransform([ry, spin], ([a, b]: number[]) => a + b)
  return (
    <div
      className="relative mx-auto h-[500px] w-[min(100%,380px)] sm:h-[600px]"
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 26); my.set(-((e.clientY - r.top) / r.height - 0.5) * 18)
      }}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
    >
      <motion.div className="absolute inset-0 grid place-items-center" style={{ rotateX: rx, rotateY: rotY, z, transformStyle: "preserve-3d" }}>
        <div className="sway"><PhoneUI className="[--pw:min(62vw,250px)]" /></div>
        {[["2%", "60%", 56, -90], ["78%", "4%", 44, -150], ["86%", "72%", 34, -40]].map(([l, t, sz, z], k) => (
          <div key={k} className="absolute" style={{ left: l as string, top: t as string, transform: `translateZ(${z}px)` }} aria-hidden>
            <div className="cube" style={{ "--s": `${sz}px` } as React.CSSProperties}><i /><i /><i /><i /><i /><i /></div>
          </div>
        ))}
        {caseStudies.map((c, i) => (
          <div key={c.id} className={`floaty glass absolute grid size-12 place-items-center overflow-hidden rounded-2xl p-1 sm:size-14 ${iconPos[i]}`} style={{ transform: `translateZ(${60 + i * 25}px)`, animationDelay: `${i * 0.8}s` }} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <AppIcon urls={c.links.map((l) => l.href)} fallback={c.icon} alt="" size={56} eager className="size-full rounded-xl object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ready = useContext(ReadyCtx)
  const social = [[FaGithub, profile.github, "GitHub"], [FaLinkedin, profile.linkedin, "LinkedIn"]] as const
  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="grid-floor" aria-hidden />
      <CodeRain />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="chip chip-accent mb-6"><span className="size-2 animate-pulse rounded-full bg-accent" />Software Developer at {profile.company}</p>
          <h1 className="h-hero"><Words text="Vikas Kumar Jain" now base={0.15} /></h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 font-display text-[clamp(1.2rem,1rem+1.5vw,2rem)] font-medium text-fg/90"><span>I build</span><Roles /></p>
          <p className="lead mt-6 max-w-xl">Android and iOS developer in Jaipur with 2+ years shipping Kotlin, Java, SwiftUI and UIKit apps to Google Play and the App Store.</p>
          <TypeCode lines={codeLines} className="mt-5 max-w-md rounded-xl border border-line bg-black/30 px-4 py-3 text-muted" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic><a href={profile.resume} download="Vikas-Kumar-Jain-Resume.pdf" className="btn btn-primary"><ArrowDownToLine size={18} />Download resume</a></Magnetic>
            <Magnetic><a href="#projects" className="btn btn-ghost"><FaAndroid /><FaApple />See my apps</a></Magnetic>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2"><MapPin size={16} />{profile.location}</span>
            <span className="flex gap-2">
              {social.map(([Icon, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-line bg-surface2 text-fg hover:border-accent"><Icon size={18} /></a>
              ))}
            </span>
          </div>
        </div>
        <Stage />
      </div>
      <dl className="wrap relative mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass px-5 py-3"><dd className="font-display text-2xl font-bold text-accent"><CountText text={s.value} on={ready} /></dd><dt className="text-xs text-muted">{s.label}</dt></div>
        ))}
      </dl>
    </section>
  )
}
