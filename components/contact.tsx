// "use client"

// import { useRef, useState } from "react"
// import { motion, useInView } from "framer-motion"
// import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa"

// export default function Contact() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: false, amount: 0.3 })
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     // Simulate form submission
//     setTimeout(() => {
//       setSubmitStatus("success")
//       setFormData({ name: "", email: "", subject: "", message: "" })
//       setIsSubmitting(false)
//       setTimeout(() => setSubmitStatus("idle"), 3000)
//     }, 2000)
//   }

//   const contactInfo = [
//     {
//       icon: FaEnvelope,
//       label: "Email",
//       value: "jainvikas317420@gmail.com",
//       href: "mailto:jainvikas317420@gmail.com",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: FaPhone,
//       label: "Phone",
//       value: "+91 9649543747",
//       href: "tel:+919649543747",
//       color: "from-green-500 to-emerald-500"
//     },
//     {
//       icon: FaMapMarkerAlt,
//       label: "Location",
//       value: "Jaipur, India",
//       href: "https://www.google.com/maps/search/Jaipur",
//       color: "from-purple-500 to-pink-500"
//     }
//   ]

//   const socialLinks = [
//     { icon: FaGithub, href: "https://github.com/vikas8385", label: "GitHub" },
//     { icon: FaLinkedin, href: "https://linkedin.com/in/vikas-kumar-jain-571a48230", label: "LinkedIn" },
//     { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" }
//   ]

//   return (
//     <section ref={ref} id="contact" className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        
//         {/* Floating Icons */}
//         <motion.div
//           animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           className="absolute top-32 right-32 text-blue-400/20 text-6xl"
//         >
//           <FaEnvelope />
//         </motion.div>
//         <motion.div
//           animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           className="absolute bottom-32 left-32 text-purple-400/20 text-5xl"
//         >
//           <FaPhone />
//         </motion.div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-24"
//         >
//           <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
//             <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Get In Touch
//             </span>
//           </h2>
//           <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
//             Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-20">
//           {/* Contact Information */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-16"
//           >
//             {/* Contact Cards */}
//             <div className="space-y-8">
//               {contactInfo.map((info, index) => {
//                 const Icon = info.icon
//                 return (
//                   <motion.a
//                     key={info.label}
//                     href={info.href}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
//                     whileHover={{ x: 15, scale: 1.03 }}
//                     className="group flex items-center gap-8 p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 360 }}
//                       transition={{ duration: 0.5 }}
//                       className={`p-6 rounded-3xl bg-gradient-to-br ${info.color} text-white`}
//                     >
//                       <Icon className="text-2xl" />
//                     </motion.div>
//                     <div>
//                       <p className="text-gray-400 text-lg mb-2">{info.label}</p>
//                       <p className="text-white font-semibold text-xl group-hover:text-blue-400 transition-colors">
//                         {info.value}
//                       </p>
//                     </div>
//                   </motion.a>
//                 )
//               })}
//             </div>

//             {/* Social Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-12 rounded-3xl border border-white/10"
//             >
//               <h3 className="text-3xl font-bold text-white mb-8">Connect With Me</h3>
//               <p className="text-gray-300 mb-10 text-lg">
//                 Follow me on social media to see my latest work and updates
//               </p>
//               <div className="flex gap-6">
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
//                       transition={{ delay: 0.8 + index * 0.1 }}
//                       whileHover={{ scale: 1.3, rotate: 360 }}
//                       className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
//                     >
//                       <Icon className="text-gray-400 text-2xl group-hover:text-blue-400 transition-colors" />
//                     </motion.a>
//                   )
//                 })}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-12 rounded-3xl border border-white/10"
//           >
//             <h3 className="text-3xl font-bold text-white mb-10">Send Me a Message</h3>
            
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Name */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 0.5 }}
//               >
//                 <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-3">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 bg-slate-800/50 border border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500 text-lg"
//                 />
//               </motion.div>

//               {/* Email */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 0.6 }}
//               >
//                 <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-3">
//                   Your Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="your.email@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 bg-slate-800/50 border border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500 text-lg"
//                 />
//               </motion.div>

