import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        accent: { DEFAULT: '#7C3AED' }
      },
      backgroundImage: {
        'radial': 'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.15), transparent 35%)'
      }
    }
  },
  plugins: []
} satisfies Config
