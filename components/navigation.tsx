"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { FaHome, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaEnvelope, FaBars, FaTimes, FaRocket, FaCubes } from "react-icons/fa"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: FaHome, color: "from-blue-500 to-cyan-500" },
  { id: "about", label: "About", icon: FaUser, color: "from-purple-500 to-pink-500" },
  { id: "projects", label: "Projects", icon: FaCode, color: "from-green-500 to-emerald-500" },
  { id: "skills", label: "Skills", icon: FaGraduationCap, color: "from-yellow-500 to-orange-500" },
  {  id: "experience", label: "Experience", icon: FaBriefcase, color: "from-red-500 to-rose-500" },
  { id: "contact", label: "Contact", icon: FaEnvelope, color: "from-indigo-500 to-purple-500" }
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isScrolled ? 0 : -100, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-white/10"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 135, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)`,
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 180 }}
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <FaCode className="text-white text-lg" />
              </motion.div>
              <span className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors">
                Portfolio
              </span>
            </motion.div>

            {/* Enhanced Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    whileHover={{ scale: 1.05, y: -2, rotateX: 10 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 relative overflow-hidden group`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${activeSection === item.id ? item.color : 'transparent'}`} />
                    <div className="relative z-10 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: activeSection === item.id ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-lg" />
                      </motion.div>
                      <span>{item.label}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white shadow-lg"
            >
              <FaBars className="text-xl" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-50 md:hidden bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-white/10"
            style={{
              background: `linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 135, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)`,
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-end mb-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white shadow-lg"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
              
              {/* Enhanced Mobile Nav Links */}
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      initial={{ opacity: 0, x: -50, rotateY: 90 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5, rotateX: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 relative overflow-hidden group`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${activeSection === item.id ? item.color : 'transparent'}`} />
                      <div className="relative z-10 flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: activeSection === item.id ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="text-lg" />
                        </motion.div>
                        <span>{item.label}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col gap-3 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 rounded-full border border-white/10"
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.5, rotate: 360 }}
              whileTap={{ scale: 0.8 }}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300`}
              style={{
                background: activeSection === item.id 
                  ? `linear-gradient(135deg, ${item.color.split(' ')[0]}, ${item.color.split(' ')[2]})`
                  : 'rgba(255, 255, 255, 0.2)',
                borderColor: activeSection === item.id 
                  ? item.color.split(' ')[0]
                  : 'rgba(255, 255, 255, 0.4)',
                boxShadow: activeSection === item.id 
                  ? `0 0 20px ${item.color.split(' ')[0]}`
                  : 'none'
              }}
              title={item.label}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 right-8 z-30 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="text-blue-400/20 text-4xl"
        >
          <FaRocket />
        </motion.div>
      </div>

      <div className="fixed bottom-20 left-8 z-30 hidden lg:block">
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-purple-400/20 text-4xl"
        >
          <FaCubes />
        </motion.div>
      </div>
    </>
  )
}
