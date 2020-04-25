module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: process.env.NODE_ENV === "production" ? {} : false,
    "@fullhuman/postcss-purgecss":
      process.env.NODE_ENV === "production"
        ? {
            content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }
        : false,
  },
};
