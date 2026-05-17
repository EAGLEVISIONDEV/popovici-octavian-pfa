'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CharacterDissolveProps {
  text: string;
  className?: string;
  /** When true, chars scatter on scroll exit. When false, converge on scroll enter */
  mode?: 'exit' | 'enter';
  scrollRange?: [number, number];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function CharacterDissolve({
  text,
  className = '',
  mode = 'exit',
  scrollRange = [0.5, 0.9],
  as: Tag = 'span',
}: CharacterDissolveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: mode === 'exit' ? ['start start', 'end start'] : ['start end', 'end center'],
  });

  const progress = useSpring(
    useTransform(scrollYProgress, [scrollRange[0], scrollRange[1]], [0, 1]),
    { stiffness: 200, damping: 30 }
  );

  const chars = useMemo(() => {
    return text.split('').map((char, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 400;
      return {
        char,
        index: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - Math.random() * 200,
        rotation: (Math.random() - 0.5) * 720,
        scale: Math.random() * 0.5,
        delay: (i / text.length) * 0.3 + Math.random() * 0.1,
      };
    });
  }, [text]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
      <Tag className={className}>
        {chars.map((c, i) => (
          <DissolveChar key={i} charData={c} progress={progress} mode={mode} />
        ))}
      </Tag>
    </div>
  );
}

function DissolveChar({
  charData,
  progress,
  mode,
}: {
  charData: {
    char: string;
    tx: number;
    ty: number;
    rotation: number;
    scale: number;
    delay: number;
  };
  progress: ReturnType<typeof useSpring>;
  mode: 'exit' | 'enter';
}) {
  const tx = useTransform(progress, [0, 1], mode === 'exit' ? [0, charData.tx] : [charData.tx, 0]);
  const ty = useTransform(progress, [0, 1], mode === 'exit' ? [0, charData.ty] : [charData.ty, 0]);
  const rotate = useTransform(progress, [0, 1], mode === 'exit' ? [0, charData.rotation] : [charData.rotation, 0]);
  const opacity = useTransform(progress, [0, 0.3, 1], mode === 'exit' ? [1, 1, 0] : [0, 0.8, 1]);
  const scale = useTransform(progress, [0, 1], mode === 'exit' ? [1, charData.scale] : [charData.scale, 1]);
  const blur = useTransform(progress, [0, 0.5, 1], mode === 'exit' ? [0, 0, 8] : [8, 0, 0]);
  const filterStr = useTransform(blur, (v) => `blur(${v}px)`);

  if (charData.char === ' ') return <span>&nbsp;</span>;

  return (
    <motion.span
      className="inline-block"
      style={{
        translateX: tx,
        translateY: ty,
        rotate,
        opacity,
        scale,
        filter: filterStr,
        willChange: 'transform, opacity, filter',
      }}
      aria-hidden
    >
      {charData.char}
    </motion.span>
  );
}
