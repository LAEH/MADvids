/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-Tech Futurism Palette
        cyber: {
          black: '#0A0A0A',
          darkGray: '#1A1A1A',
          mediumGray: '#2A2A2A',
          lightGray: '#3A3A3A',
        },
        neon: {
          green: '#39FF14',      // Active/Safe
          orange: '#FF8C00',     // Warning/Attention
          blue: '#00D4FF',       // Data/Processing
          purple: '#A855F7',     // Accent
          red: '#FF3B3B',        // Error/Alert
        },
        ddn: {
          red: '#ED2738',
          darkRed: '#C41E2A',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'data-flow': 'data-flow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'border-pulse': 'border-pulse 2s ease-in-out infinite',
        'typing': 'typing 1.5s steps(20) forwards',
        'blink': 'blink 1s step-end infinite',
        'vision-scan': 'vision-scan 2s linear infinite',
        'vision-spin': 'vision-spin 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'data-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'border-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'typing': {
          'from': { clipPath: 'inset(0 100% 0 0)' },
          'to': { clipPath: 'inset(0 0 0 0)' },
        },
        'blink': {
          '50%': { borderColor: 'transparent' },
        },
        'vision-scan': {
          'from': { transform: 'translateY(-100%)' },
          'to': { transform: 'translateY(200%)' },
        },
        'vision-spin': {
          'from': { transform: 'rotateY(0deg)' },
          'to': { transform: 'rotateY(360deg)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px)',
        'hex-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l25.98 15v30L30 60 4.02 45V15z\' fill=\'none\' stroke=\'%2339FF14\' stroke-opacity=\'0.05\'/%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}
