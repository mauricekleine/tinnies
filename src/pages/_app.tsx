import { config } from "@fortawesome/fontawesome-svg-core";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

import "./styles.css";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="bg-gray-200 flex flex-col font-light min-h-screen">
        <Navigation />

        <div className="flex-1 mx-auto my-8 w-4/5 md:w-3/5 lg:w-2/5">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MyApp;
