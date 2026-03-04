import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Briefcase, Star, Rocket, Trophy } from 'lucide-react';

const characterPoses = [
  { icon: Rocket, color: 'from-blue-500 to-cyan-500' },
  { icon: Star, color: 'from-purple-500 to-pink-500' },
  { icon: Trophy, color: 'from-yellow-500 to-orange-500' },
];

const Timeline: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('experience');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(100, (scrolled / (sectionHeight - viewportHeight)) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 bg-black scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Animated Path */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5">
            {/* Background path */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-full"></div>
            {/* Animated progress */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full origin-top"
              style={{ scaleY: scrollProgress / 100 }}
            />
          </div>

          {/* Walking Character */}
          <motion.div
            className="absolute left-8 md:left-1/2 -ml-8 md:-ml-12 z-20 pointer-events-none"
            style={{
              top: `${scrollProgress}%`,
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Character */}
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/50 border-4 border-white/20">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Briefcase className="text-white" size={32} />
                </motion.div>
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/30 rounded-full blur-sm"></div>
            </motion.div>
          </motion.div>

          {/* Timeline Items */}
          <div className="space-y-24 md:space-y-32">
            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const PoseIcon = characterPoses[index % characterPoses.length].icon;
              const poseColor = characterPoses[index % characterPoses.length].color;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-16`}
                >
                  {/* Milestone Marker */}
                  <div className="absolute left-8 md:left-1/2 -ml-6 md:-ml-6 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 }}
                      className={`w-12 h-12 bg-gradient-to-br ${poseColor} rounded-full flex items-center justify-center shadow-2xl border-4 border-black`}
                    >
                      <PoseIcon className="text-white" size={20} />
                    </motion.div>
                    
                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <div className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-xs font-bold text-white">Stop {index + 1}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`w-full md:w-[calc(50%-4rem)] ml-20 md:ml-0 ${
                      isLeft ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="bento-card rounded-3xl p-6 group relative overflow-hidden">
                      {/* Hover gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${poseColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        {/* Period Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                          className={`inline-block px-4 py-2 bg-gradient-to-r ${poseColor} bg-opacity-20 rounded-xl mb-4 border border-white/20`}
                        >
                          <span className="text-xs font-black text-white uppercase tracking-wider">
                            {exp.period}
                          </span>
                        </motion.div>

                        {/* Role */}
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:gradient-text transition-all">
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <p className="text-lg font-bold text-indigo-400 mb-4">{exp.company}</p>

                        {/* Highlights */}
                        <ul className={`space-y-2 ${isLeft ? 'md:flex md:flex-col md:items-end' : ''}`}>
                          {exp.description.map((desc, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="text-sm text-slate-300 leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom accent */}
                      <div className={`absolute bottom-0 ${isLeft ? 'right-0' : 'left-0'} w-1/2 h-1 bg-gradient-to-r ${poseColor} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-8 md:left-1/2 bottom-0 -ml-8 md:-ml-8 z-10"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-black">
              <Trophy className="text-white" size={28} />
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 z-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={2 * Math.PI * 28 * (1 - scrollProgress / 100)}
                className="text-indigo-500 transition-all"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-black text-white">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
