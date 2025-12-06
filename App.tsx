import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden selection:bg-primary-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Education />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default App;