// Script para poblar la base de datos con datos iniciales
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...')

    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando datos existentes...')
    await prisma.project.deleteMany()
    await prisma.experience.deleteMany()
    await prisma.skill.deleteMany()
    await prisma.profile.deleteMany()

    // Crear perfil
    console.log('👤 Creando perfil...')
    await prisma.profile.create({
      data: {
        name: "Leonardo Sanchez",
        title: "Senior Full Stack Developer",
        subtitle: "MERN Stack | React | Node.js | TypeScript",
        bio: "Seasoned Full Stack Developer with 8+ years of experience architecting and delivering scalable web applications. Expert in React, Node.js, TypeScript, and MongoDB. Proven track record of leading development teams, implementing CI/CD pipelines, and optimizing application performance. Passionate about clean code, best practices, and mentoring junior developers.",
        email: "leonardosanchez4h@hotmail.com",
        phone: "+1 (555) 123-4567",
        location: "Remote | Open to Relocation",
        github: "https://github.com/Lordcreos",
        linkedin: "https://linkedin.com/in/leonardo-sanchez-dev",
        whatsapp: "https://api.whatsapp.com/send?phone=593992896292&text=Hola%20%2C%20He%20visto%20tu%20perfil%20y%20me%20gustaria%20....",
        resumeUrl: "/Leonardo_Sanchez_cv.pdf",
        profilePic: "/profile.jpg"
      }
    })

    // Crear skills
    console.log('🛠️ Creando skills...')
    const frontEndSkills = [
      "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux & Redux Toolkit",
      "React Query", "HTML5 & CSS3", "SASS/SCSS", "Tailwind CSS", "Material-UI",
      "Styled Components", "Framer Motion", "React Bootstrap", "Responsive Design",
      "Webpack & Vite", "REST API Integration", "GraphQL"
    ]
    
    const backEndSkills = [
      "Node.js", "Express.js", "NestJS", "TypeScript", "MongoDB",
      "PostgreSQL", "MySQL", "Prisma ORM", "Mongoose", "REST APIs",
      "GraphQL", "Socket.io", "JWT Authentication", "OAuth 2.0",
      "Microservices Architecture", "Redis", "RabbitMQ"
    ]
    
    const toolsSkills = [
      "Git & GitHub", "Docker", "Kubernetes", "AWS (EC2, S3, Lambda)",
      "Azure", "CI/CD (GitHub Actions, Jenkins)", "Jest & Testing Library",
      "Cypress", "Postman", "VS Code", "Figma", "Jira",
      "NPM & Yarn", "ESLint & Prettier", "Webpack"
    ]
    
    const otherSkills = [
      "Agile/Scrum Methodology", "Test-Driven Development (TDD)",
      "Clean Code & SOLID Principles", "Design Patterns", "Performance Optimization",
      "SEO Best Practices", "Accessibility (WCAG)", "Mobile-First Design",
      "Code Review & Mentoring", "Technical Documentation", "API Design",
      "Database Design", "System Architecture"
    ]

    for (let i = 0; i < frontEndSkills.length; i++) {
      await prisma.skill.create({
        data: {
          category: "frontEnd",
          name: frontEndSkills[i],
          order: i
        }
      })
    }

    for (let i = 0; i < backEndSkills.length; i++) {
      await prisma.skill.create({
        data: {
          category: "backEnd",
          name: backEndSkills[i],
          order: i
        }
      })
    }

    for (let i = 0; i < toolsSkills.length; i++) {
      await prisma.skill.create({
        data: {
          category: "tools",
          name: toolsSkills[i],
          order: i
        }
      })
    }

    for (let i = 0; i < otherSkills.length; i++) {
      await prisma.skill.create({
        data: {
          category: "other",
          name: otherSkills[i],
          order: i
        }
      })
    }

    // Crear experiencias
    console.log('💼 Creando experiencias laborales...')
    const experiences = [
      {
        company: "Pickatale (Part-Time)",
        designation: "Senior Full Stack Developer",
        experience: "Mar. 2023 - Present",
        list: [
          "Architected and implemented scalable microservices architecture using Node.js and MongoDB, serving 50,000+ active users",
          "Led frontend development team in building responsive React.js components with TypeScript, improving code quality by 40%",
          "Designed and deployed RESTful APIs with comprehensive documentation, reducing integration time for third-party developers by 60%",
          "Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time from 2 hours to 15 minutes",
          "Mentored 3 junior developers, conducting code reviews and pair programming sessions to maintain high code standards",
          "Optimized database queries and implemented Redis caching, improving application response time by 75%"
        ],
        order: 1
      },
      {
        company: "Kruger Corp (Contract)",
        designation: "Full Stack Developer",
        experience: "Jun. 2022 - May. 2023",
        list: [
          "Developed interactive data visualization dashboard using React.js, D3.js, and Tailwind CSS, processing real-time data for 100+ concurrent users",
          "Integrated multiple third-party APIs (Stripe, Twilio, SendGrid) for payment processing and communication features",
          "Built custom React component library with Storybook, increasing developer productivity by 35% and ensuring UI consistency",
          "Implemented comprehensive unit and integration testing using Jest and React Testing Library, achieving 85% code coverage",
          "Developed single-page application with React, Redux, and React Router, improving load time by 50% and user engagement by 30%",
          "Collaborated with UX designers to implement pixel-perfect responsive designs using CSS Grid and Flexbox"
        ],
        order: 2
      },
      {
        company: "Jalasoft",
        designation: "Full Stack Developer",
        experience: "Aug. 2021 - Jan. 2023",
        list: [
          "Spearheaded development of video interviewing platform feature used by 100+ enterprise clients, increasing client retention by 25%",
          "Built robust WebRTC-based video conferencing solution with Node.js and Socket.io, supporting 50+ simultaneous video calls",
          "Implemented OAuth 2.0 authentication and role-based access control (RBAC) for enterprise security requirements",
          "Debugged and resolved complex integration issues between React frontend, Express APIs, and third-party services",
          "Created comprehensive technical documentation including architecture diagrams, API specifications, and deployment guides",
          "Optimized application performance through code splitting, lazy loading, and image optimization, reducing bundle size by 40%"
        ],
        order: 3
      },
      {
        company: "STB Technology",
        designation: "Frontend Developer",
        experience: "Dec. 2019 - Nov. 2020",
        list: [
          "Led complete redesign of company homepage using React and Material-UI, resulting in 45% increase in user engagement",
          "Implemented responsive design patterns and mobile-first approach, supporting devices from 320px to 4K displays",
          "Established reusable component architecture and design system, reducing development time for new features by 30%",
          "Coordinated usability testing with 50+ participants, analyzing feedback to improve user experience metrics by 40%",
          "Managed project timelines and deliverables using Jira and Agile methodology, consistently meeting sprint goals",
          "Optimized frontend performance achieving 95+ Lighthouse scores across all categories"
        ],
        order: 4
      },
      {
        company: "ORESA IMAGINATION",
        designation: "Backend Developer",
        experience: "Apr. 2018 - Apr. 2019",
        list: [
          "Architected and developed RESTful APIs using Node.js and Express for e-commerce platform handling 10,000+ daily transactions",
          "Designed MongoDB database schemas and implemented efficient indexing strategies, reducing query time by 60%",
          "Built inventory management system with real-time stock updates using WebSocket connections",
          "Collaborated with frontend team to define API contracts and implement GraphQL endpoints for flexible data fetching",
          "Implemented automated testing suite with Mocha and Chai, achieving 80% backend code coverage",
          "Refactored legacy codebase to follow SOLID principles and design patterns, improving maintainability and reducing bugs by 50%"
        ],
        order: 5
      }
    ]

    for (const exp of experiences) {
      await prisma.experience.create({ data: exp })
    }

    // Crear proyectos destacados
    console.log('🚀 Creando proyectos destacados...')
    const projects = [
      {
        name: "Pickatale Platform",
        description: "Interactive book creation platform with 50,000+ active users. Built with React, TypeScript, Node.js, and MongoDB. Features include real-time collaboration, cloud storage integration, and advanced text editing capabilities.",
        url: "https://pickatale.com",
        github: null,
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "Docker", "AWS S3"],
        featured: true,
        mobile: "Responsive design with mobile-first approach",
        desktop: "Full-featured desktop experience with advanced editing tools"
      },
      {
        name: "Real-Time Analytics Dashboard",
        description: "Enterprise-grade analytics dashboard processing real-time data for 100+ concurrent users. Features interactive charts, customizable widgets, and export capabilities. Built for Kruger Corp with focus on performance and scalability.",
        url: "https://analytics-dashboard-demo.com",
        github: "https://github.com/leonardodev/analytics-dashboard",
        technologies: ["React", "D3.js", "Tailwind CSS", "Node.js", "WebSocket", "PostgreSQL"],
        featured: true,
        mobile: "Touch-optimized charts and responsive layout",
        desktop: "Multi-panel dashboard with drag-and-drop customization"
      },
      {
        name: "Video Interview Platform",
        description: "WebRTC-based video conferencing solution supporting 50+ simultaneous calls. Includes features like screen sharing, recording, virtual backgrounds, and AI-powered interview analysis. Deployed for 100+ enterprise clients.",
        url: "https://interview-platform.jalasoft.com",
        github: null,
        technologies: ["React", "WebRTC", "Socket.io", "Node.js", "Express", "MongoDB", "Redis"],
        featured: true,
        mobile: "Mobile browser support with adaptive streaming",
        desktop: "HD video quality with multi-participant layouts"
      },
      {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with inventory management, payment processing, and real-time order tracking. Handles 10,000+ daily transactions with 99.9% uptime. Includes admin panel for product and order management.",
        url: "https://ecommerce-demo.oresa.com",
        github: "https://github.com/leonardodev/ecommerce-platform",
        technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API", "SendGrid"],
        featured: true,
        mobile: "Progressive Web App with offline support",
        desktop: "Advanced filtering and comparison features"
      },
      {
        name: "Component Library",
        description: "Custom React component library with 50+ reusable components. Includes comprehensive documentation via Storybook, TypeScript support, and theming capabilities. Increased team productivity by 35% at Kruger Corp.",
        url: "https://ui-library.kruger.com",
        github: "https://github.com/leonardodev/react-ui-library",
        technologies: ["React", "TypeScript", "Storybook", "Styled Components", "Jest", "Testing Library"],
        featured: false,
        mobile: "Mobile-optimized components with touch gestures",
        desktop: "Desktop-first components with keyboard navigation"
      },
      {
        name: "Task Management App",
        description: "Collaborative task management application with real-time updates. Features include drag-and-drop boards, team collaboration, file attachments, and integrations with popular tools like Slack and Google Calendar.",
        url: "https://taskmanager-demo.com",
        github: "https://github.com/leonardodev/task-manager",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS", "NextAuth.js"],
        featured: false,
        mobile: "Native-like mobile experience with gestures",
        desktop: "Multi-column layout with keyboard shortcuts"
      }
    ]

    for (const project of projects) {
      await prisma.project.create({ data: project })
    }

    console.log('✅ Seed completado exitosamente!')
    console.log(`📊 Creadas ${experiences.length} experiencias`)
    console.log(`🛠️ Creadas ${frontEndSkills.length + backEndSkills.length + toolsSkills.length + otherSkills.length} skills`)
    console.log(`🚀 Creados ${projects.length} proyectos`)
    console.log('👤 Creado 1 perfil')

  } catch (error) {
    console.error('❌ Error durante el seed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
