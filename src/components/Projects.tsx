'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitHubRepo, getLanguageColor } from '@/lib/github';
import {
  ExternalLink,
  GitFork,
  Star,
  Github,
  FolderGit2,
  Calendar,
} from 'lucide-react';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
  });
}

function formatRepoName(name: string) {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

interface ProjectsProps {
  repos: GitHubRepo[];
}

export default function Projects({ repos }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
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
            <FolderGit2 className="w-3 h-3" />
            Proiecte
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Proiecte <span className="gradient-text">pe GitHub</span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark-300 text-lg leading-relaxed">
            Iată câteva dintre proiectele mele publice. Toate sunt disponibile pe GitHub
            și reflectă pasiunea mea pentru dezvoltare software.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {repos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="glass-card-hover p-6 group block"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700/50 border border-dark-600/50 flex items-center justify-center group-hover:border-primary-500/30 transition-colors">
                      <Github className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-primary-300 transition-colors line-clamp-1">
                        {formatRepoName(repo.name)}
                      </h3>
                      <div className="flex items-center gap-1 text-dark-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(repo.pushed_at)}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-dark-600 group-hover:text-primary-400 transition-colors flex-shrink-0 mt-1" />
                </div>

                {/* Description */}
                <p className="text-dark-400 text-sm leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                  {repo.description || 'Proiect software — vezi detalii pe GitHub.'}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-md bg-primary-500/10 text-primary-400 text-xs font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-dark-700/50">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-dark-300 text-xs font-mono">{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-dark-400 text-xs">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1 text-dark-400 text-xs">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="glass-card p-12 text-center"
          >
            <Github className="w-12 h-12 text-dark-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Proiecte în curs de dezvoltare</h3>
            <p className="text-dark-400">
              Proiectele vor apărea aici automat din contul meu GitHub.
            </p>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/EAGLEVISIONDEV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github className="w-5 h-5" />
            Vezi toate proiectele pe GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
