"use client"
import { useState } from "react"
import { FaAndroid, FaApple } from "react-icons/fa"
import { apps } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"
import { AppIcon } from "./icons"

type F = "all" | "android" | "ios"
const uniq = Array.from(new Map(apps.map((a) => [a.title, a])).values())

export function AppsGrid() {
  const [f, setF] = useState<F>("all")
  const [all, setAll] = useState(false)
  const list = uniq.filter((a) => f === "all" || apps.some((x) => x.title === a.title && x.platform === f))
  const shown = all ? list : list.slice(0, 6)
  return (
    <div className="mt-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold">All apps <span className="text-base font-normal text-muted">({list.length})</span></h3>
        <div className="flex gap-2" role="group" aria-label="Filter by platform">
          {(["all", "android", "ios"] as F[]).map((k) => (
            <button key={k} aria-pressed={f === k} onClick={() => setF(k)} className={`chip min-h-11 cursor-pointer px-4 capitalize ${f === k ? "chip-accent" : ""}`}>{k === "ios" ? "iOS" : k}</button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
        {shown.map((a, i) => {
          const entries = apps.filter((x) => x.title === a.title)
          const tech = Array.from(new Set(entries.flatMap((x) => x.technologies)))
          return (
            <motion.div key={a.title} layout className="h-full" initial={{ opacity: 0, y: 28, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-8%" }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}>
              <article className="glass glass-hover flex h-full flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <AppIcon urls={entries.map((x) => x.url)} fallback={a.image} alt={`${a.title} app icon`} size={48} className="size-12 shrink-0 rounded-xl object-cover" />
                  <h4 className="font-display text-lg font-semibold leading-tight">{a.title}</h4>
                </div>
                <p className="line-clamp-4 text-sm text-muted">{a.description}</p>
                <ul className="flex flex-wrap gap-1.5">{tech.slice(0, 7).map((t) => <li key={t} className="chip !px-2.5 !py-1 text-xs">{t}</li>)}</ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {entries.map((x) => (
                    <a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-4 !py-2 text-sm">
                      {x.platform === "ios" ? <FaApple /> : <FaAndroid />}{x.platform === "ios" ? "App Store" : "Google Play"}
                    </a>
                  ))}
                </div>
              </article>
            </motion.div>
          )
        })}
        </AnimatePresence>
      </motion.div>
      {list.length > 6 && <div className="mt-8 text-center"><button onClick={() => setAll(!all)} className="btn btn-ghost">{all ? "Show fewer" : `Show all ${list.length} apps`}</button></div>}
    </div>
  )
}
