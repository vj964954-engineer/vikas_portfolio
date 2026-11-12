import { getIcons } from "@/lib/icons"
import { IconsProvider } from "@/components/icons"
import { Shell } from "@/components/fx"
import Nav from "@/components/nav"
import Hero from "@/components/hero"
import { About, Skills, Experience, Projects, Services } from "@/components/sections"
import { Journey } from "@/components/journey"
import { BackToTop, Divider, SectionRail } from "@/components/motion"
import { Ticker } from "@/components/ticker"
import { Insights } from "@/components/graphics"
import { Writing } from "@/components/writing"
import { Contact, Footer } from "@/components/contact"

export const revalidate = 86400

export default async function Home() {
  const icons = await getIcons()
  return (
    <Shell>
      <IconsProvider map={icons}>
      <Nav />
      <main id="main">
        <Hero />
        <Journey />
        <Ticker />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Insights />
        <Divider />
        <Services />
        <Divider />
        <Writing />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <BackToTop />
      </IconsProvider>
    </Shell>
  )
}
