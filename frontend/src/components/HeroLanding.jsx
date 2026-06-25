import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'IoT Builder', 'Problem Solver'];

export default function HeroLanding({ onScrollTrigger }) {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const triggered = useRef(false);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Detect scroll to trigger transition
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 120 && !triggered.current) {
      triggered.current = true;
      onScrollTrigger();
    }
  });

  // Role typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let charIdx = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      if (!deleting) {
        setDisplayText(currentRole.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx >= currentRole.length) {
          deleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 80);
      } else {
        setDisplayText(currentRole.slice(0, charIdx));
        charIdx--;
        if (charIdx < 0) {
          deleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 40);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  // Floating particles data
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[200vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8 }}
    >
      {/* Grain + scanlines */}
      <div className="grain-overlay" />
      <div className="scanlines" />
      <div className="scan-beam" />

      {/* Fixed hero viewport */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        style={{ y: bgY, opacity }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.02) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyber-green/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Top tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] font-mono text-[11px] text-gray-500 tracking-[0.35em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              portfolio • 2025
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="mt-10 font-display text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tight text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0, 1] }}
          >
            <span className="block">HIMANSHU</span>
            <span className="block text-cyber-green text-glow-strong">MATHPAL</span>
          </motion.h1>

          {/* Dynamic role */}
          <motion.div
            className="mt-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="font-mono text-base md:text-lg text-gray-500 tracking-[0.2em]">
              {'< '}
              <span className="text-cyber-green/70">{displayText}</span>
              <span className="text-cyber-green animate-pulse">|</span>
              {' />'}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="mt-10 h-px w-32 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.3), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.4 }}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-8 font-body text-base md:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.4, 0, 0, 1] }}
          >
            Building immersive digital experiences through
            <span className="text-gray-300"> clean code</span> and
            <span className="text-gray-300"> obsessive design</span>.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="font-mono text-[10px] text-gray-600 tracking-[0.4em] uppercase">
            scroll to enter
          </span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-cyber-green/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 font-mono text-[10px] text-gray-700 tracking-widest">
          SYS.v2.1
        </div>
        <div className="absolute top-8 right-8 font-mono text-[10px] text-gray-700 tracking-widest">
          {new Date().getFullYear()}
        </div>
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-gray-700">
          LAT 28.6° N / LNG 77.2° E
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-gray-700">
          STATUS: <span className="text-cyber-green/50">ONLINE</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
