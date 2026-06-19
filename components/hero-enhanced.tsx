"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaArrowDown, FaCode, FaMobile, FaRocket, FaMouse, FaHeart, FaStar, FaCubes, FaLayerGroup, FaMagic } from "react-icons/fa"
import { useInView } from "react-intersection-observer"
import { FaFilePdf } from "react-icons/fa"

// Smooth Elegant Background Animation
function SmoothElegantBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    
    // Smooth floating orbs
    interface SmoothOrb {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      opacity: number
      pulsePhase: number
    }
    
    const orbs: SmoothOrb[] = []
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6']
    
    // Create smooth floating orbs
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 100 + 50,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }
    
    let time = 0
    
    const animate = () => {
      time += 0.01
      
      // Create smooth gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)')
      gradient.addColorStop(0.3, 'rgba(30, 41, 59, 1)')
      gradient.addColorStop(0.6, 'rgba(51, 65, 85, 1)')
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw smooth orbs
      orbs.forEach((orb, index) => {
        // Smooth movement
        orb.x += orb.vx
        orb.y += orb.vy
        
        // Bounce off edges smoothly
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
          orb.vx *= -1
        }
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
          orb.vy *= -1
        }
        
        // Keep orbs in bounds
        orb.x = Math.max(orb.radius, Math.min(canvas.width - orb.radius, orb.x))
        orb.y = Math.max(orb.radius, Math.min(canvas.height - orb.radius, orb.y))
        
        // Update pulse
        orb.pulsePhase += 0.02
        const pulseFactor = 1 + Math.sin(orb.pulsePhase) * 0.2
        
        // Draw smooth orb with gradient
        const orbGradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius * pulseFactor
        )
        orbGradient.addColorStop(0, orb.color + '40')
        orbGradient.addColorStop(0.5, orb.color + '20')
        orbGradient.addColorStop(1, orb.color + '00')
        
        ctx.globalAlpha = orb.opacity
        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius * pulseFactor, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Draw smooth connections between nearby orbs
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 1
      
      orbs.forEach((orb1, i) => {
        orbs.slice(i + 1).forEach(orb2 => {
          const distance = Math.sqrt((orb1.x - orb2.x) ** 2 + (orb1.y - orb2.y) ** 2)
          if (distance < 300) {
            ctx.globalAlpha = (300 - distance) / 300 * 0.2
            ctx.beginPath()
            ctx.moveTo(orb1.x, orb1.y)
            ctx.lineTo(orb2.x, orb2.y)
            ctx.stroke()
          }
        })
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
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
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            rotateX: [0, 15, 0],
            rotateY: [0, 360, 0],
            scale: [1, 1.2, 1],
            x: [0, 20, 0]
          }}
          transition={{
            duration: shape.rotationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
          className="absolute opacity-20 sm:opacity-30"
          style={{
            left: `${shape.position.x}%`,
            top: `${shape.position.y}%`,
            filter: `hue-rotate(${index * 45}deg) brightness(1.2)`,
            transform: `perspective(1000px) rotateX(${index * 15}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <div 
            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${shape.color} rounded-lg shadow-2xl`}
            style={{
              boxShadow: `0 0 30px ${shape.color.split(' ')[0]}, 0 0 60px ${shape.color.split(' ')[2]}`,
              transformStyle: 'preserve-3d'
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
  const [ising, setIsing] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handle = () => {
    setIsing(true)
    const resumeUrl = '/resume.pdf' 
    const link = document.createElement('a')
    link.href = resumeUrl
    
    // CORRECTED: Added the 'download' property
    link.download = 'Vikas-Kumar-Jain-Resume.pdf'
    
    setTimeout(() => {
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsing(false)
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
      {/* Smooth Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full">
          <SmoothElegantBackground />
        </div>
      </div>

      {/* 3D Shapes - Properly contained with lower z-index */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <Professional3DShapes />
      </div>
      
      {/* Confetti - Properly contained with medium z-index */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-15">
        <UltraAdvancedConfetti show={showConfetti} />
      </div>

      {/* Main Content - Properly positioned and contained with highest z-index */}
      <motion.div 
        className="relative z-20 text-center px-4 max-w-7xl mx-auto w-full"
        style={{ y: springY, opacity: springOpacity }}
      >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
          {/* 3D Title - Responsive sizing with better visibility */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter"
            style={{
              textShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.7))'
            }}
          >
           <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        VIKAS KUMAR JAIN
      </span>
          </motion.h1>
          
          {/* Subtitle - Responsive spacing with better contrast */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5, delay: 0.4 }} 
            className="mb-6 sm:mb-8 md:mb-10 px-4 sm:px-6"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-3 sm:mb-4 md:mb-6 font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                Professional App Developer & Mobile Expert
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 drop-shadow-md">
              Expert Software Developer specializing in Android and iOS applications. 
              Created numerous mobile apps using Java, Kotlin, and Swift UI.
            </p>
          </motion.div>

          {/* Interactive Stats - Responsive layout with better visibility */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6, delay: 0.6 }} 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6"
          >
            {[
              { number: "32+", label: "Mobile Apps Created", icon: FaMobile, color: "from-blue-500 to-cyan-500" },
              { number: "2+", label: "Years Experience", icon: FaRocket, color: "from-purple-500 to-pink-500" },
              { number: "3", label: "Platforms Mastered", icon: FaStar, color: "from-green-500 to-emerald-500" },
              { number: "100%", label: "App Store Success", icon: FaHeart, color: "from-red-500 to-rose-500" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -10, scale: 1.1 }} 
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] backdrop-blur-sm shadow-xl"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
                  <div className={`p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="text-lg sm:text-xl md:text-2xl lg:text-3xl" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors drop-shadow-md">{stat.number}</div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl group-hover:text-gray-200 transition-colors text-center font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Responsive sizing with better visibility */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6, delay: 0.8 }} 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6"
          >
            <motion.button 
              onClick={handle} 
              disabled={ising} 
              whileHover={{ scale: 1.05, rotateX: 10 }} 
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-5 lg:py-6 rounded-full font-bold flex items-center justify-center gap-3 sm:gap-4 border-b-4 border-blue-900 shadow-2xl overflow-hidden group min-h-[44px] sm:min-h-[48px]"
            >
               <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                 {ising ? 
                   <><FaRocket className="animate-spin text-lg sm:text-xl" /> <span className="hidden sm:inline text-base sm:text-lg">Compiling...</span><span className="sm:hidden text-sm">Loading...</span></> : 
                   <><FaDownload className="text-lg sm:text-xl" /> <span className="hidden xs:inline text-base sm:text-lg">Download Resume</span><span className="xs:hidden text-sm">Download</span></>
                 }
               </span>
            </motion.button>

            <motion.button 
              onClick={scrollToContact} 
              whileHover={{ scale: 1.05, rotateX: -5 }} 
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-5 lg:py-6 rounded-full font-semibold flex items-center justify-center gap-3 sm:gap-4 border-b-4 border-green-900 shadow-2xl group min-h-[44px] sm:min-h-[48px]"
            >
              <FaEnvelope className="text-lg sm:text-xl" /> <span className="hidden xs:inline text-base sm:text-lg">Contact Me</span><span className="xs:hidden text-sm">Contact</span>
            </motion.button>
          </motion.div>

          {/* Social Links - Responsive spacing with better visibility */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5, delay: 1.0 }} 
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center mb-8 sm:mb-10 md:mb-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index} 
                href={social.href} 
                whileHover={{ scale: 1.3, rotate: 360 }} 
                className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-blue-400 transition-colors drop-shadow-lg hover:drop-shadow-xl"
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Click Counter - Better visibility */}
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg drop-shadow-md">
              You've clicked <span className="text-blue-400 font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-lg">{clickCount}</span> times!
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <FaArrowDown className="text-4xl" />
      </motion.div>
    </section>
  )
}
