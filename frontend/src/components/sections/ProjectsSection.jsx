import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const projects = [
  {
    num: '01',
    title: 'Miskara Jewellery',
    subtitle: 'Luxury E-Commerce Platform',
    description: 'A premium live e-commerce experience for luxury jewellery — featuring advanced product filtering, seamless checkout, refund logic, and a modern shopping interface built to convert. Serving real customers at miskara.co.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express'],
    features: ['Live E-Commerce', 'Product Filtering', 'Refund System', 'Payment Gateway'],
    accent: '#FFD700',
    link: 'https://www.miskara.co/',
    github: 'https://github.com/himanshu12mathpal/miskara-Jewellery',
  },
  {
    num: '02',
    title: 'Smart Street Light',
    subtitle: 'IoT Monitoring Dashboard',
    description: 'A real-time IoT dashboard monitoring 800+ street lights via ESP32 sensors — featuring live fault detection, power analytics, technician assignment, and interactive map visualization with Socket.io.',
    tags: ['React', 'Express', 'MongoDB', 'Socket.io', 'ESP32', 'MapLibre'],
    features: ['Live Monitoring', 'Fault Detection', 'Real-time Analytics', 'Interactive Map'],
    accent: '#00CCFF',
    link: null,
    github: null,
  },
  {
    num: '03',
    title: 'Chat App',
    subtitle: 'Real-Time Messaging',
    description: 'A real-time chat application built with the MERN stack — featuring instant messaging, user authentication, and a responsive interface for seamless conversations.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
    features: ['Real-time Chat', 'User Auth', 'Responsive UI', 'MERN Stack'],
    accent: '#A855F7',
    link: null,
    github: 'https://github.com/himanshu12mathpal/Chat-App-MERN',
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative py-32 px-6" id="projects">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={fadeUp} custom={0} className="font-mono text-[10px] text-cyber-green/40 tracking-[0.5em] uppercase block">
            // projects
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl font-black text-white mt-4">
            FEATURED <span className="text-cyber-green text-glow">WORK</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="mt-4 h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.4), transparent)' }} />
        </motion.div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ project }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group will-change-transform"
      style={{ perspective: 1200, rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
    >
      <div
        className="glass-card overflow-hidden transition-all duration-500"
        style={{
          borderColor: hovered ? `${project.accent}25` : undefined,
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}08`
            : '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="p-8 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-3xl font-black" style={{ color: `${project.accent}30` }}>
                  {project.num}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-wider" style={{ color: `${project.accent}80` }}>
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <p className="font-body text-sm text-gray-500 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.features.map((f, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 rounded-md font-mono text-[10px] border transition-colors duration-300"
                    style={{
                      borderColor: `${project.accent}20`,
                      color: `${project.accent}99`,
                      background: hovered ? `${project.accent}08` : 'transparent',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-2 py-1 rounded text-[10px] font-mono text-gray-600 bg-white/[0.03] border border-white/[0.04]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-btn text-[10px] px-4 py-2"
                  >
                    Visit Live ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-btn text-[10px] px-4 py-2"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#888' }}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Visual */}
            <div className="lg:w-64 flex-shrink-0">
              <div
                className="w-full h-44 lg:h-full rounded-xl border overflow-hidden relative"
                style={{ borderColor: `${project.accent}10` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-lg border opacity-15 will-change-transform"
                    style={{ borderColor: project.accent }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute w-12 h-12 rounded-full border opacity-10 will-change-transform"
                    style={{ borderColor: project.accent }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  />
                  <div
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: project.accent, opacity: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
