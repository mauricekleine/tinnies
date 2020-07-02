/** @jsx createElement */
import { ApolloProvider } from "@apollo/react-hooks";
import { config } from "@fortawesome/fontawesome-svg-core";
import ApolloClient, { InMemoryCache, gql } from "apollo-boost";
import withApollo from "next-with-apollo";
import { AppProps } from "next/app";
import Head from "next/head";
import { createElement, useEffect } from "react";
import Rollbar from "rollbar";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./styles.css";
import AppWrapper from "../components/AppWrapper";

config.autoAddCss = false;

const App = ({
  Component,
  pageProps,
  apollo,
}: AppProps & { apollo: ApolloClient<any> }) => {
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

      <ApolloProvider client={apollo}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ApolloProvider>
    </>
  );
};

export default withApollo(({ initialState }) => {
  const cache = new InMemoryCache();
  cache.restore(initialState || {});

  if (process.browser) {
    cache.writeData({
      data: {
        isLoggedIn: !!localStorage.getItem("token"),
      },
    });
  }

  return new ApolloClient({
    cache,
    request: (operation) => {
      if (process.browser) {
        const token = localStorage.getItem("token");

        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        });
      }
    },
    resolvers: {},
    typeDefs: gql`
      extend type Query {
        isLoggedIn: Boolean!
      }
    `,
    uri: "http://localhost:3000/api/graphql",
  });
})(App);
