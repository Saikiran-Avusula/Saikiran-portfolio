import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Terminal, Lock, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';

interface NavbarProps {
  onOpenLogin: () => void;
  onNavigateAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onNavigateAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen ? 'glass-panel py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2 font-mono font-bold text-2xl text-primary-400 cursor-pointer"
        >
          <Terminal size={28} />
          <span>sai.kiran</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-base font-medium text-slate-300 hover:text-primary-400 transition-colors relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          {isAuthenticated ? (
            <button
              onClick={onNavigateAdmin}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium"
            >
              <Settings size={18} />
              Admin
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
            >
              <Lock size={18} />
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-xl font-medium text-slate-300 hover:text-primary-400"
                >
                  {item.label}
                </a>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateAdmin();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium justify-center"
                >
                  <Settings size={18} />
                  Admin Panel
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLogin();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium justify-center"
                >
                  <Lock size={18} />
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;