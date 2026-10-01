"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { ArrowUp, BarChart3, Home, Layers, Mail, Smartphone } from "lucide-react"
import { usePlatform } from "./platform-provider"

const rail = [
  ["top", "Home"], ["about", "About"], ["work", "Work"], ["apps", "Apps"], ["insights", "Insights"], ["engineering", "Toolkit"], ["experience", "Experience"],
  ["skills", "Skills"], ["credentials", "Credentials"], ["writing", "Writing"], ["contact", "Contact"],
] as const

const tabs = [
  { id: "top", label: "Home", Icon: Home },
  { id: "work", label: "Work", Icon: Layers },
  { id: "apps", label: "Apps", Icon: Smartphone },
  { id: "insights", label: "Stats", Icon: BarChart3 },
  { id: "contact", label: "Contact", Icon: Mail },
]

/** Scroll progress bar + section dot rail + mobile bottom tab bar + back-to-top button. */
export default function AppChrome() {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  const [active, setActive] = useState("top")
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    rail.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll) }
  }, [])

  // which bottom tab is "current": map in-between sections to the nearest tab
  const tabActive = ({ about: "top", engineering: "insights", experience: "insights", skills: "insights", credentials: "contact", writing: "contact" } as Record<string, string>)[active] ?? active

  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-accent z-[60]" />

      {/* section dots (desktop) */}
      <nav aria-label="Sections" className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {rail.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-label={label} className="group relative flex items-center justify-end">
            <span className="absolute right-6 px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface2 border border-line opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition pointer-events-none whitespace-nowrap">{label}</span>
            <span className={`block rounded-full transition-all ${active === id ? "w-3 h-3 bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent)]" : "w-2 h-2 bg-muted/50 group-hover:bg-muted"}`} />
          </a>
        ))}
      </nav>

      {/* back to top: Android FAB (rounded square) / iOS glass circle */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top" aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            className={`fixed z-40 right-4 bottom-24 lg:bottom-8 lg:right-8 grid place-items-center w-14 h-14 shadow-xl ${
              ios ? "rounded-full card text-fg" : "rounded-[18px] bg-accent text-accent-ink"
            }`}
          >
            <ArrowUp size={22} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* bottom tab bar (mobile only): Material 3 navigation bar vs iOS tab bar */}
      <nav
        aria-label="Quick navigation"
        className={`lg:hidden fixed z-50 bottom-0 inset-x-0 ${
          ios ? "mx-3 mb-3 card !rounded-[26px] px-1.5 py-1.5" : "bg-surface2 border-t border-line pb-2 pt-2.5 px-2"
        }`}
        style={{ paddingBottom: ios ? undefined : "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <ul className="flex justify-between">
          {tabs.map(({ id, label, Icon }) => {
            const on = tabActive === id
            return (
              <li key={id} className="flex-1">
                <a href={`#${id}`} aria-current={on ? "true" : undefined} className="flex flex-col items-center gap-1 py-1 text-[11px] font-semibold">
                  {ios ? (
                    <span className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-colors ${on ? "text-accent-text bg-accent/15" : "text-muted"}`}>
                      <Icon size={20} />{label}
                    </span>
                  ) : (
                    <>
                      <span className={`grid place-items-center h-8 rounded-full transition-all ${on ? "w-16 bg-accent/25 text-accent-text" : "w-8 text-muted"}`}><Icon size={20} /></span>
                      <span className={on ? "text-fg" : "text-muted"}>{label}</span>
                    </>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
