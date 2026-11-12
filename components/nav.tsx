"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { profile } from "@/lib/data"

const links = [["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["projects", "Projects"], ["insights", "Numbers"], ["services", "Services"], ["writing", "Writing"], ["contact", "Contact"]]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" })
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    addEventListener("keydown", esc)
    return () => { io.disconnect(); removeEventListener("keydown", esc) }
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(.75rem,env(safe-area-inset-top))] sm:px-6">
      <nav aria-label="Primary" className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2">
        <a href="#top" className="font-display text-lg font-bold">VJ<span className="text-accent">.</span></a>
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map(([id, l]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`relative block rounded-full px-4 py-2 text-sm transition-colors hover:text-fg ${active === id ? "text-fg" : "text-muted"}`}>
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface2 shadow-[0_0_20px_-6px_var(--glow)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={profile.resume} download className="btn btn-primary hidden !min-h-11 !px-5 !py-2 sm:inline-flex">Resume</a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full bg-surface2 xl:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="glass mx-auto mt-2 max-w-6xl p-3 xl:hidden">
            {links.map(([id, l], i) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }} className="flex min-h-12 items-center rounded-xl px-4 hover:bg-surface2">{l}</motion.a>
            ))}
            <a href={profile.resume} download className="btn btn-primary mt-2 w-full">Download resume</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
