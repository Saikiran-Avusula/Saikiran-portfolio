import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Terminal, Lock, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';

interface NavbarProps {
  onOpenLogin: () => void;
  onNavigateAdmin: () => void;
  onNavigateHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onNavigateAdmin, onNavigateHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Navigate to home view first
    onNavigateHome();

    // Wait for view to update, then scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer z-[101]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Terminal className="text-primary-400 w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-primary-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-mono font-bold text-xl sm:text-2xl bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                sai.kiran
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-500 group-hover:w-3/4 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <motion.button
                  onClick={onNavigateAdmin}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings size={18} />
                  Admin
                </motion.button>
              ) : (
                <motion.button
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all border border-slate-700/50 hover:border-slate-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Lock size={18} />
                  Login
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-2.5 text-slate-300 hover:text-white transition-colors z-[101]"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-900/98 backdrop-blur-2xl border-l border-slate-800/50 z-[95] lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Content */}
              <div className="flex flex-col h-full pt-24 px-6 pb-6">
                {/* Navigation Links */}
                <div className="flex flex-col gap-2 mb-8">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="group relative px-5 py-4 text-lg font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer overflow-hidden rounded-xl"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-primary-400 to-primary-500 group-hover:h-2/3 transition-all duration-300" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="mt-auto"
                >
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigateAdmin();
                      }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-base font-bold rounded-xl transition-all shadow-lg shadow-primary-600/25"
                    >
                      <Settings size={20} />
                      Admin Panel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white text-base font-bold rounded-xl transition-all border border-slate-700/50 hover:border-slate-600"
                    >
                      <Lock size={20} />
                      Login
                    </button>
                  )}
                </motion.div>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-slate-800/50 text-center text-sm text-slate-500"
                >
                  Made with ❤️ by Sai Kiran
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;