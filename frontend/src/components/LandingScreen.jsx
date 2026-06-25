import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: '', delay: 500 },
  { text: '> INITIALIZING SYSTEM...', delay: 800 },
  { text: '> LOADING MODULES...', delay: 600 },
  { text: '> SCANNING PORTFOLIO DATABASE...', delay: 900 },
  { text: '', delay: 300 },
  { text: '██████████████████████ 100%', delay: 1000 },
  { text: '', delay: 400 },
  { text: '> ERROR 0x8F2A: PORTFOLIO DATA CORRUPTED', delay: 200 },
  { text: '> ATTEMPTING RECOVERY...', delay: 700 },
  { text: '> RECOVERY FAILED.', delay: 500 },
  { text: '', delay: 600 },
];

const ERROR_TITLE = 'ERROR 404:';
const ERROR_SUB = 'PORTFOLIO CORRUPTED';
const PROMPT_TEXT = 'Admin access required to view Developer Profile.';
const QUESTION = 'Are you a developer? [Y/N]';

export default function LandingScreen({ onComplete }) {
  const [bootLines, setBootLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSub, setTypedSub] = useState('');
  const [typedPrompt, setTypedPrompt] = useState('');
  const [typedQuestion, setTypedQuestion] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [userInput, setUserInput] = useState('');
  const containerRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let idx = 0;
    let totalDelay = 0;

    LINES.forEach((line, i) => {
      totalDelay += line.delay;
      setTimeout(() => {
        setBootLines(prev => [...prev, line.text]);
        if (i === LINES.length - 1) {
          setTimeout(() => setBootDone(true), 800);
        }
      }, totalDelay);
    });
  }, []);

  // After boot, type the error title
  useEffect(() => {
    if (!bootDone) return;
    setTitleVisible(true);

    let i = 0;
    const titleTimer = setInterval(() => {
      setTypedTitle(ERROR_TITLE.slice(0, i + 1));
      i++;
      if (i >= ERROR_TITLE.length) {
        clearInterval(titleTimer);
        // Type subtitle
        let j = 0;
        const subTimer = setInterval(() => {
          setTypedSub(ERROR_SUB.slice(0, j + 1));
          j++;
          if (j >= ERROR_SUB.length) {
            clearInterval(subTimer);
            setTimeout(() => setPromptVisible(true), 600);
          }
        }, 60);
      }
    }, 80);
  }, [bootDone]);

  // Type prompt text
  useEffect(() => {
    if (!promptVisible) return;

    let i = 0;
    const promptTimer = setInterval(() => {
      setTypedPrompt(PROMPT_TEXT.slice(0, i + 1));
      i++;
      if (i >= PROMPT_TEXT.length) {
        clearInterval(promptTimer);
        // Type question
        let j = 0;
        setTimeout(() => {
          const qTimer = setInterval(() => {
            setTypedQuestion(QUESTION.slice(0, j + 1));
            j++;
            if (j >= QUESTION.length) {
              clearInterval(qTimer);
              setShowCursor(true);
            }
          }, 50);
        }, 400);
      }
    }, 35);
  }, [promptVisible]);

  // Handle keyboard
  useEffect(() => {
    if (!showCursor) return;

    const handleKey = (e) => {
      const key = e.key.toUpperCase();
      if (key === 'Y' || key === 'N' || key === 'ENTER') {
        setUserInput(key === 'ENTER' ? 'Y' : key);
        setTimeout(() => onComplete(), 800);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showCursor, onComplete]);

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-cyber-darker z-40 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Binary flicker particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute font-mono text-cyber-green pointer-events-none select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size * 4}px`,
            opacity: 0.15,
          }}
          animate={{
            opacity: [0.05, 0.2, 0.05],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        {/* Boot sequence lines */}
        <AnimatePresence>
          {!bootDone && (
            <motion.div
              className="font-mono text-sm text-cyber-green/70 space-y-1"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error display */}
        {titleVisible && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1
                className="font-display text-5xl md:text-7xl font-black text-cyber-green text-glow-strong glitch-text vhs-distortion"
                data-text={typedTitle}
              >
                {typedTitle}
              </h1>
              <h2
                className="font-display text-3xl md:text-5xl font-bold text-cyber-green/80 mt-3 glitch-text"
                data-text={typedSub}
              >
                {typedSub}
              </h2>
            </div>

            {promptVisible && (
              <motion.div
                className="mt-12 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-base md:text-lg text-gray-400">
                  {typedPrompt}
                </p>
                <p className="font-mono text-lg md:text-xl text-cyber-green font-semibold">
                  {typedQuestion}
                  {showCursor && !userInput && (
                    <span className="ml-1 animate-blink">█</span>
                  )}
                  {userInput && (
                    <span className="ml-2 text-white">{userInput}</span>
                  )}
                </p>

                {/* Click buttons for mobile */}
                {showCursor && !userInput && (
                  <motion.div
                    className="flex gap-4 justify-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setUserInput('Y');
                        setTimeout(() => onComplete(), 800);
                      }}
                      className="neon-btn"
                    >
                      [Y] YES
                    </button>
                    <button
                      onClick={() => {
                        setUserInput('N');
                        setTimeout(() => onComplete(), 800);
                      }}
                      className="neon-btn"
                    >
                      [N] NO
                    </button>
                  </motion.div>
                )}

                {userInput && (
                  <motion.p
                    className="font-mono text-sm text-cyber-green/60 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {'> ACCESSING SYSTEM...'}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom scanline decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent" />
    </motion.div>
  );
}
