import Head from "next/head";
import React from "react";

import BeerCard from "../components/BeerCard";
import { useAuthentication, useBeers } from "../utils/hooks";

const Home = () => {
  useAuthentication();

  const { beers } = useBeers();

  return (
    <>
      <Head>
        <title>Recent updates | Tinnies</title>
      </Head>

      {beers.map((beer) => (
        <BeerCard beer={beer} key={beer._id} />
      ))}
    </>
  );
};

export default Home;
