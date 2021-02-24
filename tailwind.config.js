module.exports = {
  purge: ["./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        xs: "8rem",
        sm: "12rem",
        md: "16rem",
        lg: "20rem",
        xl: "24rem",
        "2xl": "28rem",
        "3xl": "32rem",
        "4xl": "36rem",
        "5xl": "42rem",
        "6xl": "48rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