//               {/* Subject */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 0.7 }}
//               >
//                 <label htmlFor="subject" className="block text-lg font-medium text-gray-300 mb-3">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   placeholder="What is this about?"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 bg-slate-800/50 border border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500 text-lg"
//                 />
//               </motion.div>

//               {/* Message */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 0.8 }}
//               >
//                 <label htmlFor="message" className="block text-lg font-medium text-gray-300 mb-3">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   placeholder="Tell me about your project or inquiry..."
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={6}
//                   className="w-full px-6 py-4 bg-slate-800/50 border border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500 resize-none text-lg"
//                 />
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group overflow-hidden relative text-lg"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                 <span className="relative z-10 flex items-center gap-4">
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       Send Message
//                       <FaPaperPlane className="text-xl" />
//                     </>
//                   )}
//                 </span>
//               </motion.button>

//               {/* Status Messages */}
//               {submitStatus === "success" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-6 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 text-lg"
//                 >
//                   Message sent successfully! I'll get back to you soon.
//                 </motion.div>
//               )}
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaRobot, FaFingerprint } from "react-icons/fa"
import emailjs from '@emailjs/browser'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using your verified Service, Template, and Public Keys
    emailjs.sendForm(
      'service_9zp6ccm', 
      'template_2thuyfu', 
      formRef.current!, 
      'QlHFTGy_Tib8FDhE8'   
    )
    .then(() => {
      setSubmitStatus("success");
      formRef.current?.reset();
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, (error) => {
      console.error("Transmission Error:", error.text);
      setSubmitStatus("error");
      setIsSubmitting(false);
    });
  };

  const contactInfo = [
    { icon: FaEnvelope, label: "Direct Email", value: "jainvikas317420@gmail.com", href: "mailto:jainvikas317420@gmail.com", color: "from-blue-500 to-cyan-500" },
    { icon: FaPhone, label: "Mobile Access", value: "+91 9649543747", href: "tel:+919649543747", color: "from-green-500 to-emerald-500" },
    { icon: FaMapMarkerAlt, label: "Base Location", value: "Jaipur, Rajasthan", href: "#", color: "from-purple-500 to-pink-500" }
  ]

  return (
    <section ref={ref} id="contact" className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
    

       
         <div className="max-w-7xl mx-auto px-6">
              <div className="absolute top-32 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              LET'S CONNECT
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ready to initiate a digital handshake? Reach out for collaborations in Java, Spring Boot, or Mobile development[cite: 19, 48].
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                whileHover={{ scale: 1.05, x: 10, rotateY: -10 }}
                className="flex items-center gap-6 p-8 bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/10 hover:border-cyan-500/50 transition-all group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`p-5 rounded-2xl bg-gradient-to-br ${info.color} shadow-lg group-hover:shadow-cyan-500/20`}>
                  <info.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-gray-500 uppercase">{info.label}</p>
                  <p className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Holographic Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative p-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-[40px] shadow-2xl"
          >
            <div className="bg-slate-900 rounded-[39px] p-10 md:p-12 overflow-hidden relative">
              {/* Scanning Laser Effect */}
              <motion.div 
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-cyan-400/20 blur-md z-0 pointer-events-none" 
              />
              
              <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
                <FaRobot className="text-cyan-400" /> SECURE UPLINK
              </h3>
              
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6 relative z-10">
                <div className="group">
                  <input type="text" name="user_name" placeholder="IDENTIFY YOURSELF (NAME)" required 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 transition-all text-xs font-bold tracking-widest placeholder:text-gray-600" />
                </div>
                <div className="group">
                  <input type="email" name="user_email" placeholder="RETURN FREQUENCY (EMAIL)" required 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 transition-all text-xs font-bold tracking-widest placeholder:text-gray-600" />
                </div>
                <div className="group">
                  <textarea name="message" rows={5} placeholder="DATA PAYLOAD (MESSAGE)" required 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 transition-all text-xs font-bold tracking-widest placeholder:text-gray-600 resize-none" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-cyan-500 text-slate-950 font-black tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIATE UPLINK'}
                  <FaFingerprint size={20} />
                </motion.button>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center text-xs font-bold tracking-widest">
                      TRANSMISSION SUCCESSFUL. I WILL RESPOND SHORTLY.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}