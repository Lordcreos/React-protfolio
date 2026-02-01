'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [resumeUrl, setResumeUrl] = useState('/Leonardo_Sanchez_cv.pdf');

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

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      })
      .catch(err => console.error('Error loading resume URL:', err));
  }, []);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
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
              I build scalable web applications using the latest technologies. Specialized in React, Node.js, TypeScript, and MongoDB.
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
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm text-gray-200 font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </Link>
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
    </div>
  );
}
