// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
//  Sources: resume.pdf (primary) + your previous components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Vikas Kumar Jain",
  role: "Android & iOS Engineer",
  title: "Software Developer — Android and iOS Engineer",
  location: "Jaipur, Rajasthan, India",
  email: "jainvikas317420@gmail.com",
  phone: "+91 9649543747",
  phoneHref: "tel:+919649543747",
  github: "https://github.com/vikas8385",
  linkedin: "https://linkedin.com/in/vikas-kumar-jain-571a48230",
  portfolio: "https://vikas-portfolio-virid.vercel.app/",
  resume: "/resume.pdf",
  company: "Hawkscode Pvt. Ltd.",
  summary:
    "Cross-platform mobile application developer with 2+ years of hands-on experience building and shipping production Android (Kotlin, Java) and iOS (SwiftUI, UIKit) applications. Proficient in the Android SDK, iOS SDK, MVVM and Clean Architecture, Jetpack components (Compose, LiveData, ViewModel, Room, Navigation, WorkManager), and dependency injection using Hilt and Dagger.",
  summary2:
    "Skilled in REST API integration with Retrofit and OkHttp, real-time features via Agora SDK, Firebase, and payment gateways (Razorpay, Stripe). Delivered 15+ apps live on Google Play Store and Apple App Store across social, e-learning, luxury transport, and enterprise domains. Additionally proficient in Java, Spring Boot, and AWS cloud services.",
  emailjs: {
    service: "service_9zp6ccm",
    template: "template_2thuyfu",
    publicKey: "QlHFTGy_Tib8FDhE8",
  },
}

export const stats = [
  { value: "2+", label: "Years shipping mobile apps" },
  { value: "15+", label: "Apps live on Play Store & App Store" },
  { value: "50,000+", label: "Registered users on EasyShiksha" },
  { value: "100+", label: "Concurrent users in Agora voice rooms" },
]

/* ───────────── Featured case studies (from resume) ───────────── */
export interface CaseStudy {
  id: string
  name: string
  tagline: string
  period: string
  stack: string[]
  bullets: string[]
  icon: string
  links: { label: string; href: string; platform: "android" | "ios" }[]
  platforms: ("android" | "ios")[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "funzo",
    name: "Funzo",
    tagline: "Social & Gaming Hub",
    period: "Nov 2025 – Jan 2026",
    platforms: ["android"],
    stack: ["Kotlin", "Java", "MVVM", "Agora SDK", "Firebase", "Jetpack Compose", "Hilt", "LiveData"],
    icon: "https://play-lh.googleusercontent.com/fXHbDXktSprcSmu5RqAgiMFBswipCBgtXK_Zzvy_dW5GDfSMxRfi4cVjHAANUXbFjrbyP3kcF0gSaBWVB28Dlg=w240-h480-rw",
    bullets: [
      "Developed a real-time social gaming platform with Agora-powered live voice rooms supporting 100+ concurrent multi-user sessions; achieved a 4.2-star rating on Google Play at launch.",
      "Implemented interactive mini-games (Ludo), Clan/Family social systems, and a gamified SVIP progression hierarchy to drive engagement and retention.",
      "Applied MVVM with LiveData and the Repository pattern, and used Hilt for dependency injection — reducing coupling and improving unit testability.",
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ereotect.funzo", platform: "android" },
    ],
  },
  {
    id: "easyshiksha",
    name: "EasyShiksha",
    tagline: "E-Learning & Internship Platform",
    period: "Feb 2025 – Present",
    platforms: ["android", "ios"],
    stack: ["Android (Java, XML)", "iOS (SwiftUI)", "REST API", "Razorpay", "Room DB", "Retrofit"],
    icon: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
    bullets: [
      "Developed cross-platform Android and iOS apps for a leading ed-tech platform serving 50,000+ registered users across 1,000+ internship and certification programs.",
      "Integrated the Razorpay payment gateway, user certification modules, and internship tracking; maintained a 99%+ crash-free session rate on both platforms.",
      "Implemented offline caching with Room DB and optimized API calls with Retrofit, reducing load time by 40%.",
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=hawkscode.easyshiksha", platform: "android" },
      { label: "App Store", href: "https://apps.apple.com/in/app/certified-courses-internship/id1190486206", platform: "ios" },
    ],
  },
  {
    id: "thrive",
    name: "Thrive Black Car",
    tagline: "Luxury Transport",
    period: "Aug 2025 – Present",
    platforms: ["android", "ios"],
    stack: ["Android (Kotlin, XML)", "iOS (SwiftUI)", "Google Maps SDK"],
    icon: "/thrive-black-car-interface.jpeg",
    bullets: [
      "Built a dual-role (customer and driver) chauffeur booking application for the Atlanta market, delivering real-time ride scheduling and driver dispatch across Android and iOS.",
      "Implemented Google Maps SDK integration for live tracking, ETA calculation, and route optimization — reducing the average booking flow to under 3 taps.",
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=app.thriveblackcar.com", platform: "android" },
      { label: "App Store", href: "https://apps.apple.com/in/app/thrive-black-car/id6636471521", platform: "ios" },
    ],
  },
  {
    id: "careerhelper",
    name: "Career Helper",
    tagline: "Test & Consult",
    period: "Mar 2025 – Present",
    platforms: ["android", "ios"],
    stack: ["Android (Java, XML)", "iOS (SwiftUI)", "ML Recommendation Engine"],
    icon: "https://play-lh.googleusercontent.com/li6ces2aQ3_M2306opduL7k8PYv56IXdG4zlRy3nm56Kbt0UwM5p3VPaCFWy7JPJ6sKpJlDasRTljDh42U-M=w240-h480-rw",
    bullets: [
      "Built an assessment platform offering IQ, psychometric, and career-aptitude tests that help users identify strengths and optimal career paths based on skill profiles.",
      "Integrated a personalized ML recommendation engine matching users to career paths; achieved an 80%+ test completion rate and strong user satisfaction scores.",
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=app.careerhelper", platform: "android" },
      { label: "App Store", href: "https://apps.apple.com/in/app/career-helper-test-consult/id1637396736", platform: "ios" },
    ],
  },
]

