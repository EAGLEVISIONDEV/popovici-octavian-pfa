'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Braces } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[128px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[128px]" />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        
        {/* Noise */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="section-container relative z-10 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Disponibil pentru proiecte noi
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Popovici Octavian</span>
            <br />
            <span className="gradient-text">Software Developer</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-dark-300 mb-10 text-balance leading-relaxed"
        >
          Dezvolt soluții software moderne, scalabile și performante.
          De la aplicații web full-stack la automatizări și sisteme complexe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href="#projects" className="btn-primary text-base px-8 py-4">
            <Braces className="w-5 h-5" />
            Vezi proiectele
          </a>
          <a href="#contact" className="btn-secondary text-base px-8 py-4">
            <Terminal className="w-5 h-5" />
            Contactează-mă
          </a>
        </motion.div>

        {/* Floating Tech Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center gap-6 mb-12"
        >
          {['React', 'Node.js', 'TypeScript', 'Next.js', 'Python', 'PostgreSQL'].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="px-3 py-1.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-400 text-xs font-mono hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-dark-500 hover:text-primary-400 transition-colors">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-primary-500/20"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
}
