module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          '200': '#E1F0F8',
          '800': '#194D7B',
          '900': '#38414d',
        },
        gray: {
          '100': '#f8f8f8',
          '200': '#f7fafc',
          '300': '#e2e8f0',
          '400': '#cbcbcb',
          '600': '#808080',
          '700': '#666666',
        },
      },
    },
    boxShadow: {
      result: '0px 0px 12px -2px rgba(0,0,0,0.4)',
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '8': '8px',
    },
  },
  variants: {},
  plugins: [],
  important: true,
  purge: {
    content: ['./routes/**/*.njk', './views/**/*.njk'],
  },
}
