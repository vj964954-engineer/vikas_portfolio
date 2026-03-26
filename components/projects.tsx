"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaDesktop, FaMobile, FaExternalLinkAlt, FaStar, FaRocket, FaEye, FaChevronDown, FaLayerGroup, FaCube } from 'react-icons/fa'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'android' | 'ios' | 'web';
  liveUrl: string;
  rating: number;
  views: string;
  status: 'completed' | 'in-progress';
}

const projects: Project[] = [
  {
    id: 1,
    title: "EasyShiksha: Certified Courses & Internship - Android",
    description: "EasyShiksha, Leading Free online courses platform. Skill up to success with EasyShiksha a way of simple learning that provides platforms for competitive exams, online courses, and mock test series. Explore the app and find the best video courses related to your dream jobs like Python, Blockchain, NFT Crypto, SEO, Digital Marketing, Coding, Development, Personal Development and much more.",
    image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "REST API", "Material Design"],
    category: "android",
 
     
    liveUrl: "https://play.google.com/store/apps/details?id=hawkscode.easyshiksha&pcampaignid=web_share",
    rating: 4.5,
    views: "50k+",
    status: "completed"
  },
  {
    id: 2,  
    title: "Funzo: The Ultimate Global Social Hub",
    description: "A vibrant interactive social platform featuring HD live voice parties powered by Agora technology, gamified Clan systems, and a prestigious SVIP lifestyle progression system.",
    image: "https://play-lh.googleusercontent.com/fXHbDXktSprcSmu5RqAgiMFBswipCBgtXK_Zzvy_dW5GDfSMxRfi4cVjHAANUXbFjrbyP3kcF0gSaBWVB28Dlg=w240-h480-rw",  
    technologies: ["Android", "Java", "Agora SDK", "Real-time Audio", "Firebase", "Gamification"],
    category: "android",
    liveUrl: "https://play.google.com/store/apps/details?id=com.ereotect.funzo&hl=en_IN",
    rating: 4.8,  
    views: "100+",  
    status: "completed"
  },
  {
    id: 3,
    title: "EasyShiksha: Certified Courses & Internship - iOS",
    description: "EasyShiksha, Leading Free online courses platform. Skill up to success with EasyShiksha a way of simple learning that provides platforms for competitive exams, online courses, and mock test series. Explore the app and find the best video courses related to your dream jobs like Python, Blockchain, NFT Crypto, SEO, Digital Marketing, Coding, Development, Personal Development and much more.",
    image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "REST API", "Core Data"],
    category: "ios",
    
   
    liveUrl: "https://apps.apple.com/in/app/certified-courses-internship/id1190486206",
    rating: 4.6,
    views: "45k+",
    status: "completed"
  },
  {
    id: 4,
    title: "SocialEngine Mobile App",
    description: "Android app by SocialNetworking.Solutions is for all the websites developed using SocialEngine. This app provides features like Stories, Live Streaming, Status box to share something with your friends and networks including Check-ins, Scheduled Posts to post something on future, Sell Something, Sharing Feelings & Activities, Photos and Videos Use of Emoji and Stickers all these with awesome range of stickers and emoticons. Sending messages, making friends, follow people, getting updates in notifications are basic features of this app and the Advanced and attractive music player of this app to play music across the app by minimizing it to the bottom of this app.In general, this app will provide your users an easy way to access your community easily on mobile devices and help you to gain more user engagement and retention.",
    image: "https://play-lh.googleusercontent.com/wq2n5r8TKN3KtLxo1c43oMzq_qXVtUKlTbpLqOHFLt7Jvq1Be9SzAlY3_1pQN5kwDh8=w240-h480-rw",
    technologies: ["Android", "Java", "SocialEngine API", "Firebase", "Live Streaming", "Material Design"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=com.sesolutions&pcampaignid=web_share",
    rating: 4.3,
    views: "25k+",
    status: "completed"
  },
  {
    id: 5,
    title: "Career Helper: Test & Consult - Android",
    description: "Your Career Is our Life! Plan your career with the help of our Career Helper tools & Certified Career Experts. Career Helper suggests occupations that correspond to your interests, values, aspirations, and personality. Career Helper consists: IQ Test, Basic Test, Advance Test, Psychometric Test. Know your talents, skills, strengths, and weaknesses. Choose the profession that suits you best. Get the best career guidance from Experts. Know your career options with Easyshiksha. There are a lot of interesting career options in India you can consider after school and Indian colleges are now offering you some unique courses.",
    image: "https://play-lh.googleusercontent.com/li6ces2aQ3_M2306opduL7k8PYv56IXdG4zlRy3nm56Kbt0UwM5p3VPaCFWy7JPJ6sKpJlDasRTljDh42U-M=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "Career Assessment API", "Material Design"],
    category: "android",
  
    liveUrl: "https://play.google.com/store/apps/details?id=app.careerhelper&pcampaignid=web_share",
    rating: 4.4,
    views: "30k+",
    status: "completed"
  },
  {
    id: 6,
    title: "Career Helper: Test & Consult - iOS",
    description: "Your Career Is our Life! Plan your career with the help of our Career Helper tools & Certified Career Experts. Career Helper suggests occupations that correspond to your interests, values, aspirations, and personality. Career Helper consists: IQ Test, Basic Test, Advance Test, Psychometric Test. Know your talents, skills, strengths, and weaknesses. Choose the profession that suits you best. Get the best career guidance from Experts. Know your career options with Easyshiksha. There are a lot of interesting career options in India you can consider after school and Indian colleges are now offering you some unique courses.",
    image: "https://play-lh.googleusercontent.com/li6ces2aQ3_M2306opduL7k8PYv56IXdG4zlRy3nm56Kbt0UwM5p3VPaCFWy7JPJ6sKpJlDasRTljDh42U-M=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "Career Assessment API", "Core Data"],
    category: "ios",
    
    liveUrl: "https://apps.apple.com/in/app/career-helper-test-consult/id1637396736",
    rating: 4.5,
    views: "28k+",
    status: "completed"
  },
  {
    id: 7,
    title: "Kids: Stories, Poems and Games - Android",
    description: "We at EasyShiksha Kids, help your kid in online learning. We provide various modules like - Educational Games, Videos, Stories, Worksheets, Questions and poems for Kids. Education exposes children to new ideas and helps them make a path to a career. It also builds the overall personality and makes them aware of their surroundings. Education for children eradicates social practices like child labour and boosts a nation's economy and growth. Kids learn by seeing, some by hearing, some by reading, and some by doing. It improves one's knowledge skills and develops the personality and attitude towards life.",
    image: "https://play-lh.googleusercontent.com/tJSw48SvbgQ91tKQ1LbeWhr0uP_-iRVqi8M8RBaRCwM6n-F71qrfe_7FF9pi1pasB0Y=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "Educational Content API", "Material Design"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=app.kidslearning&pcampaignid=web_share",
    rating: 4.6,
    views: "35k+",
    status: "completed"
  },
  {
    id: 8,
    title: "Kids: Stories, Poems and Games - iOS",
    description: "We at EasyShiksha Kids, help your kid in online learning. We provide various modules like - Educational Games, Videos, Stories, Worksheets, Questions and poems for Kids. Education exposes children to new ideas and helps them make a path to a career. It also builds the overall personality and makes them aware of their surroundings. Education for children eradicates social practices like child labour and boosts a nation's economy and growth. Kids learn by seeing, some by hearing, some by reading, and some by doing. It improves one's knowledge skills and develops the personality and attitude towards life.",
    image: "https://play-lh.googleusercontent.com/tJSw48SvbgQ91tKQ1LbeWhr0uP_-iRVqi8M8RBaRCwM6n-F71qrfe_7FF9pi1pasB0Y=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "Educational Content API", "Core Data"],
    category: "ios",
  
    liveUrl: "https://apps.apple.com/in/app/kids-learning-by-easyshiksha/id1632711805",
    rating: 4.7,
    views: "32k+",
    status: "completed"
  },
  {
    id: 9,
    title: "My Guru: AI Book Creator",
    description: "My Guru is a revolutionary app that combines power of artificial intelligence with convenience of a mobile app to create professionally formatted eBooks in just a few taps. With My Guru, users can turn their notes, ideas, and thoughts into stunning eBooks that are ready to share with world. One of most exciting features of My Guru is its AI-powered book creation tool. The app's machine learning algorithms can quickly analyze your notes and organize them into chapters and sections, complete with headings and subheadings. This feature saves users countless hours of manual formatting, making book creation faster and easier than ever before.",
    image: "https://play-lh.googleusercontent.com/a2fBoGWtHjhqny6YGhT8X4bQIlYfJkCqRcON6vh7-90H3DRb5xDp6-_dVKX5GP8npw=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "Natural Language Processing", "Firebase", "Material Design"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=com.myguru.aibookcreator&pcampaignid=web_share",
    rating: 4.7,
    views: "40k+",
    status: "completed"
  },
  {
    id: 10,
    title: "HealthHub: Track and Improve - Android",
    description: "Track your health effortlessly with our all-in-one health companion app. Real-Time Step Counting: Utilize our foreground service to track and update step counts continuously. Personalized Sleep Schedule: Set your sleep and wake-up times for better sleep tracking and analysis. Stay Hydrated: Track your water intake throughout the day and set reminders to drink more water. Calorie Burn Calculation: We calculate calories burned based on your step count data. Achieve Your Goals: Earn daily, weekly, monthly, and yearly achievements for meeting goals in steps, sleep, water intake, and calories burned.",
    image: "https://play-lh.googleusercontent.com/kGWDMVa4-dJxMD_4mSHU9HOx_lQbpUhyiw052gTguo9VhH13IKc2oYhU1h6S_o10Eqk=w240-h480-rw",
    technologies: ["Android", "Java", "Health Sensors API", "Foreground Service", "Firebase", "Material Design"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=app.healthhub.pro&pcampaignid=web_share",
    rating: 4.5,
    views: "28k+",
    status: "completed"
  },
  {
    id: 11,
    title: "HealthHub: Track and Improve - iOS",
    description: "Track your health effortlessly with our all-in-one health companion app. Real-Time Step Counting: Utilize our foreground service to track and update step counts continuously. Personalized Sleep Schedule: Set your sleep and wake-up times for better sleep tracking and analysis. Stay Hydrated: Track your water intake throughout the day and set reminders to drink more water. Calorie Burn Calculation: We calculate calories burned based on your step count data. Achieve Your Goals: Earn daily, weekly, monthly, and yearly achievements for meeting goals in steps, sleep, water intake, and calories burned.",
    image: "https://play-lh.googleusercontent.com/kGWDMVa4-dJxMD_4mSHU9HOx_lQbpUhyiw052gTguo9VhH13IKc2oYhU1h6S_o10Eqk=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "HealthKit", "Core Motion", "Firebase"],
    category: "ios",
  
    liveUrl: "https://apps.apple.com/in/app/healthhub-track-and-improve/id6499438152",
    rating: 4.6,
    views: "25k+",
    status: "completed"
  },
  {
    id: 12,
    title: "PulseTalk: Audio & Video Calls",
    description: "Discover a new dimension of communication with PulseTalk – your personal AI companion for engaging conversations in both audio and video formats. Seamless Audio and Video Conversations: Experience fluid and natural conversations with PulseTalk's advanced AI technology. Intelligent Interaction: Engage in meaningful discussions on a wide range of topics, from daily chitchat to deep philosophical debates. Personalized Experience: Tailored responses and insights based on your preferences, interests, and conversation history.",
    image: "https://play-lh.googleusercontent.com/5rwNx_bjUG7s41cXV_LLAl-CSfGSzXbRl7dnaqBc912IvKXVcR0AksuUeeMQBqg4-u4=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "WebRTC", "Speech Recognition", "Firebase"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=com.pulsetalk&pcampaignid=web_share",
    rating: 4.4,
    views: "22k+",
    status: "completed"
  },
  {
    id: 13,
    title: "SocialEase: AI Caption & Banner - Android",
    description: "SocialEase: AI Caption & Banner Generator is an innovative app that utilizes advanced artificial intelligence to help you create captions and banners for your social media posts. Whether you're a social media influencer, a business owner, or simply looking to enhance your personal brand, SocialEase makes it easier and more convenient to create high-quality content for your social media channels. With SocialEase, you'll never have to struggle with writer's block or spend hours trying to come up with the perfect caption or banner image.",
    image: "https://play-lh.googleusercontent.com/4GtvXs1PqIBTCsk6bE1COGq1vl9Y0H8WcBUeOQJxIOme6fw9EdxmEbmCNLnAtUglt4_w=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "Image Processing", "Natural Language Processing", "Firebase"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=app.socialease.aicaptionandbannergenerator&pcampaignid=web_share",
    rating: 4.6,
    views: "38k+",
    status: "completed"
  },
  {
    id: 14,
    title: "SocialEase: AI Caption & Banner - iOS",
    description: "SocialEase: AI Caption & Banner Generator is an innovative app that utilizes advanced artificial intelligence to help you create captions and banners for your social media posts. Whether you're a social media influencer, a business owner, or simply looking to enhance your personal brand, SocialEase makes it easier and more convenient to create high-quality content for your social media channels. With SocialEase, you'll never have to struggle with writer's block or spend hours trying to come up with the perfect caption or banner image.",
    image: "https://play-lh.googleusercontent.com/4GtvXs1PqIBTCsk6bE1COGq1vl9Y0H8WcBUeOQJxIOme6fw9EdxmEbmCNLnAtUglt4_w=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "AI/ML", "Image Processing", "Core Data"],
    category: "ios",
    
    liveUrl: "https://apps.apple.com/in/app/socialease-ai-caption-banner/id6450537287",
    rating: 4.7,
    views: "35k+",
    status: "completed"
  },
  {
    id: 15,
    title: "My Guru: GPT4 AI ChatBot - Android",
    description: "Introducing My Guru: GPT4 AI ChatBot ultimate personal assistant and AI chatbot. With My Guru, you can get instant help and answers to any question, anytime, anywhere. Simply type or speak your request and receive a quick and accurate response from our advanced artificial intelligence. My Guru is your go-to source for reliable information on a wide range of topics, from general knowledge to latest news and trends.",
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=w240-h480-rw",
    technologies: ["Android", "Java", "GPT-4 API", "Voice Recognition", "Natural Language Processing", "Firebase"],
    category: "android",
    
    liveUrl: "https://play.google.com/store/apps/details?id=com.myguru.aichatbot&pcampaignid=web_share",
    rating: 4.8,
    views: "45k+",
    status: "completed"
  },
  {
    id: 16,
    title: "My Guru: GPT4 AI ChatBot - iOS",
    description: "Introducing My Guru: GPT4 AI ChatBot ultimate personal assistant and AI chatbot. With My Guru, you can get instant help and answers to any question, anytime, anywhere. Simply type or speak your request and receive a quick and accurate response from our advanced artificial intelligence. My Guru is your go-to source for reliable information on a wide range of topics, from general knowledge to latest news and trends.",
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "GPT-4 API", "Speech Recognition", "Core Data"],
    category: "ios",
    
    liveUrl: "https://apps.apple.com/in/app/my-guru-ai-chat-bot/id6445960075",
    rating: 4.7,
    views: "42k+",
    status: "completed"
  },
  {
    id: 17,
    title: "Parenting Health Tools With EasyShiksha - Android",
    description: "Our education system Provides an authentic and interactive classroom experience. We teach kids with proper technique and the easiest ways to learn from us. Our platform Offers personalized live online teaching. We provide a large number of health tools like - BMI Calculator, Ovulation Calculator, Kids Weight Calculator, Find Lucky Baby Name, Baby Name Ideas, Parenting Quiz, and more tools that are very helpful and entertaining for Parents.",
    image: "https://play-lh.googleusercontent.com/6hY_bIf9WjS4d-y0P6BEvml1ouTHKZx43x26xqUqSWpUm48UrCxkb9T_cDdN2kgctg=w240-h480-rw",
    technologies: ["Android", "Java", "Health Calculators", "Educational Content", "Firebase", "Material Design"],
    category: "android",
  
    liveUrl: "https://play.google.com/store/apps/details?id=app.parenting&pcampaignid=web_share",
    rating: 4.6,
    views: "33k+",
    status: "completed"
  },
  {
    id: 18,
    title: "Parenting Health Tools With EasyShiksha - iOS",
    description: "Our education System Provides an authentic and interactive classroom experience. We teach kids with proper technique and the easiest ways to learn from us. Our platform Offers personalized live online teaching. We provide a large number of health tools like - BMI Calculator, Ovulation Calculator, Kids Weight Calculator, Find Lucky Baby Name, Baby Name Ideas, Parenting Quiz, and more tools that are very helpful and entertaining for Parents.",
    image: "https://play-lh.googleusercontent.com/6hY_bIf9WjS4d-y0P6BEvml1ouTHKZx43x26xqUqSWpUm48UrCxkb9T_cDdN2kgctg=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Health Calculators", "Educational Content", "Core Data"],
    category: "ios",
    
    liveUrl: "https://apps.apple.com/in/app/parenting-by-easyshiksha/id1633963431",
    rating: 4.5,
    views: "30k+",
    status: "completed"
  },
  {
    id: 19,
    title: "Government Job Alerts – EasyShiksha - iOS",
    description: "Government Job Alerts - EasyShiksha is a powerful and easy-to-use mobile app designed to help aspirants stay updated with the latest government job opportunities across India. With daily job notifications, personalized alerts, and integrated study resources, this app ensures that you never miss an important job opening or exam preparation material. Whether you are targeting Banking, Railways, SSC, Defence, Teaching, or State Government jobs, our platform provides accurate, real-time, and reliable job updates directly on your mobile.",
    image: "/govt.png",
    technologies: ["iOS", "Swift", "SwiftUI", "Job Aggregation API", "Push Notifications", "Core Data"],
    category: "ios",
    
    liveUrl: "https://apps.apple.com/in/app/govt-job-alerts-easyshiksha/id6751952231",
    rating: 4.7,
    views: "36k+",
    status: "completed"
  },
  {
    id: 20,
    title: "ArogyaSense Care+",
    description: "Elevate Your Health Intelligence with ArogyaSense Care+. Your all-in-one personal health companion designed to simplify medical management and amplify wellness. Whether you're tracking daily habits or archiving critical medical documents, our platform provides a secure, intuitive, and data-driven approach to your well-being.",
    image: "/arogyasense.png",
    technologies: ["iOS", "Swift", "SwiftUI", "HealthKit", "Core Data", "Secure Encryption"],
    category: "ios",
  
    liveUrl: "https://apps.apple.com/in/app/arogyasense-care/id6758613846",
    rating: 4.8,
    views: "29k+",
    status: "completed"
  } 
   
]

