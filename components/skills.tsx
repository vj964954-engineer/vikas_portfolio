  "use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCode, FaServer, FaDatabase, FaMobile, FaCloud, FaRocket, FaAndroid, FaApple, FaReact, FaTools, FaDev, FaGitAlt } from "react-icons/fa"

const skillsData = {
  "Backend Development": {
    icon: FaServer,
    skills: ["Java", "Spring Boot", "Node.js", "Python", "GraphQL", "REST APIs"],
    color: "from-blue-500 to-cyan-500",
    level: 95
  },
  "Mobile Development": {
    icon: FaMobile,
    color: "from-blue-500 to-cyan-500",
    level: 95,
    skills: ["Java", "Kotlin", "Swift UI", "React Native", "Flutter", "Dart"]
  },
  "Android Development": {
    icon: FaAndroid,
    color: "from-green-500 to-emerald-500",
    level: 90,
    skills: ["Android SDK", "Kotlin", "Java", "Jetpack Compose", "Material Design", "Gradle"]
  },
  "iOS Development": {
    icon: FaApple,
    color: "from-gray-500 to-slate-500",
    level: 85,
    skills: ["Swift UI", "Swift", "iOS SDK", "Core Data", "Auto Layout", "App Store"]
  },
  "Cross-Platform": {
    icon: FaReact,
    color: "from-purple-500 to-pink-500",
    level: 80,
    skills: ["React Native", "Flutter", "Xamarin", "Ionic", "Cordova", "PhoneGap"]
  },
  "App Architecture": {
    icon: FaServer,
    color: "from-yellow-500 to-orange-500",
    level: 85,
    skills: ["MVVM", "MVP", "Clean Architecture", "Redux", "Bloc", "Repository Pattern"]
  },
  "App Store & Deployment": {
    icon: FaRocket,
    color: "from-red-500 to-rose-500",
    level: 90,
    skills: ["Google Play Store", "App Store", "Firebase", "TestFlight", "Beta Testing", "CI/CD"]
  }
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section ref={ref} id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 md:top-24 lg:top-32 left-8 sm:left-12 md:left-16 lg:left-20 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute top-1/4 sm:top-1/3 right-8 sm:right-12 md:right-16 lg:right-20 lg:right-32 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 h-24 sm:h-32 md:h-48 lg:h-64 xl:h-80 bg-cyan-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500" />
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-12 sm:top-16 md:top-20 right-12 sm:right-16 md:right-20 text-blue-400/20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          <FaCode />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-12 sm:bottom-16 left-12 sm:left-16 md:left-20 text-purple-400/20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        >
          <FaServer />
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 sm:right-1/3 text-cyan-400/20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl"
        >
          <FaDatabase />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            Comprehensive expertise across modern technologies and frameworks
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          {Object.entries(skillsData).map(([category, data], index) => {
            const Icon = data.icon
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.03, rotateX: 5 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-br ${data.color} mb-3 sm:mb-4 md:mb-6 lg:mb-8`}
                  >
                    <Icon className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" />
                  </motion.div>

                  {/* Category Title */}
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 group-hover:text-blue-400 transition-colors">
                    {category}
                  </h3>

                  {/* Skill Level */}
                  <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                    <div className="flex justify-between items-center mb-1 sm:mb-2 md:mb-3">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">Proficiency</span>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white">{data.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 sm:h-2 md:h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${data.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${data.color}`}
                      />
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
                    {data.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 bg-white/10 text-gray-300 text-xs sm:text-xs md:text-sm rounded-full border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 text-center">
            {[
              { number: "20+", label: "Technologies Mastered" },
              { number: "32+", label: "Projects Completed" },
              { number: "2+", label: "Years Experience" },
              { number: "15+", label: "Certifications" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="space-y-1 sm:space-y-2 md:space-y-3"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
