"use client"
import { useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { apps, experience } from "@/lib/data"
import { Head, Reveal } from "./fx"
import { CountText } from "./motion"

/* ── graphic kit: Ring · Bars · Donut · Gantt. Every number is either from your resume text or computed from lib/data.ts. ── */

const rings = [
  { v: 99, text: "99%+", label: "Crash-free sessions", sub: "EasyShiksha, Android and iOS" },
  { v: 80, text: "80%+", label: "Test completion", sub: "Career Helper" },
  { v: 40, text: "−40%", label: "Load time", sub: "EasyShiksha, Room + Retrofit" },
  { v: 84, text: "4.2★", label: "Google Play rating", sub: "Funzo at launch" },
]

function Ring({ v, text, label, sub, id }: (typeof rings)[number] & { id: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: "-10%" })
  const r = 44, c = 2 * Math.PI * r
  return (
    <div ref={ref} className="glass flex flex-col items-center gap-3 p-6 text-center">
      <div className="relative size-32">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label={`${label}: ${text}`}>
          <defs><linearGradient id={`rg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22e5ff" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
          <motion.circle cx="50" cy="50" r={r} fill="none" stroke={`url(#rg${id})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: on ? c * (1 - v / 100) : c }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold"><CountText text={text} on={on} /></span>
      </div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm text-muted">{sub}</p>
    </div>
  )
}

function Bars() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: "-10%" })
  const data = useMemo(() => {
    const keys = ["Java", "Kotlin", "SwiftUI", "Firebase", "REST API", "Core Data", "Material Design", "AI/ML"]
    return keys.map((k) => ({ k, n: apps.filter((a) => a.technologies.some((t) => t.toLowerCase() === k.toLowerCase())).length })).sort((a, b) => b.n - a.n)
  }, [])
  const max = Math.max(...data.map((d) => d.n))
  return (
    <div ref={ref} className="glass p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">Technology across my apps</h3>
      <p className="mb-5 text-sm text-muted">Store listings (out of {apps.length}) that use each technology.</p>
      <ul className="space-y-3">
        {data.map((d, i) => (
          <li key={d.k} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
            <span>{d.k}</span>
            <span className="h-3 overflow-hidden rounded-full bg-white/[.07]">
              <motion.span className="block h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent2" style={{ width: `${(d.n / max) * 100}%` }}
                initial={{ scaleX: 0 }} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} />
            </span>
            <span className="text-right text-muted">{d.n}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Donut() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: "-10%" })
  const a = apps.filter((x) => x.platform === "android").length, i = apps.length - a
  const r = 40, c = 2 * Math.PI * r
  return (
    <div ref={ref} className="glass flex flex-col items-center gap-4 p-6 sm:p-8">
      <h3 className="self-start font-display text-xl font-semibold">Android vs iOS</h3>
      <div className="relative size-40">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label={`${a} Android and ${i} iOS store listings`}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#8b5cf6" strokeWidth="12" />
          <motion.circle cx="50" cy="50" r={r} fill="none" stroke="#22e5ff" strokeWidth="12" strokeDasharray={c}
            initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: on ? c * (1 - a / apps.length) : c }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-center font-display text-3xl font-bold leading-none">{apps.length}<small className="block text-xs font-normal text-muted">listings</small></span>
      </div>
      <p className="flex gap-5 text-sm"><span><i className="mr-2 inline-block size-3 rounded-full bg-accent" />Android {a}</span><span><i className="mr-2 inline-block size-3 rounded-full bg-accent2" />iOS {i}</span></p>
    </div>
  )
}

const M = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const idx = (s: string) => { const [m, y] = s.trim().toLowerCase().split(/\s+/); return +y * 12 + M.indexOf(m.slice(0, 3)) }

function Gantt() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: "-10%" })
  const now = new Date().getFullYear() * 12 + new Date().getMonth()
  const rows = experience.map((j) => { const [a, b] = j.period.split(/\s*[–-]\s*/); return { j, s: idx(a), e: /present/i.test(b) ? now : idx(b) } })
  const min = Math.min(...rows.map((r) => r.s)), span = now - min + 1
  const years = Array.from({ length: Math.floor(now / 12) - Math.floor(min / 12) + 1 }, (_, k) => Math.floor(min / 12) + k)
  return (
    <div ref={ref} className="glass p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">Career timeline</h3>
      <p className="mb-6 text-sm text-muted">Each bar is one role, drawn from the dates in the experience section.</p>
      <div className="overflow-x-auto"><div className="min-w-[560px]">
        <div className="relative mb-2 h-5 text-xs text-muted">{years.map((y) => <span key={y} className="absolute" style={{ left: `${Math.max(0, ((y * 12 - min) / span) * 100)}%` }}>{y}</span>)}</div>
        <ul className="space-y-4">
          {rows.map(({ j, s, e }, i) => (
            <li key={j.role + j.company}>
              <p className="mb-1 text-sm">{j.role} <span className="text-muted">· {j.company}</span></p>
              <div className="relative h-3 rounded-full bg-white/[.06]">
                <motion.div className={`absolute inset-y-0 origin-left rounded-full ${j.current ? "bg-gradient-to-r from-accent to-accent2 shadow-[0_0_18px_var(--glow)]" : "bg-white/30"}`}
                  style={{ left: `${((s - min) / span) * 100}%`, width: `${Math.max(((e - s + 1) / span) * 100, 2)}%` }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
              </div>
            </li>
          ))}
        </ul>
      </div></div>
    </div>
  )
}

export function Insights() {
  return (
    <section id="insights" className="section">
      <div className="wrap">
        <Head k="numbers" t="The work in numbers." s="Results from my projects, plus charts computed live from the app and experience data on this site." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{rings.map((r, i) => <Reveal key={r.label} kind="flip" delay={i * 0.09}><Ring {...r} id={i} /></Reveal>)}</div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_.6fr]"><Reveal kind="left"><Bars /></Reveal><Reveal kind="right" delay={0.1}><Donut /></Reveal></div>
        <div className="mt-5"><Reveal kind="zoom"><Gantt /></Reveal></div>
      </div>
    </section>
  )
}
