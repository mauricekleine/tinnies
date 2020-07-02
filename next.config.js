const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    env: {
      GRAPHQL_URI: isDev
        ? "http://localhost:3000/api/graphql"
        : "https://tinnies.xyz/api/graphql",
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
};
