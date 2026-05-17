'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ShatterPiece {
  id: number;
  clipPath: string;
  originX: number;
  originY: number;
  tx: number;
  ty: number;
  rotation: number;
  rotateX: number;
  rotateY: number;
  delay: number;
}

function generateVoronoiShatter(cols: number, rows: number): ShatterPiece[] {
  const pieces: ShatterPiece[] = [];
  const id = { current: 0 };
  
  // Create irregular grid-based shatter pattern
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellW = 100 / cols;
      const cellH = 100 / rows;
      
      // Add randomness to corners
      const jitter = 3;
      const x1 = Math.max(0, col * cellW + (col > 0 ? (Math.random() - 0.5) * jitter : 0));
      const y1 = Math.max(0, row * cellH + (row > 0 ? (Math.random() - 0.5) * jitter : 0));
      const x2 = Math.min(100, (col + 1) * cellW + (col < cols - 1 ? (Math.random() - 0.5) * jitter : 0));
      const y2 = Math.min(100, (row + 1) * cellH + (row < rows - 1 ? (Math.random() - 0.5) * jitter : 0));
      
      // Center of this piece
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;
      
      // Distance from center of viewport determines scatter direction
      const fromCenterX = cx - 50;
      const fromCenterY = cy - 50;
      const dist = Math.sqrt(fromCenterX * fromCenterX + fromCenterY * fromCenterY);

      // Sometimes split cell into triangles for more organic look
      if (Math.random() > 0.6) {
        // Triangle 1
        pieces.push({
          id: id.current++,
          clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x1}% ${y2}%)`,
          originX: cx,
          originY: cy,
          tx: fromCenterX * (2 + Math.random() * 4),
          ty: fromCenterY * (2 + Math.random() * 4) + (Math.random() - 0.5) * 200,
          rotation: (Math.random() - 0.5) * 360,
          rotateX: (Math.random() - 0.5) * 90,
          rotateY: (Math.random() - 0.5) * 90,
          delay: dist * 0.003 + Math.random() * 0.05,
        });
        // Triangle 2
        pieces.push({
          id: id.current++,
          clipPath: `polygon(${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
          originX: cx,
          originY: cy,
          tx: fromCenterX * (2 + Math.random() * 4),
          ty: fromCenterY * (2 + Math.random() * 4) + (Math.random() - 0.5) * 200,
          rotation: (Math.random() - 0.5) * 360,
          rotateX: (Math.random() - 0.5) * 90,
          rotateY: (Math.random() - 0.5) * 90,
          delay: dist * 0.003 + Math.random() * 0.05,
        });
      } else {
        pieces.push({
          id: id.current++,
          clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
          originX: cx,
          originY: cy,
          tx: fromCenterX * (2 + Math.random() * 5),
          ty: fromCenterY * (2 + Math.random() * 5) + (Math.random() - 0.5) * 200,
          rotation: (Math.random() - 0.5) * 360,
          rotateX: (Math.random() - 0.5) * 90,
          rotateY: (Math.random() - 0.5) * 90,
          delay: dist * 0.003 + Math.random() * 0.05,
        });
      }
    }
  }
  return pieces;
}

interface ScrollShatterProps {
  children: ReactNode;
  className?: string;
  cols?: number;
  rows?: number;
  /** 'exit' = shatter when scrolling away, 'enter' = assemble when scrolling to */
  mode?: 'exit' | 'enter';
  /** scroll range: [start, end] as fractions of element visibility */
  scrollRange?: [number, number];
}

export default function ScrollShatter({
  children,
  className = '',
  cols = 6,
  rows = 4,
  mode = 'exit',
  scrollRange = [0.6, 1.0],
}: ScrollShatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<ShatterPiece[]>([]);

  useEffect(() => {
    setPieces(generateVoronoiShatter(cols, rows));
  }, [cols, rows]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: mode === 'exit' ? ['start start', 'end start'] : ['start end', 'start start'],
  });

  const progress = useSpring(
    useTransform(scrollYProgress, [scrollRange[0], scrollRange[1]], [0, 1]),
    { stiffness: 300, damping: 40 }
  );

  if (pieces.length === 0) {
    return <div ref={containerRef} className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: '1200px' }}>
      {pieces.map((piece) => {
        return (
          <ShatterPieceElement key={piece.id} piece={piece} progress={progress} mode={mode}>
            {children}
          </ShatterPieceElement>
        );
      })}
    </div>
  );
}

function ShatterPieceElement({
  piece,
  progress,
  mode,
  children,
}: {
  piece: ShatterPiece;
  progress: ReturnType<typeof useSpring>;
  mode: 'exit' | 'enter';
  children: ReactNode;
}) {
  const translateX = useTransform(progress, [0, 1], mode === 'exit' ? [0, piece.tx] : [piece.tx, 0]);
  const translateY = useTransform(progress, [0, 1], mode === 'exit' ? [0, piece.ty] : [piece.ty, 0]);
  const rotate = useTransform(progress, [0, 1], mode === 'exit' ? [0, piece.rotation] : [piece.rotation, 0]);
  const rotateX = useTransform(progress, [0, 1], mode === 'exit' ? [0, piece.rotateX] : [piece.rotateX, 0]);
  const rotateY = useTransform(progress, [0, 1], mode === 'exit' ? [0, piece.rotateY] : [piece.rotateY, 0]);
  const opacity = useTransform(progress, [0, 0.6, 1], mode === 'exit' ? [1, 1, 0] : [0, 1, 1]);
  const scale = useTransform(progress, [0, 1], mode === 'exit' ? [1, 0.6] : [0.6, 1]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath: piece.clipPath,
        translateX,
        translateY,
        rotate,
        rotateX,
        rotateY,
        opacity,
        scale,
        transformOrigin: `${piece.originX}% ${piece.originY}%`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}
