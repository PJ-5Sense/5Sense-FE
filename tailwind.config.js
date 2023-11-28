/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600'
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          }
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          }
        }
      })
    })
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard']
      },
      screens: {
        md: '769px',
        '2md': '817px',
        lg: '1025px',
        xl: '1281px',
        '2xl': '1441px',
        '3xl': '1921px'
      },
      fontFamily: {
        sans: ['Pretendard']
      },
      colors: {
        current: 'currentColor',
        white: '#ffffff',
        primary: {
          50: '#F0EFFF',
          200: '#D3C4F9',
          300: '#B6A3EF',
          400: '#907AE5',
          500: '#917AE5',
          600: '#7354E8'
        },
        gray: {
          50: '#F8FAFD',
          200: '#E5E7EB',
          400: '#9CA3AF',
          500: '#6B7280'
        }
      },
      boxShadow: {
        mainPage: '-3px 0px 20px 0px rgba(139, 140, 165, 0.03)'
      }
    }
  }
}
