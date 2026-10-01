"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import { ArrowUp, Mail } from "lucide-react"
import { profile } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t border-line mt-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-bold">{profile.name}</p>
          <p className="text-sm text-muted">Android &amp; iOS Engineer · {profile.location}</p>
          <p className="text-xs text-muted mt-2">© {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { Icon: FaGithub, href: profile.github, label: "GitHub" },
            { Icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              className="grid place-items-center w-11 h-11 rounded-full bg-surface2 border border-line hover:border-accent transition-colors">
              <Icon size={17} />
            </a>
          ))}
          <a href="#top" aria-label="Back to top" className="grid place-items-center w-11 h-11 rounded-full bg-accent text-accent-ink ml-2">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
