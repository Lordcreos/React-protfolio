'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  designation: string;
  experience: string;
  list: string[];
  order: number;
}

interface Skill {
  id: string;
  category: string;
  name: string;
  order: number;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location?: string;
  profilePic?: string | null;
}

export default function AboutPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<GroupedSkills>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        console.log('Fetching about data...');
        const res = await fetch('/api/about');
        console.log('Response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched data:', data);
          console.log('Experiences:', data.experiences?.length);
          console.log('Skills categories:', Object.keys(data.groupedSkills || {}));
          console.log('Profile:', data.profile);
          setExperiences(data.experiences || []);
          setSkills(data.groupedSkills || {});
          setProfile(data.profile || null);
        } else {
          console.error('Response not OK:', res.status);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  const categoryTitles: {[key: string]: string} = {
    frontEnd: "Frontend Development",
    backEnd: "Backend Development",
    tools: "Tools & Technologies",
    other: "Other Skills"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.div
          className="section-container pt-12 pb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="gradient-text">About Me</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Passionate developer crafting exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Profile Section */}
        {profile && (
          <motion.div
            className="section-container py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-5xl mx-auto glass rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Profile Image/Icon */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {profile.profilePic ? (
                    <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-primary-500/20 shadow-xl shadow-primary-500/20">
                      <img 
                        src={profile.profilePic} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex items-center justify-center ring-4 ring-primary-500/20 shadow-xl shadow-primary-500/20 overflow-hidden relative">
                      {/* Background Code Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <text x="5" y="15" fill="currentColor" className="text-primary-400" fontSize="8" fontFamily="monospace">{'<code>'}</text>
                          <text x="5" y="30" fill="currentColor" className="text-cyan-400" fontSize="6" fontFamily="monospace">const dev =</text>
                          <text x="5" y="40" fill="currentColor" className="text-green-400" fontSize="6" fontFamily="monospace">{'{ name: "LS" }'}</text>
                          <text x="5" y="55" fill="currentColor" className="text-primary-400" fontSize="6" fontFamily="monospace">function() </text>
                          <text x="5" y="70" fill="currentColor" className="text-cyan-400" fontSize="6" fontFamily="monospace">{'console.log()'}</text>
                          <text x="5" y="85" fill="currentColor" className="text-primary-400" fontSize="8" fontFamily="monospace">{'</code>'}</text>
                        </svg>
                      </div>
                      
                      {/* Developer Avatar Icon */}
                      <svg className="w-32 h-32 text-primary-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ee958" />
                            <stop offset="100%" stopColor="#00bfd4" />
                          </linearGradient>
                        </defs>
                        {/* Head */}
                        <circle cx="12" cy="8" r="4" fill="url(#avatarGradient)" opacity="0.2" />
                        <circle cx="12" cy="8" r="4" strokeWidth="1.5" stroke="url(#avatarGradient)" />
                        {/* Glasses */}
                        <path d="M8 8h1.5M14.5 8H16M9.5 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM14.5 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" strokeWidth="1.5" stroke="url(#avatarGradient)" fill="none" />
                        <path d="M10.5 7h3" strokeWidth="1" stroke="url(#avatarGradient)" />
                        {/* Body */}
                        <path d="M12 12c-3.5 0-6 2-6 4.5V20h12v-3.5c0-2.5-2.5-4.5-6-4.5z" fill="url(#avatarGradient)" opacity="0.2" strokeWidth="1.5" stroke="url(#avatarGradient)" />
                        {/* Code brackets on shirt */}
                        <text x="9" y="18" fill="url(#avatarGradient)" fontSize="4" fontFamily="monospace" fontWeight="bold">{'{ }'}</text>
                      </svg>
                    </div>
                  )}
                </motion.div>

                {/* Profile Info */}
                <div className="md:col-span-2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <h2 className="text-4xl font-bold text-gray-200 mb-2">
                      {profile.name}
                    </h2>
                    <p className="text-2xl text-primary-400 font-semibold mb-2">
                      {profile.title}
                    </p>
                    <p className="text-lg text-cyan-400">
                      {profile.subtitle}
                    </p>
                  </motion.div>

                  <motion.p
                    className="text-lg text-gray-400 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {profile.bio}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  >
                    {profile.email && (
                      <div key="email" className="flex items-center gap-2 text-gray-300">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{profile.email}</span>
                      </div>
                    )}
                    {profile.location && (
                      <div key="location" className="flex items-center gap-2 text-gray-300">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills Section */}
        <motion.div
          className="section-container py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <span className="gradient-text">Technical Skills</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {Object.entries(skills).map(([category, skillList], catIndex) => (
              <motion.div
                key={category}
                className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + catIndex * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-cyan-500 rounded-full" />
                  {categoryTitles[category] || category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill, idx) => (
                    <motion.span
                      key={skill.id}
                      className="px-4 py-2 bg-primary-500/10 text-primary-300 rounded-lg border border-primary-500/20 font-medium hover:bg-primary-500/20 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + catIndex * 0.1 + idx * 0.02 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          className="section-container py-16 pb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <span className="gradient-text">Work Experience</span>
          </motion.h2>

          <div className="max-w-5xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-200 mb-2">
            {experience.designation}
          </h3>
          <p className="text-xl text-primary-400 font-semibold">
            {experience.company}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 font-medium">
            {experience.experience}
          </span>
        </div>
      </div>

      <ul className="space-y-3">
        {experience.list.map((item, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-3 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + idx * 0.05 }}
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
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
