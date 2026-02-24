"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowDown, FaCode, FaMobile, FaRocket, FaMouse, FaHeart, FaStar, FaCubes, FaLayerGroup, FaMagic } from "react-icons/fa"
import { useInView } from "react-intersection-observer"
import { FaFilePdf } from "react-icons/fa"

// Ultra-Advanced 3D Particle System with Professional Physics
function UltraAdvancedParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Handle window resize for mobile responsiveness
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    
    // Professional particle system with advanced features
    interface AdvancedParticle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      layer: number
      opacity: number
      pulsePhase: number
      rotation: number
      rotationSpeed: number
      connections: number[]
      trail: { x: number, y: number, opacity: number }[]
      energy: number
      type: 'core' | 'orbit' | 'quantum' | 'plasma'
    }
    
    const particles: AdvancedParticle[] = []
    
    // Professional color palette with gradients
    const colorSchemes = [
      { primary: '#3b82f6', secondary: '#06b6d4', accent: '#60a5fa' },
      { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc' },
      { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4' },
      { primary: '#14b8a6', secondary: '#10b981', accent: '#34d399' },
      { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fcd34d' },
      { primary: '#ef4444', secondary: '#f87171', accent: '#fca5a5' }
    ]
    
    // Create multi-layer particles with different types
    for (let i = 0; i < 300; i++) {
      const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
      const type = ['core', 'orbit', 'quantum', 'plasma'][Math.floor(Math.random() * 4)] as AdvancedParticle['type']
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 8 + 2,
        color: scheme.primary,
        layer: Math.floor(Math.random() * 4),
        opacity: Math.random() * 0.9 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        connections: [],
        trail: [],
        energy: Math.random(),
        type
      })
    }
    
    // Create orbital systems
    const orbitalSystems = Array.from({ length: 5 }, (_, i) => ({
      centerX: Math.random() * canvas.width,
      centerY: Math.random() * canvas.height,
      radius: 50 + Math.random() * 100,
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      particles: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
        angle: Math.random() * Math.PI * 2,
        distance: 20 + Math.random() * 30,
        size: 2 + Math.random() * 3,
        color: colorSchemes[i % colorSchemes.length].accent,
        speed: 0.02 + Math.random() * 0.03
      }))
    }))
    
    let mouseX = 0
    let mouseY = 0
    let time = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseRef.current = { x: mouseX, y: mouseY }
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    
    const drawParticle = (particle: AdvancedParticle) => {
      ctx.save()
      
      // Apply rotation
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)
      
      // Draw trail
      particle.trail.forEach((point, index) => {
        ctx.globalAlpha = point.opacity * 0.3
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(point.x - particle.x, point.y - particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })
      
      ctx.globalAlpha = particle.opacity * (1 - particle.layer * 0.25)
      
      // Draw particle based on type
      if (particle.type === 'core') {
        // Core particle with energy field
        const energyField = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 3)
        energyField.addColorStop(0, particle.color + '60')
        energyField.addColorStop(0.3, particle.color + '30')
        energyField.addColorStop(0.6, particle.color + '15')
        energyField.addColorStop(1, particle.color + '00')
        ctx.fillStyle = energyField
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner core
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
      } else if (particle.type === 'orbit') {
        // Orbital particle with rings
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2)
        ctx.stroke()
        
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
      } else if (particle.type === 'quantum') {
        // Quantum particle with wave effect
        const waveSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.5)
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(0, 0, waveSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Quantum rings
        ctx.strokeStyle = particle.color + '40'
        ctx.lineWidth = 1
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath()
          ctx.arc(0, 0, waveSize + i * 5, 0, Math.PI * 2)
          ctx.stroke()
        }
        
      } else if (particle.type === 'plasma') {
        // Plasma particle with gradient
        const plasmaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2)
        plasmaGradient.addColorStop(0, particle.color)
        plasmaGradient.addColorStop(0.5, particle.color + '80')
        plasmaGradient.addColorStop(1, particle.color + '00')
        ctx.fillStyle = plasmaGradient
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.restore()
    }
    
    const animate = () => {
      time += 0.016
      
      // Create dynamic gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.01)')
      gradient.addColorStop(0.25, 'rgba(88, 28, 135, 0.02)')
      gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.01)')
      gradient.addColorStop(0.75, 'rgba(20, 184, 166, 0.02)')
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.01)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw orbital systems
      orbitalSystems.forEach(system => {
        system.angle += system.speed
        
        system.particles.forEach(orbitParticle => {
          orbitParticle.angle += orbitParticle.speed
          const x = system.centerX + Math.cos(orbitParticle.angle) * orbitParticle.distance
          const y = system.centerY + Math.sin(orbitParticle.angle) * orbitParticle.distance
          
          // Draw orbital particle
          ctx.globalAlpha = 0.8
          ctx.fillStyle = orbitParticle.color
          ctx.beginPath()
          ctx.arc(x, y, orbitParticle.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Draw orbital path
          ctx.globalAlpha = 0.2
          ctx.strokeStyle = orbitParticle.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(system.centerX, system.centerY, orbitParticle.distance, 0, Math.PI * 2)
          ctx.stroke()
        })
      })
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Advanced mouse interaction with field effects
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (200 - distance) / 200
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 1.2
          particle.vy += Math.sin(angle) * force * 1.2
          particle.energy = Math.min(1, particle.energy + force * 0.1)
        }
        
        // Update position with physics
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off edges with energy loss
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.85
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
          particle.energy *= 0.9
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.85
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
          particle.energy *= 0.9
        }
        
        // Apply friction and energy decay
        particle.vx *= 0.995
        particle.vy *= 0.995
        particle.energy *= 0.995
        
        // Update animation properties
        particle.pulsePhase += 0.03
        particle.rotation += particle.rotationSpeed
        
        // Update trail
        particle.trail.push({ 
          x: particle.x, 
          y: particle.y, 
          opacity: particle.energy 
        })
        if (particle.trail.length > 10) {
          particle.trail.shift()
        }
        
        // Draw particle
        drawParticle(particle)
      })
      
      // Draw advanced connections between particles
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)'
      ctx.lineWidth = 1.5
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * Math.min(p1.energy, p2.energy) * 0.5
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            
            // Create curved connection
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2
            const curveX = midX + Math.sin(time + i) * 10
            const curveY = midY + Math.cos(time + i) * 10
            
            ctx.quadraticCurveTo(curveX, curveY, p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
      
      // Draw energy waves
      ctx.globalAlpha = 0.1
      particles.forEach(particle => {
        if (particle.energy > 0.5) {
          const waveGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.energy * 50
          )
          waveGradient.addColorStop(0, particle.color + '40')
          waveGradient.addColorStop(1, particle.color + '00')
          ctx.fillStyle = waveGradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.energy * 50, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// Professional 3D Geometric Shapes
function Professional3DShapes() {
  const shapes = [
    { 
      type: 'cube', 
      position: { x: 10, y: 20 }, 
      size: 60, 
      color: 'from-blue-400 to-cyan-400',
      rotationSpeed: 15
    },
    { 
      type: 'pyramid', 
      position: { x: 85, y: 30 }, 
      size: 50, 
      color: 'from-purple-400 to-pink-400',
      rotationSpeed: 20
    },
    { 
      type: 'sphere', 
      position: { x: 15, y: 70 }, 
      size: 70, 
      color: 'from-green-400 to-emerald-400',
      rotationSpeed: 25
    },
    { 
      type: 'torus', 
      position: { x: 80, y: 60 }, 
      size: 55, 
      color: 'from-yellow-400 to-orange-400',
      rotationSpeed: 18
    },
    { 
      type: 'helix', 
      position: { x: 50, y: 15 }, 
      size: 45, 
      color: 'from-red-400 to-rose-400',
      rotationSpeed: 22
    },
    { 
      type: 'diamond', 
      position: { x: 25, y: 85 }, 
      size: 65, 
      color: 'from-indigo-400 to-purple-400',
      rotationSpeed: 30
    }
  ]
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
            rotateX: [0, 15, 0],
            rotateY: [0, 360, 0],
            scale: [1, 1.3, 1],
            x: [0, 30, 0]
          }}
          transition={{
            duration: shape.rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
          className="absolute opacity-30"
          style={{
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
            filter: `hue-rotate(${index * 45}deg) brightness(1.2)`,
            transform: `perspective(1000px) rotateX(${index * 15}deg)`
          }}
        >
          <div 
            className={`w-${shape.size} h-${shape.size} bg-gradient-to-br ${shape.color} rounded-lg shadow-2xl`}
            style={{
              boxShadow: `0 0 40px ${shape.color.split(' ')[0]}, 0 0 80px ${shape.color.split(' ')[2]}`
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Ultra-Advanced Confetti System
function UltraAdvancedConfetti({ show }: { show: boolean }) {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#a855f7'][Math.floor(Math.random() * 10)],
    shape: ['circle', 'square', 'triangle', 'hexagon', 'star'][Math.floor(Math.random() * 5)],
    size: Math.random() * 12 + 4,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    velocity: {
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 5 + 5
    },
    gravity: 0.2,
    bounce: 0.8,
    opacity: 1
  }))
  
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: piece.rotation,
                scale: 0
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: piece.rotation + piece.rotationSpeed * 10,
                opacity: [1, 1, 0],
                x: piece.velocity.x * 20,
                scale: [0, 1, 1, 0.8]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                ease: "easeOut",
                type: "tween"
              }}
              className="absolute"
              style={{
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                borderRadius: piece.shape === 'circle' ? '50%' : 
                            piece.shape === 'square' ? '10%' :
                            piece.shape === 'triangle' ? '0 0 50% 50%' :
                            piece.shape === 'hexagon' ? '30%' :
                            piece.shape === 'star' ? '50%' : '10%',
                left: `${Math.random() * 100}%`,
                top: '0%',
                boxShadow: `0 0 10px ${piece.color}`
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
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
  const [isDownloading, setIsDownloading] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handleDownload = () => {
    setIsDownloading(true)
    const resumeUrl = '/resume.pdf' 
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Vikas-Kumar-Jain-Resume.pdf'
    
    setTimeout(() => {
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsDownloading(false)
      setClickCount(prev => prev + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }, 1500)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 via-blue-900 to-slate-900"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* 3D Background Container - Fixed positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <UltraAdvancedParticleBackground />
        </div>
      </div>

      {/* 3D Shapes - Properly contained */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Professional3DShapes />
      </div>
      
      {/* Confetti - Properly contained */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <UltraAdvancedConfetti show={showConfetti} />
      </div>

      {/* Main Content - Properly positioned and contained */}
      <motion.div 
        className="relative z-10 text-center px-3 sm:px-4 max-w-7xl mx-auto w-full"
        style={{ y: springY, opacity: springOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* 3D Title - Responsive sizing */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-wider px-2 sm:px-4"
            whileHover={{ scale: 1.05, rotateZ: 2 }}
            style={{
              textShadow: isHovered ? 
                '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.6), 0 0 120px rgba(236, 72, 153, 0.4)' : 
                '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
            }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              VIKAS KUMAR JAIN
            </span>
          </motion.h1>
          
          {/* Subtitle - Responsive spacing */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.8 }} className="mb-6 sm:mb-8 px-2 sm:px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 mb-3 sm:mb-4 font-semibold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional App Developer & Mobile Expert
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
              Expert Software Developer specializing in Android and iOS applications. 
              Created numerous mobile apps using Java, Kotlin, and Swift UI.
            </p>
          </motion.div>

          {/* Interactive Stats - Responsive layout */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 1.1 }} className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
            {[
              { number: "32+", label: "Mobile Apps Created", icon: FaMobile, color: "from-blue-500 to-cyan-500" },
              { number: "2+", label: "Years Experience", icon: FaRocket, color: "from-purple-500 to-pink-500" },
              { number: "3", label: "Platforms Mastered", icon: FaStar, color: "from-green-500 to-emerald-500" },
              { number: "100%", label: "App Store Success", icon: FaHeart, color: "from-red-500 to-rose-500" }
            ].map((stat, index) => (
              <motion.div key={index} whileHover={{ y: -10, scale: 1.1 }} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 group min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-4">
                  <div className={`p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${stat.color} text-white`}>
                    <stat.icon className="text-base sm:text-lg md:text-xl lg:text-2xl" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">{stat.number}</div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-gray-300 transition-colors text-center">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Responsive sizing */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 1.4 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
            <motion.button onClick={handleDownload} disabled={isDownloading} whileHover={{ scale: 1.05, rotateX: 10 }} className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 lg:py-5 rounded-full font-bold flex items-center justify-center gap-2 sm:gap-3 border-b-4 border-blue-900 shadow-xl overflow-hidden">
               <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                 {isDownloading ? <><FaRocket className="animate-spin" /> <span className="hidden sm:inline">Compiling...</span><span className="sm:hidden">Loading...</span></> : <><FaDownload /> <span className="hidden xs:inline">Download Resume</span><span className="xs:hidden">Download Resume</span></>}
               </span>
            </motion.button>

            <motion.button onClick={scrollToContact} whileHover={{ scale: 1.05, rotateX: -5 }} className="bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 lg:py-5 rounded-full font-semibold flex items-center justify-center gap-2 sm:gap-3 border-b-4 border-green-900 shadow-xl">
              <FaEnvelope /> <span className="hidden xs:inline">Contact Me</span><span className="xs:hidden">Contact</span>
            </motion.button>
          </motion.div>

          {/* Social Links - Responsive spacing */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1.6 }} className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center mb-6 sm:mb-8 md:mb-12">
            {socialLinks.map((social, index) => (
              <motion.a key={index} href={social.href} whileHover={{ scale: 1.3, rotate: 360 }} className="text-white text-xl sm:text-2xl md:text-3xl hover:text-blue-400 transition-colors">
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Click Counter */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              You've clicked <span className="text-blue-400 font-bold text-xl">{clickCount}</span> times!
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white" animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <FaArrowDown className="text-4xl" />
      </motion.div>
    </section>
  )
}