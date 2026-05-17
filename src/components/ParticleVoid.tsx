'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'ambient' | 'burst' | 'trail';
}

interface WarpLine {
  y: number;
  speed: number;
  width: number;
  opacity: number;
}

export default function ParticleVoid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const warpLines = useRef<WarpLine[]>([]);
  const scrollSpeed = useRef(0);
  const lastScroll = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrame = useRef(0);
  const dimensions = useRef({ w: 0, h: 0 });

  const createAmbientParticle = useCallback((): Particle => {
    const w = dimensions.current.w || window.innerWidth;
    const h = dimensions.current.h || window.innerHeight;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.7 ? '#818cf8' : Math.random() > 0.5 ? '#6366f1' : '#a5b4fc',
      life: 0,
      maxLife: Math.random() * 500 + 200,
      type: 'ambient',
    };
  }, []);

  const createBurstParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3 + 1,
      opacity: 1,
      color: ['#818cf8', '#6366f1', '#a5b4fc', '#c7d2fe', '#4f46e5'][Math.floor(Math.random() * 5)],
      life: 0,
      maxLife: Math.random() * 60 + 30,
      type: 'burst',
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      dimensions.current = { w: window.innerWidth, h: window.innerHeight };
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize ambient particles
    for (let i = 0; i < 80; i++) {
      particles.current.push(createAmbientParticle());
    }

    // Initialize warp lines
    for (let i = 0; i < 20; i++) {
      warpLines.current.push({
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 2 + 0.5,
        width: Math.random() * 100 + 50,
        opacity: 0,
      });
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollSpeed.current = Math.abs(currentScroll - lastScroll.current);
      lastScroll.current = currentScroll;

      // Burst particles on fast scroll
      if (scrollSpeed.current > 15) {
        const count = Math.min(Math.floor(scrollSpeed.current / 3), 15);
        for (let i = 0; i < count; i++) {
          particles.current.push(
            createBurstParticle(
              Math.random() * dimensions.current.w,
              Math.random() * dimensions.current.h
            )
          );
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      const w = dimensions.current.w;
      const h = dimensions.current.h;
      ctx.clearRect(0, 0, w, h);

      const speed = Math.min(scrollSpeed.current, 60);
      const speedNorm = speed / 60;
      scrollSpeed.current *= 0.92; // Decay

      // Draw warp lines when scrolling fast
      if (speed > 5) {
        ctx.globalCompositeOperation = 'lighter';
        warpLines.current.forEach((line) => {
          line.opacity = Math.min(line.opacity + speedNorm * 0.1, speedNorm * 0.15);
          line.y = (line.y + line.speed * speed * 0.3) % h;

          ctx.beginPath();
          const gradient = ctx.createLinearGradient(0, line.y, w, line.y);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.3, `rgba(99, 102, 241, ${line.opacity})`);
          gradient.addColorStop(0.7, `rgba(129, 140, 248, ${line.opacity})`);
          gradient.addColorStop(1, 'transparent');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(0, line.y);
          ctx.lineTo(w, line.y);
          ctx.stroke();
        });
        ctx.globalCompositeOperation = 'source-over';
      } else {
        warpLines.current.forEach((line) => {
          line.opacity *= 0.95;
        });
      }

      // Draw and update particles
      ctx.globalCompositeOperation = 'lighter';
      
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      particles.current = particles.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) {
          if (p.type === 'ambient') {
            // Respawn ambient
            Object.assign(p, createAmbientParticle());
            return true;
          }
          return false;
        }

        // Mouse interaction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.3;
          p.vy -= (dy / dist) * force * 0.3;
        }

        // Scroll influence
        if (speed > 2) {
          p.vy += (Math.random() - 0.5) * speedNorm * 2;
          p.vx += (Math.random() - 0.5) * speedNorm;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Calculate opacity
        let alpha = p.opacity;
        if (p.type === 'burst') {
          alpha = p.opacity * (1 - p.life / p.maxLife);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
        
        // Convert hex to rgba
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Glow effect for burst particles
        if (p.type === 'burst' && alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
          ctx.fill();
        }

        return true;
      });

      // Keep minimum ambient count
      while (particles.current.length < 80) {
        particles.current.push(createAmbientParticle());
      }

      ctx.globalCompositeOperation = 'source-over';

      // Subtle vignette during fast scroll
      if (speed > 10) {
        const vignetteGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.8);
        vignetteGrad.addColorStop(0, 'transparent');
        vignetteGrad.addColorStop(1, `rgba(99, 102, 241, ${speedNorm * 0.05})`);
        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, w, h);
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [createAmbientParticle, createBurstParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
