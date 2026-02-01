'use client';

import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks';
import { useEffect, useState, useRef } from 'react';

// Types
interface Project {
  _id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  featured: boolean;
}

interface Experience {
  id: string;
  company: string;
  designation: string;
  experience: string;
  list: string[];
}

interface Skill {
  id: string;
  name: string;
}

interface GroupedSkills {
  frontEnd: Skill[];
  backEnd: Skill[];
  tools: Skill[];
  other: Skill[];
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [resumeUrl, setResumeUrl] = useState('/Leonardo_Sanchez_cv.pdf');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<GroupedSkills>({ frontEnd: [], backEnd: [], tools: [], other: [] });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, aboutRes, profileRes] = await Promise.all([
          fetch('/api/projects?featured=true'),
          fetch('/api/about'),
          fetch('/api/profile')
        ]);

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects((projectsData.projects || []).slice(0, 3));
        }

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setExperiences((aboutData.experiences || []).slice(0, 2));
          setSkills(aboutData.groupedSkills || { frontEnd: [], backEnd: [], tools: [], other: [] });
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.resumeUrl) {
            setResumeUrl(profileData.resumeUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100
      }
    }
  };

  const highlightVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className="relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background - Fixed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

      {/* SECTION 1: HOME/HERO */}
      <section ref={homeRef} className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                  </span>
                  <span className="text-primary-300 text-sm font-medium">Available for new opportunities</span>
                </motion.div>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-300">Hi, I'm </span>
                  <span className="relative inline-block">
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Leonardo
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                      variants={highlightVariants}
                    />
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-3xl lg:text-5xl font-bold text-gray-200"
                  variants={itemVariants}
                >
                  Senior Full Stack Developer
                </motion.h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl"
              >
                Crafting scalable web applications with{' '}
                <span className="text-primary-400 font-semibold">8+ years</span> of experience.
                Specialized in <span className="text-cyan-400 font-semibold">React</span>,{' '}
                <span className="text-cyan-400 font-semibold">Node.js</span>, and{' '}
                <span className="text-cyan-400 font-semibold">TypeScript</span>.
              </motion.p>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 py-6"
              >
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-primary-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    8+
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-1">Years Exp</div>
                </div>
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-cyan-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    50+
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-1">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-purple-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    100+
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-1">Clients</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  onClick={() => scrollToSection(contactRef)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection(projectsRef)}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm text-gray-200 font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
                <a href={resumeUrl} download>
                  <motion.button
                    className="px-8 py-4 bg-transparent text-gray-200 font-semibold rounded-xl border border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download CV
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <SocialLinks />
              </motion.div>
            </motion.div>

            {/* Right Section - Visual Element */}
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Code Window Mockup */}
              <motion.div
                className="relative w-full max-w-md"
                animate={floatingAnimation}
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                  {/* Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-white/10">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-400 text-sm">portfolio.tsx</div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm leading-relaxed space-y-1">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-gray-400">=</span> <span className="text-yellow-400">{'{'}</span></div>
                    <div className="pl-4"><span className="text-cyan-400">name:</span> <span className="text-green-400">'Leonardo Sanchez'</span><span className="text-gray-400">,</span></div>
                    <div className="pl-4"><span className="text-cyan-400">role:</span> <span className="text-green-400">'Senior Full Stack'</span><span className="text-gray-400">,</span></div>
                    <div className="pl-4"><span className="text-cyan-400">experience:</span> <span className="text-orange-400">8</span><span className="text-gray-400">,</span></div>
                    <div className="pl-4"><span className="text-cyan-400">skills:</span> <span className="text-yellow-400">{'['}</span></div>
                    <div className="pl-8"><span className="text-green-400">'React'</span><span className="text-gray-400">,</span> <span className="text-green-400">'Node.js'</span><span className="text-gray-400">,</span></div>
                    <div className="pl-8"><span className="text-green-400">'TypeScript'</span><span className="text-gray-400">,</span> <span className="text-green-400">'MongoDB'</span></div>
                    <div className="pl-4"><span className="text-yellow-400">{']'}</span><span className="text-gray-400">,</span></div>
                    <div className="pl-4"><span className="text-cyan-400">available:</span> <span className="text-orange-400">true</span></div>
                    <div><span className="text-yellow-400">{'}'}</span><span className="text-gray-400">;</span></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 bg-primary-500/20 rounded-lg backdrop-blur-sm border border-primary-500/30 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg className="w-10 h-10 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/20 rounded-full backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={() => scrollToSection(aboutRef)}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-primary-400 transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <span className="text-gray-400 text-sm block">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-primary-400 mx-auto mt-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.button>
      </section>

      {/* SECTION 2: ABOUT/SKILLS/EXPERIENCE */}
      <section ref={aboutRef} className="relative z-10 min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              <span className="gradient-text">About Me</span>
            </h2>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {Object.entries(skills).map(([category, skillList], index) => (
                skillList.length > 0 && (
                  <motion.div
                    key={category}
                    className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-cyan-500 rounded-full" />
                      {category === 'frontEnd' ? 'Frontend' : category === 'backEnd' ? 'Backend' : category === 'tools' ? 'Tools' : 'Other'} Development
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill: Skill) => (
                        <motion.span
                          key={skill.id}
                          className="px-4 py-2 bg-primary-500/10 text-primary-300 rounded-lg border border-primary-500/20 font-medium hover:bg-primary-500/20 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </div>

            {/* Experience Cards */}
            {experiences.length > 0 && (
              <div className="max-w-5xl mx-auto">
                <h3 className="text-4xl font-bold text-center mb-12">
                  <span className="gradient-text">Recent Experience</span>
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-200 mb-2">
                            {exp.designation}
                          </h4>
                          <p className="text-xl text-primary-400 font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 font-medium">
                            {exp.experience}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.list.slice(0, 3).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-400"
                          >
                            <svg
                              className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: PROJECTS */}
      <section ref={projectsRef} className="relative z-10 min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              A showcase of my recent work and side projects
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="group relative glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1 bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-200 mb-3 group-hover:text-primary-400 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-500/10 text-primary-300 text-sm rounded-full border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <motion.button
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Live Demo
                          </motion.button>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <motion.button
                            className="w-full px-4 py-2.5 bg-white/5 text-gray-200 font-semibold rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Source Code
                          </motion.button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section ref={contactRef} className="relative z-10 min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              Let's discuss your next project
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-200 mb-6">
                  Let's Connect
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Have a project in mind or want to collaborate? I'm always open to discussing new opportunities, 
                  creative ideas, or partnerships. Feel free to reach out!
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-500/10 rounded-lg">
                        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-1">Email</h4>
                        <a 
                          href="mailto:leonardo.sanchez.dev@gmail.com" 
                          className="text-gray-400 hover:text-primary-400 transition-colors"
                        >
                          leonardo.sanchez.dev@gmail.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-cyan-500/10 rounded-lg">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-1">Location</h4>
                        <p className="text-gray-400">Remote | Open to Relocation</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-4">
                  <SocialLinks />
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">Send me a message</h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      text-white placeholder-gray-500 transition-all"
                    placeholder="John Doe"
                    disabled={formStatus === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      text-white placeholder-gray-500 transition-all"
                    placeholder="john@example.com"
                    disabled={formStatus === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      text-white placeholder-gray-500 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    disabled={formStatus === 'loading'}
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`w-full px-8 py-4 rounded-xl font-semibold text-white transition-all ${
                    formStatus === 'loading'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : formStatus === 'success'
                      ? 'bg-green-600'
                      : formStatus === 'error'
                      ? 'bg-red-600'
                      : 'bg-gradient-to-r from-primary-500 to-cyan-500 hover:shadow-xl hover:shadow-primary-500/50'
                  }`}
                  whileHover={formStatus === 'idle' ? { scale: 1.02, y: -2 } : {}}
                  whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' && (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  )}
                  {formStatus === 'success' && (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Message Sent Successfully!
                    </span>
                  )}
                  {formStatus === 'error' && 'Error Sending Message. Please try again.'}
                  {formStatus === 'idle' && 'Send Message'}
                </motion.button>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <p className="text-green-400 text-center">
                      Thank you for reaching out! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-400 text-center">
                      Oops! Something went wrong. Please try again or email me directly.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
