"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { FaAndroid, FaApple, FaGithub, FaLinkedin } from "react-icons/fa"
import { ArrowDownToLine, Mail, MapPin } from "lucide-react"
import { profile, stats, caseStudies } from "@/lib/data"
import { usePlatform } from "./platform-provider"
import { AppIcon, CountUp } from "./ui-bits"

const roles = ["Android apps", "iOS apps", "Jetpack Compose UIs", "SwiftUI screens", "Spring Boot APIs"]

function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block h-[1.1em] align-bottom overflow-hidden" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]} className="block text-grad whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const badges = [
  { t: "4.2 ★ on Google Play", c: "Funzo launch", cls: "-left-3 sm:-left-20 top-8", d: 0 },
  { t: "99%+ crash-free", c: "EasyShiksha · both stores", cls: "-right-3 sm:-right-10 bottom-28", d: 1.2 },
  { t: "−40% load time", c: "Room cache + Retrofit", cls: "-left-3 sm:-left-16 bottom-48", d: 2.1 },
]

function StatusBar() {
  const { platform } = usePlatform()
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white/90">
      <span>9:41</span>
      <span className="flex items-center gap-1 opacity-90">
        {platform === "android" ? "▲ ◗ ▮" : "●●● ◠ ▮"}
      </span>
    </div>
  )
}

function ScreenDots({ n, i }: { n: number; i: number }) {
  return (
    <div className="absolute top-[52px] right-5 flex gap-1" aria-hidden>
      {Array.from({ length: n }).map((_, k) => <span key={k} className={`h-1 rounded-full transition-all ${k === i ? "w-4 bg-accent" : "w-1 bg-white/30"}`} />)}
    </div>
  )
}

function FrontPhone() {
  const { platform } = usePlatform()
  const isIos = platform === "ios"
  const [screen, setScreen] = useState(0)
  useEffect(() => { const t = setInterval(() => setScreen((n) => (n + 1) % 2), 4200); return () => clearInterval(t) }, [])
  return (
    <div className="phone floaty" aria-hidden>
      {/* camera cutout */}
      {isIos ? (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[84px] h-[24px] rounded-full bg-black z-20" />
      ) : (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full bg-black ring-1 ring-white/20 z-20" />
      )}
      <div className="absolute inset-[5px] rounded-[inherit] overflow-hidden bg-gradient-to-b from-[#12181a] to-[#0a0d0f] flex flex-col" style={{ borderRadius: isIos ? 46 : 34 }}>
        <StatusBar />
        <ScreenDots n={2} i={screen} />
        <AnimatePresence mode="wait" initial={false}>
        {screen === 1 ? (
          <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="flex-1 px-5 pt-5 flex flex-col">
            <p className="text-[10px] uppercase tracking-[.18em] text-white/50">{isIos ? "App of the day" : "Editors' choice"}</p>
            <div className="mt-3 rounded-3xl p-4 bg-gradient-to-br from-accent/40 to-accent/5 border border-white/10">
              <AppIcon src={caseStudies[1].icon} name="EasyShiksha" size={56} />
              <p className="text-white text-lg font-bold mt-3 leading-tight">EasyShiksha</p>
              <p className="text-white/60 text-[11px]">E-Learning &amp; Internships</p>
              <p className="text-accent-text text-3xl font-extrabold mt-4 tracking-tight">50,000+</p>
              <p className="text-white/60 text-[11px]">registered learners</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              {[["99%+", "crash-free"], ["−40%", "load time"]].map(([a, b]) => (
                <div key={b} className="rounded-2xl bg-white/[.06] py-3"><p className="text-white font-bold">{a}</p><p className="text-white/50 text-[10px]">{b}</p></div>
              ))}
            </div>
            <span className="mt-auto mb-5 text-center text-[11px] font-bold py-2.5 bg-accent text-accent-ink" style={{ borderRadius: isIos ? 999 : 14 }}>{isIos ? "GET" : "Install"}</span>
          </motion.div>
        ) : (
        <motion.div key="s1" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} className="flex-1 flex flex-col">
        <div className="px-5 pt-6">
          <p className="text-[10px] uppercase tracking-[.18em] text-white/50">{isIos ? "Today" : "Play Store"}</p>
          <p className="text-white text-xl font-bold leading-tight mt-0.5">Apps by Vikas</p>
        </div>
        <ul className="px-4 mt-4 space-y-2.5 flex-1">
          {caseStudies.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-2xl bg-white/[.06] p-2.5">
              <AppIcon src={c.icon} name={c.name} size={42} />
              <div className="min-w-0 flex-1">
                <p className="text-white text-[12px] font-semibold truncate">{c.name}</p>
                <p className="text-white/50 text-[10px] truncate">{c.tagline}</p>
              </div>
              <span className="text-[10px] font-bold px-3 py-1.5 bg-accent text-accent-ink" style={{ borderRadius: isIos ? 999 : 12 }}>
                {isIos ? "GET" : "Install"}
              </span>
            </li>
          ))}
        </ul>
        </motion.div>
        )}
        </AnimatePresence>
        {/* bottom nav */}
        {isIos ? (
          <div className="mx-4 mb-4 mt-2 flex justify-around rounded-2xl bg-white/10 py-2.5 text-[10px] text-white/70 backdrop-blur">
            <span className="text-accent">Today</span><span>Games</span><span>Apps</span><span>Search</span>
          </div>
        ) : (
          <div className="mt-2 flex justify-around bg-white/[.07] py-3 text-[10px] text-white/70">
            <span className="px-4 py-1 rounded-full bg-accent/25 text-white">Apps</span><span className="py-1">Games</span><span className="py-1">Search</span>
          </div>
        )}
      </div>
    </div>
  )
}

