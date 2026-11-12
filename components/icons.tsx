"use client"
import { createContext, useContext, type ReactNode } from "react"

const Ctx = createContext<Record<string, string>>({})
export const IconsProvider = ({ map, children }: { map: Record<string, string>; children: ReactNode }) => <Ctx.Provider value={map}>{children}</Ctx.Provider>

/** App icon taken from the store page (Google Play / App Store) when available, else the fallback image. */
export function AppIcon({ urls, fallback, alt, size, className, eager = false }: { urls: string[]; fallback: string; alt: string; size: number; className?: string; eager?: boolean }) {
  const m = useContext(Ctx)
  const src = urls.map((u) => m[u]).find(Boolean) || fallback
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={size} height={size} loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer" className={className} />
}
