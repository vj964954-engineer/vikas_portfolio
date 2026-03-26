"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero-enhanced"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import SkillsVisualization from "@/components/skills-visualization"
import Skills from "@/components/skills"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="bg-background text-text">
        <Header />
        <Hero />
        <About />
        
        <Projects />
        
        <Skills />
        <Experience />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
