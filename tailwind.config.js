/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        ink: '#161d1f',
        muted: '#5b3f46',
        berry: '#b60058',
        'berry-dark': '#8f0045',
        hot: '#e9007a',
        cyan: '#00677f',
        sky: '#00ccf9',
        butter: '#ffd500',
        mist: '#f4fafd',
      },
      boxShadow: {
        neo: '4px 4px 0 0 #000',
        'neo-md': '5px 5px 0 0 #000',
        'neo-lg': '6px 6px 0 0 #000',
        pink: '0 18px 30px rgba(182,0,88,.10)',
        cyan: '0 18px 30px rgba(0,103,127,.10)',
      },
      borderRadius: {
        neo: '1.75rem',
      },
    },
  },
  plugins: [],
}
