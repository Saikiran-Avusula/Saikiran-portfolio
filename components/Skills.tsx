import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Server, Database, Wrench } from 'lucide-react';
import { SKILLS } from '../constants';

const categoryIcons = {
  Languages: Code,
  Frontend: Monitor,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
};

const categoryColors = {
  Languages: 'from-primary-500 to-blue-500',
  Frontend: 'from-indigo-500 to-purple-500',
  Backend: 'from-violet-500 to-fuchsia-500',
  Database: 'from-pink-500 to-rose-500',
  Tools: 'from-orange-500 to-amber-500',
};

const Skills: React.FC = () => {
  // Group skills by category
  const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'] as const;

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = SKILLS.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<typeof categories[number], typeof SKILLS>);

  return (
    <section id="skills" className="py-20 bg-slate-900 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Stack</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category];
            const gradient = categoryColors[category];
            const skills = skillsByCategory[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="glass-panel p-6 rounded-2xl hover:border-primary-500/50 transition-all group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-10 border border-slate-700/50 hover:border-slate-600 transition-all hover:scale-105`}
                    >
                      <span className="text-slate-200 font-medium text-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;