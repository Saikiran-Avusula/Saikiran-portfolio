import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Briefcase } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-900 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Journey</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative space-y-12">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 transform md:-translate-x-1/2"></div>

          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-slate-900 border-2 border-primary-500 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                <Briefcase size={16} className="text-primary-500" />
              </div>

              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className={`bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl hover:border-primary-500/30 transition-colors ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                   <span className="inline-block px-3 py-1 bg-primary-900/30 text-primary-400 text-sm rounded-full font-mono mb-3">
                      {exp.period}
                   </span>
                   <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                   <div className="text-slate-400 font-medium mb-4 text-xl">{exp.company}</div>
                   <ul className={`space-y-2 ${index % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-lg text-slate-300 leading-relaxed flex items-start gap-2">
                          <span className="text-primary-500 mt-1.5 md:hidden">•</span>
                          {desc}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;