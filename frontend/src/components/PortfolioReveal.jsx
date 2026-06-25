import { motion } from 'framer-motion';

export default function PortfolioReveal() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-darker"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glitch bars - only 5 for performance */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            height: `${Math.random() * 10 + 3}px`,
            top: `${15 + i * 18}%`,
            background: i % 3 === 0
              ? 'rgba(255,0,60,0.12)'
              : i % 3 === 1
              ? 'rgba(0,255,65,0.12)'
              : 'rgba(0,200,255,0.12)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 1.2,
            delay: i * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* White flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Wipe */}
      <motion.div
        className="absolute inset-0 bg-cyber-darker"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Center text */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: [0, 1, 0], scale: [1.2, 1, 0.95] }}
        transition={{ duration: 1.5, times: [0, 0.4, 1] }}
      >
        <h1 className="font-display text-2xl md:text-4xl font-black text-cyber-green text-glow-strong tracking-wider">
          LOADING PORTFOLIO
        </h1>
      </motion.div>

      <div className="scanlines" />
    </motion.div>
  );
}
