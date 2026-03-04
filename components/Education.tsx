import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-black border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
             <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-black text-white">Academic</h3>
             </div>
             
             <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bento-card p-6 rounded-3xl"
                    >
                        <h4 className="text-xl font-black text-white mb-2">{edu.degree}</h4>
                        <div className="flex flex-col gap-2">
                            <span className="text-base font-bold text-slate-300">{edu.institution}</span>
                            <span className="text-sm font-bold text-indigo-400 bg-indigo-600/20 px-3 py-1 rounded-lg w-fit border border-indigo-500/30">{edu.period}</span>
                        </div>
                        {edu.description && (
                            <p className="text-slate-400 text-sm leading-relaxed mt-3">{edu.description}</p>
                        )}
                    </motion.div>
                ))}
             </div>
          </div>

          <div>
             <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Award className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-black text-white">Certifications</h3>
             </div>

             <div className="grid gap-4">
                {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center bento-card p-6 rounded-3xl group"
                    >
                        <div className="flex items-center flex-1">
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-2xl mr-4">
                                <Award size={24} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-white text-lg font-black group-hover:gradient-text transition-all">{cert.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-sm text-purple-400 font-bold">{cert.issuer}</span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                                        <Calendar size={12} /> {cert.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {cert.url && (
                            <a 
                                href={cert.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 sm:mt-0 sm:ml-4 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 flex items-center gap-2"
                            >
                                View <ExternalLink size={14} />
                            </a>
                        )}
                    </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
