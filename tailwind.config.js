/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.tsx",
    "./src/Layout/**/*.tsx",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    // fontWeight : {},  // overwrite the custom font weightings
    extend: {
      colors: {
        blue: {
          1:"#3497F9",
          2:"#F1F8FF"
        },
        text:{
          1:"#374858",
          2:"#808080",
          3:"#7F8F98",
          4:"#7CA1B1"
        }
      },
      boxShadow: {
        shadow:
          "-2px -2px 8px rgba(182, 190, 196, 0.15), 4px 4px 8px rgba(182, 190, 196, 0.15)",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "3.5rem",
        "7xl": "64px",
      },
      backgroundImage: {
        hero: "url('/assets/hero.svg')",
      },
      // fontFamily : {
      //   light : 'gilroy-light',
      //   normal : 'gilroy-regular',
      //   semibold : 'gilroy-bold',
      //   bold : 'gilroy-heavy'
      // },
      animation: {
        slideUp: 'slideUp .5s ease-in-out ',
        fade: 'fade 1.5s ease ',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10%)', opacity: .5 },
          '100%': { transform: 'translateY(0%)', opacity: 1},
        },
        fade: {
          '0%': { opacity: .4 },
          '100%': { opacity: 1},
        }
      }
    },
  }
};
