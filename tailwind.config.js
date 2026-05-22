import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        },
        accent: {
          50: '#ecfeff',
          500: '#06b6d4',
          600: '#0891b2'
        },
        success: '#22c55e',
        danger: '#ef4444'
      }
    }
  },
  plugins: [],
}
export default config
