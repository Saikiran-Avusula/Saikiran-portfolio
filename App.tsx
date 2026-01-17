import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');

  const handleLoginSuccess = () => {
    setCurrentView('admin');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden selection:bg-primary-500/30">
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigateHome={handleNavigateHome}
        onLogout={handleLogout}
      />

      {currentView === 'home' ? (
        <main>
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Education />
          <Blog />
          <Contact />
        </main>
      ) : (
        <AdminPanel onLogout={handleLogout} />
      )}

      <Footer />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;