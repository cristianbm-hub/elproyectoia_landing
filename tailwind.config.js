/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
          '100%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        'orbit': 'orbit 12s linear infinite',
        'orbit-reverse': 'orbit-reverse 12s linear infinite',
      }
    },
  },
  plugins: [],
};
