'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Terminal, Braces } from 'lucide-react';
import CharacterDissolve from './CharacterDissolve';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const bgY = useTransform(sp, [0, 1], [0, 200]);
  const contentScale = useTransform(sp, [0, 0.5], [1, 0.95]);
  const gridOpacity = useTransform(sp, [0, 0.4, 0.8], [0.3, 0.15, 0]);

  const badgeX = useTransform(sp, [0.3, 0.7], [0, -200]);
  const badgeRotate = useTransform(sp, [0.3, 0.7], [0, -20]);
  const badgeOpacity = useTransform(sp, [0.3, 0.6], [1, 0]);

  const btn1X = useTransform(sp, [0.4, 0.8], [0, -300]);
  const btn1Y = useTransform(sp, [0.4, 0.8], [0, 100]);
  const btn1Rotate = useTransform(sp, [0.4, 0.8], [0, -15]);
  const btn1Opacity = useTransform(sp, [0.4, 0.7], [1, 0]);

  const btn2X = useTransform(sp, [0.4, 0.8], [0, 300]);
  const btn2Y = useTransform(sp, [0.4, 0.8], [0, 80]);
  const btn2Rotate = useTransform(sp, [0.4, 0.8], [0, 15]);
  const btn2Opacity = useTransform(sp, [0.4, 0.7], [1, 0]);

  const subtitleY = useTransform(sp, [0.3, 0.7], [0, 60]);
  const subtitleOpacity = useTransform(sp, [0.4, 0.7], [1, 0]);
  const subtitleScale = useTransform(sp, [0.4, 0.7], [1, 0.9]);
  const subtitleBlur = useTransform(sp, [0.4, 0.7], [0, 10]);

  const orb1X = useTransform(sp, [0, 1], [0, -200]);
  const orb1Scale = useTransform(sp, [0, 0.8], [1, 1.5]);
  const orb2X = useTransform(sp, [0, 1], [0, 200]);
  const orb2Scale = useTransform(sp, [0, 0.8], [1, 1.8]);

  const techPillData = [
    { label: 'React',      x: [0, -250] as [number,number], y: [0, -150] as [number,number], r: [0, -45] as [number,number] },
    { label: 'Node.js',    x: [0, -100] as [number,number], y: [0, -250] as [number,number], r: [0,  30] as [number,number] },
    { label: 'TypeScript',  x: [0,  50]  as [number,number], y: [0, -200] as [number,number], r: [0, -20] as [number,number] },
    { label: 'Next.js',    x: [0,  200] as [number,number], y: [0, -180] as [number,number], r: [0,  40] as [number,number] },
    { label: 'Python',     x: [0,  300] as [number,number], y: [0, -100] as [number,number], r: [0, -35] as [number,number] },
    { label: 'PostgreSQL', x: [0,  350] as [number,number], y: [0,  50]  as [number,number], r: [0,  25] as [number,number] },
  ];

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-[120vh] flex items-start justify-center overflow-hidden pt-[15vh]">
      <div className="absolute inset-0">
        <motion.div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[128px]" style={{ x: orb1X, scale: orb1Scale, y: bgY }} />
        <motion.div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[128px]" style={{ x: orb2X, scale: orb2Scale, y: bgY }} />
        <motion.div className="absolute inset-0 bg-grid-pattern bg-grid" style={{ opacity: gridOpacity }} />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <motion.div className="section-container relative z-10 text-center" style={{ scale: contentScale }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ x: badgeX, rotate: badgeRotate, opacity: badgeOpacity }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Disponibil pentru proiecte noi
        </motion.div>

        {/* Title — character dissolution */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <div className="text-white">
              <CharacterDissolve text="Popovici Octavian" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white" mode="exit" scrollRange={[0.25, 0.6]} />
            </div>
            <div className="mt-2">
              <CharacterDissolve text="Software Developer" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text" mode="exit" scrollRange={[0.3, 0.65]} />
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ y: subtitleY, opacity: subtitleOpacity, scale: subtitleScale, filter: useTransform(subtitleBlur, v => `blur(${v}px)`) }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-dark-300 mb-10 text-balance leading-relaxed"
        >
          Dezvolt soluții software moderne, scalabile și performante.
          De la aplicații web full-stack la automatizări și sisteme complexe.
        </motion.p>

        {/* Buttons — scatter */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.a href="#projects" className="btn-primary text-base px-8 py-4" style={{ x: btn1X, y: btn1Y, rotate: btn1Rotate, opacity: btn1Opacity }}>
            <Braces className="w-5 h-5" /> Vezi proiectele
          </motion.a>
          <motion.a href="#contact" className="btn-secondary text-base px-8 py-4" style={{ x: btn2X, y: btn2Y, rotate: btn2Rotate, opacity: btn2Opacity }}>
            <Terminal className="w-5 h-5" /> Contactează-mă
          </motion.a>
        </motion.div>

        {/* Tech Pills — scatter with unique trajectories */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
          {techPillData.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              style={{
                x: useTransform(sp, [0.35 + i * 0.03, 0.7], t.x),
                y: useTransform(sp, [0.35 + i * 0.03, 0.7], t.y),
                rotate: useTransform(sp, [0.35 + i * 0.03, 0.7], t.r),
                opacity: useTransform(sp, [0.35 + i * 0.03, 0.6 + i * 0.02], [1, 0]),
              }}
              className="px-3 py-1.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-400 text-xs font-mono hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 cursor-default"
            >
              {t.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}
          style={{ opacity: useTransform(sp, [0, 0.15], [1, 0]) }}
          className="mt-8"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-dark-500 hover:text-primary-400 transition-colors">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll to decompose</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
