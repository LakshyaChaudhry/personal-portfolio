// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          glass: {
            DEFAULT: 'rgba(255, 255, 255, 0.1)',
            light: 'rgba(255, 255, 255, 0.2)',
            dark: 'rgba(0, 0, 0, 0.1)',
            border: 'rgba(255, 255, 255, 0.18)',
          }
        },
        animation: {
          float: 'float 6s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        }
      },
    },
    plugins: [],
  }