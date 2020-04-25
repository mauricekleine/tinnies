import Head from "next/head";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Tinnies | Beer tracking, but better</title>

        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <h1>Tinnies | Beer tracking, but better</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
