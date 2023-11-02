import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', // Adds a new `3xl:` screen variant
        'h-3xl': '1080px'
      },
      colors: {
        primary: '#F8FAFD',
        primary2: '#6F53DB'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
export default config
