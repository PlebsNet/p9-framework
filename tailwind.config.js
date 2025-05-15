/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        morph: 'morph 2s ease-in-out infinite',
        spinSlow: 'spin 2s linear infinite',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 10s ease-in-out infinite',
        'move-diagonal': 'diagonal 60s linear infinite',
      },
      keyframes: {
        morph: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        diagonal: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
};