// Smooth 3D Background Component
function Smooth3DBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )}

function ImageDebugger() {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({})
  
  useEffect(() => {
    const testImages = async () => {
      const results: Record<string, boolean> = {}
      
      for (const project of projects) {
        try {
          const img = new Image()
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(true)
            img.onerror = () => reject(false)
            img.src = project.image
          })
          results[project.title] = true
          console.log(`✅ SUCCESS: ${project.title}`)
        } catch (error) {
          results[project.title] = false
          console.log(`❌ FAILED: ${project.title} - ${project.image}`)
        }
      }
      
      setImageStatus(results)
      console.log('📊 Image Test Results:', results)
    }
    
    testImages()
  }, [])
  
  return null // This component doesn't render anything, just logs results
}
function RobustImage({ project, className }: { project: Project, className: string }) {
  const [imageSrc, setImageSrc] = useState(project.image)
  const [hasError, setHasError] = useState(false)
  const [fallbackCount, setFallbackCount] = useState(0)

  const handleImageError = () => {
    if (fallbackCount === 0) {
      // First fallback: Use a high-quality tech placeholder based on category
      const techPlaceholder = project.category === 'android' 
        ? `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop` // Mobile
        : `https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop`; // App UI
      setImageSrc(techPlaceholder)
      setFallbackCount(1)
    } else {
      // Final fallback: Show the CSS-based "App Icon" style
      setHasError(true)
    }
  }

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10`}>
        <div className="text-center p-4">
          <div className="text-3xl mb-1 opacity-50">
            {project.category === 'ios' ? <FaMobile /> : <FaCode />}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-tighter opacity-40">
            {project.title.split(':')[0]}
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={project.title}
      onError={handleImageError}
      className={className}
      loading="lazy"
    />
  )
}
// function RobustImage({ project, className }: { project: Project, className: string }) {
//   const [imageSrc, setImageSrc] = useState(project.image)
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasError, setHasError] = useState(false)

//   const fallbackImages = [
//     project.image, // Original image
//     '/placeholder.jpg', // Local placeholder
//     'https://picsum.photos/seed/' + project.id + '/400/300.jpg', // Random placeholder
//     'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23475569"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20"%3E' + project.title + '%3C/text%3E%3C/svg%3E' // SVG fallback
//   ]

//   const handleImageError = () => {
//     const currentIndex = fallbackImages.indexOf(imageSrc)
//     if (currentIndex < fallbackImages.length - 1) {
//       console.log(`🔄 Trying fallback for ${project.title}: ${fallbackImages[currentIndex + 1]}`)
//       setImageSrc(fallbackImages[currentIndex + 1])
//     } else {
//       setHasError(true)
//       console.log(`❌ All fallbacks failed for ${project.title}`)
//     }
//   }

//   return (
//     <div className="relative w-full h-full">
//       {isLoading && (
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
//       )}
//       <img
//         src={imageSrc}
//         alt={project.title}
//         onLoad={() => {
//           setIsLoading(false)
//           setHasError(false)
//           console.log(`✅ Loaded: ${project.title} - ${imageSrc}`)
//         }}
//         onError={handleImageError}
//         className={className}
//         style={{ display: hasError ? 'none' : 'block' }}
//       />
//       {hasError && (
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
//           <div className="text-center text-white p-4">
//             <div className="text-2xl mb-2">📱</div>
//             <div className="text-sm font-bold">{project.title}</div>
//             <div className="text-xs opacity-75">Image Not Available</div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | '3d-carousel' | 'showcase'>('showcase')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  })

 const categories = [
    { id: 'all', name: 'All Projects', icon: FaCode },
    { id: 'android', name: 'Android Apps', icon: FaMobile },
    { id: 'ios', name: 'iOS Apps', icon: FaMobile },
    { id: 'web', name: 'Web View', icon: FaDesktop }
  ]

  // 3D showcase projects for special display
  const showcaseProjects = [
    {
      id: 1,
      title: "EasyShiksha: Certified Courses & Internship - Android",
      description: "Leading educational platform with certified courses and internship programs",
      image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
      position: { x: -200, y: 0, z: -100 },
      rotation: { x: 0, y: 45, z: 0 },
      scale: 1.2,
      color: "#10b981",
      liveUrl: "https://play.google.com/store/apps/details?id=com.easyshiksha&pcampaignid=web_share"
    },
    {
      id: 2,
      title: "My Guru: AI Book Creator",
      description: "Revolutionary AI-powered eBook creation platform",
      image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
      position: { x: 200, y: 50, z: -50 },
      rotation: { x: 0, y: -30, z: 15 },
      scale: 1.0,
      color: "#3b82f6",
      liveUrl: "https://play.google.com/store/apps/details?id=com.myguru.aibookcreator&pcampaignid=web_share"
    },
    {
      id: 3,
      title: "PulseTalk: Audio & Video Calls",
      description: "AI-powered communication platform with real-time conversations",
      image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
      position: { x: 0, y: -100, z: 100 },
      rotation: { x: 25, y: 15, z: 0 },
      scale: 0.9,
      color: "#8b5cf6",
      liveUrl: "https://play.google.com/store/apps/details?id=com.pulsetalk&pcampaignid=web_share"
    }
  ]
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const displayProjects = filteredProjects // Show all projects

  // Auto-play for carousel
  useEffect(() => {
    if (isAutoPlaying && viewMode === '3d-carousel') {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayProjects.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, viewMode, displayProjects.length])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'android': return 'from-green-500 to-emerald-500'
      case 'ios': return 'from-blue-500 to-indigo-500'
      case 'web': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }
return (
    <section ref={ref} id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Debug Image Loading */}
      <ImageDebugger />
      
      {/* Smooth 3D Background */}
      <Smooth3DBackground />
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FEATURED WORK
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              Mobile & Web Solutions That Make a Difference
            </p>
          </motion.div>

          {/* CATEGORY FILTERS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all border ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                    : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white'
                }`}
              >
                <category.icon className="inline mr-2" size={16} />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* VIEW MODE TOGGLE */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={inView ? { opacity: 1 } : {}} 
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 sm:gap-4"
          >
            {[
              { mode: 'showcase' as const, label: 'Showcase', icon: FaStar },
              { mode: '3d-carousel' as const, label: '3D Carousel', icon: FaCube },
              { mode: 'grid' as const, label: 'Grid View', icon: FaLayerGroup }
            ].map(({ mode, label, icon: Icon }) => (
              <motion.button
                key={mode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(mode)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* --- SHOWCASE MODE --- */}
        <AnimatePresence mode="wait">
          {viewMode === 'showcase' && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {displayProjects.map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-slate-800/60 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-48 sm:h-52 md:h-56 overflow-hidden">
                    <RobustImage project={project} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(project.status)}`}>
                        {project.status.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar size={12} />
                        <span className="text-xs font-bold">{project.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center gap-2 font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg"
                    >
                      VIEW PROJECT <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* --- 3D CAROUSEL MODE --- */}
          {viewMode === '3d-carousel' && (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full flex items-center justify-center"
              style={{ perspective: '2000px' }}
            >
              <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {displayProjects.map((project: Project, index: number) => {
                  const total = displayProjects.length;
                  const angleStep = (2 * Math.PI) / total;
                  const currentAngle = index * angleStep;
                  const orbitRadius = 200;
                  const isActive = index === currentIndex;

                  return (
                    <motion.div
                      key={project.id}
                      animate={{
                        rotateY: isAutoPlaying ? [0, 360] : 0,
                        x: Math.cos(currentAngle) * orbitRadius,
                        z: Math.sin(currentAngle) * orbitRadius,
                        scale: isActive ? 1.2 : 0.8,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{
                        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                        default: { duration: 0.5, type: "spring" }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="absolute"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <motion.div 
                        whileHover={{ scale: isActive ? 1.1 : 1.05, z: 50 }}
                        className="w-48 sm:w-56 md:w-64 h-80 sm:h-90 md:h-96 bg-slate-800/80 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 shadow-2xl cursor-pointer overflow-hidden"
                      >
                        <div className="h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden mb-4">
                          <RobustImage project={project} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-xs">⭐ {project.rating}</span>
                          <span className="text-blue-400 text-xs">{project.category.toUpperCase()}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Carousel Controls */}
              <div className="absolute bottom-4 flex gap-2 sm:gap-4">
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)} 
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20"
                >
                  {isAutoPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                </button>
                <button 
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length)}
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20"
                >
                  ← PREV
                </button>
                <button 
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % displayProjects.length)}
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20"
                >
                  NEXT →
                </button>
              </div>
            </motion.div>
          )}

          {/* --- GRID MODE --- */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {displayProjects.map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="h-24 sm:h-28 rounded-lg overflow-hidden mb-3">
                    <RobustImage project={project} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">{project.title}</h4>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs">⭐ {project.rating}</span>
                    <a href={project.liveUrl} target="_blank" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
