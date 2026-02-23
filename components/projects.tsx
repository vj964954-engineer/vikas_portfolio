"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaDesktop, FaMobile, FaExternalLinkAlt, FaStar, FaRocket, FaEye, FaChevronDown } from 'react-icons/fa'

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
    liveUrl: "https://play.google.com/store/apps/details?id=com.funzo.chat&pli=1",
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
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=s48-rw",
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
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=s48-rw",
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

export default function Projects() {
 const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['android']))
  const [viewMode, setViewMode] = useState<'accordion' | '3d-showcase'>('3d-showcase')
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isInteractiveMode, setIsInteractiveMode] = useState(false)
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

  // Auto rotation effect
  useEffect(() => {
    if (isAutoRotating && viewMode === '3d-showcase') {
      const interval = setInterval(() => {
        // Simply cycle through hover states to trigger animations
        const randomIndex = Math.floor(Math.random() * showcaseProjects.length)
        setHoveredProject(showcaseProjects[randomIndex].id)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isAutoRotating, viewMode])

  // Interactive mode effect
  useEffect(() => {
    if (isInteractiveMode && viewMode === '3d-showcase') {
      const handleMouseMove = (e: MouseEvent) => {
        const cards = document.querySelectorAll('.showcase-card')
        cards.forEach((card: any) => {
          const rect = card.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const angleX = (e.clientY - centerY) / 15
          const angleY = (e.clientX - centerX) / 15
          card.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`
        })
      }
      document.addEventListener('mousemove', handleMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isInteractiveMode, viewMode])

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  // Group projects by category for accordion view
  const projectsByCategory = categories.reduce((acc, category) => {
    if (category.id !== 'all') {
      acc[category.id] = projects.filter(p => p.category === category.id)
    }
    return acc
  }, {} as Record<string, typeof projects>)
const projectsData = projects;
const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleAllCategories = () => {
    if (expandedCategories.size === categories.length - 1) {
      setExpandedCategories(new Set())
    } else {
      setExpandedCategories(new Set(categories.filter(c => c.id !== 'all').map(c => c.id)))
    }
  }

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
    // <section ref={ref} id="projects" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"></section>
    <section ref={ref} id="projects" className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Cyber-Grid */}
      {/* <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} /> */}
 
      <div className="max-w-7xl mx-auto px-4">
              <div className="absolute top-32 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 md:mb-16 lg:mb-20 gap-6 lg:gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FEATURED WORK
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl font-medium px-4 lg:px-0">Mobile & Web Solutions</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === 'accordion' ? '3d-showcase' : 'accordion')}
            className="px-6 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold shadow-2xl hover:bg-white/10 transition-all flex items-center gap-3 text-sm md:text-base"
          >
            {viewMode === 'accordion' ? <><FaRocket /> <span className="hidden sm:inline">Try 3D Experience</span><span className="sm:hidden">3D</span></> : <><FaCode /> <span className="hidden sm:inline">Switch to List View</span><span className="sm:hidden">List</span></>}
          </motion.button>
        </div>

        {/* --- 3D SHOWCASE MODE --- */}
        <AnimatePresence mode="wait">
          {viewMode === '3d-showcase' ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full flex items-center justify-center"
              style={{ perspective: '2000px' }}
            >
              <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {projectsData.slice(0, 6).map((project, index) => { // Slicing to 6 for performance in 3D
                  const total = 6;
                  const angleStep = (2 * Math.PI) / total;
                  const currentAngle = index * angleStep;
                  const orbitRadius = 250; // Reduced for mobile

                  return (
                    <motion.div
                      key={project.id}
                      animate={{
                        rotateY: isAutoRotating ? [0, 360] : 0,
                        x: Math.cos(currentAngle) * orbitRadius,
                        z: Math.sin(currentAngle) * orbitRadius,
                      }}
                      transition={{
                        rotateY: { duration: 30, repeat: Infinity, ease: "linear" },
                        default: { duration: 1, type: "spring" }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="absolute"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, z: 100, rotateY: 0 }}
                        className="w-56 sm:w-64 md:w-72 h-[380px] sm:h-[400px] md:h-[420px] bg-slate-900/80 backdrop-blur-2xl rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-white/20 p-4 sm:p-5 md:p-6 shadow-2xl group overflow-hidden"
                      >
                        <div className="h-32 sm:h-36 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-white/5">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       
                       
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-sm mb-4 sm:mb-6 line-clamp-3">{project.description}</p>
                        
                        <div className="flex gap-2 mb-4 sm:mb-6">
                           <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-[8px] sm:text-[10px] font-bold border border-blue-500/30">
                             {project.category.toUpperCase()}
                           </span>
                           <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-[8px] sm:text-[10px] font-bold border border-green-500/30">
                             ⭐ {project.rating}
                           </span>
                        </div>

                        <a href={project.liveUrl} target="_blank" className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2 font-bold text-xs sm:text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                          VIEW PROJECT <FaExternalLinkAlt size={10} />
                        </a>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Orbit Controls */}
              <div className="absolute bottom-4 flex gap-2 sm:gap-4">
                <button onClick={() => setIsAutoRotating(!isAutoRotating)} className="px-3 sm:px-6 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20">
                  {isAutoRotating ? "⏸ PAUSE" : "▶ RESUME"}
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- ACCORDION VIEW MODE --- */
            <motion.div key="accordion" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="space-y-4 md:space-y-6">
              {['android', 'ios', 'web'].map((cat) => (
                <div key={cat} className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden">
                  <button onClick={() => toggleCategory(cat)} className="w-full px-6 md:px-8 lg:px-10 py-6 md:py-8 flex items-center justify-between group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="p-3 md:p-4 bg-blue-500/20 rounded-xl md:rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                        {cat === 'android' ? <FaMobile size={20} /> : cat === 'ios' ? <FaMobile size={20} /> : <FaDesktop size={20} />}
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider">{cat} Projects</h3>
                    </div>
                    <motion.div animate={{ rotate: expandedCategories.has(cat) ? 180 : 0 }}>
                      <FaChevronDown className="text-white opacity-50" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategories.has(cat) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 lg:px-10 pb-6 md:pb-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {projectsByCategory[cat]?.map((project) => (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                              >
                                <div className="h-24 sm:h-28 md:h-32 rounded-lg overflow-hidden mb-4">
                                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h4 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2">{project.title}</h4>
                                <p className="text-gray-400 text-xs md:text-sm mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-blue-400 text-xs md:text-sm">⭐ {project.rating}</span>
                                  <a href={project.liveUrl} target="_blank" className="text-blue-400 hover:text-blue-300 transition-colors">
                                    <FaExternalLinkAlt size={12} />
                                  </a>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
