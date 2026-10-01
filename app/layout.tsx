import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vikas Kumar Jain — Android & iOS Engineer",
  description:
    "Android & iOS engineer from Jaipur building production apps in Java, Kotlin and SwiftUI. 15+ apps live on Google Play and the App Store.",
  openGraph: {
    title: "Vikas Kumar Jain — Android & iOS Engineer",
    description: "15+ production apps on Google Play and the App Store. Kotlin · Java · SwiftUI · Jetpack Compose.",
    type: "website",
  },
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 }

// Runs before paint: restores saved choice, otherwise picks iOS for Apple devices, Android for everything else.
const initScript = `(function(){try{
var d=document.documentElement,s=localStorage,ua=navigator.userAgent||'';
var p=s.getItem('vj-platform')||(/iPhone|iPad|Macintosh|Mac OS/i.test(ua)?'ios':'android');
var t=s.getItem('vj-theme')||(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
var a=s.getItem('vj-accent')||'auto';d.dataset.platform=p;d.dataset.theme=t;d.dataset.accent=a;}catch(e){var d=document.documentElement;d.dataset.platform='android';d.dataset.theme='dark';}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-platform="android" data-theme="dark" data-accent="auto" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <div className="aurora" aria-hidden><i /><i /><i /></div>
        {children}
      </body>
    </html>
  )
}
