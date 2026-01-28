import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Rich Black base
        'rich-black': '#0B0D0D',
        'charcoal': '#1A1C1C',
        'slate': '#2D3335',

        // Metallics
        'chrome': '#E8E8E8',
        'silver': '#C0C0C0',
        'gunmetal': '#2C3E50',

        // Neutrals
        'neutral-50': '#FAFAFA',
        'neutral-100': '#F4F4F4',
        'neutral-900': '#1A1A1A',

        // Primary accent (deep blue)
        'primary': {
          50: '#EFF6FF',
          100: '#DEE9FF',
          200: '#C4D9FF',
          300: '#9BC4FF',
          400: '#6FA3FF',
          500: '#4B82FF',
          600: '#3366FF',
          700: '#254FFF',
          800: '#1D40E0',
          900: '#1835B5',
        },

        // Secondary (teal)
        'secondary': {
          50: '#EFFFFE',
          100: '#D4F8F7',
          200: '#A8EEEE',
          300: '#74E0DF',
          400: '#40CEC8',
          500: '#26B3AA',
          600: '#1B9A8F',
          700: '#177C75',
          800: '#14645E',
          900: '#135350',
        },

        // Success
        'success': {
          50: '#F0FDF4',
          500: '#22C55E',
          600: '#16A34A',
        },

        // Warning
        'warning': {
          50: '#FFFBEB',
          500: '#FBBF24',
          600: '#F59E0B',
        },

        // Error
        'error': {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(11, 13, 13, 0.5)',
      },
      backdropBlur: {
        'md': '12px',
      },
      fontFamily: {
        'sans': ['Open Sans', 'Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
      },
      spacing: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