function BackPhone() {
  const { platform } = usePlatform()
  return (
    <div className="phone" aria-hidden style={{ transform: "rotate(8deg)", width: 230 }}>
      <div className="absolute inset-[5px] overflow-hidden" style={{ borderRadius: platform === "ios" ? 46 : 34 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mobile-wallpaper.jpeg" alt="" className="w-full h-full object-cover object-top" />
      </div>
    </div>
  )
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] })
  const yBack = useTransform(scrollYProgress, [0, 1], [60, -90])
  const yFront = useTransform(scrollYProgress, [0, 1], [20, -40])
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 16 })
  const rotX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 16 })
  const social = [
    { Icon: FaGithub, href: profile.github, label: "GitHub" },
    { Icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ]
  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="chip chip-accent mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Software Developer at {profile.company}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="h-display text-5xl sm:text-6xl lg:text-7xl"
          >
            Hi, I'm Vikas.
            <span className="block mt-1 text-[0.62em] leading-[1.1] text-fg/90">I build&nbsp;<RoleRotator /></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-muted max-w-xl leading-relaxed"
          >
            Cross-platform mobile developer with 2+ years shipping production apps in{" "}
            <b className="text-fg font-semibold">Java, Kotlin and SwiftUI</b> — 15+ of them live on Google Play and the App Store.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href={profile.resume} download="Vikas-Kumar-Jain-Resume.pdf" className="btn btn-primary">
              <ArrowDownToLine size={18} /> Download Resume
            </a>
            <a href="#apps" className="btn btn-ghost">
              <FaAndroid /> <FaApple /> See my apps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted text-sm"
          >
            <span className="flex items-center gap-2"><MapPin size={16} /> {profile.location}</span>
            <span className="flex items-center gap-2">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label} href={href} aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full bg-surface2 border border-line text-fg hover:border-accent hover:text-accent-text transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </span>
          </motion.div>
        </div>

        {/* devices — pointer-tilt + scroll parallax */}
        <motion.div
          ref={stage}
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(((e.clientX - r.left) / r.width - 0.5) * 2); my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
          }}
          onPointerLeave={() => { mx.set(0); my.set(0) }}
          className="relative flex justify-center lg:justify-end h-[600px]"
          style={{ perspective: 1100 }}
        >
          <motion.div style={{ y: yBack }} className="hidden sm:block absolute right-0 top-10 opacity-90"><BackPhone /></motion.div>
          <motion.div style={{ y: yFront, rotateY: rotY, rotateX: rotX }} className="relative z-10 sm:mr-24 lg:mr-28">
            <FrontPhone />
            {badges.map((b) => (
              <motion.div
                key={b.t} aria-hidden
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 0.8 + b.d * 0.3 }, scale: { delay: 0.8 + b.d * 0.3 }, y: { repeat: Infinity, duration: 5, delay: b.d } }}
                className={`absolute z-20 card !rounded-2xl px-3.5 py-2 shadow-xl ${b.cls}`}
              >
                <p className="text-[12px] font-bold whitespace-nowrap">{b.t}</p>
                <p className="text-[10px] text-muted whitespace-nowrap">{b.c}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* stats */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-16">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card p-5 sm:p-6"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="h-display text-3xl sm:text-4xl text-accent-text"><CountUp value={s.value} /></dd>
              <p className="mt-2 text-sm text-muted leading-snug" aria-hidden>{s.label}</p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
