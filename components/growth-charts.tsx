"use client"

import { useEffect, useId, useMemo, useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { BarChart3, Minus, TrendingDown, TrendingUp } from "lucide-react"
import { caseStudies, experience, metricSeries } from "@/lib/data"
import { monthIndex, parsePeriod, quarterEnds, quarterLabel } from "@/lib/period"
import { Reveal } from "./ui-bits"

type Pt = { label: string; value: number }

/* ───────────── data derived from lib/data.ts (edit the data → charts update) ───────────── */
function buildSeries(now: number) {
  // 1) flagship apps in active development, per quarter (goes up AND down as projects start / wrap up)
  const cs = caseStudies.map((c) => parsePeriod(c.period))
  const csStart = Math.min(...cs.map((r) => r[0]))
  const active: Pt[] = quarterEnds(csStart, now).map((m) => ({
    label: quarterLabel(m),
    value: cs.filter(([s, e]) => s <= m && (e === null || e >= m)).length,
  }))

  // 2) distinct technologies used on the job, cumulative per quarter
  const jobs = experience.map((j) => ({ start: parsePeriod(j.period)[0], tech: j.tech }))
  const jStart = Math.min(...jobs.map((j) => j.start))
  const toolbox: Pt[] = quarterEnds(jStart, now).map((m) => {
    const set = new Set<string>()
    jobs.filter((j) => j.start <= m).forEach((j) => j.tech.forEach((t) => set.add(t.trim().toLowerCase())))
    return { label: quarterLabel(m), value: set.size }
  })
  return { active, toolbox }
}

/* ───────────── tooltip ───────────── */
function Tip({ active, payload, label, unit }: { active?: boolean; payload?: { value?: number }[]; label?: string | number; unit: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="card px-3 py-2 text-xs shadow-xl">
      <p className="font-mono text-muted">{label}</p>
      <p className="font-bold text-sm text-accent-text">{payload[0].value} <span className="font-normal text-muted">{unit}</span></p>
    </div>
  )
}

/* ───────────── one X/Y chart card ───────────── */
function AxisChart({ title, hint, unit, xName, data, step = false }: { title: string; hint?: string; unit: string; xName: string; data: Pt[]; step?: boolean }) {
  const [view, setView] = useState<"line" | "bar">("line")
  const gid = "g" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const last = data[data.length - 1]?.value ?? 0
  const prev = data.length > 1 ? data[data.length - 2].value : last
  const diff = Math.round((last - prev) * 100) / 100
  const peak = Math.max(...data.map((d) => d.value))
  const up = diff > 0, down = diff < 0
  const Trend = up ? TrendingUp : down ? TrendingDown : Minus
  const axis = { fill: "var(--muted)", fontSize: 11 }

  return (
    <div className="card p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold leading-tight">{title}</h3>
          {hint && <p className="text-[11px] font-mono uppercase tracking-widest text-muted mt-1">{hint}</p>}
        </div>
        <div role="tablist" aria-label="Chart type" className="flex p-1 rounded-full bg-surface2 border border-line shrink-0">
          {([["line", TrendingUp, "Area chart"], ["bar", BarChart3, "Bar chart"]] as const).map(([k, Icon, label]) => (
            <button key={k} role="tab" aria-selected={view === k} aria-label={label} onClick={() => setView(k)}
              className={`grid place-items-center w-9 h-8 rounded-full transition-colors ${view === k ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"}`}>
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-1 mt-4">
        <p className="h-display text-4xl text-accent-text">{last}<span className="text-base font-medium text-muted ml-1.5">{unit}</span></p>
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${up ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" : down ? "text-rose-500 border-rose-500/30 bg-rose-500/10" : "text-muted border-line bg-surface2"}`}>
          <Trend size={13} />{up ? "▲ +" : down ? "▼ " : ""}{diff === 0 ? "no change" : diff} <span className="font-normal opacity-80">vs prev.</span>
        </span>
        <span className="text-xs text-muted">peak {peak}</span>
      </div>

      <div className="h-56 sm:h-64 mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          {view === "line" ? (
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.45 }} />
                  <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0.02 }} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--line)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: "var(--line)" }} interval="preserveStartEnd" minTickGap={18} />
              <YAxis tick={axis} tickLine={false} axisLine={false} width={34} allowDecimals={false} domain={[0, (m: number) => Math.ceil(m * 1.15)]} />
              <Tooltip content={<Tip unit={unit} />} cursor={{ stroke: "var(--accent)", strokeOpacity: 0.4 }} />
              <Area type={step ? "stepAfter" : "monotone"} dataKey="value" stroke="var(--accent)" strokeWidth={2.5} fill={`url(#${gid})`}
                dot={{ r: 3, fill: "var(--accent)", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: "var(--line)" }} interval="preserveStartEnd" minTickGap={18} />
              <YAxis tick={axis} tickLine={false} axisLine={false} width={34} allowDecimals={false} domain={[0, (m: number) => Math.ceil(m * 1.15)]} />
              <Tooltip content={<Tip unit={unit} />} cursor={{ fill: "var(--surface2)", fillOpacity: 0.6 }} />
              <Bar dataKey="value" fill="var(--accent)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] font-mono text-muted mt-2 text-center">X: {xName} · Y: {unit}</p>
    </div>
  )
}

export default function GrowthCharts() {
  // `now` is set after mount so server and browser render the same thing
  const [now, setNow] = useState(() => 2026 * 12 + 9)
  useEffect(() => setNow(monthIndex(new Date())), [])
  const { active, toolbox } = useMemo(() => buildSeries(now), [now])

  return (
    <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
      <Reveal className="h-full">
        <AxisChart title="Flagship apps in development" hint="per quarter · rises and falls" unit="apps" xName="quarter" data={active} step />
      </Reveal>
      <Reveal delay={0.08} className="h-full">
        <AxisChart title="Technologies in my toolbox" hint="cumulative, from my roles" unit="technologies" xName="quarter" data={toolbox} />
      </Reveal>
      {metricSeries.filter((m) => m.points.length > 0).map((m, i) => (
        <Reveal key={m.id} delay={0.04 * i} className="h-full">
          <AxisChart title={m.title} hint={m.hint} unit={m.unit} xName="period" data={m.points} step={m.step} />
        </Reveal>
      ))}
    </div>
  )
}
