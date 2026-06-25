import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cards = [
  {
    icon: '01',
    title: 'Introduction',
    content: "I'm Himanshu Mathpal — a Full Stack Developer driven by the goal of building immersive digital experiences. From luxury e-commerce to real-time IoT dashboards, I turn complex ideas into clean, performant products.",
  },
  {
    icon: '02',
    title: 'Journey',
    content: 'Started with the MERN stack, built real-time chat apps and to-do platforms. Then leveled up to production-grade projects — Miskara Jewellery (live e-commerce) and a Smart Street Light Dashboard monitoring 800+ IoT devices.',
  },
  {
    icon: '03',
    title: 'Skills',
    content: 'React, Node.js, Express, MongoDB, Tailwind CSS, Framer Motion, Socket.io, ESP32 IoT, MapLibre, REST APIs, JWT Auth, real-time systems, and responsive UI/UX design.',
  },
  {
    icon: '04',
    title: 'Philosophy',
    content: "Code should be elegant. Interfaces should be immersive. Every pixel serves a purpose. I don't build websites — I craft experiences that feel alive.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-32 px-6" id="about">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="font-mono text-[10px] text-cyber-green/40 tracking-[0.5em] uppercase block"
          >
            // about
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-6xl font-black text-white mt-4"
          >
            WHO AM <span className="text-cyber-green text-glow">I</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-4 h-px w-20"
            style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.4), transparent)' }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="glass-card glass-card-hover p-8 group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-2xl font-black text-cyber-green/20 group-hover:text-cyber-green/40 transition-colors duration-500 select-none">
                  {card.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white mb-3 group-hover:text-cyber-green transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                    {card.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
