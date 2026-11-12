import { FaAndroid, FaApple } from "react-icons/fa"
import { profile, education, achievements, skillGroups, experience, caseStudies, apps, ambassador, services } from "@/lib/data"
import { Depth, Head, Reveal, Tilt } from "./fx"
import { AppIcon } from "./icons"
import { AppsGrid } from "./apps-grid"
import { FlipCard } from "./flip"
import { PhoneUI } from "./phone"
import { CodeBlock, Deco, Parallax, ScrollText, SkillOrbit, StaggerChips, TimelineLine } from "./motion"

function Chips({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return <StaggerChips items={items} accent={accent} />
}

export function About() {
  return (
    <section id="about" className="section">
      <Deco className="right-[4%] top-24" size={70} />
      <div className="wrap grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <Head k="about" t="Apps people open every day." />
          <ScrollText text={profile.summary} className="lead" />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-prose text-muted">{profile.summary2}</p>
          </Reveal>
        </div>
        <div className="space-y-4">
          <Reveal kind="right"><Tilt glare className="glass p-6">
            <h3 className="text-lg font-semibold">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.period} · CGPA {education.cgpa}</p>
            <div className="mt-4"><Chips items={education.coursework} /></div>
          </Tilt></Reveal>
          {achievements.map((a, i) => (
            <Reveal key={a.title} kind="right" delay={0.08 * (i + 1)}>
              <div className="glass p-5">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-muted">{a.org} · {a.date}</p>
                {a.href && <a href={a.href} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-2 inline-block text-sm text-accent underline-offset-4 hover:underline">{a.cta}</a>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const kt = `class HomeViewModel @Inject constructor(
  private val repo: Repository
) : ViewModel() {
  val state = repo.load().asLiveData()
}`
const sw = `struct HomeView: View {
  @StateObject var vm = HomeVM()
  var body: some View {
    List(vm.items) { Row(item: $0) }
  }
}`

export function Skills() {
  const [android, ios] = [skillGroups[0], skillGroups[1]]
  const rest = skillGroups.slice(2)
  const pool = skillGroups.map((g) => g.items)
  const orbit: string[] = []
  for (let k = 0; orbit.length < 14 && k < 12; k++) pool.forEach((a) => { if (a[k] && !orbit.includes(a[k]) && orbit.length < 14) orbit.push(a[k]) })
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Head k="skills" t="Two platforms, one standard." s="Native on both Android and iOS, with the same architecture habits on each." />
        <div className="grid gap-5 md:grid-cols-2">
          {[[android, <FaAndroid key="a" />, kt], [ios, <FaApple key="i" />, sw]].map(([g, icon, code]: any, i) => (
            <Reveal key={g.title} kind={i === 0 ? "left" : "right"} delay={i * 0.1}>
              <Tilt glare className="glass gborder h-full space-y-5 p-6 sm:p-8">
                <h3 className="flex items-center gap-3 text-2xl font-semibold"><span className="text-accent">{icon}</span>{g.title}</h3>
                <Chips items={g.items} accent />
                <CodeBlock code={code} className="rounded-xl border border-line bg-black/40 p-4 text-muted" />
              </Tilt>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((g, i) => (
            <Reveal key={g.title} kind="zoom" delay={(i % 3) * 0.08}>
              <div className="glass glass-hover h-full space-y-3 p-5"><h3 className="font-semibold">{g.title}</h3><Chips items={g.items} /></div>
            </Reveal>
          ))}
        </div>
        <SkillOrbit items={orbit} />
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Head k="experience" t="Where I've shipped." />
        <div className="relative ml-3">
        <TimelineLine />
        <ol className="space-y-8">
          {experience.map((j) => (
            <li key={j.role + j.company} className="relative pl-6 sm:pl-10">
              <span className={`absolute -left-[7px] top-2 size-3.5 rounded-full ${j.current ? "bg-accent shadow-[0_0_20px_var(--glow)]" : "bg-surface2 ring-1 ring-line"}`}>{j.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />}</span>
              <Reveal kind="left">
                <div className="glass p-5 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-xl font-semibold">{j.role}</h3>
                    <p className="text-sm text-muted">{j.period}</p>
                  </div>
                  <p className="text-accent">{j.company} <span className="text-muted">· {j.location}</span></p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <div className="mt-4"><Chips items={j.tech} /></div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}

function Stores({ links }: { links: { label: string; href: string; platform: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-4 !py-2 text-sm">
          {l.platform === "ios" ? <FaApple /> : <FaAndroid />}{l.label}
        </a>
      ))}
    </div>
  )
}

export function Projects() {
  const feat = caseStudies.find((c) => c.id === "easyshiksha")!
  const others = caseStudies.filter((c) => c.id !== "easyshiksha")
  const unique = Array.from(new Map(apps.map((a) => [a.title, a])).values())
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Head k="projects" t="Apps in the stores." s="Live on Google Play and the App Store." />
        <Depth className="glass gborder grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-5">
            <p className="chip chip-accent">Featured · Android</p>
            <div className="flex items-center gap-4"><AppIcon urls={feat.links.map((l) => l.href)} fallback={feat.icon} alt={`${feat.name} app icon`} size={64} className="size-16 rounded-2xl object-cover" /><h3 className="title-2">{feat.name}</h3></div>
            <p className="lead">{feat.tagline}</p>
            <Chips items={ambassador} accent />
            <ul className="list-disc space-y-2 pl-5 text-muted marker:text-accent">{feat.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <Stores links={feat.links} />
          </div>
          <div className="flex justify-center py-4"><Parallax from={36} to={-36}><PhoneUI className="[--pw:min(62vw,250px)]" /></Parallax></div>
        </Depth>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((c, i) => (
            <Reveal key={c.id} kind="zoom" delay={i * 0.1}>
              <Tilt glare className="glass glass-hover h-full space-y-4 p-6">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <AppIcon urls={c.links.map((l) => l.href)} fallback={c.icon} alt={`${c.name} app icon`} size={56} className="size-14 rounded-2xl object-cover" />
                  <div><h3 className="text-lg font-semibold">{c.name}</h3><p className="text-sm text-muted">{c.tagline}</p></div>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-accent">{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <Chips items={c.stack} />
                <Stores links={c.links} />
              </Tilt>
            </Reveal>
          ))}
        </div>
        <AppsGrid />
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section id="services" className="section">
      <Deco className="left-[3%] top-32" size={54} />
      <div className="wrap">
        <Head k="services" t="What I can build for you." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((s, i) => <Reveal key={s.title} kind="flip" delay={i * 0.1}><Tilt max={6}><FlipCard s={s} i={i} /></Tilt></Reveal>)}</div>
      </div>
    </section>
  )
}
