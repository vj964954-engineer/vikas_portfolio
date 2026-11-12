"use client"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { profile, articles } from "@/lib/data"
import { motion } from "framer-motion"
import { Reveal, Magnetic } from "./fx"
import { Burst, LocalTime } from "./motion"

const wa = `https://wa.me/${profile.phoneHref.replace("tel:+", "")}?text=${encodeURIComponent("Hi Vikas, I'd like to talk about an app project.")}`
const channels = [
  { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: FaWhatsapp, label: "WhatsApp", value: profile.phone, href: wa },
  { Icon: Phone, label: "Call", value: profile.phone, href: profile.phoneHref },
  { Icon: FaLinkedin, label: "LinkedIn", value: "vikas-kumar-jain", href: profile.linkedin },
  { Icon: FaGithub, label: "GitHub", value: "vikas8385", href: profile.github },
]

export function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle")
  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return
    if ((form.current.elements.namedItem("company") as HTMLInputElement).value) return // honeypot
    setStatus("sending")
    try {
      await emailjs.sendForm(profile.emailjs.service, profile.emailjs.template, form.current, profile.emailjs.publicKey)
      form.current.reset(); setStatus("ok")
    } catch { setStatus("err") }
  }
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-sm text-accent">{"// contact"}</p>
          <h2 className="title-2">Have an app to build? Let&apos;s talk.</h2>
          <p className="lead mt-4">Hiring for an Android or iOS role, or shipping a product? Send a message and I&apos;ll reply.</p>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-3">
            <Reveal kind="left"><LocalTime /></Reveal>
            {channels.map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} kind="left" delay={0.07 * (i + 1)}>
              <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group glass glass-hover flex items-center gap-4 p-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><Icon size={20} /></span>
                <span className="min-w-0"><span className="block text-sm text-muted">{label}</span><span className="block truncate font-semibold">{value}</span></span>
              </a>
              </Reveal>
            ))}
          </div>
          <Reveal kind="right" delay={0.1}>
            <form ref={form} onSubmit={send} className="glass gborder space-y-4 p-6 sm:p-8" aria-describedby="form-status">
              <h3 className="text-2xl font-semibold">Send a message</h3>
              <label className="block"><span className="sr-only">Your name</span><input name="user_name" required autoComplete="name" placeholder="Your name" className="field" /></label>
              <label className="block"><span className="sr-only">Your email</span><input name="user_email" type="email" required autoComplete="email" placeholder="Your email" className="field" /></label>
              <label className="block"><span className="sr-only">Message</span><textarea name="message" required rows={5} maxLength={800} placeholder="What are you building?" className="field resize-none" /></label>
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <div className="relative">
                <Magnetic><button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">{status === "sending" ? "Sending…" : <>Send message <Send size={17} /></>}</button></Magnetic>
                {status === "ok" && <Burst />}
              </div>
              <div id="form-status" role="status" aria-live="polite" className="min-h-6 text-sm">
                {status === "ok" && <p className="flex items-center gap-2 text-accent"><CheckCircle2 size={18} />Message sent. I&apos;ll reply soon.</p>}
                {status === "err" && <p className="flex items-center gap-2 text-red-400"><AlertCircle size={18} />Sending failed. Email <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a> or use WhatsApp.</p>}
              </div>
            </form>
          </Reveal>
        </div>
        <p className="mt-10 text-sm text-muted">I also write on LinkedIn:{" "}
          <a href={articles[0].link} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">latest articles</a>.
        </p>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
      <motion.p aria-hidden className="outline-text pointer-events-none mb-6 select-none text-center font-display font-bold leading-none text-[clamp(4rem,21vw,15rem)]" initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>VIKAS</motion.p>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. {profile.location}.</p>
        <a href="#top" className="inline-flex min-h-11 items-center hover:text-fg">Back to top</a>
      </div>
    </footer>
  )
}
