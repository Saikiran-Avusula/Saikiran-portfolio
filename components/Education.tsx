import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education & Certifications</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Column */}
          <div>
             <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary-400" size={32} />
                <h3 className="text-3xl font-bold text-white">Academic Background</h3>
             </div>
             
             <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-primary-500/50 transition-colors"
                    >
                        <div className="flex flex-col gap-2 mb-3">
                            <h4 className="text-2xl font-bold text-white">{edu.degree}</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-medium text-slate-300">{edu.institution}</span>
                                <span className="text-base font-mono text-primary-400 bg-primary-900/20 px-2 py-1 rounded whitespace-nowrap ml-2">{edu.period}</span>
                            </div>
                        </div>
                        {edu.description && (
                            <p className="text-slate-400 text-lg leading-relaxed">{edu.description}</p>
                        )}
                    </motion.div>
                ))}
             </div>
          </div>

          {/* Certifications Column */}
          <div>
             <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary-400" size={32} />
                <h3 className="text-3xl font-bold text-white">Certifications</h3>
             </div>

             <div className="grid gap-4">
                {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center bg-slate-900 p-6 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-colors group"
                    >
                        <div className="flex items-center flex-1">
                            <div className="bg-slate-800 p-3 rounded-lg mr-4 group-hover:bg-slate-700 transition-colors">
                                <Award size={28} className="text-yellow-500" />
                            </div>
                            <div>
                                <h4 className="text-white text-xl font-bold group-hover:text-primary-400 transition-colors">{cert.name}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-lg text-primary-400">{cert.issuer}</span>
                                    <span className="text-base text-slate-500 flex items-center gap-1">
                                        <Calendar size={14} /> {cert.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {cert.url && (
                            <a 
                                href={cert.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 sm:mt-0 sm:ml-4 px-5 py-2 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white text-base rounded-lg transition-colors flex items-center gap-2"
                            >
                                View <ExternalLink size={16} />
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