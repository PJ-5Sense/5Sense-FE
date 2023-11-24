/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
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
          50: '#F8FAFD',
          100: '#F0EFFF',
          200: '#D3C4F9',
          300: '#B6A3EF',
          400: '#907AE5',
          500: '#917AE5',
          600: '#7354E8'
        },
        gray: {
          200: '#E5E7EB',
          400: '#9CA3AF'
        }
      }
    }
  }
}
