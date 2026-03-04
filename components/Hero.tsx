import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText, Code2 } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';
import { resumeService } from '../services/resumeService';
import { imageService } from '../services/imageService';
import ResumeViewer from './ResumeViewer';

const Hero: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>('https://github.com/Saikiran-Avusula.png');
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const [resumeData, setResumeData] = useState<{ url: string; downloadUrl: string; fileName: string } | null>(null);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    const imageData = await imageService.getImage();
    if (imageData) {
      setProfileImage(URL.createObjectURL(imageData.file));
    }
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewResume = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const data = await resumeService.getResume();
      if (data) {
        setResumeData(data);
        setIsResumeViewerOpen(true);
      } else {
        alert('No resume available yet. The admin needs to upload a resume first.');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      if (error instanceof TypeError) {
        alert('Unable to connect to resume service. Please try again later.');
      } else {
        alert('No resume available yet. The admin needs to upload a resume first.');
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-purple-600/30 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 bento-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-xs tracking-widest uppercase">Available for Work</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-6 text-white tracking-tight">
              {PERSONAL_DETAILS.name.split(' ')[0]}<br/>
              <span className="gradient-text">{PERSONAL_DETAILS.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white/90">
              {PERSONAL_DETAILS.role}
            </h2>

            <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
              {PERSONAL_DETAILS.about}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-indigo-600/50 relative overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="#resume"
                onClick={handleViewResume}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
              >
                View Resume <FileText size={20} />
              </a>
            </div>
          </motion.div>

          {/* Profile Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 bento-card rounded-3xl p-6 flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse-glow"></div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              >
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 bento-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-indigo-400" size={20} />
              <h3 className="text-white font-bold text-lg">Connect</h3>
            </div>
            <div className="flex flex-col gap-3">
              <a href={PERSONAL_DETAILS.social.github} target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all group border border-white/10 hover:border-indigo-500/50">
                <Github size={22} className="group-hover:scale-110 transition-transform text-indigo-400" />
                <span className="font-semibold">GitHub</span>
              </a>
              <a href={PERSONAL_DETAILS.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all group border border-white/10 hover:border-purple-500/50">
                <Linkedin size={22} className="group-hover:scale-110 transition-transform text-purple-400" />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a href={PERSONAL_DETAILS.social.email}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all group border border-white/10 hover:border-pink-500/50">
                <Mail size={22} className="group-hover:scale-110 transition-transform text-pink-400" />
                <span className="font-semibold">Email</span>
              </a>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-4 bento-card rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-6xl font-black gradient-text mb-2">1+</div>
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Years Experience</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-4 bento-card rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-6xl font-black gradient-text mb-2">10+</div>
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Projects Completed</div>
          </motion.div>

        </div>
      </div>

      {resumeData && (
        <ResumeViewer
          isOpen={isResumeViewerOpen}
          onClose={() => setIsResumeViewerOpen(false)}
          resumeUrl={resumeData.url}
          downloadUrl={resumeData.downloadUrl}
          fileName={resumeData.fileName}
        />
      )}
    </section>
  );
};

export default Hero;