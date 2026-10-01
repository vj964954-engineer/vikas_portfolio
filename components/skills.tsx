"use client"

import { useMemo, useState } from "react"
import { FaAndroid, FaApple } from "react-icons/fa"
import { Layers } from "lucide-react"
import { apps, caseStudies, skillGroups } from "@/lib/data"
import { Reveal, SectionHead } from "./ui-bits"

export default function Skills() {
  const [tab, setTab] = useState("All")
  const all = useMemo(() => [...new Set(skillGroups.flatMap((g) => g.items))], [])
  const usage = useMemo(() => {
    const hay = apps.map((a) => a.technologies.join("|").toLowerCase()).concat(caseStudies.map((c) => c.stack.join("|").toLowerCase()))
    const m: Record<string, number> = {}
    all.forEach((s) => { m[s] = hay.filter((h) => h.includes(s.toLowerCase())).length })
    return m
  }, [all])

  const half = Math.ceil(all.length / 2)
  const rows = [all.slice(0, half), all.slice(half)]
  const groups = tab === "All" ? skillGroups : skillGroups.filter((g) => g.title === tab)

  const search = (t: string) => {
    window.dispatchEvent(new CustomEvent("vj-search", { detail: t }))
    document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="skills" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="07" eyebrow="Toolbox" title="The stack I ship with."
          sub="Tap any skill to see the apps where I've used it." />
      </div>

      {/* two counter-scrolling marquee rails */}
      <div className="space-y-3 mb-12" aria-hidden>
        {rows.map((r, k) => (
          <div key={k} className="marquee-wrap">
            <div className={`marquee ${k ? "rev" : ""}`}>
              {[...r, ...r].map((s, i) => (
                <span key={s + i} className={`chip mx-1.5 !text-sm !py-2 !px-4 ${i % 3 === 0 ? "chip-accent" : ""}`}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div role="tablist" aria-label="Skill group" className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {["All", ...skillGroups.map((g) => g.title)].map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold border min-h-[44px] transition-colors ${tab === t ? "bg-accent text-accent-ink border-transparent" : "bg-surface2 border-line text-muted hover:text-fg"}`}>{t}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.07}>
              <div className="card p-6 h-full">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  {g.accent === "android" ? <FaAndroid className="text-accent-text" /> : g.accent === "ios" ? <FaApple className="text-accent-text" /> : <Layers size={16} className="text-muted" />}
                  {g.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <button key={s} onClick={() => search(s)} disabled={!usage[s]}
                      title={usage[s] ? `Used in ${usage[s]} listed apps` : undefined}
                      className={`chip ${g.accent === "neutral" ? "" : "chip-accent"} ${usage[s] ? "cursor-pointer hover:scale-105 transition-transform" : "cursor-default"}`}>
                      {s}{usage[s] > 0 && <span className="ml-0.5 px-1.5 rounded-full bg-accent text-accent-ink text-[10px] font-bold">{usage[s]}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
