import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import fetcher from "../utils/fetcher";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./styles.css";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          as="fetch"
          crossOrigin="anonymous"
          href="/api/my/profile"
          rel="preload"
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <div className="bg-gray-200 flex flex-col font-light min-h-screen">
          <Navigation />

          <div className="flex-1 mx-auto mb-4 mt-8 w-4/5 md:w-3/5 lg:w-2/5">
            <Component {...pageProps} />
          </div>

          <Footer />
        </div>
      </SWRConfig>
    </>
  );
};

export default MyApp;
