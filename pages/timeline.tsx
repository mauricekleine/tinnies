import Head from "next/head";
import React from "react";

import BeerCard from "../components/BeerCard";
import { useTimeline } from "../libs/hooks";

const Timeline = () => {
  const [data, error] = useTimeline();
  console.log(error);

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
