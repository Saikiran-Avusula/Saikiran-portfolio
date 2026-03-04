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
  Languages: 'from-indigo-600 to-blue-600',
  Frontend: 'from-purple-600 to-pink-600',
  Backend: 'from-violet-600 to-fuchsia-600',
  Database: 'from-pink-600 to-rose-600',
  Tools: 'from-orange-600 to-amber-600',
};

const Skills: React.FC = () => {
  const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'] as const;

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = SKILLS.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<typeof categories[number], typeof SKILLS>);

  return (
    <section id="skills" className="py-20 bg-black relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Technical <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bento-card p-6 rounded-3xl group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={26} />
                  </div>
                  <h3 className="text-2xl font-black text-white">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
                    >
                      <span className="text-slate-200 font-bold text-sm">{skill.name}</span>
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
