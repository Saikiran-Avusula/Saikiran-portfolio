import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Terminal, Lock, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';

interface NavbarProps {
  onOpenLogin: () => void;
  onNavigateAdmin: () => void;
  onNavigateHome: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onNavigateAdmin, onNavigateHome, onLogout }) => {
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
              className="flex items-center gap-3 group cursor-pointer z-[101]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hexagonal Logo Badge */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                {/* Hexagon Background */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                >
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                    fill="url(#logoGradient)"
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  <polygon
                    points="50,10 85,30 85,70 50,90 15,70 15,30"
                    fill="#0f172a"
                    className="opacity-90"
                  />
                </svg>
                {/* SK Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black bg-gradient-to-br from-primary-300 to-primary-500 bg-clip-text text-transparent">
                    SK
                  </span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col">
                <span className="font-mono font-bold text-lg sm:text-xl bg-gradient-to-r from-primary-400 via-primary-300 to-purple-400 bg-clip-text text-transparent leading-tight">
                  Sai Kiran
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider">
                  FULL STACK DEV
                </span>
              </div>
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
                <>
                  <motion.button
                    onClick={onNavigateAdmin}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings size={18} />
                    Admin
                  </motion.button>
                  <motion.button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all border border-slate-700/50 hover:border-slate-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </>
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
                  className="mt-auto space-y-3"
                >
                  {isAuthenticated ? (
                    <>
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
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white text-base font-bold rounded-xl transition-all border border-slate-700/50 hover:border-slate-600"
                      >
                        <LogOut size={20} />
                        Logout
                      </button>
                    </>
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