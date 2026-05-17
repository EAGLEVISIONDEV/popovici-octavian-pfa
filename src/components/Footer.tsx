import { Code2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-dark-800/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-white font-bold">Popovici</span>
              <span className="gradient-text font-bold ml-1">Dev</span>
            </div>
          </div>
          <div className="text-dark-400 text-sm flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Popovici Octavian PFA.</span>
            <span className="hidden sm:inline">Toate drepturile rezervate.</span>
          </div>
          <div className="flex items-center gap-1.5 text-dark-500 text-sm">
            <span>Construit cu</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>&amp;</span>
            <span className="text-primary-400 font-mono">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
