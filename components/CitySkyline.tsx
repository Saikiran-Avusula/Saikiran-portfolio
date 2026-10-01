import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Building {
  id: number;
  height: number;
  width: number;
  x: number;
  color: string;
  windows: number;
  delay: number;
}

const CitySkyline: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buildings: Building[] = [
    { id: 1, height: 180, width: 80, x: 5, color: 'from-indigo-900/40 to-indigo-800/40', windows: 8, delay: 0 },
    { id: 2, height: 240, width: 100, x: 90, color: 'from-purple-900/40 to-purple-800/40', windows: 12, delay: 0.1 },
    { id: 3, height: 160, width: 70, x: 195, color: 'from-blue-900/40 to-blue-800/40', windows: 6, delay: 0.2 },
    { id: 4, height: 280, width: 90, x: 270, color: 'from-violet-900/40 to-violet-800/40', windows: 14, delay: 0.3 },
    { id: 5, height: 200, width: 85, x: 365, color: 'from-indigo-900/40 to-indigo-800/40', windows: 10, delay: 0.4 },
    { id: 6, height: 220, width: 95, x: 455, color: 'from-purple-900/40 to-purple-800/40', windows: 11, delay: 0.5 },
    { id: 7, height: 190, width: 75, x: 555, color: 'from-blue-900/40 to-blue-800/40', windows: 9, delay: 0.6 },
    { id: 8, height: 260, width: 88, x: 635, color: 'from-violet-900/40 to-violet-800/40', windows: 13, delay: 0.7 },
    { id: 9, height: 170, width: 78, x: 728, color: 'from-indigo-900/40 to-indigo-800/40', windows: 7, delay: 0.8 },
    { id: 10, height: 250, width: 92, x: 811, color: 'from-purple-900/40 to-purple-800/40', windows: 12, delay: 0.9 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[400px] pointer-events-none z-0 overflow-hidden">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
      
      {/* Buildings */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-4">
        {buildings.map((building) => (
          <motion.div
            key={building.id}
            className={`relative bg-gradient-to-b ${building.color} border-t-2 border-x border-white/10`}
            style={{
              width: building.width,
              position: 'absolute',
              left: `${building.x}px`,
              bottom: 0,
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: building.height * (scrollProgress / 100),
              opacity: scrollProgress > 0 ? 1 : 0.3
            }}
            transition={{ 
              duration: 0.8, 
              delay: building.delay,
              ease: "easeOut" 
            }}
          >
            {/* Windows */}
            <div className="absolute inset-0 p-2 grid grid-cols-3 gap-1">
              {Array.from({ length: building.windows }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-yellow-400/30 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: scrollProgress > (i * 5) ? [0.3, 0.8, 0.3] : 0 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>

            {/* Antenna */}
            {building.id % 3 === 0 && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-red-500/50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/40 pointer-events-none"></div>
    </div>
  );
};

export default CitySkyline;
