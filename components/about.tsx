"use client"

import { FaAndroid, FaApple } from "react-icons/fa"
import { Cloud, GraduationCap, MapPin } from "lucide-react"
import { profile, education } from "@/lib/data"
import { useState } from "react"
import { Highlight, Reveal, SectionHead, Tilt } from "./ui-bits"
import { usePlatform } from "./platform-provider"

const pillars = [
  {
    Icon: FaAndroid, title: "Android",
    text: "Kotlin and Java with Jetpack Compose and XML, the Android SDK, MVVM + Clean Architecture, Hilt/Dagger, Room, Coroutines, WorkManager and Paging 3.",
    chips: ["Kotlin", "Java", "Jetpack Compose", "Hilt", "Room", "Retrofit"],
  },
  {
    Icon: FaApple, title: "iOS",
    text: "SwiftUI, UIKit and Storyboard on the iOS SDK — from Core Data persistence to HealthKit — shipped through App Store submission.",
    chips: ["Swift", "SwiftUI", "UIKit", "Storyboard", "Core Data", "HealthKit"],
  },
  {
    Icon: Cloud, title: "Backend & Cloud",
    text: "Java and Spring Boot microservices, REST APIs and SQL, deployed on AWS (EC2, S3, RDS) and Azure — plus CI/CD with GitHub Actions and Fastlane.",
    chips: ["Spring Boot", "REST API", "AWS", "Azure", "GitHub Actions", "Fastlane"],
  },
]

const snippets = {
  android: {
    file: "CoursesViewModel.kt",
    code: `@HiltViewModel
class CoursesViewModel @Inject constructor(
    private val repo: CourseRepository
) : ViewModel() {

    // Room → Flow → UI state, offline-first
    val courses = repo.observeCourses()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}`,
  },
  ios: {
    file: "CoursesViewModel.swift",
    code: `@MainActor
final class CoursesViewModel: ObservableObject {
    @Published private(set) var courses: [Course] = []
    private let repo: CourseRepository

    // Async/await, offline-first
    func load() async {
        courses = (try? await repo.fetchCourses()) ?? []
    }
}`,
  },
} as const

function CodeCard() {
  const { platform } = usePlatform()
  const [pick, setPick] = useState<"android" | "ios" | null>(null)
  const cur = pick ?? platform
  return (
    <Tilt className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface2/60">
        <div className="flex items-center gap-1.5" aria-hidden><i className="w-3 h-3 rounded-full bg-[#ff5f57]" /><i className="w-3 h-3 rounded-full bg-[#febc2e]" /><i className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
        <span className="font-mono text-xs text-muted">{snippets[cur].file}</span>
        <div role="tablist" className="flex gap-1">
          {(["android", "ios"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={cur === k} onClick={() => setPick(k)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${cur === k ? "bg-accent text-accent-ink" : "text-muted"}`}>{k === "ios" ? "Swift" : "Kotlin"}</button>
          ))}
        </div>
      </div>
      <pre className="code p-5 overflow-x-auto"><code><Highlight code={snippets[cur].code} /></code></pre>
      <p className="px-5 pb-4 text-xs text-muted">Same MVVM + repository idea on both platforms — illustrative of how I structure features.</p>
    </Tilt>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="01" eyebrow="About" title="Native apps, shipped end to end." />

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 mb-8">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>{profile.summary2}</p>
            <p className="text-fg">
              I own the full loop: requirements and UI/UX, development, testing, Play Store / App Store release, and post-launch
              maintenance — working in Agile/Scrum teams of 5–8 across several parallel client projects.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 self-start">
          <CodeCard />
          <div className="card p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-accent/15 text-accent-text shrink-0"><GraduationCap size={22} /></span>
              <div>
                <p className="font-semibold">{education.degree}</p>
                <p className="text-muted text-sm mt-0.5">{education.school}</p>
                <p className="text-muted text-sm">{education.period} · CGPA {education.cgpa}</p>
              </div>
            </div>
            <div className="h-px bg-line my-5" />
            <p className="flex items-center gap-2 text-muted text-sm"><MapPin size={16} /> {profile.location}</p>
          </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map(({ Icon, title, text, chips }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card card-hover p-6 sm:p-7 h-full flex flex-col">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-accent text-accent-ink mb-5"><Icon size={22} /></span>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted leading-relaxed mb-5 flex-1">{text}</p>
                <div className="flex flex-wrap gap-2">{chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
