"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FaAndroid, FaApple } from "react-icons/fa"
import { Check, Menu, Moon, Palette, Sun, X } from "lucide-react"
import { usePlatform, type Accent } from "./platform-provider"

const swatches: { id: Accent; label: string; color: string }[] = [
  { id: "auto", label: "Native", color: "linear-gradient(135deg,#3ddc84 50%,#0a84ff 50%)" },
  { id: "violet", label: "Violet", color: "#a78bfa" },
  { id: "sunset", label: "Sunset", color: "#ff9f43" },
  { id: "rose", label: "Rose", color: "#ff6b9d" },
  { id: "cyan", label: "Cyan", color: "#22d3ee" },
]

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "apps", label: "Apps" },
  { id: "insights", label: "Insights" },
  { id: "engineering", label: "Toolkit" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
]

export default function Nav() {
  const { platform, setPlatform, theme, toggleTheme, accent, setAccent } = usePlatform()
  const [pal, setPal] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el) })
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3">
      <nav
        aria-label="Primary"
        className={`card mx-auto max-w-6xl flex items-center justify-between gap-3 pl-5 pr-2 py-2 ${scrolled ? "shadow-xl shadow-black/20" : ""}`}
        style={{ borderRadius: 999 }}
      >
        <a href="#top" className="font-bold tracking-tight text-lg flex items-center gap-2" aria-label="Vikas Kumar Jain — home">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-accent-ink text-sm font-extrabold">VJ</span>
          <span className="hidden sm:inline">Vikas</span>
        </a>

        <ul className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === l.id ? "bg-accent/15 text-accent-text" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Platform switch */}
          <div role="radiogroup" aria-label="Interface style" className="flex p-1 rounded-full bg-surface2 border border-line">
            {([
              { id: "android", Icon: FaAndroid, label: "Android" },
              { id: "ios", Icon: FaApple, label: "iOS" },
            ] as const).map(({ id, Icon, label }) => (
              <button
                key={id}
                role="radio"
                aria-checked={platform === id}
                aria-label={`${label} style`}
                onClick={() => setPlatform(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  platform === id ? "bg-accent text-accent-ink shadow" : "text-muted hover:text-fg"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="grid place-items-center w-10 h-10 rounded-full bg-surface2 border border-line text-fg hover:border-accent transition-colors"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setPal((o) => !o)}
            aria-label="Colour theme" aria-expanded={pal}
            className="grid place-items-center w-10 h-10 rounded-full bg-surface2 border border-line text-fg hover:border-accent transition-colors"
          >
            <Palette size={17} />
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="xl:hidden grid place-items-center w-10 h-10 rounded-full bg-surface2 border border-line"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {pal && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="card mx-auto max-w-6xl mt-2 p-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:w-fit sm:mr-6 sm:ml-auto"
            role="radiogroup" aria-label="Accent colour"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted">Colour theme</span>
            <div className="flex gap-2.5">
              {swatches.map((s) => (
                <button
                  key={s.id} role="radio" aria-checked={accent === s.id} aria-label={s.label} title={s.label}
                  onClick={() => setAccent(s.id)}
                  className={`relative grid place-items-center w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${accent === s.id ? "border-fg" : "border-transparent"}`}
                  style={{ background: s.color }}
                >
                  {accent === s.id && <Check size={15} className="text-black/80" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="card xl:hidden mx-auto max-w-6xl mt-2 p-3"
          >
            <ul className="grid grid-cols-2 gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium ${
                      active === l.id ? "bg-accent/15 text-accent-text" : "hover:bg-surface2"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
