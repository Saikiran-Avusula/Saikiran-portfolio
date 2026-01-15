import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

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
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
            <p className="text-slate-400 mb-8 text-xl leading-relaxed">
              Have a project in mind or want to discuss modern web technologies? 
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            
            <div className="space-y-6">
              <div className="p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-white text-lg font-bold mb-2">Location</h4>
                <p className="text-slate-400 text-lg">Hyderabad, Telangana, India (Remote available)</p>
              </div>
              <div className="p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-white text-lg font-bold mb-2">Email</h4>
                <p className="text-slate-400 text-lg">saikiranavusula89@gmail.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="mb-6">
              <label htmlFor="name" className="block text-base font-medium text-slate-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-base font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-base font-medium text-slate-300 mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 text-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                status === 'success' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-primary-600 hover:bg-primary-500 text-white'
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