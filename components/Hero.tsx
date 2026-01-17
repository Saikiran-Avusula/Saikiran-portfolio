import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-primary-400 font-mono text-base tracking-wider mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            HI, I AM
          </motion.span>

          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-6 text-white">
            {PERSONAL_DETAILS.name}
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500">
            {PERSONAL_DETAILS.role}
          </h2>

          <p className="text-slate-400 text-xl mb-8 max-w-lg leading-relaxed">
            {PERSONAL_DETAILS.about}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-lg font-medium rounded-lg transition-all hover:translate-y-[-2px] shadow-lg shadow-primary-600/30"
            >
              View Projects <ArrowRight size={20} />
            </a>
            <a
              href="#resume"
              onClick={handleViewResume}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-lg font-medium rounded-lg transition-all hover:translate-y-[-2px] border border-slate-700"
            >
              View Resume <FileText size={20} />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-slate-400">
            <a href={PERSONAL_DETAILS.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={28} /></a>
            <a href={PERSONAL_DETAILS.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={28} /></a>
            <a href={PERSONAL_DETAILS.social.email} className="hover:text-white transition-colors"><Mail size={28} /></a>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden md:flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Visual Container */}
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">

            {/* 1. Pulsing Gradient Blob Background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 via-violet-500/20 to-blue-500/20 blur-[60px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 2. Outer Dashed Ring (Slow Rotate) */}
            <motion.div
              className="absolute inset-0 border border-slate-700/50 rounded-full border-dashed"
              style={{ borderSpacing: "20px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* 3. Middle Thin Ring with Orbiting Planet */}
            <motion.div
              className="absolute inset-12 border border-slate-700/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
            </motion.div>

            {/* 4. Inner Tech Ring (Fast Rotate) */}
            <motion.div
              className="absolute inset-24 border-2 border-slate-800 rounded-full border-t-primary-500/50 border-r-transparent border-b-primary-500/50 border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* 5. Main Image Container */}
            <motion.div
              className="relative z-10 w-[340px] h-[340px] rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={profileImage}
                alt="Sai Kiran Avusula"
                className="w-full h-full object-cover"
              />
              {/* Overlay for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Resume Viewer Modal */}
      {resumeData && (
        <ResumeViewer
          isOpen={isResumeViewerOpen}
          onClose={() => setIsResumeViewerOpen(false)}
          resumeUrl={resumeData.url}
        />
      )}
    </section>
  );
};

export default Hero;