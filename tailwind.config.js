const defaultTheme = require('tailwindcss/defaultTheme');

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
        xs: '0.75rem', // 12
        sm: '0.875rem', // 14
        base: '1rem', // 16
        lg: '1.125rem', // 18
        xl: '1.25rem', // 20
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
      boxShadow: {
        outline: '0 0 0 3px rgba(102, 126, 234, 0.3)',
        focus: '0 0 0 3px rgba(102, 126, 234, 0.3)'
      },
      // Plugins
      translate: {
        '0': '0',
        '1/2': '50%',
        '-1/2': '-50%',
        'full': '100%',
        'px': '1px',
        '-px': '-1px',
        '1': '0.25rem', // 4px
        '-1': '-0.25rem', // 4px
        '2': '0.5rem', // 8px
        '-2': '-0.5rem' // 8px
      },
      aspectRatio: {
        'square': [1, 1],
        '16/9': [16, 9],
        '4/3': [4, 3]
      },
      alphaColors: [
        'white',
        'black',
        'primary.500'
      ]
    },
    screens: {
      ...defaultTheme.screens,
    }
  },
  variants: {
    translate: ['responsive', 'hover'],
    alphaColors: ['hover', 'group-hover']
  },
  plugins: [
    require('tailwindcss-transforms')({ '3d': false }),
    require('tailwindcss-aspect-ratio')(),
    require('tailwindcss-transitions')(),
    require('tailwindcss-bg-alpha')()
  ]
}
