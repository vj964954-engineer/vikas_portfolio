import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

const SITE = "https://vikas-portfolio-virid.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Vikas Kumar Jain — Android & iOS Engineer",
  description:
    "Android & iOS engineer from Jaipur building production apps in Java, Kotlin and SwiftUI. 15+ apps live on Google Play and the App Store.",
  keywords: [
    "Vikas Kumar Jain",
    "Android developer Jaipur",
    "iOS developer Jaipur",
    "Kotlin developer",
    "SwiftUI developer",
    "mobile app developer portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Vikas Kumar Jain — Android & iOS Engineer",
    description: "15+ production apps on Google Play and the App Store. Kotlin · Java · SwiftUI · Jetpack Compose.",
    type: "website",
    url: SITE,
    siteName: "Vikas Kumar Jain",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikas Kumar Jain — Android & iOS Engineer",
    description: "15+ production apps on Google Play and the App Store.",
    images: ["/og-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vikas Kumar Jain",
  jobTitle: "Android & iOS Developer",
  url: SITE,
  email: "mailto:jainvikas317420@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Hawkscode Pvt. Ltd." },
  knowsAbout: ["Android", "iOS", "Kotlin", "Java", "SwiftUI", "Jetpack Compose"],
  sameAs: [
    "https://github.com/vikas8385",
    "https://linkedin.com/in/vikas-kumar-jain-571a48230",
  ],
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
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  <div className="aurora" aria-hidden><i /><i /><i /></div>
  {children}
</body>
    </html>
  )
}
