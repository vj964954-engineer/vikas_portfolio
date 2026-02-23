# Vikas Kumar Jain - App Developer Portfolio

A modern, animated portfolio website built with Next.js 16, React 19, and Tailwind CSS featuring 3D animations, smooth motion effects, and a professional design.

## Features

- **3D Animated Hero Section** - Particle background with depth effects
- **Interactive Projects Showcase** - 5 featured projects with 3D parallax effects
- **Smooth Animations** - Framer Motion and custom CSS animations throughout
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Contact Form** - Fully functional contact form with validation
- **Modern Tech Stack** - Next.js 16, React 19, Tailwind CSS v4, TypeScript

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Components**: shadcn/ui
- **Animations**: Custom CSS animations
- **Form Handling**: React Hook Form + Zod validation

## Projects Included

1. **Employee Management System** - Java, Spring Boot, Angular
2. **BMI Calculator** - Java, Spring Boot, Angular
3. **Food Order App** - Java, Spring Boot, Angular
4. **Search Application** - Java, Spring Boot, Angular
5. **InterApp Messaging with SQS** - AWS, Java, Spring Boot

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Extract the ZIP file**
   \`\`\`bash
   unzip portfolio.zip
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The portfolio will load with all animations and features

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section with 3D background
│   ├── about.tsx           # About section with stats
│   ├── projects.tsx        # Projects showcase
│   ├── skills.tsx          # Skills section
│   ├── experience.tsx      # Experience timeline
│   ├── contact.tsx         # Contact form
│   ├── footer.tsx          # Footer section
│   └── ui/                 # shadcn/ui components
├── public/
│   └── [project images]    # Project showcase images
├── package.json            # Dependencies
└── README.md              # This file
\`\`\`

## Features Breakdown

### Hero Section
- Animated 3D particle background
- Gradient text animations
- Call-to-action buttons with hover effects
- Smooth scroll navigation

### Projects Section
- 5 featured projects with images
- 3D parallax hover effects
- Technology badges
- Links to project details
- Animated background elements

### Skills Section
- Organized by category (Backend, Frontend, Cloud)
- Interactive category cards
- Animated skill badges
- Hover effects with shine animations

### Experience Section
- Timeline-based layout
- Animated timeline dots
- Company and role information
- Technology stack for each role
- Smooth transitions

### Contact Section
- Functional contact form
- Form validation with Zod
- Email field with proper spacing
- Message textarea with animations
- Social media links
- Animated background elements

### Footer
- Multiple sections (Services, Quick Links, Contact)
- Social media links
- Copyright information
- Animated hover effects

## Customization

### Update Your Information

Edit the following files to customize the portfolio:

1. **Personal Info** - `app/layout.tsx` (title and description)
2. **Hero Section** - `components/hero.tsx`
3. **About Section** - `components/about.tsx`
4. **Projects** - `components/projects.tsx`
5. **Skills** - `components/skills.tsx`
6. **Experience** - `components/experience.tsx`
7. **Contact** - `components/contact.tsx`

### Change Colors

Edit `app/globals.css` to modify the color scheme:

\`\`\`css
@theme inline {
  --color-primary: #2563eb;      /* Blue */
  --color-accent: #06b6d4;       /* Cyan */
  --color-background: #0f172a;   /* Dark Blue */
  --color-text: #f1f5f9;         /* Light Text */
}
\`\`\`

### Add More Projects

Edit `components/projects.tsx` and add new project objects to the `projects` array.

## Performance

- Optimized animations with CSS transforms
- Lazy loading for images
- Efficient component rendering
- Minimal JavaScript bundle size
- Fast page load times

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port 3000 Already in Use

\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Dependencies Installation Issues

\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Animations Not Working

- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Ensure JavaScript is enabled
- Try a different browser

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### Deploy to Other Platforms

The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- Railway

## License

This portfolio is open source and available for personal use.

## Contact

For questions or feedback, please use the contact form on the portfolio website.

---

**Built with Next.js 16 and React 19**
