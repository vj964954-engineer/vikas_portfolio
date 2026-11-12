"use client"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"

const words = ["Kotlin", "SwiftUI", "Jetpack Compose", "UIKit", "Hilt", "Room", "Retrofit", "Firebase", "Agora", "Razorpay"]

function Row({ dir, outline }: { dir: 1 | -1; outline?: boolean }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, (v) => {
    const m = (v * 0.05) % 25
    return `${dir === 1 ? -m : m - 25}%`
  })
  return (
    <motion.div
      className={`flex w-max items-center whitespace-nowrap font-display font-bold text-[clamp(2.2rem,7vw,5.5rem)] leading-tight ${outline ? "outline-text" : "text-fg/90"}`}
      style={reduce ? undefined : { x }}
    >
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className="flex items-center">
          {words.map((w) => (
            <span key={w} className="px-[0.4em]">{w}<span className="ml-[0.8em] text-accent [-webkit-text-stroke:0]">✦</span></span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

/** Tech-stack ticker: moves with scroll and skews with scroll speed. */
export function Ticker() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const skewX = useTransform(vel, [-3000, 3000], [-8, 8], { clamp: true })
  return (
    <div aria-hidden className="relative select-none overflow-hidden py-6 sm:py-10">
      <motion.div style={reduce ? undefined : { skewX }}>
        <Row dir={1} />
        <Row dir={-1} outline />
      </motion.div>
    </div>
  )
}
