"use client"
import { useState } from "react"
import { FaAndroid, FaApple } from "react-icons/fa"
import { Plug, Rocket } from "lucide-react"

const icons = [<FaAndroid key="a" size={30} />, <FaApple key="i" size={30} />, <Plug key="p" size={30} />, <Rocket key="r" size={30} />]

export function FlipCard({ s, i }: { s: { title: string; text: string; tags: string[] }; i: number }) {
  const [f, setF] = useState(false)
  return (
    <div className="flip-wrap h-60" style={{ perspective: 1000 }}>
      <button type="button" aria-pressed={f} aria-label={`${s.title}. Tap to ${f ? "show title" : "read details"}`} onClick={() => setF(!f)} className={`flip relative size-full text-left ${f ? "is-flipped" : ""}`}>
        <span className="face glass absolute inset-0 flex flex-col justify-between p-6">
          <span className="text-accent">{icons[i]}</span>
          <span><span className="block font-display text-2xl font-semibold">{s.title}</span><span className="mt-1 block text-sm text-muted">Tap or hover for details</span></span>
        </span>
        <span className="face face-back glass absolute inset-0 flex flex-col justify-between p-6">
          <span className="text-sm text-muted">{s.text}</span>
          <span className="flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="chip chip-accent">{t}</span>)}</span>
        </span>
      </button>
    </div>
  )
}
