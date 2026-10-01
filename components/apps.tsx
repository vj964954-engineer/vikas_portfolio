"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, type PanInfo } from "framer-motion"
import { FaAndroid, FaApple, FaGooglePlay } from "react-icons/fa"
import { ArrowUpRight, ChevronRight, LayoutGrid, List, Search, X } from "lucide-react"
import { apps, type App } from "@/lib/data"
import { AppIcon, Reveal, SectionHead } from "./ui-bits"
import { usePlatform } from "./platform-provider"

type Filter = "all" | "android" | "ios"
type View = "grid" | "list"
const INITIAL = 9

const storeLabel = (a: App) => (a.platform === "android" ? "Get it on Google Play" : "View on the App Store")

/** Bottom sheet: Material modal sheet on Android, iOS card sheet. Drag down to dismiss. */
function Sheet({ app, onClose }: { app: App | null; onClose: () => void }) {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  useEffect(() => {
    if (!app) return
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", esc)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = prev }
  }, [app, onClose])

  const end = (_: unknown, i: PanInfo) => { if (i.offset.y > 110 || i.velocity.y > 600) onClose() }

  return (
    <AnimatePresence>
      {app && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog" aria-modal="true" aria-label={app.title}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={end}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: ios ? 260 : 320, damping: ios ? 32 : 34 }}
            className={`relative w-full sm:max-w-xl max-h-[88vh] overflow-y-auto bg-surface sm:rounded-b-[var(--radius)] border border-line ${ios ? "backdrop-blur-2xl !bg-[color-mix(in_oklab,var(--bg)_82%,transparent)]" : "bg-surface"}`}
            style={{ borderTopLeftRadius: ios ? 30 : 28, borderTopRightRadius: ios ? 30 : 28, paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          >
            <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-inherit cursor-grab active:cursor-grabbing">
              <span className={`h-1.5 rounded-full bg-muted/50 ${ios ? "w-10" : "w-8"}`} />
            </div>
            <button onClick={onClose} aria-label="Close" className="absolute top-3 right-4 grid place-items-center w-9 h-9 rounded-full bg-surface2 border border-line"><X size={16} /></button>

            <div className="px-6 pt-2">
              <div className="flex items-center gap-4">
                <AppIcon src={app.image} name={app.title} size={72} />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-snug">{app.title}</h3>
                  <span className={`chip mt-2 ${app.platform === "android" ? "chip-accent" : ""}`}>
                    {app.platform === "android" ? <FaAndroid size={11} /> : <FaApple size={11} />}
                    {app.platform === "android" ? "Android" : "iOS"}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{app.description}</p>
              <p className="mt-5 mb-2 text-xs font-mono uppercase tracking-widest text-muted">Built with</p>
              <div className="flex flex-wrap gap-2">{app.technologies.map((t) => <span key={t} className="chip chip-accent">{t}</span>)}</div>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full mt-7">
                {app.platform === "android" ? <FaGooglePlay size={15} /> : <FaApple size={17} />} {storeLabel(app)} <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Apps() {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")
  const [view, setView] = useState<View>("grid")
  const [showAll, setShowAll] = useState(false)
  const [sel, setSel] = useState<App | null>(null)

  // Skills chips can push a search term here.
  useEffect(() => {
    const h = (e: Event) => { setQuery((e as CustomEvent<string>).detail); setFilter("all"); setShowAll(true) }
    window.addEventListener("vj-search", h)
    return () => window.removeEventListener("vj-search", h)
  }, [])

  const counts = useMemo(
    () => ({ all: apps.length, android: apps.filter((a) => a.platform === "android").length, ios: apps.filter((a) => a.platform === "ios").length }),
    [],
  )
  const topTech = useMemo(() => {
    const m = new Map<string, number>()
    apps.forEach((a) => a.technologies.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)))
    return [...m.entries()].filter(([t]) => !["Android", "iOS"].includes(t)).sort((a, b) => b[1] - a[1]).slice(0, 7)
  }, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return apps.filter(
      (a) => (filter === "all" || a.platform === filter) && (!q || a.title.toLowerCase().includes(q) || a.technologies.some((t) => t.toLowerCase().includes(q))),
    )
  }, [filter, query])
  const visible = showAll || query ? list : list.slice(0, INITIAL)

  const tabs: { id: Filter; label: string; Icon?: typeof FaAndroid }[] = [
    { id: "all", label: "All" }, { id: "android", label: "Android", Icon: FaAndroid }, { id: "ios", label: "iOS", Icon: FaApple },
  ]

  const Row = ({ a }: { a: App }) => (
    <button onClick={() => setSel(a)} className={`w-full text-left flex items-center gap-4 p-4 ${ios ? "ios-row hover:bg-surface2/60" : "card card-hover"} transition-colors`}>
      <AppIcon src={a.image} name={a.title} size={52} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold truncate">{a.title}</span>
        <span className="block text-sm text-muted truncate">{a.technologies.slice(0, 3).join(" · ")}</span>
      </span>
      <span className="hidden sm:inline-flex chip">{a.platform === "android" ? <FaAndroid size={11} /> : <FaApple size={11} />}{a.platform === "android" ? "Android" : "iOS"}</span>
      <ChevronRight size={18} className="text-muted shrink-0" />
    </button>
  )

  return (
    <section id="apps" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="03" eyebrow="App library" title="Everything I've shipped."
          sub="Every listing is live on Google Play or the App Store. Tap any app for details."
        />

        <Reveal className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div role="tablist" aria-label="Filter by platform" className="flex gap-2 flex-wrap">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id} role="tab" aria-selected={filter === id}
                  onClick={() => { setFilter(id); setShowAll(false) }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors min-h-[44px] ${filter === id ? "bg-accent text-accent-ink border-transparent" : "bg-surface2 border-line text-muted hover:text-fg"}`}
                >
                  {Icon && <Icon size={15} />} {label}
                  <span className={`text-xs ${filter === id ? "opacity-80" : "opacity-60"}`}>{counts[id]}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <label className="relative flex-1 sm:w-64">
                <span className="sr-only">Search apps or technologies</span>
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search apps or tech…"
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-surface2 border border-line text-sm outline-none focus:border-accent placeholder:text-muted min-h-[44px]" />
              </label>
              <div role="group" aria-label="Layout" className="flex p-1 rounded-full bg-surface2 border border-line">
                {([["grid", LayoutGrid], ["list", List]] as const).map(([v, Icon]) => (
                  <button key={v} onClick={() => setView(v)} aria-pressed={view === v} aria-label={`${v} view`}
                    className={`grid place-items-center w-10 rounded-full ${view === v ? "bg-accent text-accent-ink" : "text-muted"}`}><Icon size={16} /></button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
            {topTech.map(([t, n]) => (
              <button key={t} onClick={() => { setQuery(query === t ? "" : t); setShowAll(true) }} aria-pressed={query === t}
                className={`chip shrink-0 !py-1.5 cursor-pointer ${query === t ? "chip-accent" : ""}`}>{t} <span className="opacity-60">{n}</span></button>
            ))}
          </div>
        </Reveal>

        {view === "grid" ? (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((a) => (
                <motion.article
                  key={a.id} layout
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="card card-hover p-5 flex flex-col cursor-pointer" onClick={() => setSel(a)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AppIcon src={a.image} name={a.title} size={52} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold leading-snug line-clamp-2">{a.title}</h3>
                      <span className={`chip mt-1.5 ${a.platform === "android" ? "chip-accent" : ""}`}>
                        {a.platform === "android" ? <FaAndroid size={11} /> : <FaApple size={11} />}{a.platform === "android" ? "Android" : "iOS"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3">{a.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-5 flex-1 content-start">
                    {a.technologies.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setSel(a) }} className="btn btn-ghost !py-2.5 !min-h-[44px] text-sm flex-1">Details</button>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label={storeLabel(a)}
                      className="btn btn-primary !py-2.5 !min-h-[44px] text-sm flex-[1.4]">
                      {a.platform === "android" ? <FaGooglePlay size={14} /> : <FaApple size={16} />}{a.platform === "android" ? "Play Store" : "App Store"}
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : ios ? (
          <div className="card ios-group">{visible.map((a) => <Row key={a.id} a={a} />)}</div>
        ) : (
          <div className="space-y-3">{visible.map((a) => <Row key={a.id} a={a} />)}</div>
        )}

        {list.length === 0 && <p className="text-center text-muted py-16">No apps match “{query}”.</p>}

        {!query && list.length > INITIAL && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll((s) => !s)} className="btn btn-ghost">{showAll ? "Show fewer" : `Show all ${list.length} apps`}</button>
          </div>
        )}
      </div>
      <Sheet app={sel} onClose={() => setSel(null)} />
    </section>
  )
}
