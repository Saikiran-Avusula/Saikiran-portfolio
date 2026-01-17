import React from 'react';
import { Heart, Code2, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-12 border-t border-slate-800/50">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/10 via-transparent to-purple-950/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Main Footer Text */}
          <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Sai Kiran Avusula
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Code2 size={14} className="text-primary-400" />
              <span>Built with</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700/50 font-medium text-slate-400">
                React
              </span>
              <span className="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700/50 font-medium text-slate-400">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700/50 font-medium text-slate-400">
                Tailwind
              </span>
            </div>
          </div>

          {/* Made with Love */}
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Crafted with</span>
            <Heart size={20} className="text-red-400 fill-red-400 animate-pulse" />
          </div>

          {/* Bottom Tagline */}
          <div className="text-[10px] sm:text-xs text-slate-600 font-medium tracking-wider">
            INNOVATIVE • PASSIONATE • FULL STACK DEVELOPER
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;