import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CTASection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    }
  };

  const logEvent = async (event) => {
    try { await axios.post(`${API_URL}/analytics`, { event }); } catch {}
  };

  return (
    <section className="relative py-32 px-6" id="contact">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[10px] text-gray-500 tracking-[0.35em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              all systems operational
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl font-black text-white mt-8">
            LET'S <span className="text-cyber-green text-glow-strong">CONNECT</span>
          </motion.h2>

          <motion.p variants={fadeUp} custom={2} className="mt-6 font-body text-base text-gray-500 max-w-md mx-auto">
            Ready to build something extraordinary together?
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'LinkedIn', icon: '→', action: 'linkedin', url: 'https://www.linkedin.com/in/himanshu-mathpal/' },
            { label: 'Explore GitHub', icon: '◈', action: 'github', url: 'https://github.com/himanshu12mathpal' },
            { label: 'Miskara.co', icon: '↗', action: 'miskara', url: 'https://www.miskara.co/' },
          ].map((btn, i) => (
            <motion.a
              key={i}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={i}
              className="neon-btn"
              onClick={() => logEvent(btn.action)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-base">{btn.icon}</span>
              {btn.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          className="glass-card p-8 md:p-10 max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <h3 className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase mb-8 text-center">
            send transmission
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.key}>
                <label className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-1.5 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-white font-mono text-sm placeholder:text-gray-700 focus:outline-none focus:border-cyber-green/20 transition-colors duration-300"
                />
              </div>
            ))}

            <div>
              <label className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-1.5 block">
                MESSAGE
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                placeholder="Your message..."
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-white font-mono text-sm placeholder:text-gray-700 focus:outline-none focus:border-cyber-green/20 transition-colors duration-300 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="neon-btn w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'sending' ? 'transmitting...'
                : status === 'sent' ? '✓ transmission sent'
                : status === 'error' ? '✗ failed — retry'
                : 'send transmission'}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="h-px w-20 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.15), transparent)' }} />
          <p className="font-mono text-[10px] text-gray-700 tracking-[0.4em] uppercase">
            designed & built by himanshu mathpal • {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
