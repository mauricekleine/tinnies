module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: process.env.NODE_ENV === "production" ? {} : false,
    "@fullhuman/postcss-purgecss":
      process.env.NODE_ENV === "production"
        ? {
            content: ["./src/**/*.tsx"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }
        : false,
  },
};
