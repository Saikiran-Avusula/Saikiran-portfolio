import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';

const categories = ['All', 'Backend', 'Frontend', 'Full Stack', 'AI'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-base font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-600/50 scale-105'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border-2 border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group bento-card rounded-3xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl hover:from-indigo-600 hover:to-purple-600 text-white transition-all hover:scale-110 border border-white/20"
                    >
                      <Github size={24} />
                    </a>
                    {project.liveUrl && (
                      project.liveUrl === '#' ? (
                        <div className="relative group/tooltip">
                          <button
                            className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl cursor-not-allowed opacity-50 text-white border border-white/20"
                            aria-label="Live view coming soon"
                          >
                            <ExternalLink size={24} />
                          </button>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-black/90 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20">
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl hover:from-indigo-600 hover:to-purple-600 text-white transition-all hover:scale-110 border border-white/20"
                        >
                          <ExternalLink size={24} />
                        </a>
                      )
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs text-white font-black border-2 border-indigo-500/50 z-10 uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  
                  <div className="hidden md:block relative">
                    <p className="text-slate-300 text-xs mb-3 line-clamp-3 group-hover:line-clamp-none transition-all leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="md:hidden">
                    <p className={`text-slate-300 text-sm mb-2 ${expandedMobile === project.id ? '' : 'line-clamp-2'}`}>
                      {project.description}
                    </p>
                    <button
                      onClick={() => setExpandedMobile(expandedMobile === project.id ? null : project.id)}
                      className="flex items-center gap-1 text-indigo-400 text-xs font-bold mb-3"
                    >
                      {expandedMobile === project.id ? (
                        <><ChevronUp size={16} /> Show Less</>
                      ) : (
                        <><ChevronDown size={16} /> Read More</>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-xs text-white font-bold rounded-lg border border-white/20 hover:border-indigo-500/50 transition-all">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
