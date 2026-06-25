import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroLanding from './components/HeroLanding';
import BinaryRainTransition from './components/BinaryRainTransition';
import Terminal from './components/Terminal';
import PortfolioReveal from './components/PortfolioReveal';
import Portfolio from './components/Portfolio';
import SmoothScroll from './components/SmoothScroll';


/*
  Flow:
  0 - Hero Landing (clean premium intro)
  1 - Binary Rain transition (on scroll)
  2 - Terminal verification
  3 - Portfolio reveal glitch
  4 - Full portfolio with scroll animations
*/

function App() {
  const [phase, setPhase] = useState(0);
  const [devInfo, setDevInfo] = useState(null);

  const handleScrollTrigger = useCallback(() => {
    setPhase(1);
    setTimeout(() => setPhase(2), 3000);
  }, []);

  const handleTerminalComplete = useCallback((info) => {
    setDevInfo(info);
    setPhase(3);
    setTimeout(() => setPhase(4), 2200);
  }, []);

  const handleSkipToPortfolio = useCallback(() => {
    setPhase(3);
    setTimeout(() => setPhase(4), 2200);
  }, []);

  return (
    <div className="relative bg-cyber-darker">


      <AnimatePresence mode="wait">
        {phase === 0 && (
          <HeroLanding key="hero" onScrollTrigger={handleScrollTrigger} />
        )}

        {phase === 1 && (
          <BinaryRainTransition key="rain" />
        )}

        {phase === 2 && (
          <Terminal
            key="terminal"
            onComplete={handleTerminalComplete}
            onSkip={handleSkipToPortfolio}
          />
        )}

        {phase === 3 && (
          <PortfolioReveal key="reveal" />
        )}

        {phase === 4 && (
          <SmoothScroll key="portfolio">
            <Portfolio devInfo={devInfo} />
          </SmoothScroll>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
