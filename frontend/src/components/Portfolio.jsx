import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CTASection from './sections/CTASection';

export default function Portfolio({ devInfo }) {
  return (
    <motion.div
      className="relative bg-cyber-darker min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Grain + scanlines */}
      <div className="grain-overlay" />
      <div className="scanlines" />

      {/* Grid bg */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CTASection />
      </div>
    </motion.div>
  );
}
