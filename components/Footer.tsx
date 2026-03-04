import React from 'react';
import { Heart, Code2, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black py-12 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm sm:text-base">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-black gradient-text text-lg">
              Sai Kiran Avusula
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Code2 size={14} className="text-indigo-400" />
              <span className="font-semibold">Built with</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 font-bold text-slate-300">
                React
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 font-bold text-slate-300">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 font-bold text-slate-300">
                Tailwind
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="font-semibold">Crafted with</span>
            <Heart size={16} className="text-red-400 fill-red-400 animate-pulse" />
          </div>

          <div className="text-[10px] sm:text-xs text-slate-600 font-black tracking-widest">
            INNOVATIVE • PASSIONATE • FULL STACK DEVELOPER
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
