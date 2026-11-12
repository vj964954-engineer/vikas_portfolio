"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { articles } from "@/lib/data"
import { Head } from "./fx"

const cats = ["All", ...Array.from(new Set(articles.map((a) => a.category)))]

export function Writing() {
  const [c, setC] = useState("All")
  const [all, setAll] = useState(false)
  const list = articles.filter((a) => c === "All" || a.category === c)
  const shown = all ? list : list.slice(0, 6)
  return (
    <section id="writing" className="section">
      <div className="wrap">
        <Head k="writing" t="Articles I've written." s={`${articles.length} articles on LinkedIn covering mobile, Java, data and AI.`} />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by topic">
          {cats.map((k) => <button key={k} aria-pressed={c === k} onClick={() => { setC(k); setAll(false) }} className={`chip min-h-11 cursor-pointer px-4 ${c === k ? "chip-accent" : ""}`}>{k}</button>)}
        </div>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {shown.map((a, i) => (
            <motion.div key={a.link} layout className="h-full" initial={{ opacity: 0, y: 28, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-8%" }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}>
              <a href={a.link} target="_blank" rel="noopener noreferrer" className="group glass glass-hover flex h-full flex-col gap-3 p-6">
                <span className="chip chip-accent w-fit">{a.category}</span>
                <h3 className="font-display text-lg font-semibold leading-snug">{a.title}</h3>
                <p className="line-clamp-4 text-sm text-muted">{a.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-accent">Read on LinkedIn<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </a>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
        {list.length > 6 && <div className="mt-8 text-center"><button onClick={() => setAll(!all)} className="btn btn-ghost">{all ? "Show fewer" : `Show all ${list.length} articles`}</button></div>}
      </div>
    </section>
  )
}
