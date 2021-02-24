import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Rollbar from "rollbar";

import AppWrapper from "../components/app-wrapper";
import { useApollo } from "../lib/apollo-client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "tailwindcss/tailwind.css";
import "./styles.css";

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(
    pageProps.initialApolloState as NormalizedCacheObject
  );

  useEffect(() => {
    if (process.env.ROLLBAR_CLIENT_ACCESS_TOKEN) {
      new Rollbar({
        accessToken: process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ApolloProvider>
    </>
  );
};

export default App;
