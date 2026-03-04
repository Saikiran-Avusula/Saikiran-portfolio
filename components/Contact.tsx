import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, MapPin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    message: string;
  }>({ name: '', email: '', message: '' });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Let's Work Together</h3>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              Have a project in mind or want to discuss modern web technologies? 
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            
            <div className="space-y-4">
              <div className="bento-card p-6 rounded-3xl flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={22} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-black mb-1">Location</h4>
                  <p className="text-slate-400 text-sm">Hyderabad, Telangana, India (Remote available)</p>
                </div>
              </div>
              <div className="bento-card p-6 rounded-3xl flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={22} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-black mb-1">Email</h4>
                  <p className="text-slate-400 text-sm">saikiranavusula89@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bento-card p-8 rounded-3xl">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-base text-white focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-base text-white focus:outline-none focus:border-indigo-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-base text-white focus:outline-none focus:border-indigo-500 transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                status === 'success' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:scale-105'
              }`}
            >
              {status === 'loading' && <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
              {status === 'success' && <><CheckCircle size={24} /> Message Sent!</>}
              {status === 'error' && <><AlertCircle size={24} /> Error, Try Again</>}
              {status === 'idle' && <><Send size={20} /> Send Message</>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
