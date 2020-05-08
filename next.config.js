module.exports = {
  env: {
    ROLLBAR_CLIENT_ACCESS_TOKEN: process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
