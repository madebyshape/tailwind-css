const defaultTheme = require('tailwindcss/defaultTheme');
const alpha = { 100: 'FF', 90: 'E6', 80: 'CC', 70: 'B3', 60: '99', 50: '80', 40: '66', 30: '4D', 20: '33', 10: '1A' };

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F0F2FD',
          200: '#D9DFFA',
          300: '#C2CBF7',
          400: '#94A5F0',
          500: '#667EEA',
          600: '#5C71D3',
          700: '#3D4C8C',
          800: '#2E3969',
          900: '#1F2646'
        },
        secondary: {
          100: '#EBF7F7',
          200: '#CDECEA',
          300: '#AFE0DE',
          400: '#74C9C5',
          500: '#38B2AC',
          600: '#32A09B',
          700: '#226B67',
          800: '#19504D',
          900: '#113534'
        },          
        brands: {
          facebook: '#3b5998',
          twitter: '#55acee',
          instagram: '#3f729b',
          linkedin: '#0976b4',
          youtube: '#e52d27',
          vimeo: '#1ab7ea',
          pinterest: '#cc2127'
        }
      },
      fontSize: {
        'xs': '0.75rem', // 12
        'sm': '0.875rem', // 14
        'base': '1rem', // 16
        'lg': '1.125rem', // 18
        'xl': '1.25rem', // 20
        '2xl': '1.5rem', // 24
        '3xl': '1.875rem', // 30
        '4xl': '2.25rem', // 36
        '5xl': '3rem', // 48
        '6xl': '4rem' // 64
      },
      fontFamily: {
        'sans-primary': [
          ...defaultTheme.fontFamily.sans
        ],
        'serif-primary': [
          ...defaultTheme.fontFamily.serif
        ],
        'mono-primary': [
          ...defaultTheme.fontFamily.mono
        ],
      },
      boxShadow: theme => ({
        'outline': '0 0 0 3px ' + theme('colors.primary.500') + alpha[20],
        'focus': '0 0 0 3px ' + theme('colors.primary.500') + alpha[20]
      }),
      inset: {
        '0': 0,
        '1/2': '50%'
      },
      // Plugins
      aspectRatio: {
        'square': [1, 1],
        '16/9': [16, 9],
        '4/3': [4, 3]
      }
    },
    screens: {
      ...defaultTheme.screens,
    }
  },
  variants: {
  },
  plugins: [
    require('tailwindcss-typography')(),
    require('tailwindcss-aspect-ratio')()
  ]
}
