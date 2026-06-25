import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () =>
      Math.random() * -100
    );

    const chars = '01アイウエオカキクケコサシスセソタチツテト'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glow effect
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00ff41';
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#00ff41';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ff41';
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.15 + brightness * 0.4})`;
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'blur(0.3px)' }}
      />
      {/* Glass distortion overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.02) 50%, transparent 100%)',
          backdropFilter: 'blur(0.5px)',
        }}
      />
      {/* Opacity gradients - fade edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 15%, transparent 85%, rgba(5,5,5,0.8) 100%),
            linear-gradient(to right, rgba(5,5,5,0.5) 0%, transparent 10%, transparent 90%, rgba(5,5,5,0.5) 100%)
          `,
        }}
      />
    </motion.div>
  );
}
