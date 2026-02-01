'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/Leonardo_Sanchez_cv.pdf');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cargar el resumeUrl desde el perfil
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      })
      .catch(err => console.error('Error loading resume URL:', err));
  }, []);

  useEffect(() => {
    // Only disable scroll when mobile menu is open
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="text-3xl font-bold text-primary-400 cursor-pointer mr-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="gradient-text">Leonardo</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 md:mx-6">
              {navLinks.map(({ path, title }) => (
                <li key={title}>
                  <Link href={path}>
                    <motion.span
                      className={`relative text-lg font-medium transition-colors cursor-pointer ${
                        pathname === path
                          ? 'text-primary-400'
                          : 'text-gray-300 hover:text-primary-400'
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      {title}
                      {pathname === path && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                          layoutId="underline"
                        />
                      )}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact">
                <motion.button
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.button>
              </Link>
              <a href={resumeUrl} download>
                <motion.button
                  className="px-6 py-2.5 bg-transparent text-gray-200 font-semibold rounded-lg border border-primary-500/50 hover:bg-primary-500/10 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </motion.button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-full h-0.5 bg-gray-200 rounded-full"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-200 rounded-full"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-200 rounded-full"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full p-8 pt-28">
                {/* Mobile Navigation Links */}
                <ul className="flex flex-col gap-6">
                  {navLinks.map(({ path, title }, index) => (
                    <motion.li
                      key={title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={path} onClick={closeMenu}>
                        <span
                          className={`text-2xl font-semibold transition-colors block ${
                            pathname === path
                              ? 'text-primary-400'
                              : 'text-gray-300 hover:text-primary-400'
                          }`}
                        >
                          {title}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile CTA Buttons and Language Switcher */}
                <motion.div
                  className="flex flex-col gap-4 mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/contact" onClick={closeMenu}>
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30">
                      Contact
                    </button>
                  </Link>
                  <a href={resumeUrl} download>
                    <button className="w-full px-6 py-4 bg-transparent text-gray-200 font-semibold rounded-xl border border-primary-500/50 hover:bg-primary-500/10 transition-all">
                      Resume
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
