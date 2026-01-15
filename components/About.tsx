import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Zap } from 'lucide-react';
import { ABOUT_INTRO } from '../constants';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-slate-950 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{ABOUT_INTRO.title}</h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-8 rounded-2xl text-center group hover:border-primary-500/50 transition-all"
                    >
                        <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-all">
                            <Code2 className="text-primary-400" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Backend Architecture</h3>
                        <p className="text-slate-400">Spring Boot microservices with clean, scalable design patterns</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-8 rounded-2xl text-center group hover:border-primary-500/50 transition-all"
                    >
                        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/20 transition-all">
                            <Zap className="text-indigo-400" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Modern Frontend</h3>
                        <p className="text-slate-400">React interfaces with smooth UX and responsive design</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel p-8 rounded-2xl text-center group hover:border-primary-500/50 transition-all"
                    >
                        <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-500/20 transition-all">
                            <Database className="text-violet-400" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Database Optimization</h3>
                        <p className="text-slate-400">Efficient queries and schema design for peak performance</p>
                    </motion.div>
                </div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-10 rounded-2xl max-w-4xl mx-auto"
                >
                    <div className="space-y-6">
                        {ABOUT_INTRO.description.map((paragraph, index) => (
                            <p key={index} className="text-slate-300 text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid gap-6 mt-10 pt-10 border-t border-slate-800">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-400 mb-2">2+</div>
                            <div className="text-slate-400 text-sm">Years Experience</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
