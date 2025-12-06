import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Alex Dev. Built with React, Tailwind & Gemini API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;