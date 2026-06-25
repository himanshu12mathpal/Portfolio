import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTION_POOL = [
  {
    q: "What does the 'M' stand for in MERN stack?",
    options: ["MongoDB", "MySQL", "MariaDB", "Memory"],
    correct: 0,
    hint: "It's a popular NoSQL database."
  },
  {
    q: "Which React hook is used for handling side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: 1,
    hint: "Think about component lifecycle."
  },
  {
    q: "What is the output of 'typeof []' in JavaScript?",
    options: ["array", "list", "object", "undefined"],
    correct: 2,
    hint: "In JS, almost everything is one of these."
  },
  {
    q: "Which keyword is used to declare a block-scoped constant?",
    options: ["var", "let", "const", "def"],
    correct: 2,
    hint: "Its value cannot be reassigned."
  },
  {
    q: "What does 'SSR' stand for in web development?",
    options: ["Server Side Rendering", "Simple Style Rules", "Static Site Repo", "Secure Shell Runtime"],
    correct: 0,
    hint: "It happens on the server before reaching the client."
  },
  {
    q: "Which HTTP method is typically used to update data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correct: 2,
    hint: "Used for full updates of a resource."
  }
];

export default function Terminal({ onComplete, onSkip }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 is the initial "Are you a dev?"
  const [typedText, setTypedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isRevealed, setIsRevealed] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  
  // Shuffle and pick 3 questions
  useEffect(() => {
    const shuffled = [...QUESTION_POOL].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
  }, []);

  const typeText = (text, cb) => {
    let i = 0;
    setTypedText('');
    setShowOptions(false);
    setIsRevealed(false);
    setTimer(5);
    
    const t = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(t);
        setTimeout(() => { 
          setShowOptions(true); 
          cb?.(); 
        }, 300);
      }
    }, 35);
    return () => clearInterval(t);
  };

  // Initial prompt
  useEffect(() => {
    const cleanup = typeText('Initiating developer verification... Are you a developer?');
    return cleanup;
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (showOptions && timer > 0 && !isRevealed && currentIndex !== -1) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !isRevealed && currentIndex !== -1) {
      setIsRevealed(true);
      // Auto-advance after 2 seconds of showing the answer
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [showOptions, timer, isRevealed, currentIndex]);

  const handleInitialResponse = (ans) => {
    if (ans === 'N') { onSkip(); return; }
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
    } else {
      setAccessGranted(true);
      setTimeout(() => onComplete({ weapon: 'Full Stack' }), 2500);
    }
  };

  useEffect(() => {
    if (currentIndex !== -1 && questions.length > 0) {
      typeText(questions[currentIndex].q);
    }
  }, [currentIndex, questions]);

  const handleOptionClick = (idx) => {
    if (isRevealed) return;
    if (idx === questions[currentIndex].correct) {
      setIsRevealed(true);
      setTimeout(handleNext, 1000);
    } else {
      // Wrong answer - just show the correct one and move on
      setIsRevealed(true);
      setTimeout(handleNext, 1500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grain-overlay" />
      <div className="scanlines" />

      <motion.div
        className="w-full max-w-xl glass-card overflow-hidden"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0, 1] }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-4 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
            terminal_auth.sh
          </span>
          <div className="ml-auto font-mono text-[10px] text-gray-700 flex items-center gap-3">
            {currentIndex !== -1 && !accessGranted && (
              <span className={timer <= 2 ? "text-red-500 animate-pulse" : "text-cyber-green/60"}>
                00:0{timer}
              </span>
            )}
            <span>{accessGranted ? '✓' : `${Math.max(0, currentIndex + 1)}/3`}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 min-h-[320px] font-mono">
          <div className="flex items-start gap-2 mb-6">
            <span className="text-cyber-green/40 text-sm mt-0.5">❯</span>
            <p className="text-cyber-green text-sm text-glow">
              {typedText}
              {!showOptions && <span className="ml-0.5 animate-pulse text-cyber-green">▊</span>}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {showOptions && !accessGranted && (
              <motion.div
                key={currentIndex === -1 ? 'init' : `q-${currentIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="ml-5"
              >
                {currentIndex === -1 ? (
                  <div className="flex flex-col gap-2">
                    <OptBtn onClick={() => handleInitialResponse('Y')} k="Y" text="Yes, let me prove it" />
                    <OptBtn onClick={() => handleInitialResponse('N')} k="N" text="No, just show the portfolio" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {questions[currentIndex].options.map((opt, i) => (
                      <OptBtn 
                        key={i} 
                        onClick={() => handleOptionClick(i)} 
                        k={i + 1} 
                        text={opt} 
                        isCorrect={isRevealed && i === questions[currentIndex].correct}
                        isWrong={isRevealed && i !== questions[currentIndex].correct}
                      />
                    ))}
                    {isRevealed && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-cyber-green/40 mt-4 italic"
                      >
                        Hint: {questions[currentIndex].hint}
                      </motion.p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {accessGranted && (
            <motion.div
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-black text-cyber-green text-glow-strong animate-pulse">
                ACCESS GRANTED
              </h2>
              <p className="mt-3 font-mono text-xs text-gray-500 tracking-[0.4em]">
                VERIFICATION COMPLETE
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function OptBtn({ onClick, k, text, isCorrect, isWrong }) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all duration-300 group ${
        isCorrect 
          ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' 
          : isWrong 
          ? 'bg-red-500/10 border-red-500/20 text-red-500 opacity-40'
          : 'bg-white/[0.02] border-white/[0.04] hover:bg-cyber-green/[0.03] hover:border-cyber-green/10'
      }`}
      whileHover={!isCorrect && !isWrong ? { x: 6 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-mono text-[10px] w-5 ${isCorrect ? 'text-cyber-green' : 'text-gray-600'}`}>
        [{k}]
      </span>
      <span className={`font-mono text-xs ${isCorrect ? 'text-cyber-green' : isWrong ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-200'}`}>
        {text}
      </span>
    </motion.button>
  );
}
