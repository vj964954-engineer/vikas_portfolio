"use client"

import { useState } from "react"
import { FaLinkedin } from "react-icons/fa"
import { ArrowUpRight, ChevronsRight, Search } from "lucide-react"
import { articles } from "@/lib/data"
import { Reveal, SectionHead } from "./ui-bits"

const cats = ["All", "Java Development", "Mobile Development", "Web Development", "Data Engineering"] as const
const hue: Record<string, string> = {
  "Java Development": "#ff9f43", "Mobile Development": "var(--accent)", "Web Development": "#a78bfa", "Data Engineering": "#22d3ee",
}

export default function Writing() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All")
  const [all, setAll] = useState(false)
  const [q, setQ] = useState("")
  const list = articles.filter((a) => (cat === "All" || a.category === cat) && (!q || (a.title + a.description).toLowerCase().includes(q.toLowerCase())))
  const shown = all || q ? list : list.slice(0, 6)

  return (
    <section id="writing" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="09" eyebrow="Writing" title="Notes on software and tech."
          sub={`${articles.length} articles on Java, mobile, data, cloud and AI — published on LinkedIn.`} />

        <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {cats.map((c) => (
              <button key={c} onClick={() => { setCat(c); setAll(false) }} aria-pressed={cat === c}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold border min-h-[44px] transition-colors ${cat === c ? "bg-accent text-accent-ink border-transparent" : "bg-surface2 border-line text-muted hover:text-fg"}`}>{c}</button>
            ))}
          </div>
          <label className="relative lg:w-64">
            <span className="sr-only">Search articles</span>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-surface2 border border-line text-sm outline-none focus:border-accent placeholder:text-muted min-h-[44px]" />
          </label>
        </Reveal>

        <p className="md:hidden mb-3 text-xs font-mono uppercase tracking-widest text-muted flex items-center gap-1.5">Swipe <ChevronsRight size={14} /></p>
        <div className="snap-rail no-scrollbar flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4">
          {shown.map((a, i) => (
            <a key={a.link} href={a.link} target="_blank" rel="noopener noreferrer"
              className="card card-hover group relative overflow-hidden p-6 pt-7 flex flex-col shrink-0 w-[82%] sm:w-[60%] md:w-auto">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: hue[a.category] }} />
              <span aria-hidden className="absolute -right-2 -bottom-6 text-[7rem] font-extrabold leading-none opacity-[.06] select-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="chip self-start mb-3" style={{ color: hue[a.category] === "var(--accent)" ? "var(--accent-text)" : hue[a.category] }}>{a.category}</span>
              <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-accent-text transition-colors">{a.title}</h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1">{a.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
                <FaLinkedin /> Read on LinkedIn <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
        {list.length === 0 && <p className="text-center text-muted py-12">No articles match.</p>}

        {!q && list.length > 6 && (
          <div className="text-center mt-8">
            <button onClick={() => setAll((s) => !s)} className="btn btn-ghost">{all ? "Show fewer" : `Show all ${list.length} articles`}</button>
          </div>
        )}
      </div>
    </section>
  )
}
