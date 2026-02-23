"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowDown, FaCode, FaMobile, FaRocket, FaMouse, FaHandPointer, FaHeart, FaStar } from "react-icons/fa"
import { useInView } from "react-intersection-observer"

// Animated Background Particles
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, color: string}> = []
    
    // Create particles with different colors
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444']
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    let mouseX = 0
    let mouseY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.5
          particle.vy += (dy / distance) * force * 0.5
        }
        
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + '40'
        ctx.fill()
        
        // Draw glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + '10'
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="absolute inset-0" />
}

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const springY = useSpring(y, { stiffness: 100, damping: 20 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 })
  
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 1000)
  }

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/vikas8385", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/vikas-kumar-jain-571a48230", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" }
  ]

  return (
    <section 
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 text-blue-400 text-6xl opacity-20"
          style={{
            filter: `hue-rotate(${mousePosition.x * 0.1}deg)`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          <FaCode />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 text-purple-400 text-5xl opacity-20"
          style={{
            filter: `hue-rotate(${mousePosition.y * 0.1}deg)`,
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        >
          <FaMobile />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -180, -360],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-1/3 text-pink-400 text-7xl opacity-20"
          style={{
            filter: `hue-rotate(${mousePosition.x * 0.15}deg)`,
            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
          }}
        >
          <FaRocket />
        </motion.div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: Math.random() * 360
                  }}
                  animate={{
                    y: window.innerHeight + 20,
                    rotate: Math.random() * 360,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2"
                  style={{
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
                    left: `${Math.random() * 100}%`,
                    top: '0%'
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        style={{ y: springY, opacity: springOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Main Title with 3D Effect */}
          <motion.h1 
            className="text-7xl md:text-9xl font-bold text-white tracking-wider"
            whileHover={{ scale: 1.05 }}
            style={{
              textShadow: isHovered ? 
                '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)' : 
                '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              VIKAS KUMAR JAIN
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl text-gray-300 mb-4 font-semibold">
              Full Stack Developer & 3D Experience Designer
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Crafting extraordinary digital experiences with cutting-edge technologies. 
              Specializing in Java, Spring Boot, Swift UI, Kotlin, and immersive 3D web applications.
            </p>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { number: "2+", label: "Years Experience", icon: FaRocket },
              { number: "32+", label: "Projects Delivered", icon: FaCode },
              { number: "15+", label: "Technologies", icon: FaStar },
              { number: "100%", label: "Client Satisfaction", icon: FaHeart }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
              >
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
           <motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(79, 70, 229, 0.4)" }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    // 1. Point to the file in the public folder
    const resumeUrl = '/public/resume.pdf' 
    
    // 2. Create the download trigger
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Vikas-Kumar-Jain-Resume.pdf' // The name the user will see when saving
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 3. Trigger your confetti and click count
    setClickCount(prev => prev + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }}
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 hover:shadow-2xl transition-all duration-300 group"
>
  <FaDownload className="text-xl" />
  <span className="relative z-10">Download Resume</span>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
</motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Contact functionality
                const email = 'vikas8385@gmail.com' // Update with your actual email
                const subject = 'Portfolio Inquiry - From vikas-portfolio.com'
                const body = 'Hello Vikas,%0A%0AI would love to connect with you! Please let me know about any opportunities or collaborations.'
                
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                
                // Show success message
                setClickCount(prev => prev + 1)
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 2000)
              }}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 hover:shadow-2xl transition-all duration-300 group"
            >
              <FaEnvelope className="text-xl" />
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 rounded-full transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex gap-8 justify-center mb-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="text-white text-3xl hover:text-blue-400 transition-colors duration-300 group"
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Click Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm">
              You've clicked <span className="text-blue-400 font-bold text-lg"> {clickCount} </span> times!
            </p>
            <p className="text-gray-500 text-xs mt-2">
              <FaMouse className="inline-block mr-2 animate-bounce" />
              Click anywhere for interactive effects
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaArrowDown className="text-3xl" />
      </motion.div>
    </section>
  )
}
