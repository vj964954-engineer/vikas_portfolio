"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Award, ArrowUpRight, Expand, GraduationCap, X } from "lucide-react"
import { achievements, education } from "@/lib/data"
import { Reveal, SectionHead, Tilt } from "./ui-bits"

const CERT = "/mobile-wallpaper.jpeg"

export default function Credentials() {
  const [zoom, setZoom] = useState(false)
  useEffect(() => {
    if (!zoom) return
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false)
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [zoom])

  return (
    <section id="credentials" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="08" eyebrow="Credentials" title="Education & achievements." />

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <Tilt className="h-full">
                <div className="card p-6 h-full flex flex-col relative overflow-hidden">
                  <span aria-hidden className="absolute -top-6 -right-2 text-[7rem] font-extrabold leading-none text-accent/10 select-none">{i + 1}</span>
                  <span className="relative grid place-items-center w-11 h-11 rounded-2xl bg-accent/15 text-accent-text mb-4"><Award size={20} /></span>
                  <p className="font-mono text-xs text-accent-text">{a.org} · {a.date}</p>
                  <h3 className="font-bold text-lg leading-snug mt-1.5 mb-3">{a.title}</h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">{a.text}</p>
                  {a.href && (
                    <a href={a.href} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline">{a.cta} <ArrowUpRight size={15} /></a>
                  )}
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-4 sm:gap-5 mt-5">
          <Reveal>
            <div className="card p-6 sm:p-8 h-full">
              <span className="grid place-items-center w-11 h-11 rounded-2xl bg-accent text-accent-ink mb-4"><GraduationCap size={20} /></span>
              <p className="font-mono text-xs text-accent-text">{education.period}</p>
              <h3 className="font-bold text-xl mt-1">{education.degree}</h3>
              <p className="text-muted">{education.school}, {education.location}</p>
              <div className="mt-5 flex items-end gap-3">
                <span className="h-display text-5xl text-accent-text">8.4</span>
                <span className="text-muted pb-1.5">/ 10 CGPA</span>
              </div>
              <div className="h-2 rounded-full bg-surface2 mt-3 overflow-hidden" aria-hidden>
                <motion.div initial={{ width: 0 }} whileInView={{ width: "84%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full rounded-full bg-accent" />
              </div>
              <p className="text-sm text-muted mt-6 mb-3">Relevant coursework</p>
              <div className="flex flex-wrap gap-2">{education.coursework.map((c) => <span key={c} className="chip">{c}</span>)}</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <button onClick={() => setZoom(true)} className="card card-hover group relative w-full h-full min-h-[280px] overflow-hidden text-left" aria-label="Open internship certificate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CERT} alt="EasyShiksha internship certificate" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                <span><span className="block font-mono text-[11px] text-white/70">EasyShiksha</span><span className="block font-bold">Internship certificate</span></span>
                <span className="grid place-items-center w-10 h-10 rounded-full bg-white/20 backdrop-blur"><Expand size={16} /></span>
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setZoom(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Certificate">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-h-[90vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CERT} alt="EasyShiksha internship certificate" className="max-h-[90vh] w-auto rounded-2xl shadow-2xl" />
              <button onClick={() => setZoom(false)} aria-label="Close" className="absolute -top-3 -right-3 grid place-items-center w-10 h-10 rounded-full bg-accent text-accent-ink"><X size={18} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
