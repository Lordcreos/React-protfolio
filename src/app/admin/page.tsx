'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';

interface Project {
  id: string;
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
  order: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Profile {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  profilePic?: string;
  resumeUrl?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'contacts' | 'profile'>('projects');
  const { isLoaded, isSignedIn, user } = useUser();
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
  const isAdmin = adminEmails.includes(userEmail.trim().toLowerCase());

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 text-center text-gray-200">
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Verificando sesión...
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-md w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-block p-4 bg-primary-500/10 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-gray-400 mt-2">Ingresa para gestionar tu portafolio</p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SignedOut>
              <SignInButton>
                <button
                  type="button"
                  className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all bg-gradient-to-r from-primary-500 to-cyan-500 hover:shadow-xl hover:shadow-primary-500/50"
                >
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {!isAdmin ? (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                  Tu cuenta no tiene permisos para este panel. Inicia sesión con un correo autorizado.
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <UserButton afterSignOutUrl="/" />
                    <SignOutButton>
                      <button
                        type="button"
                        className="flex-1 rounded-lg border border-red-500/40 px-4 py-2 font-semibold text-red-200 hover:bg-red-500/20"
                      >
                        Cambiar de cuenta
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              ) : null}
            </SignedIn>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Acceso restringido por <span className="text-primary-300 font-medium">ADMIN_EMAILS</span>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-container pt-32 pb-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Panel de Administración</h1>
            <p className="text-gray-400 mt-2">Gestiona tu contenido del portafolio</p>
          </div>
          <SignOutButton>
            <motion.button
              className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg 
                hover:bg-red-500/20 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </span>
            </motion.button>
          </SignOutButton>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-8 p-1 bg-slate-800/50 rounded-xl w-fit"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { id: 'projects' as const, label: 'Proyectos', icon: '🚀' },
            { id: 'experiences' as const, label: 'Experiencias', icon: '💼' },
            { id: 'contacts' as const, label: 'Mensajes', icon: '📧' },
            { id: 'profile' as const, label: 'Perfil', icon: '👤' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'experiences' && <ExperiencesManager />}
            {activeTab === 'contacts' && <ContactsManager />}
            {activeTab === 'profile' && <ProfileManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    github: '',
    technologies: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        url: project.url || '',
        github: project.github || '',
        technologies: project.technologies.join(', '),
        featured: project.featured
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        url: '',
        github: '',
        technologies: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch('/api/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject ? { ...projectData, id: editingProject.id } : projectData)
      });

      if (res.ok) {
        await fetchProjects();
        handleCloseModal();
      } else {
        alert('Error al guardar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el proyecto');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
    
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await fetchProjects();
      } else {
        alert('Error al eliminar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-400 mt-4">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Gestionar Proyectos</h2>
        <motion.button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          + Nuevo Proyecto
        </motion.button>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No hay proyectos todavía</p>
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all"
              whileHover={{ x: 5 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-200">{project.name}</h3>
                    {project.featured && (
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleOpenModal(project)}
                    className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-6">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Proyecto *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      URL del Proyecto
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tecnologías (separadas por comas) *
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, TypeScript, Next.js"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 bg-slate-800/50 border border-white/10 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                    Marcar como proyecto destacado
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-slate-800/50 border border-white/10 text-gray-300 rounded-lg hover:bg-slate-800 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    {editingProject ? 'Guardar Cambios' : 'Crear Proyecto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExperiencesManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    designation: '',
    experience: '',
    list: '',
    order: 0
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/about');
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        company: exp.company,
        designation: exp.designation,
        experience: exp.experience,
        list: exp.list.join('\n'),
        order: exp.order
      });
    } else {
      setEditingExp(null);
      setFormData({
        company: '',
        designation: '',
        experience: '',
        list: '',
        order: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExp(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const expData = {
        ...formData,
        list: formData.list.split('\n').map(l => l.trim()).filter(Boolean)
      };

      const res = await fetch('/api/about', {
        method: editingExp ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp ? { ...expData, id: editingExp.id } : expData)
      });

      if (res.ok) {
        await fetchExperiences();
        handleCloseModal();
      } else {
        alert('Error al guardar la experiencia');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la experiencia');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return;
    
    try {
      const res = await fetch('/api/about', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await fetchExperiences();
      } else {
        alert('Error al eliminar la experiencia');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la experiencia');
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-400 mt-4">Cargando experiencias...</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Gestionar Experiencias</h2>
        <motion.button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          + Nueva Experiencia
        </motion.button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all"
            whileHover={{ x: 5 }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-200 mb-1">{exp.designation}</h3>
                <p className="text-primary-400 font-semibold mb-2">{exp.company}</p>
                <p className="text-cyan-400 text-sm mb-3">{exp.experience}</p>
                <ul className="space-y-2">
                  {exp.list.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {exp.list.length > 2 && (
                    <li className="text-gray-500 text-sm">
                      + {exp.list.length - 2} más...
                    </li>
                  )}
                </ul>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleOpenModal(exp)}
                  className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-6">
                {editingExp ? 'Editar Experiencia' : 'Nueva Experiencia'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cargo/Puesto *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Periodo *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Ej: 2020 - 2023"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Responsabilidades (una por línea) *
                  </label>
                  <textarea
                    value={formData.list}
                    onChange={(e) => setFormData({ ...formData, list: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                    rows={6}
                    placeholder="Desarrollé aplicaciones web&#10;Lideré equipo de desarrollo&#10;Implementé APIs REST"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-slate-800/50 border border-white/10 text-gray-300 rounded-lg hover:bg-slate-800 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    {editingExp ? 'Guardar Cambios' : 'Crear Experiencia'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setContacts(data.messages || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true })
      });

      if (res.ok) {
        await fetchContacts();
      } else {
        alert('Error al marcar como leído');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al marcar como leído');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;
    
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await fetchContacts();
      } else {
        alert('Error al eliminar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el mensaje');
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="inline-block w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-400 mt-4">Cargando mensajes...</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-200">Mensajes de Contacto</h2>
          <p className="text-gray-400 text-sm mt-1">
            {contacts.filter(c => !c.read).length} mensajes sin leer
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-gray-800/50 rounded-full mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400">No hay mensajes todavía</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <motion.div
              key={contact.id}
              className={`rounded-xl p-6 transition-all ${
                contact.read
                  ? 'bg-slate-800/20'
                  : 'bg-slate-800/50 border-l-4 border-primary-500'
              }`}
              whileHover={{ x: 5 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-200">{contact.name}</h3>
                    {!contact.read && (
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold">
                        NUEVO
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-400 text-sm mb-2">{contact.email}</p>
                  <p className="text-gray-400">{contact.message}</p>
                  <p className="text-gray-500 text-sm mt-3">
                    {new Date(contact.createdAt).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!contact.read && (
                    <motion.button
                      onClick={() => markAsRead(contact.id)}
                      className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Marcar como leído"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    whatsapp: '',
    profilePic: '',
    resumeUrl: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          bio: data.bio || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          whatsapp: data.whatsapp || '',
          profilePic: data.profilePic || '',
          resumeUrl: data.resumeUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profile.id, ...formData })
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        alert('✅ Perfil actualizado exitosamente');
      } else {
        alert('❌ Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (type === 'image' && !file.type.startsWith('image/')) {
      alert('❌ Por favor selecciona una imagen válida');
      return;
    }
    if (type === 'pdf' && file.type !== 'application/pdf') {
      alert('❌ Por favor selecciona un archivo PDF válido');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ El archivo es demasiado grande (máximo 5MB)');
      return;
    }

    try {
      // Mostrar indicador de carga
      setSaving(true);

      // Crear FormData para enviar el archivo
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('type', type);

      // Subir el archivo
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Error al subir el archivo');
      }

      const data = await res.json();
      const field = type === 'image' ? 'profilePic' : 'resumeUrl';
      
      // Actualizar el formulario con la URL del archivo subido
      const updatedFormData = {
        ...formData,
        [field]: data.url
      };
      
      setFormData(updatedFormData);

      // Guardar automáticamente en el perfil
      if (profile) {
        const saveRes = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: profile.id, ...updatedFormData })
        });

        if (saveRes.ok) {
          const updated = await saveRes.json();
          setProfile(updated);
          alert(`✅ ${type === 'image' ? 'Imagen' : 'PDF'} subido y guardado exitosamente: ${data.fileName}`);
        } else {
          alert(`⚠️ Archivo subido pero no se pudo guardar en el perfil. Presiona "Guardar Cambios" manualmente.`);
        }
      } else {
        alert(`✅ Archivo subido exitosamente: ${data.fileName}. Presiona "Guardar Cambios" para actualizar el perfil.`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`❌ Error al subir el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Editar Perfil</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto de Perfil */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>📸</span>
            Foto de Perfil
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Preview */}
            <div className="flex-shrink-0">
              {formData.profilePic ? (
                <div className="w-32 h-32 rounded-xl overflow-hidden ring-4 ring-primary-500/20">
                  <img 
                    src={formData.profilePic} 
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-xl bg-slate-700/50 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>

            {/* Upload */}
            <div className="flex-1 space-y-3">
              <label className="block">
                <span className="text-sm text-gray-400 mb-2 block">URL de la imagen</span>
                <input
                  type="text"
                  value={formData.profilePic}
                  onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  placeholder="/profile.jpg"
                />
              </label>

              <div className="text-sm text-gray-400">o</div>

              <label className="block">
                <span className={`px-4 py-2 rounded-lg border transition-all inline-block ${
                  saving 
                    ? 'bg-gray-500/10 text-gray-400 border-gray-500/30 cursor-not-allowed'
                    : 'bg-primary-500/10 text-primary-400 border-primary-500/30 hover:bg-primary-500/20 cursor-pointer'
                }`}>
                  {saving ? '⏳ Subiendo...' : '📁 Seleccionar Imagen'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'image')}
                  className="hidden"
                  disabled={saving}
                />
              </label>
              <p className="text-xs text-gray-500">Formatos: JPG, PNG, GIF. Máximo 5MB. Se subirá automáticamente.</p>
            </div>
          </div>
        </div>

        {/* PDF del Currículum */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>📄</span>
            Currículum (PDF) no funcional guardar en public
          </h3>
          
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-gray-400 mb-2 block">URL del PDF</span>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="/resume.pdf"
              />
            </label>

            {formData.resumeUrl && (
              <a 
                href={formData.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver PDF actual
              </a>
            )}

            <div className="text-sm text-gray-400">o</div>

            <label className="block">
              <span className={`px-4 py-2 rounded-lg border transition-all inline-block ${
                saving 
                  ? 'bg-gray-500/10 text-gray-400 border-gray-500/30 cursor-not-allowed'
                  : 'bg-primary-500/10 text-primary-400 border-primary-500/30 hover:bg-primary-500/20 cursor-pointer'
              }`}>
                {saving ? '⏳ Subiendo...' : '📁 Seleccionar PDF'}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'pdf')}
                className="hidden"
                disabled={saving}
              />
            </label>
            <p className="text-xs text-gray-500">Formato: PDF. Máximo 5MB. Se subirá automáticamente.</p>
          </div>
        </div>

        {/* Información Básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Nombre *</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Email *</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Título *</span>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Subtítulo *</span>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Teléfono</span>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Ubicación</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">GitHub</span>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">LinkedIn</span>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-gray-400 mb-2 block">WhatsApp URL</span>
            <input
              type="url"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </label>
        </div>

        {/* Bio */}
        <label className="block">
          <span className="text-sm text-gray-400 mb-2 block">Biografía *</span>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
            required
          />
        </label>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <motion.button
            type="submit"
            disabled={saving}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all ${
              saving
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-cyan-500 hover:shadow-xl hover:shadow-primary-500/50'
            }`}
            whileHover={saving ? {} : { scale: 1.02 }}
            whileTap={saving ? {} : { scale: 0.98 }}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Guardando...
              </span>
            ) : (
              '💾 Guardar Cambios'
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={fetchProfile}
            className="px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl font-semibold 
              hover:bg-slate-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔄 Recargar
          </motion.button>
        </div>
      </form>

      {/* Nota informativa */}
      <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
        <p className="text-sm text-primary-400 flex items-start gap-2">
          <span className="text-lg">ℹ️</span>
          <span>
            <strong>Guardado automático:</strong> Los archivos se suben y guardan automáticamente cuando los seleccionas. 
            El botón "Guardar Cambios" solo es necesario si editas manualmente los campos de texto.
          </span>
        </p>
      </div>

    </div>
  );
}
