"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"
import { FaCalendar, FaLinkedin, FaExternalLinkAlt, FaArrowRight, FaClock, FaEye, FaCode, FaDatabase, FaMobile, FaGlobe, FaLayerGroup, FaChevronDown, FaChevronUp, FaBookOpen, FaPenFancy, FaChartLine, FaLightbulb, FaRocket } from "react-icons/fa"

const blogPosts = [
  {
    id: 1,
    title: "Spring Boot: Simplifying Java Application Development",
    description: "As SQL has developed over time, more sophisticated capabilities like views, triggers, and stored procedures have been added. They simplify complicated searches, preserve data consistency, and enable the automation of database operations.",
    link: "https://www.linkedin.com/pulse/spring-boot-simplifying-java-application-development-vikas-kumar-jain-ezuvf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/public/spring-boot-image",
    date: "2024",
    readTime: "5 min read",
    category: "Java Development",
    views: "1.2k"
  },
  {
    id: 2,
    title: "Demystifying SQL: The Language that Powers Databases",
    description: "In the realm of databases, Structured Query Language, or SQL, is an essential tool. Users can manage, retrieve, and alter data stored in relational database management systems (RDBMS) with this domain-specific language.",
    link: "https://www.linkedin.com/pulse/demystifying-sql-language-powers-databases-vikas-kumar-jain-tu1tf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "6 min read",
    category: "Data Engineering",
    views: "980"
  },
  {
    id: 3,
    title: "The Role of Chatbots in Revolutionizing Mental Health Support",
    description: "Chatbots are an inventive solution that have emerged from the junction of artificial intelligence (AI) and mental health in a world that is becoming more and more reliant on technology.",
    link: "https://www.linkedin.com/pulse/role-chatbots-revolutionizing-mental-health-support-vikas-kumar-jain-hchuf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "7 min read",
    category: "Web Development",
    views: "1.5k"
  },
  {
    id: 4,
    title: "Advancing Mobility: The Future of Transportation Infrastructure",
    description: "The way we get from one point to another is changing quickly in this ever changing globe. At the center of this progression is advanced transportation infrastructure.",
    link: "https://www.linkedin.com/pulse/advancing-mobility-future-transportation-vikas-kumar-jain-zz52f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "8 min read",
    category: "Web Development",
    views: "750"
  },
  {
    id: 5,
    title: "Unraveling Chat GPT: A Powerful Conversational AI",
    description: "OpenAI has developed a groundbreaking AI model called Chat GPT. It has attracted a lot of attention because to its capacity to hold meaningful and organic interactions with users.",
    link: "https://www.linkedin.com/pulse/unraveling-chat-gpt-powerful-conversational-ai-vikas-kumar-jain-zpc2f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "6 min read",
    category: "Web Development",
    views: "2.1k"
  },
  {
    id: 6,
    title: "Understanding Object-Oriented Programming (OOP) Concepts",
    description: "The core idea of the programming paradigm known as 'object-oriented programming,' or OOP, is the concept of 'objects.' It is an effective and popular method in software development that seeks to enhance the maintainability, reusability, and organization of code.",
    link: "https://www.linkedin.com/pulse/understanding-object-oriented-programming-oop-concepts-jain-yzjge/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "10 min read",
    category: "Java Development",
    views: "1.8k"
  },
  {
    id: 7,
    title: "The Role of Traditional Coding",
    description: "Even as low-code and no-code platforms gain popularity, traditional coding—also referred to as hand-coding or manual coding—continues to play a vital part in current web development.",
    link: "https://www.linkedin.com/pulse/role-traditional-coding-vikas-kumar-jain-vq2tf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "5 min read",
    category: "Web Development",
    views: "890"
  },
  {
    id: 8,
    title: "The Rise of No-Code and Low-Code Development in Web Development",
    description: "The first section of the essay defines low-code and no-code development and explains how they vary from traditional coding. It emphasizes how the web development process may be made simpler by using visual interfaces and pre-built components.",
    link: "https://www.linkedin.com/pulse/rise-no-code-low-code-development-web-vikas-kumar-jain-mugtf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "7 min read",
    category: "Web Development",
    views: "1.3k"
  },
  {
    id: 9,
    title: "Super apps: The All-in-One Apps Running Everything in Your Pocket",
    description: "Imagine a future in which your phone serves as more than simply a common device—rather, it is your magic wand, assisting you in doing daily activities. Imagine a world where you can use one swipe to make payments, order takeout, book a doctor's appointment, and chat with friends all within the same app.",
    link: "https://www.linkedin.com/pulse/super-apps-all-in-one-running-everything-your-pocket-vikas-kumar-jain-pwdrf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "6 min read",
    category: "Mobile Development",
    views: "1.6k"
  },
  {
    id: 10,
    title: "MySQL: An Overview of a Popular Relational Database Management System",
    description: "One of the most popular open-source relational database management systems (RDBMS) available today is MySQL. It was created by Oracle Corporation and for more than 20 years has been a pillar of the web application development industry.",
    link: "https://www.linkedin.com/pulse/mysql-overview-popular-relational-database-management-jain-1hl8f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "8 min read",
    category: "Data Engineering",
    views: "1.1k"
  },
  {
    id: 11,
    title: "Learning Angular: Creating Sophisticated Web Applications Easily",
    description: "The open-source, robust web application framework Angular has become a mainstay of contemporary web development. Angular is a well-known framework that is highly appreciated for its vast feature set, outstanding speed, and adaptability. It provides developers with an extensive tool set to create dynamic, feature-rich, and adaptable online apps.",
    link: "https://www.linkedin.com/pulse/learning-angular-creating-sophisticated-web-easily-vikas-kumar-jain-sqfcf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "7 min read",
    category: "Web Development",
    views: "1.4k"
  },
  {
    id: 12,
    title: "The Role of Internet of Things (IoT) in Smart Cities",
    description: "The idea of a 'smart city' has been increasingly popular in recent years as urbanization has continued to grow quickly. The Internet of Things (IoT) is a potent tool that city planners and digital entrepreneurs are using to transform urban landscapes into more efficient, sustainable, and habitable spaces.",
    link: "https://www.linkedin.com/pulse/role-internet-things-iot-smart-cities-vikas-kumar-jain-4gckf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "9 min read",
    category: "Web Development",
    views: "1.7k"
  },
  {
    id: 13,
    title: "Artificial Intelligence in Education: Revolutionizing Learning",
    description: "The way we educate and learn is changing due to artificial intelligence (AI). AI is no longer a thing of far future in today's educational environment—rather, it is a dynamic present. With tailored learning experiences, improved administrative procedures, and better educational outcomes, AI integration in education has opened up new vistas.",
    link: "https://www.linkedin.com/pulse/artificial-intelligence-education-revolutionizing-learning-jain-cnyif/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "8 min read",
    category: "Web Development",
    views: "2.3k"
  },
  {
    id: 14,
    title: "Cloud Computing: Advantages, Challenges, and Future Trends",
    description: "The revolutionary technology known as cloud computing provides an alternative to conventional on-premises infrastructure by allowing consumers and organizations to access computer resources via internet. Between the initial days of simple cloud storage and advanced, comprehensive cloud services we have today, it has changed dramatically over time.",
    link: "https://www.linkedin.com/pulse/cloud-computing-advantages-challenges-future-trends-vikas-kumar-jain-y9s4f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "10 min read",
    category: "Data Engineering",
    views: "1.9k"
  },
  {
    id: 15,
    title: "The Ethics of Artificial Intelligence: Bias and Fairness",
    description: "From virtual assistants on our smartphones to recommendation engines on streaming platforms, artificial intelligence (AI) has ingrained itself into every aspect of our lives. As AI becomes more commonplace, its ethical ramifications are becoming more apparent. In order to ensure equitable and just outcomes, this article examines crucial topic of bias and fairness in AI systems.",
    link: "https://www.linkedin.com/pulse/ethics-artificial-intelligence-bias-fairness-vikas-kumar-jain-xhmxf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "7 min read",
    category: "Web Development",
    views: "1.6k"
  },
  {
    id: 16,
    title: "TypeScript: A Powerful Language for Modern Web Development",
    description: "A statically typed superset of JavaScript, TypeScript is an open-source project that has seen tremendous growth in popularity recently. Microsoft created TypeScript, which gives programmers a strong toolkit for creating scalable, stable, and reliable online applications. We will explore TypeScript's type system, features, and benefits in this technical post.",
    link: "https://www.linkedin.com/pulse/typescript-powerful-language-modern-web-development-vikas-kumar-jain-85p0f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "8 min read",
    category: "Web Development",
    views: "2.0k"
  },
  {
    id: 17,
    title: "Exploring Fundamentals of C Programming",
    description: "Known as the 'mother of all programming languages,' C programming was developed in the early 1970s and has since remained a fundamental language in the field of computer science. C, which Dennis Ritchie created at Bell Labs, has impacted many other programming languages and is still widely used today for a wide range of purposes.",
    link: "https://www.linkedin.com/pulse/exploring-fundamentals-c-programming-vikas-kumar-jain-zst4f/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "9 min read",
    category: "Java Development",
    views: "1.5k"
  },
  {
    id: 18,
    title: "Demystifying Git: A Comprehensive Guide",
    description: "The software development industry has completely changed because of Git. It's a distributed version control system that streamlines teamwork, records code alterations, and equips developers with tools they need to work more productively. Understanding Git is crucial whether you're a seasoned developer or just getting started.",
    link: "https://www.linkedin.com/pulse/demystifying-git-comprehensive-guide-vikas-kumar-jain-05xlf/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "11 min read",
    category: "Web Development",
    views: "2.2k"
  },
  {
    id: 19,
    title: "A Deep Dive into 5G Technology and its Applications",
    description: "Around the world, there has been a lot of enthusiasm and interest in the arrival of 5G technology. 5G is expected to completely change how we live, work, and interact with technology. It promises blazing-fast speeds, extremely low latency, and enormous networking capabilities.",
    link: "https://www.linkedin.com/pulse/deep-dive-5g-technology-its-applications-vikas-kumar-jain-7c31e/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "8 min read",
    category: "Mobile Development",
    views: "1.8k"
  },
  {
    id: 20,
    title: "Introduce to Java Programming",
    description: "Java is a flexible, strong, and popular programming language that has irrevocably changed the landscape of software development. The portability, security, and readability of Java make it a popular choice among programmers of all skill levels. We shall set off on a voyage through the world of Java programming in this post.",
    link: "https://www.linkedin.com/pulse/introduce-java-programming-vikas-kumar-jain/?trackingId=H0sWdQrWQV%2B%2BH%2B1TwLaSqg%3D%3D",
    image: "/api/placeholder/800/400",
    date: "2024",
    readTime: "9 min read",
    category: "Java Development",
    views: "1.7k"
  }
]

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isMobile, setIsMobile] = useState(false)
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set())
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const springConfig = { damping: 25, stiffness: 400 }
  const scale = useSpring(1, springConfig)
  
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < 640) // Changed from 768 to 640 for better small tablet handling
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, shouldReduceMotion])

  const categories = [
    { id: "All", name: "All Articles", icon: FaLayerGroup, color: "from-purple-500 to-pink-500" },
    { id: "Java Development", name: "Java Development", icon: FaCode, color: "from-red-500 to-orange-500" },
    { id: "Mobile Development", name: "Mobile Development", icon: FaMobile, color: "from-blue-500 to-cyan-500" },
    { id: "Web Development", name: "Web Development", icon: FaGlobe, color: "from-green-500 to-emerald-500" },
    { id: "Data Engineering", name: "Data Engineering", icon: FaDatabase, color: "from-yellow-500 to-amber-500" }
  ]

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const displayPosts = showAllPosts ? filteredPosts : filteredPosts.slice(0, 6)

  return (
    <section ref={ref} id="blog" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden min-h-screen">
      {/* Enhanced 3D Background */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            x: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl" 
        />
        
        {/* Floating Particles */}
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-20">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring" }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2 
            animate={!shouldReduceMotion ? { 
              textShadow: [
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(147, 51, 234, 0.5)"
              ]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </motion.h2>
          <motion.p 
            animate={!shouldReduceMotion ? { 
              y: [0, -5, 0],
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-3 sm:px-4"
          >
            Insights, tutorials, and thoughts on modern software development, 
            mobile app creation, and technology trends. All articles are also available on LinkedIn.
          </motion.p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base md:text-lg ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              <category.icon className="text-lg sm:text-xl md:text-2xl" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden md:inline">{category.name.split(' ')[0]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Accordion Blog Posts */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
          <AnimatePresence>
            {displayPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden group relative"
              >
                {/* Accordion Header */}
                <motion.div
                  onClick={() => {
                    setExpandedPosts(prev => {
                      const newSet = new Set(prev)
                      if (newSet.has(post.id)) {
                        newSet.delete(post.id)
                      } else {
                        newSet.add(post.id)
                      }
                      return newSet
                    })
                  }}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  className="p-4 sm:p-6 md:p-8 cursor-pointer flex items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs sm:text-sm rounded-full font-bold`}>
                        {post.category}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                        <FaEye />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    
                    <motion.h3 
                      className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      {post.title}
                    </motion.h3>
                    
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <FaCalendar />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedPosts.has(post.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60 group-hover:text-white transition-colors"
                  >
                    {expandedPosts.has(post.id) ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                  </motion.div>
                </motion.div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedPosts.has(post.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8"
                    >
                      <div className="border-t border-white/10 pt-4 sm:pt-6">
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6"
                        >
                          {post.description}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between"
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <FaBookOpen />
                            <span>Full article available on LinkedIn</span>
                          </div>
                          
                          <motion.a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                          >
                            <FaLinkedin className="text-sm sm:text-base" />
                            <span className="text-sm sm:text-base">Read on LinkedIn</span>
                            <FaExternalLinkAlt className="text-xs" />
                          </motion.a>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse All Button */}
        {filteredPosts.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-center mt-8 sm:mt-12 px-3 sm:px-4"
          >
            <motion.button
              onClick={() => setShowAllPosts(!showAllPosts)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              {showAllPosts ? (
                <>
                  <FaChevronUp />
                  <span>Show Less (6 articles)</span>
                </>
              ) : (
                <>
                  <FaChevronDown />
                  <span>Show All ({filteredPosts.length} articles)</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Left Bottom Screen Element */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed bottom-4 left-4 z-30"
      >
        <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 text-white">
            <FaPenFancy className="text-xl" />
            <div>
              <div className="text-xs opacity-75">Total Articles</div>
              <div className="text-lg font-bold">{filteredPosts.length}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Bottom Screen Element */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className="fixed bottom-4 right-4 z-30"
      >
        <div className="bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 text-white">
            <FaChartLine className="text-xl" />
            <div>
              <div className="text-xs opacity-75">Total Views</div>
              <div className="text-lg font-bold">
                {filteredPosts.reduce((total, post) => {
                  const views = parseInt(post.views.replace('k', '000').replace('+', ''))
                  return total + views
                }, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )

  function getCategoryColor(category: string) {
    switch (category) {
      case "Java Development": return "from-red-500 to-orange-500"
      case "Mobile Development": return "from-blue-500 to-cyan-500"
      case "Web Development": return "from-green-500 to-emerald-500"
      case "Data Engineering": return "from-yellow-500 to-amber-500"
      default: return "from-purple-500 to-pink-500"
    }
  }
}
