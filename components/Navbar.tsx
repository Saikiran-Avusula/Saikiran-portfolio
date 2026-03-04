import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Lock, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';

interface NavbarProps {
  onOpenLogin: () => void;
  onNavigateAdmin: () => void;
  onNavigateHome: () => void;
  onLogout: () => void;
  isAdminView?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onNavigateAdmin, onNavigateHome, onLogout, isAdminView = false }) => {
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
  }, [isAdminView]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigateHome();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-3 group cursor-pointer z-[101]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black text-white">SK</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl gradient-text leading-tight">
                  Sai Kiran
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-black tracking-widest">
                  FULL STACK DEV
                </span>
              </div>
            </motion.a>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {!isAdminView && (
                    <motion.button
                      onClick={onNavigateAdmin}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-600/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Settings size={18} />
                      Admin
                    </motion.button>
                  )}
                  <motion.button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-2xl transition-all border-2 border-white/10 hover:border-white/20"
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
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-2xl transition-all border-2 border-white/10 hover:border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Lock size={18} />
                  Login
                </motion.button>
              )}
            </div>

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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[95] lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-6">
                <div className="flex flex-col gap-2 mb-8">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="group relative px-5 py-4 text-lg font-black text-slate-300 hover:text-white transition-colors cursor-pointer overflow-hidden rounded-2xl"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-indigo-600 to-purple-600 group-hover:h-2/3 transition-all duration-300 rounded-full" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="mt-auto space-y-3"
                >
                  {isAuthenticated ? (
                    <>
                      {!isAdminView && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onNavigateAdmin();
                          }}
                          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-base font-black rounded-2xl transition-all shadow-2xl shadow-indigo-600/50"
                        >
                          <Settings size={20} />
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-base font-black rounded-2xl transition-all border-2 border-white/10 hover:border-white/20"
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
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-base font-black rounded-2xl transition-all border-2 border-white/10 hover:border-white/20"
                    >
                      <Lock size={20} />
                      Login
                    </button>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-500 font-bold"
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
