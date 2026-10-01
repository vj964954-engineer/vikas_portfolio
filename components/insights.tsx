"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { FaAndroid, FaApple } from "react-icons/fa"
import { BarChart3, CalendarRange, PieChart, ShieldCheck } from "lucide-react"
import { apps, caseStudies, experience } from "@/lib/data"
import { usePlatform } from "./platform-provider"
import { CountUp, Reveal, SectionHead } from "./ui-bits"
import { parsePeriod } from "@/lib/period"
import GrowthCharts from "./growth-charts"

function Card({ icon: Icon, title, hint, children, className = "" }: { icon: typeof BarChart3; title: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card p-5 sm:p-6 flex flex-col ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="flex items-center gap-2 font-bold"><span className="grid place-items-center w-8 h-8 rounded-xl bg-accent/15 text-accent-text"><Icon size={16} /></span>{title}</h3>
        {hint && <span className="text-[11px] font-mono uppercase tracking-widest text-muted text-right">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

/* ───────────── KPI ring gauge ───────────── */
function Gauge({ pct, value, suffix, label, sub }: { pct: number; value: number; suffix: string; label: string; sub: string }) {
  const r = 44, C = 2 * Math.PI * r
  return (
    <div className="card p-5 flex flex-col items-center text-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" role="img" aria-label={`${label}: ${value}${suffix}`}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface2)" strokeWidth="9" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={C} initial={{ strokeDashoffset: C }} whileInView={{ strokeDashoffset: C * (1 - pct / 100) }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center h-display text-xl sm:text-2xl text-accent-text whitespace-nowrap">
          <span><CountUp value={String(value)} />{suffix}</span>
        </span>
      </div>
      <p className="font-semibold mt-3">{label}</p>
      <p className="text-xs text-muted mt-0.5 leading-snug">{sub}</p>
    </div>
  )
}

/* ───────────── Platform donut ───────────── */
function Donut() {
  const a = apps.filter((x) => x.platform === "android").length
  const i = apps.length - a
  const r = 54, C = 2 * Math.PI * r
  const segs = [
    { n: a, label: "Android", Icon: FaAndroid, color: "var(--accent)" },
    { n: i, label: "iOS", Icon: FaApple, color: "color-mix(in oklab, var(--accent-text) 38%, var(--surface2))" },
  ]
  let off = 0
  return (
    <Card icon={PieChart} title="Store listings" hint="by platform" className="h-full">
      <div className="flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-6">
        <div className="relative w-44 h-44 shrink-0">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90" role="img" aria-label={`${a} Android and ${i} iOS apps`}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface2)" strokeWidth="18" />
            {segs.map((s, k) => {
              const len = (s.n / apps.length) * C
              const el = (
                <motion.circle
                  key={s.label} cx="70" cy="70" r={r} fill="none" stroke={s.color} strokeWidth="18"
                  strokeDashoffset={-off} strokeLinecap="butt"
                  initial={{ strokeDasharray: `0 ${C}` }} whileInView={{ strokeDasharray: `${Math.max(len - 3, 0)} ${C}` }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: k * 0.25, ease: "easeOut" }}
                />
              )
              off += len
              return el
            })}
          </svg>
          <span className="absolute inset-0 grid place-items-center text-center">
            <span><span className="h-display text-4xl text-accent-text block"><CountUp value={String(apps.length)} /></span><span className="text-xs text-muted">apps live</span></span>
          </span>
        </div>
        <ul className="w-full space-y-3">
          {segs.map(({ n, label, Icon, color }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
              <span className="flex items-center gap-2 font-medium"><Icon size={15} />{label}</span>
              <span className="ml-auto font-mono text-sm">{n} <span className="text-muted">· {Math.round((n / apps.length) * 100)}%</span></span>
            </li>
          ))}
          <li className="text-xs text-muted pt-1">Every listing links to its live Google Play or App Store page.</li>
        </ul>
      </div>
    </Card>
  )
}

/* ───────────── Technology bars ───────────── */
function TechBars() {
  const [f, setF] = useState<"all" | "android" | "ios">("all")
  const rows = useMemo(() => {
    const m = new Map<string, number>()
    apps.filter((a) => f === "all" || a.platform === f).forEach((a) =>
      a.technologies.filter((t) => !["Android", "iOS"].includes(t)).forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)))
    return [...m.entries()].sort((x, y) => y[1] - x[1]).slice(0, 8)
  }, [f])
  const max = Math.max(1, ...rows.map((r) => r[1]))
  return (
    <Card icon={BarChart3} title="Most-used technologies" hint="apps using each" className="h-full">
      <div role="tablist" aria-label="Platform filter" className="flex gap-1.5 mb-5">
        {(["all", "android", "ios"] as const).map((k) => (
          <button key={k} role="tab" aria-selected={f === k} onClick={() => setF(k)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors min-h-[34px] ${f === k ? "bg-accent text-accent-ink border-transparent" : "bg-surface2 border-line text-muted hover:text-fg"}`}>
            {k === "all" ? "All" : k === "android" ? "Android" : "iOS"}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {rows.map(([t, n], i) => (
          <li key={f + t} className="grid grid-cols-[minmax(5.5rem,34%)_1fr_1.75rem] items-center gap-3 text-sm">
            <span className="truncate font-medium" title={t}>{t}</span>
            <span className="h-2.5 rounded-full bg-surface2 overflow-hidden">
              <motion.span className="block h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${(n / max) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }} />
            </span>
            <span className="font-mono text-xs text-right text-muted">{n}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ───────────── Career Gantt ───────────── */
function Timeline() {
  const [now, setNow] = useState(() => 2026 * 12 + 9)
  useEffect(() => { const d = new Date(); setNow(d.getFullYear() * 12 + d.getMonth()) }, [])

  const jobs = experience.map((j) => ({ label: j.role, sub: j.company, kind: "job" as const, range: parsePeriod(j.period), period: j.period }))
  const projects = caseStudies.map((c) => ({ label: c.name, sub: c.tagline, kind: "app" as const, range: parsePeriod(c.period), period: c.period }))
  const all = [...jobs, ...projects]
  const min = Math.min(...all.map((r) => r.range[0]))
  const start = Math.floor(min / 12) * 12            // snap to Jan of first year
  const end = now + 2
  const span = end - start
  const years: number[] = []
  for (let y = start / 12; y * 12 <= end; y++) years.push(y)

  const Row = ({ r }: { r: (typeof all)[number] }) => {
    const s = r.range[0], e = r.range[1] ?? now
    const left = ((s - start) / span) * 100
    const width = Math.max(((e - s + 1) / span) * 100, 2.5)
    const live = r.range[1] === null
    return (
      <li className="py-2.5">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <p className="text-sm font-semibold truncate">{r.label} <span className="text-muted font-normal">· {r.sub}</span></p>
          <p className="font-mono text-[11px] text-muted shrink-0 hidden sm:block">{r.period}</p>
        </div>
        <div className="relative h-3.5 rounded-full bg-surface2/70" role="img" aria-label={`${r.label}, ${r.period}`}>
          <motion.span
            className={`absolute top-0 h-full rounded-full ${r.kind === "app" ? "bg-accent" : "bg-gradient-to-r from-accent/45 to-accent/80"} ${live ? "shadow-[0_0_14px_var(--accent)]" : ""}`}
            style={{ left: `${left}%`, width: `${width}%`, transformOrigin: "left" }}
            initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="font-mono text-[11px] text-muted mt-1 sm:hidden">{r.period}</p>
      </li>
    )
  }

  return (
    <Card icon={CalendarRange} title="Career & releases timeline" hint={`${years[0]} – now`} className="lg:col-span-2">
      <div className="relative">
        {/* year grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {years.map((y) => (
            <div key={y} className="absolute top-0 bottom-0 border-l border-dashed border-line" style={{ left: `${((y * 12 - start) / span) * 100}%` }}>
              <span className="absolute -top-0.5 left-1 text-[10px] font-mono text-muted">{y}</span>
            </div>
          ))}
        </div>
        <div className="pt-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-accent-text mt-1">Roles</p>
          <ul className="divide-y divide-line/60">{jobs.map((r) => <Row key={r.label + r.period} r={r} />)}</ul>
          <p className="text-[11px] font-mono uppercase tracking-widest text-accent-text mt-5">Flagship apps</p>
          <ul className="divide-y divide-line/60">{projects.map((r) => <Row key={r.label} r={r} />)}</ul>
        </div>
      </div>
    </Card>
  )
}

/* ───────────── Section ───────────── */
export default function Insights() {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  return (
    <section id="insights" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="04" eyebrow="Insights" title="The numbers behind the apps."
          sub="Metrics from my resume and live store listings, laid out like a store developer console."
        />

        <Reveal className="mb-5 flex flex-wrap items-center gap-3">
          <span className="chip chip-accent">{ios ? <FaApple size={12} /> : <FaAndroid size={12} />}{ios ? "App Store Connect style" : "Play Console style"}</span>
          <span className="chip"><ShieldCheck size={12} /> Figures taken from my case studies</span>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
          <Reveal><Gauge pct={99} value={99} suffix="%+" label="Crash-free sessions" sub="EasyShiksha · Android & iOS" /></Reveal>
          <Reveal delay={0.06}><Gauge pct={80} value={80} suffix="%+" label="Test completion" sub="Career Helper" /></Reveal>
          <Reveal delay={0.12}><Gauge pct={40} value={40} suffix="%" label="Faster load time" sub="Room cache + Retrofit" /></Reveal>
          <Reveal delay={0.18}><Gauge pct={84} value={4.2} suffix=" ★" label="Play Store rating" sub="Funzo at launch (of 5)" /></Reveal>
        </div>

        <GrowthCharts />

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
          <Reveal className="h-full"><Donut /></Reveal>
          <Reveal delay={0.08} className="h-full"><TechBars /></Reveal>
          <Reveal className="lg:col-span-2"><Timeline /></Reveal>
        </div>
      </div>
    </section>
  )
}
