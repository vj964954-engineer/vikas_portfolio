"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { MotionConfig } from "framer-motion"

export type Platform = "android" | "ios"
export type Theme = "dark" | "light"
export type Accent = "auto" | "violet" | "sunset" | "rose" | "cyan"

const Ctx = createContext<{
  platform: Platform
  theme: Theme
  accent: Accent
  setPlatform: (p: Platform) => void
  setAccent: (a: Accent) => void
  toggleTheme: () => void
}>({ platform: "android", theme: "dark", accent: "auto", setPlatform: () => {}, setAccent: () => {}, toggleTheme: () => {} })

export const usePlatform = () => useContext(Ctx)

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setP] = useState<Platform>("android")
  const [theme, setT] = useState<Theme>("dark")
  const [accent, setA] = useState<Accent>("auto")

  // Sync with what the inline <head> script already applied (no flash).
  useEffect(() => {
    const d = document.documentElement
    setP((d.dataset.platform as Platform) || "android")
    setT((d.dataset.theme as Theme) || "dark")
    setA((d.dataset.accent as Accent) || "auto")
  }, [])

  const setPlatform = useCallback((p: Platform) => {
    document.documentElement.dataset.platform = p
    try { localStorage.setItem("vj-platform", p) } catch {}
    setP(p)
  }, [])

  const setAccent = useCallback((a: Accent) => {
    document.documentElement.dataset.accent = a
    try { localStorage.setItem("vj-accent", a) } catch {}
    setA(a)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try { localStorage.setItem("vj-theme", next) } catch {}
    setT(next)
  }, [])

  return (
    <Ctx.Provider value={{ platform, theme, accent, setPlatform, setAccent, toggleTheme }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  )
}
