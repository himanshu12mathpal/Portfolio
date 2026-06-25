import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const categories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
      { name: 'JavaScript', level: 92 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Next.js', level: 80 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'REST APIs', level: 92 },
      { name: 'Socket.io', level: 82 },
      { name: 'JWT Auth', level: 85 },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'ESP32 IoT', level: 78 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 70 },
      { name: 'MapLibre', level: 75 },
      { name: 'Deployment', level: 80 },
    ],
  },
];

export default function SkillsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-32 px-6" id="skills">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={fadeUp} custom={0} className="font-mono text-[10px] text-cyber-green/40 tracking-[0.5em] uppercase block">
            // skills
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl font-black text-white mt-4">
            TECH <span className="text-cyber-green text-glow">STACK</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="mt-4 h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.4), transparent)' }} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-3 mb-12 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              variants={fadeUp}
              custom={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-lg font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                active === i
                  ? 'border-cyber-green/30 bg-cyber-green/[0.06] text-cyber-green'
                  : 'border-white/[0.04] bg-white/[0.02] text-gray-600 hover:text-gray-400 hover:border-white/[0.08]'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          key={active}
          initial="hidden"
          animate="visible"
        >
          {categories[active].skills.map((skill, i) => (
            <motion.div
              key={`${active}-${i}`}
              variants={fadeUp}
              custom={i}
              className="glass-card p-5 skill-node group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="font-mono text-[10px] text-gray-600">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full will-change-transform"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,255,65,0.3), rgba(0,255,65,0.8))',
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: skill.level / 100 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
