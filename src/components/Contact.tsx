'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2,
  Github, Linkedin, Globe,
} from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'octavianpopovici13@gmail.com', href: 'mailto:octavianpopovici13@gmail.com' },
  { icon: Phone, label: 'Telefon', value: '+40 764 196 983', href: 'tel:+40764196983' },
  { icon: MapPin, label: 'Locație', value: 'București, România', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/EAGLEVISIONDEV' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/octavianpopovici' },
  { icon: Globe, label: 'Website', href: '#hero' },
];

// Contact info cards converge from scattered positions
const infoEntryTrajectories = [
  { x: -300, y: -100, r: -25 },
  { x: -250, y: 50, r: 20 },
  { x: -200, y: 150, r: -15 },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // Form assembles from the right
  const formX = useTransform(sp, [0, 0.25], [200, 0]);
  const formRotateY = useTransform(sp, [0, 0.25], [-15, 0]);
  const formOpacity = useTransform(sp, [0, 0.2], [0, 1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    const mailtoLink = `mailto:octavianpopovici13@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Solicitare de pe website'
    )}&body=${encodeURIComponent(
      `Nume: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoLink, '_blank');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 500);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[128px]" />
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
            <MessageSquare className="w-3 h-3" /> Contact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Hai să <span className="gradient-text">colaborăm</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Ești interesat de serviciile mele? Trimite-mi un mesaj.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12" style={{ perspective: '1200px' }}>
          {/* Contact Info — converges from scattered state */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, i) => {
              const t = infoEntryTrajectories[i];
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  style={{
                    x: useTransform(sp, [0.02 + i * 0.03, 0.2 + i * 0.03], [t.x, 0]),
                    y: useTransform(sp, [0.02 + i * 0.03, 0.2 + i * 0.03], [t.y, 0]),
                    rotate: useTransform(sp, [0.02 + i * 0.03, 0.2 + i * 0.03], [t.r, 0]),
                    opacity: useTransform(sp, [0.02 + i * 0.03, 0.15 + i * 0.03], [0, 1]),
                  }}
                  className="glass-card-hover p-5 flex items-center gap-4 group block"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-dark-400 text-xs font-medium uppercase tracking-wider mb-1">{info.label}</div>
                    <div className="text-white font-medium group-hover:text-primary-300 transition-colors">{info.value}</div>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links */}
            <motion.div
              style={{
                x: useTransform(sp, [0.1, 0.3], [-150, 0]),
                opacity: useTransform(sp, [0.1, 0.25], [0, 1]),
              }}
              className="pt-4"
            >
              <h3 className="text-white font-semibold mb-4">Urmărește-mă</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-12 h-12 rounded-xl bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 hover:bg-primary-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* PFA Info */}
            <motion.div
              style={{
                x: useTransform(sp, [0.12, 0.32], [-200, 0]),
                rotate: useTransform(sp, [0.12, 0.32], [10, 0]),
                opacity: useTransform(sp, [0.12, 0.28], [0, 1]),
              }}
              className="glass-card p-5"
            >
              <h3 className="text-white font-semibold mb-3">Informații PFA</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-400">Denumire</span>
                  <span className="text-dark-200 font-medium">Popovici Octavian PFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Activitate</span>
                  <span className="text-dark-200 font-medium">Dezvoltare Software</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form — slides in from right with 3D rotation */}
          <motion.div
            className="lg:col-span-3"
            style={{ x: formX, rotateY: formRotateY, opacity: formOpacity }}
          >
            <form onSubmit={handleSubmit} className="glass-card glow-border p-6 lg:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">Nume complet</label>
                  <input type="text" id="name" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="Ion Popescu" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                  <input type="email" id="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="email@exemplu.ro" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark-300 mb-2">Subiect</label>
                <input type="text" id="subject" required value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                  placeholder="Dezvoltare aplicație web" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">Mesaj</label>
                <textarea id="message" required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Descrie proiectul tău..." />
              </div>
              <button type="submit" disabled={formState !== 'idle'}
                className={`btn-primary w-full justify-center text-base py-4 ${formState === 'sent' ? 'bg-emerald-600 hover:bg-emerald-500' : ''} ${formState === 'sending' ? 'opacity-70 cursor-wait' : ''}`}>
                {formState === 'idle' && <><Send className="w-5 h-5" /> Trimite mesajul</>}
                {formState === 'sending' && <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Se trimite...</>}
                {formState === 'sent' && <><CheckCircle2 className="w-5 h-5" /> Mesaj trimis!</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
