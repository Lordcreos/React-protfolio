'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import SocialLinks from '@/components/SocialLinks';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-container pt-32">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Let's discuss your next project
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-200 mb-4">
                Let's Connect
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Have a project in mind or want to collaborate? I'm always open to discussing new opportunities, 
                creative ideas, or partnerships. Feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Cards */}
            <motion.div className="space-y-4" variants={itemVariants}>
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
                    <h3 className="text-lg font-semibold text-gray-200 mb-1">Email</h3>
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
                    <h3 className="text-lg font-semibold text-gray-200 mb-1">Location</h3>
                    <p className="text-gray-400">Remote | Open to Relocation</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-1">Response Time</h3>
                    <p className="text-gray-400">Usually within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Connect with me</h3>
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form 
              onSubmit={handleSubmit} 
              className="glass rounded-2xl p-8 md:p-10 space-y-6"
            >
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
                  disabled={status === 'loading'}
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
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message * (minimum 10 characters)
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  minLength={10}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                    text-white placeholder-gray-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  disabled={status === 'loading'}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full px-8 py-4 rounded-xl font-semibold text-white transition-all ${
                  status === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-600'
                    : status === 'error'
                    ? 'bg-red-600'
                    : 'bg-gradient-to-r from-primary-500 to-cyan-500 hover:shadow-xl hover:shadow-primary-500/50'
                }`}
                whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                disabled={status === 'loading'}
              >
                {status === 'loading' && (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                )}
                {status === 'success' && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Message Sent Successfully!
                  </span>
                )}
                {status === 'error' && 'Error Sending Message. Please try again.'}
                {status === 'idle' && 'Send Message'}
              </motion.button>

              {/* Status Messages */}
              {status === 'success' && (
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
              {status === 'error' && (
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
