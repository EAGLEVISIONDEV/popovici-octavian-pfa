'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Layers,
  Zap,
  Shield,
  Cpu,
  Globe,
} from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: Globe,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: Cpu,
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    icon: Layers,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Firebase'],
  },
  {
    category: 'DevOps & Tools',
    icon: Shield,
    items: ['Docker', 'Git', 'CI/CD', 'Vercel', 'AWS'],
  },
];

const stats = [
  { value: '5+', label: 'Ani experiență' },
  { value: '50+', label: 'Proiecte livrate' },
  { value: '100%', label: 'Dedicare' },
  { value: '24/7', label: 'Suport tehnic' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Code2 className="w-3 h-3" />
            Despre mine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pasiune pentru <span className="gradient-text">cod de calitate</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Sunt un software developer cu experiență în construirea aplicațiilor web moderne.
            Abordez fiecare proiect cu atenție la detalii, performanță și experiența utilizatorului.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary-500/30 transition-all duration-500"
            >
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-dark-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
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
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-dark-700/50 text-dark-300 text-xs font-mono hover:text-primary-300 hover:bg-primary-500/10 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-card glow-border p-8 lg:p-12"
        >
          <div className="flex items-start gap-4">
            <div className="hidden sm:block mt-1">
              <Zap className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Filozofia mea</h3>
              <p className="text-dark-300 leading-relaxed text-lg">
                &ldquo;Cred în puterea codului curat, al arhitecturii bine gândite și al colaborării eficiente.
                Fiecare linie de cod pe care o scriu urmărește să rezolve o problemă reală, 
                cu eleganță și eficiență. Sunt mereu în pas cu cele mai noi tehnologii și 
                best practices din industrie.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  OP
                </div>
                <div>
                  <div className="text-white font-medium">Octavian Popovici</div>
                  <div className="text-dark-400 text-sm">Full-Stack Developer & Founder</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
