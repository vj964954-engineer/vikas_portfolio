"use client"

import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react"
import { profile } from "@/lib/data"
import { Reveal, SectionHead } from "./ui-bits"

type Status = "idle" | "sending" | "success" | "error"

const channels = [
  { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { Icon: MapPin, label: "Location", value: profile.location },
  { Icon: FaLinkedin, label: "LinkedIn", value: "vikas-kumar-jain", href: profile.linkedin },
  { Icon: FaGithub, label: "GitHub", value: "vikas8385", href: profile.github },
]

const intents = [
  { label: "💼 Hiring", text: "Hi Vikas, we're hiring for an Android / iOS role and would love to talk. " },
  { label: "🚀 Build my app", text: "Hi Vikas, I have an app idea and need a mobile developer. Here's what I'm building: " },
  { label: "🤝 Collaborate", text: "Hi Vikas, I'd like to collaborate on a project — " },
  { label: "👋 Say hi", text: "Hi Vikas! " },
]
const field = "field"

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [msg, setMsg] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (label: string, v: string) => {
    try { await navigator.clipboard.writeText(v); setCopied(label); setTimeout(() => setCopied(null), 1600) } catch {}
  }

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return
    setStatus("sending")
    try {
      await emailjs.sendForm(profile.emailjs.service, profile.emailjs.template, form.current, profile.emailjs.publicKey)
      form.current.reset()
      setMsg("")
      setStatus("success")
    } catch (err) {
      console.error("EmailJS error:", err)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="10" eyebrow="Contact" title="Let's build your next app."
          sub="Hiring for an Android or iOS role, or have a product to ship? Send a message — I reply quickly."
        />

        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-5">
          <Reveal className="space-y-3">
            {channels.map(({ Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-accent/15 text-accent-text shrink-0"><Icon size={20} /></span>
                  <span className="min-w-0">
                    <span className="block text-xs font-mono uppercase tracking-widest text-muted">{label}</span>
                    <span className="block font-semibold truncate">{value}</span>
                  </span>
                </>
              )
              const cls = "card flex items-center gap-4 p-4 sm:p-5"
              const copyable = label === "Email" || label === "Phone"
              return (
                <div key={label} className="relative">
                  {href ? (
                    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} card-hover ${copyable ? "pr-16" : ""}`}>{body}</a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                  {copyable && (
                    <button onClick={() => copy(label, value)} aria-label={`Copy ${label}`}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-surface2 border border-line hover:border-accent transition-colors">
                      {copied === label ? <Check size={16} className="text-accent-text" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form ref={form} onSubmit={send} className="card p-6 sm:p-8 space-y-4" aria-describedby="form-status">
              <h3 className="text-2xl font-bold mb-2">Send a message</h3>
              <div className="flex flex-wrap gap-2" aria-label="Quick start">
                {intents.map((i) => (
                  <button key={i.label} type="button" onClick={() => setMsg(i.text)} className="chip cursor-pointer hover:border-accent transition-colors !py-1.5">{i.label}</button>
                ))}
              </div>
              <label className="block">
                <span className="sr-only">Your name</span>
                <input name="user_name" required autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input name="user_email" type="email" required autoComplete="email" placeholder="Your email" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea name="message" required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={800} placeholder="Tell me about the role or project…" className={`${field} resize-none`} />
              </label>

              <p className="text-right text-xs text-muted -mt-2">{msg.length}/800</p>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
                {status === "sending" ? "Sending…" : <>Send message <Send size={17} /></>}
              </button>

              <div id="form-status" role="status" aria-live="polite" className="min-h-[1.5rem]">
                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm font-medium text-accent-text"><CheckCircle2 size={18} /> Thanks — message sent. I'll get back to you shortly.</p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <AlertCircle size={18} /> Couldn't send. Please email me at{" "}
                    <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
