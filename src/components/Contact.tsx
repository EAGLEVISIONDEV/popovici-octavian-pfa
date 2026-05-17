'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Github,
  Linkedin,
  Globe,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'octavianpopovici13@gmail.com',
    href: 'mailto:octavianpopovici13@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+40 764 196 983',
    href: 'tel:+40764196983',
  },
  {
    icon: MapPin,
    label: 'Locație',
    value: 'București, România',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/EAGLEVISIONDEV',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/octavianpopovici',
  },
  {
    icon: Globe,
    label: 'Website',
    href: '#hero',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    // Construct mailto link as fallback
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
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[128px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono uppercase tracking-wider mb-4">
            <MessageSquare className="w-3 h-3" />
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Hai să <span className="gradient-text">colaborăm</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Ești interesat de serviciile mele sau ai un proiect? Trimite-mi un mesaj
            și voi reveni cu un răspuns în cel mai scurt timp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="glass-card-hover p-5 flex items-center gap-4 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <div className="text-dark-400 text-xs font-medium uppercase tracking-wider mb-1">
                    {info.label}
                  </div>
                  <div className="text-white font-medium group-hover:text-primary-300 transition-colors">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
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

            {/* Business Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card glow-border p-6 lg:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                    Nume complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="email@exemplu.ro"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark-300 mb-2">
                  Subiect
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                  placeholder="Dezvoltare aplicație web"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Descrie proiectul tău..."
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`btn-primary w-full justify-center text-base py-4 ${
                  formState === 'sent'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : ''
                } ${formState === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
              >
                {formState === 'idle' && (
                  <>
                    <Send className="w-5 h-5" />
                    Trimite mesajul
                  </>
                )}
                {formState === 'sending' && (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Se trimite...
                  </>
                )}
                {formState === 'sent' && (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Mesaj trimis!
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
