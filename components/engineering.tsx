"use client"

import { useState } from "react"
import { FaAndroid, FaApple } from "react-icons/fa"
import { ArrowRight, Check, GitBranch, Hammer, Package, Rocket } from "lucide-react"
import { usePlatform } from "./platform-provider"
import { Reveal, SectionHead } from "./ui-bits"

/* Edit these two arrays to re-use this section for any mobile developer. */

// Release pipeline — matches the CI/CD work in the resume (GitHub Actions + Fastlane, JUnit/Espresso).
const pipeline = [
  { Icon: GitBranch, title: "Push", note: "Feature branch → pull request, code review" },
  { Icon: Hammer, title: "Build", note: "GitHub Actions builds Gradle / Xcode targets" },
  { Icon: Check, title: "Test", note: "JUnit unit tests + Espresso UI tests" },
  { Icon: Package, title: "Package", note: "Fastlane signs and packages the release" },
  { Icon: Rocket, title: "Ship", note: "Google Play and App Store" },
]

// How one architecture maps across the two platforms.
const layers = [
  { layer: "UI", android: "Jetpack Compose / XML", ios: "SwiftUI / UIKit", tip: "Declarative UI on both: state in, UI out." },
  { layer: "State", android: "ViewModel + LiveData", ios: "ObservableObject + @Published", tip: "UI observes state; it never owns business logic." },
  { layer: "Networking", android: "Retrofit + OkHttp", ios: "URLSession", tip: "Typed API layer with one error-handling path." },
  { layer: "Local data", android: "Room", ios: "Core Data", tip: "Cache first, then refresh — the source of the faster load times." },
  { layer: "Dependency injection", android: "Hilt / Dagger", ios: "Initializer & environment injection", tip: "Swap real services for fakes in tests." },
  { layer: "Background work", android: "WorkManager", ios: "BackgroundTasks", tip: "Deferrable, battery-friendly jobs." },
  { layer: "Navigation", android: "Navigation component", ios: "NavigationStack", tip: "Single source of truth for the back stack." },
  { layer: "Testing", android: "JUnit + Espresso", ios: "XCTest + XCUITest", tip: "Same test pyramid on both sides." },
]

export default function Engineering() {
  const { platform } = usePlatform()
  const [open, setOpen] = useState(0)
  const [step, setStep] = useState(0)

  return (
    <section id="engineering" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="05" eyebrow="Toolkit" title="One architecture, two platforms."
          sub="How I structure apps and ship them — and how each concept maps between Android and iOS."
        />

        {/* release pipeline */}
        <Reveal className="mb-5">
          <div className="card p-5 sm:p-6">
            <h3 className="font-bold mb-5">Release pipeline</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {pipeline.map(({ Icon, title, note }, i) => {
                const on = i <= step
                return (
                  <li key={title} className="relative">
                    <button
                      onClick={() => setStep(i)}
                      aria-pressed={on}
                      className={`w-full h-full text-left rounded-2xl border p-4 transition-colors ${on ? "bg-accent/12 border-accent/40" : "bg-surface2 border-line hover:border-accent/40"}`}
                    >
                      <span className={`grid place-items-center w-9 h-9 rounded-xl mb-3 ${on ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`}><Icon size={17} /></span>
                      <span className="block font-semibold text-sm">{i + 1}. {title}</span>
                      <span className="block text-xs text-muted mt-1 leading-snug">{note}</span>
                    </button>
                    {i < pipeline.length - 1 && <ArrowRight size={14} className="hidden lg:block absolute -right-[11px] top-1/2 -translate-y-1/2 text-muted z-10" aria-hidden />}
                  </li>
                )
              })}
            </ol>
            <p className="text-xs text-muted mt-4">Tap a stage to walk through the pipeline.</p>
          </div>
        </Reveal>

        {/* Android <-> iOS map */}
        <Reveal delay={0.06}>
          <div className="card p-3 sm:p-4">
            <div className="hidden sm:grid grid-cols-[1fr_1.2fr_1.2fr] gap-3 px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-muted">
              <span>Layer</span>
              <span className={`flex items-center gap-1.5 ${platform === "android" ? "text-accent-text" : ""}`}><FaAndroid size={13} /> Android</span>
              <span className={`flex items-center gap-1.5 ${platform === "ios" ? "text-accent-text" : ""}`}><FaApple size={13} /> iOS</span>
            </div>
            <ul>
              {layers.map((l, i) => {
                const isOpen = open === i
                return (
                  <li key={l.layer} className="border-t border-line first:border-t-0">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-4 py-3.5 grid sm:grid-cols-[1fr_1.2fr_1.2fr] gap-x-3 gap-y-1 items-center rounded-2xl hover:bg-surface2/60 transition-colors"
                    >
                      <span className="font-semibold">{l.layer}</span>
                      <span className={`text-sm break-words ${platform === "android" ? "text-accent-text font-medium" : "text-muted"}`}><FaAndroid size={12} className="inline sm:hidden mr-1.5" />{l.android}</span>
                      <span className={`text-sm break-words ${platform === "ios" ? "text-accent-text font-medium" : "text-muted"}`}><FaApple size={12} className="inline sm:hidden mr-1.5" />{l.ios}</span>
                    </button>
                    {isOpen && <p className="px-4 pb-4 -mt-1 text-sm text-muted">{l.tip}</p>}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
