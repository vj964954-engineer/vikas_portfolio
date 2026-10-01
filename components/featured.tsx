"use client"

import { useRef } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { FaAndroid, FaApple } from "react-icons/fa"
import { ArrowUpRight, ChevronsRight } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/lib/data"
import { AppIcon, SectionHead } from "./ui-bits"
import { usePlatform } from "./platform-provider"
import { useState } from "react"

const hero: Record<string, { value: string; label: string; chips: string[] }> = {
  funzo: { value: "100+", label: "concurrent users in live voice rooms", chips: ["4.2★ at launch", "Agora RTC"] },
  easyshiksha: { value: "50,000+", label: "registered learners, 1,000+ programs", chips: ["99%+ crash-free", "−40% load time"] },
  thrive: { value: "3 taps", label: "from open to booked ride", chips: ["Live ETA", "Rider + driver"] },
  careerhelper: { value: "80%+", label: "test completion rate", chips: ["ML matching", "IQ & psychometric"] },
}

/** A device whose screen is a "now playing" card for the case study. */
function CaseDevice({ c, size = 250 }: { c: CaseStudy; size?: number | string }) {
  const { platform } = usePlatform()
  const ios = platform === "ios"
  const h = hero[c.id]
  return (
    <div className="phone shrink-0" aria-hidden style={{ width: size }}>
      <div className="absolute inset-[5px] overflow-hidden flex flex-col bg-gradient-to-b from-accent/30 via-[#0c1012] to-[#090b0c]" style={{ borderRadius: ios ? 46 : 34 }}>
        {ios
          ? <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[76px] h-[22px] rounded-full bg-black z-10" />
          : <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-black ring-1 ring-white/20 z-10" />}
        <div className="px-5 pt-14 flex flex-col items-center text-center flex-1">
          <AppIcon src={c.icon} name={c.name} size={76} />
          <p className="text-white font-bold text-lg mt-3 leading-tight">{c.name}</p>
          <p className="text-white/55 text-[11px]">{c.tagline}</p>
          <p className="text-accent-text font-extrabold tracking-tight mt-7 text-[34px] leading-none">{h.value}</p>
          <p className="text-white/60 text-[11px] mt-2 px-2 leading-snug">{h.label}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {h.chips.map((x) => <span key={x} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80">{x}</span>)}
          </div>
          <span className="mt-auto mb-7 w-full text-[11px] font-bold py-2.5 bg-accent text-accent-ink" style={{ borderRadius: ios ? 999 : 14 }}>{ios ? "GET" : "Install"}</span>
        </div>
      </div>
    </div>
  )
}

function Body({ c, i, compact = false }: { c: CaseStudy; i: number; compact?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-xs text-accent-text mb-3">{String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")} · {c.period}</p>
      <div className="flex items-center gap-3 mb-1">
        <h3 className="h-display text-4xl sm:text-5xl">{c.name}</h3>
        <span className="flex gap-1.5 text-muted" aria-label={`Platforms: ${c.platforms.join(" and ")}`}>
          {c.platforms.includes("android") && <FaAndroid size={20} />}
          {c.platforms.includes("ios") && <FaApple size={20} />}
        </span>
      </div>
      <p className="text-lg text-muted mb-5">{c.tagline}</p>
      <ul className={`space-y-3 text-[15px] leading-relaxed text-muted ${compact ? "mb-5" : "mb-6"}`}>
        {c.bullets.map((b) => (
          <li key={b} className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /><span>{b}</span></li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mb-5">{c.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
      <div className="flex flex-wrap gap-3">
        {c.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2.5 !min-h-[44px] text-sm">
            {l.platform === "android" ? <FaAndroid /> : <FaApple />} {l.label} <ArrowUpRight size={15} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Featured() {
  const track = useRef<HTMLDivElement>(null)
  const n = caseStudies.length
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`])
  const [cur, setCur] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => setCur(Math.min(n - 1, Math.round(v * (n - 1)))))

  return (
    <section id="work" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="02" eyebrow="Selected work" title="Four apps, in depth."
          sub="The products I'm proudest of — what they do, what I built, and the numbers behind them."
        />
      </div>

      {/* Desktop: pinned section, vertical scroll drives a horizontal track */}
      <div ref={track} className="hidden lg:block relative" style={{ height: `${n * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x, width: `${n * 100}%` }} className="flex h-full will-change-transform">
            {caseStudies.map((c, i) => (
              <div key={c.id} className="h-full shrink-0 grid place-items-center px-8 pt-16" style={{ width: `${100 / n}%` }}>
                <div className="mx-auto max-w-6xl w-full grid grid-cols-[1.15fr_.85fr] gap-14 items-center">
                  <Body c={c} i={i} compact />
                  <div className="flex justify-center"><CaseDevice c={c} size="min(250px, 44vh)" /></div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* progress HUD */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 card !rounded-full px-5 py-3 flex items-center gap-4">
            <div className="flex gap-2">
              {caseStudies.map((c, i) => (
                <span key={c.id} className={`h-2 rounded-full transition-all ${i === cur ? "w-8 bg-accent" : "w-2 bg-muted/50"}`} />
              ))}
            </div>
            <span className="text-xs font-semibold text-muted flex items-center gap-1">{caseStudies[cur].name} <ChevronsRight size={14} /></span>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: native swipe carousel */}
      <div className="lg:hidden">
        <p className="px-5 sm:px-8 mb-3 text-xs font-mono uppercase tracking-widest text-muted flex items-center gap-1.5">Swipe <ChevronsRight size={14} /></p>
        <div className="snap-rail no-scrollbar flex gap-4 overflow-x-auto px-5 sm:px-8 pb-6">
          {caseStudies.map((c, i) => (
            <article key={c.id} className="card shrink-0 w-[88%] sm:w-[70%] p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex justify-center -mb-2"><CaseDevice c={c} size={210} /></div>
              <Body c={c} i={i} compact />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
