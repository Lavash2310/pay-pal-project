/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#0070BA', // PayPal primary blue
          600: '#0064a8',
          700: '#005996',
          800: '#004d84',
          900: '#003e72',
        },
        secondary: {
          50: '#eaf7fc',
          100: '#d5f0f9',
          200: '#abe0f3',
          300: '#82d1ed',
          400: '#58c1e7',
          500: '#26A6D1', // Accent teal
          600: '#1e85a8',
          700: '#16647f',
          800: '#0f4257',
          900: '#07212e',
        },
        success: {
          50: '#e8f8f0',
          100: '#d1f1e0',
          200: '#a3e3c2',
          300: '#75d5a3',
          400: '#47c885',
          500: '#169F6E', // Success green
          600: '#138059',
          700: '#0f6045',
          800: '#0a4030',
          900: '#05201b',
        },
        warning: {
          50: '#fef9e7',
          100: '#fdf4cf',
          200: '#fbe89f',
          300: '#f9dd6f',
          400: '#f7d13f',
          500: '#F5C518', // Warning yellow
          600: '#c79e14',
          700: '#95760f',
          800: '#634f0a',
          900: '#322805',
        },
        danger: {
          50: '#fce9e9',
          100: '#f9d2d3',
          200: '#f3a5a7',
          300: '#ed797b',
          400: '#e74c4f',
          500: '#E11932', // Error red
          600: '#b41428',
          700: '#880f1e',
          800: '#5b0a14',
          900: '#2d050a',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
};