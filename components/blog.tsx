"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"
import { FaCalendar, FaLinkedin, FaExternalLinkAlt, FaArrowRight, FaClock, FaEye, FaCode, FaDatabase, FaMobile, FaGlobe, FaLayerGroup } from "react-icons/fa"

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
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

  const categories = ["All", "Java Development", "Mobile Development", "Web Development", "Data Engineering"]
  
  const categoryIcons: Record<string, React.ReactNode> = {
    "All": <FaLayerGroup className="text-xl" />,
    "Java Development": <FaCode className="text-xl" />,
    "Mobile Development": <FaMobile className="text-xl" />,
    "Web Development": <FaGlobe className="text-xl" />,
    "Data Engineering": <FaDatabase className="text-xl" />
  }

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <section ref={ref} id="blog" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden min-h-screen">
      {/* 3D Floating Background Elements - Optimized for Mobile */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Reduced particles for mobile performance */}
        {!isMobile && !shouldReduceMotion && (
          <>
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                x: [0, 100, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                rotate: -360,
                scale: [1, 1.3, 1],
                y: [0, -50, 0]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                rotate: 180,
                scale: [1, 1.1, 1],
                x: [0, -80, 0]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-indigo-600/15 to-purple-600/15 rounded-full blur-3xl" 
            />
            
            {/* 3D Floating Particles - Reduced for mobile */}
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
          </>
        )}
        
        {/* Simple static background for mobile/reduced motion */}
        {(isMobile || shouldReduceMotion) && (
          <>
            <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-indigo-600/8 to-purple-600/8 rounded-full blur-3xl" />
          </>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-20">
        {/* 3D Animated Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 1, type: "spring" }}
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
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8"
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
            transition={{ duration: 3, repeat: Infinity }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4"
          >
            Insights, tutorials, and thoughts on modern software development, 
            mobile app creation, and technology trends. All articles are also available on LinkedIn.
          </motion.p>
        </motion.div>

        {/* 3D Category Filter Buttons - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0, rotateY: shouldReduceMotion ? 0 : 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: shouldReduceMotion ? 1.05 : 1.1, 
                rotateY: shouldReduceMotion ? 0 : 10,
                boxShadow: shouldReduceMotion ? "0 4px 12px rgba(147, 51, 234, 0.2)" : "0 10px 30px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              {/* <span className="text-xs sm:text-sm md:text-base lg:text-xl">{categoryIcons[category]}</span> */}
              <span className="text-xl">{categoryIcons[category]}</span>
              {/* <span className="max-sm:hidden">{category.split(' ')[0]}</span> */}
              <span className="md:hidden">
    {category.split(' ')[0]}
  </span>
              {/* <span className="sm:hidden md:inline">{category.length > 12 ? category.split(' ')[0] : category}</span> */}
              <span className="hidden md:inline lg:hidden">
    {category.length > 12 ? category.split(' ')[0] : category}
  </span>
              {/* <span className="md:hidden lg:inline">{category}</span> */}
              <span className="hidden lg:inline">
    {category}
  </span>
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Article Cards Grid - Responsive */}
        <div className="grid grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-3 sm:px-4">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 100, scale: 0.8, rotateY: shouldReduceMotion ? 0 : 90 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: shouldReduceMotion ? 0 : 0.8, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: shouldReduceMotion ? -5 : -15, 
                scale: shouldReduceMotion ? 1.02 : 1.05,
                rotateX: shouldReduceMotion ? 0 : 5,
                boxShadow: shouldReduceMotion ? "0 10px 20px rgba(147, 51, 234, 0.2)" : "0 20px 40px rgba(147, 51, 234, 0.4)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-slate-700/90 via-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden group relative preserve-3d"
              style={{ 
                perspective: shouldReduceMotion ? "none" : "1000px",
                transformStyle: shouldReduceMotion ? "flat" : "preserve-3d"
              }}
            >
              {/* 3D Card Header with LinkedIn Icon - Responsive */}
              <motion.div 
                className="relative h-28 max-sm:h-32 sm:h-40 md:h-48 overflow-hidden"
                whileHover={{ 
                  scale: shouldReduceMotion ? 1.02 : 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30" />
                {!shouldReduceMotion && (
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 max-sm:w-12 max-sm:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <FaLinkedin className="text-white text-base max-sm:text-lg sm:text-2xl md:text-3xl" />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Static icon for reduced motion */}
                {shouldReduceMotion && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 max-sm:w-12 max-sm:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaLinkedin className="text-white text-base max-sm:text-lg sm:text-2xl md:text-3xl" />
                    </div>
                  </div>
                )}
                
                {/* Floating Category Badge - Responsive */}
                <motion.div
                  animate={!shouldReduceMotion ? {
                    y: [0, -3, 0],
                    rotate: [-2, 2, -2]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1 max-sm:top-2 sm:top-3 md:top-4 left-1 max-sm:left-2 sm:left-3 md:left-4"
                >
                  <span className="px-1 py-0.5 max-sm:px-2 max-sm:py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs max-sm:text-xs sm:text-sm rounded-full border border-blue-500/30 backdrop-blur-sm">
                    {post.category}
                  </span>
                </motion.div>

                {/* 3D Floating View Count - Responsive */}
                <motion.div
                  animate={!shouldReduceMotion ? {
                    y: [0, -5, 0],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="absolute top-1 max-sm:top-2 sm:top-3 md:top-4 right-1 max-sm:right-2 sm:right-3 md:right-4 bg-black/50 backdrop-blur-sm rounded-full px-1 py-0.5 max-sm:px-2 max-sm:py-1 text-xs text-white flex items-center gap-1"
                >
                  <FaEye className="text-xs" />
                  {post.views}
                </motion.div>
              </motion.div>

              {/* 3D Article Content - Responsive */}
              <motion.div 
                className="p-3 max-sm:p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <motion.div 
                  className="flex flex-wrap items-center gap-1 max-sm:gap-2 sm:gap-4 text-gray-400 text-xs max-sm:text-xs sm:text-sm mb-2 max-sm:mb-3 sm:mb-4"
                  whileHover={{ 
                    scale: 1.02,
                    color: "#60a5fa"
                  }}
                >
                  <motion.span 
                    animate={!shouldReduceMotion ? { 
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-0.5 max-sm:gap-1 sm:gap-2"
                  >
                    <FaCalendar className="text-xs max-sm:text-xs sm:text-sm" />
                    <span className="text-xs max-sm:text-xs sm:text-sm">{post.date}</span>
                  </motion.span>
                  <motion.span 
                    animate={!shouldReduceMotion ? { 
                      rotate: [0, -5, 5, 0]
                    } : {}}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-0.5 max-sm:gap-1 sm:gap-2"
                  >
                    <FaClock className="text-xs max-sm:text-xs sm:text-sm" />
                    <span className="text-xs max-sm:text-xs sm:text-sm">{post.readTime}</span>
                  </motion.span>
                </motion.div>

                <motion.h3 
                  className="text-base max-sm:text-lg sm:text-xl font-bold text-white mb-1 max-sm:mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors"
                  whileHover={{ 
                    scale: 1.01,
                    textShadow: shouldReduceMotion ? "none" : "0 0 20px rgba(147, 51, 234, 0.5)"
                  }}
                >
                  {post.title}
                </motion.h3>

                <motion.p 
                  className="text-gray-300 mb-3 max-sm:mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-xs max-sm:text-sm sm:text-base"
                  whileHover={{ 
                    scale: 1.01,
                    color: "#e2e8f0"
                  }}
                >
                  {post.description}
                </motion.p>

                {/* 3D LinkedIn Button - Responsive */}
                <motion.a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0.8, rotateX: shouldReduceMotion ? 0 : -90 }}
                  animate={{ scale: 1, rotateX: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: shouldReduceMotion ? 1.05 : 1.1,
                    rotateY: shouldReduceMotion ? 0 : 10,
                    boxShadow: shouldReduceMotion ? "0 8px 16px rgba(147, 51, 234, 0.3)" : "0 15px 30px rgba(147, 51, 234, 0.5)",
                    background: shouldReduceMotion ? "linear-gradient(135deg, #8b5cf6, #3b82f6)" : "linear-gradient(135deg, #8b5cf6, #3b82f6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1 max-sm:gap-2 px-2 py-1 max-sm:px-4 max-sm:py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 group relative overflow-hidden text-xs max-sm:text-sm sm:text-base"
                  style={{ transformStyle: shouldReduceMotion ? "flat" : "preserve-3d" }}
                >
                  <motion.div
                    animate={!shouldReduceMotion ? {
                      x: [0, 5, 0]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-1 max-sm:gap-2"
                  >
                    <FaLinkedin className="text-xs max-sm:text-sm sm:text-lg" />
                    <span className="hidden max-sm:inline">LinkedIn</span>
                    <span className="max-sm:hidden sm:inline">Read on LinkedIn</span>
                    <FaArrowRight className="text-xs max-sm:text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                  
                  {/* Button Shine Effect - Disabled for reduced motion */}
                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{
                        x: [-100, 100]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                </motion.a>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* 3D LinkedIn Profile Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="text-center mt-6 max-sm:mt-8 md:mt-16 px-3 max-sm:px-4"
        >
          <motion.div 
            animate={!shouldReduceMotion ? {
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 1]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl max-sm:rounded-2xl md:rounded-3xl p-4 max-sm:p-6 md:p-8 border border-white/10 relative overflow-hidden"
          >
            {/* Floating Background Elements - Responsive */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-lg"
                />
              </>
            )}
            
            <motion.h3 
              animate={!shouldReduceMotion ? {
                textShadow: [
                  "0 0 10px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 10px rgba(59, 130, 246, 0.5)"
                ]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-lg max-sm:text-xl md:text-2xl font-bold text-white mb-2 max-sm:mb-3 md:mb-4 relative z-10"
            >
              Follow me on LinkedIn
            </motion.h3>
            <motion.p 
              animate={!shouldReduceMotion ? {
                y: [0, -3, 0],
                opacity: [0.9, 1, 0.9]
              } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-gray-300 mb-3 max-sm:mb-4 md:mb-6 max-w-2xl mx-auto relative z-10 text-xs max-sm:text-sm md:text-base leading-relaxed px-2 max-sm:px-0"
            >
              Connect with me on LinkedIn for more articles, tech insights, and professional updates. 
              I regularly share content about Java development, mobile app creation, and software engineering.
            </motion.p>
            <motion.a
              href="https://linkedin.com/in/vikas-kumar-jain-571a48230"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, rotateY: shouldReduceMotion ? 0 : -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ 
                scale: shouldReduceMotion ? 1.05 : 1.1,
                rotateY: shouldReduceMotion ? 0 : 15,
                boxShadow: shouldReduceMotion ? "0 8px 16px rgba(59, 130, 246, 0.3)" : "0 20px 40px rgba(59, 130, 246, 0.4)",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1 max-sm:gap-2 px-3 max-sm:px-4 py-2 max-sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-xs max-sm:text-sm md:text-base"
              style={{ transformStyle: shouldReduceMotion ? "flat" : "preserve-3d" }}
            >
              <motion.div
                animate={!shouldReduceMotion ? {
                  rotate: 360
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex items-center gap-1 max-sm:gap-2"
              >
                <FaLinkedin className="text-sm max-sm:text-lg md:text-xl" />
                <span className="hidden max-sm:inline">LinkedIn</span>
                <span className="max-sm:hidden sm:inline">Visit LinkedIn Profile</span>
                <FaExternalLinkAlt className="text-xs max-sm:text-xs md:text-sm" />
              </motion.div>
              
              {/* Button Shine Effect - Disabled for reduced motion */}
              {!shouldReduceMotion && (
                <motion.div
                  animate={{
                    x: [-100, 100]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              )}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
