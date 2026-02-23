// "use client"

// import { useRef } from "react"
// import { motion, useInView } from "framer-motion"
// import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode, FaRocket, FaArrowUp } from "react-icons/fa"

// export default function Footer() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: false, amount: 0.3 })
//   const currentYear = new Date().getFullYear()

//   const quickLinks = [
//     { label: "Home", href: "#home" },
//     { label: "About", href: "#about" },
//     { label: "Projects", href: "#projects" },
//     { label: "Skills", href: "#skills" },
//     { label: "Experience", href: "#experience" },
//     { label: "Blog", href: "#blog" },
//     { label: "Contact", href: "#contact" }
//   ]

//   const services = [
//     "Full Stack Development",
//     "Mobile App Development", 
//     "Cloud Architecture",
//     "API Design & Integration",
//     "UI/UX Design",
//     "DevOps & Deployment"
//   ]

//   const socialLinks = [
//     { icon: FaGithub, href: "https://github.com/vikas8385", label: "GitHub" },
//     { icon: FaLinkedin, href: "https://linkedin.com/in/vikas-kumar-jain-571a48230", label: "LinkedIn" },
//     { icon: FaEnvelope, href: "mailto:jainvikas317420@gmail.com", label: "Email" }
//   ]

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   return (
    // <footer ref={ref} className="relative bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
    //   {/* Background Effects */}
    //   <div className="absolute inset-0 overflow-hidden pointer-events-none">
    //     <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    //     <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    //     <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        
//         {/* Floating Icons */}
//         <motion.div
//           animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//           className="absolute top-32 right-32 text-blue-400/20 text-5xl"
//         >
//           <FaCode />
//         </motion.div>
//         <motion.div
//           animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           className="absolute bottom-32 left-32 text-purple-400/20 text-4xl"
//         >
//           <FaRocket />
//         </motion.div>
//       </div>

//       <div className="relative z-10">
//         {/* Main Footer Content */}
//         <div className="max-w-7xl mx-auto py-20 px-4">
//           <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
//             {/* Brand Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="space-y-6"
//             >
//               <div>
                // <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                //   Vikas Kumar Jain
                // </h3>
//                 <p className="text-gray-300 leading-relaxed">
//                   Full Stack Developer crafting extraordinary digital experiences with cutting-edge technologies. Specializing in Java, Spring Boot, Swift UI, and modern web applications.
//                 </p>
//               </div>
              
//               <div className="flex gap-4">
//                 {socialLinks.map((social, index) => {
//                   const Icon = social.icon
//                   return (
//                     <motion.a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                       transition={{ delay: 0.2 + index * 0.1 }}
//                       whileHover={{ scale: 1.2, rotate: 360 }}
//                       className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
//                     >
//                       <Icon className="text-gray-400 text-lg group-hover:text-blue-400 transition-colors" />
//                     </motion.a>
//                   )
//                 })}
//               </div>
//             </motion.div>

//             {/* Quick Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="space-y-6"
//             >
//               <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
//               <ul className="space-y-3">
//                 {quickLinks.map((link, index) => (
//                   <motion.li
//                     key={link.label}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={isInView ? { opacity: 1, x: 0 } : {}}
//                     transition={{ delay: 0.3 + index * 0.05 }}
//                   >
//                     <motion.a
//                       href={link.href}
//                       whileHover={{ x: 5 }}
//                       className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
//                     >
//                       <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {link.label}
//                     </motion.a>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Services */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="space-y-6"
//             >
//               <h4 className="text-xl font-bold text-white mb-6">Services</h4>
//               <ul className="space-y-3">
//                 {services.map((service, index) => (
//                   <motion.li
//                     key={service}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={isInView ? { opacity: 1, x: 0 } : {}}
//                     transition={{ delay: 0.4 + index * 0.05 }}
//                   >
//                     <motion.span
//                       whileHover={{ x: 5 }}
//                       className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group cursor-default"
//                     >
//                       <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {service}
//                     </motion.span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="space-y-6"
//             >
//               <h4 className="text-xl font-bold text-white mb-6">Get In Touch</h4>
//               <div className="space-y-4">
//                 <motion.a
//                   href="mailto:jainvikas317420@gmail.com"
//                   whileHover={{ x: 5 }}
//                   className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center gap-3 group"
//                 >
//                   <FaEnvelope className="group-hover:scale-110 transition-transform" />
//                   <span>jainvikas317420@gmail.com</span>
//                 </motion.a>
//                 <motion.a
//                   href="https://github.com/vikas8385"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ x: 5 }}
//                   className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-3 group"
//                 >
//                   <FaGithub className="group-hover:scale-110 transition-transform" />
//                   <span>github.com/vikas8385</span>
//                 </motion.a>
//                 <motion.a
//                   href="https://linkedin.com/in/vikas-kumar-jain-571a48230"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ x: 5 }}
//                   className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-3 group"
//                 >
//                   <FaLinkedin className="group-hover:scale-110 transition-transform" />
//                   <span>linkedin.com/in/vikas-kumar-jain</span>
//                 </motion.a>
//               </div>
//             </motion.div>
//           </div>

//           {/* Bottom Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="border-t border-white/10 pt-8"
//           >
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
//               <div className="text-center md:text-left">
//                 <p className="text-gray-400 text-sm">
//                   © {currentYear} Vikas Kumar Jain. All rights reserved.
//                 </p>
//                 <p className="text-gray-500 text-xs mt-2">
//                   Built with Next.js, React, and lots of coffee ☕
//                 </p>
//               </div>
              
//               <div className="flex items-center justify-center gap-6">
//                 <div className="flex items-center gap-2 text-gray-400 text-sm">
//                   <span>Made with</span>
//                   <FaHeart className="text-red-500 animate-pulse" />
//                   <span>by Vikas</span>
//                 </div>
                
//                 <motion.button
//                   onClick={scrollToTop}
//                   whileHover={{ scale: 1.1, y: -3 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
//                 >
//                   <FaArrowUp />
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </footer>
//   )
// }


"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode, FaRocket, FaArrowUp, FaTerminal, FaCube, FaFingerprint } from "react-icons/fa"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const currentYear = new Date().getFullYear()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" }
  ]

  const technologies = ["Java", "Spring Boot", "Swift UI", "Kotlin", "AWS", "SQL"]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={ref} className="relative bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        {/* Animated 3D Floating Artifacts */}
        <motion.div
          animate={{ y: [0, -40, 0], rotateZ: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[15%] text-cyan-500/20 text-7xl"
        >
          <FaCube />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], rotateX: [0, 360], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-[10%] text-purple-500/20 text-6xl"
        >
          <FaTerminal />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Identity Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2 space-y-8"
          >
            <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Vikas Kumar Jain
            </h3>

              {/* <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Vikas Kumar Jain
                </h3> */}
            <p className="text-gray-400 text-xl leading-relaxed max-w-md">
              Software Developer at <span className="text-white font-bold">Hawkscode Pvt. Ltd</span>. 
              Architecting the next generation of mobile and cloud experiences.
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/vikas8385" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/vikas-kumar-jain-571a48230" },
                { icon: FaEnvelope, href: "mailto:jainvikas317420@gmail.com" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, y: -5, rotateY: 20 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-xl"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Matrix */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-widest text-blue-500 uppercase">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      onHoverStart={() => setHoveredLink(link.label)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className={`w-1 h-1 bg-blue-500 rounded-full transition-all duration-300 ${hoveredLink === link.label ? 'w-4' : 'opacity-0'}`} />
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-widest text-purple-500 uppercase">Core Stack</h4>
              <ul className="space-y-4">
                {technologies.map((tech) => (
                  <li key={tech} className="text-gray-400 flex items-center gap-3">
                    <FaCode className="text-purple-500 text-[10px]" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3D Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
            <FaFingerprint className="text-blue-500" />
            <span>© {currentYear} Vikas Kumar Jain. Digital Signature Verified.</span>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Handcrafted with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>by Vikas</span>
             </div>
             
             {/* 3D Back to Top Rocket */}
             <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -10, rotateZ: -10 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FaRocket className="text-xl group-hover:animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}