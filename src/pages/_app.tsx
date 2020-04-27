import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

import "./styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Navigation />

        <div className="flex-1 mx-auto my-4 w-3/5">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MyApp;
