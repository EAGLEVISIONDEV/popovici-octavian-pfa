'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Monitor, Server, Smartphone, Database, Cloud, Bot,
  ArrowRight, Wrench,
} from 'lucide-react';

const services = [
  { icon: Monitor, title: 'Aplicații Web', description: 'Dezvoltare de aplicații web moderne cu React, Next.js și TypeScript. Interfețe rapide, responsive și optimizate SEO.', features: ['Single Page Apps', 'Progressive Web Apps', 'Landing Pages', 'Dashboards'], gradient: 'from-blue-500 to-cyan-500' },
  { icon: Server, title: 'Backend & API', description: 'Construiesc API-uri robuste și scalabile cu Node.js, Express și baze de date moderne.', features: ['REST APIs', 'GraphQL', 'Microservicii', 'Autentificare'], gradient: 'from-primary-500 to-purple-500' },
  { icon: Smartphone, title: 'Mobile Development', description: 'Aplicații mobile cross-platform cu React Native. O singură bază de cod pentru iOS și Android.', features: ['React Native', 'Cross-platform', 'App Store', 'Push Notifications'], gradient: 'from-emerald-500 to-teal-500' },
  { icon: Database, title: 'Baze de Date', description: 'Design și optimizare baze de date. PostgreSQL, MongoDB, Redis pentru performanță maximă.', features: ['Schema Design', 'Migrări', 'Optimizare', 'Backup'], gradient: 'from-orange-500 to-amber-500' },
  { icon: Cloud, title: 'Cloud & DevOps', description: 'Deployment și infrastructură cloud. CI/CD pipelines, containerizare cu Docker.', features: ['AWS / Vercel', 'Docker', 'CI/CD', 'Monitoring'], gradient: 'from-pink-500 to-rose-500' },
  { icon: Bot, title: 'AI & Automatizări', description: 'Integrare AI, chatboți și automatizări inteligente pentru business.', features: ['OpenAI / LLMs', 'Chatbots', 'Automation', 'Data Processing'], gradient: 'from-violet-500 to-indigo-500' },
];

// Each card gets a unique exit trajectory simulating an explosion
const cardTrajectories = [
  { x: -350, y: -200, r: -35, rx: -40, ry: 30 },
  { x: 0,    y: -300, r: 15,  rx: 30,  ry: -20 },
  { x: 350,  y: -180, r: 40,  rx: -25, ry: -35 },
  { x: -300, y: 200,  r: 25,  rx: 35,  ry: 40 },
  { x: 0,    y: 300,  r: -20, rx: -30, ry: 25 },
  { x: 350,  y: 150,  r: -45, rx: 20,  ry: -45 },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 overflow-visible min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 -left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[128px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Wrench className="w-3 h-3" /> Servicii
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ce pot face <span className="gradient-text">pentru tine</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Ofer servicii complete de dezvoltare software, de la concept la deployment.
          </p>
        </motion.div>

        {/* Cards Grid — each explodes outward on scroll exit */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {services.map((service, i) => {
            const ct = cardTrajectories[i];
            const exitStart = 0.72 + i * 0.015;
            const exitEnd = 0.92 + i * 0.01;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: useTransform(sp, [exitStart, exitEnd], [0, ct.x]),
                  y: useTransform(sp, [exitStart, exitEnd], [0, ct.y]),
                  rotate: useTransform(sp, [exitStart, exitEnd], [0, ct.r]),
                  rotateX: useTransform(sp, [exitStart, exitEnd], [0, ct.rx]),
                  rotateY: useTransform(sp, [exitStart, exitEnd], [0, ct.ry]),
                  opacity: useTransform(sp, [exitStart, exitStart + 0.12], [1, 0]),
                  scale: useTransform(sp, [exitStart, exitEnd], [1, 0.7]),
                }}
                className="glass-card-hover p-6 lg:p-8 group relative overflow-hidden"
              >
                {/* Gradient hover overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">{service.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.features.map((f) => (
                      <span key={f} className="px-2.5 py-1 rounded-md bg-dark-700/50 text-dark-300 text-xs font-mono">{f}</span>
                    ))}
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors group/link">
                    Discută proiectul <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            opacity: useTransform(sp, [0.78, 0.88], [1, 0]),
            scale: useTransform(sp, [0.78, 0.95], [1, 0.85]),
            rotateX: useTransform(sp, [0.78, 0.95], [0, -15]),
          }}
          className="mt-16 glass-card glow-border p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ai un proiect în minte?</h3>
          <p className="text-dark-300 text-lg mb-8 max-w-xl mx-auto">Hai să discutăm despre cum pot transforma ideea ta în realitate.</p>
          <a href="#contact" className="btn-primary text-base px-8 py-4">
            Solicită o consultație gratuită <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
