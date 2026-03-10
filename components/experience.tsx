"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { FaBriefcase, FaGraduationCap, FaAward, FaCode, FaMobileAlt, FaServer, FaCalendar, FaMapMarkerAlt, FaDatabase } from "react-icons/fa"

interface ExperienceItem {
  id: number
  title: string
  company: string
  location: string
  period: string
  type: 'work' | 'education' | 'achievement'
  description: string
  achievements: string[]
  technologies: string[]
  icon: React.ComponentType<{ className?: string }>
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Developer",
    company: "Hawkscode Pvt. Ltd",
    location: "Jaipur, Rajasthan",
    period: "Jan 2025 – Present",
    type: "work",
    description: "Leading mobile app development with focus on performance and exceptional UI/UX design.",
    achievements: [
      "Developing Android applications using Java and Kotlin with modern architecture patterns",
      "Creating iOS applications using SwiftUI and Storyboard with Apple's latest design principles",
      "Implementing performance optimization techniques for smooth user experiences",
      "Collaborating with cross-functional teams to deliver high-quality mobile solutions",
      "Following Agile methodologies and best practices for software development"
    ],
    technologies: ["Java", "Kotlin", "SwiftUI", "Storyboard", "Android SDK", "iOS SDK", "MVVM", "Clean Architecture"],
    icon: FaBriefcase
  },
  {
    id: 2,
    title: "Android Developer Intern",
    company: "Ahead Websoft Technology",
    location: "Gurgaon, Haryana",
    period: "Feb 2024 – May 2024",
    type: "work",
    description: "Gained hands-on experience in Android development through live project implementations.",
    achievements: [
      "Developed Android applications using Java and Kotlin with modern development practices",
      "Implemented live project features with focus on user experience and performance",
      "Collaborated with senior developers to learn industry best practices",
      "Contributed to code reviews and team discussions for continuous improvement",
      "Delivered innovative solutions using cutting-edge Android technologies"
    ],
    technologies: ["Java", "Kotlin", "Android Studio", "Gradle", "Material Design", "Git", "REST APIs"],
    icon: FaMobileAlt
  },
  {
    id: 3,
    title: "Associate Software Developer Intern",
    company: "Brudite Pvt. Ltd",
    location: "Jaipur, Rajasthan",
    period: "Aug 2023 – Jan 2024",
    type: "work",
    description: "Full-stack development experience with backend and frontend technologies.",
    achievements: [
      "Developed backend services using Java and Spring Boot for enterprise applications",
      "Created responsive frontend applications using Angular with TypeScript",
      "Implemented end-to-end application development from database to user interface",
      "Deployed and managed applications on Amazon Web Services for scalability",
      "Worked with RESTful APIs and microservices architecture"
    ],
    technologies: ["Java", "Spring Boot", "Angular", "TypeScript", "AWS", "PostgreSQL", "REST APIs", "Docker"],
    icon: FaCode
  },
  {
    id: 4,
    title: "Data Engineer Intern",
    company: "Celebal Technologies",
    location: "Jaipur, Rajasthan",
    period: "May 2023 – Aug 2023",
    type: "work",
    description: "Data engineering internship focusing on SQL and big data technologies.",
    achievements: [
      "Developed proficiency in SQL for database management and optimization",
      "Worked with PySpark for big data processing and analysis",
      "Successfully executed complex data engineering tasks and projects",
      "Demonstrated strong analytical and problem-solving skills in professional environment",
      "Collaborated with data science team on various data-driven projects"
    ],
    technologies: ["SQL", "PySpark", "Python", "Big Data", "Data Analysis", "AWS", "ETL", "Data Warehousing"],
    icon: FaDatabase
  },
  {
    id: 5,
    title: "Java Development Intern",
    company: "Code Planet",
    location: "Remote",
    period: "May 2022 – July 2022",
    type: "work",
    description: "Foundation building internship focused on Java and advanced Java concepts.",
    achievements: [
      "Mastered core Java programming concepts and object-oriented principles",
      "Learned advanced Java features including collections, multithreading, and exception handling",
      "Developed practical applications using Java frameworks and libraries",
      "Gained understanding of software development lifecycle and best practices",
      "Built strong foundation for future software development career"
    ],
    technologies: ["Java", "Advanced Java", "OOP", "Collections", "Multithreading", "JDBC", "Servlets", "JSP"],
    icon: FaGraduationCap
  }
]

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'from-blue-500 to-cyan-500'
      case 'education': return 'from-purple-500 to-pink-500'
      case 'achievement': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-500/10 border-blue-500/30'
      case 'education': return 'bg-purple-500/10 border-purple-500/30'
      case 'achievement': return 'bg-yellow-500/10 border-yellow-500/30'
      default: return 'bg-gray-500/10 border-gray-500/30'
    }
  }

  return (
    <section ref={ref} id="experience" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience Journey
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            My professional journey through technology, innovation, and continuous learning
          </p>
        </motion.div>

        {/* Responsive Timeline */}
        <div className="relative">
          {/* Timeline Line - Desktop: Center, Mobile: Left */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 sm:w-1 md:w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          
          {/* Timeline Items */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              const Icon = exp.icon
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-start ${
                    isLeft ? 'justify-start sm:justify-start' : 'justify-start sm:justify-end'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedExperience(exp.id)}
                    className={`w-full sm:w-11/12 md:w-10/12 lg:w-5/12 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border cursor-pointer transition-all duration-300 ${getTypeBg(exp.type)} backdrop-blur-sm hover:shadow-2xl ml-6 sm:ml-8 md:ml-0 ${
                      isLeft ? 'sm:mr-auto sm:ml-0' : 'sm:ml-auto sm:mr-0'
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r ${getTypeColor(exp.type)} text-white flex-shrink-0`}
                      >
                        <Icon className="text-sm sm:text-base md:text-lg lg:text-xl" />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 sm:mb-2 truncate">{exp.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-1 sm:mb-2 truncate">{exp.company}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 md:mb-4">
                          <span className="flex items-center gap-1">
                            <FaCalendar className="flex-shrink-0 text-xs sm:text-sm" /> 
                            <span className="truncate">{exp.period}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="flex-shrink-0 text-xs sm:text-sm" /> 
                            <span className="truncate">{exp.location}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 md:mb-6">{exp.description}</p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {exp.technologies.slice(0, isMobile ? 3 : 4).map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.1 }}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 bg-white/10 text-white text-xs sm:text-xs md:text-sm rounded-full border border-white/20"
                            >
                              <span className="truncate max-w-20 sm:max-w-none">{tech}</span>
                            </motion.span>
                          ))}
                          {exp.technologies.length > (isMobile ? 3 : 4) && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 bg-white/5 text-gray-400 text-xs sm:text-xs md:text-sm rounded-full border border-white/10">
                              +{exp.technologies.length - (isMobile ? 3 : 4)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div
                    animate={{ scale: selectedExperience === exp.id ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute left-3 sm:left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} border border-slate-900 z-10 border-1 sm:border-2 md:border-4`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              rotateY: 360,
              translateZ: [0, 100, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-32 right-32 text-cyan-400 text-6xl opacity-10"
          >
            <FaCode />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotateX: 360,
              translateZ: [0, -100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 left-32 text-purple-400 text-5xl opacity-10"
          >
            <FaServer />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
