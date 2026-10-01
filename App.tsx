import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import CitySkyline from './components/CitySkyline';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [forceNavbarUpdate, setForceNavbarUpdate] = useState(0);

  const handleLoginSuccess = () => {
    setCurrentView('admin');
    setForceNavbarUpdate(prev => prev + 1); // Force navbar update
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentView('home');
    setForceNavbarUpdate(prev => prev + 1); // Force navbar update
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
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-primary-500/30">
      {/* City Skyline Background */}
      {currentView === 'home' && <CitySkyline />}
      
      <Navbar
        key={forceNavbarUpdate}
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigateHome={handleNavigateHome}
        onLogout={handleLogout}
        isAdminView={currentView === 'admin'}
      />

      {currentView === 'home' ? (
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Education />
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