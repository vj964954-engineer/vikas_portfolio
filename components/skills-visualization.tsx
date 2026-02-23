"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { FaCode, FaDatabase, FaCloud, FaMobile, FaServer, FaNetworkWired, FaShieldAlt, FaRocket } from "react-icons/fa"
import { useInView } from "react-intersection-observer"

interface SkillNode {
  id: string
  name: string
  level: number
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  x: number
  y: number
  connections: string[]
}

interface VisualizationData {
  nodes: SkillNode[]
  connections: Array<{ from: string; to: string; strength: number }>
}

const skillsData: VisualizationData = {
  nodes: [
    // Core Technologies
    { id: 'java', name: 'Java', level: 95, category: 'Backend', icon: FaServer, color: '#f89820', x: 200, y: 150, connections: ['spring', 'kafka', 'docker'] },
    { id: 'spring', name: 'Spring Boot', level: 90, category: 'Backend', icon: FaServer, color: '#6db33f', x: 350, y: 100, connections: ['java', 'rest', 'security'] },
    { id: 'kotlin', name: 'Kotlin', level: 85, category: 'Mobile', icon: FaMobile, color: '#7f52ff', x: 500, y: 200, connections: ['android', 'swift'] },
    { id: 'swift', name: 'Swift UI', level: 88, category: 'Mobile', icon: FaMobile, color: '#fa7343', x: 150, y: 300, connections: ['kotlin', 'ios'] },
    
    // Frontend Technologies
    { id: 'react', name: 'React', level: 92, category: 'Frontend', icon: FaCode, color: '#61dafb', x: 400, y: 350, connections: ['typescript', 'nextjs'] },
    { id: 'typescript', name: 'TypeScript', level: 87, category: 'Frontend', icon: FaCode, color: '#3178c6', x: 550, y: 300, connections: ['react', 'nodejs'] },
    { id: 'nextjs', name: 'Next.js', level: 85, category: 'Frontend', icon: FaCode, color: '#000000', x: 300, y: 400, connections: ['react', 'vercel'] },
    
    // Database & Cloud
    { id: 'postgresql', name: 'PostgreSQL', level: 83, category: 'Database', icon: FaDatabase, color: '#336791', x: 100, y: 200, connections: ['redis', 'mongodb'] },
    { id: 'mongodb', name: 'MongoDB', level: 80, category: 'Database', icon: FaDatabase, color: '#47a248', x: 250, y: 250, connections: ['postgresql', 'nodejs'] },
    { id: 'redis', name: 'Redis', level: 78, category: 'Database', icon: FaDatabase, color: '#dc382d', x: 450, y: 250, connections: ['postgresql', 'kafka'] },
    
    // DevOps & Cloud
    { id: 'docker', name: 'Docker', level: 86, category: 'DevOps', icon: FaCloud, color: '#2496ed', x: 600, y: 150, connections: ['kubernetes', 'aws'] },
    { id: 'kubernetes', name: 'Kubernetes', level: 82, category: 'DevOps', icon: FaCloud, color: '#326ce5', x: 650, y: 250, connections: ['docker', 'aws'] },
    { id: 'aws', name: 'AWS', level: 84, category: 'Cloud', icon: FaCloud, color: '#ff9900', x: 550, y: 400, connections: ['kubernetes', 'vercel'] },
    
    // Additional Technologies
    { id: 'nodejs', name: 'Node.js', level: 88, category: 'Backend', icon: FaServer, color: '#339933', x: 350, y: 300, connections: ['typescript', 'mongodb'] },
    { id: 'kafka', name: 'Apache Kafka', level: 75, category: 'Backend', icon: FaNetworkWired, color: '#231f20', x: 500, y: 100, connections: ['java', 'redis'] },
    { id: 'security', name: 'Security', level: 79, category: 'Security', icon: FaShieldAlt, color: '#ff6b6b', x: 200, y: 350, connections: ['spring', 'aws'] },
    { id: 'vercel', name: 'Vercel', level: 83, category: 'Cloud', icon: FaRocket, color: '#000000', x: 400, y: 450, connections: ['nextjs', 'aws'] }
  ],
  connections: []
}

// Generate connections from node connections
skillsData.nodes.forEach(node => {
  node.connections.forEach(targetId => {
    const targetNode = skillsData.nodes.find(n => n.id === targetId)
    if (targetNode) {
      skillsData.connections.push({
        from: node.id,
        to: targetId,
        strength: Math.min(node.level, targetNode.level) / 100
      })
    }
  })
})

