import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide on mobile
    if ('ontouchstart' in window) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, select')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  if ('ontouchstart' in window) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: hovered ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.3 }}
      >
        <div className="w-[10px] h-[10px] bg-white rounded-full" />
      </motion.div>

      {/* Ring follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference"
        animate={{
          x: pos.x - (hovered ? 30 : 20),
          y: pos.y - (hovered ? 30 : 20),
          width: hovered ? 60 : 40,
          height: hovered ? 60 : 40,
          opacity: hidden ? 0 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      >
        <div
          className="w-full h-full rounded-full border border-white"
          style={{ borderWidth: hovered ? '2px' : '1px' }}
        />
      </motion.div>
    </>
  );
}
