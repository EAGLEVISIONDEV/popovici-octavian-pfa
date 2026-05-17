'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Code2, Layers, Cpu, Shield, Globe, Zap } from 'lucide-react';
import ScrollShatter from './ScrollShatter';

const skills = [
  { category: 'Frontend', icon: Globe, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', icon: Cpu, items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'] },
  { category: 'Database', icon: Layers, items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Firebase'] },
  { category: 'DevOps & Tools', icon: Shield, items: ['Docker', 'Git', 'CI/CD', 'Vercel', 'AWS'] },
];

const stats = [
  { value: '5+', label: 'Ani experiență' },
  { value: '50+', label: 'Proiecte livrate' },
  { value: '100%', label: 'Dedicare' },
  { value: '24/7', label: 'Suport tehnic' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // Stats cards have individual scatter trajectories when exiting
  const scatterDirections = [
    { x: [0, -300], y: [0, -120], r: [0, -25] },
    { x: [0, -100], y: [0, -200], r: [0, 15] },
    { x: [0, 100], y: [0, -180], r: [0, -20] },
    { x: [0, 300], y: [0, -100], r: [0, 30] },
  ];

  // Skill cards scatter with more dramatic 3D rotation
  const skillScatter = [
    { x: [0, -250], y: [0, 150], r: [0, -20], rx: [0, -30], ry: [0, 45] },
    { x: [0, -80], y: [0, 250], r: [0, 15], rx: [0, 25], ry: [0, -35] },
    { x: [0, 80], y: [0, 220], r: [0, -10], rx: [0, -20], ry: [0, 30] },
    { x: [0, 250], y: [0, 180], r: [0, 25], rx: [0, 35], ry: [0, -40] },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="section-container relative z-10">
        {/* Section Header — assembles from particles on enter */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Code2 className="w-3 h-3" /> Despre mine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pasiune pentru <span className="gradient-text">cod de calitate</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Sunt un software developer cu experiență în construirea aplicațiilor web moderne.
            Abordez fiecare proiect cu atenție la detalii, performanță și experiența utilizatorului.
          </p>
        </motion.div>

        {/* Stats — each scatters individually on exit */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16" style={{ perspective: '1200px' }}>
          {stats.map((stat, i) => {
            const sd = scatterDirections[i];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{
                  x: useTransform(sp, [0.7, 0.95], sd.x as [number, number]),
                  y: useTransform(sp, [0.7, 0.95], sd.y as [number, number]),
                  rotate: useTransform(sp, [0.7, 0.95], sd.r as [number, number]),
                  opacity: useTransform(sp, [0.7, 0.9], [1, 0]),
                }}
                className="glass-card p-6 text-center group hover:border-primary-500/30 transition-all duration-500"
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-dark-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Grid — 3D scatter on exit */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16" style={{ perspective: '800px' }}>
          {skills.map((skill, i) => {
            const ss = skillScatter[i];
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                style={{
                  x: useTransform(sp, [0.75, 1], ss.x as [number, number]),
                  y: useTransform(sp, [0.75, 1], ss.y as [number, number]),
                  rotate: useTransform(sp, [0.75, 1], ss.r as [number, number]),
                  rotateX: useTransform(sp, [0.75, 1], ss.rx as [number, number]),
                  rotateY: useTransform(sp, [0.75, 1], ss.ry as [number, number]),
                  opacity: useTransform(sp, [0.75, 0.92], [1, 0]),
                }}
                className="glass-card-hover p-6 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                    <skill.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-white font-semibold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-md bg-dark-700/50 text-dark-300 text-xs font-mono hover:text-primary-300 hover:bg-primary-500/10 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy — shatters on exit */}
        <ScrollShatter cols={5} rows={3} mode="exit" scrollRange={[0.75, 1.0]}>
          <div className="glass-card glow-border p-8 lg:p-12">
            <div className="flex items-start gap-4">
              <div className="hidden sm:block mt-1">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Filozofia mea</h3>
                <p className="text-dark-300 leading-relaxed text-lg">
                  &ldquo;Cred în puterea codului curat, al arhitecturii bine gândite și al colaborării eficiente.
                  Fiecare linie de cod pe care o scriu urmărește să rezolve o problemă reală,
                  cu eleganță și eficiență.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">OP</div>
                  <div>
                    <div className="text-white font-medium">Octavian Popovici</div>
                    <div className="text-dark-400 text-sm">Full-Stack Developer & Founder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollShatter>
      </div>
    </section>
  );
}
