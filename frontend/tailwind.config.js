/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: '#00ff41',
          darkgreen: '#00cc33',
          dim: '#003300',
          black: '#0a0a0a',
          darker: '#050505',
          glass: 'rgba(0, 255, 65, 0.05)',
          border: 'rgba(0, 255, 65, 0.15)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'glitch-2': 'glitch2 3s infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeIn': 'fadeIn 1s ease-out forwards',
        'slideUp': 'slideUp 0.8s ease-out forwards',
        'rgb-split': 'rgbSplit 0.3s ease-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        glitch2: {
          '0%, 100%': { transform: 'translate(0)', opacity: 1 },
          '33%': { transform: 'translate(5px, -3px)', opacity: 0.8 },
          '66%': { transform: 'translate(-5px, 3px)', opacity: 0.8 },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,255,65,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff41' },
        },
        glow: {
          'from': { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          'to': { textShadow: '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41' },
        },
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        slideUp: {
          'from': { opacity: 0, transform: 'translateY(40px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        rgbSplit: {
          '0%': { textShadow: '-2px 0 red, 2px 0 cyan' },
          '100%': { textShadow: '0 0 transparent' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
