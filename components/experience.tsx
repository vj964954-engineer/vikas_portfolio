"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import { experience } from "@/lib/data"
import { Reveal, SectionHead } from "./ui-bits"

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] })
  const draw = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.3 })

  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHead
          index="06" eyebrow="Experience" title="From Java intern to shipping on both stores."
          sub="Five roles since 2022 — mobile, backend and data."
        />

        <ol ref={list} className="relative border-l border-line ml-3 sm:ml-4 space-y-5">
          <motion.span aria-hidden style={{ scaleY: draw }} className="absolute -left-px top-0 bottom-0 w-[3px] -translate-x-[1px] origin-top rounded-full bg-gradient-to-b from-accent to-accent/30" />
          {experience.map((job, i) => {
            const isOpen = open === i
            return (
              <Reveal key={job.company + job.period} delay={i * 0.05}>
                <li className="relative pl-7 sm:pl-10">
                  <span
                    className={`absolute -left-[9px] top-7 w-[17px] h-[17px] rounded-full border-4 border-bg ${job.current ? "bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent)]" : "bg-muted"}`}
                    aria-hidden
                  />
                  <div className="card">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold leading-snug">{job.role}</h3>
                        <p className="text-accent-text font-semibold">{job.company}</p>
                        <p className="text-sm text-muted mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="font-mono">{job.period}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                          {job.current && <span className="chip chip-accent">Current</span>}
                        </p>
                      </div>
                      <ChevronDown className={`shrink-0 mt-1 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }} className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-line">
                            <ul className="space-y-3 mt-5 text-[15px] text-muted leading-relaxed">
                              {job.bullets.map((b) => (
                                <li key={b} className="flex gap-3">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{b}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-5">
                              {job.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