export default function SkillsVisualization() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef(null)
  const { ref, inView } = useInView({ triggerOnce: false })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [inView, controls])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 500

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw connections
      skillsData.connections.forEach(connection => {
        const fromNode = skillsData.nodes.find(n => n.id === connection.from)
        const toNode = skillsData.nodes.find(n => n.id === connection.to)
        
        if (fromNode && toNode) {
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          
          // Create curved connection
          const cp1x = (fromNode.x + toNode.x) / 2
          const cp1y = fromNode.y - Math.sin(time * 2) * 20
          const cp2x = (fromNode.x + toNode.x) / 2
          const cp2y = toNode.y + Math.sin(time * 2) * 20
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toNode.x, toNode.y)
          
          // Gradient stroke
          const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y)
          gradient.addColorStop(0, fromNode.color + '40')
          gradient.addColorStop(0.5, fromNode.color + '80')
          gradient.addColorStop(1, toNode.color + '40')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = connection.strength * 3
          ctx.stroke()
          
          // Animated particles along connections
          if (hoveredNode === fromNode.id || hoveredNode === toNode.id) {
            const t = (time * 0.5) % 1
            const px = (1-t)*(1-t)*(1-t)*fromNode.x + 3*(1-t)*(1-t)*t*cp1x + 3*(1-t)*t*t*cp2x + t*t*t*toNode.x
            const py = (1-t)*(1-t)*(1-t)*fromNode.y + 3*(1-t)*(1-t)*t*cp1y + 3*(1-t)*t*t*cp2y + t*t*t*toNode.y
            
            ctx.beginPath()
            ctx.arc(px, py, 3, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.fill()
          }
        }
      })

      // Draw nodes
      skillsData.nodes.forEach(node => {
        const isHovered = hoveredNode === node.id
        const isSelected = selectedNode === node.id
        const scale = isHovered ? 1.2 : (isSelected ? 1.1 : 1)
        const pulseScale = 1 + Math.sin(time * 3) * 0.1
        
        // Outer glow
        if (isHovered || isSelected) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 25 * scale * pulseScale, 0, Math.PI * 2)
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 25 * scale * pulseScale)
          glowGradient.addColorStop(0, node.color + '40')
          glowGradient.addColorStop(1, node.color + '00')
          ctx.fillStyle = glowGradient
          ctx.fill()
        }
        
        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 15 * scale, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        
        // Inner circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 12 * scale, 0, Math.PI * 2)
        ctx.fillStyle = '#1a1a1a'
        ctx.fill()
        
        // Level indicator
        ctx.beginPath()
        ctx.arc(node.x, node.y, 10 * scale, 0, (Math.PI * 2 * node.level) / 100)
        ctx.strokeStyle = node.color
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Node label
        if (isHovered || isSelected) {
          ctx.fillStyle = '#ffffff'
          ctx.font = '12px monospace'
          ctx.textAlign = 'center'
          ctx.fillText(node.name, node.x, node.y - 25)
          ctx.font = '10px monospace'
          ctx.fillStyle = node.color
          ctx.fillText(`${node.level}%`, node.x, node.y - 10)
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [hoveredNode, selectedNode])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Find clicked node
    const clickedNode = skillsData.nodes.find(node => {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      return distance <= 15
    })

    setSelectedNode(clickedNode ? clickedNode.id : null)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Find hovered node
    const hoveredNodeFound = skillsData.nodes.find(node => {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      return distance <= 15
    })

    setHoveredNode(hoveredNodeFound ? hoveredNodeFound.id : null)
  }

  const selectedNodeData = skillsData.nodes.find(n => n.id === selectedNode)

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              3D Skills Visualization
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive visualization of my technical skills and their connections
          </p>
        </motion.div>

        {/* Visualization Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Canvas */}
          <div className="relative flex justify-center items-center p-8">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              className="cursor-pointer"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* Floating labels */}
            <div className="absolute top-4 left-4 text-white/60 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Frontend</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Backend</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Cloud/DevOps</span>
              </div>
            </div>
          </div>

          {/* Selected Node Details */}
          {selectedNodeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <selectedNodeData.icon className="text-xl" />
                    {selectedNodeData.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{selectedNodeData.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{selectedNodeData.level}%</div>
                  <div className="text-gray-400 text-sm">Proficiency</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3 bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedNodeData.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 text-gray-400"
        >
          <p>Click on nodes to see details • Hover to highlight connections</p>
        </motion.div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              rotateY: 360,
              translateZ: [0, 100, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 text-cyan-400 text-6xl opacity-10"
          >
            <FaNetworkWired />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotateX: 360,
              translateZ: [0, -100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 text-purple-400 text-5xl opacity-10"
          >
            <FaShieldAlt />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
