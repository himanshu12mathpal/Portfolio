import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)' }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl will-change-transform"
        style={{ y, opacity }}
      >
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[10px] text-gray-500 tracking-[0.35em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            system restored
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-10 font-display text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          FULL STACK
          <br />
          <span className="text-cyber-green text-glow-strong">DEVELOPER</span>
        </motion.h1>

        <motion.p
          className="mt-6 font-mono text-xs text-gray-600 tracking-[0.4em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          identity verified • clearance level: max
        </motion.p>

        <motion.div
          className="mt-8 h-px w-32 mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.3), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mt-8 font-body text-base text-gray-500 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          Crafting high-performance digital experiences through clean code, modern architecture, and obsessive attention to detail.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <a href="#projects" className="neon-btn">View Projects</a>
          <a href="#contact" className="neon-btn" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}>
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <motion.div
            className="w-0.5 h-2 bg-cyber-green/50 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
