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

      <div className="bg-gray-100 h-screen">
        <Navigation />

        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MyApp;
