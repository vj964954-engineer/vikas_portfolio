import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" })
const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" })

const SITE = "https://vikas-portfolio-virid.vercel.app"
const TITLE = "Vikas Kumar Jain — Android & iOS Mobile App Developer"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Vikas Kumar Jain" },
  description: "Mobile app developer in Jaipur, India building production Android (Kotlin, Java) and iOS (SwiftUI, UIKit) apps. 2+ years at Hawkscode.",
  authors: [{ name: "Vikas Kumar Jain", url: SITE }],
  keywords: ["Vikas Kumar Jain", "Android developer Jaipur", "iOS developer Jaipur", "Kotlin developer", "SwiftUI developer", "mobile app developer India"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: "Production apps on Google Play and the App Store. Kotlin · Java · SwiftUI · UIKit.", type: "website", url: SITE, siteName: "Vikas Kumar Jain", locale: "en_IN", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }] },
  twitter: { card: "summary_large_image", title: TITLE, images: ["/og-image.png"] },
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#05060a", colorScheme: "dark" }

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: "Vikas Kumar Jain", jobTitle: "Android & iOS Mobile App Developer", url: SITE,
  email: "mailto:jainvikas317420@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Hawkscode Pvt. Ltd." },
  knowsAbout: ["Android", "iOS", "Kotlin", "Java", "SwiftUI", "UIKit"],
  sameAs: ["https://github.com/vikas8385", "https://linkedin.com/in/vikas-kumar-jain-571a48230"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${jb.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
