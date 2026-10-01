import { PlatformProvider } from "@/components/platform-provider"
import Nav from "@/components/nav"
import Hero from "@/components/hero"
import About from "@/components/about"
import Featured from "@/components/featured"
import Apps from "@/components/apps"
import Insights from "@/components/insights"
import Engineering from "@/components/engineering"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Credentials from "@/components/credentials"
import Writing from "@/components/writing"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AppChrome from "@/components/app-chrome"

export default function Home() {
  return (
    <PlatformProvider>
      <AppChrome />
      <Nav />
      <main>
        <Hero />
        <About />
        <Featured />
        <Apps />
        <Insights />
        <Engineering />
        <Experience />
        <Skills />
        <Credentials />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </PlatformProvider>
  )
}
