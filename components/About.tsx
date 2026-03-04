import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Zap } from 'lucide-react';
import { ABOUT_INTRO } from '../constants';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-black relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bento-card p-8 rounded-3xl text-center group"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Code2 className="text-white" size={36} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">Backend Architecture</h3>
                        <p className="text-slate-400 text-sm">Spring Boot microservices with clean, scalable design patterns</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bento-card p-8 rounded-3xl text-center group"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="text-white" size={36} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">Modern Frontend</h3>
                        <p className="text-slate-400 text-sm">React interfaces with smooth UX and responsive design</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bento-card p-8 rounded-3xl text-center group"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Database className="text-white" size={36} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">Database Optimization</h3>
                        <p className="text-slate-400 text-sm">Efficient queries and schema design for peak performance</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bento-card p-10 rounded-3xl max-w-4xl mx-auto"
                >
                    <div className="space-y-6">
                        {ABOUT_INTRO.description.map((paragraph, index) => (
                            <p key={index} className="text-slate-300 text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="grid gap-6 mt-10 pt-10 border-t border-white/10">
                        <div className="text-center">
                            <div className="text-5xl font-black gradient-text mb-2">1+</div>
                            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Years Experience</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
