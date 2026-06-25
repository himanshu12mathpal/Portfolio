import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BinaryRainTransition() {
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

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -50);
    const speeds = Array.from({ length: columns }, () => 0.3 + Math.random() * 0.8);
    const chars = '01'.split('');

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const brightness = Math.random();

        // Different glow levels for depth
        if (brightness > 0.97) {
          // Brightest chars - white with heavy glow
          ctx.font = `bold ${fontSize * 1.5}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 25;
          ctx.shadowColor = '#00ff41';
          ctx.fillText(char, x, y);
        } else if (brightness > 0.85) {
          // Bright green
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = '#00ff41';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00ff41';
          ctx.fillText(char, x, y);
        } else if (brightness > 0.5) {
          // Medium green
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + brightness * 0.3})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#00ff41';
          ctx.fillText(char, x, y);
        } else {
          // Dim
          ctx.font = `${fontSize * 0.9}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(0, 200, 50, ${0.08 + brightness * 0.15})`;
          ctx.shadowBlur = 0;
          ctx.fillText(char, x, y);
        }

        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
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
      className="fixed inset-0 z-50 bg-cyber-darker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      {/* Canvas rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Light rays overlay - like the reference image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 40% 60% at 65% 30%, rgba(0,255,65,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 30% 50% at 35% 50%, rgba(0,255,65,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.7) 100%)',
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }}
          transition={{ duration: 3, times: [0, 0.3, 0.7, 1] }}
        >
          <p className="font-mono text-sm text-cyber-green/60 tracking-[0.5em] uppercase">
            initializing system
          </p>
          <motion.div
            className="mt-4 h-[2px] w-48 mx-auto bg-cyber-green/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-cyber-green/80 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scanlines */}
      <div className="scanlines" />
    </motion.div>
  );
}
