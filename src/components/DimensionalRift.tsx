'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface DimensionalRiftProps {
  className?: string;
}

export default function DimensionalRift({ className = '' }: DimensionalRiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Rift opening
  const riftWidth = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 100, 100, 100, 0]);
  const riftOpacity = useTransform(progress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const glowIntensity = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 30, 50, 30, 0]);
  
  // Tear lines
  const tearTop = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], ['50%', '20%', '10%', '20%', '50%']);
  const tearBottom = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], ['50%', '80%', '90%', '80%', '50%']);
  
  // RGB shift
  const rgbShiftR = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 3, 5, 3, 0]);
  const rgbShiftB = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, -3, -5, -3, 0]);

  return (
    <div ref={ref} className={`relative h-[40vh] overflow-hidden ${className}`}>
      {/* The void behind the rift */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: riftOpacity }}
      >
        {/* Cosmic void gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/30 via-dark-950 to-dark-950" />
        
        {/* Animated energy lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            style={{
              width: riftWidth,
              top: `${25 + i * 7}%`,
              left: '50%',
              translateX: '-50%',
              opacity: useTransform(progress, [0, 0.3, 0.7, 1], [0, 0.3 + i * 0.05, 0.3 + i * 0.05, 0]),
              scaleX: useTransform(progress, 
                [0, 0.3 + i * 0.02, 0.5, 0.7 - i * 0.02, 1], 
                [0, 1, 1.2, 1, 0]
              ),
            }}
          />
        ))}

        {/* Center glow */}
        <motion.div
          className="absolute w-full h-2 left-0 top-1/2 -translate-y-1/2"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.8), rgba(165, 180, 252, 0.9), rgba(99, 102, 241, 0.8), transparent)',
            boxShadow: useTransform(glowIntensity, (v) => `0 0 ${v}px rgba(99, 102, 241, 0.5), 0 0 ${v * 2}px rgba(99, 102, 241, 0.3)`),
            scaleX: useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 0.8, 1, 0.8, 0]),
            opacity: riftOpacity,
          }}
        />
      </motion.div>

      {/* Top tear */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-dark-950 z-10"
        style={{
          height: tearTop,
          borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: useTransform(glowIntensity, (v) => `0 ${v/3}px ${v}px rgba(99, 102, 241, 0.2)`),
        }}
      >
        {/* RGB chromatic aberration on the edge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-red-500/30"
          style={{ translateY: rgbShiftR }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-blue-500/30"
          style={{ translateY: rgbShiftB }}
        />
      </motion.div>

      {/* Bottom tear */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-dark-950 z-10"
        style={{
          height: useTransform(tearBottom, (v) => `calc(100% - ${v})`),
          borderTop: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: useTransform(glowIntensity, (v) => `0 -${v/3}px ${v}px rgba(99, 102, 241, 0.2)`),
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-red-500/30"
          style={{ translateY: useTransform(rgbShiftR, (v) => -v) }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-blue-500/30"
          style={{ translateY: useTransform(rgbShiftB, (v) => -v) }}
        />
      </motion.div>

      {/* Floating code fragments in the rift */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-5 overflow-hidden"
        style={{ opacity: riftOpacity }}
      >
        {['</', '{...}', '=>', '/**/', '0x1F', '<?>', 'npm', 'git', '>>>'].map((code, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-primary-400/40 text-xs select-none"
            style={{
              left: `${10 + i * 10}%`,
              top: '50%',
              translateY: useTransform(progress, 
                [0, 0.3, 0.5, 0.7, 1], 
                [0, (i % 2 ? -30 : 30) - 10, (i % 2 ? -20 : 20), (i % 2 ? -30 : 30) + 10, 0]
              ),
              opacity: useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 0.6, 0.8, 0.6, 0]),
              scale: useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 0.8, 1, 0.8, 0]),
            }}
          >
            {code}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
