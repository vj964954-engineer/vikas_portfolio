"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaUser, FaCode, FaRocket, FaAward, FaEnvelope } from "react-icons/fa"

// Shared navigation function
const scrollToSection = (sectionId: string) => {
  console.log(`Attempting to scroll to section: ${sectionId}`)
  
  // Method 1: Try direct ID lookup
  let element = document.getElementById(sectionId)
  console.log('Method 1 - Direct ID lookup result:', element)
  
  // Method 2: Try query selector
  if (!element) {
    element = document.querySelector(`section[id="${sectionId}"]`)
    console.log('Method 2 - Query selector result:', element)
  }
  
  // Method 3: Try by tag name and attribute
  if (!element) {
    const sections = document.getElementsByTagName('section')
    for (let section of sections) {
      if (section.getAttribute('id') === sectionId) {
        element = section
        console.log('Method 3 - Tag name lookup result:', element)
        break
      }
    }
  }
  
  // Execute scroll if element found
  if (element) {
    console.log('Element found, scrolling...')
    element.scrollIntoView({ 
      behavior: "smooth", 
      block: "start",
      inline: "nearest"
    })
    
    // Add visual feedback
    element.style.outline = '2px solid #3b82f6'
    setTimeout(() => {
      element.style.outline = 'none'
    }, 2000)
  } else {
    console.log('Contact section not found. Available sections:')
    const allSections = document.querySelectorAll('section[id]')
    allSections.forEach((section, index) => {
      console.log(`  ${index + 1}. ID: "${section.getAttribute('id')}"`)
    })
  }
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const stats = [
    { value: "2+", label: "Years Experience", icon: FaUser },
    { value: "32+", label: "Projects Delivered", icon: FaCode },
    { value: "15+", label: "Technologies", icon: FaRocket },
    { value: "100%", label: "Client Satisfaction", icon: FaAward },
  ]

  const expertise = [
    {
    title: "Java & Backend Development",
    description: "Specialized in building robust, scalable enterprise applications and distributed systems using modern Java frameworks and microservices architecture.",
    skills: ["Java", "Spring Boot", "Microservices", "Spring Security", "REST APIs", "Hibernate"]
  },
    // {
    //   title: "Mobile App Development",
    //   description: "Expert in creating native and cross-platform mobile applications with focus on performance, user experience, and app store optimization.",
    //   skills: ["Java", "Kotlin", "Swift UI", "Swift","StoryBoard"]
    // },
    {
      title: "Android Development",
      description: "Specialized in Android app development using Java and Kotlin, with deep understanding of Android SDK, Material Design, and Google Play Store guidelines.",
      skills: ["Android SDK", "Kotlin", "Java", "Jetpack Compose", "Material Design"]
    },
    {
      title: "iOS Development",
      description: "Proficient in iOS app development using Swift UI and Swift, with expertise in Apple's design principles and App Store submission process.",
      skills: ["Swift UI", "Swift", "iOS SDK", "Core Data", "App Store"]
    }
  ]

  return (
    <section ref={ref} id="about" className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-32 text-blue-400/20 text-6xl"
        >
          <FaUser />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-32 text-purple-400/20 text-5xl"
        >
          <FaCode />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-8 md:mt-12 lg:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Build Something Amazing Together
              </span>
            </h3>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
              I'm always excited to work on innovative projects and collaborate with passionate teams. 
              Whether you have a specific project in mind or just want to discuss ideas, 
              I'd love to hear from you!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 lg:py-5 rounded-full font-semibold text-sm md:text-base lg:text-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <FaEnvelope /> Get in Touch
              </span>
            </motion.button>
          </div>
        </motion.div>
        <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Passionate app developer crafting extraordinary digital experiences with cutting-edge technologies
        </p>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
         
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 lg:gap-20 items-start mb-12 md:mb-16 lg:mb-20 lg:mb-24">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 lg:space-y-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
                I'm a passionate <span className="text-blue-400 font-bold">Professional App Developer</span> with over 2+ years of experience creating innovative mobile applications for Android and iOS platforms. My expertise spans from native app development to cross-platform solutions.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
                I specialize in <span className="text-purple-400 font-semibold">Java & Kotlin</span> for Android development, <span className="text-cyan-400 font-semibold">Swift UI</span> for iOS applications, and have successfully delivered <span className="text-pink-400 font-semibold">32+ mobile apps</span> to the App Store and Google Play Store.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
                My approach combines technical excellence with user-centric design, ensuring every app not only functions flawlessly but also delivers exceptional user experiences. I'm constantly exploring new mobile technologies and frameworks to stay at the forefront of app development.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform duration-300"
                      >
                        <Icon className="text-white text-sm sm:text-base md:text-lg lg:text-xl" />
                      </motion.div>
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {stat.value}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-gray-300 transition-colors text-center">
                      {stat.label}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column - Expertise Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-6 lg:space-y-8"
          >
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 5 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"
                  />
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-gray-200 transition-colors">
                  {item.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                  {item.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs sm:text-xs md:text-sm rounded-full border border-blue-500/30 hover:border-purple-500/50 transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl md:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-12 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              I'm always excited to work on challenging projects and collaborate with innovative teams.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}