/* ───────────── All apps (from your previous projects list + resume) ───────────── */
export interface App {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  platform: "android" | "ios"
  url: string
}

export const apps: App[] = [
  {
    id: 1,
    title: "EasyShiksha: Certified Courses & Internship",
    description:
      "EasyShiksha, a leading free online courses platform. Skill up to success with a simple way of learning that provides platforms for competitive exams, online courses, and mock test series. Explore video courses related to dream jobs like Python, Blockchain, NFT Crypto, SEO, Digital Marketing, Coding, Development, Personal Development and much more.",
    image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "REST API", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=hawkscode.easyshiksha&pcampaignid=web_share",
  },
  {
    id: 2,
    title: "Funzo: The Ultimate Global Social Hub",
    description:
      "A vibrant interactive social platform featuring HD live voice parties powered by Agora technology, gamified Clan systems, and a prestigious SVIP lifestyle progression system.",
    image: "https://play-lh.googleusercontent.com/fXHbDXktSprcSmu5RqAgiMFBswipCBgtXK_Zzvy_dW5GDfSMxRfi4cVjHAANUXbFjrbyP3kcF0gSaBWVB28Dlg=w240-h480-rw",
    technologies: ["Android", "Java", "Agora SDK", "Real-time Audio", "Firebase", "Gamification"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=com.ereotect.funzo&hl=en_IN",
  },
  {
    id: 3,
    title: "EasyShiksha: Certified Courses & Internship",
    description:
      "EasyShiksha, a leading free online courses platform. Skill up to success with a simple way of learning that provides platforms for competitive exams, online courses, and mock test series. Explore video courses related to dream jobs like Python, Blockchain, NFT Crypto, SEO, Digital Marketing, Coding, Development, Personal Development and much more.",
    image: "https://play-lh.googleusercontent.com/4X6O26cnR_eSJ80ylab40gMYmSCM88UHwg3EP-YhXCvVl0TzgT5ZsLSeFmmE6JZIoyc=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "REST API", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/certified-courses-internship/id1190486206",
  },
  {
    id: 4,
    title: "SocialEngine Mobile App",
    description:
      "Android app by SocialNetworking.Solutions for all websites developed using SocialEngine. Features Stories, Live Streaming, a status box to share with friends and networks, Check-ins, Scheduled Posts, Sell Something, Feelings & Activities, photos and videos, emoji and stickers, messaging, following, notifications, and an advanced minimizable music player that plays across the app. It gives users an easy way to access a community on mobile and helps drive engagement and retention.",
    image: "https://play-lh.googleusercontent.com/wq2n5r8TKN3KtLxo1c43oMzq_qXVtUKlTbpLqOHFLt7Jvq1Be9SzAlY3_1pQN5kwDh8=w240-h480-rw",
    technologies: ["Android", "Java", "SocialEngine API", "Firebase", "Live Streaming", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=com.sesolutions&pcampaignid=web_share",
  },
  {
    id: 5,
    title: "Career Helper: Test & Consult",
    description:
      "Plan your career with the help of Career Helper tools and certified career experts. It suggests occupations that correspond to your interests, values, aspirations, and personality, with an IQ Test, Basic Test, Advance Test and Psychometric Test. Know your talents, strengths and weaknesses, and get career guidance from experts.",
    image: "https://play-lh.googleusercontent.com/li6ces2aQ3_M2306opduL7k8PYv56IXdG4zlRy3nm56Kbt0UwM5p3VPaCFWy7JPJ6sKpJlDasRTljDh42U-M=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "Career Assessment API", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.careerhelper&pcampaignid=web_share",
  },
  {
    id: 6,
    title: "Career Helper: Test & Consult",
    description:
      "Plan your career with the help of Career Helper tools and certified career experts. It suggests occupations that correspond to your interests, values, aspirations, and personality, with an IQ Test, Basic Test, Advance Test and Psychometric Test. Know your talents, strengths and weaknesses, and get career guidance from experts.",
    image: "https://play-lh.googleusercontent.com/li6ces2aQ3_M2306opduL7k8PYv56IXdG4zlRy3nm56Kbt0UwM5p3VPaCFWy7JPJ6sKpJlDasRTljDh42U-M=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "Career Assessment API", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/career-helper-test-consult/id1637396736",
  },
  {
    id: 7,
    title: "Kids: Stories, Poems and Games",
    description:
      "EasyShiksha Kids helps your kid learn online with Educational Games, Videos, Stories, Worksheets, Questions and Poems. Education exposes children to new ideas, builds personality, and helps them make a path to a career.",
    image: "https://play-lh.googleusercontent.com/tJSw48SvbgQ91tKQ1LbeWhr0uP_-iRVqi8M8RBaRCwM6n-F71qrfe_7FF9pi1pasB0Y=w240-h480-rw",
    technologies: ["Android", "Java", "Firebase", "Educational Content API", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.kidslearning&pcampaignid=web_share",
  },
  {
    id: 8,
    title: "Kids: Stories, Poems and Games",
    description:
      "EasyShiksha Kids helps your kid learn online with Educational Games, Videos, Stories, Worksheets, Questions and Poems. Education exposes children to new ideas, builds personality, and helps them make a path to a career.",
    image: "https://play-lh.googleusercontent.com/tJSw48SvbgQ91tKQ1LbeWhr0uP_-iRVqi8M8RBaRCwM6n-F71qrfe_7FF9pi1pasB0Y=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Firebase", "Educational Content API", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/kids-learning-by-easyshiksha/id1632711805",
  },
  {
    id: 9,
    title: "My Guru: AI Book Creator",
    description:
      "Combines the power of artificial intelligence with the convenience of a mobile app to create professionally formatted eBooks in a few taps. Its AI-powered book creation tool analyzes your notes and organizes them into chapters and sections with headings and subheadings, saving hours of manual formatting.",
    image: "https://play-lh.googleusercontent.com/a2fBoGWtHjhqny6YGhT8X4bQIlYfJkCqRcON6vh7-90H3DRb5xDp6-_dVKX5GP8npw=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "Natural Language Processing", "Firebase", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=com.myguru.aibookcreator&pcampaignid=web_share",
  },
  {
    id: 10,
    title: "HealthHub: Track and Improve",
    description:
      "An all-in-one health companion: real-time step counting via a foreground service, a personalized sleep schedule, water-intake tracking with reminders, calorie-burn calculation from step data, and daily, weekly, monthly and yearly achievements.",
    image: "https://play-lh.googleusercontent.com/kGWDMVa4-dJxMD_4mSHU9HOx_lQbpUhyiw052gTguo9VhH13IKc2oYhU1h6S_o10Eqk=w240-h480-rw",
    technologies: ["Android", "Java", "Health Sensors API", "Foreground Service", "Firebase", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.healthhub.pro&pcampaignid=web_share",
  },
  {
    id: 11,
    title: "HealthHub: Track and Improve",
    description:
      "An all-in-one health companion: real-time step counting, a personalized sleep schedule, water-intake tracking with reminders, calorie-burn calculation from step data, and daily, weekly, monthly and yearly achievements.",
    image: "https://play-lh.googleusercontent.com/kGWDMVa4-dJxMD_4mSHU9HOx_lQbpUhyiw052gTguo9VhH13IKc2oYhU1h6S_o10Eqk=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "HealthKit", "Core Motion", "Firebase"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/healthhub-track-and-improve/id6499438152",
  },
  {
    id: 12,
    title: "PulseTalk: Audio & Video Calls",
    description:
      "Your personal AI companion for engaging conversations in audio and video formats. Fluid, natural conversations with advanced AI, intelligent interaction on topics from daily chitchat to deep debates, and responses personalized to your preferences, interests and conversation history.",
    image: "https://play-lh.googleusercontent.com/5rwNx_bjUG7s41cXV_LLAl-CSfGSzXbRl7dnaqBc912IvKXVcR0AksuUeeMQBqg4-u4=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "WebRTC", "Speech Recognition", "Firebase"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=com.pulsetalk&pcampaignid=web_share",
  },
  {
    id: 13,
    title: "SocialEase: AI Caption & Banner",
    description:
      "An AI-powered caption and banner generator for social media posts. Built for influencers, business owners and personal brands — no more writer's block or hours spent finding the perfect caption or banner image.",
    image: "https://play-lh.googleusercontent.com/4GtvXs1PqIBTCsk6bE1COGq1vl9Y0H8WcBUeOQJxIOme6fw9EdxmEbmCNLnAtUglt4_w=w240-h480-rw",
    technologies: ["Android", "Java", "AI/ML", "Image Processing", "Natural Language Processing", "Firebase"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.socialease.aicaptionandbannergenerator&pcampaignid=web_share",
  },
  {
    id: 14,
    title: "SocialEase: AI Caption & Banner",
    description:
      "An AI-powered caption and banner generator for social media posts. Built for influencers, business owners and personal brands — no more writer's block or hours spent finding the perfect caption or banner image.",
    image: "https://play-lh.googleusercontent.com/4GtvXs1PqIBTCsk6bE1COGq1vl9Y0H8WcBUeOQJxIOme6fw9EdxmEbmCNLnAtUglt4_w=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "AI/ML", "Image Processing", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/socialease-ai-caption-banner/id6450537287",
  },
  {
    id: 15,
    title: "My Guru: GPT4 AI ChatBot",
    description:
      "A personal assistant and AI chatbot. Type or speak your request and get a quick, accurate response from advanced AI — a go-to source for information on a wide range of topics, from general knowledge to the latest news and trends.",
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=w240-h480-rw",
    technologies: ["Android", "Java", "GPT-4 API", "Voice Recognition", "Natural Language Processing", "Firebase"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=com.myguru.aichatbot&pcampaignid=web_share",
  },
  {
    id: 16,
    title: "My Guru: GPT4 AI ChatBot",
    description:
      "A personal assistant and AI chatbot. Type or speak your request and get a quick, accurate response from advanced AI — a go-to source for information on a wide range of topics, from general knowledge to the latest news and trends.",
    image: "https://play-lh.googleusercontent.com/qpECH5G1RFUyRIK5xj7HGZZEWnmB3RJQQBvkScF46ujkqlISRTkwp7PXcxZ53s3RAw0=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "GPT-4 API", "Speech Recognition", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/my-guru-ai-chat-bot/id6445960075",
  },
  {
    id: 17,
    title: "Parenting Health Tools With EasyShiksha",
    description:
      "An authentic, interactive learning experience with a large set of health tools for parents — BMI Calculator, Ovulation Calculator, Kids Weight Calculator, Find Lucky Baby Name, Baby Name Ideas, Parenting Quiz, and more.",
    image: "https://play-lh.googleusercontent.com/6hY_bIf9WjS4d-y0P6BEvml1ouTHKZx43x26xqUqSWpUm48UrCxkb9T_cDdN2kgctg=w240-h480-rw",
    technologies: ["Android", "Java", "Health Calculators", "Educational Content", "Firebase", "Material Design"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.parenting&pcampaignid=web_share",
  },
  {
    id: 18,
    title: "Parenting Health Tools With EasyShiksha",
    description:
      "An authentic, interactive learning experience with a large set of health tools for parents — BMI Calculator, Ovulation Calculator, Kids Weight Calculator, Find Lucky Baby Name, Baby Name Ideas, Parenting Quiz, and more.",
    image: "https://play-lh.googleusercontent.com/6hY_bIf9WjS4d-y0P6BEvml1ouTHKZx43x26xqUqSWpUm48UrCxkb9T_cDdN2kgctg=w240-h480-rw",
    technologies: ["iOS", "Swift", "SwiftUI", "Health Calculators", "Educational Content", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/parenting-by-easyshiksha/id1633963431",
  },
  {
    id: 19,
    title: "Government Job Alerts – EasyShiksha",
    description:
      "A powerful, easy-to-use app that keeps aspirants updated with the latest government job openings across India. Daily job notifications, personalized alerts, and integrated study resources for Banking, Railways, SSC, Defence, Teaching and State Government jobs.",
    image: "/govt.png",
    technologies: ["iOS", "Swift", "SwiftUI", "Job Aggregation API", "Push Notifications", "Core Data"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/govt-job-alerts-easyshiksha/id6751952231",
  },
  {
    id: 20,
    title: "ArogyaSense Care+",
    description:
      "Your all-in-one personal health companion designed to simplify medical management and amplify wellness. Track daily habits or archive critical medical documents with a secure, intuitive, data-driven approach to well-being.",
    image: "/arogyasense.png",
    technologies: ["iOS", "Swift", "SwiftUI", "HealthKit", "Core Data", "Secure Encryption"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/arogyasense-care/id6758613846",
  },
  {
    id: 21,
    title: "Thrive Black Car",
    description:
      "Luxury chauffeur booking for the Atlanta market with separate customer and driver roles, real-time ride scheduling, driver dispatch, live tracking and ETA.",
    image: "/thrive-black-car-interface.jpeg",
    technologies: ["Android", "Kotlin", "XML", "Google Maps SDK"],
    platform: "android",
    url: "https://play.google.com/store/apps/details?id=app.thriveblackcar.com",
  },
  {
    id: 22,
    title: "Thrive Black Car",
    description:
      "Luxury chauffeur booking for the Atlanta market with separate customer and driver roles, real-time ride scheduling, driver dispatch, live tracking and ETA.",
    image: "/thrive-black-car-interface.jpeg",
    technologies: ["iOS", "SwiftUI", "Google Maps SDK"],
    platform: "ios",
    url: "https://apps.apple.com/in/app/thrive-black-car/id6636471521",
  },
]

/* ───────────── Experience ───────────── */
export interface Job {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
  tech: string[]
}

export const experience: Job[] = [
  {
    role: "Software Developer",
    company: "Hawkscode Pvt. Ltd.",
    location: "Jaipur, Rajasthan",
    period: "Jan 2025 – Present",
    current: true,
    bullets: [
      "Engineered and shipped 12+ production Android (Kotlin/Java) and iOS (SwiftUI) applications across social, e-learning, and luxury transport domains, live on Google Play Store and Apple App Store.",
      "Integrated Agora SDK for real-time voice room features supporting 100+ concurrent users; implemented secure payment gateways (Razorpay, Stripe) across 3 client projects.",
      "Built role-based authentication systems and RESTful API integrations using Retrofit and OkHttp, following MVVM, Clean Architecture, and dependency injection with Hilt.",
      "Configured mobile CI/CD pipelines using GitHub Actions and Fastlane, automating build, test, and deployment workflows and reducing release cycle time.",
      "Wrote unit and instrumentation tests using JUnit and Espresso, maintaining high code coverage and reducing production bug rate.",
      "Collaborated in Agile/Scrum sprints with cross-functional teams of 5–8 members, delivering features on schedule across multiple parallel client projects.",
    ],
    tech: ["Kotlin", "Java", "SwiftUI", "Storyboard", "MVVM", "Clean Architecture", "Hilt", "Retrofit", "Agora", "Razorpay", "Stripe", "GitHub Actions", "Fastlane"],
  },
  {
    role: "Android Developer Intern",
    company: "Ahead Websoft Technology",
    location: "Gurgaon, Haryana",
    period: "Feb 2024 – May 2024",
    bullets: [
      "Built and enhanced Android features using Java and Kotlin on 2 live production projects, covering the full Android SDK development lifecycle from design to Play Store deployment.",
      "Participated in code reviews and sprint planning with a senior developer team, improving code quality and reducing bug backlog by 20%.",
    ],
    tech: ["Java", "Kotlin", "Android Studio", "Gradle", "Material Design", "Git", "REST APIs"],
  },
  {
    role: "Associate Software Developer Intern",
    company: "Brudite Pvt. Ltd.",
    location: "Jaipur, Rajasthan",
    period: "Aug 2023 – Jan 2024",
    bullets: [
      "Developed RESTful backend services using Java and Spring Boot microservices, and built dynamic frontend interfaces with Angular and TypeScript for end-to-end application delivery.",
      "Deployed and managed cloud infrastructure on AWS (EC2, S3, RDS), improving application uptime and scalability for a B2B SaaS platform.",
    ],
    tech: ["Java", "Spring Boot", "Angular", "TypeScript", "AWS", "PostgreSQL", "REST APIs", "Docker"],
  },
  {
    role: "Data Engineer Intern",
    company: "Celebal Technologies",
    location: "Jaipur, Rajasthan",
    period: "May 2023 – Aug 2023",
    bullets: [
      "Processed and transformed large-scale datasets using SQL and PySpark, completing all analytical tasks within sprint deadlines across 3 data pipeline projects.",
      "Built and monitored AWS data pipelines, improving data workflow efficiency and reducing manual processing time by approximately 30%.",
    ],
    tech: ["SQL", "PySpark", "Python", "AWS", "ETL", "Data Warehousing"],
  },
  {
    role: "Java Development Intern",
    company: "Code Planet",
    location: "Remote",
    period: "May 2022 – Jul 2022",
    bullets: [
      "Foundation-building internship focused on core and advanced Java: object-oriented principles, collections, multithreading, and exception handling.",
      "Built practical applications using Java frameworks and libraries, and learned the software development lifecycle and best practices.",
    ],
    tech: ["Java", "Advanced Java", "OOP", "Collections", "Multithreading", "JDBC", "Servlets", "JSP"],
  },
]

/* ───────────── Skills ───────────── */
export const skillGroups: { title: string; accent: "android" | "ios" | "neutral"; items: string[] }[] = [
  {
    title: "Android",
    accent: "android",
    items: ["Kotlin", "Java", "Jetpack Compose", "XML", "Android SDK", "Coroutines", "RxJava", "Glide", "Google Maps SDK"],
  },
  {
    title: "iOS",
    accent: "ios",
    items: ["Swift", "SwiftUI", "UIKit", "Storyboard", "iOS SDK", "Core Data", "HealthKit", "Core Motion"],
  },
  {
    title: "Jetpack Components",
    accent: "android",
    items: ["LiveData", "ViewModel", "Room DB", "Jetpack Navigation", "WorkManager", "Paging 3"],
  },
  {
    title: "Architecture & Patterns",
    accent: "neutral",
    items: ["MVVM", "MVC", "Clean Architecture", "Repository Pattern", "Dependency Injection", "Hilt", "Dagger"],
  },
  {
    title: "Libraries & SDKs",
    accent: "neutral",
    items: ["Agora SDK", "Retrofit", "OkHttp", "Firebase", "Razorpay", "Stripe"],
  },
  {
    title: "Testing",
    accent: "neutral",
    items: ["JUnit", "Espresso", "Mockito", "UI Automator", "Unit Testing", "Instrumentation Testing"],
  },
  {
    title: "Backend",
    accent: "neutral",
    items: ["Java", "Spring Boot", "Microservices", "REST API", "SQL", "PostgreSQL"],
  },
  {
    title: "Cloud & DevOps",
    accent: "neutral",
    items: ["AWS (EC2, S3, RDS)", "Microsoft Azure", "GitHub Actions", "Fastlane", "Docker", "Git", "GitHub"],
  },
  {
    title: "Tools",
    accent: "neutral",
    items: ["Android Studio", "Xcode", "IntelliJ IDEA", "Postman", "VS Code", "JIRA"],
  },
  {
    title: "Also worked with",
    accent: "neutral",
    items: ["Angular", "TypeScript", "Python", "PySpark", "ETL", "Data Warehousing"],
  },
]
// Cross-platform / extra items that were on your old Skills card but are NOT in your resume.
// Add them to a group above only if you can back them up in an interview:
//   "React Native", "Flutter", "Dart", "Xamarin", "Ionic", "Cordova", "PhoneGap", "Node.js", "GraphQL", "Redux", "Bloc", "MVP"

/* ───────────── Education & achievements ───────────── */
export const education = {
  school: "Poornima Institute of Engineering and Technology",
  degree: "Bachelor of Technology in Computer Science",
  period: "Sep 2020 – May 2024",
  location: "Jaipur, Rajasthan, India",
  cgpa: "8.4 / 10",
  coursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "Software Engineering",
  ],
}

export const achievements = [
  {
    title: "15+ Applications Deployed on Play Store and App Store",
    org: "Portfolio",
    date: "2024 – Present",
    text: "Independently designed and developed 15+ production-grade mobile applications across e-commerce, productivity, social, and utility domains — with end-to-end ownership from requirement analysis and UI/UX through development, testing, deployment, and post-launch maintenance.",
    href: "#projects",
    cta: "See the apps",
  },
  {
    title: "Microsoft Azure Data Fundamentals (DP-900)",
    org: "Microsoft",
    date: "June 2022",
    text: "Official Microsoft certification validating foundational knowledge of cloud data concepts, Azure data services, and relational and non-relational data workloads.",
  },
  {
    title: "Flipkart GRiD 5.0 – Software Development Track",
    org: "Flipkart / Unstop",
    date: "2023",
    text: "Qualified Level 1.1 of Flipkart GRiD 5.0, a national-level engineering competition assessing applied software development, data structures, and e-commerce technology.",
    href: "https://unstop.com/certificate-preview/abf5445d-9a0d-427a-bee0-bcbf9ed92008",
    cta: "View certificate",
  },
]

/* ───────────── Articles (LinkedIn) ───────────── */
export interface Article {
  title: string
  description: string
  link: string
  category: "Java Development" | "Mobile Development" | "Web Development" | "Data Engineering"
}

const li = (slug: string) => `https://www.linkedin.com/pulse/${slug}/`

export const articles: Article[] = [
  { title: "Spring Boot: Simplifying Java Application Development", category: "Java Development", link: li("spring-boot-simplifying-java-application-development-vikas-kumar-jain-ezuvf"), description: "How Spring Boot simplifies Java application development with convention over configuration, and why it has become a go-to for backend services." },
  { title: "Demystifying SQL: The Language that Powers Databases", category: "Data Engineering", link: li("demystifying-sql-language-powers-databases-vikas-kumar-jain-tu1tf"), description: "SQL is the essential domain-specific language for managing, retrieving and altering data in relational databases — including views, triggers and stored procedures." },
  { title: "The Role of Chatbots in Revolutionizing Mental Health Support", category: "Web Development", link: li("role-chatbots-revolutionizing-mental-health-support-vikas-kumar-jain-hchuf"), description: "How chatbots at the junction of AI and mental health are becoming an inventive solution in an increasingly technology-reliant world." },
  { title: "Advancing Mobility: The Future of Transportation Infrastructure", category: "Web Development", link: li("advancing-mobility-future-transportation-vikas-kumar-jain-zz52f"), description: "How the way we get from one point to another is changing, with advanced transportation infrastructure at the center of the shift." },
  { title: "Unraveling Chat GPT: A Powerful Conversational AI", category: "Web Development", link: li("unraveling-chat-gpt-powerful-conversational-ai-vikas-kumar-jain-zpc2f"), description: "A look at OpenAI's ChatGPT and its capacity to hold meaningful, natural interactions with users." },
  { title: "Understanding Object-Oriented Programming (OOP) Concepts", category: "Java Development", link: li("understanding-object-oriented-programming-oop-concepts-jain-yzjge"), description: "The core idea of OOP — objects — and how it improves the maintainability, reusability and organization of code." },
  { title: "The Role of Traditional Coding", category: "Web Development", link: li("role-traditional-coding-vikas-kumar-jain-vq2tf"), description: "Why hand-coding continues to play a vital part in current web development even as low-code and no-code platforms gain popularity." },
  { title: "The Rise of No-Code and Low-Code Development in Web Development", category: "Web Development", link: li("rise-no-code-low-code-development-web-vikas-kumar-jain-mugtf"), description: "Defines low-code and no-code development, how they differ from traditional coding, and how visual interfaces and pre-built components simplify the process." },
  { title: "Super apps: The All-in-One Apps Running Everything in Your Pocket", category: "Mobile Development", link: li("super-apps-all-in-one-running-everything-your-pocket-vikas-kumar-jain-pwdrf"), description: "A future where one swipe pays, orders takeout, books a doctor and chats with friends — all in the same app." },
  { title: "MySQL: An Overview of a Popular Relational Database Management System", category: "Data Engineering", link: li("mysql-overview-popular-relational-database-management-jain-1hl8f"), description: "MySQL, created by Oracle Corporation, has been a pillar of web application development for more than 20 years." },
  { title: "Learning Angular: Creating Sophisticated Web Applications Easily", category: "Web Development", link: li("learning-angular-creating-sophisticated-web-easily-vikas-kumar-jain-sqfcf"), description: "Angular as a mainstay of contemporary web development — an extensive toolset for dynamic, feature-rich, adaptable apps." },
  { title: "The Role of Internet of Things (IoT) in Smart Cities", category: "Web Development", link: li("role-internet-things-iot-smart-cities-vikas-kumar-jain-4gckf"), description: "How IoT is helping city planners transform urban landscapes into more efficient, sustainable and habitable spaces." },
  { title: "Artificial Intelligence in Education: Revolutionizing Learning", category: "Web Development", link: li("artificial-intelligence-education-revolutionizing-learning-jain-cnyif"), description: "Tailored learning experiences, improved administrative procedures and better outcomes as AI enters education." },
  { title: "Cloud Computing: Advantages, Challenges, and Future Trends", category: "Data Engineering", link: li("cloud-computing-advantages-challenges-future-trends-vikas-kumar-jain-y9s4f"), description: "How cloud computing replaced conventional on-premises infrastructure — from simple storage to comprehensive cloud services." },
  { title: "The Ethics of Artificial Intelligence: Bias and Fairness", category: "Web Development", link: li("ethics-artificial-intelligence-bias-fairness-vikas-kumar-jain-xhmxf"), description: "Why bias and fairness matter as AI becomes commonplace, and what it takes to ensure equitable outcomes." },
  { title: "TypeScript: A Powerful Language for Modern Web Development", category: "Web Development", link: li("typescript-powerful-language-modern-web-development-vikas-kumar-jain-85p0f"), description: "TypeScript's type system, features and benefits for building scalable, stable and reliable web applications." },
  { title: "Exploring Fundamentals of C Programming", category: "Java Development", link: li("exploring-fundamentals-c-programming-vikas-kumar-jain-zst4f"), description: "The 'mother of all programming languages', created by Dennis Ritchie at Bell Labs, and why it is still widely used." },
  { title: "Demystifying Git: A Comprehensive Guide", category: "Web Development", link: li("demystifying-git-comprehensive-guide-vikas-kumar-jain-05xlf"), description: "A distributed version control system that streamlines teamwork and records code changes — a must-know for every developer." },
  { title: "A Deep Dive into 5G Technology and its Applications", category: "Mobile Development", link: li("deep-dive-5g-technology-its-applications-vikas-kumar-jain-7c31e"), description: "5G's blazing-fast speeds, extremely low latency and enormous networking capacity, and how they will change the way we live and work." },
  { title: "Introduce to Java Programming", category: "Java Development", link: li("introduce-java-programming-vikas-kumar-jain"), description: "A voyage through Java — a flexible, strong language known for portability, security and readability." },
]

/* ───────────── Your own chart data (optional) ─────────────
   Add real numbers here and a new X/Y-axis chart appears in the Insights section automatically.
   Each point is one tick on the X axis; `value` is the Y axis. The chart shows ▲ / ▼ vs the previous point.
   Only add figures you can stand behind (Play Console / App Store Connect exports, analytics, etc.).

   Example (uncomment and edit):
   {
     id: "funzo-rating",
     title: "Funzo — Play Store rating",
     hint: "by month",
     unit: "★",
     points: [
       { label: "Nov", value: 4.0 },
       { label: "Dec", value: 4.2 },
       { label: "Jan", value: 4.1 },
     ],
   },
*/
export interface MetricSeries {
  id: string
  title: string
  hint?: string
  unit: string
  /** true = stepped line (counts that jump); false/omitted = smooth line */
  step?: boolean
  points: { label: string; value: number }[]
}
export const metricSeries: MetricSeries[] = []
