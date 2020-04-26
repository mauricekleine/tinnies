import Head from "next/head";
import React from "react";

import BeerCard from "../components/BeerCard";
import { useAuthentication, useTimeline } from "../utils/hooks";

const Timeline = () => {
  useAuthentication();
  
  const [data] = useTimeline();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex">
          {data.map((beer) => (
            <BeerCard beer={beer} key={beer.id} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Timeline;
