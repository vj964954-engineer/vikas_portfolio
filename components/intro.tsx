"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CMD = "./gradlew assembleRelease"
const LOG: [string, string][] = [
  ["> Task :app:compileKotlin", "text-muted"],
  ["> Task :app:compileSwift", "text-muted"],
  ["> Task :app:mergeAssets", "text-muted"],
  ["> Task :app:signRelease", "text-muted"],
  ["BUILD SUCCESSFUL", "text-[#8ef0b2]"],
]

/** Terminal-style boot screen: types a build command, streams the log, then "launches" the site. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const ids: number[] = []
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      ids.push(window.setTimeout(onDone, 300))
      return () => ids.forEach((id) => window.clearTimeout(id))
    }
    let i = 0
    const typer = window.setInterval(() => {
      i++
      setTyped(i)
      if (i >= CMD.length) {
        window.clearInterval(typer)
        LOG.forEach((_, k) => ids.push(window.setTimeout(() => setShown(k + 1), 250 + k * 320)))
        ids.push(window.setTimeout(onDone, 250 + LOG.length * 320 + 950))
      }
    }, 32)
    return () => {
      window.clearInterval(typer)
      ids.forEach((id) => window.clearTimeout(id))
    }
  }, [onDone])

  const ok = shown >= LOG.length

  return (
    <motion.div
      className="intro crt fixed inset-0 z-[200] grid place-items-center bg-bg px-4"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onDone}
      aria-hidden
    >
      <div className="w-full max-w-[34rem]">
        <p className="mb-5 text-center font-display text-5xl font-bold gtext">VJ</p>
        <div className="overflow-hidden rounded-2xl border border-line bg-black/50 shadow-[0_40px_120px_-40px_var(--glow)]">
          <div className="flex items-center gap-2 border-b border-line bg-white/[.04] px-4 py-2.5">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate font-mono text-xs text-muted">vikas@jaipur — gradlew</span>
          </div>
          <div className="min-h-[13.5rem] break-words p-5 font-mono text-[12.5px] leading-7 sm:text-sm">
            <p>
              <span className="text-accent">$</span> {CMD.slice(0, typed)}
              {typed < CMD.length && <span className="caret" />}
            </p>
            {LOG.slice(0, shown).map(([t, c]) => (
              <p key={t} className={c}>{t}</p>
            ))}
            <div className="mt-3 h-1 overflow-hidden rounded bg-white/10">
              <div className="h-full bg-gradient-to-r from-accent to-accent2 transition-[width] duration-300" style={{ width: `${(shown / LOG.length) * 100}%` }} />
            </div>
            {ok && (
              <p className="mt-3 text-fg">
                <span className="text-[#c4a7ff]">fun</span> main() = <span className="text-[#6cf0ff]">Portfolio</span>.launch()<span className="caret" />
              </p>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">Tap anywhere to skip</p>
      </div>
    </motion.div>
  )
}
